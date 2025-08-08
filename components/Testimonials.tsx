import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight, Star, Quote, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: 'יוסי כהן',
      role: 'מנכ"ל, חברת טק',
      company: 'TechFlow Solutions',
      content: 'DigitaLoosh הם הכתובת הכי מקצועית שעבדתי איתה. הם הביאו לנו אתר שהגדיל את המכירות ב-200% תוך 6 חודשים. השירות מעולה והתמיכה זמינה תמיד.',
      rating: 5,
      image: '/api/placeholder/80/80',
      project: 'אתר קורפורטיבי + מערכת CRM'
    },
    {
      id: 2,
      name: 'שרה לוי',
      role: 'בעלת עסק',
      company: 'Sarah Fashion',
      content: 'החנות האונליין שפיתחו לי היא פשוט מושלמת! עיצוב מהמם, קלה לשימוש ומביאה הזמנות כל יום. לא האמנתי שזה יכול להיות כל כך פשוט. ממליצה בחום!',
      rating: 5,
      image: '/api/placeholder/80/80',
      project: 'חנות אונליין + מערכת ניהול'
    },
    {
      id: 3,
      name: 'מיכאל רוזן',
      role: 'מייסד',
      company: 'EduTech Israel',
      content: 'האפליקציה שפיתחו לנו פשוט מדהימה! יש לנו כבר מעל 10,000 משתמשים פעילים והפידבקים מעולים. הצוות של DigitaLoosh ליווה אותנו בכל שלב.',
      rating: 5,
      image: '/api/placeholder/80/80',
      project: 'אפליקציה מובייל + פאנל ניהול'
    },
    {
      id: 4,
      name: 'רונית ברק',
      role: 'מנהלת שיווק',
      company: 'Green Energy Co',
      content: 'הקמפיינים הדיגיטליים שהם מנהלים לנו הביאו עליית לידים של 350%. הם באמת מבינים את השוק הישראלי ויודעים איך להגיע לקהל המטרה.',
      rating: 5,
      image: '/api/placeholder/80/80',
      project: 'שיווק דיגיטלי + Google Ads'
    },
    {
      id: 5,
      name: 'דוד גולדשטיין',
      role: 'מנכ"ל',
      company: 'Real Estate Pro',
      content: 'המערכת שפיתחו לניהול הנכסים שלנו חסכה לנו שעות עבודה כל יום. הממשק נוח, הפונקציות מתקדמות והתמיכה פשוט מעולה. השקעה שהתגמלה פי כמה!',
      rating: 5,
      image: '/api/placeholder/80/80',
      project: 'מערכת ניהול נכסים'
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="container mx-auto px-4">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <motion.div 
          className="inline-flex items-center gap-2 px-4 py-2 glass-card border border-primary/20 rounded-full mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <Star className="w-4 h-4 text-primary" />
          <span className="text-sm text-primary-glow">המלצות לקוחות</span>
        </motion.div>

        <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
          מה הלקוחות שלנו אומרים
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          אנחנו גאים בעבודה שלנו, אבל הכי חשוב לנו זה מה שהלקוחות שלנו חושבים.
          הנה כמה המלצות שמרגשות אותנו כל יום מחדש.
        </p>
      </motion.div>

      {/* Main Testimonial Display */}
      <motion.div
        className="max-w-4xl mx-auto mb-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card className="glass-card border-primary/20 relative overflow-hidden">
          <CardContent className="p-8 md:p-12">
            {/* Quote Icon */}
            <motion.div
              className="absolute top-6 right-6 opacity-20"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Quote className="w-16 h-16 text-primary" />
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
                className="relative z-10"
              >
                {/* Rating Stars */}
                <div className="flex justify-center mb-6">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1, duration: 0.3 }}
                    >
                      <Star className="w-6 h-6 text-yellow-400 fill-yellow-400 mx-1" />
                    </motion.div>
                  ))}
                </div>

                {/* Testimonial Content */}
                <blockquote className="text-xl md:text-2xl text-center leading-relaxed mb-8 text-foreground">
                  "{currentTestimonial.content}"
                </blockquote>

                {/* Author Info */}
                <div className="flex items-center justify-center space-x-4 space-x-reverse">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-center sm:text-right">
                    <h4 className="font-bold text-lg">{currentTestimonial.name}</h4>
                    <p className="text-muted-foreground">{currentTestimonial.role}</p>
                    <p className="text-sm text-primary">{currentTestimonial.company}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {currentTestimonial.project}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </CardContent>
        </Card>

        {/* Navigation Controls */}
        <div className="flex items-center justify-center mt-8 space-x-4 space-x-reverse">
          <Button
            variant="outline"
            size="icon"
            onClick={prevTestimonial}
            className="glass-card border-primary/20 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>

          {/* Dots Indicator */}
          <div className="flex space-x-2 space-x-reverse">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-primary scale-125'
                    : 'bg-muted hover:bg-primary/50'
                }`}
              />
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={nextTestimonial}
            className="glass-card border-primary/20 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
        </div>
      </motion.div>

      {/* Testimonials Grid Preview */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {testimonials.slice(0, 3).map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            whileHover={{ y: -5, scale: 1.02 }}
            className="cursor-pointer"
            onClick={() => goToTestimonial(index)}
          >
            <Card className={`glass-card border-border/20 hover:border-primary/30 transition-all duration-300 ${
              index === currentIndex ? 'border-primary/50 shadow-lg shadow-primary/10' : ''
            }`}>
              <CardContent className="p-6">
                {/* Mini Rating */}
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>

                {/* Mini Content */}
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  "{testimonial.content.substring(0, 100)}..."
                </p>

                {/* Mini Author */}
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.company}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Stats Section */}
      <motion.div
        className="mt-16 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <Card className="glass-card border-primary/20 bg-gradient-to-br from-primary/5 to-primary-glow/5 p-8">
          <CardContent className="p-0">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: '5.0', label: 'דירוג ממוצע', icon: '⭐' },
                { number: '250+', label: 'לקוחות מרוצים', icon: '😊' },
                { number: '98%', label: 'שיעור שביעות רצון', icon: '👍' },
                { number: '24/7', label: 'תמיכה זמינה', icon: '🔧' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-4xl mb-2">{stat.icon}</div>
                  <div className="text-3xl font-bold gradient-text mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Testimonials;