import React from 'react';
import styles from './InvestmentPackageSection.module.css';
import { useFadeIn } from '../../hooks';

const InvestmentPackageSection: React.FC = () => {
  const fadeInTitleRef = useFadeIn();
  const fadeInFlagshipRef = useFadeIn();
  const fadeInFlexibleRef = useFadeIn();
  const fadeInCtaRef = useFadeIn();

  return (
    <section id="models" className="section section-alt">
      <div className="wrap">
        <div ref={fadeInTitleRef} className="fade">
          <div className="eyebrow">Hai mô hình đầu tư</div>
          <h2 className="sh">Chọn mô hình phù hợp với bạn</h2>
          <p className="lead" style={{ maxWidth: '520px' }}>Chỉ hai lựa chọn — đủ để so sánh, không đủ để bối rối.</p>
        </div>
        
        <div className={styles.modelsGrid}>
          {/* Card 1: Flagship */}
          <div ref={fadeInFlagshipRef} className={`fade ${styles.modelCard} ${styles.flagship}`}>
            <div className={styles.modelImg}>
              <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80" alt="Nhà hàng dịch vụ nhanh O Hoèn" loading="lazy" />
              <div className={styles.modelImgDim}></div>
              <div className={`${styles.modelBadge} ${styles.gold}`}>Khuyên dùng</div>
            </div>
            <div className={styles.modelBody}>
              <h3>Nhà hàng dịch vụ nhanh</h3>
              <p>Mặt bằng cố định, nhận diện thương hiệu mạnh — đây là mô hình flagship đã vận hành thành công tại Đà Nẵng.</p>
              <div className={styles.modelFeatures}>
                <div className={styles.modelFeat}>Thiết kế chuẩn thương hiệu, tông xanh dương</div>
                <div className={styles.modelFeat}>Phù hợp mặt tiền đường lớn, khu dân cư đông</div>
                <div className={styles.modelFeat}>Được hỗ trợ marketing ưu tiên từ trung tâm</div>
              </div>
              <div className={styles.priceChip}>
                <strong className={styles.priceAmount}>150 – 200 triệu VNĐ</strong>
                <span className={styles.priceDetails}>Bao gồm phí NQ · Thiết kế · Thiết bị ban đầu</span>
              </div>
            </div>
          </div>
          
          {/* Card 2: Flexible */}
          <div ref={fadeInFlexibleRef} className={`fade ${styles.modelCard}`}>
            <div className={styles.modelImg}>
              <img src="https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=800&q=80" alt="Mô hình xe đẩy O Hoèn" loading="lazy" />
              <div className={styles.modelImgDim}></div>
              <div className={`${styles.modelBadge} ${styles.mint}`}>Linh hoạt</div>
            </div>
            <div className={styles.modelBody}>
              <h3>Xe đẩy di động</h3>
              <p>Linh hoạt vị trí, vốn khởi điểm thấp hơn — phù hợp để thử nghiệm thị trường mới hoặc sự kiện.</p>
              <div className={styles.modelFeatures}>
                <div className={styles.modelFeat}>Di chuyển theo sự kiện, chợ, khu đông người</div>
                <div className={styles.modelFeat}>Vốn đầu tư thấp hơn nhà hàng cố định</div>
                <div className={styles.modelFeat}>Bước đầu để mở rộng sang mô hình lớn hơn</div>
              </div>
              <div className={styles.priceChip}>
                <strong className={styles.priceAmount}>Liên hệ để biết chi tiết</strong>
                <span className={styles.priceDetails}>Tư vấn cụ thể theo khu vực và vị trí</span>
              </div>
            </div>
          </div>
        </div>
        
        <div ref={fadeInCtaRef} className={`fade ${styles.modelsCta}`}>
          <p>Chưa biết chọn gì? Gọi cho chúng tôi — tư vấn miễn phí theo tình huống cụ thể của bạn.</p>
          <a href="tel:0967564441" className="btn-phone">
            <svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.96a16 16 0 006.13 6.13l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
            Gọi ngay: 096 756 44 41
          </a>
        </div>
      </div>
    </section>
  );
};

export default InvestmentPackageSection;
