import { Tournament } from '@shared/types';

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
  
  const data = await queryStartGG();
  return data;
}
