import React from 'react';
import { GameState } from '../types';
import { MILESTONE_REQUIREMENTS } from '../constants';
import { Trophy, AlertTriangle } from 'lucide-react';

interface MilestoneViewProps {
  gameState: GameState;
  onToggleMilestone: (key: keyof GameState['milestones']) => void;
}

export const MilestoneView: React.FC<MilestoneViewProps> = ({ gameState, onToggleMilestone }) => {
  
  const getProgress = (key: string) => {
    switch(key) {
      case 'terraformer': return Math.min(100, (gameState.tr / 35) * 100);
      case 'mayor': return 0; // Requires tile tracking not in simplified state
      default: return 0;
    }
  };

  const getLabel = (key: string) => {
    switch(key) {
      case 'terraformer': return `${gameState.tr} / 35 TR`;
      default: return 'Manual Track';
    }
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="bg-gradient-to-r from-yellow-700 to-yellow-900 p-6 rounded-2xl border border-yellow-500/30">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Trophy className="text-yellow-400" />
          Milestones & Awards
        </h2>
        <p className="text-yellow-200/80 text-sm mt-1">Race monitor. 8 M€ for 5 VP.</p>
      </div>

      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <div className="p-4 bg-slate-900 border-b border-slate-700 flex justify-between items-center">
           <h3 className="font-bold text-slate-200">Milestones (Max 3)</h3>
           <span className="text-xs bg-slate-700 px-2 py-1 rounded text-slate-400">Click to Claim</span>
        </div>
        <div className="divide-y divide-slate-700">
          {(Object.keys(MILESTONE_REQUIREMENTS) as Array<keyof typeof MILESTONE_REQUIREMENTS>).map((key) => {
            const m = MILESTONE_REQUIREMENTS[key];
            const isClaimed = gameState.milestones[key];
            const progress = getProgress(key);
            
            return (
              <div key={key} 
                onClick={() => onToggleMilestone(key)}
                className={`p-4 transition-colors cursor-pointer ${isClaimed ? 'bg-yellow-900/20' : 'hover:bg-slate-700/50'}`}
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full border ${isClaimed ? 'bg-yellow-500 border-yellow-500' : 'border-slate-500'}`}></div>
                    <span className={`font-bold capitalize ${isClaimed ? 'text-yellow-400' : 'text-slate-300'}`}>{key}</span>
                  </div>
                  <span className="text-xs text-slate-400">{m.description}</span>
                </div>
                
                {key === 'terraformer' && !isClaimed && (
                  <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
                  </div>
                )}
                {key === 'terraformer' && !isClaimed && (
                   <div className="text-right text-xs text-blue-400 mt-1">{getLabel(key)}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-red-900/20 border border-red-500/30 p-4 rounded-xl flex items-start gap-3">
        <AlertTriangle className="text-red-500 shrink-0" size={24} />
        <div>
          <h4 className="font-bold text-red-200 text-sm mb-1">Gardener Alert</h4>
          <p className="text-xs text-red-200/70">
            If you have 8+ plants, convert them to Greenery immediately before an opponent plays an Asteroid card!
          </p>
        </div>
      </div>
    </div>
  );
};