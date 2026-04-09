import React from 'react';
import { FranchiseHeroSectionProps } from '../../types';
import HeroImage from '../HeroImage';
import styles from './FranchiseHeroSection.module.css';

/**
 * Franchise Hero Section component with image and centered title overlay
 * Requirements: 6.1, 6.5, 6.6, 9.1, 9.6
 */
const FranchiseHeroSection: React.FC<FranchiseHeroSectionProps> = ({
  imageSrc,
  imageAlt,
  title = 'FRANCHISE'
}) => {
  return (
    <section className={styles.heroSection} role="main">
      <div className={styles.imageWrapper}>
        <HeroImage
          src={imageSrc}
          alt={imageAlt}
          loading="eager"
          aspectRatio="16/9"
        />
      </div>
      <h1 className={styles.heroTitle}>{title}</h1>
    </section>
  );
};

export default FranchiseHeroSection;
