import React from 'react';
import BlogCard from './BlogCard';
import { useStrapiBlogPosts } from '../../hooks/useStrapi';

const BlogList: React.FC = () => {
  const { posts, loading } = useStrapiBlogPosts();

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 font-journal-sans">
          Loading articles...
        </div>
        <div className="text-xs text-gray-400 mt-2 font-journal-sans">
          Please wait while we retrieve the latest research
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <div key={post.id} className="border-b border-gray-200 pb-6 last:border-b-0">
          <BlogCard post={post} />
        </div>
      ))}
    </div>
  );
};

export default BlogList; 