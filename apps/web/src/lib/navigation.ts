/**
 * Hub Navigation Structure
 */

export type HubSection =
  | 'sessions'
  | 'directories'
  | 'prompts'
  | 'skills'
  | 'claude-md'
  | 'mcps';

export interface NavItem {
  id: HubSection;
  label: string;
  icon: string;
  description: string;
}

export const navItems: NavItem[] = [
  {
    id: 'sessions',
    label: 'Sessions',
    icon: '◉',
    description: 'Active Claude conversations',
  },
  {
    id: 'directories',
    label: 'Directories',
    icon: '⌂',
    description: 'Your development folders',
  },
  {
    id: 'prompts',
    label: 'Prompts',
    icon: '✦',
    description: 'Saved prompt templates',
  },
  {
    id: 'skills',
    label: 'Skills',
    icon: '⚡',
    description: 'Claude Code skills',
  },
  {
    id: 'claude-md',
    label: 'CLAUDE.md',
    icon: '◈',
    description: 'Instruction files',
  },
  {
    id: 'mcps',
    label: 'MCPs',
    icon: '⬡',
    description: 'MCP servers & tools',
  },
];
