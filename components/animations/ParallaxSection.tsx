import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface ParallaxSectionProps {
  children: React.ReactNode;
  speed?: number; // 0.1 = slow, 1 = normal speed, 2 = fast
  direction?: 'up' | 'down';
  className?: string;
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  children,
  speed = 0.5,
  direction = 'up',
  className = ''
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const multiplier = direction === 'up' ? -1 : 1;
    const moveDistance = window.innerHeight * speed * multiplier;

    // Create parallax animation
    triggerRef.current = ScrollTrigger.create({
      trigger: section,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        const yPos = progress * moveDistance;
        
        gsap.set(section, {
          y: yPos,
          ease: 'none'
        });
      }
    });

    // Cleanup
    return () => {
      if (triggerRef.current) {
        triggerRef.current.kill();
      }
    };
  }, [speed, direction]);

  return (
    <div 
      ref={sectionRef} 
      className={`will-change-transform ${className}`}
      style={{ transform: 'translateZ(0)' }} // GPU acceleration
    >
      {children}
    </div>
  );
};

export default ParallaxSection;