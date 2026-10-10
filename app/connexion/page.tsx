'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function Connexion() {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [pseudo, setPseudo] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

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

  /* force du mot de passe */
  const strength = Math.min(4, (pwd.length > 7 ? 1 : 0) + (/[A-Z]/.test(pwd) ? 1 : 0) + (/\d/.test(pwd) ? 1 : 0) + (/[^A-Za-z0-9]/.test(pwd) ? 1 : 0));
  const strengthLabel = ['Trop court', 'Faible', 'Moyen', 'Bon', 'Excellent'][pwd ? strength : 0];

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError('Entre une adresse email valide.');
    if (pwd.length < 6) return setError('Le mot de passe doit contenir au moins 6 caractères.');
    if (mode === 'signup' && pseudo.trim().length < 3) return setError('Choisis un pseudo (3 caractères minimum).');
    setLoading(true);

    // TODO : branche ici ton vrai appel d'authentification
    // ex : await fetch('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, pwd }) })
    await new Promise(r => setTimeout(r, 1400));

    setLoading(false);
    setDone(true);
    setTimeout(() => router.push('/dashboard'), 1100);
  };

  const switchMode = (m: 'login' | 'signup') => { setMode(m); setError(''); };

  return (
    <main className="auth-page">
      <canvas ref={canvasRef} className="landing-canvas" />
      <div className="landing-grid-bg" />
      <div className="auth-glow a1" /><div className="auth-glow a2" />

      <Link href="/" className="auth-back">← Accueil</Link>

      <div className="auth-split">
        {/* ---------- FORMULAIRE ---------- */}
        <section className="auth-left">
          <Link href="/" className="landing-brand auth-logo"><i /> <span>VALORANT<br />INTELLIGENCE</span></Link>

          <div className="eyebrow auth-eyebrow">Espace personnel</div>
          <h1 className="auth-title" key={mode}>
            <span className="hl"><span>{mode === 'login' ? 'Content de' : 'Rejoins'}</span></span>
            <span className="hl"><span><em>{mode === 'login' ? 'te revoir.' : 'la partie.'}</em></span></span>
          </h1>
          <p className="auth-sub">
            {mode === 'login' ? 'Connecte-toi pour retrouver tes statistiques et ton coach IA.' : 'Crée ton compte gratuit et commence à analyser tes performances.'}
          </p>

          <div className="auth-tabs">
            <button className={mode === 'login' ? 'on' : ''} onClick={() => switchMode('login')}>Connexion</button>
            <button className={mode === 'signup' ? 'on' : ''} onClick={() => switchMode('signup')}>Inscription</button>
            <span className="tab-slider" style={{ transform: `translateX(${mode === 'login' ? 0 : 100}%)` }} />
          </div>

          <form onSubmit={submit} className="auth-form" noValidate>
            {mode === 'signup' && (
              <div className="field slide-in">
                <input id="pseudo" value={pseudo} onChange={e => setPseudo(e.target.value)} placeholder=" " autoComplete="nickname" />
                <label htmlFor="pseudo">Pseudo Riot</label>
                <span className="field-icon">◉</span>
              </div>
            )}

            <div className="field">
              <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder=" " autoComplete="email" />
              <label htmlFor="email">Adresse email</label>
              <span className="field-icon">✉</span>
            </div>

            <div className="field">
              <input id="pwd" type={show ? 'text' : 'password'} value={pwd} onChange={e => setPwd(e.target.value)} placeholder=" " autoComplete={mode === 'login' ? 'current-password' : 'new-password'} />
              <label htmlFor="pwd">Mot de passe</label>
              <button type="button" className="field-eye" onClick={() => setShow(s => !s)} aria-label="Afficher le mot de passe">{show ? '🙈' : '👁'}</button>
            </div>

            {mode === 'signup' && pwd && (
              <div className="strength slide-in">
                <div className="strength-bars">{[1, 2, 3, 4].map(n => <i key={n} className={n <= strength ? `on s${strength}` : ''} />)}</div>
                <small>{strengthLabel}</small>
              </div>
            )}

            {mode === 'login' && (
              <div className="auth-row">
                <label className="check"><input type="checkbox" defaultChecked /><span />Se souvenir de moi</label>
                <button type="button" className="text-button" onClick={() => setError('Un email de réinitialisation sera envoyé (démo).')}>Mot de passe oublié ?</button>
              </div>
            )}

            {error && <div className="auth-error">{error}</div>}

            <button type="submit" className={'button auth-submit' + (loading ? ' loading' : '') + (done ? ' done' : '')} disabled={loading || done}>
              {done ? '✓ Connecté' : loading ? <span className="spinner" /> : mode === 'login' ? 'Se connecter' : 'Créer mon compte'}
            </button>
          </form>

          <div className="auth-sep"><span>ou</span></div>
          <Link href="/dashboard" className="button ghost auth-demo">Essayer la démo sans compte →</Link>

          <p className="auth-switch">
            {mode === 'login' ? 'Pas encore de compte ?' : 'Déjà inscrit ?'}{' '}
            <button className="text-button" onClick={() => switchMode(mode === 'login' ? 'signup' : 'login')}>
              {mode === 'login' ? 'Créer un compte' : 'Se connecter'}
            </button>
          </p>
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
    </main>
  );
}