import React, { useState } from 'react';
import styles from './FranchiseForm.module.css';
import { useFadeIn } from '../../hooks';

const FranchiseForm: React.FC = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const fadeInFormLeft = useFadeIn();
  const fadeInFormRight = useFadeIn();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setIsSuccess(true);
    // Scroll to section start to show success message if needed, 
    // but the form card is already in view.
  };

  return (
    <section className={styles.formSec} id="form">
      <div className="wrap">
        <div className={styles.formOuter}>
          {/* Left: Content & Trust */}
          <div ref={fadeInFormLeft} className={`fade ${styles.formLeft}`}>
            <div className="eyebrow">Bắt đầu hành trình</div>
            <h2>Tìm hiểu nhượng quyền<br /><em style={{ fontStyle: 'italic', color: 'var(--blue)' }}>O Hoèn</em></h2>
            <p className="lead">
              Điền thông tin để nhận tư vấn miễn phí. Đội ngũ O Hoèn sẽ phản hồi trong 24 giờ với bộ tài liệu đầy đủ — không ràng buộc.
            </p>
            
            <div className={styles.trustList}>
              <div className={styles.trustItem}>
                <div className={styles.trustIco}>
                  <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                </div>
                <div className={styles.trustTxt}>Thông tin bảo mật hoàn toàn</div>
              </div>
              <div className={styles.trustItem}>
                <div className={styles.trustIco}>
                  <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                </div>
                <div className={styles.trustTxt}>Phản hồi trong 24 giờ làm việc</div>
              </div>
              <div className={styles.trustItem}>
                <div className={styles.trustIco}>
                  <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" /></svg>
                </div>
                <div className={styles.trustTxt}>Tư vấn miễn phí · Không ràng buộc</div>
              </div>
            </div>
          </div>

          {/* Right: The Form Card */}
          <div ref={fadeInFormRight} className={`fade ${styles.formRight}`}>
            <div className={styles.formBox}>
              {!isSuccess ? (
                <form id="mainForm" onSubmit={handleSubmit}>
                  <div className={styles.fRow}>
                    <div className={styles.fg}>
                      <label>Họ và tên *</label>
                      <input type="text" placeholder="Nguyễn Văn A" required />
                    </div>
                    <div className={styles.fg}>
                      <label>Số điện thoại *</label>
                      <input type="tel" placeholder="09x xxx xxxx" required />
                    </div>
                  </div>
                  <div className={styles.fg}>
                    <label>Email</label>
                    <input type="email" placeholder="email@example.com" />
                  </div>
                  <div className={styles.fg}>
                    <label>Khu vực muốn mở nhượng quyền *</label>
                    <select required defaultValue="">
                      <option value="" disabled>Chọn khu vực của bạn</option>
                      <option>Đà Nẵng</option>
                      <option>TP. Hồ Chí Minh</option>
                      <option>Hà Nội</option>
                      <option>Hội An</option>
                      <option>Tỉnh thành khác</option>
                    </select>
                  </div>
                  <div className={styles.fg}>
                    <label>Mô hình quan tâm</label>
                    <select defaultValue="">
                      <option value="" disabled>Chọn mô hình (không bắt buộc)</option>
                      <option>Nhà hàng dịch vụ nhanh</option>
                      <option>Xe đẩy di động</option>
                      <option>Chưa quyết định</option>
                    </select>
                  </div>
                  <button type="submit" className={styles.fSubmit}>Đăng ký nhận tư vấn miễn phí →</button>
                </form>
              ) : (
                <div className={styles.formSuccess}>
                  <svg width="44" height="44" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  <h3>Đã nhận thông tin!</h3>
                  <p>
                    Đội ngũ O Hoèn sẽ liên hệ trong vòng 24 giờ làm việc với bộ tài liệu nhượng quyền đầy đủ. Cảm ơn bạn đã tin tưởng O Hoèn.
                  </p>
                </div>
              )}
              
              <p className={styles.fNote}>
                Thông tin bảo mật · Không spam · <a href="#">Chính sách bảo mật</a>
              </p>
              
              <div className={styles.fHotline}>
                <svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.96a16 16 0 006.13 6.13l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>
                Hoặc gọi: <strong>096 756 44 41</strong> · Zalo cùng số
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Wave bottom divider */}
      <div className={styles.waveDivider}>
        <svg viewBox="0 0 1440 48" preserveAspectRatio="none"><path d="M0,20 C480,50 960,10 1440,0 L1440,49 L0,49 Z"></path></svg>
      </div>
    </section>
  );
};

export default FranchiseForm;
