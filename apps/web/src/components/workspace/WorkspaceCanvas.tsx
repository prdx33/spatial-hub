import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { SessionsGrid } from '@/components/sessions/SessionsGrid';
import { FocalSession } from '@/components/sessions/FocalSession';
import { InfiniteCanvas } from '@/components/spatial/InfiniteCanvas';
import { Sidebar } from '@/components/layout/Sidebar';
import { DirectoriesView } from '@/components/views/DirectoriesView';
import { PromptsView } from '@/components/views/PromptsView';
import { SkillsView } from '@/components/views/SkillsView';
import { ClaudeMdView } from '@/components/views/ClaudeMdView';
import { McpsView } from '@/components/views/McpsView';
import { mockSessions } from '@/lib/sessions';
import { type HubSection } from '@/lib/navigation';
import { heavySpring } from '@/lib/spring';

type SessionView = 'overview' | 'focal';

export function WorkspaceCanvas() {
  const [activeSection, setActiveSection] = useState<HubSection>('sessions');
  const [sessionView, setSessionView] = useState<SessionView>('overview');
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);

  const selectedSession = mockSessions.find((s) => s.id === selectedSessionId);

  const handleSelectSession = (id: string) => {
    setSelectedSessionId(id);
    setSessionView('focal');
  };

  const handleBack = () => {
    setSessionView('overview');
    setTimeout(() => setSelectedSessionId(null), 300);
  };

  const handleNavigate = (section: HubSection) => {
    setActiveSection(section);
    // Reset session view when navigating away
    if (section !== 'sessions') {
      setSessionView('overview');
      setSelectedSessionId(null);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <InfiniteCanvas />
      <Sidebar activeSection={activeSection} onNavigate={handleNavigate} />

      {/* Main content area */}
      <motion.div
        className="ml-20 min-h-screen px-8 py-8"
        animate={{
          scale: sessionView === 'focal' ? 1 : 0.98,
          y: sessionView === 'focal' ? 0 : 10,
        }}
        transition={heavySpring}
      >
        <div className="mx-auto max-w-4xl">
          <AnimatePresence mode="wait">
            {/* Sessions */}
            {activeSection === 'sessions' && sessionView === 'overview' && (
              <motion.div
                key="sessions-overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={heavySpring}
              >
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

                <SessionsGrid
                  sessions={mockSessions}
                  onSelectSession={handleSelectSession}
                />

                <motion.button
                  className="mt-6 w-full rounded-xl border-2 border-dashed border-[--surface-sunken] py-4 text-sm text-[--text-ephemeral] transition-colors hover:border-[--text-secondary] hover:text-[--text-secondary]"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  + New Session
                </motion.button>
              </motion.div>
            )}

            {activeSection === 'sessions' && sessionView === 'focal' && selectedSession && (
              <motion.div
                key="sessions-focal"
                className="h-[calc(100vh-4rem)]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={heavySpring}
              >
                <FocalSession session={selectedSession} onBack={handleBack} />
              </motion.div>
            )}

            {/* Directories */}
            {activeSection === 'directories' && (
              <motion.div
                key="directories"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={heavySpring}
              >
                <DirectoriesView />
              </motion.div>
            )}

            {/* Prompts */}
            {activeSection === 'prompts' && (
              <motion.div
                key="prompts"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={heavySpring}
              >
                <PromptsView />
              </motion.div>
            )}

            {/* Skills */}
            {activeSection === 'skills' && (
              <motion.div
                key="skills"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={heavySpring}
              >
                <SkillsView />
              </motion.div>
            )}

            {/* CLAUDE.md */}
            {activeSection === 'claude-md' && (
              <motion.div
                key="claude-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={heavySpring}
              >
                <ClaudeMdView />
              </motion.div>
            )}

            {/* MCPs */}
            {activeSection === 'mcps' && (
              <motion.div
                key="mcps"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={heavySpring}
              >
                <McpsView />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
