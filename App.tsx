import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import WhyUs from './components/WhyUs';
import Testimonials from './components/Testimonials';
import PricingCalculator from './components/PricingCalculator';
import Contact from './components/Contact';
import ScrollProgress from './components/ScrollProgress';
import StickyCTA from './components/StickyCTA';
import Enhanced3D from './components/3d/Enhanced3D';
import ScrollReveal from './components/animations/ScrollReveal';
import ParallaxSection from './components/animations/ParallaxSection';
import NotFound from './components/NotFound';
import SEOHead from './components/SEO/SEOHead';
import { getOrganizationStructuredData } from './components/SEO/StructuredData';
import './styles/globals.css';

function HomePage() {
  useEffect(() => {
    // Set dark mode and RTL by default
    document.documentElement.classList.add('dark');
    document.documentElement.setAttribute('dir', 'rtl');
    document.documentElement.setAttribute('lang', 'he');
  }, []);


  return (
    <>
      <SEOHead 
        structuredData={getOrganizationStructuredData()}
      />

      <div className="min-h-screen bg-background text-foreground" dir="rtl">
        <ScrollProgress />
        <Header />
        <StickyCTA />
        
        <main className="relative overflow-hidden">
          {/* Hero Section with Enhanced Parallax */}
          <ParallaxSection speed={0.5}>
            <section id="home" className="relative min-h-screen">
              <Hero />
            </section>
          </ParallaxSection>

          {/* Enhanced 3D Feature Section */}
          <ScrollReveal direction="up" delay={0.2}>
            <ParallaxSection speed={0.3}>
              <section className="relative py-20 overflow-hidden">
                <div className="container mx-auto px-4">
                  <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-bold gradient-text mb-6">
                      טכנולוגיה מתקדמת
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                      ב-DigitaLoosh אנו משתמשים בטכנולוגיות החדישות ביותר כדי ליצור חוויות דיגיטליות מרהיבות שמביאות תוצאות אמיתיות
                    </p>
                  </div>
                  <div className="flex justify-center">
                    <div className="w-full max-w-5xl h-[700px]">
                      <Enhanced3D />
                    </div>
                  </div>
                </div>
              </section>
            </ParallaxSection>
          </ScrollReveal>

          {/* Services Section */}
          <ScrollReveal direction="up" delay={0.1}>
            <ParallaxSection speed={0.2}>
              <section id="services" className="py-20 relative">
                <Services />
              </section>
            </ParallaxSection>
          </ScrollReveal>

          {/* Why Us Section */}
          <ScrollReveal direction="up" delay={0.1}>
            <ParallaxSection speed={0.1}>
              <section className="py-20 relative">
                <WhyUs />
              </section>
            </ParallaxSection>
          </ScrollReveal>

          {/* Testimonials Section */}
          <ScrollReveal direction="up" delay={0.1}>
            <section className="py-20 relative">
              <Testimonials />
            </section>
          </ScrollReveal>

          {/* Pricing Calculator Section */}
          <ScrollReveal direction="up" delay={0.1}>
            <ParallaxSection speed={0.1}>
              <section id="pricing" className="py-20 relative">
                <PricingCalculator />
              </section>
            </ParallaxSection>
          </ScrollReveal>

          {/* Contact Section */}
          <ScrollReveal direction="up" delay={0.1}>
            <section id="contact" className="py-20 relative">
              <Contact />
            </section>
          </ScrollReveal>
        </main>

        {/* Enhanced Footer */}
        <footer className="border-t border-border/20 py-12 relative" itemScope itemType="https://schema.org/Organization">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-bold gradient-text mb-4" itemProp="name">DigitaLoosh</h3>
                <p className="text-muted-foreground mb-4" itemProp="description">
                  סטודיו דיגיטלי ישראלי מוביל המתמחה בפיתוח פתרונות דיגיטליים מתקדמים ומותאמים אישית
                </p>
                <div className="flex space-x-4 space-x-reverse">
                  <a 
                    href="https://www.instagram.com/digitaloosh/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                    itemProp="sameAs"
                    aria-label="עקבו אחרינו באינסטגרם"
                  >
                    אינסטגרם
                  </a>
                  <a 
                    href="https://www.tiktok.com/@digitaloosh?_t=ZS-8ycp0DJ6p1e&_r=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                    itemProp="sameAs"
                    aria-label="עקבו אחרינו בטיקטוק"
                  >
                    טיקטוק
                  </a>
                  <a 
                    href="https://www.facebook.com/people/Digitaloosh/61578902201826/?mibextid=wwXIfr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                    itemProp="sameAs"
                    aria-label="עקבו אחרינו בפייסבוק"
                  >
                    פייסבוק
                  </a>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">שירותים</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li><a href="#services" className="hover:text-primary transition-colors">פיתוח אתרים</a></li>
                  <li><a href="#services" className="hover:text-primary transition-colors">אפליקציות מובייל</a></li>
                  <li><a href="#services" className="hover:text-primary transition-colors">שיווק דיגיטלי</a></li>
                  <li><a href="#services" className="hover:text-primary transition-colors">חנויות אונליין</a></li>
                </ul>
              </div>
              
              <div itemProp="contactPoint" itemScope itemType="https://schema.org/ContactPoint">
                <h4 className="font-semibold mb-4">צור קשר</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li itemProp="telephone">
                    <a href="tel:+972533398557" className="hover:text-primary transition-colors">
                      טלפון: 053-339-8557
                    </a>
                  </li>
                  <li itemProp="email">
                    <a href="mailto:digitaloosh@gmail.com" className="hover:text-primary transition-colors">
                      אימייל: digitaloosh@gmail.com
                    </a>
                  </li>
                  <li itemProp="areaServed" itemScope itemType="https://schema.org/Country">
                    <span itemProp="name">כתובת: ישראל</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-border/20 pt-8 text-center">
              <p className="text-muted-foreground">
                © 2025 DigitaLoosh. כל הזכויות שמורות. פותח באהבה בישראל 🇮🇱
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

function NotFound() {
  return (
    <NotFound />
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}