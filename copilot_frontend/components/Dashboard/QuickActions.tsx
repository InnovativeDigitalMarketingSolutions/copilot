'use client';

import React, { useState } from 'react';
import { Send, Clock, Lightbulb, Zap } from 'lucide-react';

export const QuickActions: React.FC = () => {
  const [command, setCommand] = useState('');
  
  const recentActions = [
    'Generate weekly report',
    'Create social media content',
    'Analyze customer feedback',
    'Schedule team meeting',
    'Update project status'
  ];

  const suggestedActions = [
    { icon: Lightbulb, title: 'Generate Ideas', description: 'Brainstorm new content topics' },
    { icon: Zap, title: 'Automate Task', description: 'Set up recurring workflow' },
    { icon: Clock, title: 'Schedule Report', description: 'Create automated reporting' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (command.trim()) {
      console.log('Executing command:', command);
      setCommand('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Command Input */}
      <div className="bg-white/[0.08] backdrop-blur-3xl rounded-3xl border border-white/[0.12] shadow-2xl shadow-black/20 p-6">
        <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <textarea
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              placeholder="Tell your AI what to do..."
              className="w-full bg-white/[0.08] backdrop-blur-2xl border border-white/[0.12] rounded-2xl p-4 text-white placeholder-white/50 focus:outline-none focus:border-blue-400/60 resize-none h-24"
            />
          </div>
          
          <button
            type="submit"
            disabled={!command.trim()}
            className="w-full bg-blue-500/90 backdrop-blur-xl text-white py-3 rounded-2xl hover:bg-blue-600/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium flex items-center justify-center space-x-2"
          >
            <Send size={16} />
            <span>Execute Command</span>
          </button>
        </form>
      </div>

      {/* Recent Actions */}
      <div className="bg-white/[0.08] backdrop-blur-3xl rounded-3xl border border-white/[0.12] shadow-2xl shadow-black/20 p-6">
        <h3 className="text-lg font-bold text-white mb-4">Recent Actions</h3>
        <div className="space-y-2">
          {recentActions.map((action, index) => (
            <button
              key={index}
              className="w-full text-left bg-white/[0.05] backdrop-blur-2xl rounded-2xl px-4 py-3 text-white/70 hover:text-white hover:bg-white/[0.08] transition-all duration-200 text-sm"
            >
              {action}
            </button>
          ))}
        </div>
      </div>

      {/* Suggested Actions */}
      <div className="bg-white/[0.08] backdrop-blur-3xl rounded-3xl border border-white/[0.12] shadow-2xl shadow-black/20 p-6">
        <h3 className="text-lg font-bold text-white mb-4">Suggested Actions</h3>
        <div className="space-y-3">
          {suggestedActions.map((action, index) => (
            <button
              key={index}
              className="w-full bg-white/[0.05] backdrop-blur-2xl rounded-2xl p-4 hover:bg-white/[0.08] transition-all duration-200 text-left"
            >
              <div className="flex items-start space-x-3">
                <action.icon size={20} className="text-blue-400 mt-0.5" />
                <div>
                  <h4 className="text-white font-medium text-sm">{action.title}</h4>
                  <p className="text-white/60 text-xs mt-1">{action.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};