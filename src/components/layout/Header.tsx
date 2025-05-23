import React, { useState } from 'react';
import { Menu, X, MapPin, MessageCircle } from 'lucide-react';
import Navigation from './Navigation';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="relative h-96">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: 'url("/api/placeholder/1200/600")', 
          filter: 'blur(4px) brightness(0.7)'
        }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="relative z-10 flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <span className="text-white text-2xl font-bold">LOGO</span>
        </div>
        
        {/* Desktop Navigation */}
        <Navigation className="hidden md:flex items-center space-x-8" />
        
        {/* Mobile menu button */}
        <div className="md:hidden">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white p-2"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="absolute top-16 right-0 z-20 w-64 bg-gray-900 bg-opacity-95 p-4 rounded-bl-lg shadow-lg">
          <Navigation 
            className="flex flex-col space-y-4" 
            onLinkClick={() => setMobileMenuOpen(false)}
          />
        </div>
      )}
      
      {/* Hero Title */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">New England Melee</h1>
        <p className="text-xl md:text-2xl font-medium text-gray-200 max-w-3xl">
          The official Super Smash Bros. Melee community in the Northeast
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <a href="#tournaments" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition shadow-lg flex items-center">
            <MapPin className="mr-2" size={18} />
            Find Tournaments
          </a>
          <a href="https://discord.gg/newenglandmelee" target="_blank" rel="noopener noreferrer" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition shadow-lg flex items-center">
            <MessageCircle className="mr-2" size={18} />
            Join Discord
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header; 