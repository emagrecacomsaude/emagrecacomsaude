import React, { useState } from 'react';
import { CalculatorData } from '../types';
import { Activity, Calculator as CalcIcon, Flame, Info } from 'lucide-react';

interface CalculatorProps {
  onCalculate: () => void;
}

export const Calculator: React.FC<CalculatorProps> = ({ onCalculate }) => {
  const [data, setData] = useState<CalculatorData>({
    gender: 'male',
    age: '',
    weight: '',
    height: '',
    activityLevel: 1.2,
    goal: 'maintain'
  });

  const [result, setResult] = useState<{ bmr: number; tdee: number } | null>(null);

  const calculate = () => {
    if (!data.age || !data.weight || !data.height) return;

    const w = Number(data.weight);
    const h = Number(data.height);
    const a = Number(data.age);
    
    // Mifflin-St Jeor Equation
    let bmr = (10 * w) + (6.25 * h) - (5 * a);
    if (data.gender === 'male') {
      bmr += 5;
    } else {
      bmr -= 161;
    }

    const tdee = bmr * data.activityLevel;
    
    setResult({ bmr, tdee });
    onCalculate(); 
  };

  const activityOptions = [
    { value: 1.2, label: 'Sedentário', desc: 'Pouco ou nenhum exercício' },
    { value: 1.375, label: 'Leve', desc: 'Exercício 1-3 dias/semana' },
    { value: 1.55, label: 'Moderado', desc: 'Exercício 3-5 dias/semana' },
    { value: 1.725, label: 'Intenso', desc: 'Exercício 6-7 dias/semana' },
    { value: 1.9, label: 'Atleta', desc: 'Treino muito intenso 2x dia' }
  ];

  return (
    <div className="pb-24 animate-slide-up max-w-2xl mx-auto">
       <header className="mb-6 text-center">
        <div className="inline-block p-3 rounded-full bg-brand-accent/10 text-brand-accent mb-2">
          <CalcIcon size={32} />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">
          Calculadora GET
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          Descubra suas calorias diárias.
        </p>
      </header>

      <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100">
        {/* Gender Toggle */}
        <div className="flex bg-slate-100 rounded-xl p-1 mb-6">
          <button
            className={`flex-1 py-3 rounded-lg font-bold transition-all ${data.gender === 'male' ? 'bg-blue-500 text-white shadow-md' : 'text-slate-400'}`}
            onClick={() => setData({ ...data, gender: 'male' })}
          >
            Homem
          </button>
          <button
            className={`flex-1 py-3 rounded-lg font-bold transition-all ${data.gender === 'female' ? 'bg-pink-500 text-white shadow-md' : 'text-slate-400'}`}
            onClick={() => setData({ ...data, gender: 'female' })}
          >
            Mulher
          </button>
        </div>

        {/* Inputs Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="space-y-2">
            <label className="text-xs uppercase text-slate-400 font-bold">Idade</label>
            <input
              type="number"
              value={data.age}
              onChange={(e) => setData({ ...data, age: Number(e.target.value) })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-800 font-mono text-lg focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 focus:outline-none transition-all"
              placeholder="25"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase text-slate-400 font-bold">Peso (kg)</label>
            <input
              type="number"
              value={data.weight}
              onChange={(e) => setData({ ...data, weight: Number(e.target.value) })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-800 font-mono text-lg focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 focus:outline-none transition-all"
              placeholder="70"
            />
          </div>
          <div className="space-y-2 col-span-2">
             <label className="text-xs uppercase text-slate-400 font-bold">Altura (cm)</label>
            <input
              type="number"
              value={data.height}
              onChange={(e) => setData({ ...data, height: Number(e.target.value) })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-800 font-mono text-lg focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 focus:outline-none transition-all"
              placeholder="170"
            />
          </div>
        </div>

        {/* Activity Level */}
        <div className="space-y-3 mb-8">
          <label className="text-xs uppercase text-slate-400 font-bold flex items-center gap-2">
            <Activity size={14} /> Nível de Atividade
          </label>
          <div className="space-y-2">
            {activityOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setData({ ...data, activityLevel: opt.value })}
                className={`w-full text-left p-3 rounded-xl border transition-all ${
                  data.activityLevel === opt.value
                    ? 'bg-brand-primary/10 border-brand-primary text-brand-primary'
                    : 'bg-white border-slate-100 text-slate-500 hover:bg-slate-50'
                }`}
              >
                <div className="font-bold text-sm">{opt.label}</div>
                <div className="text-xs opacity-70">{opt.desc}</div>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={calculate}
          disabled={!data.age || !data.weight || !data.height}
          className="w-full py-4 bg-brand-primary rounded-xl font-bold text-white text-lg shadow-lg shadow-brand-primary/30 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <CalcIcon /> Calcular Agora
        </button>
      </div>

      {/* Results Modal / Card */}
      {result && (
        <div className="mt-8 animate-slide-up">
           <div className="bg-white border border-brand-primary/20 rounded-3xl p-6 shadow-2xl shadow-brand-primary/10 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 p-4 opacity-5 text-brand-primary">
                <Flame size={150} />
              </div>
              
              <h3 className="text-center text-slate-400 uppercase tracking-widest text-xs font-bold mb-6">Seus Resultados</h3>
              
              <div className="flex flex-col gap-6 relative z-10">
                <div className="text-center">
                  <div className="text-sm text-slate-500 mb-1 flex items-center justify-center gap-1">
                    Taxa Metabólica Basal <Info size={12} />
                  </div>
                  <div className="text-3xl font-black text-slate-800">{Math.round(result.bmr)} <span className="text-sm font-normal text-slate-400">kcal</span></div>
                  <div className="text-xs text-slate-400 mt-1">O que você queima parado.</div>
                </div>
                
                <div className="h-px bg-slate-100 w-full" />
                
                <div className="text-center scale-110 transform transition-transform">
                  <div className="text-sm text-brand-primary font-bold mb-1 flex items-center justify-center gap-1">
                    Gasto Energético Total (GET)
                  </div>
                  <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">
                    {Math.round(result.tdee)}
                    <span className="text-lg text-slate-400 ml-1">kcal</span>
                  </div>
                  <div className="text-xs text-slate-400 mt-2">Para MANTER seu peso atual.</div>
                </div>
              </div>

              {/* Goal Suggestions */}
              <div className="mt-8 grid grid-cols-3 gap-2 text-center relative z-10">
                 <div className="bg-slate-50 rounded-lg p-2 border border-slate-100">
                    <div className="text-xs text-slate-500">Perder</div>
                    <div className="font-bold text-brand-secondary">{Math.round(result.tdee - 500)}</div>
                 </div>
                 <div className="bg-brand-primary/10 rounded-lg p-2 border border-brand-primary/30">
                    <div className="text-xs text-brand-primary font-bold">Manter</div>
                    <div className="font-bold text-brand-primary">{Math.round(result.tdee)}</div>
                 </div>
                 <div className="bg-slate-50 rounded-lg p-2 border border-slate-100">
                    <div className="text-xs text-slate-500">Ganhar</div>
                    <div className="font-bold text-brand-accent">{Math.round(result.tdee + 300)}</div>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};