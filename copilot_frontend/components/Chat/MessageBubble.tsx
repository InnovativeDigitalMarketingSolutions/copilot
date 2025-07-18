import React from 'react';
import { Message } from './ChatInterface';
import { Bot, User, Copy, ThumbsUp, ThumbsDown } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.sender === 'user';

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} group`}>
      <div className={`flex max-w-4xl ${isUser ? 'flex-row-reverse' : 'flex-row'} items-start space-x-3`}>
        {/* Avatar */}
        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg ${
          isUser 
            ? 'bg-blue-500/90 backdrop-blur-xl text-white shadow-blue-500/30 ml-4' 
            : 'bg-white/[0.08] backdrop-blur-2xl text-white/80 shadow-black/20 mr-4'
        }`}>
          {isUser ? <User size={18} /> : <Bot size={18} />}
        </div>

        {/* Message content */}
        <div className={`flex-1 ${isUser ? 'mr-4' : 'ml-4'}`}>
          {/* Agent name for AI messages */}
          {!isUser && message.agent && (
            <div className="text-sm text-white/70 mb-2 font-semibold tracking-wide">
              {message.agent}
            </div>
          )}

          {/* Message bubble */}
          <div className={`
            relative px-6 py-4 rounded-3xl backdrop-blur-3xl shadow-2xl
            ${isUser 
              ? 'bg-blue-500/90 text-white shadow-blue-500/20' 
              : 'bg-white/[0.08] text-white border border-white/[0.12] shadow-black/20'
            }
          `}>
            <div className="whitespace-pre-wrap text-base leading-relaxed font-medium">
              {message.content}
            </div>

            {/* Attachments */}
            {message.attachments && message.attachments.length > 0 && (
              <div className="mt-3 space-y-1">
                {message.attachments.map((attachment, index) => (
                  <div key={index} className="text-sm opacity-80 font-medium">
                    📎 {attachment}
                  </div>
                ))}
              </div>
            )}

            {/* Timestamp */}
            <div className={`text-sm mt-3 font-medium ${
              isUser ? 'text-blue-100/80' : 'text-white/40'
            }`}>
              {message.timestamp.toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </div>
          </div>

          {/* Actions */}
          {!isUser && (
            <div className="flex items-center space-x-3 mt-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <button
                onClick={handleCopy}
                className="p-2 rounded-xl bg-white/[0.05] backdrop-blur-xl text-white/40 hover:text-white/70 hover:bg-white/[0.1] transition-all duration-200"
              >
                <Copy size={16} />
              </button>
              <button className="p-2 rounded-xl bg-white/[0.05] backdrop-blur-xl text-white/40 hover:text-green-400 hover:bg-white/[0.1] transition-all duration-200">
                <ThumbsUp size={16} />
              </button>
              <button className="p-2 rounded-xl bg-white/[0.05] backdrop-blur-xl text-white/40 hover:text-red-400 hover:bg-white/[0.1] transition-all duration-200">
                <ThumbsDown size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};