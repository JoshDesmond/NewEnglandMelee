import React from 'react';
import { Calendar } from 'lucide-react';
import { Tournament } from '../../lib/types';
import TournamentCard from '../ui/TournamentCard';

interface TournamentsProps {
  tournaments: Tournament[];
}

const Tournaments: React.FC<TournamentsProps> = ({ tournaments }) => {
  return (
    <section id="tournaments" className="mb-16">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Upcoming Tournaments</h2>
        <a href="/calendar" className="flex items-center text-blue-600 hover:text-blue-800 font-medium">
          <Calendar className="mr-1" size={18} />
          View Full Calendar
        </a>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
        {/* Map Component Placeholder */}
        <div className="w-full h-80 bg-gray-200 rounded-lg mb-8 overflow-hidden relative">
          {/* This would be your actual map component */}
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
            <p className="text-gray-500">Interactive tournament map would display here</p>
            {/* For each tournament, we would render a marker at (tournament.lat, tournament.lng) */}
            {tournaments.map(tournament => (
              <div
                key={tournament.id}
                className="absolute w-4 h-4 bg-red-500 rounded-full transform -translate-x-2 -translate-y-2"
                style={{
                  // Simplified positioning for mockup
                  left: `${((tournament.lng + 80) / 15) * 100}%`,
                  top: `${100 - ((tournament.lat - 40) / 10) * 100}%`
                }}
              />
            ))}
          </div>
        </div>

        <div className="mb-4 text-sm text-gray-600">
          <p>
            <span className="font-semibold">Data sources:</span> Our tournament data is pulled from{' '}
            <a href="https://start.gg" className="text-blue-600 hover:underline">start.gg</a>.
            For a more comprehensive view including recurring events, check our{' '}
            <a href="/calendar" className="text-blue-600 hover:underline">community calendar</a>.
          </p>
        </div>

        {/* Tournament List */}
        <div className="space-y-6">
          {tournaments.map(tournament => (
            <TournamentCard key={tournament.id} tournament={tournament} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tournaments; 