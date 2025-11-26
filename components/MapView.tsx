import React, { useState } from 'react';
import { Info, Hexagon } from 'lucide-react';

export const MapView: React.FC = () => {
  // Simplified logic: The user wants to know value of a spot.
  // Instead of a full interactive game board which is too complex for this snippet,
  // We provide a "Placement Calculator" and a visual heatmap abstraction.

  const [adjacentOceans, setAdjacentOceans] = useState(0);
  const [adjacentCities, setAdjacentCities] = useState(0);
  const [adjacentGreeneries, setAdjacentGreeneries] = useState(0);
  const [placementBonus, setPlacementBonus] = useState<'none' | 'steel' | 'titanium' | 'plants' | 'cards'>('none');

  const calculateYield = () => {
    let mc = 0;
    // Ocean adjacency
    mc += adjacentOceans * 2;
    
    return {
      mcReturn: mc,
      vpPotential: adjacentCities, // If placing greenery
      vpForCity: adjacentGreeneries, // If placing city
    };
  };

  const yieldData = calculateYield();

  return (
    <div className="space-y-6 pb-20">
       <div className="bg-gradient-to-br from-orange-900 to-red-900 p-6 rounded-2xl border border-orange-500/30">
        <h2 className="text-2xl font-bold text-white mb-2">Tactical Map</h2>
        <p className="text-orange-200/80 text-sm">Hex yield calculator.</p>
      </div>

      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
        <h3 className="text-slate-300 font-bold mb-4 uppercase text-sm tracking-wider">Target Hex Adjacency</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-blue-400">Adjacent Oceans</span>
            <div className="flex items-center gap-3">
               <button onClick={() => setAdjacentOceans(Math.max(0, adjacentOceans - 1))} className="w-8 h-8 bg-slate-700 rounded text-white">-</button>
               <span className="w-4 text-center text-white">{adjacentOceans}</span>
               <button onClick={() => setAdjacentOceans(Math.min(6, adjacentOceans + 1))} className="w-8 h-8 bg-slate-700 rounded text-white">+</button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400">Adjacent Cities</span>
            <div className="flex items-center gap-3">
               <button onClick={() => setAdjacentCities(Math.max(0, adjacentCities - 1))} className="w-8 h-8 bg-slate-700 rounded text-white">-</button>
               <span className="w-4 text-center text-white">{adjacentCities}</span>
               <button onClick={() => setAdjacentCities(Math.min(6, adjacentCities + 1))} className="w-8 h-8 bg-slate-700 rounded text-white">+</button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-green-500">Adjacent Greenery</span>
            <div className="flex items-center gap-3">
               <button onClick={() => setAdjacentGreeneries(Math.max(0, adjacentGreeneries - 1))} className="w-8 h-8 bg-slate-700 rounded text-white">-</button>
               <span className="w-4 text-center text-white">{adjacentGreeneries}</span>
               <button onClick={() => setAdjacentGreeneries(Math.min(6, adjacentGreeneries + 1))} className="w-8 h-8 bg-slate-700 rounded text-white">+</button>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-700">
          <h3 className="text-slate-300 font-bold mb-2 uppercase text-sm">Placement Bonus</h3>
          <div className="flex gap-2 flex-wrap">
             {['none', 'steel', 'titanium', 'plants', 'cards'].map((b) => (
               <button
                 key={b}
                 onClick={() => setPlacementBonus(b as any)}
                 className={`px-3 py-1 text-xs rounded-full border capitalize ${
                   placementBonus === b 
                   ? 'bg-orange-600 border-orange-500 text-white' 
                   : 'bg-slate-800 border-slate-600 text-slate-400'
                 }`}
               >
                 {b}
               </button>
             ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-700 p-4 rounded-xl">
           <div className="text-xs text-slate-400 uppercase font-bold">Cashback (M€)</div>
           <div className="text-2xl text-yellow-400 font-bold">{yieldData.mcReturn} M€</div>
           <div className="text-xs text-slate-400">From Ocean Adjacency</div>
        </div>
        <div className="bg-slate-700 p-4 rounded-xl">
           <div className="text-xs text-slate-400 uppercase font-bold">If Placing Greenery</div>
           <div className="text-2xl text-green-400 font-bold">{yieldData.vpPotential} VP</div>
           <div className="text-xs text-slate-400">From adjacent cities</div>
        </div>
      </div>

       {/* Abstract Hex Grid Visualization */}
       <div className="flex justify-center py-6 opacity-50">
          <div className="grid grid-cols-3 gap-1">
             {[...Array(7)].map((_, i) => (
                <div key={i} className={`w-12 h-12 flex items-center justify-center clip-hex ${i === 4 ? 'bg-orange-600' : 'bg-slate-800'}`} style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'}}>
                    {i === 4 && <Hexagon size={16} className="text-white" />}
                </div>
             ))}
          </div>
       </div>
    </div>
  );
};