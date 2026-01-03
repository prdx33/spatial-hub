/**
 * Spring Physics - Weighted, inertial motion
 *
 * Gimbal-like movements: brief, weighted, with mass.
 */

import type { Transition } from 'framer-motion';

/** Heavy, deliberate movement - like a camera on a gimbal */
export const gimbalSpring: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
  mass: 1.2,
};

/** Snappy but with follow-through */
export const snappySpring: Transition = {
  type: 'spring',
  stiffness: 400,
  damping: 35,
  mass: 0.8,
};

/** Slow settle - for large movements */
export const heavySpring: Transition = {
  type: 'spring',
  stiffness: 200,
  damping: 28,
  mass: 1.5,
};

/** Quick micro-interactions */
export const microSpring: Transition = {
  type: 'spring',
  stiffness: 500,
  damping: 30,
  mass: 0.5,
};
