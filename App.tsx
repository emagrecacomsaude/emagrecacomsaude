
import React, { useState, useEffect } from 'react';
import { AppTab, UserStats, DailyMission, CategoryType, WeightGoal, WaterTracker as WaterTrackerType } from './types';
import { Calculator } from './components/Calculator';
import { Guide } from './components/Guide';
import { AICoach } from './components/AICoach';
import { Confetti } from './components/Confetti';
import { TabataTimer } from './components/TabataTimer';
import { WaterTracker } from './components/WaterTracker';
import { 
  Book, 
  Calculator as CalcIcon, 
  MessageSquare, 
  Flame, 
  Home, 
  Timer, 
  Droplets, 
  Coffee, 
  Utensils, 
  Zap, 
  Moon, 
  Ban, 
  Gift, 
  Calendar,
  ChevronRight,
  Scale,
  Edit2,
  RotateCcw
} from 'lucide-react';

const DAILY_MISSIONS_TEMPLATE: DailyMission[] = [
  { id: 'm1', label: 'Ler 1 Receita', completed: false, xpReward: 50 },
  { id: 'm2', label: 'Fazer um Treino Tabata', completed: false, xpReward: 100 },
  { id: 'm3', label: 'Beber água (marcar 1x)', completed: false, xpReward: 30 },
];

const INITIAL_WEIGHT_GOAL: WeightGoal = {
  current: 0,
  target: 0,
  start: 0
};

const INITIAL_WATER: WaterTrackerType = {
  dailyGoal: 0,
  consumed: 0,
  cupSize: 250
};

