import React, { useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { ArrowDown, Phone, MessageCircle, Sparkles, Zap, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  targetX: number;
  targetY: number;
  life: number;
  maxLife: number;

  constructor(canvas: HTMLCanvasElement) {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.size = Math.random() * 3 + 1;
    this.color = Math.random() > 0.5 ? '#8b5cf6' : '#ec4899';
    this.targetX = this.x;
    this.targetY = this.y;
    this.life = Math.random() * 1000;
    this.maxLife = 1000;
  }

  update(mouseX: number, mouseY: number, canvas: HTMLCanvasElement) {
    // Enhanced mouse attraction with stronger force
    const dx = mouseX - this.x;
    const dy = mouseY - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 200) {
      const force = (200 - distance) / 200;
      this.vx += (dx / distance) * force * 0.025;
      this.vy += (dy / distance) * force * 0.025;
    }

    // Apply friction
    this.vx *= 0.98;
    this.vy *= 0.98;

    // Update position
    this.x += this.vx;
    this.y += this.vy;

    // Update life for breathing effect
    this.life += 2;
    if (this.life > this.maxLife) {
      this.life = 0;
    }

    // Wrap around edges
    if (this.x < 0) this.x = canvas.width;
    if (this.x > canvas.width) this.x = 0;
    if (this.y < 0) this.y = canvas.height;
    if (this.y > canvas.height) this.y = 0;
  }

  draw(ctx: CanvasRenderingContext2D) {
    const alpha = 0.3 + Math.sin(this.life * 0.01) * 0.3;
    const currentSize = this.size + Math.sin(this.life * 0.02) * 0.5;
    
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 15;
    ctx.shadowColor = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, currentSize, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

const Hero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      ctx.scale(dpr, dpr);
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';

      // Recreate particles
      particlesRef.current = [];
      const particleCount = window.innerWidth < 768 ? 40 : 80;
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push(new Particle(canvas));
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      mouseRef.current.x = touch.clientX - rect.left;
      mouseRef.current.y = touch.clientY - rect.top;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw particles
      particlesRef.current.forEach(particle => {
        particle.update(mouseRef.current.x, mouseRef.current.y, canvas);
        particle.draw(ctx);
      });

      // Draw enhanced connections
      ctx.save();
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, 'rgba(139, 92, 246, 0.2)');
      gradient.addColorStop(1, 'rgba(236, 72, 153, 0.2)');
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 1;

      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const dx = particlesRef.current[i].x - particlesRef.current[j].x;
          const dy = particlesRef.current[i].y - particlesRef.current[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            const alpha = (120 - distance) / 120;
            ctx.globalAlpha = alpha * 0.4;
            ctx.beginPath();
            ctx.moveTo(particlesRef.current[i].x, particlesRef.current[i].y);
            ctx.lineTo(particlesRef.current[j].x, particlesRef.current[j].y);
            ctx.stroke();
          }
        }
      }
      ctx.restore();

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();

    window.addEventListener('resize', resizeCanvas);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  const handleScrollToServices = () => {
    const element = document.querySelector('#services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePhoneClick = () => {
    window.location.href = 'tel:+972533398557';
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/972533398557?text=שלום, אשמח לקבל מידע נוסף על השירותים של DigitaLoosh', '_blank');
  };

  const handleEmailClick = () => {
    window.location.href = 'mailto:digitaloosh@gmail.com?subject=פנייה מהאתר - DigitaLoosh';
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced Background with multiple layers */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/30 via-background to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary-glow/5" />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/3 to-transparent" />
      </div>
      
      {/* Canvas Particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-auto"
        style={{ zIndex: 1 }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Brand Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 glass-card border border-primary/20 rounded-full mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm text-primary-glow">DigitaLoosh - סטודיו דיגיטלי ישראלי מוביל</span>
            <Zap className="w-4 h-4 text-primary-glow animate-pulse" />
          </motion.div>

          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <span className="gradient-text block mb-2">נוציא את העסק שלכם</span>
            <span className="text-foreground block">לעולם הדיגיטלי</span>
          </motion.h1>

          <motion.p 
            className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            ב-<span className="text-primary-glow font-semibold">DigitaLoosh</span> אנו מתמחים בפיתוח אתרים מתקדמים, 
            אפליקציות חכמות ופתרונות דיגיטליים שיקחו את העסק שלכם לשלב הבא.
            <br />
            <span className="text-primary/80">חוויה מותאמת אישית • תוצאות מוכחות • שירות ברמה הגבוהה ביותר</span>
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <motion.div 
              whileHover={{ scale: 1.05, y: -2 }} 
              whileTap={{ scale: 0.95 }}
              className="group"
            >
              <Button
                size="lg"
                onClick={handleWhatsAppClick}
                className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 text-lg px-8 py-6 relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-white/10"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
                <MessageCircle className="w-5 h-5 ml-2 relative z-10 group-hover:animate-bounce" />
                <span className="relative z-10">בוא נתחיל לעבוד יחד</span>
              </Button>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05, y: -2 }} 
              whileTap={{ scale: 0.95 }}
              className="group"
            >
              <Button
                variant="outline"
                size="lg"
                onClick={handlePhoneClick}
                className="glass-card border-primary/20 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 text-lg px-8 py-6"
              >
                <Phone className="w-5 h-5 ml-2 group-hover:animate-bounce" />
                התקשר עכשיו: 053-339-8557
              </Button>
            </motion.div>
          </motion.div>

          {/* Contact Info Row */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 text-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <motion.button
              onClick={handleEmailClick}
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
            >
              <Mail className="w-4 h-4" />
              digitaloosh@gmail.com
            </motion.button>
            
            <span className="text-muted-foreground hidden sm:inline">•</span>
            
            <div className="flex items-center gap-4">
              <motion.a
                href="https://www.instagram.com/digitaloosh/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
              >
                Instagram
              </motion.a>
              <motion.a
                href="https://www.tiktok.com/@digitaloosh?_t=ZS-8ycp0DJ6p1e&_r=1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
              >
                TikTok
              </motion.a>
              <motion.a
                href="https://www.facebook.com/people/Digitaloosh/61578902201826/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
              >
                Facebook
              </motion.a>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-3 gap-8 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            {[
              { number: '500+', label: 'פרויקטים הושלמו' },
              { number: '98%', label: 'לקוחות מרוצים' },
              { number: '24/7', label: 'תמיכה זמינה' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center group cursor-default"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.1 }}
              >
                <div className="text-2xl md:text-3xl font-bold gradient-text mb-1 group-hover:animate-pulse">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Button
                variant="ghost"
                onClick={handleScrollToServices}
                className="text-primary-glow hover:text-primary hover:bg-primary/5 transition-all duration-300 group"
              >
                <ArrowDown className="w-6 h-6 group-hover:animate-bounce" />
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced Decorative elements */}
      <motion.div 
        className="absolute top-1/4 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl"
        animate={{ 
          y: [-20, 20, -20],
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-10 w-48 h-48 bg-primary-glow/10 rounded-full blur-3xl"
        animate={{ 
          y: [20, -20, 20],
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 2
        }}
      />
      <motion.div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-primary/5 to-primary-glow/5 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.3, 0.1],
          rotate: [0, 180, 360]
        }}
        transition={{ 
          duration: 12, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
    </section>
  );
};

export default Hero;