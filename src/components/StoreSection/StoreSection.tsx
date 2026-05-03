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
      {/* Original Desktop Background */}
      <div className={styles.bgWrapper}>
        <img src="/StoreSection/1.svg" className={styles.bgImage} alt="background" />
      </div>

      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>Của O Hoèn</span>
          <h2 className={styles.title}>HÌNH ẢNH <br className={styles.mobileOnly} /> CỬA HÀNG</h2>
          <div className={styles.divider}></div>
          <p className={styles.description}>
            Hệ thống cửa hàng của O Hoèn trên khắp Đà Nẵng, <br />
            luôn sẵn sàng phục vụ bạn.
          </p>
        </div>

        {/* These elements will be hidden on Desktop via CSS */}
        <div className={styles.mobileContent}>
          <div className={styles.storeGrid}>
            {[
              {
                name: 'O HOÈN – AN THƯỢNG',
                address: '08 An Thượng 37, P. Mỹ An, Q. Ngũ Hành Sơn, Đà Nẵng',
                image: '/store_01.svg'
              },
              {
                name: 'O HOÈN – LÊ THANH NGHỊ',
                address: '87 Lê Thanh Nghị, P. Hòa Cường Bắc, Q. Hải Châu, Đà Nẵng',
                image: '/store_02.svg'
              },
              {
                name: 'O HOÈN – TRIỆU NỮ VƯƠNG',
                address: '152 Triệu Nữ Vương, P. Bình Thuận, Q. Hải Châu, Đà Nẵng',
                image: '/store_01.svg'
              }
            ].map((store, index) => (
              <div key={index} className={styles.storeCard}>
                <div className={styles.storeImageWrapper}>
                  <img src={store.image} alt={store.name} className={styles.storeImage} />
                </div>
                <div className={styles.storeInfo}>
                  <div className={styles.storeHeader}>
                    <div className={styles.locIcon}>
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                      </svg>
                    </div>
                    <h3 className={styles.storeName}>{store.name}</h3>
                  </div>
                  <p className={styles.storeAddress}>{store.address}</p>
                </div>
              </div>
            ))}
          </div>

          <button className={styles.ctaButton}>
            <div className={styles.shopIcon}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20,4H4V2H20V4M21,14V12L20,7H4L3,12V14H4V20H14V14H18V20H20V14H21M12,18H6V14H12V18Z" />
              </svg>
            </div>
            <span className={styles.ctaText}>XEM TẤT CẢ CỬA HÀNG</span>
            <div className={styles.ctaArrow}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default StoreSection;
