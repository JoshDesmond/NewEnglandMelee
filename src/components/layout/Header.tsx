import React from 'react';
import { useLocation } from 'react-router-dom';
import HomeHeader from './headers/HomeHeader';
import DefaultHeader from './headers/DefaultHeader';

const Header: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return isHomePage ? <HomeHeader /> : <DefaultHeader />;
};

export default Header; 