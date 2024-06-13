'use client';

import React, { Suspense } from 'react';
import PostForm from '../molecules/PostForm';

const BlogFixTemplate = () => {
  return (
    <div>
      <Suspense>
        <PostForm />
      </Suspense>
    </div>
  );
};

export default BlogFixTemplate;
