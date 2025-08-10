import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, firstName, source, variant } = body;

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Store lead in database or CRM
    // For now, we'll just log it and send to a webhook if configured
    const leadData = {
      email,
      firstName,
      source,
      variant,
      timestamp: new Date().toISOString(),
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
      userAgent: request.headers.get('user-agent'),
    };

    // Send to webhook if configured (e.g., Zapier, Make, or direct CRM integration)
    const webhookUrl = process.env.EMAIL_CAPTURE_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(leadData),
        });
      } catch (webhookError) {
        console.error('Webhook error:', webhookError);
        // Don't fail the request if webhook fails
      }
    }

    // Send welcome email with checklist
    await sendWelcomeEmail(email, firstName);

    // Store in local storage/database
    // In production, you'd store this in a proper database
    console.log('Email captured:', leadData);

    return NextResponse.json({
      success: true,
      message: 'Email captured successfully',
    });

  } catch (error) {
    console.error('Email capture error:', error);
    return NextResponse.json(
      { error: 'Failed to capture email' },
      { status: 500 }
    );
  }
}

async function sendWelcomeEmail(email: string, firstName: string) {
  // Implementation depends on your email service
  // Could use SendGrid, Mailgun, AWS SES, etc.
  
  // For now, just log
  console.log(`Would send welcome email to ${firstName} at ${email}`);
  
  // Example with SendGrid (if using)
  /*
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  
  const msg = {
    to: email,
    from: 'hello@aurasprings.com',
    subject: 'Your Free Cleaning Checklist + 20% Off',
    html: `
      <h1>Welcome ${firstName}!</h1>
      <p>Thank you for downloading our Ultimate Cleaning Checklist.</p>
      <p>As promised, here's your 20% off coupon code: <strong>CLEAN20</strong></p>
      <p>Use it when booking your first cleaning service.</p>
      <a href="https://aurasprings.com/downloads/ultimate-cleaning-checklist.pdf">Download Your Checklist</a>
    `,
  };
  
  await sgMail.send(msg);
  */
}