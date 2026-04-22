import React from 'react';
import styles from './TestimonialsSection.module.css';
import { useCounter, useFadeIn } from '../../hooks';

const ProofStat: React.FC<{ target: number; suffix?: string; decimals?: number; label: string }> = ({ 
  target, suffix = '', decimals = 0, label 
}) => {
  const { ref, count } = useCounter({ target, suffix, decimals });
  const fadeInRef = useFadeIn();
  
  return (
    <div ref={fadeInRef} className={`fade ${styles.pstat}`}>
      <div className={styles.pstatN}><span ref={ref}>{count}</span></div>
      <div className={styles.pstatL}>{label}</div>
    </div>
  );
};

const ReviewCard: React.FC<{ stars: string; text: string; author: string }> = ({ stars, text, author }) => {
  const fadeInRef = useFadeIn();
  return (
    <div ref={fadeInRef} className={`fade ${styles.rev}`}>
      <div className={styles.revStars}>{stars}</div>
      <p className={styles.revText}>{text}</p>
      <div className={styles.revAuthor}>{author}</div>
    </div>
  );
};

const TestimonialsSection: React.FC = () => {
  const fadeInHeader = useFadeIn();

  return (
    <section className={styles.proof} id="proof">
      <div className="wrap">
        <div ref={fadeInHeader} className={`fade ${styles.proofHeader}`}>
          <div className="eyebrow">Bằng chứng thực tế</div>
          <h2 className="sh">Con số không biết nói dối</h2>
          <p className="lead">Từ ngày khai trương 24/5/2023 tại 87 Lê Thanh Nghị, Đà Nẵng.</p>
        </div>

        <div className={styles.proofStats}>
          <ProofStat target={300000} suffix="+" label="Tô cháo đã phục vụ" />
          <ProofStat target={46} decimals={1} suffix="★" label="Điểm Google Maps" />
          <ProofStat target={1000} suffix="+" label="Review các nền tảng" />
        </div>

        <div className={styles.reviewGrid}>
          <ReviewCard 
            stars="★★★★★" 
            text='"Cháo nghêu ở đây khác hẳn nơi khác — vị nước mắm Nam Ô thật sự rất đặc biệt, không bị ngấy. Mình ăn rồi lại muốn ăn tiếp."'
            author="Khách hàng · Google Maps · Đà Nẵng"
          />
          <ReviewCard 
            stars="★★★★★" 
            text='"Không gian ấm cúng, nhân viên thân thiện như người nhà. Tô cháo hàu giàu dinh dưỡng, phù hợp ăn sáng cả gia đình."'
            author="Khách hàng · Google Maps · Đà Nẵng"
          />
          <ReviewCard 
            stars="★★★★★" 
            text='"Lần đầu thử vì tò mò, giờ đã thành khách quen. Cháo sạch, nguyên liệu tươi — không cảm thấy nặng bụng."'
            author="Khách hàng · Google Maps · Đà Nẵng"
          />
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
