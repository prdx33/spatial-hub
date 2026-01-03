import { motion } from 'framer-motion';

/**
 * InfiniteCanvas - Endless 3D space background
 *
 * Creates the illusion of depth with a subtle perspective grid
 * that fades into the distance. The space feels boundless.
 */
export function InfiniteCanvas() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {/* Radial depth gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(
              ellipse 120% 100% at 50% -20%,
              oklch(98% 0.003 250) 0%,
              oklch(95% 0.005 250) 30%,
              oklch(92% 0.008 250) 70%,
              oklch(88% 0.01 250) 100%
            )
          `,
        }}
      />

      {/* Perspective grid floor */}
      <div
        className="absolute inset-0"
        style={{
          perspective: '1000px',
          perspectiveOrigin: '50% 30%',
        }}
      >
        <motion.div
          className="absolute left-[-50%] right-[-50%] top-[40%] h-[200%]"
          style={{
            transformStyle: 'preserve-3d',
            transform: 'rotateX(75deg)',
            backgroundImage: `
              linear-gradient(to right, oklch(0% 0 0 / 0.03) 1px, transparent 1px),
              linear-gradient(to bottom, oklch(0% 0 0 / 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 40%, transparent 90%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 10%, black 40%, transparent 90%)',
          }}
          animate={{
            backgroundPosition: ['0px 0px', '0px 80px'],
          }}
          transition={{
            duration: 20,
            ease: 'linear',
            repeat: Infinity,
          }}
        />
      </div>

      {/* Subtle horizon glow */}
      <div
        className="absolute inset-x-0 top-[35%] h-64"
        style={{
          background: `
            radial-gradient(
              ellipse 80% 100% at 50% 100%,
              oklch(100% 0 0 / 0.04) 0%,
              transparent 70%
            )
          `,
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(
              ellipse 70% 60% at 50% 50%,
              transparent 0%,
              oklch(0% 0 0 / 0.03) 100%
            )
          `,
        }}
      />
    </div>
  );
}
