import React, { useEffect, useRef, useState } from 'react';
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
  const [isVisible, setIsVisible] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { 
        threshold: 0.4, // Chỉ chạy khi 40% lưới món ăn xuất hiện
        rootMargin: '0px 0px -50px 0px' // Đẩy điểm kích hoạt xuống thêm 50px
      }
    );

    if (gridRef.current) {
      observer.observe(gridRef.current);
    }

    return () => observer.disconnect();
  }, []);

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
              <path d="M10.8,21.5C9.3,21,2,14.6,2,10.5C2,5.8,6.5,2,12,2s10,3.8,10,8.5c0,4.1-7.3,10.5-8.8,11.5L12,22L10.8,21.5z M12,19c1.5-1.1,8-7.5,8-8.5c0-3.6-3.6-6.5-8-6.5S4,6.9,4,10.5c0,1,6.5,7.4,8,8.5V19z M11,7h2v9h-2V7z M7.5,8.5h1.5v6H7.5V8.5z M15,8.5h1.5v6H15V8.5z" />
            </svg>
            <div className={styles.line}></div>
          </div>
          <p className={styles.leftDesc}>
            Tinh hoa cháo biển miền Trung –<br />
            chế biến tươi, chuẩn vị, chuẩn trải nghiệm
          </p>
          <button className={styles.ctaButton}>XEM THÊM</button>
        </div>
        <div className={styles.menuGrid} ref={gridRef}>
          {menuItems.map((item, index) => (
            <div 
              key={item.id} 
              className={`${styles.menuCard} ${isVisible ? styles.animate : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={styles.menuInner}>
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
                    <path d="M10.8,21.5C9.3,21,2,14.6,2,10.5C2,5.8,6.5,2,12,2s10,3.8,10,8.5c0,4.1-7.3,10.5-8.8,11.5L12,22L10.8,21.5z M12,19c1.5-1.1,8-7.5,8-8.5c0-3.6-3.6-6.5-8-6.5S4,6.9,4,10.5c0,1,6.5,7.4,8,8.5V19z M11,7h2v9h-2V7z M7.5,8.5h1.5v6H7.5V8.5z M15,8.5h1.5v6H15V8.5z" />
                  </svg>
                </div>
                <p className={styles.desc}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
