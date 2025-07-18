'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Activity, 
  Store, 
  Settings, 
  BarChart3,
  Kanban
} from 'lucide-react';


export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  
  const navigationItems = [
    { href: '/Dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/TaskMonitor', icon: Activity, label: 'Task Monitor' },
    { href: '/ProjectManagement', icon: Kanban, label: 'Projects' },
    { href: '/Marketplace', icon: Store, label: 'Marketplace' },
    { href: '/Settings', icon: Settings, label: 'Settings' },
    { href: '/Reports', icon: BarChart3, label: 'Reports' },
  ];

  return (
    <div className="w-64 bg-white/[0.08] backdrop-blur-3xl border-r border-white/[0.12] shadow-2xl shadow-black/20">
      {/* Logo */}
      <div className="p-6 border-b border-white/[0.12]">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">C</span>
          </div>
          <div>
            <h1 className="text-white font-bold text-lg tracking-tight">CoPilot</h1>
            <p className="text-white/60 text-sm">AI Business OS</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`
                w-full flex items-center space-x-3 px-4 py-3 rounded-2xl transition-all duration-300 ease-out font-medium
                ${pathname === item.href ? 'text-white bg-white/[0.12] backdrop-blur-xl' : 'text-white/70 hover:text-white hover:bg-white/[0.08] hover:backdrop-blur-xl'}
              `}
            >
            <item.icon size={20} />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};