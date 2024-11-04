'use client';

import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '@/app/utils/dom';

// Passing a decimal will act as a percentage
type FadeInProps = { offsetY?: number } & React.PropsWithChildren;

export const FadeIn = ({ children, offsetY = 0 }: FadeInProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [minimumOpacity, setMinimumOpacity] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!containerRef.current) return;

      if (prefersReducedMotion()) {
        containerRef.current.style.opacity = '1';
        return;
      }

      const containerClientBottom =
        containerRef.current.offsetTop + containerRef.current.clientHeight;

      const bottomOfScreenScrollY =
        window.scrollY + document.documentElement.clientHeight;

      const offsetForAnimation =
        offsetY < 1 ? containerRef.current.clientHeight * offsetY : offsetY;

      const beginScrollY = bottomOfScreenScrollY - offsetForAnimation;

      if (bottomOfScreenScrollY - offsetForAnimation >= containerClientBottom) {
        containerRef.current.style.opacity = '1';
        setMinimumOpacity(1);
      } else {
        // This is relative to the given offset if appropriate
        const percentageOfContainerShowing =
          (beginScrollY - containerRef.current.offsetTop) /
          containerRef.current.clientHeight;

        const opacity = Math.max(minimumOpacity, percentageOfContainerShowing);
        setMinimumOpacity(opacity);
        containerRef.current.style.opacity = `${opacity}`;
      }
    };

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [minimumOpacity, offsetY]);

  return <div ref={containerRef}>{children}</div>;
};
