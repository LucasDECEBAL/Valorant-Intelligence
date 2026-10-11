import {matches, demoProfile, type Match} from '../lib/demo';

export interface DataProvider {
  getProfile(): Promise<typeof demoProfile>;
  getMatches(): Promise<Match[]>;
  status(): 'demo';
}

export class DemoDataProvider implements DataProvider {
  async getProfile() {
    return demoProfile;
  }

  async getMatches() {
    return matches;
  }

  status() {
    return 'demo' as const;
  }
}

export function getDataProvider(): DataProvider {
  const provider = process.env.DATA_PROVIDER?.trim() || 'mock';

  if (provider === 'mock') {
    return new DemoDataProvider();
  }

  if (provider === 'database') {
    throw new Error('DATA_PROVIDER="database" is not implemented');
  }

  throw new Error(`Unsupported DATA_PROVIDER "${provider}"`);
}
