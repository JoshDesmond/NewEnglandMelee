import { useState, useEffect } from 'react';
import { Tournament } from '@shared/types';
import { getTournaments } from '../../../services/tournaments';

interface ApiError {
  error: string;
  details?: any;
}

export function useTournaments() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  useEffect(() => {
    getTournaments()
      .then(setTournaments)
      .catch((err) => {
        // If the error is from our API response, use its error details
        if (err.response?.data) {
          setError(err.response.data);
        } else {
          // For other errors (like network errors), create a generic error
          setError({ 
            error: 'Failed to fetch tournaments',
            details: err.message || String(err)
          });
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return { tournaments, loading, error };
} 
