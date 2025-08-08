import React, { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'motion/react';

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  once?: boolean;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  distance = 50,
  className = '',
  once = true
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: 0.1 });
  const controls = useAnimation();

  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y: distance, opacity: 0 };
      case 'down':
        return { y: -distance, opacity: 0 };
      case 'left':
        return { x: distance, opacity: 0 };
      case 'right':
        return { x: -distance, opacity: 0 };
      default:
        return { y: distance, opacity: 0 };
    }
  };

  const getAnimatePosition = () => {
    switch (direction) {
      case 'up':
      case 'down':
        return { y: 0, opacity: 1 };
      case 'left':
      case 'right':
        return { x: 0, opacity: 1 };
      default:
        return { y: 0, opacity: 1 };
    }
  };

  useEffect(() => {
    if (isInView) {
      controls.start(getAnimatePosition());
    } else if (!once) {
      controls.start(getInitialPosition());
    }
  }, [isInView, controls, once]);

  return (
    <motion.div
      ref={ref}
      initial={getInitialPosition()}
      animate={controls}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.25, 0.25, 0.75], // Custom easing for smooth animation
        type: 'tween'
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;