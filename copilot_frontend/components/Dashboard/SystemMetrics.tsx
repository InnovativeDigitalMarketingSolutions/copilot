'use client';

import React from 'react';
import { Activity, Cpu, HardDrive, Zap } from 'lucide-react';

export const SystemMetrics: React.FC = () => {
  const metrics = [
    {
      icon: Zap,
      label: 'Active Agents',
      value: '5',
      change: '+2',
      changeType: 'positive' as const,
      color: 'text-green-400'
    },
    {
      icon: Activity,
      label: 'Running Tasks',
      value: '12',
      change: '+4',
      changeType: 'positive' as const,
      color: 'text-blue-400'
    },
    {
      icon: Cpu,
      label: 'System Load',
      value: '65%',
      change: '-5%',
      changeType: 'positive' as const,
      color: 'text-purple-400'
    },
    {
      icon: HardDrive,
      label: 'Storage Used',
      value: '2.4GB',
      change: '+0.2GB',
      changeType: 'neutral' as const,
      color: 'text-orange-400'
    }
  ];

  const getChangeColor = (type: 'positive' | 'negative' | 'neutral') => {
    switch (type) {
      case 'positive': return 'text-green-400';
      case 'negative': return 'text-red-400';
      case 'neutral': return 'text-gray-400';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <div
          key={index}
          className="bg-white/[0.08] backdrop-blur-3xl rounded-3xl border border-white/[0.12] shadow-2xl shadow-black/20 p-6 hover:bg-white/[0.12] hover:shadow-white/10 transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <metric.icon size={24} className={metric.color} />
            <span className={`text-sm font-medium ${getChangeColor(metric.changeType)}`}>
              {metric.change}
            </span>
          </div>
          <div>
            <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
            <div className="text-white/60 text-sm">{metric.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
};