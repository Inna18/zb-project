import styles from './molecules.module.css';

import React, { useEffect } from 'react';
import Input from '../atoms/input/Input';
import Spinner from '../atoms/spinner/Spinner';
import Post from '@/app/service/usePostApi';
import Image from 'next/image';
import Button from '../atoms/button/Button';
import deleteIcon from '@/public/icons/circle-xmark-solid.svg';

import { useRouter, useSearchParams } from 'next/navigation';
import { usePostGet } from '@/app/queries/queryHooks/post/usePostGetById';
import { usePostUpdate } from '@/app/queries/queryHooks/post/usePostUpdate';
import { usePostDeleteImg } from '@/app/queries/queryHooks/post/usePostDeleteImg';
import { usePostUpdateImg } from '@/app/queries/queryHooks/post/usePostUpdateImg';
import { useQueryClient } from '@tanstack/react-query';
import { limit } from '@/app/utils/text';
import { usePostStore } from '@/app/stores/usePostStore';

const PostForm = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const postId = useSearchParams()?.get('postId');
  const { post, setPost } = usePostStore((state) => state);
  const { data: existingPost, isLoading } = usePostGet(postId ? postId : '');
  const { mutate: mutatePostUpdate } = usePostUpdate();
  const { mutate: mutateDeleteImg, isPending: isPendingDeleteImg } =
    usePostDeleteImg();
  const { mutate: mutateAddImg, isPending: isPendingAddImg } =
    usePostUpdateImg();
  const isLoadingOrPending = isLoading || isPendingDeleteImg || isPendingAddImg;

  useEffect(() => {
    setPost(existingPost);
  }, [existingPost]);

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  const handleSaveOrUpdate = () => {
    mutatePostUpdate(
      { id: existingPost._id, post: post },
      {
        onSuccess: () => {
          router.push('/blog');
        },
      }
    );
  };

  const handleDeleteImg = () => {
    mutateDeleteImg(existingPost._id, {
      onSuccess: () => {
        queryClient.setQueryData(['post', postId], (old: Post) => ({
          ...old,
          postImage: null,
        }));
      },
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    let file = e.currentTarget.files;
    if (postId && file)
      mutateAddImg(
        { id: postId, image: file?.[0] },
        {
          onSuccess: (data) => {
            queryClient.setQueryData(['post', postId], () => ({
              ...post,
              postImage: data.postImage,
            }));
          },
        }
      );
  };

  return (
    <>
      {isLoadingOrPending && <Spinner />}
      {!isLoading && post && (
        <div className={styles['post-form']}>
          <div className={styles.title}>Add Post</div>
          <div className={styles.form}>
            <div>
              {existingPost && existingPost.postImage && (
                <div className={styles['img-section']}>
                  <Image
                    src={existingPost.postImage}
                    alt={'post-img'}
                    width={200}
                    height={140}
                    style={{ objectFit: 'contain' }}
                  />
                  <div>
                    <a onClick={handleDeleteImg}>
                      <Image
                        src={deleteIcon}
                        alt={'delete-icon'}
                        width={30}
                        height={30}
                      />
                    </a>
                  </div>
                </div>
              )}
              {(!existingPost || !existingPost.postImage) && (
                <>
                  <Input
                    type='file'
                    id='post-img'
                    className='image'
                    labelText='Add Image'
                    hasLabel={true}
                    name='postImg'
                    changeFunc={handleImageUpload}
                  />
                  <span>{limit('', 20)}</span>
                </>
              )}
            </div>
            <div>
              <Input
                type='text'
                placeholder={`Insert post title`}
                hasLabel={false}
                name={'title'}
                value={post.title}
                className='post-input'
                maxLength={20}
                changeFunc={handleInput}
              />
            </div>
            <div>
              <textarea
                name='content'
                id=''
                rows='14'
                cols='100'
                name='content'
                value={post.content}
                onChange={handleInput}
              />
            </div>
            <div className={styles.btn}>
              <Button
                value={existingPost ? 'Update' : 'Save'}
                onClick={handleSaveOrUpdate}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PostForm;
