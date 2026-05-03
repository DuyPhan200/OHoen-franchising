import React, { useEffect, useRef, useState } from 'react';
import styles from './AdvantageSection.module.css';

interface Point {
  text: string;
  iconType: string;
}

interface AdvantageItem {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  topIcon: string;
  points: Point[];
}

const advantages: AdvantageItem[] = [
  {
    id: '1',
    num: '01',
    title: 'LỢI THẾ',
    subtitle: 'SẢN PHẨM',
    topIcon: 'bowl',
    points: [
      { text: 'Sản phẩm dinh dưỡng, hương vị thơm ngon, nguồn gốc rõ ràng.', iconType: 'leaves' },
      { text: 'Đáp ứng đa dạng tệp khách hàng, phục vụ mọi khung giờ.', iconType: 'users' },
      { text: 'Tiết kiệm thời gian tối ưu hoá quy trình, chế biến nhanh chóng, thời gian chờ đợi ngắn.', iconType: 'clock' },
      { text: 'Đóng gói tiện lợi thuận tiện cho vận chuyển và sử dụng.', iconType: 'package' }
    ]
  },
  {
    id: '2',
    num: '02',
    title: 'LỢI THẾ',
    subtitle: 'VẬN HÀNH',
    topIcon: 'cog',
    points: [
      { text: 'Mô hình tinh gọn hiện đại, không cần quá nhiều nhân sự.', iconType: 'users-cog' },
      { text: 'Được thiết kế chuyên nghiệp, đảm bảo vận hành trơn tru hiệu quả.', iconType: 'layout' },
      { text: 'Nhận diện thương hiệu đồng bộ, nổi bật, chuyên nghiệp.', iconType: 'badge' },
      { text: 'Đáng tin cậy với khách hàng và đối tác.', iconType: 'handshake' }
    ]
  },
  {
    id: '3',
    num: '03',
    title: 'LỢI THẾ',
    subtitle: 'MARKETING',
    topIcon: 'marketing',
    points: [
      { text: 'Chiến lược marketing toàn diện, định hướng tăng trưởng bền vững.', iconType: 'trending' },
      { text: 'Website và nền tảng đặt hàng riêng, tích hợp hỗ trợ công nghệ.', iconType: 'web' },
      { text: 'Tối ưu khả năng tiếp cận khách hàng đa kênh, dễ dàng.', iconType: 'speaker' },
      { text: 'Hỗ trợ truyền thông & xây dựng thương hiệu tại từng điểm bán.', iconType: 'support' }
    ]
  }
];

