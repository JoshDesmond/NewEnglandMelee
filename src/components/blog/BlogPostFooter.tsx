import React from 'react';

const BlogPostFooter: React.FC = () => {
  return (
    <footer className="mt-12 pt-8">
      {/* Sleek grey line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-6"></div>
      
      {/* Italicized footer text */}
      <div className="text-center">
        <p className="text-sm text-gray-500 italic font-journal-sans">
          About the author: Desmond is the lead developer of the New England Melee website and founder of Automati Solutions, 
          a technical consulting firm for small businesses. Learn more at{' '}
          <a 
            href="https://automatisolutions.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            automatisolutions.com
          </a>
        </p>
      </div>
    </footer>
  );
};

export default BlogPostFooter; 