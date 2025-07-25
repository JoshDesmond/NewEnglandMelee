import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Navigation from '../Navigation';
import logoImg from '../../../assets/NEM_Logo_Transparent.png';

const DefaultHeader: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-gray-900 shadow-md">
      <div className="flex items-start justify-between px-2 py-4">
        {/* Logo */}
        <div className="flex items-start">
          <a href="/" className="hover:opacity-80 transition-opacity">
            <img
              src={logoImg}
              alt="New England Melee Logo"
              width={120}
              height={50}
              loading="lazy"
              className="h-auto"
            />
          </a>
        </div>
          
        {/* Desktop Navigation */}
        <Navigation className="hidden md:flex items-start" />
          
        {/* Mobile hamburger menu button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white p-2 relative z-[100]"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="fixed top-0 left-0 right-0 bg-gray-900 bg-opacity-95 shadow-lg md:hidden z-50">
          <div className="p-4">
            <div className="flex items-start justify-between">
              <Navigation
                className="flex flex-col space-y-4 pt-2"
                onLinkClick={() => setMobileMenuOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default DefaultHeader; 