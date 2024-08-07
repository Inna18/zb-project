import styles from './organisms.module.css';

import React, { useEffect } from 'react';
import Post from '@/app/service/usePostApi';
import PostCard from '../molecules/PostCard';
import Spinner from '../atoms/spinner/Spinner';
import Button from '../atoms/button/Button';
import Image from 'next/image';
import deleteIcon from '@/public/icons/delete-left-solid.svg';
import updateIcon from '@/public/icons/pen-to-square-solid.svg';

import { usePathname, useRouter } from 'next/navigation';
import { useUserStore } from '@/app/stores/useUserStore';
import { usePostStore } from '@/app/stores/usePostStore';
import { usePost } from '@/app/queries/queryHooks/post/usePost';
import { useSession } from 'next-auth/react';

const PostList = () => {
  const session = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const user = useUserStore((state) => state.user);
  const { post, resetPost } = usePostStore((state) => state);
  const { data: postList, isLoading } = usePost().usePostList();
  const { mutate: mutatePostSave, isPending: isPendingPostSave } =
    usePost().usePostCreate();
  const { mutate: mutatePostDelete, isPending: isPendingPostDelete } =
    usePost().usePostDelete();
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
    else mutatePostSave({ ...post, createdBy: user.email });
  };

  const handleDelete = (id: string) => mutatePostDelete(id);

  return (
    <>
      {isLoadingOrPending && <Spinner />}
      {!isLoading && (
        <>
          <div className={styles['add-button']}>
            {session.status === 'authenticated' && user.role === 'ADMIN' && (
              <Button value='Add Post' onClick={() => handleRoute()} />
            )}
          </div>
          <div className={styles.centered}>
            {postList && postList.length <= 0 && (
              <div className={styles.empty}>No Posts</div>
            )}
          </div>
          {postList.map((post: Post) => (
            <div key={post._id} className={styles['post-list']}>
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
