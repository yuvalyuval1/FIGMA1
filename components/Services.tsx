import React from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { 
  Globe, 
  Smartphone, 
  ShoppingCart, 
  Megaphone, 
  Palette, 
  Code,
  Rocket,
  Target
} from 'lucide-react';
import { motion } from 'motion/react';

const Services: React.FC = () => {
  const services = [
    {
      icon: Globe,
      title: 'פיתוח אתרים',
      description: 'אתרים מותאמים אישית עם עיצוב מתקדם וטכנולוגיות חדישות שמביאות תוצאות',
      features: ['עיצוב רספונסיבי', 'אופטימיזציה למנועי חיפוש', 'מהירות טעינה מקסימלית', 'ממשק ניהול פשוט'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Smartphone,
      title: 'אפליקציות מובייל',
      description: 'אפליקציות iOS ו-Android מתקדמות עם חוויית משתמש מעולה ופונקציונליות עשירה',
      features: ['פיתוח Native ו-Cross Platform', 'עיצוב UX/UI מתקדם', 'אינטגרציה מלאה', 'תמיכה שוטפת'],
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: ShoppingCart,
      title: 'חנויות אונליין',
      description: 'מערכות מכירה מקוונת מלאות עם ניהול מלאי, תשלומים מאובטחים ואנליטיקה',
      features: ['עגלת קניות מתקדמת', 'מערכת תשלומים מאובטחת', 'ניהול מלאי אוטומטי', 'דוחות מכירות'],
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Megaphone,
      title: 'שיווק דיגיטלי',
      description: 'קמפיינים ממוקדים ברשתות חברתיות, גוגל ופלטפורמות נוספות להגדלת המכירות',
      features: ['ניהול רשתות חברתיות', 'קמפיינים ממומנים', 'אופטימיזציה לקונבורזיות', 'אנליטיקה מתקדמת'],
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Palette,
      title: 'עיצוב גרפי',
      description: 'זהות חזותית מקצועית, לוגואים ויצירת חומרי שיווק דיגיטליים ומודפסים',
      features: ['עיצוב לוגו ומיתוג', 'חומרי שיווק דיגיטליים', 'עיצוב UI/UX', 'חבילות גרפיות שלמות'],
      color: 'from-pink-500 to-violet-500'
    },
    {
      icon: Code,
      title: 'פתרונות מותאמים',
      description: 'מערכות וכלים דיגיטליים המותאמים בדיוק לצרכים העסקיים הייחודיים שלכם',
      features: ['ניתוח צרכים מעמיק', 'פיתוח בהתאמה אישית', 'אינטגרציה עם מערכות קיימות', 'תמיכה מלאה'],
      color: 'from-teal-500 to-blue-500'
    }
  ];

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent('שלום, אשמח לקבל מידע נוסף על השירותים של DigitaLoosh');
    window.open(`https://wa.me/972533398557?text=${message}`, '_blank');
  };

  const handleServiceInquiry = (serviceName: string) => {
    const message = encodeURIComponent(`שלום, אשמח לקבל מידע נוסף על ${serviceName}`);
    window.open(`https://wa.me/972533398557?text=${message}`, '_blank');
  };

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 glass-card border border-primary/20 rounded-full mb-6">
          <Rocket className="w-4 h-4 text-primary" />
          <span className="text-sm text-primary-glow">השירותים שלנו</span>
        </div>
        
        <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
          הפכנו חלומות דיגיטליים למציאות
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          ב-DigitaLoosh אנו מציעים מגוון רחב של שירותים דיגיטליים מתקדמים שיעזרו לכם להצליח ברשת.
          מפיתוח אתרים ועד שיווק דיגיטלי - אנחנו הכתובת שלכם להצלחה דיגיטלית.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -10 }}
            className="group"
          >
            <Card className="glass-card border-border/20 hover:border-primary/30 transition-all duration-300 h-full hover:shadow-xl hover:shadow-primary/10">
              <CardContent className="p-8 h-full flex flex-col">
                {/* Service Icon */}
                <div className="mb-6 relative">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} p-4 mx-auto relative`}>
                    <service.icon className="w-8 h-8 text-white mx-auto" />
                  </div>
                </div>

                {/* Service Content */}
                <div className="text-center mb-6 flex-grow">
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {service.description}
                  </p>
                  
                  {/* Features List */}
                  <ul className="space-y-3 text-sm">
                    {service.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center justify-start text-muted-foreground"
                      >
                        <span className="w-2 h-2 bg-primary rounded-full ml-3 flex-shrink-0"></span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <Button
                  onClick={() => handleServiceInquiry(service.title)}
                  variant="outline"
                  className="w-full glass-card border-primary/20 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
                >
                  <Target className="w-4 h-4 ml-2" />
                  בואו נתחיל
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Call to Action Section */}
      <div className="text-center">
        <Card className="glass-card border-primary/20 p-8 bg-gradient-to-br from-primary/5 to-primary-glow/5">
          <CardContent className="p-0">
            <h3 className="text-3xl font-bold gradient-text mb-4">
              מוכנים להתחיל?
            </h3>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              בואו נקבע פגישת ייעוץ ללא התחייבות ונראה איך אנחנו יכולים לעזור לכם להגיע ליעדים שלכם
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleWhatsAppClick}
                size="lg"
                className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
              >
                <Rocket className="w-5 h-5 ml-2" />
                בואו נתחיל לעבוד יחד
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  const element = document.querySelector('#contact');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="glass-card border-primary/20 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
              >
                <Target className="w-5 h-5 ml-2" />
                קבלו הצעת מחיר
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Services;