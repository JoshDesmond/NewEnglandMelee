/**
 * Hardcoded mapping of tournament names to their Discord links.
 * This serves as a fallback/verification source for Discord links
 * that might be missing or incorrect in the calendar event descriptions.
 */
export const tournamentDiscordLinks: Record<string, string> = {
  'Pho Tai Melee - Nashua, NH': 'https://discord.gg/D9jxfMMV4c',
  'Melee Monday @ Bumper\'s - Portland, ME': 'https://discord.gg/mRWsGrK5qc',
  '[21+] Free Play Melee - Worcester, MA':'https://discord.gg/FyrTm2q63G',
  'New Game Plus Revival - Boston, MA': 'https://discord.gg/WwJZ3yY967',
  'New Gay Plus Revival - Boston, MA': 'https://discord.gg/WwJZ3yY967',
  'Buffalo Wild Wednesdays - South Portland, ME': 'https://discord.gg/nmEYnqsK9C',
  'One Up Melee - Plainville, MA': 'https://discord.gg/n8gPKbAMk4',
  'Hall of Gaming - Wallingford, CT': 'https://discord.gg/6JFQPWqKJU',
  'Prodigy Weekly - Easthampton, MA': 'https://discord.gg/Cw55cewdjg',
  'GGRI - Warwick, RI': 'https://discord.gg/WKEveRGekX',
  'Stickman\'s Garage - Colchester, VT': 'https://discord.gg/XwzS8fgQfZ',
  'Pho Tai BIG MODE - Nashua, NH': 'https://discord.gg/PRF8bMxFBD',
  'Mass Madness - Waltham, MA': 'https://discord.gg/4h4nbvNRbJ',
  'Prodigy Classic - Easthampton, MA': 'https://discord.gg/HwCcxF3W6h',
  'KD HOUSE - Warwick, RI': 'https://discord.gg/FrAApr6JVB',
  'Melee at the Elm - Worcester, MA': 'https://discord.gg/EFnFhZrs92',
  'North Corner Smash - Gray, ME': 'https://discord.gg/DyHuZCDNu3',
  '[21+] Bit Bar Melee - Salem, MA': 'https://discord.gg/bPJekTQd9Y', 
  'Strange Brew Melee - Manchester, NH': 'https://discord.gg/HFYxP4jU6y',
  'Super Smash Saturdays - Merrimack, NH': 'https://discord.gg/PRF8bMxFBD',
  'Waterville Smash Attack Xx - Waterville, ME' : 'https://discord.gg/A3ycnnQ4x9',
} as const;

/**
 * Helper function to get a Discord link for a tournament by name
 * @param tournamentName The name of the tournament to look up
 * @returns The Discord link if found, undefined otherwise
 */
export function getTournamentDiscordLink(tournamentName: string): string | undefined {
  return tournamentDiscordLinks[tournamentName];
}
