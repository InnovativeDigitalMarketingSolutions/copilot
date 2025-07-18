'use client';

import React, { useState } from 'react';
import { KanbanBoard } from '../../components/Modules/KanbanBoard';
import { GanttChart } from '../../components/Modules/GanttChart';
import { ReportsView } from '../../components/Modules/ReportsView';

export default function ProjectManagement() {
  const [activeTab, setActiveTab] = useState<'kanban' | 'gantt' | 'reports'>('kanban');

  const tabs = [
    { id: 'kanban' as const, label: 'Kanban' },
    { id: 'gantt' as const, label: 'Gantt' },
    { id: 'reports' as const, label: 'Reports' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'kanban':
        return <KanbanBoard />;
      case 'gantt':
        return <GanttChart />;
      case 'reports':
        return <ReportsView />;
      default:
        return <KanbanBoard />;
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center space-x-4 p-6 bg-white/[0.05] backdrop-blur-3xl border-b border-white/[0.08]">
        <div className="flex items-center space-x-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
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
      </div>

      <div className="flex-1 p-8">
        <div className="h-full bg-white/[0.08] backdrop-blur-3xl rounded-3xl border border-white/[0.12] shadow-2xl shadow-black/20 overflow-hidden">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}