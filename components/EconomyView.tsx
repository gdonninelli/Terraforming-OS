import React from 'react';
import { GameState, ResourceType } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { RESOURCE_COLORS, RESOURCE_ICONS } from '../constants';

interface EconomyViewProps {
  gameState: GameState;
}

export const EconomyView: React.FC<EconomyViewProps> = ({ gameState }) => {
  const nextGenResources = {
    [ResourceType.MegaCredits]: 
      Math.max(gameState.resources[ResourceType.MegaCredits] + gameState.production[ResourceType.MegaCredits] + gameState.tr, 0),
    [ResourceType.Steel]: gameState.resources[ResourceType.Steel] + gameState.production[ResourceType.Steel],
    [ResourceType.Titanium]: gameState.resources[ResourceType.Titanium] + gameState.production[ResourceType.Titanium],
    [ResourceType.Plants]: gameState.resources[ResourceType.Plants] + gameState.production[ResourceType.Plants],
    [ResourceType.Energy]: gameState.production[ResourceType.Energy], // Energy becomes heat, new energy is prod
    [ResourceType.Heat]: gameState.resources[ResourceType.Heat] + gameState.resources[ResourceType.Energy] + gameState.production[ResourceType.Heat],
  };

  const data = [
    { name: 'M€', value: nextGenResources[ResourceType.MegaCredits], color: '#facc15' },
    { name: 'Steel', value: nextGenResources[ResourceType.Steel], color: '#b45309' },
    { name: 'Ti', value: nextGenResources[ResourceType.Titanium], color: '#94a3b8' },
    { name: 'Plant', value: nextGenResources[ResourceType.Plants], color: '#22c55e' },
    { name: 'Heat', value: nextGenResources[ResourceType.Heat], color: '#ef4444' },
  ];

  return (
    <div className="space-y-6 pb-20">
      <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
        <h2 className="text-xl font-bold text-white mb-4">Generation {gameState.generation + 1} Projection</h2>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
              <XAxis dataKey="name" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px', color: '#f1f5f9' }}
                itemStyle={{ color: '#f1f5f9' }}
                cursor={{ fill: '#334155', opacity: 0.4 }}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
           <h3 className="text-slate-400 text-xs font-bold uppercase mb-2">Total M€ Value</h3>
           <div className="text-2xl font-mono text-white">
             {nextGenResources[ResourceType.MegaCredits] + (nextGenResources[ResourceType.Steel] * 2) + (nextGenResources[ResourceType.Titanium] * 3)}
           </div>
           <p className="text-xs text-slate-500 mt-1">Includes Steel (2x) & Titanium (3x)</p>
        </div>
        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
           <h3 className="text-slate-400 text-xs font-bold uppercase mb-2">Heat Conversion</h3>
           <div className="flex items-center justify-between">
              <span className="text-purple-400 text-lg">{gameState.resources[ResourceType.Energy]} En</span>
              <span className="text-slate-500">→</span>
              <span className="text-red-500 text-lg">{gameState.resources[ResourceType.Energy]} Heat</span>
           </div>
           <p className="text-xs text-slate-500 mt-1">Happens start of Production</p>
        </div>
      </div>

      <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
        <h3 className="text-slate-300 font-bold mb-3 text-sm uppercase">Standard Project Reference</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between items-center text-slate-400">
            <span>Sell Patents</span>
            <span className="text-yellow-400 font-mono">Gain M€</span>
          </div>
          <div className="flex justify-between items-center text-slate-400">
            <span>Power Plant</span>
            <span className="text-yellow-400 font-mono">11 M€</span>
          </div>
          <div className="flex justify-between items-center text-slate-400">
            <span>Asteroid (Temp)</span>
            <span className="text-yellow-400 font-mono">14 M€</span>
          </div>
          <div className="flex justify-between items-center text-slate-400">
            <span>Aquifer (Ocean)</span>
            <span className="text-yellow-400 font-mono">18 M€</span>
          </div>
          <div className="flex justify-between items-center text-slate-400">
            <span>Greenery</span>
            <span className="text-yellow-400 font-mono">23 M€</span>
          </div>
          <div className="flex justify-between items-center text-slate-400">
            <span>City</span>
            <span className="text-yellow-400 font-mono">25 M€</span>
          </div>
        </div>
      </div>
    </div>
  );
};