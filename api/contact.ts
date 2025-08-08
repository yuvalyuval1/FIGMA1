import { Resend } from 'resend';
import { z } from 'zod';

// Validation schema
const contactSchema = z.object({
  name: z.string().min(2, 'השם חייב להכיל לפחות 2 תווים'),
  email: z.string().email('כתובת אימייל לא תקינה'),
  phone: z.string().min(9, 'מספר טלפון לא תקין'),
  message: z.string().min(10, 'ההודעה חייבת להכיל לפחות 10 תווים')
});

type ContactFormData = z.infer<typeof contactSchema>;

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Main handler function
export default async function handler(req: Request): Promise<Response> {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    // Parse and validate request body
    const body = await req.json();
    const validatedData = contactSchema.parse(body);
    
    const { name, email, phone, message } = validatedData;

    // Basic spam protection
    const spamKeywords = ['viagra', 'casino', 'loan', 'crypto', 'bitcoin'];
    const messageText = `${name} ${email} ${message}`.toLowerCase();
    if (spamKeywords.some(keyword => messageText.includes(keyword))) {
      return new Response(JSON.stringify({ 
        error: 'הודעה נחסמה',
        details: 'ההודעה זוהתה כספאם'
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Check if Resend API key is available
    const resendApiKey = process.env.RESEND_API_KEY;
    
    if (!resendApiKey) {
      // Graceful fallback - log to console and return success
      console.warn('RESEND_API_KEY not found. Contact form data:', {
        name,
        email,
        phone,
        message,
        timestamp: new Date().toISOString()
      });
      
      return new Response(JSON.stringify({
        success: true,
        message: 'ההודעה התקבלה בהצלחה!',
        details: 'נחזור אליכם בהקדם האפשרי',
        queued: false
      }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Initialize Resend
    const resend = new Resend(resendApiKey);

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
          
          <div class="footer">
            <p><strong>פנייה זו התקבלה מאתר DigitaLoosh</strong></p>
            <p>📞 053-339-8557 | 📧 digitaloosh@gmail.com</p>
            <p>🌐 https://digitaloosh.com</p>
            <p>זמן קבלה: ${new Date().toLocaleString('he-IL')}</p>
            <div style="margin-top: 20px;">
              <a href="mailto:${email}" class="cta">השב ללקוח 📧</a>
              <a href="tel:${phone.replace(/\D/g, '')}" class="cta">התקשר ללקוח 📞</a>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send email to DigitaLoosh team
    const { data, error } = await resend.emails.send({
      from: process.env.CONTACT_FROM || 'DigitaLoosh <noreply@digitaloosh.com>',
      to: [process.env.CONTACT_TO || 'digitaloosh@gmail.com'],
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

═══════════════════════════════
DigitaLoosh - סטודיו דיגיטלי ישראלי
📞 053-339-8557 | 🌐 digitaloosh.com
      `
    });

    if (error) {
      console.error('Email sending error:', error);
      return new Response(JSON.stringify({ 
        error: 'שגיאה בשליחת האימייל',
        details: 'אנא נסו שוב או צרו קשר בטלפון 053-339-8557'
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
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
          
          <p>בברכה והערכה,<br><strong>צוות DigitaLoosh</strong></p>
          
          <div style="text-align: center; font-size: 14px; color: rgba(255,255,255,0.6); margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1);">
            <p>DigitaLoosh - סטודיו דיגיטלי ישראלי מוביל</p>
            <p>📞 053-339-8557 | 📧 digitaloosh@gmail.com</p>
          </div>
        </div>
      </body>
      </html>
    `;

    await resend.emails.send({
      from: process.env.CONTACT_FROM || 'DigitaLoosh <info@digitaloosh.com>',
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

בברכה והערכה,
צוות DigitaLoosh

───────────────────────────────
DigitaLoosh - סטודיו דיגיטלי ישראלי מוביל
📞 053-339-8557 | 📧 digitaloosh@gmail.com
🌐 digitaloosh.com
      `
    });

    return new Response(JSON.stringify({ 
      success: true,
      message: 'ההודעה נשלחה בהצלחה! 🎉',
      details: 'נחזור אליכם בהקדם האפשרי (תוך 24 שעות)',
      queued: true
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Contact form error:', error);
    
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify({
        error: 'נתונים לא תקינים',
        details: error.errors.map(e => e.message).join(', ')
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ 
      error: 'שגיאה בשרת',
      details: 'אנא נסו שוב מאוחר יותר או צרו קשר בטלפון 053-339-8557'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}