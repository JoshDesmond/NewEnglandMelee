import React from 'react';
import { Link } from 'react-router-dom';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  slug: string;
}

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <article className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h2 className="text-xl font-semibold mb-2">
        <Link to={`/blog/${post.slug}`} className="text-blue-600 hover:text-blue-800">
          {post.title}
        </Link>
      </h2>
      <p className="text-gray-600">{post.excerpt}</p>
    </article>
  );
};

export default BlogCard; 