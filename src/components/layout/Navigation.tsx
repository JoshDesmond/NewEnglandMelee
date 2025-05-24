import React from 'react';

interface NavigationProps {
  className?: string;
  onLinkClick?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ className = '', onLinkClick }) => {
  const navItems = [
    { href: '/#', label: 'Home' },
    { href: '/#tournaments', label: 'Tournaments' },
    { href: '/blog', label: 'Blog' },
    { href: 'https://calendar.google.com/calendar/u/0/embed?src=86oup09opi66vbhshrftu4uijs@group.calendar.google.com&ctz=America/New_York', label: 'Calendar' },
    { href: 'https://shop.newenglandmelee.com', label: 'Shop' },
    { href: '/code-of-conduct', label: 'Code of Conduct' },
  ];

  return (
    <nav className={`flex ${className}`}>
      {navItems.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className="text-white text-xl hover:text-blue-300 transition px-4"
          onClick={onLinkClick}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
};

export default Navigation; 