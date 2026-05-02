import React, { useEffect, useRef, useState } from 'react';
import styles from './WhyChooseUs.module.css';

const WhyChooseUs: React.FC = () => {
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

  return (
    <section className={styles.section}>
      <div className={styles.bgWrapper}>
        <img src="/WhyChooseUs/1.svg" className={styles.bgImage} alt="background" />
      </div>
      
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.header}>
            <span className={styles.eyebrow}>TẠI SAO NÊN TRỞ THÀNH</span>
            <h2 className={styles.title}>NHÀ ĐẦU TƯ <br /> CÙNG O HOÈN?</h2>
            
            <div className={styles.ornament}>
              <svg viewBox="0 0 24 24" className={styles.ornamentIcon}>
                <path d="M10.8,21.5C9.3,21,2,14.6,2,10.5C2,5.8,6.5,2,12,2s10,3.8,10,8.5c0,4.1-7.3,10.5-8.8,11.5L12,22L10.8,21.5z M12,19c1.5-1.1,8-7.5,8-8.5c0-3.6-3.6-6.5-8-6.5S4,6.9,4,10.5c0,1,6.5,7.4,8,8.5V19z M11,7h2v9h-2V7z M7.5,8.5h1.5v6H7.5V8.5z M15,8.5h1.5v6H15V8.5z" fill="currentColor" />
              </svg>
            </div>

            <p className={styles.description}>
              Cơ hội kinh doanh bền vững với mô hình đã được kiểm chứng, <br /> 
              sản phẩm chất lượng, vận hành tinh gọn và đội ngũ luôn đồng hành cùng bạn.
            </p>
          </div>

          <div className={styles.grid} ref={gridRef}>
            <div className={`${styles.item} ${isVisible ? styles.animate : ''}`} style={{ animationDelay: '0.1s' }}>
              <div className={styles.itemInner}>
                <div className={styles.iconCircle}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                    <polyline points="17 6 23 6 23 12"></polyline>
                  </svg>
                </div>
                <h3 className={styles.itemTitle}>THỊ TRƯỜNG <br /> TIỀM NĂNG</h3>
                <p className={styles.itemText}>Nhu cầu cao, tệp khách hàng rộng, phù hợp nhiều mô hình kinh doanh.</p>
              </div>
            </div>

            <div className={`${styles.item} ${isVisible ? styles.animate : ''}`} style={{ animationDelay: '0.3s' }}>
              <div className={`${styles.itemInner} ${styles.featured}`}>
                <div className={styles.iconCircle}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8" r="7"></circle>
                    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                  </svg>
                </div>
                <h3 className={styles.itemTitle}>SẢN PHẨM <br /> CHẤT LƯỢNG</h3>
                <p className={styles.itemText}>Hương vị độc đáo, dinh dưỡng, nguồn gốc rõ ràng, được khách hàng yêu thích.</p>
              </div>
            </div>

            <div className={`${styles.item} ${isVisible ? styles.animate : ''}`} style={{ animationDelay: '0.5s' }}>
              <div className={styles.itemInner}>
                <div className={styles.iconCircle}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3"></circle>
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                  </svg>
                </div>
                <h3 className={styles.itemTitle}>VẬN HÀNH <br /> TINH GỌN</h3>
                <p className={styles.itemText}>Quy trình chuẩn hóa, dễ dàng triển khai và quản lý.</p>
              </div>
            </div>

            <div className={`${styles.item} ${isVisible ? styles.animate : ''}`} style={{ animationDelay: '0.7s' }}>
              <div className={styles.itemInner}>
                <div className={styles.iconCircle}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                  </svg>
                </div>
                <h3 className={styles.itemTitle}>THƯƠNG HIỆU <br /> UY TÍN</h3>
                <p className={styles.itemText}>Thương hiệu được xây dựng bài bản, đồng hành và hỗ trợ nhà đầu tư lâu dài.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
