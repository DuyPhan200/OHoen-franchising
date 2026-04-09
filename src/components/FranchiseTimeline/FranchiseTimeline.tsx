import React from 'react';
import styles from './FranchiseTimeline.module.css';

const FranchiseTimeline: React.FC = () => {
  // Dữ liệu Quy trình chuẩn xác 100% theo ảnh gốc
  const stages = [
    {
      id: 1,
      title: "GIAI ĐOẠN 1",
      desc: "ĐĂNG KÍ, TƯ VẤN HỢP TÁC",
      align: "right" as const,
      gapText: "7 NGÀY",
    },
    {
      id: 2,
      title: "GIAI ĐOẠN 2",
      desc: "XÁC NHẬN HỢP TÁC",
      align: "left" as const,
      gapText: "2-3 NGÀY",
    },
    {
      id: 3,
      title: "GIAI ĐOẠN 3",
      desc: "KÍ KẾT HỢP ĐỒNG",
      align: "right" as const,
      gapText: null,
    },
    {
      id: 4,
      title: "GIAI ĐOẠN 4",
      desc: "TRIỂN KHAI DỰ ÁN",
      align: "left" as const,
      gapText: "1 TUẦN",
    },
    {
      id: 5,
      title: "GIAI ĐOẠN 5",
      desc: "CHUẨN BỊ KHAI TRƯƠNG",
      align: "right" as const,
      gapText: null,
    },
    {
      id: 6,
      title: "GIAI ĐOẠN 6",
      desc: "KHAI TRƯƠNG CỬA HÀNG",
      align: "right" as const,
      gapText: null,
    },
    {
      id: 7,
      title: "GIAI ĐOẠN 7",
      desc: "HỖ TRỢ VẬN HÀNH VÀ MARKETING TRONG SUỐT QUÁ TRÌNH VẬN HÀNH",
      align: "left" as const,
      gapText: null,
    }
  ];

  return (
    <section className={styles.timelineSection}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.headerWrapper}>
          <div className={styles.headerBox}>
            <h2 className={styles.mainTitle}>Timeline</h2>
            <h3 className={styles.subtitle}>Quy Trình Nhượng Quyền</h3>
          </div>
        </div>

        {/* Timeline Wrapper */}
        <div className={styles.timelineWrapper}>
          {/* Vertical center line */}
          <div className={styles.centerLine}></div>

          {stages.map((stage) => (
            <React.Fragment key={stage.id}>
              {/* Stage Box */}
              <div className={styles.stageRow}>
                {/* Content Container */}
                <div className={`${styles.contentContainer} ${stage.align === 'right' ? styles.alignRight : styles.alignLeft}`}>
                  {/* Desktop connector line */}
                  <div className={`${styles.connectorLine} ${styles.desktopOnly} ${stage.align === 'right' ? styles.lineLeft : styles.lineRight}`}></div>
                  
                  {/* Desktop dot */}
                  <div className={`${styles.dot} ${styles.desktopOnly} ${stage.align === 'right' ? styles.dotLeft : styles.dotRight}`}></div>

                  {/* Mobile connector line */}
                  <div className={`${styles.connectorLine} ${styles.mobileOnly} ${styles.mobileLineLeft}`}></div>
                  
                  {/* Mobile dot */}
                  <div className={`${styles.dot} ${styles.mobileOnly} ${styles.mobileDotLeft}`}></div>

                  {/* Text Content */}
                  <h4 className={styles.stageTitle}>{stage.title}</h4>
                  <p className={styles.stageDesc}>{stage.desc}</p>
                </div>
              </div>

              {/* Gap Time Box */}
              {stage.gapText ? (
                <div className={styles.gapRow}>
                  <div className={styles.gapBox}>
                    <div className={styles.gapContent}>
                      <span className={styles.gapNumber}>{stage.gapText.split(' ')[0]}</span>
                      <span className={styles.gapUnit}>{stage.gapText.split(' ').slice(1).join(' ')}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className={styles.spacer}></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FranchiseTimeline;
