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

          <div className={styles.bottomBar}>
            <div className={styles.barLeft}>
              <div className={styles.barIcon}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M10.8,21.5C9.3,21,2,14.6,2,10.5C2,5.8,6.5,2,12,2s10,3.8,10,8.5c0,4.1-7.3,10.5-8.8,11.5L12,22L10.8,21.5z M12,19c1.5-1.1,8-7.5,8-8.5c0-3.6-3.6-6.5-8-6.5S4,6.9,4,10.5c0,1,6.5,7.4,8,8.5V19z M11,7h2v9h-2V7z M7.5,8.5h1.5v6H7.5V8.5z M15,8.5h1.5v6H15V8.5z" />
                </svg>
              </div>
              <div className={styles.barText}>
                <h3 className={styles.barTitle}>ĐỒNG HÀNH – HỖ TRỢ – PHÁT TRIỂN</h3>
                <p className={styles.barSubtitle}>O Hoèn luôn sát cánh cùng bạn trên con đường thành công!</p>
              </div>
            </div>
            <button className={styles.barButton}>
              <svg className={styles.phoneIcon} viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z" />
              </svg>
              TƯ VẤN NHƯỢNG QUYỀN
              <svg className={styles.arrowIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
