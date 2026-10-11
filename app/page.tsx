'use client';
import Link from 'next/link';
import Image from 'next/image';
import SiteFooter from './site-footer';
import logoMark from '../images/valorant_intelligence1.png';

export default function Home() {
  return (
    <main className="landing">
      <nav className="landing-nav">
        <Link href="/" className="landing-brand"><Image src={logoMark} alt="" /> <span>VALORANT<br />INTELLIGENCE</span></Link>
        <div className="landing-nav-actions">
          <Link href="/rechercher" className="landing-nav-link">Rechercher un joueur</Link>
          <Link href="/dashboard" className="button landing-demo">Essayer la démo →</Link>
        </div>
      </nav>

      <section className="landing-hero">
        <div className="landing-copy">
          <span className="eyebrow">ANALYSE COMPÉTITIVE · MODE DÉMO</span>
          <h1>
            <span className="hl"><span>Les chiffres</span></span>
            <span className="hl"><span>parlent.</span></span>
            <span className="hl"><span><em>À toi de jouer.</em></span></span>
          </h1>
          <p>Une lecture claire de tes performances VALORANT pour identifier tes leviers de progression, match après match.</p>
          <div className="hero-actions">
            <Link href="/dashboard" className="button big">Explorer le tableau de bord</Link>
            <Link href="/rechercher" className="button ghost big">Rechercher un joueur</Link>
          </div>
        </div>

        <div className="hero-visual" aria-label="Aperçu des statistiques">
          <div className="stat-float stat-kd">
            <span>K/D ACTUEL</span><strong>1.12 <b>▲ 8%</b></strong>
            <svg viewBox="0 0 180 54" preserveAspectRatio="none">
              <path d="M4 45 L35 38 L68 41 L94 25 L121 29 L151 13 L176 8 L176 54 L4 54Z" />
              <path className="spark-line" d="M4 45 L35 38 L68 41 L94 25 L121 29 L151 13 L176 8" />
            </svg>
          </div>
          <div className="stat-float stat-win">
            <span>WINRATE</span><div className="ring"><b>48.6%</b></div>
          </div>
          <div className="stat-float stat-match">
            <span>DERNIER MATCH</span><strong>Ascent</strong><small>Jett · 18/12</small>
            <b className="win-badge">Victoire</b>
            <div className="match-progress"><i /></div>
          </div>
        </div>
      </section>

      <section className="landing-grid">
        <article><strong>01</strong><h2>Comprendre</h2><p>Des agrégations cohérentes, sans jargon inutile.</p></article>
        <article><strong>02</strong><h2>Progresser</h2><p>Un coach à règles transparentes, basé sur tes données.</p></article>
        <article><strong>03</strong><h2>Répéter</h2><p>Des objectifs concrets pour structurer tes sessions.</p></article>
      </section>
      <SiteFooter note="Valorant Intelligence est un projet indépendant, non affilié à Riot Games." />
    </main>
  );
}