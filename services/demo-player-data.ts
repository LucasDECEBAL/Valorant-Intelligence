export type DemoMatch = {
  date: string;
  map: string;
  agent: string;
  result: 'Victoire' | 'Défaite';
  score: string;
};

export type DemoPlayer = {
  riotId: string;
  displayName: string;
  rank: string;
  rr: number;
  kd: string;
  winrate: string;
  favoriteAgents: string[];
  matches: DemoMatch[];
};

// This repository is ready to replace this source with an official provider later.
// These records are intentionally static and never represent real Riot accounts.
export const demoPlayers: DemoPlayer[] = [
  {
    riotId: 'KrustylaD#EUW',
    displayName: 'KrustylaD',
    rank: 'Silver 3',
    rr: 68,
    kd: '1.12',
    winrate: '48.6%',
    favoriteAgents: ['Jett', 'Omen', 'Sova'],
    matches: [
      { date: '12/06', map: 'Ascent', agent: 'Jett', result: 'Victoire', score: '18 / 12' },
      { date: '10/06', map: 'Bind', agent: 'Omen', result: 'Défaite', score: '21 / 16' },
      { date: '08/06', map: 'Haven', agent: 'Sova', result: 'Défaite', score: '14 / 17' },
    ],
  },
  {
    riotId: 'Azura#EUW',
    displayName: 'Azura',
    rank: 'Gold 1',
    rr: 42,
    kd: '1.28',
    winrate: '56.2%',
    favoriteAgents: ['Reyna', 'Jett', 'Sage'],
    matches: [
      { date: '11/06', map: 'Split', agent: 'Reyna', result: 'Victoire', score: '24 / 11' },
      { date: '09/06', map: 'Lotus', agent: 'Jett', result: 'Victoire', score: '19 / 14' },
      { date: '07/06', map: 'Bind', agent: 'Sage', result: 'Défaite', score: '12 / 16' },
    ],
  },
  {
    riotId: 'Nova#FR1',
    displayName: 'Nova',
    rank: 'Bronze 3',
    rr: 51,
    kd: '0.89',
    winrate: '44.2%',
    favoriteAgents: ['Sova', 'Phoenix', 'Killjoy'],
    matches: [
      { date: '13/06', map: 'Fracture', agent: 'Sova', result: 'Défaite', score: '11 / 15' },
      { date: '10/06', map: 'Haven', agent: 'Phoenix', result: 'Victoire', score: '17 / 13' },
      { date: '06/06', map: 'Ascent', agent: 'Killjoy', result: 'Défaite', score: '10 / 16' },
    ],
  },
];

export const demoProfile = demoPlayers[0];

export function findDemoPlayer(query: string): DemoPlayer | undefined {
  return demoPlayers.find(player => player.riotId.toLowerCase() === query.trim().toLowerCase());
}
