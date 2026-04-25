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
                src="/SoulSection.png"
                alt="Linh hồn thương hiệu O Hoèn"
                loading="lazy"
              />
            </div>
            <div className={styles.storyImgMain}>
              <img
                src="/SoulSection2.png"
                alt="Hoạt động tại Cháo Nghêu O Hoèn"
                loading="lazy"
              />
            </div>
          </div>

          {/* TEXT right */}
          <div ref={fadeInRef2} className={`fade ${styles.storyText}`}>
            <span className={styles.label}>Câu chuyện thương hiệu</span>
            <h2 className={styles.title}>Ăn một bát cháo,<br />ấm một tấm lòng</h2>
            <p className={styles.body}>
              Cháo nghêu O Hoèn khởi nguồn từ làng chài Nam Ô – nơi vị mặn mòi của biển cả và hương nước mắm truyền thống đã thấm sâu vào ký ức bao thế hệ. Mỗi bát cháo không chỉ là một món ăn, mà còn là câu chuyện về tình yêu ẩm thực và khát vọng gìn giữ giá trị nguyên bản của người con đất Quảng.
            </p>
            <p className={styles.body}>
              Linh hồn làm nên sự khác biệt chính là thứ nước mắm Nam Ô trứ danh, kết hợp cùng nguyên liệu tươi ngon nhất từ biển khơi. Tại O Hoèn, chúng tôi tỉ mỉ trong từng công đoạn, trân trọng món quà từ thiên nhiên để mang đến trải nghiệm chân thật, gợi nhớ về bữa cơm gia đình ấm cúng nơi cửa biển.
            </p>
            <p className={styles.body}>
              Hơn cả một thương hiệu, Cháo nghêu O Hoèn là hành trình lan tỏa tinh thần "Tử tế - Tận tâm". Chúng tôi hy vọng mỗi khách hàng đến đây không chỉ để thưởng thức vị ngon, mà còn để cảm nhận tấm lòng và niềm tự hào về một di sản ẩm thực miền Trung.
            </p>
            <blockquote className={styles.pull}>
              "Chúng tôi đặt cả linh hồn Nam Ô vào lòng bát cháo, để mỗi khách hàng đến với O Hoèn đều cảm thấy mình được trân trọng như người thân."
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SoulSection;
