import React from 'react';
import { useParams } from 'react-router-dom';
import { useStrapiBlogPost } from '../../hooks/useStrapi';

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { post, loading } = useStrapiBlogPost(slug);

  if (loading) {
    return <div className="text-center py-12 text-gray-500">Loading post...</div>;
  }
  if (!post) {
    return <div className="text-center py-12 text-red-500">Post not found.</div>;
  }

  const renderContent = (content: any[]) => {
    return content.map((block, index) => {
      if (block.type === 'paragraph') {
        return (
          <p key={index} className="mb-4">
            {block.children.map((child: any, childIndex: number) => {
              if (child.type === 'text') {
                return <span key={childIndex}>{child.text}</span>;
              }
              if (child.type === 'link') {
                return (
                  <a 
                    key={childIndex} 
                    href={child.url} 
                    className="text-blue-600 hover:text-blue-800 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {child.children[0].text}
                  </a>
                );
              }
              return null;
            })}
          </p>
        );
      }
      return null;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 py-16 px-4">
      <article className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <img src={post.image} alt={post.title} className="w-full h-64 object-cover rounded-lg mb-6" />
        <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
        <div className="flex items-center text-sm text-gray-500 mb-6 gap-2">
          <span className="font-medium">{post.author}</span>
          <span className="mx-2">•</span>
          <span>{new Date(post.date).toLocaleDateString()}</span>
        </div>
        <div className="text-lg text-gray-800">
          {renderContent(post.content)}
        </div>
      </article>
    </div>
  );
};

export default BlogPostPage; 