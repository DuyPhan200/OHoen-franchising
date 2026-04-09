import React, { useState, memo } from 'react';
import { HeroImageProps } from '../../types';
import { logError, ErrorType, FALLBACK_IMAGE_URL } from '../../utils/errorHandling';
import styles from './HeroImage.module.css';

/**
 * Hero image component with optimization features
 * Supports lazy loading, WebP format with fallbacks, responsive srcset, blur-up loading, and aspect ratio preservation
 * Memoized to prevent unnecessary re-renders (Requirement 9.2)
 * 
 * Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 9.1, 9.2, 9.3, 9.4
 */
const HeroImage: React.FC<HeroImageProps> = ({
  src,
  alt,
  loading = 'lazy',
  placeholder,
  webpSrc,
  srcSet,
  webpSrcSet,
  aspectRatio = '16/9',
  fallbackSrc,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);
  const [retryCount, setRetryCount] = useState(0);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  /**
   * Enhanced error handler with fallback and logging
   * Requirement 4.5: Implement image load error handler with fallback
   */
  const handleError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    setIsLoading(false);
    
    // Log error with metadata
    logError(ErrorType.IMAGE_LOAD_FAILED, 'Hero image failed to load', {
      src: currentSrc,
      alt,
      retryCount,
      errorEvent: event.type,
    });

    // Try fallback image if available and not already using it
    if (fallbackSrc && currentSrc !== fallbackSrc && retryCount === 0) {
      setCurrentSrc(fallbackSrc);
      setRetryCount(1);
      return;
    }

    // Use default fallback SVG if all else fails
    if (currentSrc !== FALLBACK_IMAGE_URL) {
      setCurrentSrc(FALLBACK_IMAGE_URL);
      setRetryCount(2);
      return;
    }

    // All fallbacks exhausted
    setHasError(true);
  };

  return (
    <div 
      className={styles.imageContainer}
      style={{ aspectRatio }}
    >
      {/* Blur-up placeholder for smooth loading transition (Requirement 9.2) */}
      {isLoading && placeholder && (
        <div className={styles.placeholder}>
          <img 
            src={placeholder} 
            alt="" 
            aria-hidden="true"
            className={styles.blurPlaceholder}
          />
        </div>
      )}
      {hasError ? (
        <div className={styles.errorState} role="alert" aria-live="polite">
          <p>Unable to load image. Please check your connection and try again.</p>
        </div>
      ) : (
        <picture>
          {/* WebP format with responsive srcset for modern browsers */}
          {webpSrc && currentSrc !== FALLBACK_IMAGE_URL && (
            <source
              type="image/webp"
              srcSet={webpSrcSet || webpSrc}
              sizes="100vw"
            />
          )}
          {/* Fallback format (JPEG/PNG) with responsive srcset */}
          {srcSet && currentSrc !== FALLBACK_IMAGE_URL && (
            <source
              srcSet={srcSet}
              sizes="100vw"
            />
          )}
          {/* Final fallback img element */}
          <img
            src={currentSrc}
            alt={alt}
            loading={loading}
            onLoad={handleLoad}
            onError={handleError}
            className={`${styles.heroImage} ${!isLoading ? styles.loaded : ''}`}
            decoding="async"
          />
        </picture>
      )}
    </div>
  );
};

export default memo(HeroImage);
