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
        <div className="flex flex-col justify-center items-center h-64">
          <p className="text-red-600">Error loading tournaments: {error.error}</p>
          {error.details && (
            <p className="text-red-500 text-sm mt-2">
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