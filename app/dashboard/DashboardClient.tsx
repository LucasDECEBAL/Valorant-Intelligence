"use client";

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { matches, demoProfile } from '@/lib/demo';
import { aggregate } from '@/lib/analytics';
import { coachRules } from '@/lib/coach';

const nav = [
  ['Tableau de bord', '/dashboard', '▦'],
  ['Mes statistiques', '/stats', '↗'],
  ['Matchs', null, '▤'],
  ['Agents', null, '◉'],
  ['Cartes', null, '◇'],
  ['Armes', null, '⌁'],
  ['Comparaison', null, '◫'],
  ['IA Coach', '/coach', '✦'],
  ['Objectifs', null, '✓'],
  ['Profil', null, '◎'],
  ['Paramètres', null, '⚙'],
] as const;

const maps = [
  ['B', 'Bind', '1.32', '56%'],
  ['A', 'Ascent', '1.12', '48%'],
  ['H', 'Haven', '1.08', '46%'],
  ['S', 'Split', '.96', '42%'],
  ['F', 'Fracture', '1.04', '50%'],
];

const agents = [
  ['O', 'Omen', 'Contrôleur', 92],
  ['J', 'Jett', 'Duelliste', 86],
  ['S', 'Sova', 'Initiateur', 78],
  ['S', 'Skye', 'Initiateur', 71],
];

