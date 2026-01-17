import { motion } from 'framer-motion';
import { depthLevels, edgeGlow } from '@/lib/shadows';
import { staggerContainer, spatialEntry } from '@/lib/animations';

// Mock skills - will be read from ~/.claude/skills
const mockSkills = [
  {
    name: 'startup',
    description: 'Daily startup rundown with GitHub status',
    location: 'user',
  },
  {
    name: 'pm',
    description: 'Project management workflow with GitHub integration',
    location: 'user',
  },
  {
    name: 'sop',
    description: 'Create or update Standard Operating Procedures',
    location: 'user',
  },
  {
    name: 'tactile-ui',
    description: 'Apply depth-based UI enhancement to React components',
    location: 'user',
  },
  {
    name: 'context-switch',
    description: 'Transition between work contexts with minimal cognitive load',
    location: 'user',
  },
];

const BREATH_DURATION = 6;

export function SkillsView() {
  return (
    <div>
      <motion.header
        className="mb-8"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-light tracking-tight text-[--text-primary]">
          Skills
        </h1>
        <p className="mt-1 text-sm text-[--text-secondary]">
          {mockSkills.length} available skills
        </p>
      </motion.header>

      <motion.div
        className="grid gap-3"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {mockSkills.map((skill, index) => (
          <motion.div
            key={skill.name}
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
              ⚡
            </div>
            <div className="flex-1">
              <p className="font-mono text-sm font-medium text-[--text-primary]">
                /{skill.name}
              </p>
              <p className="text-xs text-[--text-secondary]">
                {skill.description}
              </p>
            </div>
            <span className="rounded bg-[--surface-sunken] px-2 py-0.5 text-[10px] text-[--text-secondary]">
              {skill.location}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
