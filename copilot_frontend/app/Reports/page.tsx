'use client';

import React, { useState } from 'react';
import { Download, Calendar, Filter, TrendingUp, TrendingDown, Activity, Clock } from 'lucide-react';

export default function Reports() {
  const [dateRange, setDateRange] = useState('7d');
  const [reportType, setReportType] = useState('overview');

  const metrics = [
    {
      title: 'Total Tasks Completed',
      value: '247',
      change: '+12%',
      trend: 'up' as const,
      icon: Activity
    },
    {
      title: 'Average Response Time',
      value: '2.3s',
      change: '-15%',
      trend: 'up' as const,
      icon: Clock
    },
    {
      title: 'Agent Efficiency',
      value: '94.2%',
      change: '+3%',
      trend: 'up' as const,
      icon: TrendingUp
    },
    {
      title: 'Error Rate',
      value: '0.8%',
      change: '-0.2%',
      trend: 'up' as const,
      icon: TrendingDown
    }
  ];

  const agentPerformance = [
    { name: 'Content Creator', tasks: 89, efficiency: 96, errors: 2 },
    { name: 'Data Analyst', tasks: 67, efficiency: 94, errors: 1 },
    { name: 'Customer Support', tasks: 156, efficiency: 92, errors: 3 },
    { name: 'Project Manager', tasks: 45, efficiency: 89, errors: 4 }
  ];

  const recentReports = [
    { name: 'Weekly Performance Report', date: '2024-01-15', size: '2.4 MB' },
    { name: 'Agent Activity Log', date: '2024-01-14', size: '1.8 MB' },
    { name: 'System Audit Trail', date: '2024-01-13', size: '3.2 MB' },
    { name: 'Task Completion Summary', date: '2024-01-12', size: '1.1 MB' }
  ];

  return (
    <div className="h-full p-6 overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Reports & Analytics</h1>
            <p className="text-white/60">System performance insights and audit trails</p>
          </div>
          <div className="flex items-center space-x-3">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="bg-white/[0.08] backdrop-blur-2xl border border-white/[0.12] rounded-2xl px-4 py-2 text-white text-sm focus:outline-none focus:border-blue-400/60"
            >
              <option value="24h">Last 24 hours</option>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
            <button className="bg-blue-500/90 backdrop-blur-xl text-white px-4 py-2 rounded-2xl hover:bg-blue-600/90 transition-all duration-200 text-sm font-medium flex items-center space-x-2">
              <Download size={16} />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="bg-white/[0.08] backdrop-blur-3xl rounded-3xl border border-white/[0.12] shadow-2xl shadow-black/20 p-6 hover:bg-white/[0.12] transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <metric.icon size={24} className="text-blue-400" />
                <div className={`flex items-center space-x-1 text-sm font-medium ${
                  metric.trend === 'up' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {metric.trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                  <span>{metric.change}</span>
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
                <div className="text-white/60 text-sm">{metric.title}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Agent Performance */}
          <div className="bg-white/[0.08] backdrop-blur-3xl rounded-3xl border border-white/[0.12] shadow-2xl shadow-black/20 p-6">
            <h3 className="text-xl font-bold text-white mb-6">Agent Performance</h3>
            <div className="space-y-4">
              {agentPerformance.map((agent, index) => (
                <div key={index} className="bg-white/[0.05] backdrop-blur-2xl rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-white font-medium">{agent.name}</h4>
                    <span className="text-white/60 text-sm">{agent.tasks} tasks</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-white/60">Efficiency</div>
                      <div className="text-white font-semibold">{agent.efficiency}%</div>
                    </div>
                    <div>
                      <div className="text-white/60">Errors</div>
                      <div className="text-white font-semibold">{agent.errors}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Reports */}
          <div className="bg-white/[0.08] backdrop-blur-3xl rounded-3xl border border-white/[0.12] shadow-2xl shadow-black/20 p-6">
            <h3 className="text-xl font-bold text-white mb-6">Recent Reports</h3>
            <div className="space-y-3">
              {recentReports.map((report, index) => (
                <div key={index} className="bg-white/[0.05] backdrop-blur-2xl rounded-2xl p-4 hover:bg-white/[0.08] transition-all duration-200 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-medium text-sm">{report.name}</h4>
                      <p className="text-white/60 text-xs mt-1">{report.date} • {report.size}</p>
                    </div>
                    <button className="text-white/60 hover:text-white transition-colors">
                      <Download size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Activity Chart Placeholder */}
        <div className="bg-white/[0.08] backdrop-blur-3xl rounded-3xl border border-white/[0.12] shadow-2xl shadow-black/20 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Activity Timeline</h3>
            <div className="flex items-center space-x-2">
              <button className="w-10 h-10 bg-white/[0.08] backdrop-blur-2xl rounded-2xl flex items-center justify-center text-white/60 hover:text-white hover:bg-white/[0.12] transition-all duration-200">
                <Filter size={16} />
              </button>
              <button className="w-10 h-10 bg-white/[0.08] backdrop-blur-2xl rounded-2xl flex items-center justify-center text-white/60 hover:text-white hover:bg-white/[0.12] transition-all duration-200">
                <Calendar size={16} />
              </button>
            </div>
          </div>
          
          <div className="h-64 bg-white/[0.05] backdrop-blur-2xl rounded-2xl border border-white/[0.08] flex items-center justify-center">
            <div className="text-center">
              <Activity size={48} className="text-white/40 mx-auto mb-3" />
              <h4 className="text-white font-semibold mb-2">Activity Chart</h4>
              <p className="text-white/60 text-sm">Interactive timeline visualization will be displayed here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};