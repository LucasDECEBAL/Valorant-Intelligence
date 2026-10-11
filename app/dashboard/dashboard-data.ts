export const seasons = [
  { k: [['Rang actuel', 'Silver 3', '↑ 2 divisions'], ['RR actuel', '68', '/ 100', '+12 RR'], ['K/D', '1.12', '+8%'], ['Winrate', '48.6%', '+4%']], pts: [8, 16, 22, 38, 50, 62], lab: 'Bronze 3 → Gold 1' },
  { k: [['Rang actuel', 'Silver 1', '↑ 1 division'], ['RR actuel', '34', '/ 100', '+5 RR'], ['K/D', '1.04', '+5%'], ['Winrate', '46.1%', '+2%']], pts: [6, 12, 15, 24, 30, 41], lab: 'Bronze 2 → Silver 1' },
  { k: [['Rang actuel', 'Bronze 3', '↑ 1 division'], ['RR actuel', '51', '/ 100', '+8 RR'], ['K/D', '0.89', '+3%'], ['Winrate', '44.2%', '+1%']], pts: [3, 5, 9, 12, 16, 21], lab: 'Bronze 1 → Bronze 3' },
];

export const agents = [
  { n: 'Jett', p: 28, c: '#ff4655', role: 'Duelliste', fit: 86 },
  { n: 'Reyna', p: 18, c: '#e0707e', role: 'Duelliste', fit: 64 },
  { n: 'Sova', p: 14, c: '#4fc3f7', role: 'Initiateur', fit: 78 },
  { n: 'Omen', p: 11, c: '#8b7cf6', role: 'Contrôleur', fit: 92 },
  { n: 'Phoenix', p: 8, c: '#e5a94a', role: 'Duelliste', fit: 58 },
  { n: 'Autres', p: 21, c: '#52607d', role: '', fit: 0 },
];

export const maps = [
  { n: 'Bind', w: 56, kd: 1.32, c: 'linear-gradient(135deg,#4a5a7a,#b07a55)' },
  { n: 'Ascent', w: 48, kd: 1.12, c: 'linear-gradient(135deg,#3d6b7c,#c9794a)' },
  { n: 'Haven', w: 46, kd: 1.08, c: 'linear-gradient(135deg,#2f6b66,#4f8d7f)' },
  { n: 'Split', w: 42, kd: 0.96, c: 'linear-gradient(135deg,#6b3d63,#a8505e)' },
  { n: 'Fracture', w: 50, kd: 1.04, c: 'linear-gradient(135deg,#3d5a77,#6b8a6a)' },
];

export type Match = [string, string, string, 'Victoire' | 'Défaite', string];
export const matches: Match[] = [
  ['12/06', 'Ascent', 'Jett', 'Victoire', '18 / 12'], ['10/06', 'Bind', 'Reyna', 'Défaite', '21 / 16'],
  ['08/06', 'Haven', 'Sova', 'Défaite', '14 / 17'], ['06/06', 'Split', 'Omen', 'Victoire', '16 / 13'],
  ['04/06', 'Fracture', 'Phoenix', 'Défaite', '11 / 15'], ['02/06', 'Bind', 'Jett', 'Victoire', '24 / 14'],
  ['31/05', 'Ascent', 'Omen', 'Victoire', '17 / 11'], ['29/05', 'Haven', 'Jett', 'Défaite', '19 / 20'],
  ['27/05', 'Split', 'Sova', 'Victoire', '15 / 12'], ['25/05', 'Fracture', 'Reyna', 'Défaite', '13 / 18'],
];

export function sortMatches(rows: Match[], column: number, ascending: boolean): Match[] {
  const direction = ascending ? 1 : -1;

  return [...rows].sort((a, b) => {
    let comparison = 0;

    if (column === 0) {
      const toDate = (value: string) => {
        const [day, month] = value.split('/').map(Number);
        return Date.UTC(2025, month - 1, day);
      };
      comparison = toDate(a[0]) - toDate(b[0]);
    } else if (column === 4) {
      const kdValue = (value: string) => {
        const [kills, deaths] = value.split('/').map(Number);
        return deaths === 0 ? kills : kills / deaths;
      };
      comparison = kdValue(a[4]) - kdValue(b[4]);
    } else {
      comparison = a[column].localeCompare(b[column], 'fr');
    }

    return comparison * direction;
  });
}

export const fit = [
  { n: 'Omen', r: 'Contrôleur', v: 92, c: 'linear-gradient(135deg,#b84a6b,#d27c84)' },
  { n: 'Jett', r: 'Duelliste', v: 86, c: 'linear-gradient(135deg,#4c7074,#9bc0b5)' },
  { n: 'Sova', r: 'Initiateur', v: 78, c: 'linear-gradient(135deg,#46546d,#b08467)' },
  { n: 'Skye', r: 'Initiateur', v: 71, c: 'linear-gradient(135deg,#63826e,#a7c9b4)' },
];

export const guns = [['Vandal', 42, '+3%'], ['Phantom', 31, '+1%'], ['Operator', 9, '−2%'], ['Sheriff', 8, '+5%'], ['Spectre', 6, '0%']] as const;
export const stats = [['Headshot %', '23.4%'], ['Dégâts / round', '142'], ['First Blood', '+18%'], ['Clutch', '31%']] as const;
export const dmgData = [[128, 135, 131, 142, 138, 145, 142], [120, 124, 129, 127, 133, 136, 140, 138, 141, 139, 142, 144, 141, 143]];
export const achv = ['🏆 Série de 5 victoires', '🎯 100 headshots en une semaine', '⚡ Ace sur Ascent', '🔥 MVP 3 fois de suite'];
export const compare = [['K/D', 1.12, 1.05], ['Winrate', 48.6, 50.2], ['Headshot %', 23.4, 21.8], ['Dégâts / round', 142, 135]] as const;
export const seasonBars = [['Saison 2024', 0.89, 'short'], ['Saison 2025 I', 1.04, 'medium'], ['Saison 2025 II', 1.12, 'tall']] as const;

export const coachAnswers: Record<string, string> = {
  visée: 'Fais 10 min de deathmatch ciblé avant chaque session et baisse légèrement ta sensibilité. Garde le viseur à hauteur de tête.',
  économie: "Évite les achats forcés au round 2. Économise pour un full buy et garde toujours un bouclier léger en réserve.",
  agent: "D'après tes stats, Omen (92%) est ton meilleur choix : ton style patient colle au rôle de contrôleur.",
  default: "Bonne question ! Concentre-toi sur la constance en fin de partie : c'est ton principal axe d'amélioration.",
};

export const nav = [
  { id: 'dash', label: 'Tableau de bord', icon: '▦' }, { id: 'stats', label: 'Mes statistiques', icon: '↗' },
  { id: 'matchs', label: 'Matchs', icon: '☰' }, { id: 'agents', label: 'Agents', icon: '☺' },
  { id: 'cartes', label: 'Cartes', icon: '◫' }, { id: 'armes', label: 'Armes', icon: '✦' },
  { id: 'compar', label: 'Comparaison', icon: '⇅' }, { id: 'coach', label: 'Coach démo', icon: '✺', badge: 'Nouveau' },
] as const;
export type PageId = typeof nav[number]['id'] | 'profil' | 'params';