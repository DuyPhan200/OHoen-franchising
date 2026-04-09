import React from 'react';
import styles from './SoulSection.module.css';

interface Block {
  title: string;
  description: string;
  image: string;
  alt: string;
  imageLeft: boolean;
}

const SoulSection: React.FC = () => {
  const blocks: Block[] = [
    {
      title: "TINH KHIẾT TỪ THIÊN NHIÊN",
      description: "Mỗi bát cháo nghêu O Hoèn là sự kết tinh của nguyên liệu tươi ngon nhất. Thay vì sử dụng nước mắm pha chế công nghiệp để giảm chi phí, chúng tôi kiên định chọn 100% nước mắm Nam Ô truyền thống. Được làm thủ công từ cá cơm than tươi và muối Sa Huỳnh, không pha lẫn tạp chất, mang đến hương vị mặn mòi, hậu vị ngọt tự nhiên nguyên bản của biển cả.",
      image: "1.jpg",
      alt: "Nguyên liệu tươi ngon",
      imageLeft: false
    },
    {
      title: "TÔN TRỌNG SỨC KHỎE",
      description: "Chúng tôi tin rằng một món ăn ngon phải đi liền với sức khỏe vững bền. Nước mắm Nam Ô giữ trọn vẹn dồi dào lượng Axit Amin từ cá với độ đạm tự nhiên lên đến 30-40. O Hoèn cam kết hoàn toàn 0% chất bảo quản, 0% hương liệu nhân tạo và 0% chất điều vị (mì chính), đảm bảo sự an lành tuyệt đối cho thực khách, từ trẻ em đến người lớn tuổi.",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1954&auto=format&fit=crop",
      alt: "Sức khỏe",
      imageLeft: true
    },
    {
      title: "GÌN GIỮ DI SẢN",
      description: "Đầu tư vào O Hoèn không chỉ là một bài toán kinh doanh, mà còn là hành trình đồng hành bảo tồn văn hóa. Từng giọt nước mắm được ủ chượp trong những lu sành suốt 12 đến 24 tháng ròng rã tại làng chài Nam Ô. Cùng nhau, chúng ta không chỉ phục vụ một tô cháo ngon, mà đang kể lại câu chuyện đầy tự hào của di sản ẩm thực miền Trung.",
      image: "2.jpg",
      alt: "Di sản văn hóa",
      imageLeft: false
    }
  ];

  return (
    <section className={styles.soulSection}>
      <div className={styles.container}>
        {/* Intro Header */}
        <div className={styles.header}>
          <h2 className={styles.mainTitle}>
            LINH HỒN CỦA <span className={styles.brandName}>O HOÈN</span>
          </h2>
          <p className={styles.subtitle}>
            Sự khác biệt không đến từ những lời hứa hẹn, mà đến từ <strong>những nguyên liệu chân thật nhất</strong>. Khám phá lý do vì sao chúng tôi chọn con đường khó hơn để mang lại giá trị bền vững.
          </p>
        </div>

        {/* Z-Pattern Content Blocks */}
        <div className={styles.blocksContainer}>
          {blocks.map((block, index) => (
            <div key={index} className={styles.block}>
              {/* Text Container */}
              <div className={`${styles.textContainer} ${block.imageLeft ? styles.orderSecond : styles.orderFirst}`}>
                <h3 className={styles.blockTitle}>{block.title}</h3>
                <p className={styles.blockDescription}>{block.description}</p>
              </div>

              {/* Image Container */}
              <div className={`${styles.imageContainer} ${block.imageLeft ? styles.orderFirst : styles.orderSecond}`}>
                <div className={styles.imageWrapper}>
                  <img 
                    src={block.image} 
                    alt={block.alt}
                    className={styles.image}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SoulSection;
