import 'dotenv/config';
import * as express from 'express';
import * as cors from 'cors';
import { calendarService } from './calendar';
import { Tournament } from '@shared/types';

const app = express();
const port = process.env.PORT || 3001;

// Enable CORS for your frontend
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173' // Vite's default port
}));

// Simple in-memory cache for tournaments
let tournamentsCache: Tournament[] | null = null;
let lastFetchTime: number | null = null;

// Background refresh function
async function refreshTournamentsCache() {
  try {
    console.log('Background refresh: Fetching fresh tournament data');
    const tournaments = await calendarService.getTournaments();
    tournamentsCache = tournaments;
    lastFetchTime = Date.now();
    console.log(`Background refresh: Successfully cached ${tournaments.length} tournaments`);
  } catch (error) {
    console.error('Background refresh: Error fetching tournaments:', error);
    // Don't update cache on error - keep using old data
  }
}

// Start background refresh
const REFRESH_INTERVAL = 6 * 60 * 1000; // 6 minutes in milliseconds
setInterval(refreshTournamentsCache, REFRESH_INTERVAL);

// Initial fetch
refreshTournamentsCache().catch(error => {
  console.error('Initial tournament fetch failed:', error);
});

// Single endpoint for tournaments
app.get('/api/tournaments', async (req, res) => {
  console.log('Received request to /api/tournaments');
  
  try {
    // If we have cached data, serve it immediately
    if (tournamentsCache !== null) {
      console.log(`Serving ${tournamentsCache.length} tournaments from cache`);
      return res.json(tournamentsCache);
    }

    // If no cache exists (should only happen on first request after server start),
    // fetch fresh data
    console.log('No cache available, fetching fresh tournament data');
    const tournaments = await calendarService.getTournaments();
    tournamentsCache = tournaments;
    lastFetchTime = Date.now();
    
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
  res.json({ 
    status: 'ok',
    lastFetchTime: lastFetchTime ? new Date(lastFetchTime).toISOString() : null,
    tournamentCount: tournamentsCache?.length ?? 0
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); 
