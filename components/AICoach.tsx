import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { sendMessageToCoach } from '../services/geminiService';
import { Bot, Send, User } from 'lucide-react';

export const AICoach: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', role: 'model', text: 'Olá! Sou seu Coach Anthony. Tenho acesso a todo o conteúdo do guia. Quer ajuda para montar uma dieta, entender um exercício ou precisa de motivação hoje?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const responseText = await sendMessageToCoach(messages, input);
    
    const aiMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: 'model', text: responseText };
    setMessages(prev => [...prev, aiMsg]);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] animate-slide-up">
       <header className="mb-4 px-4">
        <h2 className="text-2xl font-bold text-slate-800">
          IA Coach
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          Tire dúvidas sobre treinos, dieta e mentalidade.
        </p>
      </header>

      <div className="flex-1 overflow-y-auto no-scrollbar space-y-4 px-4 pb-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            <div className={`
              w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm
              ${msg.role === 'user' ? 'bg-brand-primary text-white' : 'bg-brand-secondary text-white'}
            `}>
              {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
            </div>
            <div className={`
              max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm
              ${msg.role === 'user' 
                ? 'bg-brand-primary text-white rounded-tr-none' 
                : 'bg-white text-slate-700 rounded-tl-none border border-slate-100'}
            `}>
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex items-start gap-3">
             <div className="w-8 h-8 rounded-full bg-brand-secondary text-white flex items-center justify-center shrink-0 animate-pulse">
                <Bot size={16} />
             </div>
             <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm">
               <div className="flex gap-1">
                 <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                 <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100"></span>
                 <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200"></span>
               </div>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="relative px-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Pergunte ao seu coach..."
          className="w-full bg-white border border-slate-200 text-slate-800 rounded-full py-4 pl-6 pr-14 shadow-lg focus:border-brand-primary focus:outline-none transition-all"
        />
        <button
          onClick={handleSend}
          disabled={loading || !input.trim()}
          className="absolute right-6 top-2 p-2 bg-brand-primary rounded-full text-white shadow-md hover:bg-brand-primary/90 active:scale-95 disabled:opacity-50 disabled:scale-100 transition-all"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};