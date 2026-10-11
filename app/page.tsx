'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import SiteFooter from './site-footer';
import logoMark from '../images/valorant_intelligence1.png';

export default function Home() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = ref.current!, x = c.getContext('2d')!;
    let w = 0, h = 0, raf = 0;
    const pts = Array.from({ length: 55 }, () => ({ x: Math.random(), y: Math.random(), vx: (Math.random() - .5) * .0004, vy: (Math.random() - .5) * .0004 }));
    const resize = () => { w = c.width = c.offsetWidth; h = c.height = c.offsetHeight; };
    resize(); window.addEventListener('resize', resize);
    const loop = () => {
      x.clearRect(0, 0, w, h);
      pts.forEach((p, i) => {
        p.x = (p.x + p.vx + 1) % 1; p.y = (p.y + p.vy + 1) % 1;
        x.fillStyle = 'rgba(255,70,85,.55)'; x.beginPath(); x.arc(p.x * w, p.y * h, 1.6, 0, 7); x.fill();
        for (let j = i + 1; j < pts.length; j++) {
          const d = Math.hypot((p.x - pts[j].x) * w, (p.y - pts[j].y) * h);
          if (d < 130) { x.strokeStyle = `rgba(255,70,85,${.14 * (1 - d / 130)})`; x.beginPath(); x.moveTo(p.x * w, p.y * h); x.lineTo(pts[j].x * w, pts[j].y * h); x.stroke(); }
        }
      });
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <main className="landing">
      <canvas ref={ref} className="landing-canvas" />
      <div className="landing-glow landing-glow-one" />
      <div className="landing-glow landing-glow-two" />

      <nav className="landing-nav">
        <Link href="/" className="landing-brand"><Image src={logoMark} alt="" /> <span>VALORANT<br />INTELLIGENCE</span></Link>
        <Link href="/dashboard" className="button landing-demo">Essayer la démo →</Link>
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
            <Link href="/connexion" className="button ghost big">Se connecter</Link>
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