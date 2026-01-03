/**
 * Shadow System - Precise depth for tactile minimalism
 *
 * Uses layered shadows (ambient + key + deep) to create realistic elevation.
 * Contact shadows simulate the darkening where object meets surface.
 */

export const depthLevels = {
  /** Elevation 0: Flush with surface */
  flush: 'none',

  /** Elevation 1: Subtle lift (cards, panels) */
  raised: `
    0 1px 1px oklch(0% 0 0 / 0.04),
    0 2px 4px oklch(0% 0 0 / 0.06),
    0 8px 16px -4px oklch(0% 0 0 / 0.1)
  `.trim(),

  /** Elevation 2: Floating (modals, dropdowns) */
  floating: `
    0 2px 2px oklch(0% 0 0 / 0.03),
    0 4px 8px oklch(0% 0 0 / 0.06),
    0 12px 24px -4px oklch(0% 0 0 / 0.12),
    0 20px 40px -8px oklch(0% 0 0 / 0.1)
  `.trim(),

  /** Elevation 3: Prominent (focused element) */
  prominent: `
    0 2px 4px oklch(0% 0 0 / 0.02),
    0 8px 16px oklch(0% 0 0 / 0.06),
    0 24px 48px -8px oklch(0% 0 0 / 0.15),
    0 40px 80px -16px oklch(0% 0 0 / 0.12)
  `.trim(),
} as const;

/** Contact shadow - the dark spot directly beneath floating objects */
export const contactShadow = `
  0 24px 32px -16px oklch(0% 0 0 / 0.25),
  0 16px 16px -8px oklch(0% 0 0 / 0.15)
`.trim();

/** Edge glow - subtle rim light from global illumination */
export const edgeGlow = `
  inset 0 1px 0 0 oklch(100% 0 0 / 0.15),
  inset 0 0 0 1px oklch(100% 0 0 / 0.05)
`.trim();

/** Inset shadows for sunken depth illusion */
export const insetDepth = {
  subtle: 'inset 0 1px 2px var(--shadow-ambient)',
  medium: 'inset 0 2px 4px var(--shadow-key)',
} as const;

export type DepthLevel = keyof typeof depthLevels;
export type InsetDepth = keyof typeof insetDepth;
