import React from 'react';
import styles from './InvestmentPackageSection.module.css';

const InvestmentPackageSection: React.FC = () => {
  const packages = [
    {
      title: 'Phí nhượng quyền',
      subtitle: '(3 Năm)',
      originalPrice: '200 TRIỆU',
      price: '50 TRIỆU',
      hasDiscount: true
    },
    {
      title: 'Phí trang thiết bị',
      subtitle: 'máy móc',
      price: '250 TRIỆU',
      hasDiscount: false
    },
    {
      title: 'Phí công cụ',
      subtitle: 'dụng cụ cơ bản',
      price: '50 TRIỆU',
      hasDiscount: false
    },
    {
      title: 'Phí nhập nguyên liệu',
      subtitle: 'lần đầu',
      price: '50 TRIỆU',
      hasDiscount: false
    },
    {
      title: 'Phí đào tạo và vận hành',
      subtitle: '(3 Năm)',
      originalPrice: '30 TRIỆU',
      price: '0 ĐỒNG',
      hasDiscount: true
    }
  ];

  return (
    <section className={styles.investmentSection}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.mainTitle}>Gói Đầu Tư Tiêu Chuẩn</h2>
          <div className={styles.priceDisplay}>
            <span className={styles.priceNumber}>400</span>
            <span className={styles.priceUnit}>Triệu</span>
          </div>
          <p className={styles.validUntil}>Áp dụng đến tháng 12 / 2024</p>
        </div>

        {/* Package Cards */}
        <div className={styles.packagesGrid}>
          {packages.map((pkg, index) => (
            <div key={index} className={styles.packageCard}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>
                  {pkg.title}
                  <br />
                  <span className={styles.cardSubtitle}>{pkg.subtitle}</span>
                </h3>
              </div>
              <div className={styles.cardBody}>
                {pkg.hasDiscount && pkg.originalPrice && (
                  <span className={styles.originalPrice}>{pkg.originalPrice}</span>
                )}
                <span className={styles.currentPrice}>{pkg.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InvestmentPackageSection;
