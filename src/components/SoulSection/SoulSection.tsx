import React from 'react';
import styles from './SoulSection.module.css';
import { useFadeIn } from '../../hooks';

const SoulSection: React.FC = () => {
  const fadeInRef1 = useFadeIn();
  const fadeInRef2 = useFadeIn();

  return (
    <section id="story" className={styles.soulSection}>
      <div className="wrap">
        <div className={styles.storyGrid}>
          {/* IMAGE left */}
          <div ref={fadeInRef1} className={`fade ${styles.storyImgs}`}>
            <div className={styles.storyImgMain}>
              <img
                src="https://images.unsplash.com/photo-1552566626-52f8b828add9?w=900&q=80"
                alt="Làng chài Nam Ô" 
                loading="lazy"
              />
            </div>
            <div className={styles.storyImgInset}>
              <img
                src="https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=400&q=80"
                alt="Nước mắm Nam Ô truyền thống" 
                loading="lazy"
              />
            </div>
          </div>

          {/* TEXT right */}
          <div ref={fadeInRef2} className={`fade ${styles.storyText}`}>
            <span className={styles.label}>Câu chuyện thương hiệu</span>
            <h2 className={styles.title}>Từ làng chài Nam Ô đến thương hiệu chuẩn nhượng quyền</h2>
            <p className={styles.body}>
              "O Hoèn" — người phụ nữ miền Trung tần tảo, sớm hôm nấu những tô cháo nghêu thơm ngon cho khách như người thân trong gia đình. Giữ lửa vị quê, trọn vẹn yêu thương.
            </p>
            <blockquote className={styles.pull}>
              "Linh hồn của mọi tô cháo là nước mắm Nam Ô truyền thống — ủ chượp tự nhiên 12–24 tháng. Thứ mà đối thủ không thể sao chép."
            </blockquote>
          </div>
        </div>

        {/* 3 USP cards */}
        <div className={styles.uspRow}>
          <div className={styles.uspCard}>
            <div className={styles.uspIcon}>
              <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
            </div>
            <h3>Nước mắm Nam Ô độc quyền</h3>
            <p>Ủ chượp tự nhiên 12–24 tháng · 0 phụ gia · 30–40 độ đạm. Hơn 1.000 lít đã dùng tại chuỗi — và tăng mỗi tháng.</p>
          </div>
          <div className={styles.uspCard}>
            <div className={styles.uspIcon}>
              <svg viewBox="0 0 24 24"><path d="M9 12l2 2 4-4"/><rect x="3" y="3" width="18" height="18" rx="2"/></svg>
            </div>
            <h3>Bếp trung tâm chuẩn hoá</h3>
            <p>Công thức độc quyền, quy trình đồng nhất toàn chuỗi. Franchisee không cần biết nấu — hệ thống lo phần đó.</p>
          </div>
          <div className={styles.uspCard}>
            <div className={styles.uspIcon}>
              <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
            </div>
            <h3>Định vị sức khoẻ rõ ràng</h3>
            <p>Giàu omega-3, kẽm, vitamin B12 · Ít calo · Hạt nêm thuần chay từ rau củ. Khác hoàn toàn với cháo thông thường.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SoulSection;
