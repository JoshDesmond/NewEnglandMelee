import React from 'react';
import BlogList from './BlogList';

const BlogPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-extrabold mb-10 text-center text-gray-900 drop-shadow-sm">Blog</h1>
        <BlogList />
      </div>
    </div>
  );
};

export default BlogPage; 