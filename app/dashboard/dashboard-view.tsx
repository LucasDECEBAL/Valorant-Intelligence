'use client';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { LineChart, Donut, DmgChart } from './charts';
import * as D from './dashboard-data';
import type { PageId } from './dashboard-data';
import SiteFooter from '../site-footer';

/* ---------- petits utilitaires ---------- */
function Count({ to, dec = 0, suffix = '' }: { to: number; dec?: number; suffix?: string }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let raf = 0, t0 = 0;
    const f = (ts: number) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / 1100, 1);
      setV(to * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(f);
    };
    raf = requestAnimationFrame(f);
    return () => cancelAnimationFrame(raf);
  }, [to]);
  return <>{v.toFixed(dec)}{suffix}</>;
}

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { threshold: 0.12 });
    io.observe(ref.current!);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${on ? 'in' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

function Head({ eyebrow, l1, l2, children }: { eyebrow: string; l1: string; l2: string; children?: React.ReactNode }) {
  return (
    <div className="hero">
      <div>
        <div className="eyebrow">{eyebrow}</div>
        <h1 className="dh"><span className="hl"><span>{l1}</span></span><span className="hl"><span>{l2}</span></span></h1>
        {children}
      </div>
    </div>
  );
}

/* ================================================== */
export default function DashboardView() {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState<PageId>('dash');
  const [season, setSeason] = useState(0);
  const [hl, setHl] = useState(-1);
  const [toast, setToast] = useState('');
  const [detail, setDetail] = useState<{ title: string; description: string; facts: string[] } | null>(null);
  const [glow, setGlow] = useState(true);
  const [search, setSearch] = useState('');
  const [menu, setMenu] = useState<'notif' | 'user' | null>(null);
  const [mobileNav, setMobileNav] = useState(false);
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState<{ i: number; asc: boolean }>({ i: 0, asc: false });
  const [mapSel, setMapSel] = useState(1);
  const [dmgTab, setDmgTab] = useState(0);
  const [chat, setChat] = useState<{ me: boolean; t: string }[]>([{ me: false, t: "Salut ! Je suis le coach de démonstration. Mes réponses sont préécrites et ne proviennent pas d'une véritable IA." }]);
  const [typing, setTyping] = useState(false);
  const [plan, setPlan] = useState([true, false, false, false]);
  const [toggles, setToggles] = useState([true, true, false]);
  const searchRef = useRef<HTMLInputElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const s = D.seasons[season];

  /* loader */
  useEffect(() => { const t = setTimeout(() => setLoading(false), 1500); return () => clearTimeout(t); }, []);

  /* halo qui suit la souris */
  useEffect(() => {
    const m = (e: MouseEvent) => glowRef.current?.style.setProperty('transform', `translate(${e.clientX - 200}px,${e.clientY - 200}px)`);
    window.addEventListener('mousemove', m);
    return () => window.removeEventListener('mousemove', m);
  }, []);

  /* raccourci "/" pour la recherche */
  useEffect(() => {
    const k = (e: KeyboardEvent) => { if (e.key === '/' && document.activeElement?.tagName !== 'INPUT') { e.preventDefault(); searchRef.current?.focus(); } };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, []);

  /* fermer les menus au clic extérieur */
  useEffect(() => {
    const c = () => setMenu(null);
    document.addEventListener('click', c);
    return () => document.removeEventListener('click', c);
  }, []);

  useEffect(() => { chatRef.current?.scrollTo({ top: 9999, behavior: 'smooth' }); }, [chat, typing]);
  useEffect(() => {
    if (!detail) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setDetail(null);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [detail]);

  const say = (t: string) => { setToast(t); setTimeout(() => setToast(''), 2400); };
  const showDetail = (title: string, description: string, facts: string[]) => setDetail({ title, description, facts });
  const go = (p: PageId) => { setPage(p); setSearch(''); setMenu(null); setMobileNav(false); window.scrollTo({ top: 0 }); };

  /* recherche */
  const results = useMemo(() => {
    if (!search.trim()) return [];
    const q = search.toLowerCase();
    const r: { l: string; go: PageId }[] = [];
    D.nav.forEach(n => n.label.toLowerCase().includes(q) && r.push({ l: `Page · ${n.label}`, go: n.id }));
    D.agents.forEach(a => a.n.toLowerCase().includes(q) && a.role && r.push({ l: `Agent · ${a.n}`, go: 'agents' }));
    D.maps.forEach(m => m.n.toLowerCase().includes(q) && r.push({ l: `Carte · ${m.n}`, go: 'cartes' }));
    return r.slice(0, 6);
  }, [search]);

  /* tableau de matchs */
  const tableRows = useMemo(() => {
    const filtered = D.matches.filter(m => filter === 'all' || m[3] === filter);
    return D.sortMatches(filtered, sort.i, sort.asc);
  }, [filter, sort]);

  /* chat */
  const send = (q: string) => {
    if (!q.trim()) return;
    setChat(c => [...c, { me: true, t: q }]); setTyping(true);
    const k = q.toLowerCase();
    const ans = k.includes('vis') || k.includes('aim') ? D.coachAnswers.visée : k.includes('éco') || k.includes('eco') || k.includes('achat') ? D.coachAnswers.économie : k.includes('agent') || k.includes('jou') ? D.coachAnswers.agent : D.coachAnswers.default;
    setTimeout(() => { setTyping(false); setChat(c => [...c, { me: false, t: ans }]); }, 1100);
  };

  /* ---------- sous-composants ---------- */
  const Th = ({ i, children }: { i: number; children: React.ReactNode }) => (
    <th className="sortable" onClick={() => setSort(p => ({ i, asc: p.i === i ? !p.asc : true }))}>{children}{sort.i === i ? (sort.asc ? ' ↑' : ' ↓') : ''}</th>
  );
  const Rows = ({ rows }: { rows: D.Match[] }) => (
    <tbody>{rows.map((m, i) => (
      <tr key={`${m[0]}-${m[1]}-${i}`} onClick={() => showDetail(`${m[1]} · ${m[2]}`, `Match fictif du ${m[0]}.`, [`Résultat : ${m[3]}`, `K / D : ${m[4]}`])}>
        <td>{m[0]}</td><td>{m[1]}</td><td>{m[2]}</td>
        <td><span className={m[3] === 'Victoire' ? 'win' : 'loss'}>{m[3]}</span></td><td>{m[4]}</td>
      </tr>))}</tbody>
  );
  const MapGrid = () => (
    <div className="maps">
      {D.maps.map((m, i) => (
        <div key={m.n} className={'map' + (mapSel === i ? ' sel' : '')} onClick={() => setMapSel(i)}>
          <div style={{ background: m.c }}>{m.n[0]}</div>
          <b>{m.n}</b><small>{m.w}% victoires</small><small>K/D {m.kd}</small>
        </div>))}
    </div>
  );
  const MapDetail = () => {
    const m = D.maps[mapSel];
    return (
      <div className="map-detail" key={mapSel}>
        <b>{m.n}</b> — {m.w}% de victoires, K/D {m.kd}.
        <div className="progress"><span className="grow" style={{ width: m.w + '%' }} /></div>
      </div>
    );
  };

  return (
    <>
      {/* loader */}
      <div className={'loader' + (loading ? '' : ' hide')}>
        <div className="loader-logo"><i /><span>VALORANT<br />INTELLIGENCE</span></div>
        <div className="loader-bar"><span /></div>
      </div>
      <div className="cursor-glow" ref={glowRef} style={{ opacity: glow ? 1 : 0 }} />
      <div className={'toast' + (toast ? ' show' : '')} role="status">{toast}</div>
      {detail && (
        <div className="detail-backdrop" onClick={() => setDetail(null)}>
          <section className="detail-panel" role="dialog" aria-modal="true" aria-labelledby="detail-title" onClick={e => e.stopPropagation()}>
            <button className="detail-close" onClick={() => setDetail(null)} aria-label="Fermer le détail">×</button>
            <div className="eyebrow">Donnée de démonstration</div>
            <h2 id="detail-title">{detail.title}</h2>
            <p>{detail.description}</p>
            <ul>{detail.facts.map(fact => <li key={fact}>{fact}</li>)}</ul>
            <small>Exemple fictif, non issu d’un compte VALORANT connecté.</small>
          </section>
        </div>
      )}

      <div className="app">
        {mobileNav && (
          <div className="mobile-nav-backdrop" onClick={() => setMobileNav(false)}>
            <aside className="mobile-nav" aria-label="Navigation mobile" onClick={e => e.stopPropagation()}>
              <div className="mobile-nav-head">
                <span className="nav-label">Navigation</span>
                <button className="mobile-nav-close" aria-label="Fermer le menu" onClick={() => setMobileNav(false)}>×</button>
              </div>
              <nav>
                {D.nav.map(n => (
                  <button key={n.id} className={page === n.id ? 'active' : ''} onClick={() => go(n.id)}>
                    <span className="nav-icon">{n.icon}</span>{n.label}
                    {'badge' in n && <small className="badge">{n.badge}</small>}
                  </button>
                ))}
              </nav>
              <div className="nav-label" style={{ marginTop: 18 }}>Compte</div>
              <nav>
                <button className={page === 'profil' ? 'active' : ''} onClick={() => go('profil')}><span className="nav-icon">◉</span>Profil</button>
                <button className={page === 'params' ? 'active' : ''} onClick={() => go('params')}><span className="nav-icon">⚙</span>Paramètres</button>
              </nav>
            </aside>
          </div>
        )}
        {/* ============ SIDEBAR ============ */}
        <aside className="sidebar">
          <Link href="/" className="brand"><i /><span>VALORANT<br />INTELLIGENCE</span></Link>
          <div className="nav-label">Menu principal</div>
          <nav>
            {D.nav.map(n => (
              <button key={n.id} className={page === n.id ? 'active' : ''} onClick={() => go(n.id)}>
                <span className="nav-icon">{n.icon}</span>{n.label}
                {'badge' in n && <small className="badge">{n.badge}</small>}
              </button>))}
          </nav>
          <div className="nav-label" style={{ marginTop: 18 }}>Compte</div>
          <nav>
            <button className={page === 'profil' ? 'active' : ''} onClick={() => go('profil')}><span className="nav-icon">◉</span>Profil</button>
            <button className={page === 'params' ? 'active' : ''} onClick={() => go('params')}><span className="nav-icon">⚙</span>Paramètres</button>
          </nav>
          <div className="quote">« Les chiffres ne mentent pas, mais ils ne jouent pas à ta place. »</div>
        </aside>

        {/* ============ MAIN ============ */}
        <div className="main">
          <header className="topbar">
            <button className="mobile-nav-toggle" aria-label="Ouvrir le menu" aria-expanded={mobileNav} onClick={() => setMobileNav(true)}>
              <span /><span /><span />
            </button>
            <div className="search-wrap" onClick={e => e.stopPropagation()}>
              <input ref={searchRef} className="search" placeholder="Rechercher une carte, un agent…  ( / )" value={search} onChange={e => setSearch(e.target.value)} />
              {results.length > 0 && (
                <div className="search-res">{results.map((r, i) => <button key={i} onClick={() => go(r.go)}>{r.l}</button>)}</div>)}
            </div>
            <div className="user" onClick={e => e.stopPropagation()}>
              <button className="bell" onClick={() => setMenu(menu === 'notif' ? null : 'notif')}>🔔<i /></button>
              {menu === 'notif' && (
                <div className="dropdown">
                  <b>Exemples de notifications fictives</b>
                  <p>🏆 Nouveau record de K/D sur Bind</p><p>📈 +12 RR cette semaine</p><p>🤖 Ton coach a un nouveau conseil</p>
                </div>)}
              <div className="who" onClick={() => setMenu(menu === 'user' ? null : 'user')}>
                <div className="avatar">AZ</div>
                <div><b>Azura</b><small>Silver 3</small></div>
              </div>
              {menu === 'user' && (
                <div className="dropdown right">
                  <button onClick={() => go('profil')}>Profil de démonstration</button>
                  <button onClick={() => go('params')}>Paramètres</button>
                  <Link href="/">Quitter la démo</Link>
                </div>)}
            </div>
          </header>

          <div className="content">
            {/* ================= DASHBOARD ================= */}
            {page === 'dash' && <section className="page-in" key="dash">
              <div className="hero">
                <div>
                  <div className="eyebrow">Bienvenue, Azura</div>
                  <h1 className="dh"><span className="hl"><span>Ton analyse.</span></span><span className="hl"><span><strong>Ta progression.</strong></span></span></h1>
                  <p>Voici un aperçu de tes performances sur la saison en cours.</p>
                </div>
                <select className="season-select" value={season} onChange={e => setSeason(+e.target.value)}>
                  <option value={0}>Saison 2025 II</option><option value={1}>Saison 2025 I</option><option value={2}>Saison 2024</option>
                </select>
              </div>

              <p className="demo-notice">Mode démonstration · Les statistiques affichées sont fictives.</p>
              <div className="grid two">
                <Reveal className="card overview">
                  <div className="card-head"><h2>Vue d'ensemble</h2><small className="muted">{s.lab}</small></div>
                  <div className="metrics">
                    {s.k.map((k, i) => (
                      <div className="metric" key={season + '-' + i}>
                        <label>{k[0]}</label>
                        <b>{!isNaN(parseFloat(k[1] as string)) && /^[\d.]+%?$/.test(k[1] as string) ? <Count to={parseFloat(k[1] as string)} dec={(k[1] as string).includes('.') ? 2 : 0} suffix={(k[1] as string).endsWith('%') ? '%' : ''} /> : k[1]}</b>
                        <span>{k[k.length - 1]}</span>
                      </div>))}
                  </div>
                  <div className="chart-title">Progression du rang <span>6 derniers mois</span></div>
                  <LineChart pts={s.pts} trigger={season + page} />
                </Reveal>

                <Reveal className="card" delay={80}>
                  <div className="card-head"><h2>Répartition des agents</h2><small className="muted">142 parties</small></div>
                  <div className="donut-wrap">
                    <Donut hl={hl} setHl={setHl} />
                    <div className="legend-list">
                      {D.agents.map((a, i) => (
                        <div key={a.n} style={{ opacity: hl === -1 || hl === i ? 1 : .4 }} onMouseEnter={() => setHl(i)} onMouseLeave={() => setHl(-1)}>
                          <i style={{ background: a.c }} />{a.n}<b>{a.p}%</b>
                        </div>))}
                    </div>
                  </div>
                </Reveal>
              </div>

              <div className="grid two">
                <Reveal className="card ai">
                  <div className="card-head"><h2>Coach de démonstration <em>— conseil fictif</em></h2></div>
                  <p><strong>Tu perds tes duels en fin de partie.</strong>Ton K/D baisse de 18% après le round 18. La fatigue et la précipitation semblent en cause.</p>
                  <ol>
                    <li><b>1</b>Fais une pause de 5 min entre deux parties.</li>
                    <li><b>2</b>Joue plus lentement les angles serrés en overtime.</li>
                    <li><b>3</b>Échauffe-toi 10 min en deathmatch avant de jouer.</li>
                  </ol>
                  <button className="button small-button" onClick={() => go('coach')}>Discuter avec le coach</button>
                </Reveal>
                <Reveal className="card" delay={80}>
                  <div className="card-head"><h2>Points forts & axes</h2></div>
                  <div className="strengths">
                    <div className="strength"><b>Maîtrise de Bind</b><span>56% de victoires, K/D 1.32</span></div>
                    <div className="strength warn"><b>Fins de partie</b><span>K/D −18% après le round 18</span></div>
                    <div className="strength"><b>Précision</b><span>Headshot 23.4% (+1.6 pt)</span></div>
                    <div className="strength warn"><b>Économie</b><span>3 achats forcés inutiles / match</span></div>
                  </div>
                </Reveal>
              </div>

              <Reveal className="card season-card">
                <div className="card-head"><h2>Comparaison des saisons</h2><small className="muted">K/D moyen</small></div>
                <div className="season-chart">
                  {D.seasonBars.map(b => (
                    <button className="season-bar-wrap" key={b[0]} onClick={() => showDetail(b[0], 'Comparaison basée sur les chiffres de démonstration.', [`K/D moyen : ${b[1]}`])}>
                      <b>{b[1]}</b><div className={'season-bar ' + b[2]} /><small>{b[0]}</small>
                    </button>))}
                </div>
              </Reveal>

              <div className="grid two" style={{ marginTop: 18 }}>
                <Reveal className="card match-history">
                  <div className="card-head"><h2>Historique des matchs</h2><button className="link" onClick={() => go('matchs')}>Tout voir →</button></div>
                  <div className="table-scroll"><table><thead><tr><th>Date</th><th>Carte</th><th>Agent</th><th>Résultat</th><th>K / D</th></tr></thead><Rows rows={D.matches.slice(0, 5)} /></table></div>
                </Reveal>
                <Reveal className="card" delay={80}>
                  <div className="card-head"><h2>Agents adaptés à ton style</h2></div>
                  <div className="agent-list">
                    {D.fit.map(a => (
                      <button type="button" className="agent-row detail-trigger" key={a.n} onClick={() => showDetail(a.n, 'Compatibilité simulée à partir des données de démonstration.', [`Rôle : ${a.r}`, `Compatibilité fictive : ${a.v}%`])}>
                        <div className="agent-avatar" style={{ background: a.c }}>{a.n[0]}</div>
                        <div className="agent-info"><div>{a.n} <small>{a.r}</small><strong>{a.v}%</strong></div>
                          <div className="progress"><span className="grow" style={{ width: a.v + '%' }} /></div></div>
                      </button>))}
                  </div>
                </Reveal>
              </div>

              <Reveal className="pocket-card">
                <div>
                  <div className="eyebrow">Bientôt</div>
                  <h2>Tes stats dans ta poche</h2><p>Les inscriptions aux notifications ne sont pas encore ouvertes.</p>
                  <button className="button small-button" onClick={() => say('Les inscriptions aux notifications ne sont pas encore ouvertes.')}>Me prévenir</button>
                </div>
                <div className="phone-shape"><i /><i /><i /><b /></div>
              </Reveal>
            </section>}

            {/* ================= STATS ================= */}
            {page === 'stats' && <section className="page-in" key="stats">
              <Head eyebrow="Statistiques" l1="Tes chiffres" l2="en détail." />
              <div className="metrics four">
                {D.stats.map(st => <button type="button" className="card hoverlift detail-trigger" key={st[0]} onClick={() => showDetail(st[0], 'Valeur fictive affichée à titre de démonstration.', [`Valeur : ${st[1]}`])}><span className="muted">{st[0]}</span><div className="big-num">{st[1]}</div></button>)}
              </div>
              <div className="card" style={{ marginTop: 18 }}>
                <div className="card-head"><h2>Dégâts par round</h2>
                  <div className="chips">{['7 jours', '14 jours'].map((t, i) => <button key={t} className={'chip' + (dmgTab === i ? ' on' : '')} onClick={() => setDmgTab(i)}>{t}</button>)}</div>
                </div>
                <DmgChart data={D.dmgData[dmgTab]} />
              </div>
            </section>}

            {/* ================= MATCHS ================= */}
            {page === 'matchs' && <section className="page-in" key="matchs">
              <Head eyebrow="Matchs" l1="Tout ton" l2="historique." />
              <div className="card">
                <div className="card-head"><h2>{tableRows.length} parties</h2>
                  <div className="chips">{['all', 'Victoire', 'Défaite'].map(f => <button key={f} className={'chip' + (filter === f ? ' on' : '')} onClick={() => setFilter(f)}>{f === 'all' ? 'Tous' : f}</button>)}</div></div>
                <div className="table-scroll"><table><thead><tr><Th i={0}>Date</Th><Th i={1}>Carte</Th><Th i={2}>Agent</Th><Th i={3}>Résultat</Th><Th i={4}>K / D</Th></tr></thead><Rows rows={tableRows} /></table></div>
              </div>
            </section>}

            {/* ================= AGENTS ================= */}
            {page === 'agents' && <section className="page-in" key="agents">
              <Head eyebrow="Agents" l1="Tes agents" l2="favoris." />
              <div className="grid cards3">
                {D.agents.slice(0, 5).map(a => (
                  <button type="button" className="card hoverlift detail-trigger" key={a.n} onClick={() => showDetail(a.n, 'Statistiques fictives de sélection en démonstration.', [`Rôle : ${a.role}`, `Part des parties : ${a.p}%`, `Compatibilité simulée : ${a.fit}%`])}>
                    <div className="agent-avatar big-av" style={{ background: a.c }}>{a.n[0]}</div>
                    <h2>{a.n}</h2><small className="muted">{a.role}</small>
                    <div className="big-num">{a.p}%</div>
                    <div className="progress"><span className="grow" style={{ width: a.fit + '%' }} /></div>
                  </button>))}
              </div>
            </section>}

            {/* ================= CARTES ================= */}
            {page === 'cartes' && <section className="page-in" key="cartes">
              <Head eyebrow="Cartes" l1="Maîtrise" l2="des cartes." />
              <div className="card"><MapGrid /><MapDetail /></div>
            </section>}

            {/* ================= ARMES ================= */}
            {page === 'armes' && <section className="page-in" key="armes">
              <Head eyebrow="Armes" l1="Ton" l2="arsenal." />
              <div className="card"><div className="agent-list">
                {D.guns.map(g => (
                  <button type="button" className="agent-row detail-trigger" key={g[0]} onClick={() => showDetail(g[0], 'Statistiques fictives d’utilisation en démonstration.', [`Part des éliminations : ${g[1]}%`, `Évolution affichée : ${g[2]} ce mois`])}>
                    <div className="agent-avatar" style={{ background: '#2a3250' }}>{g[0][0]}</div>
                    <div className="agent-info"><div>{g[0]} <small>{g[2]} ce mois</small><strong>{g[1]}%</strong></div>
                      <div className="progress"><span className="grow" style={{ width: g[1] * 2 + '%' }} /></div></div>
                  </button>))}
              </div></div>
            </section>}

            {/* ================= COMPARAISON ================= */}
            {page === 'compar' && <section className="page-in" key="compar">
              <Head eyebrow="Comparaison" l1="Toi contre" l2="ton rang." />
              <div className="card">
                <div className="card-head"><h2>Toi vs moyenne Silver</h2></div>
                <div className="agent-list">
                  {D.compare.map(c => {
                    const mx = Math.max(c[1], c[2]) * 1.15;
                    return (
                      <div key={c[0]} className="cmp">
                        <small className="muted">{c[0]}</small>
                        <div className="progress thick"><span className="grow" style={{ width: (c[1] / mx) * 100 + '%' }} /></div>
                        <div className="progress thick alt"><span className="grow" style={{ width: (c[2] / mx) * 100 + '%' }} /></div>
                        <div className="cmp-v"><b>{c[1]}</b><span>{c[2]}</span></div>
                      </div>);
                  })}
                </div>
                <div className="legend-inline"><i /> Toi <i className="alt" /> Moyenne Silver</div>
              </div>
            </section>}

            {/* ================= COACH ================= */}
            {page === 'coach' && <section className="page-in" key="coach">
              <Head eyebrow="Coach simulé · réponses préécrites" l1="Pose tes" l2="questions.">
                <p>Ce coach n’est pas une véritable intelligence artificielle; ses réponses sont des exemples prédéfinis.</p>
              </Head>
              <div className="grid two">
                <div className="card chat">
                  <div className="chat-log" ref={chatRef}>
                    {chat.map((c, i) => <div key={i} className={'bubble ' + (c.me ? 'me' : 'ai')}>{c.t}</div>)}
                    {typing && <div className="bubble ai typing"><i /><i /><i /></div>}
                  </div>
                  <div className="chat-quick">
                    {['Comment améliorer ma visée ?', 'Conseils économie', 'Quel agent jouer ?'].map(q => <button key={q} className="chip" onClick={() => send(q)}>{q}</button>)}
                  </div>
                  <input className="chat-input" placeholder="Écris ta question puis Entrée…" onKeyDown={e => { if (e.key === 'Enter') { send(e.currentTarget.value); e.currentTarget.value = ''; } }} />
                </div>
                <div className="card">
                  <div className="card-head"><h2>Plan d'entraînement</h2><small className="muted">{plan.filter(Boolean).length}/4</small></div>
                  <div className="progress thick"><span className="grow" style={{ width: plan.filter(Boolean).length * 25 + '%' }} /></div>
                  <div className="plan">
                    {['Deathmatch 10 min', '3 parties classées max / jour', 'Revoir 1 replay perdu', 'Travailler le placement du viseur'].map((p, i) => (
                      <label key={p} className={plan[i] ? 'done' : ''}>
                        <input type="checkbox" checked={plan[i]} onChange={() => setPlan(pl => pl.map((v, j) => (j === i ? !v : v)))} />{p}
                      </label>))}
                  </div>
                </div>
              </div>
            </section>}

            {/* ================= PROFIL ================= */}
            {page === 'profil' && <section className="page-in" key="profil">
              <Head eyebrow="Profil de démonstration · données fictives" l1="Azura" l2="#EUW" />
              <div className="grid cards3">
                <div className="card"><small className="muted">Rang</small><div className="big-num">Silver 3</div></div>
                <div className="card"><small className="muted">Niveau</small><div className="big-num">128</div></div>
                <div className="card"><small className="muted">Parties</small><div className="big-num">142</div></div>
              </div>
              <div className="card" style={{ marginTop: 18 }}>
                <div className="card-head"><h2>Succès récents</h2></div>
                <div className="agent-list">
                  {D.achv.map(achievement => (
                    <button type="button" className="achv detail-trigger" key={achievement} onClick={() => showDetail(achievement, 'Succès fictif présent dans le profil de démonstration.', ['Succès décoratif, aucune progression réelle associée.'])}>
                      {achievement}
                    </button>))}
                </div>
              </div>
            </section>}

            {/* ================= PARAMETRES ================= */}
            {page === 'params' && <section className="page-in" key="params">
              <Head eyebrow="Paramètres" l1="Ton" l2="compte." />
              <div className="card">
                {[['Notifications', 'Temporaire · choix conservé uniquement pendant cette visite'], ['Effets de lumière', 'Halo qui suit le curseur'], ['Analyse hebdomadaire', 'Indisponible en démo · aucun résumé ne sera envoyé']].map(([title, description], i) => (
                  <div className="set" key={title}>
                    <div>{title}<small>{description}</small></div>
                    <button type="button" className={'toggle' + (toggles[i] ? ' on' : '')} aria-label={`${title} ${toggles[i] ? 'activé' : 'désactivé'}`} aria-pressed={toggles[i]} onClick={() => {
                      if (i === 2) {
                        say('L’analyse hebdomadaire n’est pas disponible en mode démo.');
                        return;
                      }
                      setToggles(tg => tg.map((v, j) => (j === i ? !v : v)));
                      if (i === 1) setGlow(g => !g);
                      if (i === 0) say('Préférence temporaire, non enregistrée.');
                    }} />
                  </div>))}
              </div>
            </section>}

            <SiteFooter note="Données de démonstration fictives · Projet indépendant, non affilié à Riot Games." />
          </div>
        </div>
      </div>
    </>
  );
}