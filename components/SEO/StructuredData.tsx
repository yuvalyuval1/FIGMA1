import React from 'react';

export const getOrganizationStructuredData = () => ({
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
});

export const getServiceStructuredData = () => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "פיתוח אתרים ואפליקציות דיגיטליות",
  "description": "שירותי פיתוח אתרים מתקדמים, אפליקציות מובייל ופתרונות דיגיטליים מותאמים אישית",
  "provider": {
    "@type": "Organization",
    "name": "DigitaLoosh",
    "url": "https://digitaloosh.com"
  },
  "areaServed": {
    "@type": "Country",
    "name": "Israel"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Digital Development Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "פיתוח אתרים",
          "description": "אתרים מותאמים אישית עם עיצוב מתקדם וטכנולוגיות חדישות"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "אפליקציות מובייל",
          "description": "אפליקציות iOS ו-Android מתקדמות עם חוויית משתמש מעולה"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "חנויות אונליין",
          "description": "מערכות מכירה מקוונת מלאות עם ניהול מלאי ותשלומים מאובטחים"
        }
      }
    ]
  }
});