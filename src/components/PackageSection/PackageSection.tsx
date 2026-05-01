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
      <div className={styles.bgWrapper}>
        <img src="/PackageSection/1.svg" className={styles.bgImage} alt="background" />
      </div>
      
      <div className={`${styles.container} ${isVisible ? styles.animate : ''}`}>
        {/* Left Side: Franchise Packages */}
        <div className={styles.leftColumn}>
          <div className={styles.brandAccent}>Cùng O Hoèn</div>
          <h2 className={styles.columnTitle}>CÁC GÓI NHƯỢNG QUYỀN</h2>
          
          <div className={styles.packagesWrapper}>
            {/* Package 1 */}
            <div className={styles.packageCard}>
              <div className={styles.packageHeader}>GÓI 1</div>
              <div className={styles.packageBody}>
                <div className={styles.mainFeeBox}>
                  <div className={styles.feeLabel}>PHÍ NHƯỢNG QUYỀN</div>
                  <div className={styles.feeValue}>120.000.000 <span className={styles.currency}>VNĐ</span></div>
                  <div className={styles.feeNote}>Thanh toán 1 lần - hiệu lực 3 năm</div>
                </div>
                
                <div className={styles.feeSpecs}>
                  <div className={styles.specItem}>
                    <svg className={styles.specIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M14 2V8H20" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M16 13H8" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M16 17H8" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M10 9H8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <div>
                      <div className={styles.specLabel}>Royalty Fee (phí sở hữu trí tuệ)</div>
                      <div className={styles.specValue}>6% <span className={styles.specUnit}>doanh thu / tháng</span></div>
                    </div>
                  </div>
                  <div className={styles.specItem}>
                    <svg className={styles.specIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M21 7.5L12 12.5L3 7.5M21 7.5V16.5L12 21.5L3 16.5V7.5M21 7.5L12 2.5L3 7.5M12 12.5V21.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <div>
                      <div className={styles.specLabel}>Giá nhập NVL (ưu đãi thấp hơn)</div>
                      <div className={styles.specValue}>~40% <span className={styles.specUnit}>doanh thu</span></div>
                    </div>
                  </div>
                  <div className={styles.specItem}>
                    <svg className={styles.specIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M11 5L6 9H2V15H6L11 19V5Z" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M15.54 8.46C16.4774 9.39764 17.004 10.6692 17.004 11.995C17.004 13.3208 16.4774 14.5924 15.54 15.53" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M19.07 4.93C20.9447 6.80528 21.9979 9.34836 21.9979 12C21.9979 14.6516 20.9447 17.1947 19.07 19.07" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <div>
                      <div className={styles.specLabel}>Phí Marketing hàng tháng</div>
                      <div className={styles.specValue}>2% <span className={styles.specUnit}>doanh thu / tháng</span></div>
                    </div>
                  </div>
                </div>
                
                <div className={styles.prosCons}>
                  <div className={styles.prosSection}>
                    <div className={styles.prosTitle}>
                      <span className={styles.plusIcon}>✔</span> ƯU ĐIỂM
                    </div>
                    <ul className={styles.list}>
                      <li>Giá nhượng quyền vật liệu tốt hơn</li>
                      <li>Có hỗ trợ vận hành & kiểm soát hệ thống</li>
                    </ul>
                  </div>
                  <div className={styles.consSection}>
                    <div className={styles.consTitle}>
                      <span className={styles.minusIcon}>✘</span> NHƯỢC ĐIỂM
                    </div>
                    <ul className={styles.list}>
                      <li>Vốn đầu tư ban đầu cao</li>
                      <li>Bên nhượng quyền tham gia quản lý doanh thu</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Package 2 */}
            <div className={styles.packageCard}>
              <div className={styles.packageHeader}>GÓI 2</div>
              <div className={styles.packageBody}>
                <div className={styles.mainFeeBox}>
                  <div className={styles.feeLabel}>PHÍ NHƯỢNG QUYỀN</div>
                  <div className={styles.feeValue}>0 <span className={styles.currency}>VNĐ</span></div>
                </div>
                
                <div className={styles.feeSpecs}>
                  <div className={styles.specItem}>
                    <svg className={styles.specIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M14 2V8H20" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M16 13H8" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M16 17H8" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M10 9H8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <div>
                      <div className={styles.specLabel}>Royalty Fee (phí sở hữu trí tuệ)</div>
                      <div className={styles.specValue}>0%</div>
                    </div>
                  </div>
                  <div className={styles.specItem}>
                    <svg className={styles.specIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M21 7.5L12 12.5L3 7.5M21 7.5V16.5L12 21.5L3 16.5V7.5M21 7.5L12 2.5L3 7.5M12 12.5V21.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <div>
                      <div className={styles.specLabel}>Giá nhập NVL (ưu đãi thấp hơn)</div>
                      <div className={styles.specValue}>~50% <span className={styles.specUnit}>doanh thu</span></div>
                    </div>
                  </div>
                  <div className={styles.specItem}>
                    <svg className={styles.specIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M11 5L6 9H2V15H6L11 19V5Z" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M15.54 8.46C16.4774 9.39764 17.004 10.6692 17.004 11.995C17.004 13.3208 16.4774 14.5924 15.54 15.53" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M19.07 4.93C20.9447 6.80528 21.9979 9.34836 21.9979 12C21.9979 14.6516 20.9447 17.1947 19.07 19.07" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <div>
                      <div className={styles.specLabel}>Phí Marketing hàng tháng</div>
                      <div className={styles.specValue}>0 <span className={styles.specUnit}>VNĐ</span></div>
                    </div>
                  </div>
                </div>
                
                <div className={styles.prosCons}>
                  <div className={styles.prosSection}>
                    <div className={styles.prosTitle}>
                      <span className={styles.plusIcon}>✔</span> ƯU ĐIỂM
                    </div>
                    <ul className={styles.list}>
                      <li>Vốn đầu tư ban đầu thấp</li>
                      <li>Chủ động vận hành & quản lý doanh thu</li>
                    </ul>
                  </div>
                  <div className={styles.consSection}>
                    <div className={styles.consTitle}>
                      <span className={styles.minusIcon}>✘</span> NHƯỢC ĐIỂM
                    </div>
                    <ul className={styles.list}>
                      <li>Giá nguyên vật liệu cao hơn</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Operating Model */}
        <div className={styles.rightColumn}>
          <div className={styles.brandAccent}>Tối ưu vận hành</div>
          <h2 className={styles.columnTitle}>MÔ HÌNH VẬN HÀNH</h2>
          
          <div className={styles.modelMainBox}>
            <h3 className={styles.modelSubtitle}>MÔ HÌNH CỬA HÀNG TIÊU CHUẨN</h3>
            
            <div className={styles.modelDetails}>
              <div className={styles.modelLine}>
                <span className={styles.boldText}>Số lượng bàn:</span> 6 bàn (~24 khách)
              </div>
              <div className={styles.modelLine}>
                <span className={styles.boldText}>Tổng diện tích sàn:</span> 40m2
              </div>
              <div className={styles.modelLine}>
                <span className={styles.boldText}>Diện tích bếp + Quầy order:</span> 6m2
              </div>
              <div className={styles.modelLine}>
                <span className={styles.boldText}>Hình thức:</span> Tại chỗ, mang về, Food App
              </div>
            </div>
            
            <div className={styles.modelBottomGrid}>
              <div className={styles.smallCard}>
                MÔ HÌNH VẬN HÀNH<br />TINH GỌN
              </div>
              <div className={styles.smallCard}>
                TỐI ƯU CHI PHÍ<br />NHÂN SỰ
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PackageSection;
