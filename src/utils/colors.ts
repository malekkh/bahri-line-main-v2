/**
 * Color Utilities
 * Helper functions and utilities for working with the app's color palette
 */

import { COLORS, SEMANTIC_COLORS } from '@/config/constants';

/**
 * Get a color from the palette by name
 */
export const getColor = (colorName: keyof typeof COLORS): string => {
  return COLORS[colorName];
};

/**
 * Get a semantic color by name
 */
export const getSemanticColor = (semanticName: keyof typeof SEMANTIC_COLORS): string => {
  if (semanticName === 'neutral') {
    throw new Error('Use getNeutralColor for neutral colors');
  }
  return SEMANTIC_COLORS[semanticName] as string;
};

/**
 * Get a neutral color by shade (50-900)
 */
export const getNeutralColor = (shade: keyof typeof SEMANTIC_COLORS.neutral): string => {
  return SEMANTIC_COLORS.neutral[shade];
};

/**
 * Color palette object for easy access
 */
export const colorPalette = {
  // Brand colors
  navyBlue: COLORS.NAVY_BLUE,
  black: COLORS.BLACK,
  darkCoolGray: COLORS.DARK_COOL_GRAY,
  lightCoolGray: COLORS.LIGHT_COOL_GRAY,
  orange: COLORS.ORANGE,
  blue: COLORS.BLUE,
  midnightGreen: COLORS.MIDNIGHT_GREEN,
  darkGreen: COLORS.DARK_GREEN,
  red: COLORS.RED,
  
  // Semantic colors
  primary: SEMANTIC_COLORS.primary,
  secondary: SEMANTIC_COLORS.secondary,
  accent: SEMANTIC_COLORS.accent,
  success: SEMANTIC_COLORS.success,
  warning: SEMANTIC_COLORS.warning,
  error: SEMANTIC_COLORS.error,
  info: SEMANTIC_COLORS.info,
  
  // Neutral colors
  neutral: SEMANTIC_COLORS.neutral,
} as const;

/**
 * CSS custom property names for use in styles
 */
export const cssColorVars = {
  navyBlue: 'var(--color-navy-blue)',
  black: 'var(--color-black)',
  darkCoolGray: 'var(--color-dark-cool-gray)',
  lightCoolGray: 'var(--color-light-cool-gray)',
  orange: 'var(--color-orange)',
  blue: 'var(--color-blue)',
  midnightGreen: 'var(--color-midnight-green)',
  darkGreen: 'var(--color-dark-green)',
  red: 'var(--color-red)',
  primary: 'var(--color-primary)',
  secondary: 'var(--color-secondary)',
  accent: 'var(--color-accent)',
  success: 'var(--color-success)',
  warning: 'var(--color-warning)',
  error: 'var(--color-destructive)',
  info: 'var(--color-info)',
} as const;

/**
 * Tailwind CSS class names for colors
 */
export const tailwindColors = {
  navyBlue: 'text-[#003C71]',
  black: 'text-black',
  darkCoolGray: 'text-[#53565A]',
  lightCoolGray: 'text-[#A7A8A9]',
  orange: 'text-[#FF6720]',
  blue: 'text-[#0077AA]',
  midnightGreen: 'text-[#52726F]',
  darkGreen: 'text-[#2D4046]',
  red: 'text-[#BB0012]',
} as const;

/**
 * Tailwind CSS background class names for colors
 */
export const tailwindBgColors = {
  navyBlue: 'bg-[#003C71]',
  black: 'bg-black',
  darkCoolGray: 'bg-[#53565A]',
  lightCoolGray: 'bg-[#A7A8A9]',
  orange: 'bg-[#FF6720]',
  blue: 'bg-[#0077AA]',
  midnightGreen: 'bg-[#52726F]',
  darkGreen: 'bg-[#2D4046]',
  red: 'bg-[#BB0012]',
} as const;

export default {
  getColor,
  getSemanticColor,
  getNeutralColor,
  colorPalette,
  cssColorVars,
  tailwindColors,
  tailwindBgColors,
};
