import React from 'react';
import styles from './HeroSection.module.css';
import { useCounter } from '../../hooks';

const StatItem: React.FC<{ target: number; suffix?: string; decimals?: number; label: string }> = ({
  target, suffix = '', decimals = 0, label
}) => {
  const { ref, count } = useCounter({ target, suffix, decimals });
  return (
    <div className={styles.stat}>
      <div className={styles.statNum}><span ref={ref}>{count}</span></div>
      <div className={styles.statLabel}>{label}</div>
    </div>
  );
};

const HeroSection: React.FC = () => {


  return (
    <section id="hero" className={styles.heroSection}>
      <img src="/chao1.svg" alt="" className={styles.heroDecor} aria-hidden="true" />
      <img src="/chao2.svg" alt="" className={styles.heroDecor2} aria-hidden="true" />
      <div className={styles.heroBody}>
        {/* TEXT — primary F-pattern zone */}
        <div>
          <div className={styles.heroKicker}>
            <div className={styles.kickerDot}></div>
            <span className={styles.kickerText}>Thông tin nhượng quyền</span>
          </div>
          <h1 className={styles.heroTitle}>
            Hành trình lan<br />
            tỏa tinh thần<br />
            <em>TỬ TẾ - TẬN TÂM</em>
          </h1>
          <p className={styles.heroDesc}>
            Cháo Hải Sản Nam Ô kết hợp hương vị truyền thống nguyên bản với hệ thống quản lý đã được chuẩn hóa. Điểm tựa vững chắc để bạn bắt đầu kinh doanh an toàn và không phải đi lên từ con số 0.
          </p>
          <div className={styles.heroActions}>
            <a href="#cta" className="btn-gold">Đăng ký tư vấn →</a>
            <a href="#models" className={styles.btnOutlineBlue}>Xem mô hình</a>
          </div>
        </div>

        {/* IMAGE — right column */}
        <div className={styles.heroVisual}>
          <div className={styles.heroImgFrame}>
            <img
              src="/herosection.png"
              alt="Nhượng quyền Cháo Nghêu O Hoèn"
              loading="eager"
            />
          </div>

        </div>
      </div>

      {/* Stats bar */}
      <div className={styles.heroStats}>
        <div className={styles.statsWrap}>
          <StatItem target={300000} suffix="+" label="Tô cháo phục vụ" />
          <StatItem target={46} decimals={1} suffix="★" label="Sao Google Maps" />
          <StatItem target={4} suffix=" cơ sở" label="Tại Đà Nẵng" />
          <StatItem target={1000} suffix="+" label="Reviews thực tế" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
