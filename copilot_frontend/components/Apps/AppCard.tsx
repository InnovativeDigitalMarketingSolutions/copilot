'use client';

import React from 'react';
import { Star, Download, DollarSign, Play, Settings } from 'lucide-react';

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

interface AppCardProps {
  app: App;
}

export const AppCard: React.FC<AppCardProps> = ({ app }) => {
  const handleAction = () => {
    if (app.installed) {
      console.log(`Launching ${app.name}`);
    } else {
      console.log(`Installing ${app.name}`);
    }
  };

  const formatDownloads = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-4 hover:bg-white/15 hover:border-white/30 transition-all duration-200 group">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="text-2xl">{app.icon}</div>
          <div>
            <h3 className="text-white font-semibold">{app.name}</h3>
            <p className="text-white/60 text-sm">{app.category}</p>
          </div>
        </div>
        {app.installed && (
          <div className="w-3 h-3 bg-green-400 rounded-full" />
        )}
      </div>

      {/* Description */}
      <p className="text-white/70 text-sm mb-4 line-clamp-2">{app.description}</p>

      {/* Stats */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Star size={14} className="text-yellow-400 fill-yellow-400" />
            <span className="text-white/60 text-sm">{app.rating}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Download size={14} className="text-white/60" />
            <span className="text-white/60 text-sm">{formatDownloads(app.downloads)}</span>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          {app.price > 0 && <DollarSign size={14} className="text-white/60" />}
          <span className="text-white/60 text-sm">
            {app.price > 0 ? `${app.price}` : 'Free'}
          </span>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={handleAction}
        className={`w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
          app.installed
            ? 'bg-green-500 hover:bg-green-600 text-white'
            : 'bg-blue-500 hover:bg-blue-600 text-white'
        }`}
      >
        {app.installed ? (
          <>
            <Play size={16} />
            <span>Launch</span>
          </>
        ) : (
          <>
            <Download size={16} />
            <span>Install</span>
          </>
        )}
      </button>

      {/* Settings for installed apps */}
      {app.installed && (
        <button className="w-full mt-2 flex items-center justify-center space-x-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-xl text-white/70 hover:text-white hover:bg-white/20 transition-all duration-200">
          <Settings size={16} />
          <span>Configure</span>
        </button>
      )}
    </div>
  );
};