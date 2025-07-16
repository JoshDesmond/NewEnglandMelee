import React from 'react';
import BlogList from './BlogList';

const BlogPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Journal Header */}
        <header className="text-center mb-12 border-b-2 border-gray-300 pb-8">
          <h1 className="text-4xl font-bold mb-2 text-gray-900 tracking-tight font-journal-serif">
            The New England Journal of Melee
          </h1>
          <p className="text-sm text-gray-600 uppercase tracking-wider font-journal-sans">
            Established 2025 • Volume 1 • Issue 1
          </p>
          <div className="mt-4 text-xs text-gray-500 font-journal-sans">
            A Scholarly Publication of the New England Melee Community
          </div>
        </header>
        
        <BlogList />
      </div>
    </div>
  );
};

export default BlogPage; 