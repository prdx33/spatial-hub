/**
 * Session Types and Mock Data
 */

export interface Session {
  id: string;
  title: string;
  project: string;
  contextUsed: number; // 0-100 percentage
  lastActive: Date;
  status: 'active' | 'paused' | 'idle';
  preview: string;
}

/** Mock sessions for development */
export const mockSessions: Session[] = [
  {
    id: '1',
    title: 'Spatial Hub UI',
    project: 'spatial-hub',
    contextUsed: 34,
    lastActive: new Date(),
    status: 'active',
    preview: 'Building the sessions overview with gimbal transitions...',
  },
  {
    id: '2',
    title: 'ProudexOS Inventory',
    project: 'proudexos',
    contextUsed: 67,
    lastActive: new Date(Date.now() - 1000 * 60 * 15),
    status: 'paused',
    preview: 'Implementing batch tracking for warehouse items...',
  },
  {
    id: '3',
    title: 'API Integration',
    project: 'proudexos',
    contextUsed: 89,
    lastActive: new Date(Date.now() - 1000 * 60 * 60),
    status: 'idle',
    preview: 'Supabase edge functions for real-time sync...',
  },
  {
    id: '4',
    title: 'Mushrūm Branding',
    project: 'mushrum',
    contextUsed: 12,
    lastActive: new Date(Date.now() - 1000 * 60 * 30),
    status: 'idle',
    preview: 'Exploring packaging design concepts...',
  },
];

export function getStatusColor(status: Session['status']): string {
  switch (status) {
    case 'active':
      return 'oklch(65% 0.15 145)'; // green
    case 'paused':
      return 'oklch(70% 0.12 80)'; // amber
    case 'idle':
      return 'var(--text-ephemeral)';
  }
}

export function formatTimeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}
