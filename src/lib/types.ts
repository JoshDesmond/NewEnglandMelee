// Google Calendar API Types
export interface GoogleCalendarEvent {
  id: string;
  summary: string;
  location?: string;
  description?: string;
  start: {
    dateTime?: string;
    date?: string;
    timeZone?: string;
  };
  end: {
    dateTime?: string;
    date?: string;
    timeZone?: string;
  };
  htmlLink: string;
  created: string;
  updated: string;
}

export interface GoogleCalendarResponse {
  items: GoogleCalendarEvent[];
}

// Application Types
export interface Tournament {
  id: string;
  name: string;
  address?: string;
  dateTime: string;
  startggLink?: string;
  discordLink?: string;
  url: string;
  created: string;
  updated: string;
}

export interface SocialLink {
  href: string;
  icon: React.ReactNode;
  label: string;
}

// Helper type for tournament service
export interface TournamentServiceConfig {
  calendarId: string;
  apiKey: string;
} 
