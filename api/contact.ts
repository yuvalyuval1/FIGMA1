import { Resend } from 'resend';

// For Vercel serverless functions
export default async function handler(req: any, res: any) {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, message } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !message) {
      return res.status(400).json({ 
        error: 'חסרים שדות חובה',
        details: 'נא למלא את כל השדות הנדרשים'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        error: 'כתובת אימייל לא תקינה',
        details: 'נא להזין כתובת אימייל תקינה'
      });
    }

    // Validate phone (Israeli format)
    const phoneRegex = /^[\d\s\-\(\)\+]+$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ 
        error: 'מספר טלפון לא תקין',
        details: 'נא להזין מספר טלפון תקין'
      });
    }

    // Basic spam protection
    const spamKeywords = ['viagra', 'casino', 'loan', 'crypto', 'bitcoin'];
    const messageText = `${name} ${email} ${message}`.toLowerCase();
    if (spamKeywords.some(keyword => messageText.includes(keyword))) {
      return res.status(400).json({ 
        error: 'הודעה נחסמה',
        details: 'ההודעה זוהתה כספאם'
      });
    }

    // Initialize Resend (you'll need to set RESEND_API_KEY in environment variables)
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Email template for DigitaLoosh
    const emailHtml = `
      <!DOCTYPE html>
      <html dir="rtl" lang="he">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>פנייה חדשה מהאתר - DigitaLoosh</title>
        <style>
          body {
            font-family: 'Heebo', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            direction: rtl;
            background: linear-gradient(135deg, #0a0118 0%, #1e1b4b 100%);
            margin: 0;
            padding: 20px;
            color: #ffffff;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 16px;
            padding: 30px;
            box-shadow: 0 8px 32px rgba(139, 92, 246, 0.1);
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
          }
          .logo {
            background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 10px;
          }
          .field {
            margin-bottom: 20px;
            padding: 15px;
            background: rgba(255, 255, 255, 0.03);
            border-radius: 8px;
            border: 1px solid rgba(255, 255, 255, 0.1);
          }
          .field-label {
            font-weight: bold;
            color: #8b5cf6;
            margin-bottom: 5px;
          }
          .field-value {
            color: #ffffff;
            line-height: 1.6;
          }
          .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            color: rgba(255, 255, 255, 0.6);
            font-size: 14px;
          }
          .cta {
            background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%);
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            text-decoration: none;
            display: inline-block;
            margin: 10px 5px;
            font-weight: bold;
          }
          .contact-info {
            background: rgba(139, 92, 246, 0.1);
            padding: 15px;
            border-radius: 8px;
            margin-top: 20px;
            border: 1px solid rgba(139, 92, 246, 0.2);
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">DigitaLoosh</div>
            <h2>פנייה חדשה מהאתר 🎉</h2>
          </div>
          
          <div class="field">
            <div class="field-label">שם מלא:</div>
            <div class="field-value">${name}</div>
          </div>
          
          <div class="field">
            <div class="field-label">כתובת אימייל:</div>
            <div class="field-value">${email}</div>
          </div>
          
          <div class="field">
            <div class="field-label">מספר טלפון:</div>
            <div class="field-value">${phone}</div>
          </div>
          
          <div class="field">
            <div class="field-label">הודעה:</div>
            <div class="field-value">${message.replace(/\n/g, '<br>')}</div>
          </div>
          
          <div class="contact-info">
            <h3>פעולות מהירות:</h3>
            <a href="mailto:${email}" class="cta">השב ללקוח 📧</a>
            <a href="tel:${phone.replace(/\D/g, '')}" class="cta">התקשר ללקוח 📞</a>
            <a href="https://wa.me/972533398557?text=${encodeURIComponent(`שלום ${name}, קיבלנו את פנייתכם דרך האתר. אשמח לסייע לכם!`)}" class="cta">וואטסאפ 📱</a>
          </div>
          
          <div class="footer">
            <p><strong>פנייה זו התקבלה מאתר DigitaLoosh</strong></p>
            <p>📞 053-339-8557 | 📧 digitaloosh@gmail.com</p>
            <p>🌐 https://digitaloosh.com</p>
            <p>זמן קבלה: ${new Date().toLocaleString('he-IL')}</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send email to DigitaLoosh team
    const { data, error } = await resend.emails.send({
      from: 'website@digitaloosh.com', // Your verified domain
      to: ['digitaloosh@gmail.com'], // Real email address
      replyTo: email,
      subject: `פנייה חדשה מהאתר - ${name} (${phone})`,
      html: emailHtml,
      text: `
פנייה חדשה מהאתר DigitaLoosh
═══════════════════════════════

👤 שם: ${name}
📧 אימייל: ${email}  
📞 טלפון: ${phone}

💬 הודעה:
${message}

📊 פרטים נוספים:
• זמן קבלה: ${new Date().toLocaleString('he-IL')}
• מקור: אתר DigitaLoosh
• כתובת IP: ${req.headers['x-forwarded-for'] || req.connection.remoteAddress}
• User Agent: ${req.headers['user-agent']}

🚀 פעולות מהירות:
• השב: ${email}
• התקשר: ${phone}
• וואטסאפ: https://wa.me/972533398557

