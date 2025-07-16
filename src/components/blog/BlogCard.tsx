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
    <article className="group">
      {/* Mobile Layout (default) */}
      <div className="md:hidden">
        {/* Title and Image Row */}
        <div className="flex gap-4 mb-3">
          <h2 className="text-lg font-bold leading-tight font-journal-serif flex-1">
            <Link 
              to={`/blog/${post.slug}`} 
              className="text-gray-900 hover:text-blue-800 transition-colors duration-200"
            >
              {post.title}
            </Link>
          </h2>
          <div className="flex-shrink-0">
            <img
              src={post.image}
              alt={post.title}
              className="w-20 h-16 object-cover rounded border border-gray-200"
            />
          </div>
        </div>
        
        {/* Author and Date */}
        <div className="flex items-center text-sm text-gray-600 mb-3 font-journal-sans">
          <span className="font-medium">{post.author}</span>
          <span className="mx-2">•</span>
          <span>{new Date(post.date).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</span>
        </div>

        {/* Abstract */}
        <p className="text-gray-700 text-sm leading-relaxed font-journal-sans mb-3">
          {post.excerpt}
        </p>
        
        {/* Read More Link */}
        <Link 
          to={`/blog/${post.slug}`}
          className="text-blue-700 hover:text-blue-900 text-sm font-medium inline-flex items-center group/link font-journal-sans"
        >
          Read Full Article
          <svg 
            className="w-3 h-3 ml-1 group-hover/link:translate-x-1 transition-transform" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block">
        {/* Article Header */}
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2 leading-tight font-journal-serif">
            <Link 
              to={`/blog/${post.slug}`} 
              className="text-gray-900 hover:text-blue-800 transition-colors duration-200"
            >
              {post.title}
            </Link>
          </h2>
          
          {/* Author and Date */}
          <div className="flex items-center text-sm text-gray-600 mb-3 font-journal-sans">
            <span className="font-medium">{post.author}</span>
            <span className="mx-2">•</span>
            <span>{new Date(post.date).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
          </div>
        </div>

        {/* Article Content */}
        <div className="flex gap-6">
          {/* Image */}
          <div className="flex-shrink-0">
            <img
              src={post.image}
              alt={post.title}
              className="w-32 h-24 object-cover rounded border border-gray-200"
            />
          </div>
          
          {/* Abstract */}
          <div className="flex-1">
            <p className="text-gray-700 text-sm leading-relaxed font-journal-sans">
              {post.excerpt}
            </p>
            
            {/* Read More Link */}
            <div className="mt-3">
              <Link 
                to={`/blog/${post.slug}`}
                className="text-blue-700 hover:text-blue-900 text-sm font-medium inline-flex items-center group/link font-journal-sans"
              >
                Read Full Article
                <svg 
                  className="w-3 h-3 ml-1 group-hover/link:translate-x-1 transition-transform" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogCard; 