"use client";

import React, { useState } from 'react';
import { Bell, ChevronDown, User, Search, Wifi, WifiOff } from 'lucide-react';
import { NavigationItem } from './MainLayout';
import { SystemStatus } from 'app/types/system-status';

interface TopNavigationProps {
  activeView: NavigationItem;
}

export const TopNavigation: React.FC<TopNavigationProps> = ({ activeView }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [systemStatus] = useState<SystemStatus>({
    overall: 'healthy',
    activeAgents: 5,
    runningTasks: 12,
    systemLoad: 65,
    uptime: '2d 14h 32m',
    notifications: 3
  });

  const getBreadcrumb = (view: NavigationItem) => {
    const breadcrumbs = {
      dashboard: 'Dashboard',
      tasks: 'Task Monitor',
      projects: 'Project Management',
      marketplace: 'Marketplace',
      settings: 'Settings',
      reports: 'Reports'
    };
    return breadcrumbs[view];
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-400';
      case 'warning': return 'text-yellow-400';
      case 'error': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="h-16 bg-white/[0.08] backdrop-blur-3xl border-b border-white/[0.12] flex items-center justify-between px-6 shadow-lg shadow-black/10">
      {/* Left side - Breadcrumb */}
      <div className="flex items-center space-x-3">
        <div className="text-white/90">
          <span className="text-lg font-semibold tracking-tight">CoPilot</span>
          <span className="text-white/30 mx-2">/</span>
          <span className="text-white/70 font-medium">{getBreadcrumb(activeView)}</span>
        </div>
      </div>

      {/* Center - Search */}
      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" />
          <input
            type="text"
            placeholder="Search or type a command..."
            className="w-full bg-white/[0.08] backdrop-blur-2xl border border-white/[0.12] rounded-2xl pl-10 pr-4 py-2.5 text-white placeholder-white/50 focus:outline-none focus:border-blue-400/60 focus:bg-white/[0.12] transition-all duration-200"
          />
        </div>
      </div>

      {/* Right side - Status and User */}
      <div className="flex items-center space-x-4">
        {/* System Status */}
        <div className="flex items-center space-x-3 bg-white/[0.08] backdrop-blur-2xl rounded-2xl px-4 py-2">
          {systemStatus.overall === 'healthy' ? (
            <Wifi size={16} className={getStatusColor(systemStatus.overall)} />
          ) : (
            <WifiOff size={16} className={getStatusColor(systemStatus.overall)} />
          )}
          <span className="text-white/70 text-sm font-medium">
            {systemStatus.activeAgents} agents active
          </span>
        </div>

        {/* Notifications */}
        <button className="relative w-10 h-10 rounded-2xl bg-white/[0.08] backdrop-blur-2xl flex items-center justify-center text-white/60 hover:text-white hover:bg-white/[0.12] transition-all duration-200">
          <Bell size={18} />
          {systemStatus.notifications > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-bold">
              {systemStatus.notifications}
            </span>
          )}
        </button>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center space-x-3 bg-white/[0.08] backdrop-blur-2xl rounded-2xl px-4 py-2 hover:bg-white/[0.12] transition-all duration-200"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
            <span className="text-white font-medium">John Doe</span>
            <ChevronDown size={16} className="text-white/60" />
          </button>

          {/* User Dropdown */}
          {showUserMenu && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white/[0.12] backdrop-blur-3xl border border-white/[0.12] rounded-2xl shadow-2xl shadow-black/20 py-2">
              <button className="w-full text-left px-4 py-2 text-white/80 hover:text-white hover:bg-white/[0.08] transition-colors">
                Profile Settings
              </button>
              <button className="w-full text-left px-4 py-2 text-white/80 hover:text-white hover:bg-white/[0.08] transition-colors">
                Preferences
              </button>
              <hr className="my-2 border-white/[0.12]" />
              <button className="w-full text-left px-4 py-2 text-red-400 hover:text-red-300 hover:bg-white/[0.08] transition-colors">
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};