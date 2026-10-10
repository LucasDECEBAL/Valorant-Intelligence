import type {Match} from './demo';
export function aggregate(matches:Match[]){const kills=matches.reduce((n,m)=>n+m.kills,0), deaths=matches.reduce((n,m)=>n+m.deaths,0); return {matches:matches.length,kills,deaths,kd:deaths?Number((kills/deaths).toFixed(2)):0,winRate:matches.length?Number((matches.filter(m=>m.win).length/matches.length*100).toFixed(1)):0,avgKills:matches.length?Number((kills/matches.length).toFixed(1)):0};}
export function groupBy<T extends {agent:string}>(items:T[]){return items.reduce<Record<string,T[]>>((acc,item)=>{(acc[item.agent]??=[]).push(item);return acc},{});}
