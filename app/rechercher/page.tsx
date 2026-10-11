'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import DemoPlayerProfile from '../../components/demo-player-profile';
import { demoPlayers, findDemoPlayer } from '../../services/demo-player-data';

const riotIdPattern = /^[^#\s]{1,16}#[A-Za-z0-9]{2,5}$/;

export default function SearchPlayerPage() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [player, setPlayer] = useState<typeof demoPlayers[number]>();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const search = (event: FormEvent) => {
    event.preventDefault();
    setError('');
    setPlayer(undefined);
    const value = query.trim();
    if (!riotIdPattern.test(value)) {
      setError('Utilise un Riot ID au format Pseudo#TAG, par exemple KrustylaD#EUW.');
      return;
    }
    setLoading(true);
    window.setTimeout(() => {
      const found = findDemoPlayer(value);
      setLoading(false);
      if (found) {
        router.push(`/dashboard?player=${encodeURIComponent(found.riotId)}`);
      }
      else setError('Aucun profil de démonstration correspondant à ce Riot ID n’existe.');
    }, 450);
  };

  return (
    <main className="demo-page">
      <header className="demo-page-nav">
        <Link href="/" className="landing-brand"><span>VALORANT<br />INTELLIGENCE</span></Link>
        <nav><Link href="/profil">Mon profil</Link><Link href="/dashboard">Tableau de bord</Link></nav>
      </header>
      <div className="demo-page-content">
        <div className="demo-page-hero">
          <div>
            <div className="eyebrow">Recherche · exemples fictifs</div>
            <h1 className="dh"><span className="hl"><span>Recherche un</span></span><span className="hl"><span>joueur.</span></span></h1>
            <p>Saisis un Riot ID pour consulter un profil prédéfini. Cette recherche ne contacte pas Riot et ne récupère aucune statistique réelle.</p>
          </div>
        </div>
        <div className="card demo-search-card">
          <form onSubmit={search}>
            <label htmlFor="riot-id">Riot ID</label>
            <div className="demo-search-row">
              <input id="riot-id" value={query} onChange={event => setQuery(event.target.value)} placeholder="KrustylaD#EUW" autoComplete="off" />
              <button className="button" type="submit" disabled={loading}>{loading ? 'Recherche…' : 'Rechercher'}</button>
            </div>
          </form>
          {error && <p className="demo-error" role="alert">{error}</p>}
          <div className="demo-examples">
            <span>Exemples disponibles :</span>
            {demoPlayers.map(example => <button type="button" key={example.riotId} onClick={() => router.push(`/dashboard?player=${encodeURIComponent(example.riotId)}`)}>{example.riotId}</button>)}
          </div>
        </div>
        {player && <DemoPlayerProfile player={player} />}
      </div>
    </main>
  );
}
