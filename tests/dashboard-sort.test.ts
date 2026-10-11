import {describe, expect, it} from 'vitest';
import {sortMatches, type Match} from '../app/dashboard/dashboard-data';

const matches: Match[] = [
  ['02/06', 'A', 'Agent', 'Victoire', '9 / 10'],
  ['12/06', 'B', 'Agent', 'Défaite', '18 / 12'],
  ['31/05', 'C', 'Agent', 'Victoire', '20 / 10'],
];

describe('sortMatches', () => {
  it('sorts dates chronologically across month boundaries', () => {
    expect(sortMatches(matches, 0, true).map(match => match[0])).toEqual(['31/05', '02/06', '12/06']);
  });

  it('sorts K/D ratios numerically rather than as display strings', () => {
    expect(sortMatches(matches, 4, true).map(match => match[4])).toEqual(['9 / 10', '18 / 12', '20 / 10']);
  });

  it('does not mutate the input rows', () => {
    const original = [...matches];

    sortMatches(matches, 1, true);

    expect(matches).toEqual(original);
  });
});
