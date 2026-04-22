import React from 'react';
import styles from './WhySection.module.css';
import { useFadeIn } from '../../hooks';

const WhySection: React.FC = () => {
  const fadeInHeader = useFadeIn();
  const fadeInMosaic = useFadeIn();
  const fadeInList = useFadeIn();
  const fadeInTimeline = useFadeIn();

  return (
    <section className={styles.support} id="why">
      <div className="wrap">
        <div ref={fadeInHeader} className={`fade ${styles.header}`}>
          <div className="eyebrow">Hệ thống hỗ trợ</div>
          <h2 className={styles.title}>Bạn không hề một mình</h2>
          <p className={styles.desc}>
            Không cần kinh nghiệm F&B. Hệ thống O Hoèn đã chuẩn hoá mọi thứ — từ công thức đến vận hành đến marketing.
          </p>
        </div>

        <div className={styles.supportLayout}>
          {/* Left: image mosaic (1 Large on top, 2 Small below) */}
          <div ref={fadeInMosaic} className={`fade ${styles.mosaic}`}>
            <div className={styles.mosaicTop}>
              <img src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=80" alt="Bếp trung tâm O Hoèn" />
            </div>
            <div className={styles.mosaicBottom}>
              <div className={styles.mosaicImg}>
                <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&q=80" alt="Nguyên liệu tươi" />
                <div className={styles.mosaicLabel}>Nguyên liệu kiểm soát hàng ngày</div>
              </div>
              <div className={styles.mosaicImg}>
                <img src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=500&q=80" alt="Đào tạo vận hành" />
                <div className={styles.mosaicLabel}>Đào tạo tận nơi</div>
              </div>
            </div>
          </div>

          {/* Right: support cards (Horizontal Boxes) */}
          <div ref={fadeInList} className={`fade ${styles.supList}`}>
            <div className={styles.supItem}>
              <div className={styles.supIco}>
                <svg viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>
              </div>
              <div>
                <h3>Bếp trung tâm chuẩn hoá</h3>
                <p>Công thức và quy trình đồng nhất toàn chuỗi. Vị cháo mọi cửa hàng đều như nhau — không phụ thuộc tay nghề cá nhân.</p>
              </div>
            </div>

            <div className={styles.supItem}>
              <div className={styles.supIco}>
                <svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>
              </div>
              <div>
                <h3>Đào tạo vận hành tận nơi</h3>
                <p>On-the-job Training trực tiếp + Mentorship từ đội Kinh doanh & Vận hành trong suốt giai đoạn đầu khai trương.</p>
              </div>
            </div>

            <div className={styles.supItem}>
              <div className={styles.supIco}>
                <svg viewBox="0 0 24 24"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
              </div>
              <div>
                <h3>Marketing toàn hệ thống</h3>
                <p>Phòng Marketing xây chiến lược quảng bá cho toàn chuỗi. Franchisee chỉ tập trung vận hành — không cần tự làm brand.</p>
              </div>
            </div>

            <div className={styles.supItem}>
              <div className={styles.supIco}>
                <svg viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg>
              </div>
              <div>
                <h3>Hỗ trợ quản lý kinh doanh</h3>
                <p>Thiết lập quy trình thu chi, báo cáo doanh thu. Franchisee luôn nắm rõ tình hình kinh doanh của mình.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div ref={fadeInTimeline} className={`fade ${styles.tl}`}>
          <div className={styles.tlLabel}>Lộ trình từ ký kết đến khai trương</div>
          <div className={styles.tlRow}>
            <div className={styles.tlStep}>
              <div className={styles.tlDot}>1</div>
              <div className={styles.tlTxt}>Tư vấn & ký hợp đồng</div>
            </div>
            <div className={styles.tlStep}>
              <div className={styles.tlDot}>2</div>
              <div className={styles.tlTxt}>Chọn mặt bằng</div>
            </div>
            <div className={styles.tlStep}>
              <div className={styles.tlDot}>3</div>
              <div className={styles.tlTxt}>Đào tạo vận hành</div>
            </div>
            <div className={styles.tlStep}>
              <div className={styles.tlDot}>4</div>
              <div className={styles.tlTxt}>Setup cửa hàng</div>
            </div>
            <div className={styles.tlStep}>
              <div className={styles.tlDot}>5</div>
              <div className={styles.tlTxt}>Khai trương chính thức</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhySection;
