import React, { useEffect, useState } from 'react';
import { 
  Header, 
  HeroSection, 
  InvestmentPackageSection, 
  MenuSection,
  AdvantageSection,
  WhySection, 
  FranchiseForm, 
  Footer, 
  StickyBar 
} from '..';
import styles from './FranchisePage.module.css';

const FranchisePage: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const h = document.documentElement;
      const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      setScrollProgress(Math.min(pct, 100));
    };

    const handleRipple = (e: globalThis.MouseEvent) => {
      const target = e.target as HTMLElement;
      const btn = target.closest('.btn-gold');
      if (!btn) return;

      const r = document.createElement('span');
      r.className = 'ripple';
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      r.style.width = `${size}px`;
      r.style.height = `${size}px`;
      r.style.left = `${x}px`;
      r.style.top = `${y}px`;
      
      btn.appendChild(r);
      setTimeout(() => r.remove(), 500);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('click', handleRipple);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', handleRipple);
    };
  }, []);

  return (
    <div className={styles.page}>
      {/* Progress Bar */}
      <div 
        className={styles.progressBar} 
        style={{ width: `${scrollProgress}%` }}
      />

      <Header />
      
      <main id="main-content">
        <HeroSection />
        <MenuSection />
        <AdvantageSection />
        <InvestmentPackageSection />
        <WhySection />
        <FranchiseForm />
      </main>

      <Footer />
      <StickyBar />
    </div>
  );
};

export default FranchisePage;
