import React from 'react';
import { Calendar } from 'lucide-react';
import TournamentCard from './TournamentCard';
import TournamentMap from './TournamentMap';
import { useTournaments } from './useTournaments';

const Tournaments: React.FC = () => {
  const { tournaments, loading, error } = useTournaments();

  if (loading) {
    return (
      <section id="tournaments" className="mb-16">
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-600">Loading tournaments...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="tournaments" className="mb-16">
        <div className="flex flex-col justify-center items-center h-64 text-center px-4">
          <p className="text-red-600 mb-2">
            Error: {error.error}
          </p>
          <p className="text-gray-700 mb-4">
            It looks like there was an issue populating the list of tournaments. Check out the full list of tournaments on the{' '}
            <a 
              href="https://calendar.google.com/calendar/u/0/embed?src=86oup09opi66vbhshrftu4uijs@group.calendar.google.com&ctz=America/New_York" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              community calendar
            </a>
            {' '}instead!
          </p>
          {error.details && (
            <p className="text-gray-500 text-sm">
              {typeof error.details === 'string' ? error.details : JSON.stringify(error.details)}
            </p>
          )}
        </div>
      </section>
    );
  }

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
        <TournamentMap tournaments={tournaments} />


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