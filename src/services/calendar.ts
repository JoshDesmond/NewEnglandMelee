// src/services/calendar.ts

import { GoogleCalendarEvent, GoogleCalendarResponse, Tournament, TournamentServiceConfig } from '../lib/types';

class TournamentService {
  private config: TournamentServiceConfig;

  constructor(config: TournamentServiceConfig) {
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
      maxResults: '100',
    });

    const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(this.config.calendarId)}/events?${params}`;

    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Calendar API error: ${response.status} ${response.statusText}`);
    }

    const data: GoogleCalendarResponse = await response.json();
    return data.items || [];
  }

  private parseEventToTournament(event: GoogleCalendarEvent): Tournament {
    const startTime = event.start.dateTime || event.start.date || '';
    
    // Extract start.gg and Discord links from description if they exist
    const description = event.description || '';
    const startggLink = this.extractStartggLink(description) || undefined;
    const discordLink = this.extractDiscordLink(description) || undefined;

    return {
      id: event.id,
      name: event.summary || 'Untitled Tournament',
      address: event.location || undefined,
      dateTime: startTime,
      startggLink,
      discordLink,
      url: event.htmlLink,
      created: event.created,
      updated: event.updated,
    };
  }

  private extractStartggLink(description: string): string | null {
    const match = description.match(/start\.gg\/[^\s]+/);
    return match ? `https://${match[0]}` : null;
  }

  private extractDiscordLink(description: string): string | null {
    const match = description.match(/discord\.gg\/[^\s]+/);
    return match ? `https://${match[0]}` : null;
    // TODO: You can add a hardcoded list of discord links to use as a second point of reference in case there is nothing in the description    
  }

  async getTournaments(startDate?: Date): Promise<Tournament[]> {
    const start = startDate || new Date();
    const end = new Date(start.getTime() + 90 * 24 * 60 * 60 * 1000); // 90 days from now

    try {
      const events = await this.fetchEvents(start, end);
      return events.map(event => this.parseEventToTournament(event));
    } catch (error) {
      console.error('Error fetching tournaments:', error);
      throw error;
    }
  }
}

// Export singleton instance with configuration
export const tournamentService = new TournamentService({
  calendarId: '86oup09opi66vbhshrftu4uijs@group.calendar.google.com',
  apiKey: process.env.REACT_APP_GOOGLE_CALENDAR_API_KEY || '',
});

// Export types for use in components
export type { GoogleCalendarEvent, GoogleCalendarResponse };
