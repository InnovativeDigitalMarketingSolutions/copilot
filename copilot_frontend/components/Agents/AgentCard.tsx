'use client';

import React from 'react';
import { Agent } from './AgentPanel';
import { Clock, CheckCircle, Loader } from 'lucide-react';

interface AgentCardProps {
  agent: Agent;
  onClick: () => void;
}

export const AgentCard: React.FC<AgentCardProps> = ({ agent, onClick }) => {
  const getStatusColor = (status: Agent['status']) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'busy': return 'bg-yellow-500';
      case 'idle': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: Agent['status']) => {
    switch (status) {
      case 'active': return <CheckCircle size={16} />;
      case 'busy': return <Loader size={16} className="animate-spin" />;
      case 'idle': return <Clock size={16} />;
      default: return <Clock size={16} />;
    }
  };

  const formatLastActive = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (minutes < 1440) return `${Math.floor(minutes / 60)}h ago`;
    return `${Math.floor(minutes / 1440)}d ago`;
  };

  return (
    <div
      onClick={onClick}
      className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-4 hover:bg-white/20 hover:border-white/30 transition-all duration-200 cursor-pointer group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="text-2xl">{agent.avatar}</div>
          <div>
            <h3 className="text-white font-semibold">{agent.name}</h3>
            <p className="text-white/60 text-sm">{agent.role}</p>
          </div>
        </div>
        <div className={`w-3 h-3 rounded-full ${getStatusColor(agent.status)}`} />
      </div>

      {/* Description */}
      <p className="text-white/70 text-sm mb-4 line-clamp-2">{agent.description}</p>

      {/* Stats */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-blue-400 rounded-full" />
            <span className="text-white/60 text-sm">{agent.tasks} tasks</span>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-white/60">
          {getStatusIcon(agent.status)}
          <span className="text-sm">{formatLastActive(agent.lastActive)}</span>
        </div>
      </div>

      {/* Hover indicator */}
      <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent" />
      </div>
    </div>
  );
};