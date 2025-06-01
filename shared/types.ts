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
  dateTime: string;
  address?: string;
  coordinates?: [number, number];  // Tuple type for lat/lng
  startggLink?: string;
  discordLink?: string;
  url: string;
  created: string;
  updated: string;
  isWeekly?: boolean;
  isBiweekly?: boolean;
  recurringGroupId?: string;  // Used to group recurring tournaments together
}

export interface SocialLink {
  href: string;
  icon: React.ReactNode;
  label: string;
}

// Helper type for tournament service
export interface CalendarServiceConfig {
  calendarId: string;
  apiKey: string;
} 