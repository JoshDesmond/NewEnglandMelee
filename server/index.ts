import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { calendarService } from './calendar';
import { Tournament, GoogleCalendarEvent } from '@shared/types';

const app = express();
const port = process.env.PORT || 3001;

// Enable CORS for your frontend
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173' // Vite's default port
}));

// Simple in-memory cache
interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const cache: {
  tournaments?: CacheEntry<Tournament[]>;
} = {};

const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

// Helper to check if cache is valid
const isCacheValid = (entry: CacheEntry<any> | undefined): boolean => {
  if (!entry) return false;
  return Date.now() - entry.timestamp < CACHE_DURATION;
};

// Single endpoint for tournaments
app.get('/api/tournaments', async (req, res) => {
  console.log('Received request to /api/tournaments');
  console.log('Request headers:', req.headers);
  
  try {
    // Check cache first
    if (isCacheValid(cache.tournaments)) {
      const tournaments = cache.tournaments!.data;
      const tournamentsWithCoords = tournaments.filter(t => t.coordinates !== undefined).length;
      console.log(`Serving ${tournaments.length} tournaments from cache (${tournamentsWithCoords} have coordinates)`);
      return res.json(tournaments);
    }

    // Fetch fresh data
    console.log('Fetching fresh tournament data');
    const tournaments = await calendarService.getTournaments();
    const tournamentsWithCoords = tournaments.filter(t => t.coordinates !== undefined).length;
    console.log(`Fetched ${tournaments.length} tournaments (${tournamentsWithCoords} have coordinates)`);

    // Update cache
    cache.tournaments = {
      data: tournaments,
      timestamp: Date.now()
    };

    console.log('Successfully fetched tournaments, sending response');
    res.json(tournaments);
  } catch (error) {
    console.error('Error in /api/tournaments endpoint:', error);
    
    // Check if it's an error with a status code (like from Google API)
    if (error && typeof error === 'object' && 'status' in error) {
      const statusError = error as { status: number; message?: string };
      console.log('Sending error response with status:', statusError.status);
      return res.status(statusError.status).json({ 
        error: statusError.message || 'Failed to fetch tournaments',
        details: error
      });
    }
    
    // For other types of errors, return 500
    console.log('Sending 500 error response');
    res.status(500).json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : String(error)
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); 