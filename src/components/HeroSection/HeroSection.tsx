import React from 'react';
import styles from './HeroSection.module.css';
import { useCounter, useFadeIn } from '../../hooks';

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
  const fadeInVisualRef = useFadeIn();

  return (
    <section id="hero" className={styles.heroSection}>
      <img src="/chao1.svg" alt="" className={styles.heroDecor} aria-hidden="true" />
      <img src="/chao2.svg" alt="" className={styles.heroDecor2} aria-hidden="true" />
      <div className={styles.heroBody}>
        {/* TEXT — primary F-pattern zone */}
        <div>
          <div className={styles.heroKicker}>
            <div className={styles.kickerDot}></div>
            <span className={styles.kickerText}>Chương trình nhượng quyền 2025–2028</span>
          </div>
          <h1 className={styles.heroTitle}>
            Sở hữu thương hiệu F&B<br />
            truyền thống —<br />
            <em>vốn từ 150 triệu</em>
          </h1>
          <p className={styles.heroDesc}>
            Chuỗi cháo hải sản Nam Ô với hệ thống vận hành đã chuẩn hoá.
            Mở nhượng quyền tại Đà Nẵng · HCM · Hà Nội · Hội An.
          </p>
          <div className={styles.heroActions}>
            <a href="#cta" className="btn-gold">Đăng ký tư vấn miễn phí →</a>
            <a href="#models" className={styles.btnOutlineBlue}>Xem mô hình</a>
          </div>
          <p className={styles.heroMicro}>Miễn phí · Không ràng buộc · Phản hồi trong 24h</p>
        </div>

        {/* IMAGE — right column */}
        <div ref={fadeInVisualRef} className={`fade ${styles.heroVisual}`}>
          <div className={styles.heroImgFrame}>
            <img
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=900&q=80"
              alt="Không gian Cháo Nghêu O Hoèn"
              loading="eager"
            />
          </div>
          <div className={styles.heroBadge}>
            <div className={styles.heroBadgeNum}>2023</div>
            <div className={styles.heroBadgeLabel}>Khai trương · Đà Nẵng</div>
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
