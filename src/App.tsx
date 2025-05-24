import React from 'react';
import Header from './components/layout/Header';
import Hero from './components/home/Hero';
import Footer from './components/layout/Footer';
import Introduction from './components/home/Introduction';
import Tournaments from './components/home/tournaments/Tournaments';
import DiscordSection from './components/home/DiscordSection';
import QuickLinks from './components/home/QuickLinks';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Hero />
      <main className="container mx-auto px-4 py-12">
        <Introduction />
        <Tournaments />
        <DiscordSection />
        <QuickLinks />
      </main>
      <Footer />
    </div>
  );
};

export default App; 