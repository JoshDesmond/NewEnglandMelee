export interface Tournament {
  id: number;
  name: string;
  address: string;
  dateTime: string;
  startggLink: string;
  discordLink: string;
  lat: number;
  lng: number;
  isRecurring: boolean;
  weeklySchedule?: string;
}

export interface SocialLink {
  href: string;
  icon: React.ReactNode;
  label: string;
} 