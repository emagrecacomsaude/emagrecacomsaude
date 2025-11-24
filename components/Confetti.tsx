import React, { useEffect, useState } from 'react';

interface ConfettiProps {
  trigger: boolean;
}

const COLORS = ['#6366f1', '#a855f7', '#ec4899', '#22c55e', '#fbbf24'];

export const Confetti: React.FC<ConfettiProps> = ({ trigger }) => {
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    if (trigger) {
      const newParticles = Array.from({ length: 50 }).map((_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 100, // vw
        y: -10, // Start above screen
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: Math.random() * 8 + 4,
        rotation: Math.random() * 360,
        delay: Math.random() * 0.2,
        duration: Math.random() * 1 + 1.5, // seconds
        xDrift: (Math.random() - 0.5) * 50 // Drift horizontal
      }));
      setParticles(newParticles);
      
      const timer = setTimeout(() => {
        setParticles([]);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [trigger]);

  if (particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-sm"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            transform: `rotate(${p.rotation}deg)`,
            animation: `fall ${p.duration}s linear forwards ${p.delay}s`,
            opacity: 0.8,
            boxShadow: `0 0 4px ${p.color}`
          }}
        />
      ))}
      <style>{`
        @keyframes fall {
          0% { top: -10%; transform: rotate(0deg) translateX(0); opacity: 1; }
          100% { top: 110%; transform: rotate(720deg) translateX(${Math.random() * 200 - 100}px); opacity: 0; }
        }
      `}</style>
    </div>
  );
};