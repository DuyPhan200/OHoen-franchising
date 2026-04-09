import React from 'react';
import { HeaderProps } from '../../types';
import Logo from '../Logo';
import { defaultNavigationConfig } from '../../config/navigation';
import { useHeaderScroll } from '../../hooks';
import styles from './Header.module.css';

/**
 * Header component with centered logo
 * Blue gradient background
 * Sticky positioning with scroll shadow effect
 */
const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const isScrolled = useHeaderScroll();

  const handleLogoClick = () => {
    onNavigate?.(defaultNavigationConfig.logoLink);
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`} role="banner">
      {/* Center section: Logo */}
      <div className={styles.headerCenter}>
        <Logo onClick={handleLogoClick} />
      </div>
    </header>
  );
};

export default Header;
