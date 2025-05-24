import React from 'react';
import Hero from './Hero';
import Introduction from './Introduction';
import Tournaments from './tournaments/Tournaments';
import DiscordSection from './DiscordSection';
import QuickLinks from './QuickLinks';

const HomePage: React.FC = () => {
  return (
    <div>
      <Hero />
      <div className="container mx-auto px-4 py-12">
        <Introduction />
        <Tournaments />
        <DiscordSection />
        <QuickLinks />
      </div>
    </div>
  );
};

export default HomePage; 