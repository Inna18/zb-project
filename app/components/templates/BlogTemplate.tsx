'use client';
import styles from './templates.module.css';

import React from 'react';
import PostList from '../organisms/PostList';
import Post from '../organisms/Post';

import { useSearchParams } from 'next/navigation';

const BlogTemplate = () => {
  const postId = useSearchParams()?.get('postId');

  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>Blog</div>
        <div className={styles.blog}>
          {postId ? <Post postId={postId} /> : <PostList />}
        </div>
      </div>
    </>
  );
};

export default BlogTemplate;