const AdvantageSection: React.FC = () => {
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
      { threshold: 0.3 }
    );

    if (gridRef.current) {
      observer.observe(gridRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const renderPointIcon = (type: string) => {
    switch (type) {
      case 'leaves':
        return (
          <g fill="currentColor">
            <path d="M12 21c0-1.5 0-2.5 0-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M12 18c-1 0-3.5.5-6-1.5C4.5 15 4 13 4 11.5c0-1.5 1.5-2 3-2 3 0 5 3.5 5 8.5z" />
            <path d="M12 18c1 0 3.5.5 6-1.5 1.5-1.5 2-3.5 2-5 0-1.5-1.5-2-3-2-3 0-5 3.5-5 8.5z" />
          </g>
        );
      case 'users':
        return (
          <g>
            <circle cx="12" cy="7" r="3" />
            <path d="M6 21v-2a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v2" />
            <circle cx="6" cy="11" r="2" />
            <circle cx="18" cy="11" r="2" />
          </g>
        );
      case 'clock':
        return (
          <g>
            <circle cx="12" cy="12" r="9" />
            <polyline points="12 7 12 12 15 14" />
          </g>
        );
      case 'package':
        return (
          <g>
            <path d="M20 10V20H4V10" />
            <path d="M21 7H3V10H21V7Z" />
            <path d="M12 7V3" />
            <path d="M9 3H15" />
          </g>
        );
      case 'users-cog':
        return (
          <g>
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </g>
        );
      case 'layout':
        return (
          <g>
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M3 9H21" />
            <path d="M9 21V9" />
          </g>
        );
      case 'badge':
        return (
          <g>
            <circle cx="12" cy="8" r="6" />
            <path d="M8 14L7 22L12 19L17 22L16 14" />
          </g>
        );
      case 'handshake':
        return (
          <path d="M16 3H8v4H2v14h20V7h-6V3z M14 5v2h-4V5H14z" />
        );
      case 'trending':
        return (
          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        );
      case 'web':
        return (
          <g>
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            <path d="M2 12h20" />
          </g>
        );
      case 'speaker':
        return (
          <path d="M11 5L6 9H2v6h4l5 4V5z M15.54 8.46a5 5 0 0 1 0 7.07" />
        );
      case 'support':
        return (
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        );
      default:
        return <polyline points="20 6 9 17 4 12" />;
    }
  };

  return (
    <section className={styles.section} id="advantages">
      <div className={styles.container}>
        <div className={styles.topRow}>
          <div className={styles.brandBadge}>
            <img src="/Logo1.svg" alt="O Hoèn Logo" className={styles.topLogo} />
            <span className={styles.badgeScript}>O Hoèn</span>
            <span className={styles.badgeSub}>CHÁO NGHÊU</span>
          </div>

          <div className={styles.header}>
            <div className={styles.eyebrowContainer}>
              <div className={styles.line}></div>
              <span className={styles.eyebrowText}>LỢI THẾ HỆ THỐNG</span>
              <div className={styles.line}></div>
            </div>
            <h2 className={styles.mainTitle}>CHÁO NGHÊU<br />O HOÈN</h2>
            
            <div className={styles.dividerShell}>
              <div className={styles.dividerLine}></div>
            <img src="/Logo1.svg" alt="Logo" className={styles.midShell} />
              <div className={styles.dividerLine}></div>
            </div>

            <p className={styles.subHeader}>Tối ưu vận hành – Chuẩn hoá <br /> sản phẩm – Mở rộng bền vững</p>
          </div>
        </div>

        <div className={styles.advantageGrid} ref={gridRef}>
          {advantages.map((item, index) => (
            <div
              key={item.id}
              className={`${styles.card} ${isVisible ? styles.animate : ''}`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className={styles.cardInner}>
                <div className={styles.cardNumber}>
                  <span>{item.num}</span>
                </div>

                <div className={styles.cardContentWrapper}>
                  <div className={styles.cardLeftSide}>
                    <div className={styles.iconCircle}>
                      <svg viewBox="0 0 24 24" className={styles.cardIcon} fill="none" stroke="currentColor" strokeWidth="2">
                        {renderPointIcon(item.topIcon === 'bowl' ? 'leaves' : item.topIcon === 'cog' ? 'users-cog' : 'speaker')}
                      </svg>
                    </div>
                    <div className={styles.cardHeader}>
                      <h3 className={styles.titleSmall}>{item.title}</h3>
                      <h4 className={styles.titleLarge}>{item.subtitle}</h4>
                    </div>
                    <div className={styles.mobileDivider}></div>
                  </div>

                  <div className={styles.pointList}>
                    {item.points.map((point, idx) => (
                      <div key={idx} className={styles.pointItem}>
                        <div className={styles.pointIconCircle}>
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                          </svg>
                        </div>
                        <p className={styles.pointText}>{point.text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Watermark Pattern */}
                <div className={styles.watermark}>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M10.8,21.5C9.3,21,2,14.6,2,10.5C2,5.8,6.5,2,12,2s10,3.8,10,8.5c0,4.1-7.3,10.5-8.8,11.5L12,22L10.8,21.5z M12,19c1.5-1.1,8-7.5,8-8.5c0-3.6-3.6-6.5-8-6.5S4,6.9,4,10.5c0,1,6.5,7.4,8,8.5V19z M11,7h2v9h-2V7z M7.5,8.5h1.5v6H7.5V8.5z M15,8.5h1.5v6H15V8.5z" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Bar */}
        <div className={`${styles.bottomBar} ${isVisible ? styles.animate : ''}`}>
          <div className={styles.bottomBarContent}>
            <div className={styles.barLeft}>
              <img src="/Logo1.svg" alt="Logo" className={styles.barShell} />
              <div className={styles.barText}>
                <p className={styles.barTopText}>ĐỒNG HÀNH CÙNG O HOÈN</p>
                <h3 className={styles.barMainTitle}>KIẾN TẠO THƯƠNG HIỆU CHÁO NGHÊU</h3>
                <p className={styles.barScript}>Chất lượng – Uy tín – Bền vững</p>
              </div>
            </div>
            <button className={styles.barButton}>
              TÌM HIỂU NGAY
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};


export default AdvantageSection;
