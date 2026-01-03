import { motion, type HTMLMotionProps } from 'framer-motion';
import { depthLevels, type DepthLevel } from '@/lib/shadows';

interface PanelProps extends HTMLMotionProps<'div'> {
  /** Elevation level for shadow depth */
  depth?: DepthLevel;
  /** Whether to animate depth on hover */
  interactive?: boolean;
}

/**
 * Panel - Depth-aware container
 *
 * A surface with precise shadow depth that can optionally
 * respond to interaction with elevation changes.
 */
export function Panel({
  depth = 'raised',
  interactive = true,
  className = '',
  children,
  ...props
}: PanelProps) {
  return (
    <motion.div
      className={`rounded-lg bg-[--surface-raised] p-6 ${className}`}
      style={{ boxShadow: depthLevels[depth] }}
      whileHover={
        interactive
          ? {
              boxShadow: depthLevels.floating,
              y: -2,
              transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
            }
          : undefined
      }
      whileTap={
        interactive
          ? {
              boxShadow: depthLevels.raised,
              y: 0,
              transition: { duration: 0.1 },
            }
          : undefined
      }
      {...props}
    >
      {children}
    </motion.div>
  );
}
