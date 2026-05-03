import React from 'react';
import styles from './HeroSection.module.css';

const HeroSection: React.FC = () => {
  return (
    <section className={styles.heroSection}>


      <div className={styles.heroBody}>
        <div className={styles.heroContent}>
          {/* Top Left Logo Area */}
          <div className={styles.heroTopLogo}>
            <img src="/Logo1.svg" alt="Shell Icon" className={styles.shellIcon} />
            <div className={styles.logoBrandName}>
              <span className={styles.logoScript}>O Hoèn</span>
              <span className={styles.logoSub}>CHÁO NGHÊU</span>
            </div>
          </div>

          {/* Main Content Block */}
          <h1 className={styles.heroTitleMain}>NHƯỢNG QUYỀN</h1>

          <div className={styles.heroBrandWrap}>
            <span className={styles.heroBrandText}>Cháo Nghêu</span>
            <span className={styles.heroBrandScript}>O Hoèn</span>
          </div>

          <div className={styles.heroDividerLine}></div>

          <p className={styles.heroDescription}>
            <strong>
              Góp phần giữ gìn và phát triển<br className={styles.mobileOnly} />
              ẩm thực truyền thống, đặc sản<br className={styles.mobileOnly} />
              làng nghề văn hoá địa phương.
            </strong>
          </p>

          <button className={styles.heroCTA}>
            TÌM HIỂU NGAY
            <svg className={styles.ctaArrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
