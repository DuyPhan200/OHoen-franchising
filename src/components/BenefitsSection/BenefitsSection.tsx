import React, { useEffect, useRef, useState } from 'react';
import styles from './BenefitsSection.module.css';

const BenefitsSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (gridRef.current) {
      observer.observe(gridRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const benefits = [
    "Không mất thời gian thử nghiệm.",
    "Đã có tệp khách hàng trung thành.",
    "Quy trình đơn giản, vận hành được ngay.",
    "Miễn phí nhượng quyền (5 cửa hàng đầu tiên).",
    "Đồng hành marketing, thiết kế ấn phẩm.",
    "Hệ thống quản lý vận hành chuyên nghiệp."
  ];

  return (
    <section className={styles.section}>
      <div className={styles.bgWrapper}>
        <img src="/BenefitsSection/1.svg" className={styles.bgImage} alt="background" />
      </div>
      
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>QUYỀN LỢI CHO NHÀ ĐẦU TƯ</h2>
          
          <div className={styles.grid} ref={gridRef}>
            {benefits.map((text, index) => (
              <div 
                key={index} 
                className={`${styles.benefitBlock} ${isVisible ? styles.animate : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={styles.benefitInner}>
                  <div className={styles.checkIcon}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <p className={styles.benefitText}>{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
