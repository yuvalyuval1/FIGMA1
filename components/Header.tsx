import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Menu, Phone, MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'בית', href: '#home' },
    { name: 'שירותים', href: '#services' },
    { name: 'מחירים', href: '#pricing' },
    { name: 'צור קשר', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const handlePhoneClick = () => {
    window.location.href = 'tel:+972533398557';
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/972533398557?text=שלום, אשמח לקבל מידע נוסף על השירותים של DigitaLoosh', '_blank');
  };

  return (
    <motion.header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass-card border-b border-border/20 backdrop-blur-xl'
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center cursor-pointer group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleNavClick('#home')}
          >
            <div className="relative">
              <span className="text-2xl font-bold gradient-text">DigitaLoosh</span>
              <motion.div 
                className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-primary-glow"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 space-x-reverse">
            {navigation.map((item, index) => (
              <motion.button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className="relative text-foreground hover:text-primary-glow transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-primary/5 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
              >
                {item.name}
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-primary-glow origin-center"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.button>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3 space-x-reverse">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="sm"
                onClick={handlePhoneClick}
                className="glass-card border-primary/20 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 group"
              >
                <Phone className="w-4 h-4 ml-2 group-hover:animate-bounce" />
                התקשר עכשיו
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={handleWhatsAppClick}
                className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 group relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-white/10"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.5 }}
                />
                <MessageCircle className="w-4 h-4 ml-2 relative z-10" />
                <span className="relative z-10">וואטסאפ</span>
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden hover:bg-primary/10">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="glass-card border-border/20 backdrop-blur-xl">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-8">
                  <span className="text-xl font-bold gradient-text">DigitaLoosh</span>
                </div>

                <nav className="flex flex-col space-y-6">
                  {navigation.map((item, index) => (
                    <motion.button
                      key={item.name}
                      onClick={() => handleNavClick(item.href)}
                      className="text-right text-lg hover:text-primary-glow transition-colors duration-200 p-3 rounded-lg hover:bg-primary/5"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: -5 }}
                    >
                      {item.name}
                    </motion.button>
                  ))}
                </nav>

                <div className="mt-auto space-y-4">
                  <Button
                    variant="outline"
                    onClick={handlePhoneClick}
                    className="w-full glass-card border-primary/20 hover:border-primary/40 transition-all duration-300"
                  >
                    <Phone className="w-4 h-4 ml-2" />
                    התקשר: 053-339-8557
                  </Button>
                  <Button
                    onClick={handleWhatsAppClick}
                    className="w-full bg-gradient-to-r from-primary to-primary-glow hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
                  >
                    <MessageCircle className="w-4 h-4 ml-2" />
                    וואטסאפ
                  </Button>
                  
                  <div className="text-center text-xs text-muted-foreground mt-6 pt-4 border-t border-border/20">
                    <p>DigitaLoosh - סטודיו דיגיטלי</p>
                    <p>053-339-8557 | digitaloosh@gmail.com</p>
                    <div className="flex justify-center space-x-3 space-x-reverse mt-2">
                      <a 
                        href="https://www.instagram.com/digitaloosh/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary-glow transition-colors"
                      >
                        Instagram
                      </a>
                      <a 
                        href="https://www.tiktok.com/@digitaloosh?_t=ZS-8ycp0DJ6p1e&_r=1"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary-glow transition-colors"
                      >
                        TikTok
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;