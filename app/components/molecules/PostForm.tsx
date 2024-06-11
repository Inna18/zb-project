import styles from './molecules.module.css';

import React, { useEffect } from 'react';
import Input from '../atoms/input/Input';
import Spinner from '../atoms/spinner/Spinner';
import Image from 'next/image';
import Button from '../atoms/button/Button';
import Modal from '../atoms/modal/Modal';
import deleteIcon from '@/public/icons/circle-xmark-solid.svg';

import { useSearchParams } from 'next/navigation';
import { usePost } from '@/app/queries/queryHooks/post/usePost';
import { limit } from '@/app/utils/text';
import { usePostStore } from '@/app/stores/usePostStore';
import { modalMsgConstants } from '@/app/constants/modalMsg';
import { useModalStore } from '@/app/stores/useModalStore';
import { useModal } from '@/app/hooks/useModal';
import { useRouter } from 'next/navigation';

const { POST_UPDATE_SUCCESS } = modalMsgConstants;

const PostForm = () => {
  const router = useRouter();
  const postId = useSearchParams()?.get('postId');
  const { post, setPost } = usePostStore((state) => state);
  const { modal, setModal } = useModalStore((state) => state);
  const { open, close, isOpen } = useModal();
  const { data: existingPost, isLoading } = usePost().usePostGet(
    postId ? postId : ''
  );
  const { mutate: mutatePostUpdate, isSuccess } = usePost().usePostUpdate();
  const { mutate: mutateDeleteImg, isPending: isPendingDeleteImg } =
    usePost().usePostDeleteImg();
  const { mutate: mutateAddImg, isPending: isPendingAddImg } =
    usePost().usePostUpdateImg();
  const isLoadingOrPending = isLoading || isPendingDeleteImg || isPendingAddImg;

  useEffect(() => {
    setPost(existingPost);
  }, [existingPost]);

  useEffect(() => {
    if (isSuccess) {
      setModal({
        type: 'alert',
        content: POST_UPDATE_SUCCESS,
        onClose: handleRoute,
      });
      open();
    }
  }, [isSuccess]);

  const handleRoute = () => router.push('/blog');
  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };
  const handleSaveOrUpdate = () =>
    mutatePostUpdate({ id: existingPost._id, post: post });
  const handleDeleteImg = () => mutateDeleteImg(existingPost._id);
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    let file = e.currentTarget.files;
    if (postId && file) mutateAddImg({ id: postId, image: file?.[0] });
  };

  return (
    <>
      {isLoadingOrPending && <Spinner />}
      {!isLoading && post && (
        <div className={styles['post-form']}>
          <div className={styles.title}>Post Form</div>
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
                placeholder={'Insert post title'}
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
                id=''
                rows='14'
                cols='100'
                name='content'
                value={post.content}
                placeholder={'Insert post content'}
                onChange={handleInput}
              />
            </div>
            <div className={styles.btn}>
              <Button value={'Update'} onClick={handleSaveOrUpdate} />
            </div>
          </div>
        </div>
      )}
      <Modal
        selector={'portal'}
        show={isOpen}
        type={modal.type}
        content={modal.content}
        onClose={modal.onClose}
      />
    </>
  );
};

export default PostForm;
