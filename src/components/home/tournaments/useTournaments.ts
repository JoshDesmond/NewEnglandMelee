import { useState, useEffect } from 'react';
import { Tournament } from '../../../lib/types';
import { mockTournaments } from './MockTournaments';

// TODO replace with query to services/startgg.ts
const fetchTournaments = async (): Promise<Tournament[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return mockTournaments;
};

export function useTournaments() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchTournaments()
      .then(setTournaments)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { tournaments, loading, error };
} 