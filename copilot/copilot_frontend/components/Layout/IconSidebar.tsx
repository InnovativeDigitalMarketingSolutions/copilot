'use client';

import React from 'react';
import { 
  User, 
  Calendar, 
  Target, 
  Clock, 
  BarChart3, 
  Wrench, 
  Plus, 
  Settings 
} from 'lucide-react';

interface IconSidebarProps {
  activeModule: string;
  onModuleChange: (module: string) => void;
}

export const IconSidebar: React.FC<IconSidebarProps> = ({ 
  activeModule, 
  onModuleChange 
}) => {
  const modules = [
    { id: 'gebruikersbeheer', icon: User, label: 'Gebruikersbeheer' },
    { id: 'agenda', icon: Calendar, label: 'Agenda' },
    { id: 'focus', icon: Target, label: 'Focus' },
    { id: 'tijdregistratie', icon: Clock, label: 'Tijdregistratie' },
    { id: 'rapportages', icon: BarChart3, label: 'Rapportages' },
    { id: 'tools', icon: Wrench, label: 'Tools' },
    { id: 'nieuw', icon: Plus, label: 'Nieuw' },
  ];

  return (
    <div className="w-20 bg-white/[0.08] backdrop-blur-3xl border-r border-white/[0.12] flex flex-col items-center py-8 shadow-2xl shadow-black/20">
      {/* Navigation icons */}
      <div className="space-y-6 flex-1">
        {modules.map((module) => (
          <button
            key={module.id}
            onClick={() => onModuleChange(module.id)}
            className={`
              w-14 h-14 rounded-3xl flex items-center justify-center transition-all duration-300 ease-out
              ${activeModule === module.id 
                ? 'bg-white/20 backdrop-blur-xl text-white shadow-2xl shadow-white/20 scale-105' 
                : 'text-white/60 hover:text-white hover:bg-white/[0.12] hover:backdrop-blur-xl hover:shadow-lg hover:shadow-white/10 hover:scale-105'
              }
            `}
            title={module.label}
          >
            <module.icon size={22} />
          </button>
        ))}
      </div>

      {/* Settings at bottom */}
      <button
        className="w-14 h-14 rounded-3xl flex items-center justify-center text-white/60 hover:text-white hover:bg-white/[0.12] hover:backdrop-blur-xl hover:shadow-lg hover:shadow-white/10 hover:scale-105 transition-all duration-300 ease-out"
        title="Instellingen"
      >
        <Settings size={22} />
      </button>
    </div>
  );
};