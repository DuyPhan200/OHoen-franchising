import React from 'react';
import styles from './AdvantageSection.module.css';

interface AdvantageItem {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  icon: string;
  points: string[];
}

const advantages: AdvantageItem[] = [
  {
    id: '1',
    num: '01',
    title: 'LỢI THẾ',
    subtitle: 'SẢN PHẨM',
    icon: 'bowl',
    points: [
      'Sản phẩm dinh dưỡng, hương vị thơm ngon, nguồn gốc rõ ràng.',
      'Đáp ứng đa dạng tệp khách hàng, phục vụ mọi khung giờ.',
      'Tiết kiệm thời gian tối ưu hoá quy trình, chế biến nhanh chóng, thời gian chờ đợi ngắn.',
      'Đóng gói tiện lợi thuận tiện cho vận chuyển và sử dụng.'
    ]
  },
  {
    id: '2',
    num: '02',
    title: 'LỢI THẾ',
    subtitle: 'VẬN HÀNH',
    icon: 'cog',
    points: [
      'Mô hình tinh gọn hiện đại, không cần quá nhiều nhân sự.',
      'Được thiết kế chuyên nghiệp, đảm bảo vận hành trơn tru hiệu quả.',
      'Nhận diện thương hiệu đồng bộ, nổi bật, chuyên nghiệp.',
      'Đáng tin cậy với khách hàng và đối tác.'
    ]
  },
  {
    id: '3',
    num: '03',
    title: 'LỢI THẾ',
    subtitle: 'MARKETING',
    icon: 'marketing',
    points: [
      'Chiến lược marketing toàn diện, định hướng tăng trưởng bền vững.',
      'Website và nền tảng đặt hàng riêng, tích hợp hỗ trợ công nghệ.',
      'Tối ưu khả năng tiếp cận khách hàng đa kênh, dễ dàng.',
      'Hỗ trợ truyền thông & xây dựng thương hiệu tại từng điểm bán.'
    ]
  }
];

const AdvantageSection: React.FC = () => {
  return (
    <section className={styles.section} id="advantages">
      <div className={styles.bgWrapper}>
        <img 
          src="/test/Thiết kế chưa có tên.svg" 
          alt="Advantage Background" 
          className={styles.bgImage} 
        />
      </div>
      
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
            <p className={styles.subHeader}>Tối ưu vận hành – Chuẩn hoá sản phẩm – Mở rộng bền vững</p>
          </div>
        </div>

        <div className={styles.advantageGrid}>
          {advantages.map((item) => (
            <div key={item.id} className={styles.card}>
              <div className={styles.cardNumber}>
                <span>{item.num}</span>
              </div>
              <div className={styles.iconCircle}>
                {item.icon === 'bowl' && (
                  <svg viewBox="0 0 24 24" className={styles.cardIcon}>
                    <path d="M12 2C10.9 2 10 2.9 10 4V6C10 7.1 10.9 8 12 8S14 7.1 14 6V4C14 2.9 13.1 2 12 2Z" fill="currentColor" opacity="0.3"/>
                    <path d="M21 11H3C2 11 1 12 1 13C1 17.4 4.6 21 9 21H15C19.4 21 23 17.4 23 13C23 12 22 11 21 11ZM12 19C8.7 19 6 16.3 6 13H18C18 16.3 15.3 19 12 19Z" fill="currentColor"/>
                    <path d="M7 9C7 9.6 7.4 10 8 10C8.6 10 9 9.6 9 9C9 8.4 8.6 8 8 8C7.4 8 7 8.4 7 9Z" fill="currentColor"/>
                    <path d="M15 9C15 9.6 15.4 10 16 10C16.6 10 17 9.6 17 9C17 8.4 16.6 8 16 8C15.4 8 15 8.4 15 9Z" fill="currentColor"/>
                  </svg>
                )}
                {item.icon === 'cog' && (
                  <svg viewBox="0 0 24 24" className={styles.cardIcon}>
                    <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" fill="currentColor"/>
                  </svg>
                )}
                {item.icon === 'marketing' && (
                  <svg viewBox="0 0 24 24" className={styles.cardIcon}>
                    <path d="M12 8L4.5 12.06L12 16.12L19.5 12.06L12 8ZM12 13.94L7.06 11.25L12 8.56L16.94 11.25L12 13.94Z" fill="currentColor" opacity="0.3"/>
                    <path d="M21.41 11.58l-9-5c-.26-.14-.56-.14-.82 0l-9 5c-.37.2-.59.58-.59 1s.22.8.59 1l9 5c.13.07.27.1.41.1s.28-.03.41-.1l9-5c.37-.2.59-.58.59-1s-.22-.8-.59-1zM12 16.12L4.5 12.06L12 8L19.5 12.06L12 16.12z" fill="currentColor"/>
                    <path d="M4.5 15.58L3.5 16.13V17.13L11.59 21.62C11.72 21.69 11.86 21.73 12 21.73C12.14 21.73 12.28 21.69 12.41 21.62L20.5 17.13V16.13L19.5 15.58L12 19.75L4.5 15.58Z" fill="currentColor"/>
                  </svg>
                )}
              </div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <h4 className={styles.cardSubtitle}>{item.subtitle}</h4>
              <ul className={styles.pointList}>
                {item.points.map((point, idx) => (
                  <li key={idx} className={styles.pointItem}>
                    <span className={styles.checkIcon}>
                      <svg viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="currentColor"/>
                      </svg>
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdvantageSection;
