import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';

interface SpatialTextProps {
  children: string;
  /** How long to display before dissolving (ms) */
  duration?: number;
  /** 3D perspective depth (px) */
  perspective?: number;
  /** Callback when animation completes */
  onComplete?: () => void;
  /** Additional class names */
  className?: string;
}

/**
 * SpatialText - Ephemeral 3D Typography
 *
 * Text that enters the space with subtle 3D motion,
 * holds for a duration, then gracefully dissolves.
 * The signature animation of tactile minimalism.
 */
export function SpatialText({
  children,
  duration = 3000,
  perspective = 1000,
  onComplete,
  className = '',
}: SpatialTextProps) {
  const controls = useAnimation();

  useEffect(() => {
    const sequence = async () => {
      // Enter: Scale up from depth
      await controls.start({
        opacity: 1,
        scale: 1,
        rotateX: 0,
        z: 0,
        filter: 'blur(0px)',
        transition: {
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
        },
      });

      // Hold
      await new Promise((resolve) => setTimeout(resolve, duration));

      // Exit: Fade and recede
      await controls.start({
        opacity: 0,
        scale: 0.95,
        rotateX: -5,
        z: -50,
        filter: 'blur(4px)',
        transition: {
          duration: 0.8,
          ease: [0.36, 0, 0.66, -0.56],
        },
      });

      onComplete?.();
    };

    sequence();
  }, [children, duration, controls, onComplete]);

  return (
    <div style={{ perspective }}>
      <motion.span
        initial={{
          opacity: 0,
          scale: 1.1,
          rotateX: 10,
          z: 100,
          filter: 'blur(8px)',
        }}
        animate={controls}
        style={{
          display: 'inline-block',
          transformStyle: 'preserve-3d',
        }}
        className={`text-4xl font-light tracking-tight text-[--text-primary] ${className}`}
      >
        {children}
      </motion.span>
    </div>
  );
}
