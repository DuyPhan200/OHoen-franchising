import React from 'react';
import styles from './MenuSection.module.css';

interface MenuItem {
  id: string;
  name: string;
  desc: string;
  image: string;
  isSpecial?: boolean;
}

const menuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Cháo Nghêu Hàu',
    desc: 'Ngọt thanh – Béo ngậy – Tươi mát',
    image: '/MenuSection/1.svg',
  },
  {
    id: '2',
    name: 'Cháo Tôm',
    desc: 'Tôm tươi – Ngọt tự nhiên – Đậm đà',
    image: '/MenuSection/2.svg',
  },
  {
    id: '3',
    name: 'Cháo Nghêu',
    desc: 'Nghêu tươi – Ngọt thanh – Chuẩn vị biển',
    image: '/MenuSection/3.svg',
  },
  {
    id: '4',
    name: 'Cháo Nghêu Sườn',
    desc: 'Sườn mềm – Nghêu ngọt – Đậm vị',
    image: '/MenuSection/4.svg',
  },
  {
    id: '5',
    name: 'Cháo Nghêu Đặc Biệt',
    desc: 'Đầy đủ hương vị – Trọn vẹn tinh hoa',
    image: '/MenuSection/5.svg',
    isSpecial: true,
  },
  {
    id: '6',
    name: 'Cháo Nghêu Sườn Tôm',
    desc: 'Kết hợp hoàn hảo – Ngon trọn vị biển',
    image: '/MenuSection/6.svg',
  }
];

const MenuSection: React.FC = () => {
  return (
    <section className={styles.section} id="menu">
      <img src="/4.png" alt="Sea Background" className={styles.bgImage} />
      <div className={styles.container}>
        <div className={styles.leftContent}>
          <div className={styles.brandBadge}>
            <img src="/Logo1.svg" alt="O Hoèn Logo" className={styles.topLogo} />
            <span className={styles.badgeScript}>O Hoèn</span>
            <span className={styles.badgeSub}>CHÁO NGHÊU</span>
          </div>
          <h2 className={styles.mainTitle}>
            <span className={styles.whiteText}>MÓN ĂN</span><br />
            <span className={styles.goldText}>CỦA CHÚNG TÔI</span>
          </h2>
          <div className={styles.textDivider}>
            <div className={styles.line}></div>
            <svg viewBox="0 0 24 24" className={styles.midShell}>
              <path d="M12 2C7.58172 2 4 5.58172 4 10C4 14.4183 8 18 12 22C16 18 20 14.4183 20 10C20 5.58172 16.4183 2 12 2Z" />
            </svg>
            <div className={styles.line}></div>
          </div>
          <p className={styles.leftDesc}>
            Tinh hoa cháo biển miền Trung –<br />
            chế biến tươi, chuẩn vị, chuẩn trải nghiệm
          </p>
          <button className={styles.ctaButton}>XEM THÊM</button>
        </div>
        <div className={styles.menuGrid}>
          {menuItems.map((item) => (
            <div key={item.id} className={styles.menuCard}>
              {item.isSpecial && (
                <div className={styles.badge}>
                  <img src="/Logo1.svg" alt="Logo" className={styles.badgeLogo} />
                  <span>ĐẶC BIỆT</span>
                </div>
              )}
              <div className={styles.imageWrapper}>
                <img src={item.image} alt={item.name} className={styles.menuImage} />
              </div>
              <h3 className={styles.title}>{item.name}</h3>
              <div className={styles.divider}>
                <svg viewBox="0 0 24 24" className={styles.shellIcon}>
                  <path d="M12 2C7.58172 2 4 5.58172 4 10C4 14.4183 8 18 12 22C16 18 20 14.4183 20 10C20 5.58172 16.4183 2 12 2Z" />
                </svg>
              </div>
              <p className={styles.desc}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
