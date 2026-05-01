import React, { useEffect, useRef, useState } from 'react';
import styles from './StoreSection.module.css';

const StoreSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.bgWrapper}>
        <img src="/StoreSection/1.svg" className={styles.bgImage} alt="background" />
      </div>
      
      <div className={`${styles.container} ${isVisible ? styles.animate : ''}`}>
        <div className={styles.content}>
          <h2 className={styles.title}>HÌNH ẢNH CỬA HÀNG</h2>
        </div>
      </div>
    </section>
  );
};

export default StoreSection;
