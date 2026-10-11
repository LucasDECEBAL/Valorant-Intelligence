import {afterEach,describe,expect,it} from 'vitest';
import {getDataProvider, DemoDataProvider} from '../services/data-provider';
import {demoProfile, matches} from '../lib/demo';

afterEach(() => {
  delete process.env.DATA_PROVIDER;
  delete process.env.RIOT_API_KEY;
});

describe('data provider selection', () => {
  it('defaults to mock and serves the existing demo data', async () => {
    const provider = getDataProvider();

    expect(provider).toBeInstanceOf(DemoDataProvider);
    await expect(provider.getProfile()).resolves.toBe(demoProfile);
    await expect(provider.getMatches()).resolves.toBe(matches);
    expect(provider.status()).toBe('demo');
  });

  it('selects mock explicitly even when a Riot key is present', () => {
    process.env.DATA_PROVIDER = 'mock';
    process.env.RIOT_API_KEY = 'configured';

    expect(getDataProvider()).toBeInstanceOf(DemoDataProvider);
  });

  it('does not enable Riot when a Riot key is present without a provider choice', () => {
    process.env.RIOT_API_KEY = 'configured';

    expect(getDataProvider()).toBeInstanceOf(DemoDataProvider);
  });

  it('rejects database mode until its provider is implemented', () => {
    process.env.DATA_PROVIDER = 'database';

    expect(() => getDataProvider()).toThrow('DATA_PROVIDER="database" is not implemented');
  });

  it('rejects unsupported provider names', () => {
    process.env.DATA_PROVIDER = 'riot';

    expect(() => getDataProvider()).toThrow('Unsupported DATA_PROVIDER "riot"');
  });
});
