import React, { useState } from 'react';
import { WaterTracker as WaterTrackerType } from '../types';
import { Droplets, Plus, Minus, Calculator } from 'lucide-react';

interface WaterTrackerProps {
  data: WaterTrackerType;
  onUpdate: (newData: WaterTrackerType) => void;
  onConfetti: () => void;
}

export const WaterTracker: React.FC<WaterTrackerProps> = ({ data, onUpdate, onConfetti }) => {
  const [weightInput, setWeightInput] = useState('');
  const [showCalculator, setShowCalculator] = useState(!data.dailyGoal);

  const calculateGoal = () => {
    const w = parseFloat(weightInput);
    if (w > 0) {
      // 35ml per kg
      const goal = Math.ceil(w * 35);
      onUpdate({ ...data, dailyGoal: goal });
      setShowCalculator(false);
      onConfetti();
    }
  };

  const addCup = () => {
    onUpdate({ ...data, consumed: data.consumed + 1 });
    onConfetti();
  };

  const removeCup = () => {
    if (data.consumed > 0) {
      onUpdate({ ...data, consumed: data.consumed - 1 });
    }
  };

  const currentMl = data.consumed * data.cupSize;
  const progress = Math.min((currentMl / (data.dailyGoal || 2000)) * 100, 100);
  const cupsGoal = Math.ceil((data.dailyGoal || 2000) / data.cupSize);

  return (
    <div className="animate-slide-up pb-24">
      <header className="px-4 mb-6">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          Guia da Água <Droplets className="text-blue-500 fill-current" />
        </h2>
        <p className="text-slate-500 text-sm">Hidratação para emagrecer</p>
      </header>

      {/* Hero Card */}
      <div className="mx-4 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-3xl p-6 text-white shadow-xl shadow-blue-200 mb-6">
        <div className="flex justify-center mb-4">
          <Droplets size={48} className="animate-bounce-short" />
        </div>
        
        {showCalculator ? (
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4">
            <h3 className="text-center font-bold mb-4">Calcule sua Meta Diária</h3>
            <div className="flex gap-2">
              <input 
                type="number" 
                placeholder="Seu peso (kg)" 
                value={weightInput}
                onChange={(e) => setWeightInput(e.target.value)}
                className="flex-1 rounded-xl px-4 py-3 text-slate-800 outline-none"
              />
              <button 
                onClick={calculateGoal}
                className="bg-white text-blue-600 font-bold px-6 py-3 rounded-xl shadow-lg active:scale-95 transition-all"
              >
                Calcular
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="text-sm opacity-90 font-medium mb-1">Meta Diária</div>
            <div className="text-4xl font-black mb-2">{data.dailyGoal}ml</div>
            <button 
              onClick={() => setShowCalculator(true)}
              className="text-xs bg-white/20 px-3 py-1 rounded-full hover:bg-white/30 transition-colors"
            >
              Recalcular
            </button>
          </div>
        )}
      </div>

      {/* Tracker Card */}
      <div className="mx-4 bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-slate-800">Copos de Água Hoje</h3>
          <span className="text-xs text-slate-400 font-bold">Meta: {cupsGoal} copos</span>
        </div>

        <div className="mb-2 flex justify-between text-sm text-slate-500">
          <span>{data.consumed} copos ({currentMl}ml)</span>
        </div>

        {/* Progress Bar */}
        <div className="h-4 bg-slate-100 rounded-full overflow-hidden mb-8">
          <div 
            className="h-full bg-blue-500 transition-all duration-1000 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Cups Grid Visual */}
        <div className="grid grid-cols-6 gap-2 mb-8">
          {Array.from({ length: Math.max(cupsGoal, data.consumed + 1) }).map((_, i) => (
            <div 
              key={i}
              className={`aspect-square rounded-lg flex items-center justify-center transition-all duration-300 ${
                i < data.consumed 
                  ? 'bg-blue-100 text-blue-500 scale-100' 
                  : 'bg-slate-50 text-slate-200 scale-90'
              }`}
            >
              <Droplets size={16} fill={i < data.consumed ? "currentColor" : "none"} />
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="flex gap-3">
          <button 
            onClick={removeCup}
            className="flex-1 py-4 border border-slate-200 rounded-xl text-slate-400 font-bold flex items-center justify-center gap-2 hover:bg-slate-50 active:scale-95 transition-all"
          >
            <Minus size={20} /> Remover
          </button>
          <button 
            onClick={addCup}
            className="flex-[2] py-4 bg-blue-500 rounded-xl text-white font-bold shadow-lg shadow-blue-200 flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            <Plus size={20} /> Adicionar Copo
          </button>
        </div>
      </div>

      <div className="mx-4 mt-6 p-4 bg-yellow-50 rounded-2xl border border-yellow-100 text-yellow-800 text-sm leading-relaxed">
        <strong>💡 Dica:</strong> Beber 600ml de água logo ao acordar (em jejum) ativa seu metabolismo e ajuda a eliminar toxinas acumuladas durante a noite.
      </div>
    </div>
  );
};