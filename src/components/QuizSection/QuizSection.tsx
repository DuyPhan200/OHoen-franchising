import React from 'react';
import styles from './QuizSection.module.css';

interface QuizSectionProps {
  onTakeQuiz?: () => void;
  quizImageSrc?: string;
  quizImageAlt?: string;
}

/**
 * Quiz Section component
 * Displays franchise quiz information with a single image
 */
const QuizSection: React.FC<QuizSectionProps> = ({ 
  onTakeQuiz,
  quizImageSrc = '3.jpg',
  quizImageAlt = 'Franchise opportunity'
}) => {
  const handleQuizClick = () => {
    onTakeQuiz?.();
  };

  return (
    <section className={styles.quizSection}>
      <div className={styles.container}>
        {/* Left content */}
        <div className={styles.leftContent}>
          <h2 className={styles.title}>
            Bạn có phù hợp với nhượng quyền O Hoèn?
          </h2>
          <p className={styles.description}>
            Khám phá xem cơ hội nhượng quyền O Hoèn có phù hợp với bạn không. 
            Bạn đã sẵn sàng cho chương tiếp theo của mình? Tò mò về quyền sở hữu 
            nhượng quyền nhưng không biết bắt đầu từ đâu? Làm bài kiểm tra nhanh 
            của chúng tôi để xem O Hoèn có thể là sự phù hợp hoàn hảo cho mục tiêu, 
            kinh nghiệm và tầm nhìn của bạn hay không.
          </p>
          <button className={styles.quizButton} onClick={handleQuizClick}>
            Làm bài kiểm tra 3 phút
          </button>
        </div>

        {/* Right content - Single Image */}
        <div className={styles.rightContent}>
          <div className={styles.imageWrapper}>
            <img 
              src={quizImageSrc}
              alt={quizImageAlt}
              className={styles.quizImage}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuizSection;
