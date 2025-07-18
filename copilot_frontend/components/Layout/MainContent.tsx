'use client';

import React from 'react';
import { KanbanBoard } from '../Modules/KanbanBoard';
import { GanttChart } from '../Modules/GanttChart';
import { ReportsView } from '../Modules/ReportsView';

interface MainContentProps {
  activeTab: 'gantt' | 'kanban' | 'rapporten';
}

export const MainContent: React.FC<MainContentProps> = ({ activeTab }) => {
  const renderContent = () => {
    switch (activeTab) {
      case 'kanban':
        return <KanbanBoard />;
      case 'gantt':
        return <GanttChart />;
      case 'rapporten':
        return <ReportsView />;
      default:
        return <KanbanBoard />;
    }
  };

  return (
    <div className="flex-1 p-8">
      <div className="h-full bg-white/[0.08] backdrop-blur-3xl rounded-3xl border border-white/[0.12] shadow-2xl shadow-black/20 overflow-hidden">
        {renderContent()}
      </div>
    </div>
  );
};