import React from 'react';
import { Pin, Clock, Bookmark, Settings } from 'lucide-react';

export const ChatSidebar: React.FC = () => {
  const memoryPins = [
    { id: '1', title: 'Q4 Marketing Strategy', content: 'Focus on social media campaigns and influencer partnerships...' },
    { id: '2', title: 'Team Meeting Notes', content: 'Discussed new project timeline and resource allocation...' },
    { id: '3', title: 'Client Requirements', content: 'Need to deliver MVP by end of month with core features...' },
  ];

  const recentCommands = [
    'Create project timeline',
    'Generate marketing report',
    'Schedule team meeting',
    'Draft proposal document'
  ];

  return (
    <div className="w-80 bg-black/[0.08] backdrop-blur-3xl border-l border-white/[0.06] p-8 overflow-y-auto shadow-2xl shadow-black/20">
      {/* Memory Pins */}
      <div className="mb-10">
        <div className="flex items-center space-x-3 mb-6">
          <Pin size={20} className="text-white/70" />
          <h3 className="text-white font-bold text-lg tracking-tight">Memory Pins</h3>
        </div>
        <div className="space-y-4">
          {memoryPins.map((pin) => (
            <div key={pin.id} className="bg-white/[0.08] backdrop-blur-2xl rounded-2xl p-4 border border-white/[0.12] shadow-lg shadow-black/10 hover:bg-white/[0.12] hover:shadow-xl hover:shadow-black/20 transition-all duration-300 ease-out">
              <h4 className="text-white text-base font-semibold mb-2">{pin.title}</h4>
              <p className="text-white/60 text-sm line-clamp-2 leading-relaxed">{pin.content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Commands */}
      <div className="mb-10">
        <div className="flex items-center space-x-3 mb-6">
          <Clock size={20} className="text-white/70" />
          <h3 className="text-white font-bold text-lg tracking-tight">Recent Commands</h3>
        </div>
        <div className="space-y-3">
          {recentCommands.map((command, index) => (
            <button
              key={index}
              className="w-full text-left bg-white/[0.04] backdrop-blur-2xl rounded-2xl px-4 py-3 text-white/60 hover:text-white hover:bg-white/[0.1] hover:shadow-lg hover:shadow-white/5 transition-all duration-300 ease-out text-sm font-medium"
            >
              {command}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <div className="flex items-center space-x-3 mb-6">
          <Bookmark size={20} className="text-white/70" />
          <h3 className="text-white font-bold text-lg tracking-tight">Quick Actions</h3>
        </div>
        <div className="space-y-3">
          <button className="w-full bg-blue-500/[0.15] backdrop-blur-2xl rounded-2xl px-4 py-3 text-blue-300 hover:bg-blue-500/25 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 ease-out text-sm font-semibold">
            Create New Project
          </button>
          <button className="w-full bg-green-500/[0.15] backdrop-blur-2xl rounded-2xl px-4 py-3 text-green-300 hover:bg-green-500/25 hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300 ease-out text-sm font-semibold">
            Generate Report
          </button>
          <button className="w-full bg-purple-500/[0.15] backdrop-blur-2xl rounded-2xl px-4 py-3 text-purple-300 hover:bg-purple-500/25 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 ease-out text-sm font-semibold">
            Schedule Meeting
          </button>
        </div>
      </div>
    </div>
  );
};