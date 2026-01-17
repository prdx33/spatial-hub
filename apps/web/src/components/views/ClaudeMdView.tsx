import { motion } from 'framer-motion';
import { depthLevels, edgeGlow } from '@/lib/shadows';
import { staggerContainer, spatialEntry } from '@/lib/animations';

// Mock CLAUDE.md files - will be scanned from filesystem
const mockClaudeMdFiles = [
  {
    path: '~/.claude/CLAUDE.md',
    name: 'Global Instructions',
    type: 'global',
    preview: 'Core purpose, contexts, communication preferences...',
    lines: 245,
  },
  {
    path: '~/.claude/rules/australian-english.md',
    name: 'Australian English',
    type: 'rule',
    preview: 'Use -ise not -ize, -our not -or...',
    lines: 18,
  },
  {
    path: '~/.claude/rules/code-style.md',
    name: 'Code Style',
    type: 'rule',
    preview: 'Keep solutions simple and focused...',
    lines: 32,
  },
  {
    path: '~/Dev/proudexos/CLAUDE.md',
    name: 'ProudexOS',
    type: 'project',
    preview: 'Next.js 15 inventory management system...',
    lines: 89,
  },
];

const BREATH_DURATION = 6;

export function ClaudeMdView() {
  return (
    <div>
      <motion.header
        className="mb-8"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-light tracking-tight text-[--text-primary]">
          CLAUDE.md
        </h1>
        <p className="mt-1 text-sm text-[--text-secondary]">
          {mockClaudeMdFiles.length} instruction files
        </p>
      </motion.header>

      <motion.div
        className="grid gap-3"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {mockClaudeMdFiles.map((file, index) => (
          <motion.button
            key={file.path}
            variants={spatialEntry}
            className="rounded-xl bg-[--surface-raised] p-4 text-left"
            style={{ boxShadow: `${depthLevels.raised}, ${edgeGlow}` }}
            animate={{ y: [0, -2, 0] }}
            transition={{
              duration: BREATH_DURATION,
              ease: 'easeInOut',
              repeat: Infinity,
              delay: index * 0.15,
            }}
            whileHover={{
              y: -4,
              boxShadow: `${depthLevels.floating}, ${edgeGlow}`,
              transition: { duration: 0.3 },
            }}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[--surface-sunken] text-lg">
                  ◈
                </div>
                <div>
                  <p className="font-medium text-[--text-primary]">{file.name}</p>
                  <p className="font-mono text-xs text-[--text-secondary]">
                    {file.path}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded bg-[--surface-sunken] px-2 py-0.5 text-[10px] text-[--text-secondary]">
                  {file.type}
                </span>
                <span className="text-xs text-[--text-ephemeral]">
                  {file.lines} lines
                </span>
              </div>
            </div>
            <p className="mt-3 line-clamp-2 text-sm text-[--text-secondary]">
              {file.preview}
            </p>
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}
