import React, { useState, useEffect } from 'react';
import { GUIDE_CONTENT } from '../data';
import { CategoryType } from '../types';
import { CheckCircle, ChevronRight, ArrowLeft } from 'lucide-react';

interface GuideProps {
  completedIds: string[];
  onComplete: (id: string) => void;
  initialCategory?: CategoryType | 'all';
  onBack: () => void;
}

const CATEGORY_NAMES: Record<CategoryType, string> = {
  tea: 'Chás',
  recipe: 'Receitas',
  food: 'Alimentos',
  water: 'Hidratação',
  breakfast: 'Café da Manhã',
  avoid: 'Evitar',
  sleep: 'Sono',
  tabata: 'Tabata',
  bonus: 'Bônus'
};

const CATEGORY_COLORS: Record<CategoryType, string> = {
  tea: 'bg-pink-100 text-pink-600',
  recipe: 'bg-orange-100 text-orange-600',
  food: 'bg-green-100 text-green-600',
  water: 'bg-blue-100 text-blue-600',
  breakfast: 'bg-yellow-100 text-yellow-600',
  avoid: 'bg-red-100 text-red-600',
  sleep: 'bg-indigo-100 text-indigo-600',
  tabata: 'bg-slate-100 text-slate-600',
  bonus: 'bg-purple-100 text-purple-600'
};

export const Guide: React.FC<GuideProps> = ({ completedIds, onComplete, initialCategory = 'all', onBack }) => {
  const [activeCategory, setActiveCategory] = useState<CategoryType | 'all'>(initialCategory);
  const [selectedContent, setSelectedContent] = useState<string | null>(null);

  // Sync prop change
  useEffect(() => {
    setActiveCategory(initialCategory);
  }, [initialCategory]);

  const categories = Array.from(new Set(GUIDE_CONTENT.map(c => c.category)));
  const filteredContent = activeCategory === 'all' 
    ? GUIDE_CONTENT 
    : GUIDE_CONTENT.filter(c => c.category === activeCategory);

  const selectedItem = GUIDE_CONTENT.find(c => c.id === selectedContent);

  if (selectedItem) {
    const isCompleted = completedIds.includes(selectedItem.id);
    return (
      <div className="fixed inset-0 z-50 bg-white overflow-y-auto animate-slide-up pb-20">
        <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-100 p-4 flex items-center justify-between z-10">
          <button 
            onClick={() => setSelectedContent(null)}
            className="p-2 rounded-full hover:bg-slate-100 flex items-center gap-1 text-slate-600 font-bold"
          >
            <ArrowLeft size={20} /> Voltar
          </button>
          <div className="font-bold text-slate-800 truncate max-w-[200px]">{selectedItem.title}</div>
          <div className="w-8" />
        </div>
        
        <div className="p-6 max-w-lg mx-auto">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 ${CATEGORY_COLORS[selectedItem.category]}`}>
            {selectedItem.icon}
          </div>
          
          <h1 className="text-3xl font-bold text-slate-900 mb-2">{selectedItem.title}</h1>
          {selectedItem.subtitle && <p className="text-lg text-slate-500 mb-8">{selectedItem.subtitle}</p>}
          
          <div className="prose prose-slate prose-lg">
            <div className="whitespace-pre-line leading-relaxed text-slate-600">
              {selectedItem.content}
            </div>
          </div>

          {!isCompleted ? (
            <button
              onClick={() => {
                onComplete(selectedItem.id);
                setSelectedContent(null);
              }}
              className="mt-12 w-full py-4 bg-brand-primary rounded-2xl font-bold text-white shadow-xl shadow-brand-primary/20 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <CheckCircle size={20} />
              Concluir Leitura (+50 XP)
            </button>
          ) : (
            <div className="mt-12 p-4 bg-green-50 text-green-600 rounded-xl text-center font-bold border border-green-100">
              Você já completou esta leitura! 🏆
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-24 animate-slide-up">
      <header className="px-4 pt-4 flex items-center gap-3">
        <button onClick={onBack} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors">
          <ArrowLeft size={20} className="text-slate-600" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            {activeCategory === 'all' ? 'Biblioteca' : CATEGORY_NAMES[activeCategory]}
          </h2>
          <p className="text-slate-500 text-sm">
            {activeCategory === 'all' ? 'Todo o conhecimento do ebook.' : `Conteúdo sobre ${CATEGORY_NAMES[activeCategory]}`}
          </p>
        </div>
      </header>

      {/* Category Filters (Only show if viewing ALL) */}
      {activeCategory === 'all' && (
        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar px-4">
          <button
            onClick={() => setActiveCategory('all')}
            className="px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap bg-brand-primary text-white shadow-md"
          >
            Tudo
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap bg-white text-slate-500 border border-slate-200"
            >
              {CATEGORY_NAMES[cat]}
            </button>
          ))}
        </div>
      )}

      {/* Content Grid */}
      <div className="grid grid-cols-1 gap-4 px-4">
        {filteredContent.map((section) => {
          const isCompleted = completedIds.includes(section.id);
          return (
            <div 
              key={section.id}
              onClick={() => setSelectedContent(section.id)}
              className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 active:scale-95 transition-all cursor-pointer hover:shadow-md hover:border-brand-primary/30"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-sm ${CATEGORY_COLORS[section.category]}`}>
                {isCompleted ? <CheckCircle className="text-green-600" size={24} /> : section.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className={`font-bold text-slate-800 text-lg truncate ${isCompleted ? 'line-through opacity-50' : ''}`}>
                  {section.title}
                </h3>
                <p className="text-sm text-slate-400 truncate">{section.subtitle || CATEGORY_NAMES[section.category]}</p>
              </div>
              <ChevronRight size={20} className="text-slate-300" />
            </div>
          );
        })}
      </div>
    </div>
  );
};