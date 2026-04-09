import React from 'react';
import styles from './StatsSection.module.css';

interface StatCard {
  value: string;
  title: string;
  subtitle: string;
}

interface StatsSectionProps {
  stats?: StatCard[];
  title?: string;
}

const defaultStats: StatCard[] = [
  {
    value: '$1.76M',
    title: 'Average Gross Sales 2024',
    subtitle: '(Full Time Traditional Location)\nbased on 2025 FDD'
  },
  {
    value: '$4.68M AUV',
    title: '(Non-traditional Location)',
    subtitle: 'based on 2025 FDD'
  },
  {
    value: '$2.3M',
    title: 'Average Net Income 2024',
    subtitle: 'based on 2025 FDD'
  },
  {
    value: '150+',
    title: 'Locations Nationwide',
    subtitle: 'and growing'
  },
  {
    value: '25 Years',
    title: 'Industry Experience',
    subtitle: 'serving communities'
  }
];

/**
 * Stats Section component
 * Displays franchise statistics in card format
 */
const StatsSection: React.FC<StatsSectionProps> = ({ 
  stats = defaultStats,
  title = 'LỢI THẾ O HOÈN'
}) => {
  return (
    <section className={styles.statsSection}>
      <div className={styles.container}>
        {/* Section Title */}
        <h2 className={styles.sectionTitle}>{title}</h2>

        {/* Top row - 3 cards */}
        <div className={styles.topRow}>
          {stats.slice(0, 3).map((stat, index) => (
            <div key={index} className={styles.statCard}>
              <h3 className={styles.statValue}>{stat.value}</h3>
              <p className={styles.statTitle}>{stat.title}</p>
              <p className={styles.statSubtitle}>{stat.subtitle}</p>
            </div>
          ))}
        </div>

        {/* Bottom row - 2 cards */}
        <div className={styles.bottomRow}>
          {stats.slice(3, 5).map((stat, index) => (
            <div key={index + 3} className={styles.statCard}>
              <h3 className={styles.statValue}>{stat.value}</h3>
              <p className={styles.statTitle}>{stat.title}</p>
              <p className={styles.statSubtitle}>{stat.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