const CustomAppleLogo = () => (
  <svg width="30" height="30" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2 shrink-0">
    {/* Stem */}
    <path d="M50 35 C 50 35 45 20 38 15" stroke="#5D4037" strokeWidth="5" strokeLinecap="round" />
    {/* Leaf */}
    <path d="M50 35 Q 75 10 90 25 Q 80 50 50 35" fill="#65a30d" />
    {/* Body */}
    <path d="M50 40 C 25 40 10 55 10 75 C 10 95 35 105 50 98 C 65 105 90 95 90 75 C 90 55 75 40 50 40 Z" fill="#22c55e" />
    {/* Highlights */}
    <path d="M25 58 Q 20 68 25 78" stroke="#bef264" strokeWidth="4" strokeLinecap="round" />
    <path d="M45 45 Q 50 50 55 45" stroke="#bef264" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.HOME);
  const [guideCategory, setGuideCategory] = useState<CategoryType | 'all'>('all');
  const [triggerConfetti, setTriggerConfetti] = useState(false);
  const [showWeightModal, setShowWeightModal] = useState(false);
  
  // Persist state
  const [stats, setStats] = useState<UserStats>(() => {
    const saved = localStorage.getItem('fitquest_stats_v3');
    const now = Date.now();
    
    if (saved) {
      const parsed = JSON.parse(saved);
      return { 
        ...parsed, 
        // Ensure new fields exist for legacy saves
        startDate: parsed.startDate || now,
        joinDate: parsed.joinDate || now,
        daysInApp: 1 // Legacy default, will be recalculated
      };
    }
    return {
      xp: 0,
      level: 1,
      streak: 1,
      daysInApp: 1,
      lastLoginDate: new Date().toDateString(),
      sectionsRead: [],
      calculationsDone: 0,
      missions: DAILY_MISSIONS_TEMPLATE,
      weight: INITIAL_WEIGHT_GOAL,
      water: INITIAL_WATER,
      startDate: now,
      joinDate: now
    };
  });

  // State triggers for modals inputs
  const [weightForm, setWeightForm] = useState({ current: '', target: '' });

  // Calculate Days in App dynamically (1 + diff in days)
  const currentDaysInApp = Math.floor((Date.now() - (stats.startDate || Date.now())) / (1000 * 60 * 60 * 24)) + 1;

  // Daily Reset & Streak Logic
  useEffect(() => {
    const today = new Date();
    const todayString = today.toDateString();

    if (stats.lastLoginDate !== todayString) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      let newStreak = stats.streak;
      if (stats.lastLoginDate === yesterday.toDateString()) {
        newStreak += 1;
      } else {
        newStreak = 1; 
      }

      setStats(prev => ({
        ...prev,
        lastLoginDate: todayString,
        streak: newStreak,
        water: { ...prev.water, consumed: 0 }, // Reset daily water
        missions: DAILY_MISSIONS_TEMPLATE
      }));
    }
    
    localStorage.setItem('fitquest_stats_v3', JSON.stringify(stats));
  }, [stats]);

  const handleConfetti = () => {
    setTriggerConfetti(true);
    setTimeout(() => setTriggerConfetti(false), 2000);
  };

  const addXP = (amount: number) => {
    setStats(prev => {
      const newXP = prev.xp + amount;
      const newLevel = Math.floor(newXP / 200) + 1; // 200XP per level per screenshot
      return { ...prev, xp: newXP, level: newLevel };
    });
  };

  const updateWeight = () => {
    const current = parseFloat(weightForm.current) || stats.weight.current;
    const target = parseFloat(weightForm.target) || stats.weight.target;
    
    setStats(prev => ({
      ...prev,
      weight: {
        ...prev.weight,
        current,
        target,
        start: prev.weight.start || current // Set start weight if first time
      }
    }));
    setShowWeightModal(false);
    handleConfetti();
  };

  const resetDaysCounter = () => {
    if (confirm("Deseja reiniciar a contagem de 'Dias no App' para 1?")) {
      setStats(prev => ({ ...prev, startDate: Date.now() }));
      handleConfetti();
    }
  };

  // --- ACTIONS ---
  const onGuideComplete = (id: string) => {
    handleConfetti();
    addXP(50);
    setStats(prev => ({ ...prev, sectionsRead: [...prev.sectionsRead, id] }));
  };

  const onCalculationDone = () => {
    handleConfetti();
    addXP(20);
    setStats(prev => ({ ...prev, calculationsDone: prev.calculationsDone + 1 }));
  };

  const onTabataComplete = () => {
    handleConfetti();
    addXP(150);
  };

  const onWaterUpdate = (newWater: WaterTrackerType) => {
    setStats(prev => ({ ...prev, water: newWater }));
    if (newWater.consumed > stats.water.consumed) {
      addXP(10);
    }
  };

  const navigateToGuide = (category: CategoryType) => {
    setGuideCategory(category);
    setActiveTab(AppTab.GUIDE);
  };

  const navigateToTab = (tab: AppTab) => {
    setActiveTab(tab);
  };

  // --- HOME SCREEN ---
  const HomeDashboard = () => (
    <div className="space-y-6 pb-24 animate-slide-up px-4 pt-4">
      {/* Header */}
      <div className="flex items-center justify-center bg-white rounded-full py-2 px-6 shadow-sm mx-auto w-max mb-2 border border-slate-50">
        <CustomAppleLogo />
        <h1 className="text-lg font-bold text-slate-700">
          Emagreça com <span className="text-brand-accent">Saúde</span>
        </h1>
      </div>

      <div className="text-center text-slate-500 text-xs mb-4">
        Seu guia completo para uma vida mais saudável
      </div>

      {/* Weight Goal Card (Purple Gradient) */}
      <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl p-5 text-white shadow-xl shadow-purple-200 relative overflow-hidden">
        <div className="flex justify-between items-start mb-6 relative z-10">
          <h3 className="font-bold text-lg">Sua Meta de Peso</h3>
          <button 
            onClick={() => {
              setWeightForm({ current: stats.weight.current.toString(), target: stats.weight.target.toString() });
              setShowWeightModal(true);
            }}
            className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
          >
            <Edit2 size={16} />
          </button>
        </div>

        <div className="flex gap-4 relative z-10">
          <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-2xl p-3">
            <div className="flex items-center gap-2 mb-1 opacity-80">
              <Scale size={16} /> <span className="text-xs font-bold">Peso Atual</span>
            </div>
            <div className="text-2xl font-bold">{stats.weight.current > 0 ? `${stats.weight.current}kg` : '--'}</div>
          </div>
          <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-2xl p-3">
            <div className="flex items-center gap-2 mb-1 opacity-80">
              <Zap size={16} /> <span className="text-xs font-bold">Objetivo (8 sem)</span>
            </div>
            <div className="text-2xl font-bold">{stats.weight.target > 0 ? `${stats.weight.target}kg` : '--'}</div>
          </div>
        </div>

        {/* Loss Info */}
        <div className="mt-4 bg-white/10 backdrop-blur-sm rounded-2xl p-3 relative z-10 flex items-center gap-3">
           <div className="bg-white/20 p-2 rounded-lg"><Zap size={20} className="rotate-180" /></div>
           <div>
             <div className="text-xs font-bold opacity-80">Meta de Perda</div>
             <div className="font-bold text-lg">
                {stats.weight.current && stats.weight.target 
                  ? `${(stats.weight.current - stats.weight.target).toFixed(1)}kg` 
                  : 'Defina suas metas'}
             </div>
           </div>
        </div>
      </div>

      {/* XP Level Bar */}
      <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <div className="bg-brand-accent p-1 rounded-full text-white"><Zap size={16} fill="currentColor" /></div>
            <span className="font-bold text-slate-700">Nível {stats.level}</span>
          </div>
          <span className="text-brand-primary font-bold text-xl">{stats.xp} <span className="text-xs text-slate-400 font-normal">XP Total</span></span>
        </div>
        <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-1000"
            style={{ width: `${Math.min((stats.xp % 200) / 2, 100)}%` }} // Assuming 200 XP per level cap visual
          />
        </div>
        <div className="text-xs text-slate-400 mt-1 text-right">{stats.xp % 200}/200 XP</div>
      </div>

      {/* Streak & Days Cards */}
      <div className="grid grid-cols-2 gap-4">
        {/* Streak Card - Orange */}
        <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-3xl p-5 text-white shadow-lg shadow-orange-200 relative overflow-hidden">
          <div className="relative z-10">
            <div className="text-4xl font-black mb-1">{stats.streak}</div>
            <div className="font-medium text-sm opacity-90">Sequência</div>
          </div>
          <Flame size={60} className="absolute -bottom-2 -right-2 opacity-20 rotate-12" fill="currentColor" />
        </div>

        {/* Days Card - Teal */}
        <div className="bg-gradient-to-br from-teal-400 to-cyan-500 rounded-3xl p-5 text-white shadow-lg shadow-teal-200 relative overflow-hidden group">
          <div className="relative z-10 flex justify-between items-start">
            <div>
              <div className="text-4xl font-black mb-1">{currentDaysInApp}</div>
              <div className="font-medium text-sm opacity-90">Dias no App</div>
            </div>
            <button 
              onClick={resetDaysCounter}
              className="p-1.5 bg-white/20 rounded-full hover:bg-white/40 transition-colors"
              title="Reiniciar contagem"
            >
              <RotateCcw size={14} />
            </button>
          </div>
          <Calendar size={60} className="absolute -bottom-2 -right-2 opacity-20 rotate-12" />
          
          {/* Join Date Display */}
          <div className="absolute bottom-2 left-5 right-5 text-[10px] text-white/70 font-medium">
            Desde {new Date(stats.joinDate || Date.now()).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
          </div>
        </div>
      </div>

      {/* Feature Menu List */}
      <div className="space-y-3">
        <MenuCard 
          icon={<CalcIcon size={24} className="text-pink-500" />} 
          bg="bg-pink-100"
          title="Calculadora GET" 
          subtitle="Calcule suas calorias ideais para emagrecer"
          onClick={() => navigateToTab(AppTab.CALCULATOR)}
        />
        <MenuCard 
          icon={<Coffee size={24} className="text-amber-600" />} 
          bg="bg-amber-100"
          title="Receitas de Chás" 
          subtitle="5 chás poderosos para acelerar seu metabolismo"
          onClick={() => navigateToGuide('tea')}
        />
        <MenuCard 
          icon={<Utensils size={24} className="text-green-600" />} 
          bg="bg-green-100"
          title="Receitas Rápidas" 
          subtitle="Refeições saudáveis em minutos"
          onClick={() => navigateToGuide('recipe')}
        />
        <MenuCard 
          icon={<span className="text-2xl">🥑</span>} 
          bg="bg-lime-100"
          title="10 Alimentos Top" 
          subtitle="Os melhores alimentos para emagrecer"
          onClick={() => navigateToGuide('food')}
        />
        <MenuCard 
          icon={<Droplets size={24} className="text-blue-500" fill="currentColor" />} 
          bg="bg-blue-100"
          title="Guia da Água" 
          subtitle="Como a hidratação acelera seu emagrecimento"
          onClick={() => navigateToTab(AppTab.WATER)}
        />
        <MenuCard 
          icon={<span className="text-2xl">🍳</span>} 
          bg="bg-orange-100"
          title="Café da Manhã" 
          subtitle="Comece o dia com energia e saúde"
          onClick={() => navigateToGuide('breakfast')}
        />
        <MenuCard 
          icon={<Ban size={24} className="text-red-500" />} 
          bg="bg-red-100"
          title="O que Evitar" 
          subtitle="Alimentos que sabotam sua dieta"
          onClick={() => navigateToGuide('avoid')}
        />
        <MenuCard 
          icon={<Moon size={24} className="text-indigo-500" fill="currentColor" />} 
          bg="bg-indigo-100"
          title="Sono Ideal" 
          subtitle="Durma bem e emagreça mais"
          onClick={() => navigateToGuide('sleep')}
        />
        <MenuCard 
          icon={<Flame size={24} className="text-orange-500" fill="currentColor" />} 
          bg="bg-orange-100"
          title="Treino Tabata" 
          subtitle="Queime gordura em 4 minutos"
          onClick={() => navigateToTab(AppTab.TABATA)}
        />
        <MenuCard 
          icon={<Gift size={24} className="text-purple-500" fill="currentColor" />} 
          bg="bg-purple-100"
          title="Bônus Especial" 
          subtitle="Sucos, cardápios e dicas extras"
          onClick={() => navigateToGuide('bonus')}
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-brand-bg text-slate-800 flex flex-col font-sans overflow-hidden selection:bg-brand-primary selection:text-white">
      <Confetti trigger={triggerConfetti} />

      {/* Modals */}
      {showWeightModal && (
        <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm animate-pop shadow-2xl">
            <h3 className="text-xl font-bold mb-4 text-center">Definir Metas</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Peso Atual (kg)</label>
                <input 
                  type="number" 
                  value={weightForm.current}
                  onChange={e => setWeightForm({...weightForm, current: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-bold text-lg outline-none focus:border-brand-primary"
                  placeholder="Ex: 70"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Meta de Peso (kg)</label>
                <input 
                  type="number" 
                  value={weightForm.target}
                  onChange={e => setWeightForm({...weightForm, target: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 font-bold text-lg outline-none focus:border-brand-primary"
                  placeholder="Ex: 60"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button 
                onClick={() => setShowWeightModal(false)}
                className="flex-1 py-3 text-slate-500 font-bold"
              >
                Cancelar
              </button>
              <button 
                onClick={updateWeight}
                className="flex-1 py-3 bg-brand-primary text-white rounded-xl font-bold shadow-lg shadow-brand-primary/20"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto no-scrollbar">
        {activeTab === AppTab.HOME && <HomeDashboard />}
        
        {activeTab === AppTab.GUIDE && (
          <Guide 
            completedIds={stats.sectionsRead} 
            onComplete={onGuideComplete} 
            initialCategory={guideCategory}
            onBack={() => setActiveTab(AppTab.HOME)}
          />
        )}
        
        {activeTab === AppTab.TABATA && (
          <div className="p-4 pt-8">
            <header className="mb-6 flex items-center gap-2">
              <button onClick={() => setActiveTab(AppTab.HOME)} className="p-2 bg-slate-100 rounded-full"><ChevronRight className="rotate-180" /></button>
              <h2 className="text-2xl font-bold">Treino Tabata</h2>
            </header>
            <TabataTimer onComplete={onTabataComplete} />
          </div>
        )}
        
        {activeTab === AppTab.CALCULATOR && (
          <div className="p-4 pt-8">
            <header className="mb-6 flex items-center gap-2">
              <button onClick={() => setActiveTab(AppTab.HOME)} className="p-2 bg-slate-100 rounded-full"><ChevronRight className="rotate-180" /></button>
              <h2 className="text-2xl font-bold">Calculadora</h2>
            </header>
            <Calculator onCalculate={onCalculationDone} />
          </div>
        )}
        
        {activeTab === AppTab.WATER && (
           <div className="p-4 pt-8">
              <header className="mb-2 flex items-center gap-2">
                <button onClick={() => setActiveTab(AppTab.HOME)} className="p-2 bg-slate-100 rounded-full"><ChevronRight className="rotate-180" /></button>
              </header>
              <WaterTracker data={stats.water} onUpdate={onWaterUpdate} onConfetti={handleConfetti} />
           </div>
        )}

        {activeTab === AppTab.COACH && (
           <div className="p-4 pt-8 h-full flex flex-col">
              <header className="mb-6 flex items-center gap-2 shrink-0">
                <button onClick={() => setActiveTab(AppTab.HOME)} className="p-2 bg-slate-100 rounded-full"><ChevronRight className="rotate-180" /></button>
                <h2 className="text-2xl font-bold">Coach IA</h2>
              </header>
              <div className="flex-1 overflow-hidden">
                <AICoach />
              </div>
           </div>
        )}
      </main>

      {/* Bottom Navigation Bar */}
      <nav className="h-[80px] bg-white border-t border-slate-100 flex items-center justify-around px-2 z-50 fixed bottom-0 w-full shadow-[0_-5px_20px_rgba(0,0,0,0.03)]">
        <NavButton active={activeTab === AppTab.HOME} onClick={() => setActiveTab(AppTab.HOME)} icon={<Home size={22} />} label="Home" />
        <NavButton active={activeTab === AppTab.GUIDE} onClick={() => { setGuideCategory('recipe'); setActiveTab(AppTab.GUIDE); }} icon={<Book size={22} />} label="Receitas" />
        
        {/* Center Action Button (Tabata) */}
        <button 
          onClick={() => setActiveTab(AppTab.TABATA)}
          className="relative -top-5 bg-brand-primary text-white p-4 rounded-2xl shadow-lg shadow-brand-primary/40 active:scale-90 transition-transform hover:-translate-y-1"
        >
          <Timer size={26} strokeWidth={2.5} />
        </button>

        <NavButton active={activeTab === AppTab.WATER} onClick={() => setActiveTab(AppTab.WATER)} icon={<Droplets size={22} />} label="Água" />
        <NavButton active={activeTab === AppTab.COACH} onClick={() => setActiveTab(AppTab.COACH)} icon={<MessageSquare size={22} />} label="Perfil" />
      </nav>
    </div>
  );
};

// Sub-components
const MenuCard: React.FC<{ icon: React.ReactNode; bg: string; title: string; subtitle: string; onClick: () => void }> = ({ icon, bg, title, subtitle, onClick }) => (
  <button 
    onClick={onClick}
    className="w-full bg-white p-4 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4 active:scale-95 transition-all hover:shadow-md"
  >
    <div className={`w-14 h-14 ${bg} rounded-2xl flex items-center justify-center shrink-0`}>
      {icon}
    </div>
    <div className="flex-1 text-left">
      <h4 className="font-bold text-slate-800">{title}</h4>
      <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>
    </div>
    <ChevronRight className="text-slate-300" size={20} />
  </button>
);

const NavButton: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string }> = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`
      flex flex-col items-center justify-center w-16 rounded-2xl transition-all duration-300
      ${active ? 'text-brand-primary' : 'text-slate-400 hover:text-slate-600'}
    `}
  >
    <div className={`mb-1 transition-transform duration-300 ${active ? 'scale-110' : ''}`}>
      {icon}
    </div>
    <span className={`text-[10px] font-bold ${active ? 'opacity-100' : 'opacity-70'}`}>
      {label}
    </span>
  </button>
);

export default App;
