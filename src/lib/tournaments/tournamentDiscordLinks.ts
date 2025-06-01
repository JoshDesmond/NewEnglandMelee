/**
 * Hardcoded mapping of tournament names to their Discord links.
 * This serves as a fallback/verification source for Discord links
 * that might be missing or incorrect in the calendar event descriptions.
 */
export const tournamentDiscordLinks: Record<string, string> = {
  'Pho Tai Melee': 'https://discord.gg/D9jxfMMV4c',
} as const;

/**
 * Helper function to get a Discord link for a tournament by name
 * @param tournamentName The name of the tournament to look up
 * @returns The Discord link if found, undefined otherwise
 */
export function getTournamentDiscordLink(tournamentName: string): string | undefined {
  return tournamentDiscordLinks[tournamentName];
}
