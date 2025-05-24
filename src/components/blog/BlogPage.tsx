import React from 'react';
import BlogList from './BlogList';

const BlogPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      <BlogList />
    </div>
  );
};

export default BlogPage; 