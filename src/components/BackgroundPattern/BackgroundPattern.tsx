import React, { memo } from 'react';
import { BackgroundPatternProps } from '../../types';
import styles from './BackgroundPattern.module.css';

/**
 * Background pattern component displaying repeating "BÚN MEE" text
 * Positioned behind hero image with reduced opacity for subtle branding
 * Memoized to prevent unnecessary re-renders (Requirement 9.2)
 */
const BackgroundPattern: React.FC<BackgroundPatternProps> = ({
  text = 'BÚN MEE',
  opacity = 0.05,
}) => {
  return (
    <div
      className={styles.pattern}
      style={{ opacity }}
      aria-hidden="true"
    >
      {Array.from({ length: 20 }).map((_, index) => (
        <span key={index} className={styles.patternText}>
          {text}
        </span>
      ))}
    </div>
  );
};

export default memo(BackgroundPattern);
