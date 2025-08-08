import React from 'react';
import { Card, CardContent } from './ui/card';
import { 
  Award, 
  Users, 
  Clock, 
  Shield, 
  Lightbulb, 
  Headphones,
  TrendingUp,
  CheckCircle,
  Star,
  Zap
} from 'lucide-react';
import { motion } from 'motion/react';

const WhyUs: React.FC = () => {
  const reasons = [
    {
      icon: Award,
      title: 'ניסיון עשיר',
      description: 'מעל 5 שנות ניסיון בפיתוח פתרונות דיגיטליים מתקדמים',
      stats: '500+ פרויקטים',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Users,
      title: 'צוות מקצועי',
      description: 'מפתחים, מעצבים ואסטרטגים דיגיטליים ברמה הגבוהה ביותר',
      stats: 'צוות של 10+ מומחים',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Clock,
      title: 'זמני אספקה מהירים',
      description: 'עמידה בלוחות זמנים והגשת פרויקטים איכותיים במהירות',
      stats: 'זמן ממוצע: 2-4 שבועות',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Shield,
      title: 'אמינות ואבטחה',
      description: 'הגנה מלאה על המידע שלכם ועמידה בכל התקנים הנדרשים',
      stats: 'אבטחה ברמה בנקאית',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: Lightbulb,
      title: 'חדשנות וטכנולוגיה',
      description: 'שימוש בטכנולוגיות החדישות ביותר ופתרונות חדשניים',
      stats: 'טכנולוגיות 2025',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      icon: Headphones,
      title: 'תמיכה 24/7',
      description: 'זמינות מלאה ותמיכה שוטפת לכל הלקוחות שלנו',
      stats: 'תגובה תוך שעה',
      color: 'from-teal-500 to-blue-500'
    }
  ];

  const achievements = [
    { number: '500+', label: 'פרויקטים הושלמו', icon: TrendingUp },
    { number: '98%', label: 'שיעור שביעות רצון', icon: Star },
    { number: '24/7', label: 'תמיכה זמינה', icon: Headphones },
    { number: '2-4', label: 'שבועות לפרויקט', icon: Clock }
  ];

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
          <CheckCircle className="w-4 h-4 text-primary" />
          <span className="text-sm text-primary-glow">למה DigitaLoosh?</span>
        </motion.div>

        <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
          הסיבות לבחור בנו
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          אנחנו לא סתם סטודיו דיגיטלי - אנחנו שותפים אמיתיים להצלחה שלכם.
          הנה מה שעושה אותנו מיוחדים ומבדיל אותנו מהשאר.
        </p>
      </motion.div>

      {/* Main Reasons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {reasons.map((reason, index) => (
          <motion.div
            key={reason.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -10, scale: 1.02 }}
            className="group"
          >
            <Card className="glass-card border-border/20 hover:border-primary/30 transition-all duration-300 h-full hover:shadow-xl hover:shadow-primary/10">
              <CardContent className="p-8 text-center h-full flex flex-col">
                {/* Icon */}
                <motion.div 
                  className="mb-6 relative"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${reason.color} p-5 mx-auto relative shadow-lg`}>
                    <reason.icon className="w-10 h-10 text-white mx-auto" />
                    <motion.div
                      className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 to-transparent"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  
                  {/* Floating glow effect */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/30 to-primary-glow/30 blur-2xl"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.2, 0.5, 0.2]
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      delay: index * 0.7 
                    }}
                  />
                </motion.div>

                {/* Content */}
                <div className="flex-grow">
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">
                    {reason.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {reason.description}
                  </p>
                  
                  {/* Stats */}
                  <motion.div 
                    className="inline-flex items-center gap-2 px-4 py-2 glass-card border border-primary/20 rounded-full"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Zap className="w-4 h-4 text-primary" />
                    <span className="text-sm font-semibold text-primary-glow">
                      {reason.stats}
                    </span>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Achievement Stats */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Card className="glass-card border-primary/20 bg-gradient-to-br from-primary/5 to-primary-glow/5 p-8">
          <CardContent className="p-0">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold gradient-text mb-4">
                הישגים שמדברים בעד עצמם
              </h3>
              <p className="text-muted-foreground">
                המספרים מראים את רמת השירות והמקצועיות שלנו
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.label}
                  className="text-center group cursor-default"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    className="mb-4"
                    whileHover={{ y: -5 }}
                  >
                    <achievement.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                    <div className="text-3xl md:text-4xl font-bold gradient-text mb-2 group-hover:scale-110 transition-transform duration-300">
                      {achievement.number}
                    </div>
                  </motion.div>
                  <div className="text-sm text-muted-foreground">
                    {achievement.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Process Section */}
      <motion.div
        className="mt-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold gradient-text mb-4">
            תהליך העבודה שלנו
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            תהליך מובנה וברור שמבטיח תוצאות מעולות בכל פעם
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { step: '01', title: 'ייעוץ ותכנון', desc: 'פגישת היכרות ובניית אסטרטגיה' },
            { step: '02', title: 'עיצוב ופיתוח', desc: 'יצירת הפרויקט עם עדכונים שוטפים' },
            { step: '03', title: 'בדיקות ושיפורים', desc: 'בדיקות מקיפות ושיפונים אחרונים' },
            { step: '04', title: 'השקה ותמיכה', desc: 'השקת הפרויקט ותמיכה שוטפת' }
          ].map((process, index) => (
            <motion.div
              key={index}
              className="text-center relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 + index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              {/* Connection Line */}
              {index < 3 && (
                <motion.div 
                  className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary/50 to-primary-glow/50 z-0"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 + index * 0.2, duration: 0.5 }}
                />
              )}
              
              {/* Step Number */}
              <motion.div 
                className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center text-white font-bold text-lg mb-4 mx-auto relative z-10 shadow-lg"
                whileHover={{ scale: 1.1 }}
              >
                {process.step}
              </motion.div>
              
              <h4 className="text-lg font-bold mb-2">{process.title}</h4>
              <p className="text-sm text-muted-foreground">{process.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default WhyUs;