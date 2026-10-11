'use client';

import type { DemoPlayer } from '../services/demo-player-data';

export default function DemoPlayerProfile({ player }: { player: DemoPlayer }) {
  return (
    <section className="demo-player-result" aria-label={`Profil démo de ${player.riotId}`}>
      <div className="demo-profile-heading">
        <div>
          <div className="eyebrow">Profil joueur · exemple fictif</div>
          <h2>{player.displayName}<span>#{player.riotId.split('#')[1]}</span></h2>
        </div>
        <span className="demo-badge">PROFIL FICTIF — MODE DÉMO</span>
      </div>

      <div className="grid cards3 demo-metrics">
        <div className="card"><small className="muted">Rang</small><strong className="big-num">{player.rank}</strong></div>
        <div className="card"><small className="muted">RR actuel</small><strong className="big-num">{player.rr}<small> / 100</small></strong></div>
        <div className="card"><small className="muted">K/D · Winrate</small><strong className="big-num">{player.kd} <small>· {player.winrate}</small></strong></div>
      </div>

      <div className="grid two demo-profile-grid">
        <div className="card">
          <div className="card-head"><h3>Agents favoris</h3><span className="muted">Exemple de profil</span></div>
          <div className="demo-agent-tags">{player.favoriteAgents.map(agent => <span key={agent}>{agent}</span>)}</div>
        </div>
        <div className="card">
          <div className="card-head"><h3>Matchs récents</h3><span className="muted">Données fictives</span></div>
          <div className="demo-match-list">
            {player.matches.map(match => (
              <div key={`${match.date}-${match.map}`} className="demo-match-row">
                <span>{match.date}</span><b>{match.map}</b><span>{match.agent}</span>
                <strong className={match.result === 'Victoire' ? 'win' : 'loss'}>{match.result}</strong><span>{match.score}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
