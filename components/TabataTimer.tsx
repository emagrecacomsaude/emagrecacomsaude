import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, CheckCircle2, Flame } from 'lucide-react';

interface TabataTimerProps {
  onComplete: () => void;
}

export const TabataTimer: React.FC<TabataTimerProps> = ({ onComplete }) => {
  const [isActive, setIsActive] = useState(false);
  const [round, setRound] = useState(1); // 1 to 8
  const [phase, setPhase] = useState<'work' | 'rest' | 'prepare' | 'finished'>('prepare');
  const [timeLeft, setTimeLeft] = useState(5); // Start with 5s prep

  const WORK_TIME = 20;
  const REST_TIME = 10;
  const TOTAL_ROUNDS = 8;

  const audioContextRef = useRef<AudioContext | null>(null);

  const playBeep = (freq = 440, type: OscillatorType = 'sine') => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    const ctx = audioContextRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.5);
  };

  useEffect(() => {
    let interval: number;

    if (isActive && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
        // Beep on last 3 seconds
        if (timeLeft <= 4 && timeLeft > 1) playBeep(600);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      playBeep(880, 'square'); // High pitch on switch
      
      // State transitions
      if (phase === 'prepare') {
        setPhase('work');
        setTimeLeft(WORK_TIME);
      } else if (phase === 'work') {
        if (round < TOTAL_ROUNDS) {
          setPhase('rest');
          setTimeLeft(REST_TIME);
        } else {
          setPhase('finished');
          setIsActive(false);
          onComplete();
        }
      } else if (phase === 'rest') {
        setRound((r) => r + 1);
        setPhase('work');
        setTimeLeft(WORK_TIME);
      }
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, phase, round, onComplete]);

  const toggleTimer = () => setIsActive(!isActive);
  
  const resetTimer = () => {
    setIsActive(false);
    setRound(1);
    setPhase('prepare');
    setTimeLeft(5);
  };

  const getBgColor = () => {
    if (phase === 'work') return 'bg-red-500';
    if (phase === 'rest') return 'bg-blue-500';
    if (phase === 'finished') return 'bg-brand-secondary';
    return 'bg-brand-accent';
  };

  const getLabel = () => {
    if (phase === 'work') return 'TREINO INTENSO';
    if (phase === 'rest') return 'DESCANSO';
    if (phase === 'prepare') return 'PREPARAR';
    return 'TREINO CONCLUÍDO';
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-3xl shadow-xl border border-slate-100">
      <div className="mb-6 text-center">
        <div className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-1">Tabata Timer</div>
        <h2 className="text-2xl font-bold text-slate-800 flex items-center justify-center gap-2">
          <Flame className="text-red-500" /> Round {round}/{TOTAL_ROUNDS}
        </h2>
      </div>

      {/* Circle Timer Visual */}
      <div className={`
        relative w-64 h-64 rounded-full flex items-center justify-center mb-8 transition-all duration-500 shadow-2xl
        ${getBgColor()}
      `}>
        {/* Pulse Effect */}
        {isActive && phase === 'work' && (
          <div className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-20"></div>
        )}
        
        <div className="text-center z-10 text-white">
          <div className="text-7xl font-black tabular-nums tracking-tighter">
            {timeLeft}
          </div>
          <div className="text-lg font-bold mt-2 opacity-90 uppercase tracking-wide">
            {getLabel()}
          </div>
        </div>
      </div>

      {/* Controls */}
      {phase !== 'finished' ? (
        <div className="flex gap-4 w-full max-w-xs">
          <button 
            onClick={toggleTimer}
            className="flex-1 py-4 rounded-xl bg-slate-900 text-white font-bold text-lg hover:bg-slate-800 active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2"
          >
            {isActive ? <><Pause fill="currentColor" /> Pausar</> : <><Play fill="currentColor" /> Começar</>}
          </button>
          <button 
            onClick={resetTimer}
            className="w-14 flex items-center justify-center rounded-xl bg-slate-200 text-slate-600 hover:bg-slate-300 active:scale-95 transition-all"
          >
            <RotateCcw size={24} />
          </button>
        </div>
      ) : (
        <div className="text-center animate-pop">
          <div className="text-brand-secondary text-xl font-bold mb-4">Parabéns! Você queimou calorias!</div>
          <button 
            onClick={resetTimer}
            className="px-8 py-3 bg-brand-secondary text-white rounded-full font-bold shadow-lg active:scale-95 transition-all"
          >
            Reiniciar Treino
          </button>
        </div>
      )}
      
      <div className="mt-8 grid grid-cols-2 gap-4 w-full text-center text-xs text-slate-400 font-medium">
         <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
            <div className="text-slate-900 text-lg font-bold">20s</div>
            INTENSIDADE
         </div>
         <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
            <div className="text-slate-900 text-lg font-bold">10s</div>
            DESCANSO
         </div>
      </div>
    </div>
  );
};