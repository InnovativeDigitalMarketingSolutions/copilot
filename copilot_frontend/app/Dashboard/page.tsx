'use client';

import React from 'react';
import { AgentOverview } from '../../components/Dashboard/AgentOverview';
import { QuickActions } from '../../components/Dashboard/QuickActions';
import { ActivityFeed } from '../../components/Dashboard/ActivityFeed';
import { SystemMetrics } from '../../components/Dashboard/SystemMetrics';

export default function Dashboard() {
  return (
    <div className="h-full p-6 overflow-y-auto">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-white/60">Monitor your AI agents and system performance</p>
        </div>

        {/* System Metrics */}
        <SystemMetrics />

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Agent Overview */}
          <div className="lg:col-span-2">
            <AgentOverview />
          </div>

          {/* Right Column - Quick Actions */}
          <div>
            <QuickActions />
          </div>
        </div>

        {/* Activity Feed */}
        <ActivityFeed />
      </div>
    </div>
  );
};