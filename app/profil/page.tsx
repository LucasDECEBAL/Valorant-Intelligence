'use client';

import Link from 'next/link';
import { useState } from 'react';
import DemoPlayerProfile from '../../components/demo-player-profile';
import { demoProfile } from '../../services/demo-player-data';

export default function ProfileDemoPage() {
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(false);

  const connectDemo = () => {
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      setConnected(true);
    }, 650);
  };

  return (
    <main className="demo-page">
      <header className="demo-page-nav">
        <Link href="/" className="landing-brand"><span>VALORANT<br />INTELLIGENCE</span></Link>
        <nav><Link href="/rechercher">Rechercher un joueur</Link><Link href="/dashboard">Tableau de bord</Link></nav>
      </header>
      <div className="demo-page-content">
        <div className="demo-page-hero">
          <div>
            <div className="eyebrow">Mon profil · parcours démo</div>
            <h1 className="dh"><span className="hl"><span>Découvre ton</span></span><span className="hl"><span>profil joueur.</span></span></h1>
            <p>Explore un tableau de bord personnel simulant une connexion Riot, sans compte et sans données personnelles.</p>
          </div>
          {!connected && (
            <button className="button big" type="button" onClick={connectDemo} disabled={loading}>
              {loading ? 'Chargement de la démo…' : 'Connecter mon compte Riot — Démo'}
            </button>
          )}
        </div>
        <div className="demo-warning" role="note">
          <strong>Démo uniquement</strong>
          <span>Aucune connexion Riot réelle n’est effectuée. Ne saisis jamais de mot de passe, d’adresse e-mail ou de donnée personnelle ici.</span>
        </div>
        {connected ? (
          <DemoPlayerProfile player={demoProfile} />
        ) : (
          <div className="card demo-empty"><span className="demo-badge">PROFIL FICTIF — MODE DÉMO</span><p>Clique sur le bouton pour ouvrir un profil prérempli sans authentification.</p></div>
        )}
      </div>
    </main>
  );
}
