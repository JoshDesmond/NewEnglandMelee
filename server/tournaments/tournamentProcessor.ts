import { GoogleCalendarEvent, Tournament } from '../../shared/types';
import { getTournamentDiscordLink } from './tournamentDiscordLinks';

export class TournamentProcessor {
  // TODO: Add support for processing tournaments from multiple sources (start.gg, etc)

  /**
   * Detects if a tournament is part of a recurring series
   * @param tournaments List of all tournaments to check against
   * @param currentTournament The tournament to check
   * @returns Object containing recurring information if recurring, null otherwise
   */
  private detectRecurringTournament(
    tournaments: Tournament[],
    currentTournament: Tournament
  ): { isWeekly: boolean; isBiweekly: boolean; recurringGroupId: string } | null {
    const sameNameTournaments = tournaments.filter(
      t => t.name === currentTournament.name && t.id !== currentTournament.id
    );

    if (sameNameTournaments.length === 0) {
      return null;
    }

    const currentDate = new Date(currentTournament.dateTime);
    
    for (const tournament of sameNameTournaments) {
      const otherDate = new Date(tournament.dateTime);
      const daysDiff = Math.abs(
        (currentDate.getTime() - otherDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      // Check for weekly (7 days) or biweekly (14 days) patterns
      if (Math.abs(daysDiff - 7) < 1) {
        return {
          isWeekly: true,
          isBiweekly: false,
          recurringGroupId: `${currentTournament.name}-weekly`
        };
      } else if (Math.abs(daysDiff - 14) < 1) {
        return {
          isWeekly: false,
          isBiweekly: true,
          recurringGroupId: `${currentTournament.name}-biweekly`
        };
      }
    }

    return null;
  }

  /**
   * Processes a Google Calendar event into a Tournament object
   * @returns Tournament object if the event is in New England, null otherwise
   */
  processCalendarEvent(event: GoogleCalendarEvent, allTournaments: Tournament[] = []): Tournament | null {
    // Return null if the tournament is not in New England
    if (!this.isNewEnglandAddress(event.location)) {
      return null;
    }

    const startTime = event.start.dateTime || event.start.date || '';
    const tournamentName = event.summary || 'Untitled Tournament';
    
    // Extract start.gg and Discord links from description if they exist
    const description = event.description || '';
    const startggLink = this.extractStartggLink(description) || undefined;
    const discordLink = this.extractDiscordLink(description, tournamentName) || undefined;

    const tournament: Tournament = {
      id: event.id,
      name: tournamentName,
      address: event.location || undefined,
      dateTime: startTime,
      startggLink,
      discordLink,
      url: event.htmlLink,
      created: event.created,
      updated: event.updated,
      isWeekly: false,
      isBiweekly: false,
      recurringGroupId: undefined
    };

    // Check for recurring pattern
    const recurringInfo = this.detectRecurringTournament(allTournaments, tournament);
    if (recurringInfo) {
      tournament.isWeekly = recurringInfo.isWeekly;
      tournament.isBiweekly = recurringInfo.isBiweekly;
      tournament.recurringGroupId = recurringInfo.recurringGroupId;
    }

    return tournament;
  }

  /**
   * Processes multiple Google Calendar events into Tournament objects
   * Filters out tournaments that are not in New England
   * Detects recurring tournaments and keeps only the earliest instance of each series
   */
  processCalendarEvents(events: GoogleCalendarEvent[]): Tournament[] {
    // First pass: process all events without recurring detection
    const initialTournaments = events
      .map(event => this.processCalendarEvent(event))
      .filter((tournament): tournament is Tournament => tournament !== null)
      // Sort by date to process chronologically
      .sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime());

    const finalTournaments: Tournament[] = [];
    const processedNames = new Set<string>();

    for (let i = 0; i < initialTournaments.length; i++) {
      const currentTournament = initialTournaments[i];
      
      // Skip if we've already processed this tournament name
      if (processedNames.has(currentTournament.name)) {
        continue;
      }

      // Look for future instances of this tournament
      const futureInstances = initialTournaments.slice(i + 1).filter(
        t => t.name === currentTournament.name
      );

      if (futureInstances.length > 0) {
        // Check for weekly/biweekly pattern with the next instance
        const nextInstance = futureInstances[0];
        const currentDate = new Date(currentTournament.dateTime);
        const nextDate = new Date(nextInstance.dateTime);
        const daysDiff = (nextDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24);

        // Check for weekly (7 days) or biweekly (14 days) patterns
        if (Math.abs(daysDiff - 7) < 1) {
          currentTournament.isWeekly = true;
          currentTournament.recurringGroupId = `${currentTournament.name}-weekly`;
        } else if (Math.abs(daysDiff - 14) < 1) {
          currentTournament.isBiweekly = true;
          currentTournament.recurringGroupId = `${currentTournament.name}-biweekly`;
        }
      }

      // Add to final list and mark as processed
      finalTournaments.push(currentTournament);
      processedNames.add(currentTournament.name);
    }

    return finalTournaments;
  }

  private extractStartggLink(description: string): string | null {
    // First try to find Google Calendar redirect URLs
    const googleRedirectMatch = description.match(/https:\/\/www\.google\.com\/url\?q=([^&]+)/);
    if (googleRedirectMatch) {
      const decodedUrl = decodeURIComponent(googleRedirectMatch[1]);
      if (decodedUrl.includes('start.gg')) {
        return decodedUrl;
      }
    }

    // Fallback to direct start.gg links
    const directMatch = description.match(/https?:\/\/(?:www\.)?start\.gg\/[^\s"<>]+/);
    return directMatch ? directMatch[0] : null;
  }

  private extractDiscordLink(description: string, tournamentName: string): string | null {
    // First try to find Discord link in description
    const match = description.match(/discord\.gg\/[^\s]+/);
    if (match) {
      return `https://${match[0]}`;
    }

    // Fallback to hardcoded cache
    return getTournamentDiscordLink(tournamentName) || null;
  }

  /**
   * Checks if an address is in New England (MA, NH, RI, VT, ME, CT)
   * @returns true if the address is in New England, false otherwise
   */
  private isNewEnglandAddress(address?: string): boolean {
    if (!address) return false;
    
    const newEnglandStates = ['MA', 'NH', 'RI', 'VT', 'ME', 'CT'];
    return newEnglandStates.some(state => address.toUpperCase().includes(state));
  }
}

// Export singleton instance
export const tournamentProcessor = new TournamentProcessor();
