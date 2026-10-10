import {matches, demoProfile, type Match} from '@/lib/demo';
export interface DataProvider{getProfile():Promise<typeof demoProfile>;getMatches():Promise<Match[]>;status(): 'demo'|'riot-unavailable'}
export class DemoDataProvider implements DataProvider{async getProfile(){return demoProfile} async getMatches(){return matches} status(){return 'demo' as const}}
export class RiotDataProvider implements DataProvider{status(){return 'riot-unavailable' as const} async getProfile():Promise<typeof demoProfile>{throw new Error('Riot API non configurée')} async getMatches():Promise<Match[]>{throw new Error('Riot API non configurée')}}
export function getDataProvider():DataProvider{return process.env.RIOT_API_KEY?new RiotDataProvider():new DemoDataProvider()}