═══════════════════════════════
DigitaLoosh - סטודיו דיגיטלי ישראלי
📞 053-339-8557 | 🌐 digitaloosh.com
      `
    });

    if (error) {
      console.error('Email sending error:', error);
      return res.status(500).json({ 
        error: 'שגיאה בשליחת האימייל',
        details: 'אנא נסו שוב או צרו קשר בטלפון 053-339-8557'
      });
    }

    // Send auto-reply to customer
    const autoReplyHtml = `
      <!DOCTYPE html>
      <html dir="rtl" lang="he">
      <head>
        <meta charset="UTF-8">
        <style>
          body {
            font-family: 'Heebo', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            direction: rtl;
            background: linear-gradient(135deg, #0a0118 0%, #1e1b4b 100%);
            margin: 0;
            padding: 20px;
            color: #ffffff;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 16px;
            padding: 30px;
          }
          .logo {
            background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            font-size: 28px;
            font-weight: bold;
            text-align: center;
            margin-bottom: 20px;
          }
          .highlight {
            background: rgba(139, 92, 246, 0.1);
            padding: 15px;
            border-radius: 8px;
            margin: 15px 0;
            border: 1px solid rgba(139, 92, 246, 0.2);
          }
          .contact-buttons {
            text-align: center;
            margin-top: 20px;
          }
          .btn {
            background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%);
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            text-decoration: none;
            display: inline-block;
            margin: 5px;
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="logo">DigitaLoosh</div>
          <h2>שלום ${name}, תודה על פנייתכם! 🙏</h2>
          
          <p>קיבלנו את הודעתכם ונשמח לעזור לכם להגשים את הפרויקט הדיגיטלי שלכם.</p>
          
          <div class="highlight">
            <h3>🚀 מה הלאה?</h3>
            <ul>
              <li>הצוות שלנו יבדוק את פנייתכם בקפידה</li>
              <li>נחזור אליכם תוך 24 שעות עם הצעה מותאמת</li>
              <li>נקבע פגישת ייעוץ ראשונית (ללא התחייבות)</li>
            </ul>
          </div>
          
          <div class="highlight">
            <h3>📞 נושא דחוף? צרו קשר ישירות:</h3>
            <div class="contact-buttons">
              <a href="tel:+972533398557" class="btn">📞 התקשרו: 053-339-8557</a>
              <a href="https://wa.me/972533398557" class="btn">💬 וואטסאפ</a>
            </div>
          </div>
          
          <p>בברכה והערכה,<br><strong>צוות DigitaLoosh</strong></p>
          
          <hr style="border: 1px solid rgba(255,255,255,0.1); margin: 20px 0;">
          
          <div style="text-align: center; font-size: 14px; color: rgba(255,255,255,0.6);">
            <p>DigitaLoosh - סטודיו דיגיטלי ישראלי מוביל</p>
            <p>📞 053-339-8557 | 📧 digitaloosh@gmail.com</p>
            <p>🔗 <a href="https://www.instagram.com/digitaloosh/" style="color: #8b5cf6;">Instagram</a> | 
               <a href="https://www.tiktok.com/@digitaloosh" style="color: #8b5cf6;">TikTok</a> | 
               <a href="https://www.facebook.com/people/Digitaloosh/61578902201826/" style="color: #8b5cf6;">Facebook</a></p>
          </div>
        </div>
      </body>
      </html>
    `;

    await resend.emails.send({
      from: 'info@digitaloosh.com',
      to: [email],
      subject: `תודה על פנייתכם - DigitaLoosh נחזור אליכם בקרוב! 🚀`,
      html: autoReplyHtml,
      text: `
שלום ${name},

תודה על פנייתכם לDigitaLoosh! 🙏

קיבלנו את הודעתכם ונשמח לעזור לכם להגשים את הפרויקט הדיגיטלי שלכם.

🚀 מה הלאה?
• הצוות שלנו יבדוק את פנייתכם בקפידה
• נחזור אליכם תוך 24 שעות עם הצעה מותאמת  
• נקבע פגישת ייעוץ ראשונית (ללא התחייבות)

📞 נושא דחוף? צרו קשר ישירות:
• טלפון: 053-339-8557
• וואטסאפ: https://wa.me/972533398557

בברכה והערכה,
צוות DigitaLoosh

───────────────────────────────
DigitaLoosh - סטודיו דיגיטלי ישראלי מוביל
📞 053-339-8557 | 📧 digitaloosh@gmail.com
🌐 digitaloosh.com
      `
    });

    // Optional: Store in database or log (example implementation)
    try {
      // You could add database storage here
      console.log('Contact form submission:', { name, email, phone, timestamp: new Date().toISOString() });
    } catch (logError) {
      console.error('Logging error:', logError);
    }

    return res.status(200).json({ 
      success: true,
      message: 'ההודעה נשלחה בהצלחה! 🎉',
      details: 'נחזור אליכם בהקדם האפשרי (תוך 24 שעות)'
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ 
      error: 'שגיאה בשרת',
      details: 'אנא נסו שוב מאוחר יותר או צרו קשר בטלפון 053-339-8557'
    });
  }
}

// For Netlify functions, export as netlify function
export const handler = async (event: any, context: any) => {
  const req = {
    method: event.httpMethod,
    body: JSON.parse(event.body || '{}'),
    headers: event.headers
  };
  
  const res = {
    setHeader: () => {},
    status: (code: number) => ({
      json: (data: any) => ({
        statusCode: code,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'POST, OPTIONS'
        },
        body: JSON.stringify(data)
      }),
      end: () => ({
        statusCode: code,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'POST, OPTIONS'
        },
        body: ''
      })
    })
  };

  return await handler(req, res);
};