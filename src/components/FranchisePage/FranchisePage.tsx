import React from 'react';
import { FranchisePageProps } from '../../types';
import Header from '../Header';
import FranchiseHeroSection from '../FranchiseHeroSection';
import MetricsSection from '../MetricsSection';
import QuizSection from '../QuizSection';
import SoulSection from '../SoulSection';
import InvestmentPackageSection from '../InvestmentPackageSection';
import FranchiseTimeline from '../FranchiseTimeline';
import FranchiseForm from '../FranchiseForm';
import Footer from '../Footer';
import styles from './FranchisePage.module.css';

/**
 * Franchise Page component with Header, FranchiseHeroSection, and QuizSection
 * Requirements: 11.3, 11.4
 */
const FranchisePage: React.FC<FranchisePageProps> = ({
  heroImageSrc,
  heroImageAlt,
  onNavigate
}) => {
  const handleTakeQuiz = () => {
    // Handle quiz navigation or modal
    console.log('Take quiz clicked');
    // You can add navigation logic here if needed
    // onNavigate?.('/quiz');
  };

  return (
    <div className={styles.page}>
      <Header onNavigate={onNavigate} activePath="/franchise" />
      <FranchiseHeroSection
        imageSrc={heroImageSrc}
        imageAlt={heroImageAlt}
        title=""
      />
      <MetricsSection />
      <QuizSection onTakeQuiz={handleTakeQuiz} />
      <SoulSection />
      <InvestmentPackageSection />
      <FranchiseTimeline />
      <FranchiseForm />
      <Footer />
    </div>
  );
};

export default FranchisePage;
