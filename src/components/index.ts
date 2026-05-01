/**
 * Central export file for all components
 */

// Basic UI Components
export { default as Header } from './Header';
export { default as Footer } from './Footer';

// Page Sections (New Landing Page)
export { default as HeroSection } from './HeroSection';
export { default as MetricsSection } from './MetricsSection';
export { default as SoulSection } from './SoulSection';
export { default as WhySection } from './WhySection';
export { default as InvestmentPackageSection } from './InvestmentPackageSection';
export { default as MenuSection } from './MenuSection';
export { default as AdvantageSection } from './AdvantageSection';
export { default as FranchiseVision } from './FranchiseVision';
export { default as TestimonialsSection } from './TestimonialsSection';
export { default as FAQSection } from './FAQSection';
export { default as FranchiseForm } from './FranchiseForm';

// Utility & Specialized Components
export { default as NavigationMenu } from './NavigationMenu';
export { default as StickyBar } from './NavigationMenu/StickyBar';
export { NotificationProvider, useNotification } from './Notification/NotificationProvider';

// Pages
export { default as FranchisePage } from './FranchisePage';
export { default as StoryPage } from './StoryPage';

// Obsolete/Legacy Sections (Kept for compatibility if needed, but not used in FranchisePage)
export { default as StatsSection } from './StatsSection';
export { default as QuizSection } from './QuizSection';
export { default as FranchiseHeroSection } from './FranchiseHeroSection';
