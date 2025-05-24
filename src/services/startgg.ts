import { Tournament } from '../lib/types';

/**
 * Tournaments should be cached locally for 5 minutes
 */
let tournamentCache: { data: Tournament[]; timestamp: number } | null = null;
const CACHE_DURATION = 5 * 60 * 1000;

async function queryStartGG(): Promise<Tournament[]> {
  // Your actual GraphQL query implementation
 /*  const response = await fetch('https://api.start.gg/gql/alpha', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: '...' }) // TODO
  }); */
  // Parse and return data
  return []
}

export async function fetchTournaments(): Promise<Tournament[]> {
  const now = Date.now();
  
  if (tournamentCache && (now - tournamentCache.timestamp) < CACHE_DURATION) {
    return tournamentCache.data;
  }
  
  const data = await queryStartGG();
  tournamentCache = { data, timestamp: now };
  return data;
}
