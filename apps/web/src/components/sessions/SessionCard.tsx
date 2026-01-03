import { motion } from 'framer-motion';
import { depthLevels, edgeGlow } from '@/lib/shadows';
import { gimbalSpring } from '@/lib/spring';
import {
  type Session,
  getStatusColor,
  formatTimeAgo,
} from '@/lib/sessions';

interface SessionCardProps {
  session: Session;
  onSelect: (id: string) => void;
  index: number;
}

// Shared breath - 6 second cycle, all cards move together
const BREATH_DURATION = 6;

export function SessionCard({ session, onSelect, index }: SessionCardProps) {
  // Tiny individual offset so cards aren't perfectly identical
  // but still feel like one organism breathing
  const microOffset = index * 0.15;

  return (
    <motion.button
      onClick={() => onSelect(session.id)}
      className="relative w-full cursor-pointer rounded-xl bg-[--surface-raised] p-4 text-left"
      style={{
        boxShadow: `${depthLevels.raised}, ${edgeGlow}`,
      }}
      animate={{
        y: [0, -4, 0],
        scale: [1, 1.003, 1],
      }}
      transition={{
        duration: BREATH_DURATION,
        ease: 'easeInOut',
        repeat: Infinity,
        delay: microOffset,
      }}
      whileHover={{
        y: -6,
        scale: 1.01,
        boxShadow: `${depthLevels.floating}, ${edgeGlow}`,
        transition: { duration: 0.4, ease: 'easeOut' },
      }}
      whileTap={{ scale: 0.99 }}
      layout
      layoutId={`session-${session.id}`}
    >
      {/* Status indicator */}
      <motion.div
        className="absolute right-4 top-4 h-2 w-2 rounded-full"
        style={{ backgroundColor: getStatusColor(session.status) }}
        animate={
          session.status === 'active'
            ? { scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }
            : {}
        }
        transition={{ repeat: Infinity, duration: 2 }}
      />

      {/* Title & Project */}
      <h3 className="pr-6 text-sm font-medium text-[--text-primary]">
        {session.title}
      </h3>
      <p className="mt-0.5 text-xs text-[--text-secondary]">
        {session.project} · {formatTimeAgo(session.lastActive)}
      </p>

      {/* Preview */}
      <p className="mt-2 line-clamp-2 text-xs text-[--text-ephemeral]">
        {session.preview}
      </p>

      {/* Context Progress Bar */}
      <div className="mt-3">
        <div className="flex items-center justify-between text-[10px] text-[--text-secondary]">
          <span>Context</span>
          <span>{session.contextUsed}%</span>
        </div>
        <div className="mt-1 h-1 overflow-hidden rounded-full bg-[--surface-sunken]">
          <motion.div
            className="h-full rounded-full"
            style={{
              backgroundColor:
                session.contextUsed > 80
                  ? 'oklch(65% 0.15 25)' // red
                  : session.contextUsed > 60
                    ? 'oklch(70% 0.12 80)' // amber
                    : 'oklch(65% 0.1 250)', // blue-grey
            }}
            initial={{ width: 0 }}
            animate={{ width: `${session.contextUsed}%` }}
            transition={gimbalSpring}
          />
        </div>
      </div>
    </motion.button>
  );
}
