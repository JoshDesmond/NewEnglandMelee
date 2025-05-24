import React from 'react';
import { useParams } from 'react-router-dom';

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  return (
    <div className="container mx-auto px-4 py-12">
      <article className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Blog Post: {slug}</h1>
        <p className="text-gray-600">This is a placeholder for the blog post content.</p>
      </article>
    </div>
  );
};

export default BlogPostPage; 