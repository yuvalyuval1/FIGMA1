import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Phone, MessageCircle, X, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const StickyCTA: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [shouldBounce, setShouldBounce] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      
      if (scrollPercent > 25 && !isDismissed) {
        setIsVisible(true);
      } else if (scrollPercent <= 25) {
        setIsVisible(false);
      }
    };

    // Bounce animation every 15 seconds when visible
    const bounceInterval = setInterval(() => {
      if (isVisible && !isDismissed) {
        setShouldBounce(true);
        setTimeout(() => setShouldBounce(false), 1000);
      }
    }, 15000);

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(bounceInterval);
    };
  }, [isVisible, isDismissed]);

  const handlePhoneClick = () => {
    window.location.href = 'tel:+972533398557';
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/972533398557?text=שלום, אשמח לקבל מידע נוסף על השירותים של DigitaLoosh', '_blank');
  };

  const handleEmailClick = () => {
    window.location.href = 'mailto:digitaloosh@gmail.com?subject=פנייה מהאתר - DigitaLoosh';
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && !isDismissed && (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            y: 0, 
            scale: 1,
            ...(shouldBounce && {
              y: [0, -15, 0],
              scale: [1, 1.1, 1],
              transition: { duration: 0.8, ease: 'easeInOut' }
            })
          }}
          exit={{ opacity: 0, y: 100, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 z-40 flex flex-col items-center space-y-3"
        >
          {/* Main CTA Buttons */}
          <div className="flex items-center space-x-3 space-x-reverse">
            {/* WhatsApp Button */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={handleWhatsAppClick}
                className="w-14 h-14 rounded-full bg-gradient-to-r from-green-600 to-green-500 hover:shadow-lg hover:shadow-green-500/25 shadow-2xl group relative"
                title="וואטסאפ - DigitaLoosh"
              >
                <MessageCircle className="w-6 h-6 group-hover:animate-bounce" />
                <motion.div
                  className="absolute inset-0 bg-white/10 rounded-full"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </Button>
            </motion.div>

            {/* Phone Button */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={handlePhoneClick}
                variant="outline"
                className="w-14 h-14 rounded-full glass-card border-primary/20 hover:border-primary/40 shadow-2xl group"
                title="התקשר: 053-339-8557"
              >
                <Phone className="w-6 h-6 group-hover:animate-bounce" />
              </Button>
            </motion.div>

            {/* Email Button */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={handleEmailClick}
                variant="outline"
                className="w-14 h-14 rounded-full glass-card border-primary/20 hover:border-primary/40 shadow-2xl group"
                title="אימייל: digitaloosh@gmail.com"
              >
                <Mail className="w-6 h-6 group-hover:animate-bounce" />
              </Button>
            </motion.div>
          </div>

          {/* Contact Info Label */}
          <motion.div 
            className="glass-card px-3 py-1 rounded-full text-xs text-center min-w-max"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="text-primary-glow font-semibold">DigitaLoosh</div>
            <div className="text-muted-foreground">053-339-8557</div>
          </motion.div>

          {/* Dismiss Button */}
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={handleDismiss}
              variant="ghost"
              size="icon"
              className="w-8 h-8 opacity-60 hover:opacity-100 hover:bg-red-500/10"
              title="סגור"
            >
              <X className="w-4 h-4" />
            </Button>
          </motion.div>

          {/* Pulse Ring Animations */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div 
              className="absolute top-0 right-0 w-14 h-14 bg-green-500/20 rounded-full"
              animate={{ scale: [1, 2, 1], opacity: [0.7, 0, 0.7] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0 }}
            />
            <motion.div 
              className="absolute top-0 right-0 w-14 h-14 bg-primary/20 rounded-full"
              animate={{ scale: [1, 2.2, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            />
            <motion.div 
              className="absolute top-0 right-16 w-14 h-14 bg-primary/10 rounded-full"
              animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            />
          </div>

          {/* Floating Text */}
          <motion.div
            className="absolute -top-16 right-0 glass-card px-3 py-1 rounded-lg text-xs whitespace-nowrap"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: shouldBounce ? 1 : 0, y: shouldBounce ? 0 : 10 }}
            transition={{ duration: 0.3 }}
          >
            צריכים עזרה? נשמח לסייע! 💜
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyCTA;