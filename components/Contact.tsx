import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Phone, Mail, MessageCircle, MapPin, Clock, Copy, Send, CheckCircle, Instagram, Facebook } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner@2.0.3';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const businessInfo = {
    phone: '053-339-8557',
    phoneLink: '+972533398557',
    email: 'digitaloosh@gmail.com',
    whatsapp: 'https://wa.me/972533398557',
    address: 'ישראל',
    hours: 'א-ה: 9:00-18:00',
    instagram: 'https://www.instagram.com/digitaloosh/',
    tiktok: 'https://www.tiktok.com/@digitaloosh?_t=ZS-8ycp0DJ6p1e&_r=1',
    facebook: 'https://www.facebook.com/people/Digitaloosh/61578902201826/?mibextid=wwXIfr'
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'נא להזין שם מלא';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'השם חייב להכיל לפחות 2 תווים';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'נא להזין כתובת אימייל';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'נא להזין כתובת אימייל תקינה';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'נא להזין מספר טלפון';
    } else if (!/^[\d\s\-\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'נא להזין מספר טלפון תקין (ספרות בלבד)';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'נא להזין הודעה';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'ההודעה חייבת להכיל לפחות 10 תווים';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('נא לתקן את השדות המסומנים באדום');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'שגיאה בשליחת ההודעה');
      }

      setIsSuccess(true);
      toast.success('ההודעה נשלחה בהצלחה! נחזור אליכם בהקדם');
      
      // Reset form after success
      setTimeout(() => {
        setFormData({ name: '', email: '', phone: '', message: '' });
        setIsSuccess(false);
      }, 3000);
      
    } catch (error: any) {
      console.error('Form submission error:', error);
      toast.error(error.message || 'שגיאה בשליחת ההודעה. אנא נסו שוב או צרו קשר בטלפון');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePhoneClick = () => {
    window.location.href = `tel:${businessInfo.phoneLink}`;
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent('שלום, אשמח לקבל מידע נוסף על השירותים של DigitaLoosh');
    window.open(`${businessInfo.whatsapp}?text=${message}`, '_blank');
  };

  const handleEmailClick = () => {
    window.location.href = `mailto:${businessInfo.email}?subject=פנייה מהאתר - DigitaLoosh`;
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success(`${label} הועתק ללוח`);
    });
  };

  const formatPhoneForIsrael = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    
    // Format as XXX-XXX-XXXX
    if (digits.length >= 10) {
      return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
    } else if (digits.length >= 6) {
      return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
    } else if (digits.length >= 3) {
      return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    }
    return digits;
  };

  const handlePhoneInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneForIsrael(e.target.value);
    setFormData(prev => ({ ...prev, phone: formatted }));
    
    if (errors.phone) {
      setErrors(prev => ({ ...prev, phone: undefined }));
    }
  };

  return (
    <div className="container mx-auto px-4">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
          בואו נתחיל לעבוד יחד
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          יש לכם פרויקט חדש? רוצים לשדרג את הנוכחות הדיגיטלית שלכם? 
          הצוות של DigitaLoosh כאן כדי להפוך את החזון שלכם למציאות!
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="glass-card border-border/20 relative overflow-hidden">
            <AnimatePresence>
              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute inset-0 bg-primary/10 backdrop-blur-sm flex items-center justify-center z-10"
                >
                  <div className="text-center">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-green-400 mb-2">ההודעה נשלחה!</h3>
                    <p className="text-muted-foreground">נחזור אליכם בהקדם האפשרי</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <Send className="w-6 h-6 text-primary ml-3" />
                <h3 className="text-2xl font-bold">שלחו לנו הודעה</h3>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">שם מלא *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`glass-card border-border/20 mt-2 transition-all duration-300 ${errors.name ? 'border-destructive' : 'focus:border-primary/40'}`}
                    placeholder="איך קוראים לכם?"
                    disabled={isSubmitting}
                  />
                  {errors.name && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-destructive text-sm mt-1"
                    >
                      {errors.name}
                    </motion.p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email">כתובת אימייל *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`glass-card border-border/20 mt-2 transition-all duration-300 ${errors.email ? 'border-destructive' : 'focus:border-primary/40'}`}
                    placeholder="your@email.com"
                    disabled={isSubmitting}
                  />
                  {errors.email && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-destructive text-sm mt-1"
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone">מספר טלפון *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handlePhoneInputChange}
                    className={`glass-card border-border/20 mt-2 transition-all duration-300 ${errors.phone ? 'border-destructive' : 'focus:border-primary/40'}`}
                    placeholder="053-339-8557"
                    disabled={isSubmitting}
                    maxLength={12}
                  />
                  {errors.phone && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-destructive text-sm mt-1"
                    >
                      {errors.phone}
                    </motion.p>
                  )}
                </div>

                <div>
                  <Label htmlFor="message">ספרו לנו על הפרויקט *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`glass-card border-border/20 min-h-[150px] mt-2 transition-all duration-300 ${errors.message ? 'border-destructive' : 'focus:border-primary/40'}`}
                    placeholder="תארו את הפרויקט שלכם: מה המטרה, איזה סוג אתר או אפליקציה אתם מחפשים, לוחות זמנים, ועוד כל פרט שיעזור לנו להבין את הצרכים שלכם..."
                    disabled={isSubmitting}
                  />
                  {errors.message && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-destructive text-sm mt-1"
                    >
                      {errors.message}
                    </motion.p>
                  )}
                </div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    disabled={isSubmitting || isSuccess}
                    className="w-full bg-gradient-to-r from-primary to-primary-glow hover:shadow-lg hover:shadow-primary/25 disabled:opacity-50 transition-all duration-300 relative overflow-hidden"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin ml-2" />
                        שולח הודעה...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 ml-2" />
                        שלח הודעה
                      </>
                    )}
                    <motion.div
                      className="absolute inset-0 bg-white/10"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.6 }}
                    />
                  </Button>
                </motion.div>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  בשליחת הטופס אתם מסכימים לעיבוד הנתונים לצורך מתן מענה לפנייתכם
                </p>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Contact Info & Quick Actions */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Quick Actions */}
          <Card className="glass-card border-border/20">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <MessageCircle className="w-5 h-5 text-primary ml-2" />
                פעולות מהירות
              </h3>
              <div className="space-y-3">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={handleWhatsAppClick}
                    className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:shadow-lg hover:shadow-green-500/25 justify-start transition-all duration-300 group"
                  >
                    <MessageCircle className="w-5 h-5 ml-3 group-hover:animate-bounce" />
                    פתח וואטסאפ
                    <span className="text-xs opacity-75 mr-auto">התגובה הכי מהירה</span>
                  </Button>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={handlePhoneClick}
                    variant="outline"
                    className="w-full glass-card border-primary/20 hover:border-primary/40 justify-start transition-all duration-300 group"
                  >
                    <Phone className="w-5 h-5 ml-3 group-hover:animate-bounce" />
                    התקשר עכשיו
                    <span className="text-xs opacity-75 mr-auto">זמין עכשיו</span>
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={handleEmailClick}
                    variant="outline"
                    className="w-full glass-card border-primary/20 hover:border-primary/40 justify-start transition-all duration-300 group"
                  >
                    <Mail className="w-5 h-5 ml-3 group-hover:animate-bounce" />
                    שלח אימייל
                    <span className="text-xs opacity-75 mr-auto">digitaloosh@gmail.com</span>
                  </Button>
                </motion.div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Details */}
          <Card className="glass-card border-border/20">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <Mail className="w-5 h-5 text-primary ml-2" />
                פרטי התקשרות
              </h3>
              
              <div className="space-y-4">
                <motion.div 
                  className="flex items-center justify-between p-3 bg-primary/5 rounded-lg border border-primary/10 hover:bg-primary/10 transition-colors duration-300"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-primary ml-3" />
                    <div>
                      <div className="font-semibold">{businessInfo.phone}</div>
                      <div className="text-xs text-muted-foreground">זמן תגובה: מיידי</div>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(businessInfo.phone, 'מספר הטלפון')}
                    className="hover:bg-primary/10"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </motion.div>

                <motion.div 
                  className="flex items-center justify-between p-3 bg-primary/5 rounded-lg border border-primary/10 hover:bg-primary/10 transition-colors duration-300"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-primary ml-3" />
                    <div>
                      <div className="font-semibold">{businessInfo.email}</div>
                      <div className="text-xs text-muted-foreground">זמן תגובה: תוך שעה</div>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(businessInfo.email, 'כתובת האימייל')}
                    className="hover:bg-primary/10"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </motion.div>

                <motion.div 
                  className="flex items-center p-3 bg-primary/5 rounded-lg border border-primary/10"
                  whileHover={{ scale: 1.02 }}
                >
                  <MapPin className="w-5 h-5 text-primary ml-3" />
                  <div>
                    <div className="font-semibold">{businessInfo.address}</div>
                    <div className="text-xs text-muted-foreground">פגישות לפי תיאום מראש</div>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex items-center p-3 bg-primary/5 rounded-lg border border-primary/10"
                  whileHover={{ scale: 1.02 }}
                >
                  <Clock className="w-5 h-5 text-primary ml-3" />
                  <div>
                    <div className="font-semibold">{businessInfo.hours}</div>
                    <div className="text-xs text-muted-foreground">תמיכה 24/7 ללקוחות קיימים</div>
                  </div>
                </motion.div>
              </div>
            </CardContent>
          </Card>

          {/* Social Media */}
          <Card className="glass-card border-border/20">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Instagram className="w-5 h-5 text-primary ml-2" />
                עקבו אחרינו
              </h3>
              <div className="grid grid-cols-3 gap-3">
                <motion.a
                  href={businessInfo.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center p-3 bg-primary/5 rounded-lg border border-primary/10 hover:bg-primary/10 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Instagram className="w-6 h-6 text-primary mb-2" />
                  <span className="text-xs">Instagram</span>
                </motion.a>

                <motion.a
                  href={businessInfo.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center p-3 bg-primary/5 rounded-lg border border-primary/10 hover:bg-primary/10 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-6 h-6 text-primary mb-2 font-bold">TT</div>
                  <span className="text-xs">TikTok</span>
                </motion.a>

                <motion.a
                  href={businessInfo.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center p-3 bg-primary/5 rounded-lg border border-primary/10 hover:bg-primary/10 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Facebook className="w-6 h-6 text-primary mb-2" />
                  <span className="text-xs">Facebook</span>
                </motion.a>
              </div>
            </CardContent>
          </Card>

          {/* Business Hours */}
          <Card className="glass-card border-border/20">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Clock className="w-5 h-5 text-primary ml-2" />
                שעות פעילות
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-2 rounded-lg bg-primary/5">
                  <span>ימי ראשון - חמישי</span>
                  <span className="text-primary font-semibold">9:00 - 18:00</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded-lg bg-muted/10">
                  <span>יום שישי</span>
                  <span className="text-muted-foreground">9:00 - 14:00</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded-lg bg-muted/10">
                  <span>שבת</span>
                  <span className="text-muted-foreground">סגור</span>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-primary-glow/10 rounded-lg border border-primary/20">
                <div className="flex items-center mb-2">
                  <CheckCircle className="w-5 h-5 text-green-400 ml-2" />
                  <span className="font-semibold text-green-400">מחויבים לשירות מעולה</span>
                </div>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• תגובה תוך שעה בשעות העבודה</li>
                  <li>• תמיכה טכנית 24/7 ללקוחות</li>
                  <li>• פגישות גם מחוץ לשעות העבודה</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;