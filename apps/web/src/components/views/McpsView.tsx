import { motion } from 'framer-motion';
import { depthLevels, edgeGlow } from '@/lib/shadows';
import { staggerContainer, spatialEntry } from '@/lib/animations';

// Mock MCPs - will be read from Claude Code config
const mockMcps = [
  {
    name: 'github',
    status: 'connected',
    tools: 45,
    description: 'GitHub API integration',
  },
  {
    name: 'MCP_DOCKER',
    status: 'connected',
    tools: 62,
    description: 'Docker and GitHub tools',
  },
  {
    name: 'filesystem',
    status: 'disconnected',
    tools: 12,
    description: 'Local file system access',
  },
];

const BREATH_DURATION = 6;

function getStatusColor(status: string): string {
  return status === 'connected'
    ? 'oklch(65% 0.15 145)'
    : 'var(--text-ephemeral)';
}

export function McpsView() {
  return (
    <div>
      <motion.header
        className="mb-8"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-light tracking-tight text-[--text-primary]">
          MCP Servers
        </h1>
        <p className="mt-1 text-sm text-[--text-secondary]">
          {mockMcps.filter((m) => m.status === 'connected').length} connected
          {' · '}
          {mockMcps.reduce((acc, m) => acc + m.tools, 0)} tools available
        </p>
      </motion.header>

      <motion.div
        className="grid gap-3"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {mockMcps.map((mcp, index) => (
          <motion.div
            key={mcp.name}
            variants={spatialEntry}
            className="flex items-center gap-4 rounded-xl bg-[--surface-raised] p-4"
            style={{ boxShadow: `${depthLevels.raised}, ${edgeGlow}` }}
            animate={{ y: [0, -2, 0] }}
            transition={{
              duration: BREATH_DURATION,
              ease: 'easeInOut',
              repeat: Infinity,
              delay: index * 0.15,
            }}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[--surface-sunken] text-lg">
              ⬡
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="font-mono text-sm font-medium text-[--text-primary]">
                  {mcp.name}
                </p>
                <motion.div
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: getStatusColor(mcp.status) }}
                  animate={
                    mcp.status === 'connected'
                      ? { scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }
                      : {}
                  }
                  transition={{ repeat: Infinity, duration: 2 }}
                />
              </div>
              <p className="text-xs text-[--text-secondary]">
                {mcp.description}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-[--text-primary]">
                {mcp.tools}
              </p>
              <p className="text-xs text-[--text-secondary]">tools</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
