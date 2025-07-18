'use client';

import React from 'react';
import { Calendar, Filter, Download } from 'lucide-react';

export const GanttChart: React.FC = () => {
  return (
    <div className="h-full p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Gantt Chart</h1>
          <p className="text-white/60">Projectplanning en tijdlijn overzicht</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="bg-white/[0.08] backdrop-blur-xl text-white px-4 py-3 rounded-2xl flex items-center space-x-2 hover:bg-white/[0.12] hover:shadow-lg hover:shadow-white/10 transition-all duration-300 ease-out">
            <Filter size={20} />
            <span>Filter</span>
          </button>
          <button className="bg-white/[0.08] backdrop-blur-xl text-white px-4 py-3 rounded-2xl flex items-center space-x-2 hover:bg-white/[0.12] hover:shadow-lg hover:shadow-white/10 transition-all duration-300 ease-out">
            <Download size={20} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Gantt placeholder */}
      <div className="bg-white/[0.05] backdrop-blur-xl rounded-2xl border border-white/[0.08] h-full flex items-center justify-center">
        <div className="text-center">
          <Calendar size={64} className="text-white/40 mx-auto mb-4" />
          <h3 className="text-white font-semibold text-xl mb-2">Gantt Chart Module</h3>
          <p className="text-white/60 max-w-md">
            Hier komt de interactieve Gantt chart voor projectplanning en tijdlijn beheer. 
            Integratie met backend API volgt in de volgende fase.
          </p>
        </div>
      </div>
    </div>
  );
};