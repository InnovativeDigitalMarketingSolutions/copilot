export interface SystemStatus {
  overall: 'healthy' | 'warning' | 'error'
  activeAgents: number
  runningTasks: number
  systemLoad: number
  uptime: string
  notifications: number
}