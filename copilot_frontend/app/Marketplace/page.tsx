"use client";

import React, { useState } from 'react';
import { Search, Filter, Star, Download, Check, AlertCircle, Loader } from 'lucide-react';
import { SaaSApp } from 'app/types/SaasApp';

export default function Marketplace() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [apps] = useState<SaaSApp[]>([
    {
      id: '1',
      name: 'Slack',
      description: 'Team communication and collaboration platform',
      logo: '💬',
      category: 'Communication',
      isConnected: true,
      connectionStatus: 'connected',
      features: ['Real-time messaging', 'File sharing', 'Video calls'],
      pricing: 'freemium',
      rating: 4.8,
      installs: 15000
    },
    {
      id: '2',
      name: 'Google Drive',
      description: 'Cloud storage and file synchronization service',
      logo: '📁',
      category: 'Storage',
      isConnected: true,
      connectionStatus: 'connected',
      features: ['Cloud storage', 'File sharing', 'Collaboration'],
      pricing: 'freemium',
      rating: 4.6,
      installs: 25000
    },
    {
      id: '3',
      name: 'Trello',
      description: 'Visual project management and task organization',
      logo: '📋',
      category: 'Productivity',
      isConnected: false,
      connectionStatus: 'disconnected',
      features: ['Kanban boards', 'Task management', 'Team collaboration'],
      pricing: 'freemium',
      rating: 4.5,
      installs: 8000
    },
    {
      id: '4',
      name: 'Mailchimp',
      description: 'Email marketing and automation platform',
      logo: '📧',
      category: 'Marketing',
      isConnected: false,
      connectionStatus: 'disconnected',
      features: ['Email campaigns', 'Automation', 'Analytics'],
      pricing: 'freemium',
      rating: 4.3,
      installs: 12000
    },
    {
      id: '5',
      name: 'Salesforce',
      description: 'Customer relationship management platform',
      logo: '🏢',
      category: 'CRM',
      isConnected: false,
      connectionStatus: 'error',
      features: ['Lead management', 'Sales pipeline', 'Analytics'],
      pricing: 'paid',
      rating: 4.4,
      installs: 20000
    },
    {
      id: '6',
      name: 'Zoom',
      description: 'Video conferencing and online meetings',
      logo: '📹',
      category: 'Communication',
      isConnected: true,
      connectionStatus: 'connected',
      features: ['Video meetings', 'Screen sharing', 'Recording'],
      pricing: 'freemium',
      rating: 4.2,
      installs: 18000
    }
  ]);

  const categories = ['all', 'Communication', 'Storage', 'Productivity', 'Marketing', 'CRM'];

  const filteredApps = apps.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || app.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getConnectionIcon = (status: SaaSApp['connectionStatus']) => {
    switch (status) {
      case 'connected': return <Check size={16} className="text-green-400" />;
      case 'disconnected': return <AlertCircle size={16} className="text-gray-400" />;
      case 'error': return <AlertCircle size={16} className="text-red-400" />;
      case 'pending': return <Loader size={16} className="text-yellow-400 animate-spin" />;
    }
  };

  const getConnectionColor = (status: SaaSApp['connectionStatus']) => {
    switch (status) {
      case 'connected': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'disconnected': return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
      case 'error': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'pending': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
    }
  };

  const handleConnect = (app: SaaSApp) => {
    console.log(`Connecting to ${app.name}`);
    // OAuth flow would be initiated here
  };

  const handleDisconnect = (app: SaaSApp) => {
    console.log(`Disconnecting from ${app.name}`);
  };

  return (
    <div className="h-full p-6 overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Marketplace</h1>
          <p className="text-white/60">Connect and manage your SaaS applications</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white/[0.08] backdrop-blur-3xl rounded-3xl border border-white/[0.12] shadow-2xl shadow-black/20 p-6 mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="relative flex-1">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" />
              <input
                type="text"
                placeholder="Search applications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/[0.08] backdrop-blur-2xl border border-white/[0.12] rounded-2xl pl-10 pr-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-blue-400/60"
              />
            </div>
            <button className="w-12 h-12 bg-white/[0.08] backdrop-blur-2xl rounded-2xl flex items-center justify-center text-white/60 hover:text-white hover:bg-white/[0.12] transition-all duration-200">
              <Filter size={20} />
            </button>
          </div>

          <div className="flex items-center space-x-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-2xl text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-blue-500/90 text-white'
                    : 'bg-white/[0.08] text-white/70 hover:bg-white/[0.12] hover:text-white'
                }`}
              >
                {category === 'all' ? 'All Apps' : category}
              </button>
            ))}
          </div>
        </div>

        {/* Apps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredApps.map(app => (
            <div
              key={app.id}
              className="bg-white/[0.08] backdrop-blur-3xl rounded-3xl border border-white/[0.12] shadow-2xl shadow-black/20 p-6 hover:bg-white/[0.12] hover:border-white/[0.20] transition-all duration-300"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">{app.logo}</div>
                  <div>
                    <h3 className="text-white font-bold text-lg">{app.name}</h3>
                    <p className="text-white/60 text-sm">{app.category}</p>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-xl border text-xs font-medium flex items-center space-x-1 ${getConnectionColor(app.connectionStatus)}`}>
                  {getConnectionIcon(app.connectionStatus)}
                  <span className="capitalize">{app.connectionStatus}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-white/70 text-sm mb-4 line-clamp-2">{app.description}</p>

              {/* Features */}
              <div className="mb-4">
                <h4 className="text-white/80 text-sm font-medium mb-2">Features:</h4>
                <div className="flex flex-wrap gap-1">
                  {app.features.slice(0, 3).map((feature, index) => (
                    <span
                      key={index}
                      className="bg-white/[0.08] text-white/70 px-2 py-1 rounded-lg text-xs"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between mb-4 text-sm text-white/60">
                <div className="flex items-center space-x-1">
                  <Star size={14} className="text-yellow-400 fill-yellow-400" />
                  <span>{app.rating}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Download size={14} />
                  <span>{app.installs.toLocaleString()}</span>
                </div>
                <div className="capitalize">{app.pricing}</div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => app.isConnected ? handleDisconnect(app) : handleConnect(app)}
                className={`w-full py-3 rounded-2xl font-medium transition-all duration-200 ${
                  app.isConnected
                    ? 'bg-red-500/90 hover:bg-red-600/90 text-white'
                    : 'bg-blue-500/90 hover:bg-blue-600/90 text-white'
                }`}
              >
                {app.isConnected ? 'Disconnect' : 'Connect'}
              </button>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredApps.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-white font-semibold mb-2">No applications found</h3>
            <p className="text-white/60">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};