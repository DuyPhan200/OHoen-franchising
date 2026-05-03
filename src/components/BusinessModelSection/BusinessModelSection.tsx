import React, { useEffect, useRef, useState } from 'react';
import styles from './BusinessModelSection.module.css';

const BusinessModelSection: React.FC = () => {
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

  const modelItems = [
    {
      label: 'SỐ LƯỢNG BÀN',
      value: '6 bàn (~24 khách)',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )
    },
    {
      label: 'TỔNG DIỆN TÍCH SÀN',
      value: '40m²',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18M9 3v18" />
        </svg>
      )
    },
    {
      label: 'DIỆN TÍCH BẾP + QUẦY ORDER',
      value: '6m²',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 13.87A4 4 0 0 1 7.41 7a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 7 4 4 0 0 1 18 13.87V21H6Z" />
          <line x1="6" y1="17" x2="18" y2="17" />
        </svg>
      )
    },
    {
      label: 'HÌNH THỨC',
      value: 'Tại chỗ, mang về, Food App',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.77 3.77z" />
        </svg>
      )
    }
  ];

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={`${styles.container} ${isVisible ? styles.animate : ''}`}>
        <div className={styles.header}>
          <div className={styles.headerTop}>
            <div className={styles.topLine}></div>
            <span className={styles.brandScript}>Cùng O Hoèn</span>
            <div className={styles.topLine}></div>
          </div>
          <h2 className={styles.title}>MÔ HÌNH VẬN HÀNH TIÊU CHUẨN</h2>
          <div className={styles.divider}>
            <div className={styles.line}></div>
            <div className={styles.shell}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 22C12 22 17 20 19 16C21 12 20.5 7.5 20.5 7.5C20.5 7.5 18 4 12 4C6 4 3.5 7.5 3.5 7.5C3.5 7.5 3 12 5 16C7 20 12 22 12 22Z" />
                <path d="M12 22V4" />
                <path d="M12 22C12 22 14.5 20.5 16 16.5C17.5 12.5 17 7.5 17 7.5" />
                <path d="M12 22C12 22 9.5 20.5 8 16.5C6.5 12.5 7 7.5 7 7.5" />
              </svg>
            </div>
            <div className={styles.line}></div>
          </div>
          <p className={styles.subtitle}>Hệ thống tối ưu giúp bạn vận hành dễ dàng – Hiệu quả – Đồng bộ – Dễ nhân rộng.</p>
        </div>

        <div className={styles.contentWrapper}>
          <div className={styles.mainGrid}>
            {modelItems.map((item, index) => (
              <div key={index} className={styles.modelRow}>
                <div className={styles.leftSide}>
                  <div className={styles.iconCircle}>
                    {item.icon}
                  </div>
                  <span className={styles.categoryName}>{item.label}</span>
                </div>
                <div className={styles.rightSide}>
                  <span className={styles.specValue}>{item.value}</span>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.summaryBar}>
            <div className={styles.targetIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="6" />
                <circle cx="12" cy="12" r="2" />
              </svg>
            </div>
            <div className={styles.summaryText}>
              <h4 className={styles.summaryTitle}>MÔ HÌNH TỐI ƯU – DỄ VẬN HÀNH – DỄ NHÂN RỘNG</h4>
              <p className={styles.summaryDesc}>
                Phù hợp với nhiều mặt bằng – Tiết kiệm chi phí – Tăng tối đa hiệu quả kinh doanh.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessModelSection;
