import styles from './organisms.module.css';

import React from 'react';
import Spinner from '../atoms/spinner/Spinner';
import Image from 'next/image';
import moment from 'moment';

import { usePostGet } from '@/app/queries/queryHooks/post/usePostGetById';

interface PostProps {
  postId: string;
}
const Post = ({ postId }: PostProps) => {
  const { data: post, isLoading } = usePostGet(postId);

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && (
        <div className={styles['post']}>
          <div className={styles.title}>{post.title}</div>
          <div className={styles.image}>
            {post.postImage && (
              <Image
                src={post.postImage}
                alt={'post-img'}
                width={600}
                height={300}
                style={{ objectFit: 'contain' }}
              />
            )}
          </div>
          <div className={styles['small-text']}>
            <span>{moment(post._createdAt).format('YYYY-MM-DD, HH:mm')}</span>
            <span>{post.createdBy}</span>
          </div>
          <div className={styles.content}>{post.content}</div>
        </div>
      )}
    </>
  );
};

export default Post;
