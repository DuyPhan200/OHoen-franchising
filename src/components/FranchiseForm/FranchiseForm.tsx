import React, { useState } from 'react';
import styles from './FranchiseForm.module.css';

interface SelectOption {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: SelectOption[];
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ options, placeholder, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.selectWrapper}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`${styles.selectTrigger} ${isOpen ? styles.selectOpen : ''}`}
      >
        <span className={value ? styles.selectValue : styles.selectPlaceholder}>
          {value ? options.find(o => o.value === value)?.label : placeholder}
        </span>
        <svg 
          className={`${styles.selectArrow} ${isOpen ? styles.arrowRotated : ''}`}
          viewBox="0 0 20 20"
        >
          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path>
        </svg>
      </div>

      {isOpen && (
        <>
          <div className={styles.selectOverlay} onClick={() => setIsOpen(false)}></div>
          <div className={styles.selectDropdown}>
            <div className={styles.dropdownHeader}>{placeholder}</div>
            <ul className={styles.optionsList}>
              {options.map(option => (
                <li
                  key={option.value}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`${styles.option} ${value === option.value ? styles.optionSelected : ''}`}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

const FranchiseForm: React.FC = () => {
  const [formData, setFormData] = useState({
    capital: '',
    model: '',
    exp: ''
  });

  const capitalOptions = [
    { value: 'duoi-200', label: 'DƯỚI 200 TRIỆU' },
    { value: '200-500', label: '200 TRIỆU - 500 TRIỆU' },
    { value: '500-1ty', label: '500 TRIỆU - 1 TỶ' },
    { value: 'tren-1ty', label: 'TRÊN 1 TỶ' }
  ];

  const modelOptions = [
    { value: 'xe-day', label: 'MÔ HÌNH XE ĐẨY' },
    { value: 'kios', label: 'KIOS O HOÈN' },
    { value: 'nha-hang', label: 'NHÀ HÀNG DỊCH VỤ NHANH' },
    { value: 'chua-ro', label: 'CẦN TƯ VẤN THÊM' }
  ];

  const expOptions = [
    { value: 'da-co', label: 'ĐÃ TỪNG KINH DOANH F&B' },
    { value: 'chua-co', label: 'CHƯA CÓ KINH NGHIỆM' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <section className={styles.formSection}>
      <div className={styles.backgroundPattern}></div>
      
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.mainTitle}>Sẵn sàng đồng hành cùng O Hoèn?</h2>
          <p className={styles.subtitle}>Điền thông tin bên dưới để bắt đầu quy trình đánh giá sự phù hợp.</p>
        </div>

        {/* Form */}
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            {/* Row 1 */}
            <div className={styles.inputWrapper}>
              <input 
                type="text" 
                placeholder="HỌ VÀ TÊN *" 
                required
                className={styles.input}
              />
            </div>
            <div className={styles.inputWrapper}>
              <input 
                type="tel" 
                placeholder="SỐ ĐIỆN THOẠI *" 
                required
                className={styles.input}
              />
            </div>

            {/* Row 2 */}
            <div className={styles.inputWrapper}>
              <input 
                type="email" 
                placeholder="EMAIL *" 
                required
                className={styles.input}
              />
            </div>
            <div className={styles.inputWrapper}>
              <input 
                type="text" 
                placeholder="TỈNH / THÀNH PHỐ DỰ KIẾN MỞ *" 
                required
                className={styles.input}
              />
            </div>

            {/* Row 3 */}
            <CustomSelect 
              placeholder="MỨC VỐN DỰ KIẾN *" 
              options={capitalOptions}
              value={formData.capital}
              onChange={(val) => setFormData({...formData, capital: val})}
            />
            <CustomSelect 
              placeholder="MÔ HÌNH QUAN TÂM *" 
              options={modelOptions}
              value={formData.model}
              onChange={(val) => setFormData({...formData, model: val})}
            />

            {/* Row 4 */}
            <CustomSelect 
              placeholder="KINH NGHIỆM F&B *" 
              options={expOptions}
              value={formData.exp}
              onChange={(val) => setFormData({...formData, exp: val})}
            />
            <div className={styles.inputWrapper}>
              <input 
                type="text" 
                placeholder="GHI CHÚ THÊM (TUỲ CHỌN)" 
                className={styles.input}
              />
            </div>
          </div>

          {/* Opt-in Checkbox */}
          <div className={styles.checkboxWrapper}>
            <input 
              id="opt-in" 
              type="checkbox" 
              className={styles.checkbox}
              required
            />
            <label htmlFor="opt-in" className={styles.checkboxLabel}>
              Tôi đồng ý nhận thông tin tư vấn và các tài liệu liên quan đến nhượng quyền từ Cháo Nghêu O Hoèn qua Số điện thoại / Zalo. *
            </label>
          </div>

          {/* Privacy Disclaimer */}
          <div className={styles.privacyText}>
            <p>
              Cháo Nghêu O Hoèn cần thông tin liên hệ mà bạn cung cấp để liên hệ với bạn về các sản phẩm và dịch vụ của chúng tôi. Bạn có thể hủy đăng ký nhận các thông báo này bất kỳ lúc nào. Để biết thêm thông tin về cách hủy đăng ký, cũng như các biện pháp bảo vệ quyền riêng tư của chúng tôi, vui lòng xem Chính sách Bảo mật.
            </p>
          </div>

          {/* reCAPTCHA Mockup */}
          <div className={styles.recaptchaWrapper}>
            <div className={styles.recaptchaBox}>
              <div className={styles.recaptchaLeft}>
                <input type="checkbox" className={styles.recaptchaCheckbox} />
                <span className={styles.recaptchaText}>I'm not a robot</span>
              </div>
              <div className={styles.recaptchaRight}>
                <img 
                  src="https://www.gstatic.com/recaptcha/api2/logo_48.png" 
                  alt="reCAPTCHA" 
                  className={styles.recaptchaLogo}
                />
                <span className={styles.recaptchaBrand}>reCAPTCHA</span>
                <span className={styles.recaptchaLinks}>Privacy - Terms</span>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className={styles.submitWrapper}>
            <button type="submit" className={styles.submitButton}>
              GỬI ĐĂNG KÝ
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default FranchiseForm;
