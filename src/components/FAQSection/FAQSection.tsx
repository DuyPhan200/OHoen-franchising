import React, { useState } from 'react';
import styles from './FAQSection.module.css';
import { useFadeIn } from '../../hooks';

const FAQItem: React.FC<{ question: string; answer: React.ReactNode }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`${styles.faqItem} ${isOpen ? styles.open : ''}`}>
      <button className={styles.faqBtn} onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen}>
        {question}
        <div className={styles.faqIcon}>
          <svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
        </div>
      </button>
      <div className={styles.faqBody}>
        <div className={styles.faqContent}>
          {answer}
        </div>
      </div>
    </div>
  );
};

const ProfileItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className={styles.pi}>
    <div className={styles.piDot}></div>
    <p>{children}</p>
  </div>
);

const FAQSection: React.FC = () => {
  const fadeInHeader = useFadeIn();
  const fadeInVisual = useFadeIn();
  const fadeInContent = useFadeIn();

  return (
    <section className={styles.fran} id="fran">
      <div className="wrap">
        <div ref={fadeInHeader} className={`fade ${styles.header}`}>
          <div className="eyebrow">Dành cho bạn</div>
          <h2 className="sh">Bạn có phải người chúng tôi đang tìm?</h2>
        </div>

        <div className={styles.franLayout}>
          {/* Left: visual collage */}
          <div ref={fadeInVisual} className={`fade ${styles.franImgWrap}`}>
            <div className={styles.franImgMain}>
              <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=80" alt="Franchisee O Hoèn" />
            </div>
            <div className={styles.franImgSm}>
              <img src="https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&q=80" alt="Sản phẩm O Hoèn" />
            </div>
            <div className={styles.franBadge}>
              <strong>~200tr</strong>
              <span>Vốn tối thiểu<br />để bắt đầu</span>
            </div>
          </div>

          {/* Right: profile + FAQ */}
          <div ref={fadeInContent} className="fade">
            <div className={styles.profileBox}>
              <div className={styles.profileBoxLabel}>Franchisee lý tưởng của O Hoèn</div>
              <div className={styles.profileList}>
                <ProfileItem>
                  <strong>Vốn sẵn có ~200 triệu VNĐ</strong> — không nhất thiết phải nhiều hơn
                </ProfileItem>
                <ProfileItem>
                  Muốn <strong>đầu tư lâu dài</strong>, có dòng tiền thụ động ổn định
                </ProfileItem>
                <ProfileItem>
                  Lo lắng về <strong>tài chính khi về già</strong> — muốn nguồn thu không phụ thuộc lương
                </ProfileItem>
                <ProfileItem>
                  Tìm mô hình <strong>ít rủi ro, có hệ thống hỗ trợ</strong> — không phải tự xây từ đầu
                </ProfileItem>
                <ProfileItem>
                  Yêu sản phẩm làng nghề truyền thống · <strong>Độ tuổi 20–60</strong> · Đa ngành nghề
                </ProfileItem>
              </div>
            </div>

            <div className={styles.faqLabel}>Câu hỏi thường gặp</div>
            <div className={styles.faqList}>
              <FAQItem 
                question="Không có kinh nghiệm F&B có làm được không?"
                answer={<p>Hoàn toàn được. Bếp trung tâm xử lý công thức, đội vận hành đào tạo từ đầu. Bạn chỉ cần quản lý theo quy trình có sẵn — không cần biết nấu cháo.</p>}
              />
              <FAQItem 
                question="Vốn tối thiểu cần bao nhiêu?"
                answer={<p>Mô hình nhà hàng cần 150–200 triệu VNĐ (bao gồm phí nhượng quyền, thiết kế, thiết bị). Mô hình xe đẩy thấp hơn — liên hệ để được tư vấn cụ thể.</p>}
              />
              <FAQItem 
                question="Có thể mở tại tỉnh thành khác không?"
                answer={<p>Có. Đang ưu tiên: Đà Nẵng, TP.HCM (Q2/2026), Hà Nội (Q3/2026), Hội An. Tỉnh thành khác mở từ cuối 2026.</p>}
              />
              <FAQItem 
                question="Thời gian hoàn vốn và phí royalty?"
                answer={<p>Phụ thuộc vào khu vực và mô hình cụ thể. Đội tư vấn sẽ chia sẻ tài liệu đầy đủ sau khi bạn <a href="#form">đăng ký</a> — miễn phí, không ràng buộc.</p>}
              />
              <FAQItem 
                question="O Hoèn hỗ trợ tìm mặt bằng không?"
                answer={<p>Đội Kinh doanh & Vận hành tư vấn tiêu chí chọn mặt bằng (ưu tiên mặt tiền, mật độ khách cao). Quyết định cuối thuộc về franchisee.</p>}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
