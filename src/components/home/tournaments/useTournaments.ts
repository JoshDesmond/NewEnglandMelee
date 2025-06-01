import { useState, useEffect } from 'react';
import { Tournament } from '../../../lib/types';
import { calendarService } from '../../../services/calendar';

export function useTournaments() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    calendarService.getTournaments()
      .then(setTournaments)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { tournaments, loading, error };
} 
