import { motion } from 'framer-motion';
import { depthLevels, edgeGlow } from '@/lib/shadows';
import { staggerContainer, spatialEntry } from '@/lib/animations';

// Mock directories - will be fetched from daemon
const mockDirectories = [
  { path: '~/Dev/spatial-hub', name: 'spatial-hub', hasClaudeMd: true, lastActive: 'now' },
  { path: '~/Dev/proudexos', name: 'proudexos', hasClaudeMd: true, lastActive: '2h ago' },
  { path: '~/Dev/spatial-os', name: 'spatial-os', hasClaudeMd: false, lastActive: '1d ago' },
  { path: '~/Dev/zmk_corne', name: 'zmk_corne', hasClaudeMd: false, lastActive: '5d ago' },
];

const BREATH_DURATION = 6;

export function DirectoriesView() {
  return (
    <div>
      <motion.header
        className="mb-8"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-light tracking-tight text-[--text-primary]">
          Directories
        </h1>
        <p className="mt-1 text-sm text-[--text-secondary]">
          {mockDirectories.length} development folders
        </p>
      </motion.header>

      <motion.div
        className="grid gap-3"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {mockDirectories.map((dir, index) => (
          <motion.button
            key={dir.path}
            variants={spatialEntry}
            className="flex items-center gap-4 rounded-xl bg-[--surface-raised] p-4 text-left"
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
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[--surface-sunken] text-lg">
              ⌂
            </div>
            <div className="flex-1">
              <p className="font-medium text-[--text-primary]">{dir.name}</p>
              <p className="text-xs text-[--text-secondary]">{dir.path}</p>
            </div>
            <div className="flex items-center gap-2">
              {dir.hasClaudeMd && (
                <span className="rounded bg-[--surface-sunken] px-2 py-0.5 text-[10px] text-[--text-secondary]">
                  CLAUDE.md
                </span>
              )}
              <span className="text-xs text-[--text-ephemeral]">
                {dir.lastActive}
              </span>
            </div>
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}
