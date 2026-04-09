/**
 * Contrast Ratio Verification Tests for Franchise Page
 * 
 * These tests verify that all color combinations meet WCAG AA standards.
 * Requirements: 10.1, 10.2, 10.3, 10.5
 */

import { describe, it, expect } from 'vitest';

/**
 * Calculate relative luminance from RGB values
 * Based on WCAG 2.1 formula
 */
function getRelativeLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map(val => {
    const sRGB = val / 255;
    return sRGB <= 0.03928
      ? sRGB / 12.92
      : Math.pow((sRGB + 0.055) / 1.055, 2.4);
  });
  
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calculate contrast ratio between two colors
 * Returns ratio as a number (e.g., 4.5 for 4.5:1)
 */
function getContrastRatio(
  rgb1: [number, number, number],
  rgb2: [number, number, number]
): number {
  const lum1 = getRelativeLuminance(...rgb1);
  const lum2 = getRelativeLuminance(...rgb2);
  
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Convert hex color to RGB tuple
 */
function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) {
    throw new Error(`Invalid hex color: ${hex}`);
  }
  return [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16),
  ];
}

// Color constants from design specification
const COLORS = {
  white: '#FFFFFF',
  grayBlack: '#1F2937',
  red: '#DC2626',
};

describe('Franchise Page Contrast Ratios', () => {
  describe('Navigation Menu Colors', () => {
    it('should meet WCAG AA for inactive navigation text (gray-black on white)', () => {
      // Requirement 10.1
      const ratio = getContrastRatio(
        hexToRgb(COLORS.grayBlack),
        hexToRgb(COLORS.white)
      );
      
      // WCAG AA requires 4.5:1 for normal text
      expect(ratio).toBeGreaterThanOrEqual(4.5);
      
      // Verify it matches expected ratio (approximately 12.23:1)
      expect(ratio).toBeGreaterThan(11);
    });

    it('should meet WCAG AA for active navigation text (red on white)', () => {
      // Requirement 10.1
      const ratio = getContrastRatio(
        hexToRgb(COLORS.red),
        hexToRgb(COLORS.white)
      );
      
      // WCAG AA requires 4.5:1 for normal text
      expect(ratio).toBeGreaterThanOrEqual(4.5);
      
      // Verify it matches expected ratio (approximately 4.83:1)
      expect(ratio).toBeCloseTo(4.83, 1);
    });
  });

  describe('CTA Button Colors', () => {
    it('should meet WCAG AA for ORDER PICKUP button (red on white)', () => {
      // Requirement 10.2
      const ratio = getContrastRatio(
        hexToRgb(COLORS.red),
        hexToRgb(COLORS.white)
      );
      
      // WCAG AA requires 4.5:1 for normal text
      expect(ratio).toBeGreaterThanOrEqual(4.5);
      
      // Verify it matches expected ratio (approximately 4.83:1)
      expect(ratio).toBeCloseTo(4.83, 1);
    });

    it('should meet WCAG AA for ORDER DELIVERY button (white on red)', () => {
      // Requirement 10.3
      const ratio = getContrastRatio(
        hexToRgb(COLORS.white),
        hexToRgb(COLORS.red)
      );
      
      // WCAG AA requires 4.5:1 for normal text
      expect(ratio).toBeGreaterThanOrEqual(4.5);
      
      // Verify it matches expected ratio (approximately 4.83:1)
      expect(ratio).toBeCloseTo(4.83, 1);
    });
  });

  describe('Hamburger Icon Colors', () => {
    it('should meet WCAG AA for hamburger icon (red on white)', () => {
      // Requirement 10.5
      const ratio = getContrastRatio(
        hexToRgb(COLORS.red),
        hexToRgb(COLORS.white)
      );
      
      // WCAG AA requires 3:1 for UI components (graphical objects)
      // Note: We're exceeding this with 4.52:1
      expect(ratio).toBeGreaterThanOrEqual(3.0);
      
      // Verify it also meets text contrast requirements
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    });
  });

  describe('Contrast Ratio Calculations', () => {
    it('should calculate correct relative luminance for white', () => {
      const lum = getRelativeLuminance(255, 255, 255);
      expect(lum).toBeCloseTo(1.0, 2);
    });

    it('should calculate correct relative luminance for black', () => {
      const lum = getRelativeLuminance(0, 0, 0);
      expect(lum).toBeCloseTo(0.0, 2);
    });

    it('should calculate correct relative luminance for gray-black', () => {
      const [r, g, b] = hexToRgb(COLORS.grayBlack);
      const lum = getRelativeLuminance(r, g, b);
      
      // Expected luminance for #1F2937 is approximately 0.0215
      expect(lum).toBeGreaterThan(0.02);
      expect(lum).toBeLessThan(0.03);
    });

    it('should calculate correct relative luminance for red', () => {
      const [r, g, b] = hexToRgb(COLORS.red);
      const lum = getRelativeLuminance(r, g, b);
      
      // Expected luminance for #DC2626 is approximately 0.1827
      expect(lum).toBeGreaterThan(0.15);
      expect(lum).toBeLessThan(0.20);
    });
  });

  describe('WCAG Compliance Summary', () => {
    it('should have all color combinations meet or exceed WCAG AA standards', () => {
      const combinations = [
        {
          name: 'Navigation text (inactive)',
          fg: COLORS.grayBlack,
          bg: COLORS.white,
          required: 4.5,
        },
        {
          name: 'Navigation text (active)',
          fg: COLORS.red,
          bg: COLORS.white,
          required: 4.5,
        },
        {
          name: 'ORDER PICKUP button',
          fg: COLORS.red,
          bg: COLORS.white,
          required: 4.5,
        },
        {
          name: 'ORDER DELIVERY button',
          fg: COLORS.white,
          bg: COLORS.red,
          required: 4.5,
        },
        {
          name: 'Hamburger icon',
          fg: COLORS.red,
          bg: COLORS.white,
          required: 3.0,
        },
      ];

      combinations.forEach(({ name, fg, bg, required }) => {
        const ratio = getContrastRatio(hexToRgb(fg), hexToRgb(bg));
        expect(ratio, `${name} should meet ${required}:1 ratio`).toBeGreaterThanOrEqual(required);
      });
    });
  });
});
