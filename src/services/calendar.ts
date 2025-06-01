// src/services/calendar.ts

import { GoogleCalendarEvent, GoogleCalendarResponse, Tournament, CalendarServiceConfig } from '../lib/types';
import { tournamentProcessor } from '../lib/tournaments/tournamentProcessor';

class CalendarService {
  private config: CalendarServiceConfig;

  constructor(config: CalendarServiceConfig) {
    this.config = config;
  }

  private async fetchEvents(startDate: Date, endDate: Date): Promise<GoogleCalendarEvent[]> {
    const timeMin = startDate.toISOString();
    const timeMax = endDate.toISOString();
    
    const params = new URLSearchParams({
      key: this.config.apiKey,
      timeMin,
      timeMax,
      singleEvents: 'true',
      orderBy: 'startTime',
      maxResults: '50',
    });

    const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(this.config.calendarId)}/events?${params}`;

    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Calendar API error: ${response.status} ${response.statusText}`);
    }

    const data: GoogleCalendarResponse = await response.json();
    return data.items || [];
  }

  async getTournaments(startDate?: Date): Promise<Tournament[]> {
    const start = startDate || new Date();
    const NUM_DAYS_TO_FETCH = 30;
    const end = new Date(start.getTime() + NUM_DAYS_TO_FETCH * 24 * 60 * 60 * 1000);

    try {
      const events = await this.fetchEvents(start, end);
      console.log(`Fetched ${events.length} events from calendar`);
      
      const tournaments = tournamentProcessor.processCalendarEvents(events);
      
      // Log recurring tournament detection results
      const recurringTournaments = tournaments.filter(t => t.isWeekly || t.isBiweekly);
      console.log(`Found ${recurringTournaments.length} recurring tournaments:`, 
        recurringTournaments.map(t => ({
          name: t.name,
          date: t.dateTime,
          isWeekly: t.isWeekly,
          isBiweekly: t.isBiweekly,
          groupId: t.recurringGroupId
        }))
      );

      return tournaments;
    } catch (error) {
      console.error('Error fetching tournaments:', error);
      throw error;
    }
  }
}

// Export singleton instance with configuration
export const calendarService = new CalendarService({
  calendarId: '86oup09opi66vbhshrftu4uijs@group.calendar.google.com',
  apiKey: import.meta.env.VITE_GOOGLE_CALENDAR_API_KEY || '',
});

// Export types for use in components
export type { GoogleCalendarEvent, GoogleCalendarResponse };
