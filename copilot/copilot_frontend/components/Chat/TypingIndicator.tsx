import React from 'react';
import { Bot } from 'lucide-react';

export const TypingIndicator: React.FC = () => {
  return (
    <div className="flex justify-start">
      <div className="flex items-start space-x-3 max-w-4xl">
        <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center text-white/80">
          <Bot size={16} />
        </div>
        
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-4 py-3">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
            <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
          </div>
        </div>
      </div>
    </div>
  );
};