import { Tournament } from '@shared/types';

const API_URL = import.meta.env.VITE_API_URL || 'https://newenglandmelee.com';

export async function getTournaments(): Promise<Tournament[]> {
  console.log('Fetching tournaments from:', `${API_URL}/api/tournaments`);
  
  try {
    const response = await fetch(`${API_URL}/api/tournaments`, {
      headers: {
        'Accept': 'application/json',
      },
    });
    
    console.log('Received response:', {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries())
    });
    
    if (!response.ok) {
      // Try to parse the error response from our server
      const errorData = await response.json().catch((e) => {
        console.error('Failed to parse error response:', e);
        return null;
      });
      
      console.log('Error response data:', errorData);
      
      if (errorData && typeof errorData === 'object' && 'error' in errorData) {
        throw errorData; // This will be our ApiError type
      }
      // Fallback to generic error if we can't parse the response
      throw {
        error: 'Failed to fetch tournaments',
        details: `${response.status} ${response.statusText}`
      };
    }

    const data = await response.json();
    console.log('Successfully parsed tournament data');
    return data;
  } catch (error) {
    console.error('Error in getTournaments:', error);
    throw error;
  }
} 
