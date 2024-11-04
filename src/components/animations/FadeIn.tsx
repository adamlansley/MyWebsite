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
        setMinimumOpacity(1);
        return;
      }

      const containerClientBottom =
        containerRef.current.offsetTop + containerRef.current.clientHeight;

      const bottomOfScreenScrollY =
        window.scrollY + document.documentElement.clientHeight;

      // If we can't scroll anymore (offset can get in the way of this) just max out
      if (bottomOfScreenScrollY === document.body.clientHeight) {
        setMinimumOpacity(1);
        return;
      }

      const offsetForAnimation =
        offsetY < 1 ? containerRef.current.clientHeight * offsetY : offsetY;

      const beginScrollY = bottomOfScreenScrollY - offsetForAnimation;

      if (bottomOfScreenScrollY - offsetForAnimation >= containerClientBottom) {
        setMinimumOpacity(1);
      } else {
        // This is relative to the given offset if appropriate
        const percentageOfContainerShowing =
          (beginScrollY - containerRef.current.offsetTop) /
          containerRef.current.clientHeight;

        const opacity = Math.max(minimumOpacity, percentageOfContainerShowing);
        setMinimumOpacity(opacity);
      }
    };

    window.addEventListener('scroll', onScroll);

    // If we load into view, they should be visible, so immediately invoke
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [minimumOpacity, offsetY]);

  return (
    <div ref={containerRef} style={{ opacity: minimumOpacity }}>
      {children}
    </div>
  );
};
