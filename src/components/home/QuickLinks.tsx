import React from 'react';
import { BookOpen, ShoppingCart, User } from 'lucide-react';

interface QuickLinkCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  linkText: string;
}

const QuickLinkCard: React.FC<QuickLinkCardProps> = ({ icon, title, description, href, linkText }) => (
  <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
    <div className="flex items-center mb-4">
      {icon}
      <h3 className="text-xl font-bold text-gray-800 ml-3">{title}</h3>
    </div>
    <p className="text-gray-600 mb-4">
      {description}
    </p>
    <a href={href} className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center">
      {linkText}
      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
      </svg>
    </a>
  </div>
);

const QuickLinks: React.FC = () => {
  const quickLinks = [
    {
      icon: <BookOpen className="text-blue-600" size={24} />,
      title: 'Blog',
      description: 'Stay updated with the latest news, tournament recaps, and player spotlights from the New England Melee scene.',
      href: '/blog',
      linkText: 'Read the blog'
    },
    {
      icon: <ShoppingCart className="text-blue-600" size={24} />,
      title: 'Shop',
      description: 'Check out our store for New England Melee merchandise!\n\n',
      href: 'https://merch.newenglandmelee.com',
      linkText: 'Shop for Merch'
    },
    {
      icon: <User className="text-blue-600" size={24} />,
      title: 'Code of Conduct',
      description: 'Review our commitment to maintaining a safe, respectful, and inclusive environment at all NEM events.',
      href: '/code-of-conduct',
      linkText: 'Read our policy'
    }
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
      {quickLinks.map((link) => (
        <QuickLinkCard key={link.title} {...link} />
      ))}
    </section>
  );
};

export default QuickLinks; 