'use client';

import React, { useState } from 'react';
import { Play, Pause, Settings, MoreVertical, Zap, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { Agent } from '../../app/types/AgentType';

export const AgentOverview: React.FC = () => {
  const [agents] = useState<Agent[]>([
    {
      id: '1',
      name: 'Content Creator',
      type: 'Marketing',
      status: 'active',
      avatar: '✍️',
      description: 'Creates blog posts, social media content, and marketing materials',
      tasksCompleted: 47,
      uptime: '2d 14h',
      lastActivity: new Date(),
      autonomyLevel: 'high',
      capabilities: ['Content Writing', 'SEO Optimization', 'Social Media']
    },
    {
      id: '2',
      name: 'Data Analyst',
      type: 'Analytics',
      status: 'active',
      avatar: '📊',
      description: 'Analyzes business data and generates insights',
      tasksCompleted: 23,
      uptime: '1d 8h',
      lastActivity: new Date(Date.now() - 300000),
      autonomyLevel: 'medium',
      capabilities: ['Data Analysis', 'Report Generation', 'Visualization']
    },
    {
      id: '3',
      name: 'Customer Support',
      type: 'Support',
      status: 'idle',
      avatar: '🎧',
      description: 'Handles customer inquiries and support tickets',
      tasksCompleted: 156,
      uptime: '5d 2h',
      lastActivity: new Date(Date.now() - 1800000),
      autonomyLevel: 'low',
      capabilities: ['Customer Service', 'Ticket Management', 'FAQ']
    },
    {
      id: '4',
      name: 'Project Manager',
      type: 'Management',
      status: 'error',
      avatar: '🎯',
      description: 'Manages projects, tasks, and team coordination',
      tasksCompleted: 89,
      uptime: '3d 16h',
      lastActivity: new Date(Date.now() - 600000),
      autonomyLevel: 'high',
      capabilities: ['Project Planning', 'Task Management', 'Team Coordination']
    }
  ]);

  const getStatusIcon = (status: Agent['status']) => {
    switch (status) {
      case 'active': return <Zap size={16} className="text-green-400" />;
      case 'idle': return <Clock size={16} className="text-yellow-400" />;
      case 'error': return <AlertTriangle size={16} className="text-red-400" />;
      case 'paused': return <Pause size={16} className="text-gray-400" />;
    }
  };

  const getStatusColor = (status: Agent['status']) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'idle': return 'bg-yellow-500';
      case 'error': return 'bg-red-500';
      case 'paused': return 'bg-gray-500';
    }
  };

  const getAutonomyColor = (level: Agent['autonomyLevel']) => {
    switch (level) {
      case 'high': return 'bg-green-500/20 text-green-300';
      case 'medium': return 'bg-yellow-500/20 text-yellow-300';
      case 'low': return 'bg-blue-500/20 text-blue-300';
    }
  };

  return (
    <div className="bg-white/[0.08] backdrop-blur-3xl rounded-3xl border border-white/[0.12] shadow-2xl shadow-black/20 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">AI Agents</h2>
        <button className="bg-blue-500/90 backdrop-blur-xl text-white px-4 py-2 rounded-2xl hover:bg-blue-600/90 transition-all duration-200 text-sm font-medium">
          Add Agent
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {agents.map((agent) => (
          <div
            key={agent.id}
            className="bg-white/[0.05] backdrop-blur-2xl rounded-2xl border border-white/[0.08] p-4 hover:bg-white/[0.08] hover:border-white/[0.15] transition-all duration-300"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{agent.avatar}</div>
                <div>
                  <h3 className="text-white font-semibold">{agent.name}</h3>
                  <p className="text-white/60 text-sm">{agent.type}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${getStatusColor(agent.status)}`} />
                <button className="text-white/60 hover:text-white">
                  <MoreVertical size={16} />
                </button>
              </div>
            </div>

            {/* Description */}
            <p className="text-white/70 text-sm mb-4 line-clamp-2">{agent.description}</p>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-white text-lg font-bold">{agent.tasksCompleted}</div>
                <div className="text-white/60 text-xs">Tasks Completed</div>
              </div>
              <div>
                <div className="text-white text-lg font-bold">{agent.uptime}</div>
                <div className="text-white/60 text-xs">Uptime</div>
              </div>
            </div>

            {/* Status and Autonomy */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                {getStatusIcon(agent.status)}
                <span className="text-white/70 text-sm capitalize">{agent.status}</span>
              </div>
              <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getAutonomyColor(agent.autonomyLevel)}`}>
                {agent.autonomyLevel} autonomy
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              <button className="flex-1 bg-white/[0.08] backdrop-blur-xl text-white py-2 rounded-xl hover:bg-white/[0.12] transition-all duration-200 text-sm font-medium flex items-center justify-center space-x-2">
                {agent.status === 'active' ? <Pause size={14} /> : <Play size={14} />}
                <span>{agent.status === 'active' ? 'Pause' : 'Start'}</span>
              </button>
              <button className="w-10 h-10 bg-white/[0.08] backdrop-blur-xl text-white rounded-xl hover:bg-white/[0.12] transition-all duration-200 flex items-center justify-center">
                <Settings size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};