export default function DashboardClient() {
  const [active, setActive] = useState('Tableau de bord');
  const [period, setPeriod] = useState('Saison 2025 — Acte II');
  const [query, setQuery] = useState('');
  const [notice, setNotice] = useState('');
  const stats = aggregate(matches);
  const coach = coachRules(matches);
  const filteredMatches = useMemo(
    () => matches.filter((match) => `${match.map} ${match.agent} ${match.mode}`.toLowerCase().includes(query.toLowerCase())),
    [query],
  );

  function selectNav(name: string) {
    setActive(name);
    if (!nav.find((item) => item[0] === name)?.[1]) setNotice(`${name} sera disponible dans une prochaine version.`);
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand"><i /><span>VALORANT<br />INTELLIGENCE</span></div>
        <div className="nav-label">Navigation</div>
        <nav>
          {nav.map(([name, href, icon]) => href ? (
            <Link key={name} href={href} onClick={() => setActive(name)} className={active === name ? 'active' : ''}>
              <span className="nav-icon">{icon}</span>{name}{name === 'IA Coach' && <small>Nouveau</small>}
            </Link>
          ) : (
            <button type="button" key={name} onClick={() => selectNav(name)} className={active === name ? 'active' : ''}>
              <span className="nav-icon">{icon}</span>{name}
            </button>
          ))}
        </nav>
        <div className="quote">« Analyse.<br />Progresse.<br />Surpasse-toi. »</div>
      </aside>

      <main className="main">
        <header className="topbar">
          <input aria-label="Rechercher" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Rechercher un joueur, un agent, une carte..." />
          <div className="user"><span className="avatar">DP</span><span><b>DémoPlayer</b><small>Mode démonstration</small></span></div>
        </header>

        <section className="content">
          <div className="hero">
            <div><span className="eyebrow">Bienvenue, DémoPlayer <em>/ MODE DÉMO</em></span><h1>Ton analyse.<br /><strong>Ta progression.</strong></h1><p>Les chiffres parlent. À toi de jouer.</p></div>
            <Link className="button" href="/stats">Voir mes statistiques →</Link>
          </div>
          {notice && <button className="notice notice-action" type="button" onClick={() => setNotice('')}>{notice} ×</button>}

          <section className="grid two">
            <article className="card overview">
              <div className="card-head"><h2>Vue d'ensemble</h2><select value={period} onChange={(event) => setPeriod(event.target.value)}><option>Saison 2025 — Acte II</option><option>30 derniers jours</option></select></div>
              <div className="metrics"><Metric label="Rang actuel" value={demoProfile.rank} trend="↑ 2 divisions" /><Metric label="RR actuel" value={`${demoProfile.rr} / 100`} trend="+12 RR" /><Metric label="K/D agrégé" value={stats.kd.toFixed(2)} trend="calculé" /><Metric label="Winrate" value={`${stats.winRate}%`} trend="démo" /></div>
              <div className="chart-title">Évolution du rang <span>Derniers 6 mois</span></div>
              <div className="chart"><svg viewBox="0 0 700 150" preserveAspectRatio="none"><defs><linearGradient id="area" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#fa465d" stopOpacity=".35" /><stop offset="1" stopColor="#fa465d" stopOpacity="0" /></linearGradient></defs><path d="M0 125 L140 107 L280 95 L420 70 L560 49 L700 24" fill="none" stroke="#fa465d" strokeWidth="3" /><path d="M0 125 L140 107 L280 95 L420 70 L560 49 L700 24 L700 150 L0 150Z" fill="url(#area)" /></svg></div>
            </article>
            <article className="card"><div className="card-head"><h2>Répartition par agent</h2><span className="muted">{demoProfile.matchCount} parties</span></div><div className="donut-wrap"><div className="donut"><b>142</b><small>parties</small></div><div className="legend-list">{[['Jett', '28%'], ['Reyna', '18%'], ['Sova', '14%'], ['Omen', '11%'], ['Phoenix', '8%'], ['Autres', '21%']].map(([agent, percent]) => <div key={agent}><i />{agent}<b>{percent}</b></div>)}</div></div></article>
          </section>

          <section className="grid two">
            <article className="card ai"><div className="card-head"><h2>✦ IA Coach <em>BÊTA</em></h2><span className="muted">Règles transparentes</span></div><p><strong>{coach.summary}</strong>Les recommandations ci-dessous proviennent uniquement des données de démonstration.</p><ol>{coach.recommendations.map((recommendation, index) => <li key={recommendation}><b>0{index + 1}</b>{recommendation}</li>)}</ol><Link className="button ghost" href="/coach">Voir mon plan d'entraînement →</Link></article>
            <article className="card"><div className="card-head"><h2>Performances par carte</h2><span className="muted">K/D · Winrate</span></div><div className="maps">{maps.map(([letter, name, kd, winrate]) => <div className="map" key={name}><div>{letter}</div><b>{name}</b><small>{kd} · {winrate}</small></div>)}</div></article>
          </section>

          <section className="grid two">
            <article className="card season-card"><div className="card-head"><h2>Comparaison de saisons</h2><span className="muted">K/D moyen</span></div><div className="season-chart">{[['0.89', 'Saison 2024', 'short'], ['1.04', 'Saison 2025 I', 'medium'], ['1.12', 'Saison 2025 II', 'tall']].map(([value, label, size]) => <div className="season-bar-wrap" key={label}><b>{value}</b><div className={`season-bar ${size}`} /><small>{label}</small></div>)}</div></article>
            <article className="card"><div className="card-head"><h2>Points forts / Axes d'amélioration</h2></div><div className="strengths"><Strength title="Premier sang" text="+18% de duels gagnés en début de round" /><Strength title="Adaptation" text="Bon impact sur Bind et Fracture" /><Strength title="Constance" text="−14% de K/D après le 20e round" warning /><Strength title="Économie" text="3 achats forcés sur les 5 dernières parties" warning /></div></article>
          </section>

          <section className="grid two">
            <article className="card match-history"><div className="card-head"><h2>Historique des matchs</h2><span className="button ghost small-button">Voir tout →</span></div><table><thead><tr><th>Date</th><th>Carte</th><th>Agent</th><th>Résultat</th><th>K / D</th></tr></thead><tbody>{filteredMatches.map((match) => <tr key={match.id}><td>{match.date.slice(0, 5)}</td><td>{match.map}</td><td>{match.agent}</td><td><span className={match.win ? 'win' : 'loss'}>{match.win ? 'Victoire' : 'Défaite'}</span></td><td>{match.kills} / {match.deaths}</td></tr>)}</tbody></table>{filteredMatches.length === 0 && <p className="muted">Aucun match ne correspond à ta recherche.</p>}</article>
            <article className="card"><div className="card-head"><h2>Agents adaptés à ton style</h2><span className="muted">compatibilité</span></div><div className="agent-list">{agents.map(([letter, name, role, score], index) => <div className="agent-row" key={name}><span className={`agent-avatar agent-${index}`}>{letter}</span><div className="agent-info"><div><b>{name}</b><small>{role}</small><strong>{score}%</strong></div><div className="progress"><span style={{ width: `${score}%` }} /></div></div></div>)}</div></article>
          </section>

          <section className="pocket-card"><div><span className="eyebrow">BIENTÔT DISPONIBLE</span><h2>L'analyse dans ta poche.</h2><p>Retrouve tes performances et ton plan d'entraînement où que tu sois.</p><button className="button ghost" type="button" onClick={() => setNotice('Tu seras prévenu au lancement de l’application mobile.')}>Me prévenir au lancement →</button></div><div className="phone-shape"><i /><i /><i /><b /></div></section>
          <footer>Valorant Intelligence est un projet indépendant, non affilié à Riot Games. Données de démonstration fictives · Confidentialité · Conditions · Contact</footer>
        </section>
      </main>
    </div>
  );
}

function Metric({ label, value, trend }: { label: string; value: string; trend: string }) { return <div className="metric"><label>{label}</label><b>{value}</b><span>{trend}</span></div>; }
function Strength({ title, text, warning = false }: { title: string; text: string; warning?: boolean }) { return <div className={`strength ${warning ? 'warn' : ''}`}><b>⌁ {title}</b><span>{text}</span></div>; }
