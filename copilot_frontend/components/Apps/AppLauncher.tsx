'use client';

import React, { useState } from 'react';
import { X, Search, Star, Download, Settings } from 'lucide-react';
import { AppCard } from './AppCard';

interface App {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  installed: boolean;
  rating: number;
  downloads: number;
  price: number;
}

interface AppLauncherProps {
  onClose: () => void;
}

export const AppLauncher: React.FC<AppLauncherProps> = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const apps: App[] = [
    {
      id: '1',
      name: 'Invoice Generator',
      description: 'Create professional invoices with AI assistance',
      icon: '🧾',
      category: 'Finance',
      installed: true,
      rating: 4.8,
      downloads: 1250,
      price: 0
    },
    {
      id: '2',
      name: 'Proposal Builder',
      description: 'Generate winning business proposals automatically',
      icon: '📋',
      category: 'Business',
      installed: true,
      rating: 4.9,
      downloads: 980,
      price: 0
    },
    {
      id: '3',
      name: 'Social Media Manager',
      description: 'Schedule and manage your social media content',
      icon: '📱',
      category: 'Marketing',
      installed: false,
      rating: 4.6,
      downloads: 2100,
      price: 29
    },
    {
      id: '4',
      name: 'Email Campaign Tool',
      description: 'Create and send beautiful email campaigns',
      icon: '✉️',
      category: 'Marketing',
      installed: false,
      rating: 4.7,
      downloads: 1800,
      price: 19
    },
    {
      id: '5',
      name: 'Task Automation',
      description: 'Automate repetitive business tasks',
      icon: '⚡',
      category: 'Productivity',
      installed: true,
      rating: 4.5,
      downloads: 650,
      price: 0
    },
    {
      id: '6',
      name: 'CRM Integration',
      description: 'Connect with popular CRM systems',
      icon: '👥',
      category: 'Business',
      installed: false,
      rating: 4.8,
      downloads: 1400,
      price: 49
    }
  ];

  const categories = ['all', 'Business', 'Marketing', 'Finance', 'Productivity'];

  const filteredApps = apps.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || app.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const installedApps = filteredApps.filter(app => app.installed);
  const availableApps = filteredApps.filter(app => !app.installed);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-black/80 backdrop-blur-xl border border-white/20 rounded-2xl w-full max-w-4xl mx-4 max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div>
            <h2 className="text-2xl font-bold text-white">App Launcher</h2>
            <p className="text-white/60 mt-1">Launch apps or browse the marketplace</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-xl flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all duration-200"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search and Filters */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center space-x-4 mb-4">
            <div className="relative flex-1">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" />
              <input
                type="text"
                placeholder="Search apps..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl pl-10 pr-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-blue-500 text-white'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                {category === 'all' ? 'All Apps' : category}
              </button>
            ))}
          </div>
        </div>

        {/* Apps */}
        <div className="p-6 overflow-y-auto max-h-96">
          {/* Installed Apps */}
          {installedApps.length > 0 && (
            <div className="mb-8">
              <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
                <Settings size={18} />
                <span>Installed Apps</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {installedApps.map(app => (
                  <AppCard key={app.id} app={app} />
                ))}
              </div>
            </div>
          )}

          {/* Available Apps */}
          {availableApps.length > 0 && (
            <div>
              <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
                <Download size={18} />
                <span>Available Apps</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {availableApps.map(app => (
                  <AppCard key={app.id} app={app} />
                ))}
              </div>
            </div>
          )}

          {/* Empty state */}
          {filteredApps.length === 0 && (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-white font-semibold mb-2">No apps found</h3>
              <p className="text-white/60">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};