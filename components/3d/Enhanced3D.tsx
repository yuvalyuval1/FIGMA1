import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface Enhanced3DProps {
  className?: string;
}

const Enhanced3D: React.FC<Enhanced3DProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={`w-full h-full flex items-center justify-center ${className}`}
      style={{ minHeight: '500px' }}
    >
      <motion.div
        className="relative w-full max-w-4xl h-full flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 1 }}
      >
        {/* 3D Laptop Mockup */}
        <div className="relative perspective-1000">
          <motion.div
            className="laptop-container"
            animate={{ 
              rotateY: [0, 5, -5, 0],
              rotateX: [0, 2, -2, 0]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            style={{
              transformStyle: 'preserve-3d',
              transform: 'rotateX(-10deg) rotateY(15deg)'
            }}
          >
            {/* Laptop Base */}
            <div className="laptop-base w-96 h-64 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-700">
                {/* Keyboard */}
                <div className="absolute inset-4 grid grid-cols-14 gap-1 mt-8">
                  {Array.from({ length: 42 }, (_, i) => (
                    <motion.div
                      key={i}
                      className="bg-gray-700 rounded-sm h-4"
                      animate={{ 
                        backgroundColor: ['#374151', '#8b5cf6', '#374151'],
                        boxShadow: ['0 0 0px rgba(139, 92, 246, 0)', '0 0 10px rgba(139, 92, 246, 0.5)', '0 0 0px rgba(139, 92, 246, 0)']
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity, 
                        delay: i * 0.05 
                      }}
                    />
                  ))}
                </div>
                
                {/* Trackpad */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-20 h-12 bg-gray-600 rounded-lg border border-gray-500"></div>
              </div>
            </div>

            {/* Laptop Screen */}
            <div 
              className="laptop-screen absolute -top-64 left-0 w-96 h-64"
              style={{ transformOrigin: 'bottom center', transform: 'rotateX(-100deg)' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-700 p-4">
                {/* Screen Content */}
                <div className="w-full h-full bg-black rounded-lg p-4 relative overflow-hidden">
                  {/* Code Animation */}
                  <motion.div
                    className="text-green-400 font-mono text-xs leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <motion.div
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="mb-2"
                    >
                      {'>'} DigitaLoosh --init
                    </motion.div>
                    <div className="text-purple-400 mb-1">
                      ✓ פיתוח אתרים מתקדמים
                    </div>
                    <div className="text-blue-400 mb-1">
                      ✓ אפליקציות מובייל
                    </div>
                    <div className="text-pink-400 mb-1">
                      ✓ שיווק דיגיטלי
                    </div>
                    <div className="text-yellow-400 mb-1">
                      ✓ עיצוב UX/UI
                    </div>
                    <motion.div
                      animate={{ opacity: [0, 1] }}
                      transition={{ delay: 2, duration: 0.5 }}
                      className="text-green-400"
                    >
                      Success: פרויקט מוכן! 🚀
                    </motion.div>
                  </motion.div>

                  {/* Floating particles */}
                  {Array.from({ length: 8 }, (_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-primary rounded-full"
                      animate={{
                        x: [0, Math.random() * 300, 0],
                        y: [0, Math.random() * 200, 0],
                        opacity: [0, 1, 0]
                      }}
                      transition={{
                        duration: 4 + Math.random() * 2,
                        repeat: Infinity,
                        delay: i * 0.5
                      }}
                      style={{
                        left: Math.random() * 90 + '%',
                        top: Math.random() * 90 + '%'
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Surrounding Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Floating icons */}
          {[
            { icon: '💻', x: '10%', y: '20%' },
            { icon: '📱', x: '85%', y: '30%' },
            { icon: '🚀', x: '15%', y: '70%' },
            { icon: '⚡', x: '80%', y: '80%' },
            { icon: '✨', x: '50%', y: '10%' },
            { icon: '🎯', x: '20%', y: '50%' }
          ].map((item, index) => (
            <motion.div
              key={index}
              className="absolute text-4xl"
              style={{ left: item.x, top: item.y }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 10, -10, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 4 + index,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {item.icon}
            </motion.div>
          ))}

          {/* Glowing rings */}
          <motion.div
            className="absolute inset-0 border-2 border-primary/20 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.6, 0.2]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute inset-8 border border-primary-glow/30 rounded-full"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.1, 0.4, 0.1],
              rotate: 360
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Enhanced3D;