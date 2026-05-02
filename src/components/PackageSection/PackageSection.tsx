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
      <div className={styles.bgWrapper}></div>

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
                <span className={styles.packageLabel}>GÓI 01</span>
                <h3 className={styles.packageMainTitle}>CHUYÊN NGHIỆP</h3>
              </div>
              <div className={styles.packageBody}>
                <div className={styles.mainFeeBox}>
                  <div className={styles.feeLabel}>PHÍ NHƯỢNG QUYỀN</div>
                  <div className={styles.feeValue}>120 <span className={styles.million}>Triệu</span></div>
                  <div className={styles.feeNote}>Thanh toán 1 lần - Hiệu lực 3 năm</div>
                </div>

                <div className={styles.feeSpecs}>
                  <div className={styles.specItem}>
                    <div className={styles.iconCircle}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div className={styles.specText}>
                      <div className={styles.specLabel}>Royalty Fee</div>
                      <div className={styles.specValue}>6% <span className={styles.specUnit}>DT / tháng</span></div>
                    </div>
                  </div>
                  <div className={styles.specItem}>
                    <div className={styles.iconCircle}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" strokeLinecap="round" strokeLinejoin="round" />
                        <polyline points="3.27 6.96 12 12.01 20.73 6.96" strokeLinecap="round" strokeLinejoin="round" />
                        <line x1="12" y1="22.08" x2="12" y2="12" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div className={styles.specText}>
                      <div className={styles.specLabel}>Giá nhập NVL ưu đãi</div>
                      <div className={styles.specValue}>~40% <span className={styles.specUnit}>doanh thu</span></div>
                    </div>
                  </div>
                  <div className={styles.specItem}>
                    <div className={styles.iconCircle}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 20.94c1.88-1.1 3.95-2.45 5.13-3.93a7.33 7.33 0 0 0 1.87-4.8c0-3.77-3.25-6.32-7-6.32s-7 2.55-7 6.32c0 1.7.67 3.4 1.87 4.8 1.18 1.48 3.25 2.83 5.13 3.93z" strokeLinecap="round" strokeLinejoin="round" />
                        <circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div className={styles.specText}>
                      <div className={styles.specLabel}>Phí Marketing</div>
                      <div className={styles.specValue}>2% <span className={styles.specUnit}>DT / tháng</span></div>
                    </div>
                  </div>
                </div>

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
              </div>
            </div>

            {/* Package 2 */}
            <div className={`${styles.packageCard} ${styles.featuredCard}`}>
              <div className={styles.packageHeader}>
                <span className={styles.packageLabel}>GÓI 02</span>
                <h3 className={styles.packageMainTitle}>LINH HOẠT</h3>
              </div>
              <div className={styles.packageBody}>
                <div className={styles.mainFeeBox}>
                  <div className={styles.feeLabel}>PHÍ NHƯỢNG QUYỀN</div>
                  <div className={styles.feeValue}>0 <span className={styles.million}>VNĐ</span></div>
                  <div className={styles.feeNote}>Khởi nghiệp với chi phí tối thiểu</div>
                </div>

                <div className={styles.feeSpecs}>
                  <div className={styles.specItem}>
                    <div className={styles.iconCircle}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div className={styles.specText}>
                      <div className={styles.specLabel}>Royalty Fee</div>
                      <div className={styles.specValue}>0%</div>
                    </div>
                  </div>
                  <div className={styles.specItem}>
                    <div className={styles.iconCircle}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" strokeLinecap="round" strokeLinejoin="round" />
                        <polyline points="3.27 6.96 12 12.01 20.73 6.96" strokeLinecap="round" strokeLinejoin="round" />
                        <line x1="12" y1="22.08" x2="12" y2="12" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div className={styles.specText}>
                      <div className={styles.specLabel}>Giá nhập NVL linh hoạt</div>
                      <div className={styles.specValue}>~50% <span className={styles.specUnit}>doanh thu</span></div>
                    </div>
                  </div>
                  <div className={styles.specItem}>
                    <div className={styles.iconCircle}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 20.94c1.88-1.1 3.95-2.45 5.13-3.93a7.33 7.33 0 0 0 1.87-4.8c0-3.77-3.25-6.32-7-6.32s-7 2.55-7 6.32c0 1.7.67 3.4 1.87 4.8 1.18 1.48 3.25 2.83 5.13 3.93z" strokeLinecap="round" strokeLinejoin="round" />
                        <circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div className={styles.specText}>
                      <div className={styles.specLabel}>Phí Marketing</div>
                      <div className={styles.specValue}>0 <span className={styles.specUnit}>VNĐ</span></div>
                    </div>
                  </div>
                </div>

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
              </div>
            </div>
          </div>
        </div>

        <div className={styles.rowDivider}></div>

        {/* Row 2: Investment Costs */}
        <div className={styles.modelRow}>
          <div className={styles.sectionHeader}>
            <div className={styles.brandAccent}>Cùng O Hoèn</div>
            <h2 className={styles.columnTitle}>MÔ HÌNH VẬN HÀNH TIÊU CHUẨN</h2>
          </div>

          <div className={styles.modelMainBox}>
            <div className={styles.costTable}>
              {/* Row 1 */}
              <div className={styles.tableRow}>
                <div className={styles.labelCell}>
                  SỐ LƯỢNG BÀN
                </div>
                <div className={styles.valueCell}>
                  6 bàn (~24 khách)
                </div>
              </div>

              {/* Row 2 */}
              <div className={styles.tableRow}>
                <div className={styles.labelCell}>
                  TỔNG DIỆN TÍCH SÀN
                </div>
                <div className={styles.valueCell}>
                  40m2
                </div>
              </div>

              {/* Row 3 */}
              <div className={styles.tableRow}>
                <div className={styles.labelCell}>
                  Diện tích bếp + Quầy order
                </div>
                <div className={styles.valueCell}>
                  6m2
                </div>
              </div>

              {/* Row 4 */}
              <div className={styles.tableRow}>
                <div className={styles.labelCell}>
                  HÌNH THỨC
                </div>
                <div className={styles.valueCell}>
                  Tại chỗ, mang về,<br />Food App
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PackageSection;
