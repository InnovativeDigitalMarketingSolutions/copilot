'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, Hash, Settings, Users, BarChart3, FileText } from 'lucide-react';

interface Command {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: React.ElementType;
  action: () => void;
  shortcut?: string;
}

interface CommandPaletteProps {
  onClose: () => void;
  onViewChange: (view: 'chat' | 'agents' | 'apps') => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ onClose, onViewChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands: Command[] = [
    {
      id: 'chat',
      title: 'Open Chat',
      description: 'Go to the main chat interface',
      category: 'Navigation',
      icon: Hash,
      action: () => {
        onViewChange('chat');
        onClose();
      }
    },
    {
      id: 'agents',
      title: 'View Agents',
      description: 'Manage your AI agents',
      category: 'Navigation',
      icon: Users,
      action: () => {
        onViewChange('agents');
        onClose();
      }
    },
    {
      id: 'analytics',
      title: 'Open Analytics',
      description: 'View performance metrics and insights',
      category: 'Tools',
      icon: BarChart3,
      action: () => {
        console.log('Opening analytics');
        onClose();
      }
    },
    {
      id: 'documents',
      title: 'Document Library',
      description: 'Access your documents and files',
      category: 'Tools',
      icon: FileText,
      action: () => {
        console.log('Opening documents');
        onClose();
      }
    },
    {
      id: 'settings',
      title: 'Settings',
      description: 'Configure your workspace',
      category: 'System',
      icon: Settings,
      action: () => {
        console.log('Opening settings');
        onClose();
      }
    }
  ];

  const filteredCommands = commands.filter(command =>
    command.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    command.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    command.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedCommands = filteredCommands.reduce((acc, command) => {
    if (!acc[command.category]) {
      acc[command.category] = [];
    }
    acc[command.category].push(command);
    return acc;
  }, {} as Record<string, Command[]>);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    setSelectedIndex(0);
  }, [searchTerm]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, filteredCommands.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xl flex items-start justify-center pt-[20vh] z-50">
      <div className="bg-black/40 backdrop-blur-3xl border border-white/[0.15] rounded-3xl w-full max-w-2xl mx-4 overflow-hidden shadow-2xl shadow-black/40">
        {/* Search Input */}
        <div className="flex items-center space-x-4 p-6 border-b border-white/[0.08]">
          <Search size={22} className="text-white/70" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search commands..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-white text-lg placeholder-white/40 focus:outline-none font-medium"
          />
          <div className="text-white/30 text-sm font-medium">ESC to close</div>
        </div>

        {/* Commands */}
        <div className="max-h-96 overflow-y-auto">
          {Object.entries(groupedCommands).map(([category, categoryCommands]) => (
            <div key={category}>
              <div className="px-6 py-3 text-white/70 text-sm font-bold tracking-wide uppercase">
                {category}
              </div>
              {categoryCommands.map((command, index) => {
                const globalIndex = filteredCommands.indexOf(command);
                return (
                  <button
                    key={command.id}
                    onClick={command.action}
                    className={`w-full text-left px-6 py-4 flex items-center space-x-4 hover:bg-white/[0.08] hover:backdrop-blur-2xl transition-all duration-200 ${
                      globalIndex === selectedIndex ? 'bg-white/[0.08] backdrop-blur-2xl' : ''
                    }`}
                  >
                    <command.icon size={20} className="text-white/70" />
                    <div className="flex-1">
                      <div className="text-white font-semibold text-base">{command.title}</div>
                      <div className="text-white/60 text-sm font-medium">{command.description}</div>
                    </div>
                    {command.shortcut && (
                      <div className="text-white/30 text-sm font-medium">{command.shortcut}</div>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filteredCommands.length === 0 && (
          <div className="p-12 text-center">
            <div className="text-white/70 mb-3 text-lg font-semibold">No commands found</div>
            <div className="text-white/40 text-base font-medium">Try adjusting your search</div>
          </div>
        )}
      </div>
    </div>
  );
};