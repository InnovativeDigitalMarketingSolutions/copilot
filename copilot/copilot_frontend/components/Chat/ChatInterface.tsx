import React, { useState, useRef, useEffect } from 'react';
import { MessageInput } from './MessageInput';
import { MessageList } from './MessageList';
import { ChatSidebar } from './ChatSidebar';
import { ContextSuggestions } from './ContextSuggestions';

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  agent?: string;
  attachments?: string[];
}

export const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your AI Business Assistant. I can help you with project management, marketing, analytics, and more. What would you like to work on today?',
      sender: 'ai',
      timestamp: new Date(),
      agent: 'Business Assistant'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string, attachments?: File[]) => {
    if (!content.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
      attachments: attachments?.map(f => f.name)
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: 'I understand you want to work on that. Let me help you get started. Would you like me to create a project plan or connect you with a specialized agent?',
        sender: 'ai',
        timestamp: new Date(),
        agent: 'Business Assistant'
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="h-full flex">
      {/* Main chat area */}
      <div className="flex-1 flex flex-col">
        {/* Context suggestions */}
        <ContextSuggestions />
        
        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <MessageList 
            messages={messages} 
            isTyping={isTyping}
          />
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="border-t border-white/10 p-6">
          <MessageInput 
            value={inputValue}
            onChange={setInputValue}
            onSend={handleSendMessage}
            placeholder="Ask me anything about your business..."
          />
        </div>
      </div>

      {/* Chat sidebar */}
      <ChatSidebar />
    </div>
  );
};