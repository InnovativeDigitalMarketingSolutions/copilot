'use client';

import React, { useState } from 'react';
import { Agent } from './AgentPanel';
import { ArrowLeft, Settings, MoreVertical } from 'lucide-react';
import { ChatInterface } from '../Chat/ChatInterface';

interface AgentChatProps {
  agent: Agent;
  onBack: () => void;
}

export const AgentChat: React.FC<AgentChatProps> = ({ agent, onBack }) => {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-xl border-b border-white/10 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-xl flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all duration-200"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="flex items-center space-x-3">
              <div className="text-2xl">{agent.avatar}</div>
              <div>
                <h2 className="text-white font-semibold">{agent.name}</h2>
                <p className="text-white/60 text-sm">{agent.role}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-xl flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all duration-200">
              <Settings size={20} />
            </button>
            <button className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-xl flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all duration-200">
              <MoreVertical size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="flex-1">
        <ChatInterface />
      </div>
    </div>
  );
};