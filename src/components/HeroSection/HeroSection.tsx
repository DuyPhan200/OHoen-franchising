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
            <strong>Góp phần giữ gìn và phát triển ẩm thực truyền thống, đặc sản làng nghề văn hoá địa phương.</strong>
          </p>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
