'use client';

import React, { useState } from 'react';
import { AgentCard } from './AgentCard';
import { AgentChat } from './AgentChat';
import { Plus, Search } from 'lucide-react';

export interface Agent {
  id: string;
  name: string;
  role: string;
  status: 'active' | 'idle' | 'busy';
  avatar: string;
  description: string;
  tasks: number;
  lastActive: Date;
}

export const AgentPanel: React.FC = () => {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const agents: Agent[] = [
    {
      id: '1',
      name: 'Project Manager',
      role: 'Project Management',
      status: 'active',
      avatar: '🎯',
      description: 'Specialized in project planning, task management, and team coordination',
      tasks: 5,
      lastActive: new Date()
    },
    {
      id: '2',
      name: 'Marketing Specialist',
      role: 'Marketing & Growth',
      status: 'busy',
      avatar: '📈',
      description: 'Expert in marketing campaigns, social media, and growth strategies',
      tasks: 3,
      lastActive: new Date(Date.now() - 300000)
    },
    {
      id: '3',
      name: 'Data Analyst',
      role: 'Analytics & Insights',
      status: 'idle',
      avatar: '📊',
      description: 'Provides data analysis, reports, and business intelligence insights',
      tasks: 1,
      lastActive: new Date(Date.now() - 600000)
    },
    {
      id: '4',
      name: 'Content Creator',
      role: 'Content & Communications',
      status: 'active',
      avatar: '✍️',
      description: 'Creates engaging content, manages communications, and brand messaging',
      tasks: 7,
      lastActive: new Date(Date.now() - 120000)
    }
  ];

  const filteredAgents = agents.filter(agent =>
    agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (selectedAgent) {
    const agent = agents.find(a => a.id === selectedAgent);
    if (agent) {
      return <AgentChat agent={agent} onBack={() => setSelectedAgent(null)} />;
    }
  }

  return (
    <div className="h-full flex flex-col p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">AI Agents</h1>
          <p className="text-white/60 mt-1">Manage and interact with your AI workforce</p>
        </div>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl flex items-center space-x-2 transition-colors">
          <Plus size={20} />
          <span>Add Agent</span>
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" />
        <input
          type="text"
          placeholder="Search agents..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl pl-10 pr-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors"
        />
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto">
        {filteredAgents.map(agent => (
          <AgentCard
            key={agent.id}
            agent={agent}
            onClick={() => setSelectedAgent(agent.id)}
          />
        ))}
      </div>

      {/* Empty state */}
      {filteredAgents.length === 0 && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-white font-semibold mb-2">No agents found</h3>
            <p className="text-white/60">Try adjusting your search criteria</p>
          </div>
        </div>
      )}
    </div>
  );
};