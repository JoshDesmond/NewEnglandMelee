import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Navigation from './Navigation';
import logoImg from '../../assets/NEM_Logo_Transparent.png';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="flex items-start justify-between px-2 py-4">
        {/* Logo - minimal padding */}
        <div className="flex items-start">
          <img
            src={logoImg}
            alt="New England Melee Logo"
            width={120}
            height={50}
            loading="lazy"
            className="h-auto"
          />
        </div>
          
        {/* Desktop Navigation - top right with minimal padding */}
        <Navigation className="hidden md:flex items-start" />
          
        {/* Mobile hamburger menu button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white p-2"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Hamburger Navigation Menu */}
      {mobileMenuOpen && (
        <div className="fixed top-0 left-0 right-0 bg-gray-900 bg-opacity-95 shadow-lg md:hidden">
          <div className="p-2">
            <div className="flex items-center justify-between">
              <Navigation
                className="flex flex-col space-y-4"
                onLinkClick={() => setMobileMenuOpen(false)}
              />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-white p-2"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header; 