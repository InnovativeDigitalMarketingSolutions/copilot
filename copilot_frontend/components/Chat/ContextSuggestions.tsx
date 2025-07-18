import React from 'react';
import { Lightbulb, TrendingUp, Calendar, Users } from 'lucide-react';

export const ContextSuggestions: React.FC = () => {
  const suggestions = [
    {
      icon: TrendingUp,
      title: 'Analyze Q4 Performance',
      description: 'Review metrics and create improvement plan',
      color: 'bg-blue-500/20 text-blue-300'
    },
    {
      icon: Calendar,
      title: 'Plan Next Sprint',
      description: 'Set goals and assign tasks to team',
      color: 'bg-green-500/20 text-green-300'
    },
    {
      icon: Users,
      title: 'Team Productivity',
      description: 'Check team status and workload balance',
      color: 'bg-purple-500/20 text-purple-300'
    },
    {
      icon: Lightbulb,
      title: 'Brainstorm Ideas',
      description: 'Generate creative solutions for challenges',
      color: 'bg-orange-500/20 text-orange-300'
    }
  ];

  return (
    <div className="p-6 border-b border-white/10">
      <div className="flex items-center space-x-2 mb-4">
        <Lightbulb size={18} className="text-white/60" />
        <h3 className="text-white font-semibold">Suggested Actions</h3>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            className={`
              ${suggestion.color} backdrop-blur-xl rounded-xl p-3 
              border border-white/20 hover:border-white/30 
              transition-all duration-200 text-left group
            `}
          >
            <div className="flex items-start space-x-3">
              <suggestion.icon size={20} className="mt-0.5" />
              <div>
                <h4 className="font-medium text-sm mb-1">{suggestion.title}</h4>
                <p className="text-xs opacity-80">{suggestion.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};