import React from 'react';
import styles from './Header.module.css';

const Header: React.FC = () => {
  return (
    <nav className={styles.nav} id="nav">
      <div className={styles.navWrap}>
        <div className={styles.navLogo}>
          Cháo Nghêu O Hoèn
          <small className={styles.navLogoSmall}>Nhượng quyền thương hiệu</small>
        </div>
        <a href="tel:0967564441" className={styles.navPhone}>
          <svg viewBox="0 0 24 24" className={styles.navPhoneIcon}>
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.96a16 16 0 006.13 6.13l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
          </svg>
          <span>096 756 44 41</span>
        </a>
        <a href="#cta" className={styles.navCta}>Đăng ký tư vấn</a>
      </div>
    </nav>
  );
};

export default Header;
