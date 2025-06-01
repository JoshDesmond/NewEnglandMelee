import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest';
import request from 'supertest';
import express from 'express';
import cors from 'cors';
import { calendarService } from '../calendar';

// Create a test app instance
const app = express();
app.use(cors({
  origin: 'http://localhost:5173'
}));

// Mock the calendar service
vi.mock('../calendar', () => ({
  calendarService: {
    getTournaments: vi.fn().mockResolvedValue([
      {
        id: 'test-tournament-1',
        name: 'Test Tournament 1',
        dateTime: '2024-03-20T17:30:00-04:00',
        url: 'https://example.com/tournament1',
        created: '2024-03-01T00:00:00.000Z',
        updated: '2024-03-01T00:00:00.000Z',
        address: 'Test Location, MA'
      }
    ])
  }
}));

// Add the routes to the test app
app.get('/api/tournaments', async (req, res) => {
  try {
    const tournaments = await calendarService.getTournaments();
    res.json(tournaments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tournaments' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

describe('Server Endpoints', () => {
  it('health check endpoint should return ok', async () => {
    const response = await request(app)
      .get('/api/health')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual({ status: 'ok' });
  });

  it('tournaments endpoint should return tournament data', async () => {
    const response = await request(app)
      .get('/api/tournaments')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0]).toMatchObject({
      id: 'test-tournament-1',
      name: 'Test Tournament 1',
      dateTime: '2024-03-20T17:30:00-04:00',
      url: 'https://example.com/tournament1',
      address: 'Test Location, MA'
    });
  });

  it('tournaments endpoint should handle errors', async () => {
    // Mock the calendar service to throw an error
    vi.mocked(calendarService.getTournaments).mockRejectedValueOnce(new Error('Test error'));

    const response = await request(app)
      .get('/api/tournaments')
      .expect('Content-Type', /json/)
      .expect(500);

    expect(response.body).toEqual({ error: 'Failed to fetch tournaments' });
  });
}); 