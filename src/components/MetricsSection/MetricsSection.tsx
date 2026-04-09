import React, { useState, useEffect, useRef } from 'react';
import styles from './MetricsSection.module.css';

interface Metric {
  icon: 'soup' | 'droplet' | 'star';
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

interface MetricsSectionProps {
  metrics?: Metric[];
}

const defaultMetrics: Metric[] = [
  {
    icon: 'soup',
    value: 100000,
    prefix: '>',
    label: 'Tô cháo được phục vụ'
  },
  {
    icon: 'droplet',
    value: 1000,
    prefix: '>',
    suffix: 'L',
    label: 'Nước mắm Nam Ô sử dụng'
  },
  {
    icon: 'star',
    value: 1000,
    prefix: '~',
    suffix: '+',
    label: 'Đánh giá tích cực'
  }
];

// SVG Icons
const SoupIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z"/>
    <path d="M7 21h10"/>
    <path d="M19.5 12 22 6"/>
    <path d="M16.25 3c.27.1.8.53.75 1.36-.06.83-.93 1.2-1 2.02-.05.78.34 1.24.73 1.62"/>
    <path d="M11.25 3c.27.1.8.53.74 1.36-.05.83-.93 1.2-.98 2.02-.06.78.33 1.24.72 1.62"/>
    <path d="M6.25 3c.27.1.8.53.75 1.36-.06.83-.93 1.2-1 2.02-.05.78.34 1.24.74 1.62"/>
  </svg>
);

const DropletIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
  </svg>
);

const StarIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

const getIcon = (iconType: string) => {
  switch (iconType) {
    case 'soup':
      return <SoupIcon />;
    case 'droplet':
      return <DropletIcon />;
    case 'star':
      return <StarIcon />;
    default:
      return <StarIcon />;
  }
};

// Counter animation hook
const useCountUp = (end: number, duration: number = 2000, isVisible: boolean) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    const startValue = 0;

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * (end - startValue) + startValue);
      
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration, isVisible]);

  return count;
};

// Format number with dots
const formatNumber = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

/**
 * Metrics Section component
 * Displays key metrics with animated cards and counting animation
 */
const MetricsSection: React.FC<MetricsSectionProps> = ({ 
  metrics = defaultMetrics 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.metricsSection}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {metrics.map((metric, index) => {
            const animatedValue = useCountUp(metric.value, 2000, isVisible);
            
            return (
              <div key={index} className={styles.card}>
                {/* Card content */}
                <div className={styles.content}>
                  {/* Icon */}
                  <div className={styles.iconWrapper}>
                    {getIcon(metric.icon)}
                  </div>
                  
                  {/* Value */}
                  <div className={styles.valueWrapper}>
                    <div className={styles.valueContainer}>
                      {metric.prefix && (
                        <span className={styles.prefix}>{metric.prefix}</span>
                      )}
                      <h3 className={styles.value}>
                        {formatNumber(animatedValue)}
                      </h3>
                      {metric.suffix && (
                        <span className={styles.suffix}>{metric.suffix}</span>
                      )}
                    </div>
                    <p className={styles.label}>{metric.label}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MetricsSection;
