import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
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
import './styles/globals.css';

function HomePage() {
  useEffect(() => {
    // Set dark mode and RTL by default
    document.documentElement.classList.add('dark');
    document.documentElement.setAttribute('dir', 'rtl');
    document.documentElement.setAttribute('lang', 'he');
  }, []);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "LocalBusiness"],
        "@id": "https://digitaloosh.com/#organization",
        "name": "DigitaLoosh",
        "alternateName": "דיגיטלוש",
        "url": "https://digitaloosh.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://digitaloosh.com/logo.png",
          "width": 512,
          "height": 512
        },
        "image": {
          "@type": "ImageObject",
          "url": "https://digitaloosh.com/og-image.jpg",
          "width": 1200,
          "height": 630
        },
        "description": "DigitaLoosh - סטודיו דיגיטלי ישראלי מוביל המתמחה בפיתוח אתרים, אפליקציות ופתרונות דיגיטליים מתקדמים. שירות מקצועי, תוצאות מוכחות.",
        "foundingDate": "2020",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "IL",
          "addressLocality": "ישראל"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 32.0853,
          "longitude": 34.7818
        },
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "telephone": "+972533398557",
            "contactType": "customer service",
            "availableLanguage": ["Hebrew", "English"],
            "areaServed": "IL"
          }
        ],
        "email": "digitaloosh@gmail.com",
        "telephone": "+972533398557",
        "sameAs": [
          "https://www.instagram.com/digitaloosh/",
          "https://www.tiktok.com/@digitaloosh?_t=ZS-8ycp0DJ6p1e&_r=1",
          "https://www.facebook.com/people/Digitaloosh/61578902201826/?mibextid=wwXIfr"
        ],
        "serviceArea": {
          "@type": "Country",
          "name": "Israel"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Digital Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "פיתוח אתרים",
                "description": "פיתוח אתרים מתקדמים ורספונסיביים"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "אפליקציות מובייל",
                "description": "פיתוח אפליקציות iOS ו-Android"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "שיווק דיגיטלי",
                "description": "שיווק דיגיטלי ומדיה חברתית"
              }
            }
          ]
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "127",
          "bestRating": "5",
          "worstRating": "1"
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://digitaloosh.com/#website",
        "url": "https://digitaloosh.com",
        "name": "DigitaLoosh - סטודיו דיגיטלי ישראלי",
        "description": "פיתוח אתרים ואפליקציות ברמה הגבוהה ביותר. סטודיו דיגיטלי ישראלי עם ניסיון עשיר בטכנולוגיות מתקדמות ותוצאות מוכחות",
        "publisher": {
          "@id": "https://digitaloosh.com/#organization"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://digitaloosh.com/search?q={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        },
        "inLanguage": "he-IL"
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://digitaloosh.com/#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "בית",
            "item": "https://digitaloosh.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "שירותים",
            "item": "https://digitaloosh.com/#services"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "מחירים",
            "item": "https://digitaloosh.com/#pricing"
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "צור קשר",
            "item": "https://digitaloosh.com/#contact"
          }
        ]
      }
    ]
  };

  return (
    <>
      <Helmet>
        <html lang="he" dir="rtl" />
        <title>DigitaLoosh - סטודיו דיגיטלי ישראלי | פיתוח אתרים ואפליקציות מתקדמות</title>
        <meta name="description" content="DigitaLoosh - סטודיו דיגיטלי ישראלי מוביל. פיתוח אתרים מתקדמים, אפליקציות מובייל ופתרונות דיגיטליים. ניסיון עשיר, תוצאות מוכחות, שירות מקצועי. התקשרו: 053-339-8557" />
        <meta name="keywords" content="פיתוח אתרים, אפליקציות מובייל, שיווק דיגיטלי, עיצוב UX/UI, סטודיו דיגיטלי, ישראל, תל אביב, דיגיטלוש, DigitaLoosh" />
        
        {/* Canonical and Language */}
        <link rel="canonical" href="https://digitaloosh.com/" />
        <link rel="alternate" hrefLang="he-IL" href="https://digitaloosh.com/" />
        <link rel="alternate" hrefLang="x-default" href="https://digitaloosh.com/" />
        
        {/* Preload critical resources */}
        <link rel="preload" href="https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700;800&display=swap" as="style" />
        <link rel="preload" as="image" href="/hero-bg.webp" />
        
        {/* Open Graph */}
        <meta property="og:title" content="DigitaLoosh - סטודיו דיגיטלי ישראלי מוביל" />
        <meta property="og:description" content="פיתוח אתרים ואפליקציות ברמה הגבוהה ביותר. ניסיון עשיר, תוצאות מוכחות, שירות מקצועי." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://digitaloosh.com/" />
        <meta property="og:image" content="https://digitaloosh.com/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="DigitaLoosh - סטודיו דיגיטלי ישראלי" />
        <meta property="og:locale" content="he_IL" />
        <meta property="og:site_name" content="DigitaLoosh" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="DigitaLoosh - סטודיו דיגיטלי ישראלי" />
        <meta name="twitter:description" content="פיתוח אתרים ואפליקציות ברמה הגבוהה ביותר" />
        <meta name="twitter:image" content="https://digitaloosh.com/og-image.jpg" />
        <meta name="twitter:image:alt" content="DigitaLoosh - סטודיו דיגיטלי ישראלי" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <meta name="author" content="DigitaLoosh" />
        <meta name="copyright" content="DigitaLoosh 2025" />
        <meta name="geo.region" content="IL" />
        <meta name="geo.placename" content="Israel" />
        <meta name="geo.position" content="32.0853;34.7818" />
        <meta name="ICBM" content="32.0853, 34.7818" />
        
        {/* Contact Information */}
        <meta name="contact" content="digitaloosh@gmail.com" />
        <meta name="reply-to" content="digitaloosh@gmail.com" />
        <meta name="telephone" content="+972533398557" />
        
        {/* Performance hints */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="format-detection" content="telephone=yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        
        {/* Favicon and PWA icons */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#8b5cf6" />
        <meta name="msapplication-TileColor" content="#8b5cf6" />
        
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>

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
    <>
      <Helmet>
        <html lang="he" dir="rtl" />
        <title>404 - עמוד לא נמצא | DigitaLoosh</title>
        <meta name="description" content="העמוד שחיפשת לא נמצא באתר DigitaLoosh. חזרו לעמוד הבית או צרו קשר עם הצוות שלנו." />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <div className="min-h-screen flex items-center justify-center" dir="rtl">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-6xl font-bold gradient-text mb-4">404</h1>
          <h2 className="text-2xl font-semibold mb-4">העמוד לא נמצא</h2>
          <p className="text-xl text-muted-foreground mb-8">
            העמוד שחיפשת לא קיים או הועבר למקום אחר
          </p>
          <div className="space-y-4">
            <a 
              href="/" 
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary to-primary-glow rounded-lg hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
            >
              חזרה לעמוד הבית
            </a>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <a 
                href="tel:+972533398557"
                className="text-primary hover:text-primary-glow transition-colors"
              >
                התקשרו: 053-339-8557
              </a>
              <span className="hidden sm:inline text-muted-foreground">|</span>
              <a 
                href="https://wa.me/972533398557"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary-glow transition-colors"
              >
                וואטסאפ
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}