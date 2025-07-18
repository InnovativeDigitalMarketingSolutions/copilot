// app/types/agent.ts
export type Agent = {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'idle' | 'error' | 'paused';
  avatar: string;
  description: string;
  tasksCompleted: number;
  uptime: string;
  lastActivity: Date;
  autonomyLevel: 'high' | 'medium' | 'low';
  capabilities: string[];
};