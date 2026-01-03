/**
 * Grain/Texture System
 *
 * Generates SVG noise for fine-grain texture overlay.
 * Uses fractal noise for organic, film-like grain effect.
 */

export function generateGrainSVG(opacity: number = 0.03): string {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <filter id="grain">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.9"
          numOctaves="4"
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0"/>
      </filter>
      <rect width="100%" height="100%" filter="url(#grain)" opacity="${opacity}"/>
    </svg>
  `.trim();

  return svg;
}

/**
 * Returns a CSS-ready data URI for the grain overlay
 */
export function getGrainDataUri(opacity: number = 0.03): string {
  const svg = generateGrainSVG(opacity);
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}
