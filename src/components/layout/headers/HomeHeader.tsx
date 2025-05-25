import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Navigation from '../Navigation';
import logoImg from '../../../assets/NEM_Logo_Transparent.png';

const HomeHeader: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="flex items-start justify-end px-2 py-4">
        {/* Desktop Navigation - top right */}
        <Navigation className="hidden md:flex items-start" />
          
        {/* Mobile hamburger menu button - top right */}
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

      {/* Mobile Hamburger Popup Navigation Menu */}
      {mobileMenuOpen && (
        <div className="fixed top-0 left-0 right-0 bg-gray-900 bg-opacity-95 shadow-lg md:hidden z-50">
          <div className="p-4">
            <div className="flex items-start justify-between">
              <Navigation
                className="flex flex-col space-y-4"
                onLinkClick={() => setMobileMenuOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default HomeHeader; 