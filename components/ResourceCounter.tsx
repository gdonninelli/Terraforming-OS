import React from 'react';
import { Plus, Minus } from 'lucide-react';

interface ResourceCounterProps {
  label: string;
  value: number;
  onChange: (val: number) => void;
  icon?: React.ReactNode;
  colorClass?: string;
  step?: number;
}

export const ResourceCounter: React.FC<ResourceCounterProps> = ({
  label,
  value,
  onChange,
  icon,
  colorClass = 'text-white',
  step = 1
}) => {
  return (
    <div className="flex flex-col bg-slate-800 p-3 rounded-xl border border-slate-700 shadow-md">
      <div className={`flex items-center gap-2 mb-2 font-bold uppercase text-xs tracking-wider ${colorClass}`}>
        {icon}
        <span>{label}</span>
      </div>
      <div className="flex items-center justify-between">
        <button
          onClick={() => onChange(value - step)}
          className="w-8 h-8 flex items-center justify-center bg-slate-700 rounded-lg hover:bg-slate-600 active:bg-slate-500 transition-colors text-slate-300"
        >
          <Minus size={16} />
        </button>
        <span className="text-xl font-mono font-bold text-white">{value}</span>
        <button
          onClick={() => onChange(value + step)}
          className="w-8 h-8 flex items-center justify-center bg-slate-700 rounded-lg hover:bg-slate-600 active:bg-slate-500 transition-colors text-slate-300"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
};