'use client';

import React from 'react';

interface OverviewSidebarProps {
  activeModule: string;
  onModuleChange: (module: string) => void;
}

export const OverviewSidebar: React.FC<OverviewSidebarProps> = ({ 
  activeModule, 
  onModuleChange 
}) => {
  const menuItems = [
    { id: 'taakbeheer', label: 'Taakbeheer' },
    { id: 'productiviteit', label: 'Productiviteit' },
    { id: 'rapportages', label: 'Rapportages & Analytics' },
    { id: 'instellingen', label: 'Instellingen & Gebruikersbeheer' },
  ];

  return (
    <div className="w-64 bg-white/[0.08] backdrop-blur-3xl border-r border-white/[0.12] shadow-2xl shadow-black/20">
      {/* Header */}
      <div className="p-6 border-b border-white/[0.12]">
        <h2 className="text-white font-bold text-lg tracking-tight">Overzicht</h2>
      </div>

      {/* Menu items */}
      <div className="p-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onModuleChange(item.id)}
            className={`
              w-full text-left px-4 py-3 rounded-2xl transition-all duration-300 ease-out font-medium
              ${activeModule === item.id 
                ? 'bg-white/15 backdrop-blur-xl text-white shadow-lg shadow-white/10' 
                : 'text-white/70 hover:text-white hover:bg-white/[0.08] hover:backdrop-blur-xl'
              }
            `}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};