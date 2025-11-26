import React from 'react';
import { GameState, ResourceType } from '../types';
import { ResourceCounter } from './ResourceCounter';
import { RESOURCE_COLORS, RESOURCE_ICONS } from '../constants';
import { Thermometer, Droplets, Globe } from 'lucide-react';

interface DashboardProps {
  gameState: GameState;
  updateResource: (r: ResourceType, val: number) => void;
  updateProduction: (r: ResourceType, val: number) => void;
  updateGlobal: (p: 'temperature' | 'oxygen' | 'oceans', val: number) => void;
  updateTR: (val: number) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  gameState,
  updateResource,
  updateProduction,
  updateGlobal,
  updateTR
}) => {
  return (
    <div className="space-y-8 pb-24">
      
      {/* Global Parameters */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-slate-800 p-3 rounded-xl border border-slate-700 flex flex-col items-center justify-center text-center shadow-lg">
           <Thermometer className="text-red-500 mb-1" size={20} />
           <span className="text-xs text-slate-400 font-bold uppercase">Temp</span>
           <div className="flex items-center gap-1 mt-1">
             <button onClick={() => updateGlobal('temperature', gameState.globalParameters.temperature - 2)} className="text-slate-500">-</button>
             <span className="font-mono font-bold text-white text-lg">{gameState.globalParameters.temperature}°</span>
             <button onClick={() => updateGlobal('temperature', gameState.globalParameters.temperature + 2)} className="text-slate-500">+</button>
           </div>
        </div>
        <div className="bg-slate-800 p-3 rounded-xl border border-slate-700 flex flex-col items-center justify-center text-center shadow-lg">
           <Droplets className="text-blue-400 mb-1" size={20} />
           <span className="text-xs text-slate-400 font-bold uppercase">Oxygen</span>
           <div className="flex items-center gap-1 mt-1">
             <button onClick={() => updateGlobal('oxygen', gameState.globalParameters.oxygen - 1)} className="text-slate-500">-</button>
             <span className="font-mono font-bold text-white text-lg">{gameState.globalParameters.oxygen}%</span>
             <button onClick={() => updateGlobal('oxygen', gameState.globalParameters.oxygen + 1)} className="text-slate-500">+</button>
           </div>
        </div>
        <div className="bg-slate-800 p-3 rounded-xl border border-slate-700 flex flex-col items-center justify-center text-center shadow-lg">
           <Globe className="text-cyan-600 mb-1" size={20} />
           <span className="text-xs text-slate-400 font-bold uppercase">Ocean</span>
           <div className="flex items-center gap-1 mt-1">
             <button onClick={() => updateGlobal('oceans', gameState.globalParameters.oceans - 1)} className="text-slate-500">-</button>
             <span className="font-mono font-bold text-white text-lg">{gameState.globalParameters.oceans}/9</span>
             <button onClick={() => updateGlobal('oceans', gameState.globalParameters.oceans + 1)} className="text-slate-500">+</button>
           </div>
        </div>
      </div>

      {/* TR Tracker */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-800 rounded-xl p-4 flex items-center justify-between shadow-lg shadow-orange-900/50">
        <div>
           <div className="text-orange-200 text-xs font-bold uppercase tracking-widest">Terraform Rating</div>
           <div className="text-white text-3xl font-black font-mono">{gameState.tr}</div>
        </div>
        <div className="flex gap-2">
           <button onClick={() => updateTR(gameState.tr - 1)} className="w-10 h-10 bg-black/20 hover:bg-black/40 rounded-lg text-white font-bold text-xl">-</button>
           <button onClick={() => updateTR(gameState.tr + 1)} className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg text-white font-bold text-xl">+</button>
        </div>
      </div>

      {/* Resources & Production */}
      <div className="space-y-4">
        <h3 className="text-slate-400 font-bold uppercase text-sm tracking-wider pl-1">Resource / Production</h3>
        <div className="grid grid-cols-2 gap-4">
          {(Object.keys(gameState.resources) as ResourceType[]).map((res) => {
            const Icon = RESOURCE_ICONS[res];
            return (
              <div key={res} className="relative group">
                <ResourceCounter
                  label={res}
                  value={gameState.resources[res]}
                  onChange={(val) => updateResource(res, val)}
                  icon={<Icon size={14} />}
                  colorClass={RESOURCE_COLORS[res]}
                />
                {/* Production Mini Control */}
                <div className="absolute -top-3 right-2 bg-stone-900 border border-stone-600 rounded px-2 py-1 flex items-center gap-2 shadow-sm scale-90">
                  <span className="text-[10px] text-stone-400 font-bold uppercase">Prod</span>
                  <button 
                    onClick={() => updateProduction(res, gameState.production[res] - 1)}
                    className="text-stone-400 hover:text-white text-xs font-bold w-4 text-center"
                  >-</button>
                  <span className={`text-xs font-mono font-bold ${gameState.production[res] > 0 ? 'text-green-400' : 'text-stone-300'}`}>
                    {gameState.production[res]}
                  </span>
                  <button 
                    onClick={() => updateProduction(res, gameState.production[res] + 1)}
                    className="text-stone-400 hover:text-white text-xs font-bold w-4 text-center"
                  >+</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};