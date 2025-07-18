import React from 'react';
import { Plus } from 'lucide-react';

interface TabNavigationProps {
  activeTab: 'gantt' | 'kanban' | 'rapporten';
  onTabChange: (tab: 'gantt' | 'kanban' | 'rapporten') => void;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({ 
  activeTab, 
  onTabChange 
}) => {
  const tabs = [
    { id: 'gantt' as const, label: 'Gantt' },
    { id: 'kanban' as const, label: 'Kanban' },
    { id: 'rapporten' as const, label: 'Rapporten' },
  ];

  return (
    <div className="flex items-center space-x-4 p-6 bg-white/[0.05] backdrop-blur-3xl border-b border-white/[0.08]">
      {/* Tabs */}
      <div className="flex items-center space-x-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ease-out
              ${activeTab === tab.id 
                ? 'bg-white/20 backdrop-blur-xl text-white shadow-2xl shadow-white/20 scale-105' 
                : 'text-white/70 hover:text-white hover:bg-white/[0.12] hover:backdrop-blur-xl hover:shadow-lg hover:shadow-white/10 hover:scale-105'
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Add new tab button */}
      <button className="w-12 h-12 rounded-2xl bg-white/[0.08] backdrop-blur-xl flex items-center justify-center text-white/60 hover:text-white hover:bg-white/[0.15] hover:shadow-lg hover:shadow-white/10 hover:scale-105 transition-all duration-300 ease-out">
        <Plus size={20} />
      </button>
    </div>
  );
};