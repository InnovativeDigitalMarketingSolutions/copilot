'use client';

import React from 'react';
import { Plus, MoreHorizontal } from 'lucide-react';

export const KanbanBoard: React.FC = () => {
  const columns = [
    { id: 'todo', title: 'Te Doen', color: 'bg-blue-500/20 border-blue-500/30' },
    { id: 'inprogress', title: 'In Uitvoering', color: 'bg-yellow-500/20 border-yellow-500/30' },
    { id: 'review', title: 'Review', color: 'bg-purple-500/20 border-purple-500/30' },
    { id: 'done', title: 'Voltooid', color: 'bg-green-500/20 border-green-500/30' },
  ];

  const tasks = [
    { id: 1, title: 'Website redesign', description: 'Nieuwe homepage ontwerpen', column: 'todo', priority: 'high' },
    { id: 2, title: 'API integratie', description: 'Backend koppeling implementeren', column: 'inprogress', priority: 'medium' },
    { id: 3, title: 'Testing fase', description: 'Uitgebreide tests uitvoeren', column: 'review', priority: 'low' },
    { id: 4, title: 'Deployment', description: 'Live omgeving configureren', column: 'done', priority: 'high' },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-300';
      case 'medium': return 'bg-yellow-500/20 text-yellow-300';
      case 'low': return 'bg-green-500/20 text-green-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  return (
    <div className="h-full p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Kanban Board</h1>
          <p className="text-white/60">Beheer je taken en projecten visueel</p>
        </div>
        <button className="bg-blue-500/90 backdrop-blur-xl text-white px-6 py-3 rounded-2xl flex items-center space-x-2 hover:bg-blue-600/90 hover:shadow-2xl hover:shadow-blue-500/30 hover:scale-105 transition-all duration-300 ease-out">
          <Plus size={20} />
          <span>Nieuwe Taak</span>
        </button>
      </div>

      {/* Kanban columns */}
      <div className="grid grid-cols-4 gap-6 h-full">
        {columns.map((column) => (
          <div key={column.id} className="flex flex-col">
            {/* Column header */}
            <div className={`${column.color} backdrop-blur-xl rounded-2xl p-4 mb-4 border`}>
              <div className="flex items-center justify-between">
                <h3 className="text-white font-semibold">{column.title}</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-white/60 text-sm">
                    {tasks.filter(task => task.column === column.id).length}
                  </span>
                  <button className="text-white/60 hover:text-white">
                    <MoreHorizontal size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Tasks */}
            <div className="space-y-4 flex-1">
              {tasks
                .filter(task => task.column === column.id)
                .map((task) => (
                  <div
                    key={task.id}
                    className="bg-white/[0.08] backdrop-blur-xl rounded-2xl p-4 border border-white/[0.12] hover:bg-white/[0.12] hover:shadow-lg hover:shadow-white/10 transition-all duration-300 ease-out cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-white font-semibold">{task.title}</h4>
                      <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                    </div>
                    <p className="text-white/70 text-sm">{task.description}</p>
                  </div>
                ))}
              
              {/* Add task button */}
              <button className="w-full bg-white/[0.05] backdrop-blur-xl rounded-2xl p-4 border border-white/[0.08] border-dashed text-white/60 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.15] transition-all duration-300 ease-out flex items-center justify-center space-x-2">
                <Plus size={16} />
                <span>Taak Toevoegen</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};