import React from 'react';
import BlogCard from './BlogCard';

const BlogList: React.FC = () => {
  // Placeholder data - will be replaced with real data later
  const posts = [
    { id: 1, title: 'Sample Post 1', excerpt: 'This is a sample blog post', slug: 'sample-post-1' },
    { id: 2, title: 'Sample Post 2', excerpt: 'Another sample blog post', slug: 'sample-post-2' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map(post => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default BlogList; 