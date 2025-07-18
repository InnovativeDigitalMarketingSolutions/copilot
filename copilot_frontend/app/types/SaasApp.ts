export type SaaSApp = {
  id: string;
  name: string;
  description: string;
  logo: string;
  category: string;
  isConnected: boolean;
  connectionStatus: 'connected' | 'disconnected' | 'error' | 'pending';
  features: string[];
  pricing: 'freemium' | 'paid';
  rating: number;
  installs: number;
};