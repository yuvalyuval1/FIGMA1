import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  noindex?: boolean;
  structuredData?: object;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'DigitaLoosh - סטודיו דיגיטלי ישראלי | פיתוח אתרים ואפליקציות מתקדמות',
  description = 'DigitaLoosh - סטודיו דיגיטלי ישראלי מוביל. פיתוח אתרים מתקדמים, אפליקציות מובייל ופתרונות דיגיטליים. ניסיון עשיר, תוצאות מוכחות, שירות מקצועי. התקשרו: 053-339-8557',
  keywords = 'פיתוח אתרים, אפליקציות מובייל, שיווק דיגיטלי, עיצוב UX/UI, סטודיו דיגיטלי, ישראל, תל אביב, דיגיטלוש, DigitaLoosh',
  canonical = 'https://digitaloosh.com/',
  ogImage = 'https://digitaloosh.com/og-image.jpg',
  ogType = 'website',
  noindex = false,
  structuredData
}) => {
  const googleSiteVerification = process.env.GOOGLE_SITE_VERIFICATION || 'your_verification_token_here';

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <html lang="he" dir="rtl" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="DigitaLoosh" />
      <meta name="copyright" content="DigitaLoosh 2025" />
      
      {/* Robots */}
      <meta name="robots" content={noindex ? 'noindex, follow' : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'} />
      <meta name="googlebot" content={noindex ? 'noindex, follow' : 'index, follow'} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonical} />
      
      {/* Language and Regional */}
      <link rel="alternate" hrefLang="he-IL" href={canonical} />
      <link rel="alternate" hrefLang="x-default" href={canonical} />
      
      {/* Geographic */}
      <meta name="geo.region" content="IL" />
      <meta name="geo.placename" content="Israel" />
      <meta name="geo.position" content="32.0853;34.7818" />
      <meta name="ICBM" content="32.0853, 34.7818" />
      
      {/* Contact Information */}
      <meta name="contact" content="digitaloosh@gmail.com" />
      <meta name="reply-to" content="digitaloosh@gmail.com" />
      <meta name="telephone" content="+972533398557" />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="DigitaLoosh - סטודיו דיגיטלי ישראלי" />
      <meta property="og:locale" content="he_IL" />
      <meta property="og:site_name" content="DigitaLoosh" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content="DigitaLoosh - סטודיו דיגיטלי ישראלי" />
      
      {/* Performance hints */}
      <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      <meta name="format-detection" content="telephone=yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      
      {/* Preload critical resources */}
      <link rel="preload" href="https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700;800&display=swap" as="style" />
      <link rel="preload" as="image" href="/hero-bg.webp" />
      
      {/* Favicon and PWA icons */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/manifest.json" />
      <meta name="theme-color" content="#8b5cf6" />
      <meta name="msapplication-TileColor" content="#8b5cf6" />
      
      {/* Google Search Console Verification */}
      <meta name="google-site-verification" content={googleSiteVerification} />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;