'use client';

import React from 'react';
import { BarChart3, TrendingUp, Users, Clock } from 'lucide-react';

export const ReportsView: React.FC = () => {
  const stats = [
    { icon: BarChart3, label: 'Totaal Projecten', value: '24', change: '+12%', color: 'text-blue-400' },
    { icon: TrendingUp, label: 'Productiviteit', value: '87%', change: '+5%', color: 'text-green-400' },
    { icon: Users, label: 'Actieve Gebruikers', value: '156', change: '+8%', color: 'text-purple-400' },
    { icon: Clock, label: 'Gemiddelde Tijd', value: '4.2u', change: '-2%', color: 'text-orange-400' },
  ];

  return (
    <div className="h-full p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Rapporten & Analytics</h1>
          <p className="text-white/60">Inzichten en prestatie-indicatoren</p>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white/[0.08] backdrop-blur-xl rounded-2xl p-6 border border-white/[0.12] hover:bg-white/[0.12] hover:shadow-lg hover:shadow-white/10 transition-all duration-300 ease-out"
          >
            <div className="flex items-center justify-between mb-4">
              <stat.icon size={24} className={stat.color} />
              <span className={`text-sm font-medium ${
                stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
              }`}>
                {stat.change}
              </span>
            </div>
            <div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-white/60 text-sm">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts placeholder */}
      <div className="grid grid-cols-2 gap-6 h-96">
        <div className="bg-white/[0.05] backdrop-blur-xl rounded-2xl border border-white/[0.08] p-6 flex items-center justify-center">
          <div className="text-center">
            <BarChart3 size={48} className="text-white/40 mx-auto mb-3" />
            <h3 className="text-white font-semibold mb-2">Productiviteit Grafiek</h3>
            <p className="text-white/60 text-sm">Wekelijkse productiviteit trends</p>
          </div>
        </div>
        <div className="bg-white/[0.05] backdrop-blur-xl rounded-2xl border border-white/[0.08] p-6 flex items-center justify-center">
          <div className="text-center">
            <TrendingUp size={48} className="text-white/40 mx-auto mb-3" />
            <h3 className="text-white font-semibold mb-2">Project Voortgang</h3>
            <p className="text-white/60 text-sm">Overzicht van alle projecten</p>
          </div>
        </div>
      </div>
    </div>
  );
};