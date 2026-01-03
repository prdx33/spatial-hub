import { motion } from 'framer-motion';
import { depthLevels, insetDepth } from '@/lib/shadows';
import { heavySpring, gimbalSpring } from '@/lib/spring';
import { type Session, getStatusColor, formatTimeAgo } from '@/lib/sessions';

interface FocalSessionProps {
  session: Session;
  onBack: () => void;
}

export function FocalSession({ session, onBack }: FocalSessionProps) {
  return (
    <motion.div
      className="flex h-full flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={gimbalSpring}
    >
      {/* Header */}
      <motion.div
        className="mb-4 flex items-center gap-4"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={heavySpring}
      >
        <motion.button
          onClick={onBack}
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-[--surface-sunken] text-[--text-secondary] hover:bg-[--surface-base] hover:text-[--text-primary]"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ boxShadow: insetDepth.subtle }}
        >
          ←
        </motion.button>

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-medium text-[--text-primary]">
              {session.title}
            </h1>
            <motion.div
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: getStatusColor(session.status) }}
              animate={
                session.status === 'active'
                  ? { scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }
                  : {}
              }
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </div>
          <p className="text-xs text-[--text-secondary]">
            {session.project} · {formatTimeAgo(session.lastActive)}
          </p>
        </div>

        {/* Context bar */}
        <div className="w-32">
          <div className="flex justify-between text-[10px] text-[--text-secondary]">
            <span>Context</span>
            <span>{session.contextUsed}%</span>
          </div>
          <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-[--surface-sunken]">
            <motion.div
              className="h-full rounded-full"
              style={{
                backgroundColor:
                  session.contextUsed > 80
                    ? 'oklch(65% 0.15 25)'
                    : session.contextUsed > 60
                      ? 'oklch(70% 0.12 80)'
                      : 'oklch(65% 0.1 250)',
              }}
              initial={{ width: 0 }}
              animate={{ width: `${session.contextUsed}%` }}
              transition={gimbalSpring}
            />
          </div>
        </div>
      </motion.div>

      {/* Chat area */}
      <motion.div
        className="flex-1 overflow-hidden rounded-lg bg-[--surface-raised]"
        style={{ boxShadow: depthLevels.raised }}
        layoutId={`session-${session.id}`}
        transition={heavySpring}
      >
        <div className="flex h-full flex-col">
          {/* Messages area */}
          <div className="flex-1 overflow-y-auto p-6">
            <motion.div
              className="text-sm text-[--text-secondary]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, ...gimbalSpring }}
            >
              {session.preview}
            </motion.div>
          </div>

          {/* Input area */}
          <motion.div
            className="border-t border-[--surface-sunken] p-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, ...heavySpring }}
          >
            <div
              className="flex items-center gap-3 rounded-lg bg-[--surface-base] px-4 py-3"
              style={{ boxShadow: insetDepth.subtle }}
            >
              <input
                type="text"
                placeholder="Continue the conversation..."
                className="flex-1 bg-transparent text-sm text-[--text-primary] placeholder:text-[--text-ephemeral] focus:outline-none"
              />
              <span className="text-xs text-[--text-ephemeral]">⌘↵</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
