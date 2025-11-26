import React, { useState } from 'react';
import { getStrategicAdvice, analyzeCorporationSetup } from '../services/geminiService';
import { GameState } from '../types';
import { BrainCircuit, Loader2, Send } from 'lucide-react';

interface AnalysisViewProps {
  gameState: GameState;
}

export const AnalysisView: React.FC<AnalysisViewProps> = ({ gameState }) => {
  const [activeTab, setActiveTab] = useState<'setup' | 'general'>('setup');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);

  // Setup State
  const [corp1, setCorp1] = useState('');
  const [corp2, setCorp2] = useState('');
  const [cards, setCards] = useState('');

  // General State
  const [query, setQuery] = useState('');

  const handleSetupAnalysis = async () => {
    if (!corp1 || !corp2) return;
    setLoading(true);
    const result = await analyzeCorporationSetup(corp1, corp2, cards);
    setResponse(result);
    setLoading(false);
  };

  const handleGeneralAdvice = async () => {
    if (!query) return;
    setLoading(true);
    const result = await getStrategicAdvice(query, gameState);
    setResponse(result);
    setLoading(false);
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="bg-gradient-to-r from-indigo-900 to-slate-900 p-6 rounded-2xl border border-indigo-500/30">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <BrainCircuit className="text-indigo-400" />
          AI Command
        </h2>
        <p className="text-indigo-200/80 text-sm mt-1">Strategic oversight engine active.</p>
      </div>

      <div className="flex gap-2 p-1 bg-slate-800 rounded-lg">
        <button
          onClick={() => { setActiveTab('setup'); setResponse(null); }}
          className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
            activeTab === 'setup' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
          }`}
        >
          Pre-Game Setup
        </button>
        <button
          onClick={() => { setActiveTab('general'); setResponse(null); }}
          className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
            activeTab === 'general' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
          }`}
        >
          Tactical Query
        </button>
      </div>

      {activeTab === 'setup' ? (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1 uppercase">Corporation 1</label>
              <input
                type="text"
                value={corp1}
                onChange={(e) => setCorp1(e.target.value)}
                placeholder="e.g. PhoboLog"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1 uppercase">Corporation 2</label>
              <input
                type="text"
                value={corp2}
                onChange={(e) => setCorp2(e.target.value)}
                placeholder="e.g. EcoLine"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-1 uppercase">Project Cards (Names)</label>
            <textarea
              value={cards}
              onChange={(e) => setCards(e.target.value)}
              placeholder="List your 10 starting cards..."
              className="w-full h-32 bg-slate-800 border border-slate-700 rounded-lg p-3 text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
            />
          </div>
          <button
            onClick={handleSetupAnalysis}
            disabled={loading || !corp1 || !corp2}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 disabled:text-slate-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-900/50 flex items-center justify-center gap-2 transition-all"
          >
            {loading ? <Loader2 className="animate-spin" /> : <BrainCircuit />}
            Analyze Synergy
          </button>
        </div>
      ) : (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-1 uppercase">Ask for Strategy</label>
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. 'I have 8 plants but opponent has Asteroid. Should I green?' or 'Is Standard Project City worth it now?'"
              className="w-full h-32 bg-slate-800 border border-slate-700 rounded-lg p-3 text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
            />
          </div>
          <button
            onClick={handleGeneralAdvice}
            disabled={loading || !query}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 disabled:text-slate-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-900/50 flex items-center justify-center gap-2 transition-all"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Send />}
            Request Guidance
          </button>
        </div>
      )}

      {response && (
        <div className="bg-slate-800/80 p-6 rounded-xl border border-slate-700 shadow-xl backdrop-blur-sm animate-in zoom-in-95 duration-300">
           <h3 className="text-indigo-400 font-bold mb-4 uppercase tracking-widest text-xs border-b border-slate-700 pb-2">Analysis Result</h3>
           <div className="prose prose-invert prose-sm max-w-none">
             {response.split('\n').map((line, i) => (
               <p key={i} className="mb-2 text-slate-300 leading-relaxed">{line}</p>
             ))}
           </div>
        </div>
      )}
    </div>
  );
};