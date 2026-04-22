import { useState, useEffect, useRef } from 'react';

interface CounterOptions {
  target: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
  threshold?: number;
}

/**
 * Hook to animate numbers from 0 to target
 */
export const useCounter = ({
  target,
  duration = 1200,
  decimals = 0,
  suffix = '',
  threshold = 0.5
}: CounterOptions) => {
  const [count, setCount] = useState<string>('0' + suffix);
  const ref = useRef<HTMLDivElement>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasRun.current) {
          hasRun.current = true;
          animate();
        }
      },
      { threshold }
    );

    const animate = () => {
      const startTime = performance.now();
      
      const tick = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1);
        // Ease out cubic
        const p = 1 - Math.pow(1 - progress, 3);
        const value = target * p;
        
        let formattedValue: string;
        if (decimals > 0) {
          formattedValue = (value / Math.pow(10, decimals)).toFixed(decimals);
        } else {
          formattedValue = target >= 1000 
            ? Math.round(value).toLocaleString('vi-VN')
            : Math.round(value).toString();
        }
        
        setCount(formattedValue + suffix);
        
        if (progress < 1) {
          requestAnimationFrame(tick);
        }
      };
      
      requestAnimationFrame(tick);
    };

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [target, duration, decimals, suffix, threshold]);

  return { ref, count };
};
