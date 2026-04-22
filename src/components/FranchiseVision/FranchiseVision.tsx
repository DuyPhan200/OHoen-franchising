import React from 'react';
import styles from './FranchiseVision.module.css';
import { useFadeIn } from '../../hooks';

const RoadCard: React.FC<{ year: string; num: string; desc: React.ReactNode }> = ({ year, num, desc }) => {
  return (
    <div className={styles.roadCard}>
      <div className={styles.roadYear}>{year}</div>
      <div className={styles.roadNum}>{num}</div>
      <div className={styles.roadDesc}>{desc}</div>
    </div>
  );
};

const FranchiseVision: React.FC = () => {
  const fadeInText = useFadeIn();
  const fadeInGrid = useFadeIn();
  const fadeInBar = useFadeIn();

  return (
    <section className={styles.vision} id="vision">
      <div className="wrap">
        {/* Top Grid: Content on Left, Roadmap on Right */}
        <div className={styles.visionTop}>
          <div ref={fadeInText} className={`fade ${styles.visionText}`}>
            <span className={styles.label}>TẦM NHÌN 2030</span>
            <h2 className={styles.title}>Bạn đang tham gia vào điều gì lớn hơn</h2>
            <p className={styles.bodyText}>
              O Hoèn không chỉ là chuỗi cháo — mà là giữ lửa ẩm thực làng nghề Việt Nam qua từng cửa hàng nhượng quyền trên khắp đất nước.
            </p>
            <blockquote className={styles.pull}>
              "Người đặt nền móng đầu tiên tại một thị trường luôn có lợi thế của người đi trước."
            </blockquote>
          </div>

          <div ref={fadeInGrid} className={`fade ${styles.roadGrid}`}>
            <RoadCard 
              year="2025" 
              num="2" 
              desc={<>NQ đầu tiên<br />tại Đà Nẵng</>} 
            />
            <RoadCard 
              year="2026" 
              num="30+" 
              desc={<>Cửa hàng toàn quốc<br />Đà Nẵng · HCM · HN</>} 
            />
            <RoadCard 
              year="2027–28" 
              num="100" 
              desc={<>Cửa hàng +<br />NQ quốc tế</>} 
            />
            <RoadCard 
              year="2030" 
              num="300+" 
              desc={<>Thương hiệu<br />cháo số 1 VN</>} 
            />
          </div>
        </div>

        {/* Scarcity Banner */}
        <div ref={fadeInBar} className={`fade ${styles.scarcityBar}`}>
          <p>
            Khu vực của bạn <em>đang còn suất.</em> Đăng ký hôm nay để được tư vấn trước khi slot khu vực đóng.
          </p>
          <a href="#form">Đăng ký ngay →</a>
        </div>
      </div>
    </section>
  );
};

export default FranchiseVision;
