'use client';

import React, { useState } from 'react';
import { ChevronDown, Filter, CheckCircle, AlertTriangle, Info, Clock } from 'lucide-react';
import { Activity } from '../../app/types/ActivityType';

export const ActivityFeed: React.FC = () => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState<'all' | 'success' | 'error' | 'warning'>('all');

  const activities: Activity[] = [
    {
      id: '1',
      agentId: '1',
      agentName: 'Content Creator',
      action: 'Generated blog post',
      description: 'Created "10 Tips for Better Productivity" blog post with SEO optimization',
      timestamp: new Date(),
      status: 'success',
      details: {
        wordCount: 1250,
        seoScore: 95,
        readingTime: '5 min'
      }
    },
    {
      id: '2',
      agentId: '2',
      agentName: 'Data Analyst',
      action: 'Weekly report generated',
      description: 'Compiled weekly performance metrics and insights',
      timestamp: new Date(Date.now() - 300000),
      status: 'success',
      details: {
        metrics: 15,
        insights: 3,
        recommendations: 5
      }
    },
    {
      id: '3',
      agentId: '4',
      agentName: 'Project Manager',
      action: 'Task assignment failed',
      description: 'Unable to assign task to team member due to capacity limits',
      timestamp: new Date(Date.now() - 600000),
      status: 'error',
      details: {
        taskId: 'TASK-123',
        assignee: 'john.doe@company.com',
        reason: 'User at maximum capacity'
      }
    },
    {
      id: '4',
      agentId: '3',
      agentName: 'Customer Support',
      action: 'Ticket resolved',
      description: 'Resolved customer inquiry about billing issue',
      timestamp: new Date(Date.now() - 900000),
      status: 'success',
      details: {
        ticketId: 'SUP-456',
        resolutionTime: '15 minutes',
        satisfaction: 5
      }
    },
    {
      id: '5',
      agentId: '1',
      agentName: 'Content Creator',
      action: 'Social media scheduled',
      description: 'Scheduled 5 posts across Twitter, LinkedIn, and Facebook',
      timestamp: new Date(Date.now() - 1200000),
      status: 'warning',
      details: {
        platforms: 3,
        posts: 5,
        scheduledFor: 'Next 3 days'
      }
    }
  ];

  const getStatusIcon = (status: Activity['status']) => {
    switch (status) {
      case 'success': return <CheckCircle size={16} className="text-green-400" />;
      case 'error': return <AlertTriangle size={16} className="text-red-400" />;
      case 'warning': return <AlertTriangle size={16} className="text-yellow-400" />;
      case 'info': return <Info size={16} className="text-blue-400" />;
    }
  };

  const getStatusColor = (status: Activity['status']) => {
    switch (status) {
      case 'success': return 'border-l-green-400';
      case 'error': return 'border-l-red-400';
      case 'warning': return 'border-l-yellow-400';
      case 'info': return 'border-l-blue-400';
    }
  };

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const filteredActivities = filter === 'all' 
    ? activities 
    : activities.filter(activity => activity.status === filter);

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (minutes < 1440) return `${Math.floor(minutes / 60)}h ago`;
    return `${Math.floor(minutes / 1440)}d ago`;
  };

  return (
    <div className="bg-white/[0.08] backdrop-blur-3xl rounded-3xl border border-white/[0.12] shadow-2xl shadow-black/20 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Activity Feed</h2>
        
        <div className="flex items-center space-x-3">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="bg-white/[0.08] backdrop-blur-2xl border border-white/[0.12] rounded-2xl px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-400/60"
          >
            <option value="all">All Activities</option>
            <option value="success">Success</option>
            <option value="error">Errors</option>
            <option value="warning">Warnings</option>
          </select>
          
          <button className="w-10 h-10 bg-white/[0.08] backdrop-blur-2xl rounded-2xl flex items-center justify-center text-white/60 hover:text-white hover:bg-white/[0.12] transition-all duration-200">
            <Filter size={16} />
          </button>
        </div>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredActivities.map((activity) => (
          <div
            key={activity.id}
            className={`bg-white/[0.05] backdrop-blur-2xl rounded-2xl border-l-4 ${getStatusColor(activity.status)} p-4 hover:bg-white/[0.08] transition-all duration-200`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                {getStatusIcon(activity.status)}
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="text-white font-medium">{activity.action}</h4>
                    <span className="text-white/60 text-sm">by {activity.agentName}</span>
                  </div>
                  <p className="text-white/70 text-sm mb-2">{activity.description}</p>
                  <div className="flex items-center space-x-4 text-xs text-white/50">
                    <div className="flex items-center space-x-1">
                      <Clock size={12} />
                      <span>{formatTime(activity.timestamp)}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => toggleExpanded(activity.id)}
                className="text-white/60 hover:text-white transition-colors"
              >
                <ChevronDown 
                  size={16} 
                  className={`transform transition-transform ${
                    expandedItems.has(activity.id) ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </div>

            {/* Expanded Details */}
            {expandedItems.has(activity.id) && activity.details && (
              <div className="mt-4 pt-4 border-t border-white/[0.08]">
                <h5 className="text-white/80 font-medium text-sm mb-2">Details:</h5>
                <div className="bg-white/[0.05] rounded-xl p-3">
                  <pre className="text-white/70 text-xs whitespace-pre-wrap">
                    {JSON.stringify(activity.details, null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};