'use client';

import { useEffect, useRef } from 'react';

export default function SiteBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    let width = 0;
    let height = 0;
    let frame = 0;
    const particles = Array.from({ length: 55 }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0004,
      vy: (Math.random() - 0.5) * 0.0004,
    }));
    const resize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    const animate = () => {
      context.clearRect(0, 0, width, height);
      particles.forEach((particle, index) => {
        particle.x = (particle.x + particle.vx + 1) % 1;
        particle.y = (particle.y + particle.vy + 1) % 1;
        context.fillStyle = 'rgba(255,70,85,.55)';
        context.beginPath();
        context.arc(particle.x * width, particle.y * height, 1.6, 0, Math.PI * 2);
        context.fill();
        for (let next = index + 1; next < particles.length; next += 1) {
          const other = particles[next];
          const distance = Math.hypot((particle.x - other.x) * width, (particle.y - other.y) * height);
          if (distance < 130) {
            context.strokeStyle = `rgba(255,70,85,${0.14 * (1 - distance / 130)})`;
            context.beginPath();
            context.moveTo(particle.x * width, particle.y * height);
            context.lineTo(other.x * width, other.y * height);
            context.stroke();
          }
        }
      });
      frame = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener('resize', resize);
    animate();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="site-background" aria-hidden="true">
      <canvas ref={canvasRef} />
      <div className="site-background-grid" />
      <div className="site-background-glow site-background-glow-one" />
      <div className="site-background-glow site-background-glow-two" />
    </div>
  );
}
