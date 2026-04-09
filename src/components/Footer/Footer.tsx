import React from 'react';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Logo */}
        <div className={styles.logoSection}>
          <div className={styles.logoCircle}>
            <svg className={styles.logoIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
            </svg>
          </div>
        </div>

        {/* Social Icons */}
        <div className={styles.socialSection}>
          <h3 className={styles.socialTitle}>FOLLOW US</h3>
          <div className={styles.socialIcons}>
            <a href="#" className={styles.socialIcon} aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
            </a>
            <a href="#" className={styles.socialIcon} aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" fill="none" stroke="white" strokeWidth="2" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="white" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className={styles.copyright}>
        <p>O HOÈN COPYRIGHT 2025 ALL RIGHTS RESERVED</p>
      </div>

      {/* Disclaimer */}
      <div className={styles.disclaimer}>
        <p>
          THE INFORMATION ON THIS WEBSITE IS FOR INFORMATIONAL PURPOSES ONLY AND DOES NOT CONSTITUTE AN OFFER TO SELL OR A SOLICITATION OF AN OFFER TO BUY AN O HOÈN FRANCHISE. AN OFFER CAN ONLY BE MADE THROUGH A FRANCHISE DISCLOSURE DOCUMENT (FDD). ONLY AVAILABLE WHERE WE ARE AUTHORIZED TO MAKE SUCH OFFERS. CERTAIN STATES REQUIRE FRANCHISE REGISTRATION. IN ALL SUCH STATES WE WILL NOT OFFER OR SELL ANY FRANCHISE IN THESE STATES UNLESS AND UNTIL WE HAVE COMPLIED WITH APPLICABLE PRE-SALE REGISTRATION AND DISCLOSURE REQUIREMENTS IN YOUR STATE.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
