import React from 'react';
import { AlertCircle, AlertTriangle, Info } from 'lucide-react';

const priorities = [
  { 
    id: 'Faible', 
    label: 'Faible', 
    icon: Info,
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10',
    border: 'border-emerald-500/30',
    activeBg: 'bg-emerald-500/20',
    activeBorder: 'border-emerald-400'
  },
  { 
    id: 'Moyen', 
    label: 'Moyen', 
    icon: AlertTriangle,
    color: 'text-amber-400',
    bg: 'bg-amber-400/10',
    border: 'border-amber-500/30',
    activeBg: 'bg-amber-500/20',
    activeBorder: 'border-amber-400'
  },
  { 
    id: 'Critique', 
    label: 'Critique', 
    icon: AlertCircle,
    color: 'text-rose-400',
    bg: 'bg-rose-400/10',
    border: 'border-rose-500/30',
    activeBg: 'bg-rose-500/20',
    activeBorder: 'border-rose-400'
  }
];

export default function PrioritySelector({ selected, onChange }) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-300">Niveau de priorité</label>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {priorities.map((priority) => {
          const Icon = priority.icon;
          const isActive = selected === priority.id;
          
          return (
            <button
              key={priority.id}
              type="button"
              onClick={() => onChange(priority.id)}
              className={`flex items-center justify-center gap-2 p-3 rounded-xl border transition-all duration-200 
                ${isActive 
                  ? `${priority.activeBg} ${priority.activeBorder} ${priority.color} shadow-[0_0_15px_rgba(0,0,0,0.1)] shadow-${priority.color.split('-')[1]}/20` 
                  : `${priority.bg} ${priority.border} text-gray-400 hover:text-gray-200 hover:border-gray-500`
                }`}
            >
              <Icon size={18} className={isActive ? priority.color : 'text-gray-400'} />
              <span className="font-medium">{priority.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
