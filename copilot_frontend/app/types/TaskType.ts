export type Task = {
  id: string;
  title: string;
  description: string;
    status: 'pending' | 'in_progress' | 'completed' | 'running' | 'failed' | 'paused';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dueDate?: string;
  assignedTo?: string;
  agentId: string;
  progress: number;
  estimatedCompletion: Date;
  startedAt: Date;
  category: string;
};
