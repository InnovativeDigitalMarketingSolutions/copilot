'use client';

import React, { useState } from 'react';
import { Play, Pause, Square, MoreVertical, Clock, AlertTriangle, CheckCircle } from 'lucide-react';
import { Task } from '../types/TaskType';

export default function TaskMonitor() {
  const [tasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Generate Weekly Report',
      description: 'Compile analytics data and create comprehensive weekly performance report',
      agentId: '2',
      status: 'running',
      priority: 'high',
      progress: 75,
      estimatedCompletion: new Date(Date.now() + 900000),
      startedAt: new Date(Date.now() - 1800000),
      category: 'Analytics'
    },
    {
      id: '2',
      title: 'Create Social Media Content',
      description: 'Generate 5 social media posts for next week\'s campaign',
      agentId: '1',
      status: 'running',
      priority: 'medium',
      progress: 40,
      estimatedCompletion: new Date(Date.now() + 1800000),
      startedAt: new Date(Date.now() - 600000),
      category: 'Content'
    },
    {
      id: '3',
      title: 'Process Customer Feedback',
      description: 'Analyze and categorize customer feedback from last month',
      agentId: '3',
      status: 'pending',
      priority: 'low',
      progress: 0,
      estimatedCompletion: new Date(Date.now() + 3600000),
      startedAt: new Date(),
      category: 'Support'
    },
    {
      id: '4',
      title: 'Update Project Timeline',
      description: 'Adjust project milestones based on recent progress updates',
      agentId: '4',
      status: 'failed',
      priority: 'urgent',
      progress: 25,
      estimatedCompletion: new Date(Date.now() + 600000),
      startedAt: new Date(Date.now() - 1200000),
      category: 'Management'
    },
    {
      id: '5',
      title: 'Email Campaign Setup',
      description: 'Configure automated email sequence for new subscribers',
      agentId: '1',
      status: 'completed',
      priority: 'medium',
      progress: 100,
      estimatedCompletion: new Date(Date.now() - 300000),
      startedAt: new Date(Date.now() - 2400000),
      category: 'Marketing'
    }
  ]);

  const getStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'running': return <Play size={16} className="text-blue-400" />;
      case 'pending': return <Clock size={16} className="text-yellow-400" />;
      case 'completed': return <CheckCircle size={16} className="text-green-400" />;
      case 'failed': return <AlertTriangle size={16} className="text-red-400" />;
      case 'paused': return <Pause size={16} className="text-gray-400" />;
    }
  };

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'running': return 'border-l-blue-400 bg-blue-500/5';
      case 'pending': return 'border-l-yellow-400 bg-yellow-500/5';
      case 'completed': return 'border-l-green-400 bg-green-500/5';
      case 'failed': return 'border-l-red-400 bg-red-500/5';
      case 'paused': return 'border-l-gray-400 bg-gray-500/5';
    }
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500/20 text-red-300';
      case 'high': return 'bg-orange-500/20 text-orange-300';
      case 'medium': return 'bg-yellow-500/20 text-yellow-300';
      case 'low': return 'bg-green-500/20 text-green-300';
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDuration = (start: Date, end: Date) => {
    const diff = end.getTime() - start.getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 60) return `${minutes}m`;
    return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
  };

  return (
    <div className="h-full p-6 overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Task Monitor</h1>
          <p className="text-white/60">Real-time monitoring of AI agent tasks and workflows</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/[0.08] backdrop-blur-3xl rounded-2xl border border-white/[0.12] p-4">
            <div className="text-2xl font-bold text-blue-400">2</div>
            <div className="text-white/60 text-sm">Running</div>
          </div>
          <div className="bg-white/[0.08] backdrop-blur-3xl rounded-2xl border border-white/[0.12] p-4">
            <div className="text-2xl font-bold text-yellow-400">1</div>
            <div className="text-white/60 text-sm">Pending</div>
          </div>
          <div className="bg-white/[0.08] backdrop-blur-3xl rounded-2xl border border-white/[0.12] p-4">
            <div className="text-2xl font-bold text-green-400">1</div>
            <div className="text-white/60 text-sm">Completed</div>
          </div>
          <div className="bg-white/[0.08] backdrop-blur-3xl rounded-2xl border border-white/[0.12] p-4">
            <div className="text-2xl font-bold text-red-400">1</div>
            <div className="text-white/60 text-sm">Failed</div>
          </div>
        </div>

        {/* Tasks List */}
        <div className="bg-white/[0.08] backdrop-blur-3xl rounded-3xl border border-white/[0.12] shadow-2xl shadow-black/20 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Active Tasks</h2>
            <div className="flex items-center space-x-3">
              <button className="bg-red-500/90 backdrop-blur-xl text-white px-4 py-2 rounded-2xl hover:bg-red-600/90 transition-all duration-200 text-sm font-medium flex items-center space-x-2">
                <Square size={14} />
                <span>Stop All</span>
              </button>
              <button className="bg-yellow-500/90 backdrop-blur-xl text-white px-4 py-2 rounded-2xl hover:bg-yellow-600/90 transition-all duration-200 text-sm font-medium flex items-center space-x-2">
                <Pause size={14} />
                <span>Pause All</span>
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`border-l-4 ${getStatusColor(task.status)} backdrop-blur-2xl rounded-2xl p-4 hover:bg-white/[0.08] transition-all duration-200`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start space-x-3 flex-1">
                    {getStatusIcon(task.status)}
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-1">
                        <h3 className="text-white font-semibold">{task.title}</h3>
                        <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                        <span className="bg-white/[0.08] text-white/70 px-2 py-1 rounded-lg text-xs">
                          {task.category}
                        </span>
                      </div>
                      <p className="text-white/70 text-sm mb-3">{task.description}</p>
                      
                      {/* Progress Bar */}
                      {task.status === 'running' && (
                        <div className="mb-3">
                          <div className="flex items-center justify-between text-sm text-white/60 mb-1">
                            <span>Progress</span>
                            <span>{task.progress}%</span>
                          </div>
                          <div className="w-full bg-white/[0.08] rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${task.progress}%` }}
                            />
                          </div>
                        </div>
                      )}

                      <div className="flex items-center space-x-6 text-xs text-white/50">
                        <div>Started: {formatTime(task.startedAt)}</div>
                        {task.status === 'running' && (
                          <div>ETA: {formatTime(task.estimatedCompletion)}</div>
                        )}
                        {task.status === 'completed' && (
                          <div>Duration: {formatDuration(task.startedAt, task.estimatedCompletion)}</div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {task.status === 'running' && (
                      <button className="w-8 h-8 bg-white/[0.08] backdrop-blur-xl rounded-xl flex items-center justify-center text-white/60 hover:text-white hover:bg-white/[0.12] transition-all duration-200">
                        <Pause size={14} />
                      </button>
                    )}
                    {task.status === 'failed' && (
                      <button className="w-8 h-8 bg-blue-500/90 backdrop-blur-xl rounded-xl flex items-center justify-center text-white hover:bg-blue-600/90 transition-all duration-200">
                        <Play size={14} />
                      </button>
                    )}
                    <button className="w-8 h-8 bg-white/[0.08] backdrop-blur-xl rounded-xl flex items-center justify-center text-white/60 hover:text-white hover:bg-white/[0.12] transition-all duration-200">
                      <MoreVertical size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}