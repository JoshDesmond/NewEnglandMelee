import React from 'react';
import { Tournament } from '../../../lib/types';

interface TournamentMapProps {
  tournaments: Tournament[];
}

const TournamentMap: React.FC<TournamentMapProps> = ({ tournaments }) => {
  return (
    <div className="w-full h-80 bg-gray-200 rounded-lg mb-8 overflow-hidden relative">
      <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500">Interactive tournament map would display here</p>
        {tournaments.map(tournament => (
          <div
            key={tournament.id}
            className="absolute w-4 h-4 bg-red-500 rounded-full transform -translate-x-2 -translate-y-2"
            style={{
              left: `${((tournament.lng + 80) / 15) * 100}%`,
              top: `${100 - ((tournament.lat - 40) / 10) * 100}%`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default TournamentMap; 