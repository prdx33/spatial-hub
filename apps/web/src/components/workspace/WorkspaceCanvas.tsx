import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { SessionsGrid } from '@/components/sessions/SessionsGrid';
import { FocalSession } from '@/components/sessions/FocalSession';
import { InfiniteCanvas } from '@/components/spatial/InfiniteCanvas';
import { mockSessions } from '@/lib/sessions';
import { heavySpring } from '@/lib/spring';

type View = 'overview' | 'focal';

export function WorkspaceCanvas() {
  const [view, setView] = useState<View>('overview');
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);

  const selectedSession = mockSessions.find((s) => s.id === selectedSessionId);

  const handleSelectSession = (id: string) => {
    setSelectedSessionId(id);
    setView('focal');
  };

  const handleBack = () => {
    setView('overview');
    // Delay clearing selection for exit animation
    setTimeout(() => setSelectedSessionId(null), 300);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <InfiniteCanvas />
      {/* Gimbal container - the whole UI moves as one weighted unit */}
      <motion.div
        className="mx-auto min-h-screen max-w-4xl px-6 py-8"
        animate={{
          scale: view === 'focal' ? 1 : 0.98,
          y: view === 'focal' ? 0 : 20,
        }}
        transition={heavySpring}
      >
        <AnimatePresence mode="wait">
          {view === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.02, y: -20 }}
              transition={heavySpring}
            >
              {/* Header */}
              <motion.header className="mb-8">
                <h1 className="text-2xl font-light tracking-tight text-[--text-primary]">
                  Sessions
                </h1>
                <p className="mt-1 text-sm text-[--text-secondary]">
                  {mockSessions.filter((s) => s.status === 'active').length} active
                  {' · '}
                  {mockSessions.length} total
                </p>
              </motion.header>

              {/* Sessions Grid */}
              <SessionsGrid
                sessions={mockSessions}
                onSelectSession={handleSelectSession}
              />

              {/* New Session Button */}
              <motion.button
                className="mt-6 w-full rounded-lg border-2 border-dashed border-[--surface-sunken] py-4 text-sm text-[--text-ephemeral] transition-colors hover:border-[--text-secondary] hover:text-[--text-secondary]"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                + New Session
              </motion.button>
            </motion.div>
          )}

          {view === 'focal' && selectedSession && (
            <motion.div
              key="focal"
              className="h-[calc(100vh-4rem)]"
              initial={{ opacity: 0, scale: 0.98, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={heavySpring}
            >
              <FocalSession session={selectedSession} onBack={handleBack} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
