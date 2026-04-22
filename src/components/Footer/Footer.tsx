import React from 'react';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerIn}>
        <div>
          <div className={styles.fBrand}>Cháo Nghêu O Hoèn</div>
          <div className={styles.fTagline}>
            Công ty Cổ phần LANGNAMO · Đà Nẵng<br />
            "Đồng hành cùng sức khoẻ của bạn"
          </div>
        </div>
        <div className={styles.fInfo}>
          87 Lê Thanh Nghị · 152 Triệu Nữ Vương<br />
          08 An Thượng 37 · 26 Tiểu La · Đà Nẵng<br />
          Hotline: 096 756 44 41
        </div>
      </div>
    </footer>
  );
};

export default Footer;
