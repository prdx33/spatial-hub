import { getGrainDataUri } from '@/lib/grain';

/**
 * GrainOverlay - Fine texture filter
 *
 * Creates a subtle noise overlay that adds tactile quality
 * to the monochromatic surface. Uses mix-blend-mode for
 * natural integration without affecting interactivity.
 */
export function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50"
      style={{
        backgroundImage: getGrainDataUri(0.03),
        backgroundRepeat: 'repeat',
        mixBlendMode: 'overlay',
      }}
    />
  );
}
