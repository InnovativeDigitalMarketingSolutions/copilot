'use client';

import React from 'react';
import { Search, Mic, Upload } from 'lucide-react';

export const TopBar: React.FC = () => {
  return (
    <div className="h-20 bg-black/5 backdrop-blur-3xl border-b border-white/[0.06] flex items-center justify-between px-8 shadow-lg shadow-black/10">
      {/* Left side - Breadcrumb */}
      <div className="flex items-center space-x-3 text-white/90">
        <span className="text-base font-semibold tracking-tight">AI Business Suite</span>
        <span className="text-white/30 text-lg">/</span>
        <span className="text-base text-white/60 font-medium">Chat</span>
      </div>

      {/* Center - Quick actions */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-3 bg-white/[0.08] backdrop-blur-2xl rounded-2xl px-6 py-3 shadow-lg shadow-black/10">
          <Search size={18} className="text-white/50" />
          <span className="text-sm text-white/60 font-medium">⌘K for commands</span>
        </div>
        
        <button className="w-12 h-12 rounded-2xl bg-white/[0.08] backdrop-blur-2xl flex items-center justify-center text-white/50 hover:text-white hover:bg-white/[0.15] hover:shadow-lg hover:shadow-white/10 hover:scale-105 transition-all duration-300 ease-out">
          <Mic size={18} />
        </button>
        
        <button className="w-12 h-12 rounded-2xl bg-white/[0.08] backdrop-blur-2xl flex items-center justify-center text-white/50 hover:text-white hover:bg-white/[0.15] hover:shadow-lg hover:shadow-white/10 hover:scale-105 transition-all duration-300 ease-out">
          <Upload size={18} />
        </button>
      </div>

      {/* Right side - Status */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50" />
          <span className="text-sm text-white/70 font-medium">3 agents active</span>
        </div>
      </div>
    </div>
  );
};