import { motion } from 'framer-motion';
import { SessionCard } from './SessionCard';
import { type Session } from '@/lib/sessions';
import { staggerContainer, spatialEntry } from '@/lib/animations';

interface SessionsGridProps {
  sessions: Session[];
  onSelectSession: (id: string) => void;
}

export function SessionsGrid({
  sessions,
  onSelectSession,
}: SessionsGridProps) {
  return (
    <motion.div
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {sessions.map((session, index) => (
        <motion.div key={session.id} variants={spatialEntry}>
          <SessionCard session={session} onSelect={onSelectSession} index={index} />
        </motion.div>
      ))}
    </motion.div>
  );
}
