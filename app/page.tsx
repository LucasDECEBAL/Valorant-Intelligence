import Link from 'next/link';

export default function Home() {
  return (
    <main className="landing">
      <div className="landing-glow landing-glow-one" />
      <div className="landing-glow landing-glow-two" />
      <nav className="landing-nav">
        <Link href="/" className="landing-brand"><i /> <span>VALORANT<br />INTELLIGENCE</span></Link>
        <Link href="/dashboard" className="button landing-demo">Essayer la démo →</Link>
      </nav>

      <section className="landing-hero">
        <div className="landing-copy">
          <span className="eyebrow">ANALYSE COMPÉTITIVE · MODE DÉMO</span>
          <h1>Les chiffres<br />parlent.<br /><em>À toi de jouer.</em></h1>
          <p>Une lecture claire de tes performances VALORANT pour identifier tes leviers de progression, match après match.</p>
          <div className="hero-actions">
            <Link href="/dashboard" className="button big">Explorer le tableau de bord</Link>
            <Link href="/connexion" className="button ghost big">Se connecter</Link>
          </div>
        </div>

        <div className="hero-visual" aria-label="Aperçu des statistiques">
          <div className="stat-float stat-kd">
            <span>K/D ACTUEL</span><strong>1.12 <b>▲ 8%</b></strong>
            <svg viewBox="0 0 180 54" preserveAspectRatio="none"><path d="M4 45 L35 38 L68 41 L94 25 L121 29 L151 13 L176 8 L176 54 L4 54Z" /><path className="spark-line" d="M4 45 L35 38 L68 41 L94 25 L121 29 L151 13 L176 8" /></svg>
          </div>
          <div className="stat-float stat-win">
            <span>WINRATE</span><div className="ring"><b>48.6%</b></div>
          </div>
          <div className="stat-float stat-match">
            <span>DERNIER MATCH</span><strong>Ascent</strong><small>Jett · 18/12</small><b className="win-badge">Victoire</b><div className="match-progress"><i /></div>
          </div>
        </div>
      </section>

      <section className="landing-grid">
        <article><strong>01</strong><h2>Comprendre</h2><p>Des agrégations cohérentes, sans jargon inutile.</p></article>
        <article><strong>02</strong><h2>Progresser</h2><p>Un coach à règles transparentes, basé sur tes données.</p></article>
        <article><strong>03</strong><h2>Répéter</h2><p>Des objectifs concrets pour structurer tes sessions.</p></article>
      </section>
      <footer>Valorant Intelligence est un projet indépendant, non affilié à Riot Games.</footer>
    </main>
  );
}
