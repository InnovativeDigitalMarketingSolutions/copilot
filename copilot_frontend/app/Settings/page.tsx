'use client';

import React, { useState } from 'react';
import { Save, Shield, Sliders, User, Bell } from 'lucide-react';
import { Agent } from '../types/AgentType';

export default function Settings() {
  const [activeTab, setActiveTab] = useState<'autonomy' | 'profile' | 'notifications' | 'security'>('autonomy');
  
  const [agents] = useState<Agent[]>([
    {
      id: '1',
      name: 'Content Creator',
      type: 'Marketing',
      status: 'active',
      avatar: '✍️',
      description: 'Creates blog posts, social media content, and marketing materials',
      tasksCompleted: 47,
      uptime: '2d 14h',
      lastActivity: new Date(),
      autonomyLevel: 'high',
      capabilities: ['Content Writing', 'SEO Optimization', 'Social Media']
    },
    {
      id: '2',
      name: 'Data Analyst',
      type: 'Analytics',
      status: 'active',
      avatar: '📊',
      description: 'Analyzes business data and generates insights',
      tasksCompleted: 23,
      uptime: '1d 8h',
      lastActivity: new Date(Date.now() - 300000),
      autonomyLevel: 'medium',
      capabilities: ['Data Analysis', 'Report Generation', 'Visualization']
    },
    {
      id: '3',
      name: 'Customer Support',
      type: 'Support',
      status: 'idle',
      avatar: '🎧',
      description: 'Handles customer inquiries and support tickets',
      tasksCompleted: 156,
      uptime: '5d 2h',
      lastActivity: new Date(Date.now() - 1800000),
      autonomyLevel: 'low',
      capabilities: ['Customer Service', 'Ticket Management', 'FAQ']
    }
  ]);

  const tabs = [
    { id: 'autonomy' as const, label: 'Autonomy Settings', icon: Sliders },
    { id: 'profile' as const, label: 'Profile', icon: User },
    { id: 'notifications' as const, label: 'Notifications', icon: Bell },
    { id: 'security' as const, label: 'Security', icon: Shield },
  ];

  const getAutonomyColor = (level: Agent['autonomyLevel']) => {
    switch (level) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
    }
  };

  const renderAutonomySettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-white mb-2">Agent Autonomy Configuration</h3>
        <p className="text-white/60 mb-6">Configure how much independence each AI agent has in decision-making</p>
      </div>

      {agents.map(agent => (
        <div
          key={agent.id}
          className="bg-white/[0.05] backdrop-blur-2xl rounded-2xl border border-white/[0.08] p-6"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">{agent.avatar}</div>
              <div>
                <h4 className="text-white font-semibold">{agent.name}</h4>
                <p className="text-white/60 text-sm">{agent.type}</p>
              </div>
            </div>
            <div className={`w-3 h-3 rounded-full ${getAutonomyColor(agent.autonomyLevel)}`} />
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Autonomy Level: <span className="capitalize text-white">{agent.autonomyLevel}</span>
              </label>
              <input
                type="range"
                min="0"
                max="2"
                value={agent.autonomyLevel === 'low' ? 0 : agent.autonomyLevel === 'medium' ? 1 : 2}
                className="w-full h-2 bg-white/[0.08] rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-white/60 mt-1">
                <span>Low</span>
                <span>Medium</span>
                <span>High</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <span className="text-white/80 text-sm">Auto-approve tasks</span>
                </label>
              </div>
              <div>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-white/80 text-sm">Make decisions independently</span>
                </label>
              </div>
              <div>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <span className="text-white/80 text-sm">Send notifications</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderProfileSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-white mb-2">Profile Settings</h3>
        <p className="text-white/60 mb-6">Manage your account information and preferences</p>
      </div>

      <div className="bg-white/[0.05] backdrop-blur-2xl rounded-2xl border border-white/[0.08] p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">Full Name</label>
            <input
              type="text"
              defaultValue="John Doe"
              className="w-full bg-white/[0.08] backdrop-blur-2xl border border-white/[0.12] rounded-2xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-blue-400/60"
            />
          </div>
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              defaultValue="john.doe@company.com"
              className="w-full bg-white/[0.08] backdrop-blur-2xl border border-white/[0.12] rounded-2xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-blue-400/60"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-white/80 text-sm font-medium mb-2">Role</label>
          <select className="w-full bg-white/[0.08] backdrop-blur-2xl border border-white/[0.12] rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-blue-400/60">
            <option>Administrator</option>
            <option>Manager</option>
            <option>User</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-white mb-2">Notification Preferences</h3>
        <p className="text-white/60 mb-6">Choose what notifications you want to receive</p>
      </div>

      <div className="bg-white/[0.05] backdrop-blur-2xl rounded-2xl border border-white/[0.08] p-6 space-y-4">
        <div className="space-y-3">
          <label className="flex items-center justify-between">
            <span className="text-white/80">Task completions</span>
            <input type="checkbox" className="rounded" defaultChecked />
          </label>
          <label className="flex items-center justify-between">
            <span className="text-white/80">Agent errors</span>
            <input type="checkbox" className="rounded" defaultChecked />
          </label>
          <label className="flex items-center justify-between">
            <span className="text-white/80">System updates</span>
            <input type="checkbox" className="rounded" />
          </label>
          <label className="flex items-center justify-between">
            <span className="text-white/80">Weekly reports</span>
            <input type="checkbox" className="rounded" defaultChecked />
          </label>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-white mb-2">Security Settings</h3>
        <p className="text-white/60 mb-6">Manage your account security and access</p>
      </div>

      <div className="bg-white/[0.05] backdrop-blur-2xl rounded-2xl border border-white/[0.08] p-6 space-y-4">
        <div>
          <label className="block text-white/80 text-sm font-medium mb-2">Current Password</label>
          <input
            type="password"
            className="w-full bg-white/[0.08] backdrop-blur-2xl border border-white/[0.12] rounded-2xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-blue-400/60"
          />
        </div>
        <div>
          <label className="block text-white/80 text-sm font-medium mb-2">New Password</label>
          <input
            type="password"
            className="w-full bg-white/[0.08] backdrop-blur-2xl border border-white/[0.12] rounded-2xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-blue-400/60"
          />
        </div>
        <div>
          <label className="block text-white/80 text-sm font-medium mb-2">Confirm New Password</label>
          <input
            type="password"
            className="w-full bg-white/[0.08] backdrop-blur-2xl border border-white/[0.12] rounded-2xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-blue-400/60"
          />
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'autonomy': return renderAutonomySettings();
      case 'profile': return renderProfileSettings();
      case 'notifications': return renderNotificationSettings();
      case 'security': return renderSecuritySettings();
    }
  };

  return (
    <div className="h-full p-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
          <p className="text-white/60">Configure your AI Business OS preferences</p>
        </div>

        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-64 bg-white/[0.08] backdrop-blur-3xl rounded-3xl border border-white/[0.12] shadow-2xl shadow-black/20 p-4">
            <nav className="space-y-2">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl transition-all duration-200 text-left ${
                    activeTab === tab.id
                      ? 'bg-white/15 text-white'
                      : 'text-white/70 hover:text-white hover:bg-white/[0.08]'
                  }`}
                >
                  <tab.icon size={20} />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 bg-white/[0.08] backdrop-blur-3xl rounded-3xl border border-white/[0.12] shadow-2xl shadow-black/20 p-6">
            {renderContent()}
            
            {/* Save Button */}
            <div className="mt-8 pt-6 border-t border-white/[0.08]">
              <button className="bg-blue-500/90 backdrop-blur-xl text-white px-6 py-3 rounded-2xl hover:bg-blue-600/90 transition-all duration-200 font-medium flex items-center space-x-2">
                <Save size={16} />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}