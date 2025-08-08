import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from './ui/button';
import { Home, Phone, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const NotFound: React.FC = () => {
  const handleGoHome = () => {
    window.location.href = '/';
  };

  const handlePhoneClick = () => {
    window.location.href = 'tel:+972533398557';
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/972533398557?text=שלום, הגעתי לעמוד 404 באתר DigitaLoosh', '_blank');
  };

  return (
    <>
      <Helmet>
        <html lang="he" dir="rtl" />
        <title>404 - עמוד לא נמצא | DigitaLoosh</title>
        <meta name="description" content="העמוד שחיפשת לא נמצא באתר DigitaLoosh. חזרו לעמוד הבית או צרו קשר עם הצוות שלנו." />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://digitaloosh.com/404" />
      </Helmet>
      
      <div className="min-h-screen flex items-center justify-center bg-background" dir="rtl">
        <div className="text-center max-w-md mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-8xl font-bold gradient-text mb-4">404</h1>
            <h2 className="text-3xl font-semibold mb-4">העמוד לא נמצא</h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              העמוד שחיפשת לא קיים או הועבר למקום אחר.
              <br />
              בואו נחזור לעמוד הבית או נצור קשר ישירות.
            </p>
            
            <div className="space-y-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  onClick={handleGoHome}
                  className="w-full bg-gradient-to-r from-primary to-primary-glow hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
                >
                  <Home className="w-5 h-5 ml-2" />
                  חזרה לעמוד הבית
                </Button>
              </motion.div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                  <Button
                    variant="outline"
                    onClick={handlePhoneClick}
                    className="w-full glass-card border-primary/20 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
                  >
                    <Phone className="w-4 h-4 ml-2" />
                    התקשרו: 053-339-8557
                  </Button>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                  <Button
                    variant="outline"
                    onClick={handleWhatsAppClick}
                    className="w-full glass-card border-green-500/20 hover:border-green-500/40 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300"
                  >
                    <MessageCircle className="w-4 h-4 ml-2" />
                    וואטסאפ
                  </Button>
                </motion.div>
              </div>
            </div>
            
            <div className="mt-8 p-4 glass-card rounded-lg border border-primary/20">
              <h3 className="font-semibold text-primary mb-2">צריכים עזרה?</h3>
              <p className="text-sm text-muted-foreground">
                הצוות של DigitaLoosh זמין לכם 24/7 לכל שאלה או בקשה
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default NotFound;