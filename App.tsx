import React, { useState } from 'react';
import { GameState, View, ResourceType } from './types';
import { INITIAL_GAME_STATE } from './constants';
import { Dashboard } from './components/Dashboard';
import { AnalysisView } from './components/AnalysisView';
import { EconomyView } from './components/EconomyView';
import { MapView } from './components/MapView';
import { MilestoneView } from './components/MilestoneView';
import { LayoutDashboard, Brain, TrendingUp, Map as MapIcon, Trophy } from 'lucide-react';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(INITIAL_GAME_STATE);
  const [currentView, setCurrentView] = useState<View>('dashboard');

  const updateResource = (resource: ResourceType, value: number) => {
    setGameState(prev => ({
      ...prev,
      resources: { ...prev.resources, [resource]: value }
    }));
  };

  const updateProduction = (resource: ResourceType, value: number) => {
    setGameState(prev => ({
      ...prev,
      production: { ...prev.production, [resource]: value }
    }));
  };

  const updateGlobal = (param: 'temperature' | 'oxygen' | 'oceans', value: number) => {
    let newVal = value;
    // Bounds checking
    if (param === 'temperature') { if (newVal < -30) newVal = -30; if (newVal > 8) newVal = 8; }
    if (param === 'oxygen') { if (newVal < 0) newVal = 0; if (newVal > 14) newVal = 14; }
    if (param === 'oceans') { if (newVal < 0) newVal = 0; if (newVal > 9) newVal = 9; }

    setGameState(prev => ({
      ...prev,
      globalParameters: { ...prev.globalParameters, [param]: newVal }
    }));
  };

  const updateTR = (value: number) => {
    setGameState(prev => ({ ...prev, tr: Math.max(0, value) }));
  };
  
  const toggleMilestone = (key: keyof GameState['milestones']) => {
    setGameState(prev => ({
        ...prev,
        milestones: { ...prev.milestones, [key]: !prev.milestones[key] }
    }));
  };

  const renderView = () => {
    switch(currentView) {
      case 'dashboard': return (
        <Dashboard 
            gameState={gameState} 
            updateResource={updateResource} 
            updateProduction={updateProduction} 
            updateGlobal={updateGlobal}
            updateTR={updateTR}
        />
      );
      case 'ai-analysis': return <AnalysisView gameState={gameState} />;
      case 'economy': return <EconomyView gameState={gameState} />;
      case 'map': return <MapView />;
      case 'milestones': return <MilestoneView gameState={gameState} onToggleMilestone={toggleMilestone} />;
      default: return <Dashboard gameState={gameState} updateResource={updateResource} updateProduction={updateProduction} updateGlobal={updateGlobal} updateTR={updateTR} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Mobile Header */}
      <header className="fixed top-0 left-0 right-0 bg-slate-900/90 backdrop-blur-md border-b border-slate-700 z-50 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center font-bold text-white shadow-lg shadow-orange-900/50">
             TM
           </div>
           <h1 className="font-bold text-lg tracking-tight text-white">TerraForm <span className="text-orange-500">OS</span></h1>
        </div>
        <div className="text-xs font-mono text-slate-400 bg-slate-800 px-2 py-1 rounded">
           GEN {gameState.generation}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="pt-20 px-4 max-w-md mx-auto min-h-screen">
        {renderView()}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 pb-safe pt-2 px-2 z-50">
        <div className="flex justify-around items-end max-w-md mx-auto">
          <NavButton 
            active={currentView === 'dashboard'} 
            onClick={() => setCurrentView('dashboard')} 
            icon={<LayoutDashboard size={20} />} 
            label="Dash" 
          />
          <NavButton 
            active={currentView === 'economy'} 
            onClick={() => setCurrentView('economy')} 
            icon={<TrendingUp size={20} />} 
            label="Econ" 
          />
          <NavButton 
            active={currentView === 'ai-analysis'} 
            onClick={() => setCurrentView('ai-analysis')} 
            icon={<Brain size={24} />} 
            label="AI" 
            isMain
          />
          <NavButton 
            active={currentView === 'map'} 
            onClick={() => setCurrentView('map')} 
            icon={<MapIcon size={20} />} 
            label="Map" 
          />
          <NavButton 
            active={currentView === 'milestones'} 
            onClick={() => setCurrentView('milestones')} 
            icon={<Trophy size={20} />} 
            label="Awards" 
          />
        </div>
      </nav>
    </div>
  );
};

interface NavButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  isMain?: boolean;
}

const NavButton: React.FC<NavButtonProps> = ({ active, onClick, icon, label, isMain }) => {
  if (isMain) {
    return (
      <button 
        onClick={onClick}
        className={`relative -top-5 flex flex-col items-center justify-center w-14 h-14 rounded-full shadow-lg transition-all ${
          active 
          ? 'bg-indigo-500 text-white shadow-indigo-500/50 scale-110' 
          : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
        }`}
      >
        {icon}
      </button>
    );
  }

  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-2 w-16 transition-colors ${
        active ? 'text-orange-500' : 'text-slate-500 hover:text-slate-300'
      }`}
    >
      <div className="mb-1">{icon}</div>
      <span className="text-[10px] font-medium">{label}</span>
    </button>
  );
};

export default App;