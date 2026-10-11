'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import SiteFooter from '../site-footer';
import logoMark from '../../images/valorant_intelligence1.png';

export default function Connexion() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /* particules en fond */
  useEffect(() => {
    const c = canvasRef.current!, x = c.getContext('2d')!;
    let w = 0, h = 0, raf = 0;
    const pts = Array.from({ length: 50 }, () => ({ x: Math.random(), y: Math.random(), vx: (Math.random() - .5) * .0004, vy: (Math.random() - .5) * .0004 }));
    const resize = () => { w = c.width = c.offsetWidth; h = c.height = c.offsetHeight; };
    resize(); window.addEventListener('resize', resize);
    const loop = () => {
      x.clearRect(0, 0, w, h);
      pts.forEach((p, i) => {
        p.x = (p.x + p.vx + 1) % 1; p.y = (p.y + p.vy + 1) % 1;
        x.fillStyle = 'rgba(250,70,93,.5)'; x.beginPath(); x.arc(p.x * w, p.y * h, 1.6, 0, 7); x.fill();
        for (let j = i + 1; j < pts.length; j++) {
          const d = Math.hypot((p.x - pts[j].x) * w, (p.y - pts[j].y) * h);
          if (d < 130) { x.strokeStyle = `rgba(250,70,93,${.14 * (1 - d / 130)})`; x.beginPath(); x.moveTo(p.x * w, p.y * h); x.lineTo(pts[j].x * w, pts[j].y * h); x.stroke(); }
        }
      });
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <main className="auth-page">
      <canvas ref={canvasRef} className="landing-canvas" />
      <div className="landing-grid-bg" />
      <div className="auth-glow a1" /><div className="auth-glow a2" />

      <Link href="/" className="auth-back">← Accueil</Link>

      <div className="auth-split">
        {/* ---------- FORMULAIRE ---------- */}
        <section className="auth-left">
          <Link href="/" className="landing-brand auth-logo"><Image src={logoMark} alt="" /> <span>VALORANT<br />INTELLIGENCE</span></Link>

          <div className="eyebrow auth-eyebrow">Démo publique</div>
          <h1 className="auth-title">
            <span className="hl"><span>Un aperçu</span></span>
            <span className="hl"><span><em>sans compte.</em></span></span>
          </h1>
          <p className="auth-sub">Cet espace ne propose pas encore de connexion ni de création de compte. Le tableau de bord utilise des statistiques fictives.</p>

          <div className="card demo-auth-notice">
            <strong>Aucune authentification n’est effectuée.</strong>
            <p>N’entre pas d’adresse email ni de mot de passe. Tu peux parcourir le produit en mode démonstration.</p>
          </div>

          <Link href="/dashboard" className="button ghost auth-demo">Continuer vers la démo →</Link>
        </section>

        {/* ---------- VISUEL ---------- */}
        <section className="auth-right">
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
          <div className="auth-quote">« Les chiffres ne mentent pas, mais ils ne jouent pas à ta place. »</div>
        </section>
      </div>
      <SiteFooter note="Démonstration publique · aucune authentification. Exploitant en nom personnel : Lucas DÉCÉBAL-DANGER." />
    </main>
  );
}