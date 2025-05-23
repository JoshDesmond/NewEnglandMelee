import React from 'react';

interface NavigationProps {
  className?: string;
  onLinkClick?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ className = '', onLinkClick }) => {
  const navItems = [
    { href: '#', label: 'Home' },
    { href: '#tournaments', label: 'Tournaments' },
    { href: '/blog', label: 'Blog' },
    { href: '/calendar', label: 'Calendar' },
    { href: '/shop', label: 'Shop' },
    { href: '/code-of-conduct', label: 'Code of Conduct' },
  ];

  return (
    <nav className={className}>
      {navItems.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className="text-white hover:text-blue-300 transition"
          onClick={onLinkClick}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
};

export default Navigation; 