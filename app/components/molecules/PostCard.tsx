import styles from './molecules.module.css';

import React from 'react';
import Image from 'next/image';
import Post from '@/app/service/usePostApi';
import moment from 'moment';

import { limit } from '@/app/utils/text';

interface PostCartProps {
  post: Post;
}

const PostCard = ({ post }: PostCartProps) => {
  return (
    <div className={styles['post-card']}>
      <div className={styles.img}>
        {post.postImage ? (
          <Image
            src={post.postImage}
            alt={'test'}
            width={200}
            height={140}
            style={{ objectFit: 'contain' }}
          />
        ) : (
          <div className={styles.centered}>No Image</div>
        )}
      </div>
      <div className={styles.content}>
        <div className={styles.title}>{post.title}</div>
        <div>{limit(post.content, 200)}</div>
        <div className={styles['small-text']}>
          <span>{post.createdBy} </span>
          <span>{moment(post._createdAt).format('YYYY-MM-DD, HH:mm')}</span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
