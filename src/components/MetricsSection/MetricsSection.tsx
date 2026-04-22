import React from 'react';
import styles from './MetricsSection.module.css';
import { useCounter, useFadeIn } from '../../hooks';

const MetricItem: React.FC<{ target: number; suffix?: string; decimals?: number; label: string }> = ({ 
  target, suffix = '', decimals = 0, label 
}) => {
  const { ref, count } = useCounter({ target, suffix, decimals });
  const fadeInRef = useFadeIn();

  return (
    <div ref={fadeInRef} className={`fade ${styles.proofItem}`}>
      <div ref={ref} className={styles.proofNum}>{count}</div>
      <div className={styles.proofLabel}>{label}</div>
    </div>
  );
};

const MetricsSection: React.FC = () => {
  return (
    <section id="proof-bar" className={styles.proofBar}>
      <div className="wrap">
        <div className={styles.proofGrid}>
          <MetricItem target={300000} suffix="+" label="Tô cháo đã phục vụ" />
          <MetricItem target={46} decimals={1} suffix="★" label="Đánh giá Google Maps" />
          <MetricItem target={4} suffix=" cơ sở" label="Tại Đà Nẵng" />
          <MetricItem target={1000} suffix="+" label="Reviews thực tế" />
        </div>
      </div>
    </section>
  );
};

export default MetricsSection;
