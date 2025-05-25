import React from 'react';
import BlogCard from './BlogCard';
import { useStrapiBlogPosts } from '../../hooks/useStrapi';

const BlogList: React.FC = () => {
  const { posts, loading } = useStrapiBlogPosts();

  if (loading) {
    return <div className="text-center py-12 text-gray-500">Loading blog posts...</div>;
  }

  return (
    <div className="flex flex-col gap-8 max-w-2xl mx-auto py-4 overflow-y-auto">
      {posts.map(post => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default BlogList; 