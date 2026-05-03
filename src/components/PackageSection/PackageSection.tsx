import React, { useEffect, useRef, useState } from 'react';
import styles from './PackageSection.module.css';

const PackageSection: React.FC = () => {
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
      <div className={`${styles.container} ${isVisible ? styles.animate : ''}`}>
        {/* Row 1: Franchise Packages */}
        <div className={styles.packagesRow}>
          <div className={styles.sectionHeader}>
            <div className={styles.brandAccent}>Cùng O Hoèn</div>
            <h2 className={styles.columnTitle}>CÁC GÓI NHƯỢNG QUYỀN</h2>
          </div>

          <div className={styles.packagesWrapper}>
            {/* Package 1 */}
            <div className={styles.packageCard}>
              <div className={styles.packageHeader}>
                <div className={styles.starBadge}>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="12" r="10" fill="#B28F4F" />
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="#fff" />
                  </svg>
                </div>
                <div className={styles.headerText}>
                  <span className={styles.packageLabel}>GÓI 01</span>
                  <h3 className={styles.packageMainTitle}>CHUYÊN NGHIỆP</h3>
                </div>
              </div>
              <div className={styles.packageBody}>
                <div className={styles.topStatsRow}>
                  <div className={styles.mainFeeBox}>
                    <div className={styles.feeLabel}>PHÍ NHƯỢNG QUYỀN</div>
                    <div className={styles.feeValue}>120 <span className={styles.million}>Triệu</span></div>
                    <div className={styles.feeNote}>Thanh toán 1 lần - Hiệu lực 3 năm</div>
                  </div>

                  <div className={styles.feeSpecs}>
                    <div className={styles.specItem}>
                      <div className={styles.specIcon}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 8v4l3 3" />
                        </svg>
                      </div>
                      <div className={styles.specText}>
                        <div className={styles.specLabel}>Royalty Fee</div>
                        <div className={styles.specValue}>6% <span className={styles.specUnit}>DT / tháng</span></div>
                      </div>
                    </div>
                    <div className={styles.specItem}>
                      <div className={styles.specIcon}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                          <line x1="3" y1="9" x2="21" y2="9" />
                          <line x1="9" y1="21" x2="9" y2="9" />
                        </svg>
                      </div>
                      <div className={styles.specText}>
                        <div className={styles.specLabel}>Giá nhập NVL ưu đãi</div>
                        <div className={styles.specValue}>~40% <span className={styles.specUnit}>doanh thu</span></div>
                      </div>
                    </div>
                    <div className={styles.specItem}>
                      <div className={styles.specIcon}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                      </div>
                      <div className={styles.specText}>
                        <div className={styles.specLabel}>Phí Marketing</div>
                        <div className={styles.specValue}>2% <span className={styles.specUnit}>DT / tháng</span></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.benefitsRow}>
                  <div className={styles.prosCons}>
                    <div className={styles.perksTitle}>QUYỀN LỢI ĐẶC BIỆT</div>
                    <ul className={styles.perksList}>
                      <li>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        Giá nguyên vật liệu tối ưu nhất hệ thống
                      </li>
                      <li>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        Hỗ trợ vận hành & kiểm soát chuyên sâu
                      </li>
                      <li>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        Đào tạo nhân sự bài bản theo quy trình
                      </li>
                    </ul>
                  </div>
                  <div className={styles.previewImage}>
                    <img src="/PackageSection/store_01.svg" alt="Store Preview" />
                  </div>
                </div>
              </div>
              <button className={styles.cardButtonGold}>
                <svg className={styles.btnIcon} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z" />
                </svg>
                TƯ VẤN GÓI CHUYÊN NGHIỆP
                <svg className={styles.btnArrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>

            {/* Package 2 */}
            <div className={`${styles.packageCard} ${styles.featuredCard}`}>
              <div className={styles.packageHeader}>
                <div className={styles.starBadge}>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="12" r="10" fill="#B28F4F" />
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="#fff" />
                  </svg>
                </div>
                <div className={styles.headerText}>
                  <span className={styles.packageLabel}>GÓI 02</span>
                  <h3 className={styles.packageMainTitle}>LINH HOẠT</h3>
                </div>
              </div>
              <div className={styles.packageBody}>
                <div className={styles.topStatsRow}>
                  <div className={styles.mainFeeBox}>
                    <div className={styles.feeLabel}>PHÍ NHƯỢNG QUYỀN</div>
                    <div className={styles.feeValue}>0 <span className={styles.million}>VNĐ</span></div>
                    <div className={styles.feeNote}>Khởi nghiệp với chi phí tối thiểu</div>
                  </div>

                  <div className={styles.feeSpecs}>
                    <div className={styles.specItem}>
                      <div className={styles.specIcon}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 8v4l3 3" />
                        </svg>
                      </div>
                      <div className={styles.specText}>
                        <div className={styles.specLabel}>Royalty Fee</div>
                        <div className={styles.specValue}>0%</div>
                      </div>
                    </div>
                    <div className={styles.specItem}>
                      <div className={styles.specIcon}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                          <line x1="3" y1="9" x2="21" y2="9" />
                          <line x1="9" y1="21" x2="9" y2="9" />
                        </svg>
                      </div>
                      <div className={styles.specText}>
                        <div className={styles.specLabel}>Giá nhập NVL linh hoạt</div>
                        <div className={styles.specValue}>~50% <span className={styles.specUnit}>doanh thu</span></div>
                      </div>
                    </div>
                    <div className={styles.specItem}>
                      <div className={styles.specIcon}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                      </div>
                      <div className={styles.specText}>
                        <div className={styles.specLabel}>Phí Marketing</div>
                        <div className={styles.specValue}>0 <span className={styles.specUnit}>VNĐ</span></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.benefitsRow}>
                  <div className={styles.prosCons}>
                    <div className={styles.perksTitle}>QUYỀN LỢI ĐẶC BIỆT</div>
                    <ul className={styles.perksList}>
                      <li>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        Vốn đầu tư ban đầu cực thấp
                      </li>
                      <li>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        Tự do chủ động vận hành & quản lý
                      </li>
                      <li>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        Thích hợp cho mô hình kiosk, vỉa hè
                      </li>
                    </ul>
                  </div>
                  <div className={styles.previewImage}>
                    <img src="/PackageSection/store_02.svg" alt="Store Preview" />
                  </div>
                </div>
              </div>
              <button className={styles.cardButtonWhite}>
                <svg className={styles.btnIcon} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z" />
                </svg>
                TƯ VẤN GÓI LINH HOẠT
                <svg className={styles.btnArrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>
          </div>
        </div>


      </div>
    </section>
  );
};

export default PackageSection;
