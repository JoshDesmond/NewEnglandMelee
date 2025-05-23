import React from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Introduction from './components/home/Introduction';
import Tournaments from './components/home/Tournaments';
import DiscordSection from './components/home/DiscordSection';
import QuickLinks from './components/home/QuickLinks';
import { Tournament } from './lib/types';

// Mock data for demonstration
const MOCK_TOURNAMENTS: Tournament[] = [
  {
    id: 1,
    name: "New Game Plus",
    address: "123 Main St, Boston, MA",
    dateTime: "2025-05-10T16:00:00",
    startggLink: "https://start.gg/tournament/game-over-monthly",
    discordLink: "https://discord.gg/nemchannel-gameover",
    lat: 42.3601,
    lng: -71.0589,
    isRecurring: true,
    weeklySchedule: "Every Tuesday at 6:00 PM"
  },
  {
    id: 2,
    name: "Pho Thai Melee",
    address: "456 Game Ave, Cambridge, MA",
    dateTime: "2025-05-15T18:00:00",
    startggLink: "https://start.gg/tournament/smashing-grounds",
    discordLink: "https://discord.gg/nemchannel-grounds",
    lat: 42.3736,
    lng: -71.1097,
    isRecurring: true,
    weeklySchedule: "Every Friday at 7:00 PM"
  },
  {
    id: 3,
    name: "HoG Monthly",
    address: "789 Falcon St, Hartford, CT",
    dateTime: "2025-05-18T12:00:00",
    startggLink: "https://start.gg/tournament/connecticut-monthly",
    discordLink: "https://discord.gg/nemchannel-ct",
    lat: 41.7658,
    lng: -72.6734,
    isRecurring: false
  },
  {
    id: 4,
    name: "Burlington Brawl",
    address: "321 Shine Dr, Burlington, VT",
    dateTime: "2025-05-24T15:00:00",
    startggLink: "https://start.gg/tournament/burlington-brawl",
    discordLink: "https://discord.gg/nemchannel-burlington",
    lat: 44.4759,
    lng: -73.2121,
    isRecurring: true,
    weeklySchedule: "Every Saturday at 3:00 PM"
  }
];

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <Introduction />
        <Tournaments tournaments={MOCK_TOURNAMENTS} />
        <DiscordSection />
        <QuickLinks />
      </main>

      <Footer />
    </div>
  );
};

export default App; 