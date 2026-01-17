import { motion } from 'framer-motion';
import { navItems, type HubSection } from '@/lib/navigation';
import { depthLevels, edgeGlow } from '@/lib/shadows';

interface SidebarProps {
  activeSection: HubSection;
  onNavigate: (section: HubSection) => void;
}

const BREATH_DURATION = 6;

export function Sidebar({ activeSection, onNavigate }: SidebarProps) {
  return (
    <motion.nav
      className="fixed left-6 top-1/2 z-40 flex flex-col gap-2"
      style={{ transform: 'translateY(-50%)' }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      {navItems.map((item, index) => {
        const isActive = activeSection === item.id;
        const microOffset = index * 0.1;

        return (
          <motion.button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`group relative flex h-10 w-10 items-center justify-center rounded-xl text-lg transition-colors ${
              isActive
                ? 'bg-[--surface-raised] text-[--text-primary]'
                : 'bg-[--surface-base] text-[--text-secondary] hover:bg-[--surface-raised] hover:text-[--text-primary]'
            }`}
            style={{
              boxShadow: isActive
                ? `${depthLevels.floating}, ${edgeGlow}`
                : depthLevels.raised,
            }}
            animate={
              isActive
                ? { y: [0, -2, 0], scale: [1, 1.02, 1] }
                : { y: 0, scale: 1 }
            }
            transition={{
              duration: BREATH_DURATION,
              ease: 'easeInOut',
              repeat: isActive ? Infinity : 0,
              delay: microOffset,
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {item.icon}

            {/* Tooltip */}
            <div className="pointer-events-none absolute left-full ml-3 flex items-center opacity-0 transition-opacity group-hover:opacity-100">
              <div
                className="whitespace-nowrap rounded-lg bg-[--surface-raised] px-3 py-2"
                style={{ boxShadow: `${depthLevels.floating}, ${edgeGlow}` }}
              >
                <p className="text-sm font-medium text-[--text-primary]">
                  {item.label}
                </p>
                <p className="text-xs text-[--text-secondary]">
                  {item.description}
                </p>
              </div>
            </div>
          </motion.button>
        );
      })}
    </motion.nav>
  );
}
