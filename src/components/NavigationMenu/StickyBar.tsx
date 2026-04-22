import React, { useState, useEffect } from 'react';
import styles from './StickyBar.module.css';

const StickyBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const ctaSection = document.getElementById('cta');
    const observer = new IntersectionObserver((entries) => {
      // Hide sticky bar when CTA section is visible
      setIsVisible(!entries[0].isIntersecting);
    }, { threshold: 0.1 });

    if (ctaSection) {
      observer.observe(ctaSection);
    }

    return () => {
      if (ctaSection) {
        observer.unobserve(ctaSection);
      }
    };
  }, []);

  return (
    <div className={`${styles.stickyBar} ${isVisible ? styles.visible : ''}`}>
      <a href="#cta" className={styles.sbBtnGold}>Tư vấn miễn phí →</a>
      <a href="tel:0967564441" className={styles.sbBtnPhone}>
        <svg viewBox="0 0 24 24" className={styles.icon}>
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.96a16 16 0 006.13 6.13l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
        </svg>
        096 756 44 41
      </a>
    </div>
  );
};

export default StickyBar;
