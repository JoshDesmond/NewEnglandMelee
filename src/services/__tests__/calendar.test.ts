import { describe, it, expect, beforeAll, afterAll, beforeEach, vi } from 'vitest';
import { tournamentService } from '../calendar';
import { GoogleCalendarResponse } from '../../lib/types';
import mockCalendarResponseJson from './calendarResponse.json';

// Assert the type of the imported JSON
const mockCalendarResponse = mockCalendarResponseJson as GoogleCalendarResponse;

// Mock fetch for unit tests
const originalFetch = global.fetch;
beforeAll(() => {
  // @ts-ignore - Mocking fetch
  global.fetch = vi.fn();
});

afterAll(() => {
  // @ts-ignore - Restoring fetch
  global.fetch = originalFetch;
});

describe('TournamentService Unit Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should parse Google Calendar events into tournaments correctly', async () => {
    // @ts-ignore - Mocking fetch
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockCalendarResponse
    });

    const tournaments = await tournamentService.getTournaments();

    expect(tournaments).toHaveLength(mockCalendarResponse.items.length);
    
    // Test first tournament (The Workshop 2)
    const firstTournament = tournaments[0];
    expect(firstTournament.id, 'First tournament should have an id').toBe('e6l408bnnpcpfs41cmhhfc0rhk');
    expect(firstTournament.name, 'First tournament should have a name').toBe('The Workshop 2, Lawrence, MA');
    expect(firstTournament.address, 'First tournament should have an address').toBe('Lawrence, MA, USA');
    expect(firstTournament.dateTime, 'First tournament should have a dateTime').toBe('2015-03-14T17:30:00-04:00');
    expect(firstTournament.url, 'First tournament should have a url').toBe('https://www.google.com/calendar/event?eid=ZTZsNDA4Ym5ucGNwZnM0MWNtaGhmYzByaGsgODZvdXAwOW9waTY2dmJoc2hyZnR1NHVpanNAZw');
    expect(firstTournament.created, 'First tournament should have a created date').toBe('2015-03-04T21:07:10.000Z');
    expect(firstTournament.updated, 'First tournament should have an updated date').toBe('2015-03-04T21:32:42.765Z');

    // Test tournament with all-day event (EVO 2015)
    const evoTournament = tournaments[3];
    expect(evoTournament.id, 'EVO tournament should have an id').toBe('rv26mhgesjnbni5nv102i2m0ic');
    expect(evoTournament.name, 'EVO tournament should have a name').toBe('EVO 2015, Las Vegas, NV');
    expect(evoTournament.dateTime, 'EVO tournament should have a dateTime').toBe('2015-07-17');
    expect(evoTournament.url, 'EVO tournament should have a url').toBe('https://www.google.com/calendar/event?eid=cnYyNm1oZ2Vzam5ibmk1bnYxMDJpMm0waWMgODZvdXAwOW9waTY2dmJoc2hyZnR1NHVpanNAZw');
    expect(evoTournament.created, 'EVO tournament should have a created date').toBe('2015-03-04T21:39:58.000Z');
    expect(evoTournament.updated, 'EVO tournament should have an updated date').toBe('2015-03-04T21:40:09.825Z');
  });
}); 