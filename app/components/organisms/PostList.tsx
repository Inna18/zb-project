import styles from './organisms.module.css';

import React, { useEffect } from 'react';
import Post from '@/app/service/usePostApi';
import PostCard from '../molecules/PostCard';
import Spinner from '../atoms/spinner/Spinner';
import Button from '../atoms/button/Button';
import Image from 'next/image';
import deleteIcon from '@/public/icons/delete-left-solid.svg';
import updateIcon from '@/public/icons/pen-to-square-solid.svg';

import { usePostList } from '@/app/queries/queryHooks/post/usePostList';
import { usePathname, useRouter } from 'next/navigation';
import { useUserStore } from '@/app/stores/useUserStore';
import { usePostStore } from '@/app/stores/usePostStore';
import { usePostCreate } from '@/app/queries/queryHooks/post/usePostCreate';
import { usePostDelete } from '@/app/queries/queryHooks/post/usePostDelete';
import { useQueryClient } from '@tanstack/react-query';

const PostList = () => {
  const router = useRouter();
  const pathname = usePathname();
  const user = useUserStore((state) => state.user);
  const { post, resetPost } = usePostStore((state) => state);
  const queryClient = useQueryClient();
  const { data: postList, isLoading } = usePostList();
  const { mutate: mutatePostSave, isPending: isPendingPostSave } =
    usePostCreate();
  const { mutate: mutatePostDelete, isPending: isPendingPostDelete } =
    usePostDelete();
  const isLoadingOrPending =
    isLoading || isPendingPostSave || isPendingPostDelete;

  useEffect(() => {
    resetPost();
  }, []);

  const handleClick = (id: string) => {
    router.push(`${pathname}/?postId=${id}`);
  };

  const handleRoute = (id?: string | undefined) => {
    if (id) router.push(`${pathname}/fix?postId=${id}`);
    else {
      mutatePostSave(
        { ...post, createdBy: user.email },
        {
          onSuccess: (data) => {
            router.push(`${pathname}/fix?postId=${data._id}`);
          },
        }
      );
    }
  };

  const handleDelete = (id: string) => {
    mutatePostDelete(id, {
      onSuccess: () => {
        queryClient.setQueryData(['posts'], (old: Post[]) =>
          old.filter((p) => p._id !== id)
        );
      },
    });
  };

  return (
    <>
      {isLoadingOrPending && <Spinner />}
      {!isLoading && (
        <>
          <div className={styles['add-button']}>
            {user.role === 'ADMIN' && (
              <Button value='Add Post' onClick={() => handleRoute()} />
            )}
          </div>
          {postList.map((post: Post) => (
            <div className={styles['post-list']}>
              <div onClick={() => handleClick(post._id)}>
                <PostCard post={post} key={post._id} />
              </div>
              {user.role === 'ADMIN' && (
                <div className={styles.btns}>
                  <div>
                    <a onClick={() => handleRoute(post._id)}>
                      <Image
                        src={updateIcon}
                        alt={'update-icon'}
                        width={30}
                        height={30}
                      />
                    </a>
                    <a onClick={() => handleDelete(post._id)}>
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
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default PostList;
