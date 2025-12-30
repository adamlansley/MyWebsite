'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './FadeIn.module.css';
import clsx from 'clsx';

// Passing a decimal will act as a percentage
type FadeInProps = {
  threshold?: number | number[];
  durationMs?: number;
} & React.PropsWithChildren;

export const FadeIn = ({
  children,
  threshold = 0.1,
  durationMs = 500,
}: FadeInProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        console.log(entries);
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  const visibilityClass = clsx({
    [styles.visible]: isVisible,
    [styles.invisible]: !isVisible,
  });

  return (
    <div
      ref={containerRef}
      className={clsx(styles.fadeIn, visibilityClass)}
      style={{ transitionDuration: `${durationMs}ms` }}
    >
      {children}
    </div>
  );
};
