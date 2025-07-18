'use client';

import React from 'react';
import { Sidebar } from 'components/Layout/Sidebar';
import { TopNavigation } from 'components/Layout/TopNavigation';

export type NavigationItem = 'dashboard' | 'tasks' | 'marketplace' | 'settings' | 'reports' | 'projects';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="h-screen w-screen overflow-hidden relative bg-gray-50">
      {/* Background landscape image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/backgrounds/copilot-bg.jpeg')`
        }}
      />
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/10 to-orange-900/20" />
      
      {/* Main container */}
      <div className="relative h-full flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content area */}
        <div className="flex-1 flex flex-col">
          {/* Top Navigation */}
          <TopNavigation activeView="dashboard" />

          {/* Content */}
          <main className="flex-1 overflow-hidden">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};