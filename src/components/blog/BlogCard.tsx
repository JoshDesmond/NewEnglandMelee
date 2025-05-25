import React from 'react';
import { Link } from 'react-router-dom';

interface BlogPost {
  id: number;
  title: string;
  author: string;
  date: string;
  excerpt: string;
  slug: string;
  image: string;
}

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <article className="bg-white rounded-xl shadow-lg flex flex-col md:flex-row overflow-hidden hover:shadow-2xl transition-shadow border border-gray-100">
      <img
        src={post.image}
        alt={post.title}
        className="w-full md:w-48 h-48 object-cover object-center md:rounded-l-xl md:rounded-r-none rounded-t-xl"
      />
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">
            <Link to={`/blog/${post.slug}`} className="text-blue-700 hover:text-blue-900 transition-colors">
              {post.title}
            </Link>
          </h2>
          <div className="flex items-center text-sm text-gray-500 mb-4 gap-2">
            <span className="font-medium">{post.author}</span>
            <span className="mx-2">•</span>
            <span>{new Date(post.date).toLocaleDateString()}</span>
          </div>
          <p className="text-gray-700 text-base line-clamp-3">{post.excerpt}</p>
        </div>
      </div>
    </article>
  );
};

export default BlogCard; 