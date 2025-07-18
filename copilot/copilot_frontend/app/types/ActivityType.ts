export enum ActivityStatus {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
}

export type Activity = {
  id: string;
  agentId: string;
  agentName: string;
  action: string;
  description: string;
  timestamp: string; // ISO 8601 formaat (bv. '2025-07-18T12:00:00Z')
  status: 'success' | 'error' | 'warning' | 'info';
  details: Record<string, any>;
};
