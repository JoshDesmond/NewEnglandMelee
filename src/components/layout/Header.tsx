import React from 'react';
import { useLocation } from 'react-router-dom';
import HomeHeader from './headers/HomeHeader';
import DefaultHeader from './headers/DefaultHeader';
import BlogPostHeader from './headers/BlogPostHeader';

const Header: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isBlogPostPage = location.pathname.startsWith('/blog/') && location.pathname !== '/blog';

  if (isHomePage) {
    return <HomeHeader />;
  }
  
  if (isBlogPostPage) {
    return <BlogPostHeader />;
  }
  
  return <DefaultHeader />;
};

export default Header; 