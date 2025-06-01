// src/services/calendar.ts

import { GoogleCalendarEvent, GoogleCalendarResponse, Tournament, CalendarServiceConfig } from '@shared/types';
import { tournamentProcessor } from './tournaments/tournamentProcessor';
import { geocodingService } from './geocoding';

class CalendarService {
  private config: CalendarServiceConfig;

  constructor(config: CalendarServiceConfig) {
    this.config = config;
    console.log(`Created Calendar Service with config: ${JSON.stringify(this.config)}`);
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

    const data = await response.json() as GoogleCalendarResponse;
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
      console.info(`Processed ${tournaments.length} tournaments from calendar events`);
      
      // Get unique addresses from tournaments
      const addresses = [...new Set(tournaments
        .filter(t => t.address)
        .map(t => t.address as string))];

      // Geocode all addresses at once
      const geocodedLocations = await geocodingService.geocodeAddresses(addresses);
      
      // Log geocoding result summary
      const successfulGeocodes = Object.values(geocodedLocations).filter(coords => coords !== undefined).length;
      console.log(`Successfully geocoded ${successfulGeocodes} out of ${addresses.length} addresses`);

      // Add coordinates to tournaments, ensuring undefined instead of null
      const tournamentsWithCoords = tournaments.map(tournament => {
        const coordinates = tournament.address ? geocodedLocations[tournament.address] : undefined;
        if (tournament.address && !coordinates) {
          console.warn(`Failed to geocode address for tournament "${tournament.name}": ${tournament.address}`);
        }
        return {
          ...tournament,
          coordinates
        };
      });

      // Log recurring tournament detection results
      const recurringTournaments = tournamentsWithCoords.filter(t => t.isWeekly || t.isBiweekly);
      console.log(`Found ${recurringTournaments.length} recurring tournaments:`, 
        recurringTournaments.map(t => ({
          name: t.name,
          date: t.dateTime,
          isWeekly: t.isWeekly,
          isBiweekly: t.isBiweekly,
          groupId: t.recurringGroupId
        }))
      );

      return tournamentsWithCoords;
    } catch (error) {
      console.error('Error fetching tournaments:', error);
      throw error;
    }
  }
}

// Export singleton instance with configuration
export const calendarService = new CalendarService({
  calendarId: '86oup09opi66vbhshrftu4uijs@group.calendar.google.com',
  apiKey: process.env.GOOGLE_CALENDAR_API_KEY || '',
});

// Export types for use in components
export type { GoogleCalendarEvent, GoogleCalendarResponse };
