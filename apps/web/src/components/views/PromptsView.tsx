import { motion } from 'framer-motion';
import { depthLevels, edgeGlow } from '@/lib/shadows';
import { staggerContainer, spatialEntry } from '@/lib/animations';

// Mock prompts - will be stored locally
const mockPrompts = [
  {
    id: '1',
    title: 'Code Review',
    preview: 'Review this code for security vulnerabilities, performance issues...',
    category: 'development',
  },
  {
    id: '2',
    title: 'Refactor Component',
    preview: 'Refactor this React component to use hooks and improve...',
    category: 'development',
  },
  {
    id: '3',
    title: 'Write Tests',
    preview: 'Write comprehensive tests for this module including edge cases...',
    category: 'testing',
  },
  {
    id: '4',
    title: 'Documentation',
    preview: 'Generate documentation for this API including examples...',
    category: 'docs',
  },
];

const BREATH_DURATION = 6;

export function PromptsView() {
  return (
    <div>
      <motion.header
        className="mb-8"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-light tracking-tight text-[--text-primary]">
          Prompts
        </h1>
        <p className="mt-1 text-sm text-[--text-secondary]">
          {mockPrompts.length} saved templates
        </p>
      </motion.header>

      <motion.div
        className="grid gap-3 sm:grid-cols-2"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {mockPrompts.map((prompt, index) => (
          <motion.button
            key={prompt.id}
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
              <p className="font-medium text-[--text-primary]">{prompt.title}</p>
              <span className="rounded bg-[--surface-sunken] px-2 py-0.5 text-[10px] text-[--text-secondary]">
                {prompt.category}
              </span>
            </div>
            <p className="mt-2 line-clamp-2 text-sm text-[--text-secondary]">
              {prompt.preview}
            </p>
          </motion.button>
        ))}

        {/* Add new prompt */}
        <motion.button
          variants={spatialEntry}
          className="flex min-h-[100px] items-center justify-center rounded-xl border-2 border-dashed border-[--surface-sunken] text-[--text-ephemeral] transition-colors hover:border-[--text-secondary] hover:text-[--text-secondary]"
          whileHover={{ scale: 1.01 }}
        >
          + New Prompt
        </motion.button>
      </motion.div>
    </div>
  );
}
