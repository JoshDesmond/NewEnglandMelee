import { describe, it, expect } from 'vitest';
import { calendarService } from '../../../server/calendar';

describe('TournamentService Integration Tests', () => {
  it('should fetch at least 5 tournaments with required fields', async () => {
    const tournaments = await calendarService.getTournaments();
    
    expect(tournaments.length, 'Should fetch at least 5 tournaments').toBeGreaterThanOrEqual(5);
    
    tournaments.forEach((tournament, index) => {
      // Test each required field with specific error messages
      expect(tournament.id, `Tournament ${index} should have an id`).toBeDefined();
      expect(tournament.name, `Tournament ${index} should have a name`).toBeDefined();
      expect(tournament.dateTime, `Tournament ${index} should have a dateTime`).toBeDefined();
      expect(tournament.url, `Tournament ${index} should have a url`).toBeDefined();
      expect(tournament.created, `Tournament ${index} should have a created date`).toBeDefined();
      expect(tournament.updated, `Tournament ${index} should have an updated date`).toBeDefined();

      // Optional fields
      if (tournament.address) {
        expect(typeof tournament.address, `Tournament ${index} address should be a string if present`).toBe('string');
      }
      if (tournament.startggLink) {
        expect(tournament.startggLink, `Tournament ${index} startggLink should be a valid URL if present`).toMatch(/^https:\/\/start\.gg\/.+/);
      }
      if (tournament.discordLink) {
        expect(tournament.discordLink, `Tournament ${index} discordLink should be a valid URL if present`).toMatch(/^https:\/\/discord\.gg\/.+/);
      }

      // Validate date formats
      expect(tournament.dateTime, `Tournament ${index} dateTime should be a valid date string`).toMatch(/^\d{4}-\d{2}-\d{2}/);
      expect(tournament.created, `Tournament ${index} created should be a valid ISO date string`).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
      expect(tournament.updated, `Tournament ${index} updated should be a valid ISO date string`).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
    });
  });
}); 