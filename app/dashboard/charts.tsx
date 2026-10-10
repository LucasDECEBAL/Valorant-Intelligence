'use client';
import { useEffect, useRef, useState } from 'react';
import { agents } from './dashboard-data';

const dpr = () => (typeof window === 'undefined' ? 1 : window.devicePixelRatio || 1);
const ease = (p: number) => 1 - Math.pow(1 - p, 3);

/* ===== Courbe du rang ===== */
export function LineChart({ pts, trigger }: { pts: number[]; trigger: unknown }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const coords = useRef<[number, number][]>([]);
  const [tip, setTip] = useState<{ x: number; y: number; t: string } | null>(null);
  const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin'];

  useEffect(() => {
    const c = ref.current!, x = c.getContext('2d')!;
    const w = c.clientWidth, h = 200, r = dpr();
    c.width = w * r; c.height = h * r; x.setTransform(r, 0, 0, r, 0, 0);
    const max = Math.max(...pts) * 1.1, pad = 10;
    coords.current = pts.map((v, i) => [pad + i * (w - pad * 2) / (pts.length - 1), h - 24 - (v / max) * (h - 50)]);
    let raf = 0, t0 = 0;
    const draw = (prog: number) => {
      x.clearRect(0, 0, w, h);
      x.strokeStyle = 'rgba(255,255,255,.04)';
      for (let i = 0; i < 4; i++) { x.beginPath(); x.moveTo(0, 20 + i * 45); x.lineTo(w, 20 + i * 45); x.stroke(); }
      x.save(); x.beginPath(); x.rect(0, 0, w * prog, h); x.clip();
      const g = x.createLinearGradient(0, 0, 0, h); g.addColorStop(0, 'rgba(255,70,85,.4)'); g.addColorStop(1, 'rgba(255,70,85,0)');
      const P = coords.current;
      x.beginPath(); x.moveTo(P[0][0], h - 14); P.forEach(p => x.lineTo(p[0], p[1])); x.lineTo(P.at(-1)![0], h - 14); x.closePath(); x.fillStyle = g; x.fill();
      x.beginPath(); P.forEach((p, i) => i ? x.lineTo(p[0], p[1]) : x.moveTo(p[0], p[1]));
      x.strokeStyle = '#ff4655'; x.lineWidth = 2.5; x.shadowColor = '#ff4655'; x.shadowBlur = 12; x.stroke(); x.shadowBlur = 0;
      P.forEach(p => { x.beginPath(); x.arc(p[0], p[1], 4, 0, 7); x.fillStyle = '#ff4655'; x.fill(); });
      x.restore();
      x.fillStyle = '#7d869f'; x.font = '11px DM Sans';
      ['Jan', 'Fév', 'Mars', 'Avr', 'Mai', 'Juin'].forEach((m, i) => x.fillText(m, P[i][0] - (i === 5 ? 22 : 0), h - 4));
    };
    const f = (ts: number) => { if (!t0) t0 = ts; const p = Math.min((ts - t0) / 1400, 1); draw(ease(p)); if (p < 1) raf = requestAnimationFrame(f); };
    raf = requestAnimationFrame(f);
    return () => cancelAnimationFrame(raf);
  }, [pts, trigger]);

  const onMove = (e: React.MouseEvent) => {
    const r = (e.target as HTMLElement).getBoundingClientRect(), mx = e.clientX - r.left;
    let best = 0; coords.current.forEach((p, i) => { if (Math.abs(p[0] - mx) < Math.abs(coords.current[best][0] - mx)) best = i; });
    setTip({ x: coords.current[best][0], y: coords.current[best][1], t: `${months[best]} · ${pts[best]} RR cumulés` });
  };
  return (
    <div className="chart-wrap">
      <canvas ref={ref} style={{ width: '100%', height: 200 }} onMouseMove={onMove} onMouseLeave={() => setTip(null)} />
      <div className="chart-tip" style={{ left: tip?.x, top: tip?.y, opacity: tip ? 1 : 0 }}>{tip?.t}</div>
    </div>
  );
}

/* ===== Donut interactif ===== */
export function Donut({ hl, setHl }: { hl: number; setHl: (i: number) => void }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const prog = useRef(0);
  const hlRef = useRef(hl); hlRef.current = hl;

  const paint = () => {
    const c = ref.current!, x = c.getContext('2d')!, cx = 190, R = 170, r = 108;
    x.clearRect(0, 0, 380, 380);
    let a = -Math.PI / 2;
    agents.forEach((ag, i) => {
      const ang = (ag.p / 100) * Math.PI * 2 * prog.current, rr = hlRef.current === i ? R + 8 : R;
      x.beginPath(); x.arc(cx, cx, rr, a, a + ang - .03); x.arc(cx, cx, r, a + ang - .03, a, true); x.closePath();
      x.fillStyle = ag.c; x.globalAlpha = hlRef.current === -1 || hlRef.current === i ? 1 : .35; x.fill(); a += ang;
    });
    x.globalAlpha = 1;
  };
  useEffect(() => {
    let raf = 0, t0 = 0;
    const f = (ts: number) => { if (!t0) t0 = ts; const p = Math.min((ts - t0) / 1200, 1); prog.current = ease(p); paint(); if (p < 1) raf = requestAnimationFrame(f); };
    raf = requestAnimationFrame(f); return () => cancelAnimationFrame(raf);
  }, []);
  useEffect(paint, [hl]);

  const onMove = (e: React.MouseEvent) => {
    const r = (e.target as HTMLElement).getBoundingClientRect();
    const dx = e.clientX - r.left - r.width / 2, dy = e.clientY - r.top - r.height / 2, d = Math.hypot(dx, dy) / (r.width / 2);
    if (d < .55 || d > 1) return setHl(-1);
    let ang = Math.atan2(dy, dx) + Math.PI / 2; if (ang < 0) ang += Math.PI * 2;
    let cum = 0, found = -1;
    agents.forEach((a, i) => { const s = cum; cum += a.p / 100 * Math.PI * 2; if (ang >= s && ang < cum) found = i; });
    setHl(found);
  };
  return (
    <div className="donut-box">
      <canvas ref={ref} width={380} height={380} onMouseMove={onMove} onMouseLeave={() => setHl(-1)} />
      <div className="donut-center">
        <b>{hl >= 0 ? Math.round(142 * agents[hl].p / 100) : 142}</b>
        <small>{hl >= 0 ? agents[hl].n : 'parties'}</small>
      </div>
    </div>
  );
}

/* ===== Barres de dégâts ===== */
export function DmgChart({ data }: { data: number[] }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!, x = c.getContext('2d')!, w = c.clientWidth, h = 180, r = dpr();
    c.width = w * r; c.height = h * r; x.setTransform(r, 0, 0, r, 0, 0);
    const bw = (w - 20) / data.length; let p = 0, raf = 0;
    const f = () => {
      p = Math.min(p + .05, 1); x.clearRect(0, 0, w, h);
      data.forEach((v, i) => {
        const bh = ((v - 110) / 50) * (h - 30) * p, g = x.createLinearGradient(0, h - bh, 0, h);
        g.addColorStop(0, '#ff4655'); g.addColorStop(1, '#7a2a3c'); x.fillStyle = g;
        x.beginPath(); x.roundRect(10 + i * bw + bw * .18, h - bh - 14, bw * .64, bh, 5); x.fill();
      });
      if (p < 1) raf = requestAnimationFrame(f);
    };
    f(); return () => cancelAnimationFrame(raf);
  }, [data]);
  return <canvas ref={ref} style={{ width: '100%', height: 180 }} />;
}