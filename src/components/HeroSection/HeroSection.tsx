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
            Hệ thống nhượng quyền ẩm thực truyền thống Việt Nam theo chuẩn quốc tế, 
            nơi mỗi cửa hàng không chỉ là điểm bán thực phẩm, mà là đại sứ văn hoá 
            ẩm thực bản địa trên bản đồ ẩm thực toàn cầu.
            <strong>Góp phần giữ gìn và phát triển ẩm thực truyền thống, đặc sản làng nghề văn hoá địa phương.</strong>
          </p>

          {/* Features Row */}
          <div className={styles.heroFeatures}>
            <FeatureItem 
              iconId="cuisine"
              label={"ẨM THỰC\nTRUYỀN THỐNG"} 
            />
            <FeatureItem 
              iconId="specialty"
              label={"ĐẶC SẢN\nLÀNG NGHỀ"} 
            />
            <FeatureItem 
              iconId="standard"
              label={"TIÊU CHUẨN\nQUỐC TẾ"} 
            />
            <FeatureItem 
              iconId="partnership"
              label={"ĐỒNG HÀNH\nBỀN VỮNG"} 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const FeatureItem = ({ iconId, label }: { iconId: string, label: string }) => {
  const renderIcon = () => {
    switch (iconId) {
      case 'cuisine':
        return (
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path d="M12 2V5M16 2V5M8 2V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
             <path d="M3 11C3 15.4183 6.58172 19 11 19H13C17.4183 19 21 15.4183 21 11H3Z" stroke="currentColor" strokeWidth="1.2"/>
             <path d="M21 11L18 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
        );
      case 'specialty':
        return (
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M12 22C16 18 20 14.4183 20 10C20 5.58172 16.4183 2 12 2C7.58172 2 4 5.58172 4 10C4 14.4183 8 18 12 22Z" stroke="currentColor" strokeWidth="1.5"/>
            <circle cx="12" cy="10" r="1.5" fill="currentColor"/>
          </svg>
        );
      case 'standard':
        return (
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.2"/>
            <path d="M2 12H22" stroke="currentColor" strokeWidth="1.2"/>
            <path d="M12 2C14.5 4 16 7.5 16 12C16 16.5 14.5 20 12 22C9.5 20 8 16.5 8 12C8 7.5 9.5 4 12 2Z" stroke="currentColor" strokeWidth="1.2"/>
          </svg>
        );
      case 'partnership':
        return (
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 11L10 14L17 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 14C16 14 17 14 18 13C19 12 19 11 19 11M16 14L15 17M16 14L19 15" stroke="currentColor" strokeWidth="1.2"/>
            <path d="M8 14C8 14 7 14 6 13C5 12 5 11 5 11M8 14L9 17M8 14L5 15" stroke="currentColor" strokeWidth="1.2"/>
            <path d="M12 14L12 18M12 14L10 16M12 14L14 16" stroke="currentColor" strokeWidth="1.2"/>
            <path d="M4 8C4 8 4 4 12 4C20 4 20 8 20 8" stroke="currentColor" strokeWidth="1.2"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.featureItem}>
      <div className={styles.featureIcon}>
        {renderIcon()}
      </div>
      <span className={styles.featureLabel}>{label}</span>
    </div>
  );
};

export default HeroSection;
