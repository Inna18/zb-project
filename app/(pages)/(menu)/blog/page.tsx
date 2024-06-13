import React, { Suspense } from 'react';
import BlogTemplate from '@/app/components/templates/BlogTemplate';

const Blog = () => {
  return (
    <div>
      <Suspense>
        <BlogTemplate />
      </Suspense>
    </div>
  );
};

export default Blog;
