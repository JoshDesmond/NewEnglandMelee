import React, { useState, useEffect } from 'react';
import { MapPin, MessageCircle } from 'lucide-react';
import bannerImg from '../../assets/banner.png';

const Hero: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = new window.Image();
    img.src = bannerImg;
    img.onload = () => setIsLoaded(true);
  }, []);

  return (
    <div className="relative h-[500px]">
      {/* Background image with blur */}
      <div className="absolute inset-0" aria-hidden="true">
        {/* Black background to contain blur */}
        <div className="absolute inset-0 bg-black" />
        <img
          src={bannerImg}
          alt="New England Melee banner background"
          className={`w-full h-full object-cover object-right blur-sm brightness-50 transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          style={{ position: 'absolute', inset: 0 }}
        />
      </div>
      
      {/* Hero content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg">New England Melee</h1>
        <p className="text-xl md:text-2xl font-medium text-gray-200 max-w-3xl drop-shadow">
          The official Super Smash Bros. Melee community in the Northeast
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <a 
            href="#tournaments" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition shadow-lg flex items-center"
          >
            <MapPin className="mr-2" size={18} />
            Find Tournaments
          </a>
          <a 
            href="https://discord.com/invite/zfemYAwWbj" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition shadow-lg flex items-center"
          >
            <MessageCircle className="mr-2" size={18} />
            Join Discord
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero; 