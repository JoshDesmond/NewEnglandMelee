import React from 'react';
import { MapPin, Calendar, Award, MessageCircle } from 'lucide-react';
import { Tournament } from '../../../lib/types';

interface TournamentCardProps {
  tournament: Tournament;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const TournamentCard: React.FC<TournamentCardProps> = ({ tournament }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800">{tournament.name}</h3>
          <div className="flex items-center text-gray-600 mt-1">
            <MapPin size={16} className="mr-1 text-gray-400" />
            <span>{tournament.address}</span>
          </div>
          <div className="mt-2">
            <span className="text-gray-700 font-medium">
              <span className="flex items-center">
                <Calendar size={16} className="mr-1 text-gray-400" />
                {formatDate(tournament.dateTime)}
              </span>
            </span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {tournament.startggLink && (
            <a
              href={tournament.startggLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md text-sm font-medium flex items-center transition-colors"
            >
              <Award size={16} className="mr-1" />
              start.gg
            </a>
          )}
          {tournament.discordLink && (
            <a
              href={tournament.discordLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md text-sm font-medium flex items-center transition-colors"
            >
              <MessageCircle size={16} className="mr-1" />
              Discord
            </a>
          )}
          {!tournament.startggLink && !tournament.discordLink && (
            <span className="text-sm text-gray-500 italic">No links available</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default TournamentCard; 