
import { useEffect, useRef, ReactNode } from 'react';

interface ScrollAnimationProps {
  children: ReactNode;
  className?: string;
  threshold?: number;
  delay?: number;
  type?: 'fadeIn' | 'slideUp' | 'slideDown' | 'scale';
}

const ScrollAnimation = ({
  children,
  className = '',
  threshold = 0.1,
  delay = 0,
  type = 'fadeIn',
}: ScrollAnimationProps) => {
  const elementRef = useRef<HTMLDivElement>(null);

  const getAnimationClass = () => {
    switch (type) {
      case 'fadeIn':
        return 'animate-fade-in';
      case 'slideUp':
        return 'animate-slide-up';
      case 'slideDown':
        return 'animate-slide-down';
      case 'scale':
        return 'animate-scale';
      default:
        return 'animate-fade-in';
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              if (elementRef.current) {
                elementRef.current.classList.add(getAnimationClass());
                elementRef.current.style.opacity = '1';
              }
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold,
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [delay, threshold, type]);

  return (
    <div
      ref={elementRef}
      className={`opacity-0 will-change-transform ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default ScrollAnimation;
