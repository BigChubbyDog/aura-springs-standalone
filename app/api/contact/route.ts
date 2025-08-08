import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Email transporter configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER || 'Mail@auraspringcleaning.com',
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      building,
      unit,
      serviceType,
      squareFootage,
      message,
      newsletter,
    } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !serviceType || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Email to business - using current brand colors (green/purple)
    const businessEmail = {
      from: process.env.SMTP_USER || 'Mail@auraspringcleaning.com',
      to: process.env.BUSINESS_EMAIL || 'Mail@auraspringcleaning.com',
      subject: `New Contact Form Submission - ${serviceType}`,
      html: `
        <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4c673d; border-bottom: 3px solid #7c9768; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background: #f7f9f6; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h3 style="color: #7c9768; margin-top: 0;">Client Information</h3>
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Building:</strong> ${building || 'Not specified'}</p>
            <p><strong>Unit:</strong> ${unit || 'Not specified'}</p>
            <p><strong>Square Footage:</strong> ${squareFootage || 'Not specified'}</p>
          </div>
          
          <div style="background: #fff; padding: 20px; border-left: 4px solid #7c9768; margin: 20px 0;">
            <h3 style="color: #4c673d; margin-top: 0;">Service Request</h3>
            <p><strong>Service Type:</strong> ${serviceType}</p>
            <p><strong>Message:</strong></p>
            <p style="background: #f8f9fa; padding: 15px; border-radius: 5px;">${message}</p>
          </div>
          
          <div style="background: #443474; color: white; padding: 15px; border-radius: 5px; text-align: center;">
            <p style="margin: 0;">Newsletter Subscription: ${newsletter ? 'Yes' : 'No'}</p>
          </div>
          
          <p style="color: #666; font-size: 12px; margin-top: 30px;">
            This message was sent from the Aura Spring Cleaning contact form.
          </p>
        </div>
      `,
    };

    // Confirmation email to client - using brand colors
    const clientEmail = {
      from: process.env.SMTP_USER || 'Schedule@AuraSpringCleaning.com',
      to: email,
      subject: 'Thank you for contacting Aura Spring Cleaning',
      html: `
        <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #4c673d 0%, #7c9768 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 2rem;">✨ Aura Spring Cleaning</h1>
            <p style="margin: 10px 0 0; opacity: 0.9;">Austin's Time-Saving Luxury Cleaning Service</p>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
            <h2 style="color: #4c673d; margin-top: 0;">Thank You, ${firstName}!</h2>
            
            <p>We've received your inquiry about our <strong>${serviceType}</strong> service and will respond within 2 hours during business hours.</p>
            
            <div style="background: #f7f9f6; padding: 20px; border-radius: 10px; margin: 20px 0;">
              <h3 style="color: #7c9768; margin-top: 0;">What Happens Next?</h3>
              <ul style="color: #2C3E50; line-height: 1.8;">
                <li>📞 We'll call you within 2 hours to discuss your needs</li>
                <li>📋 Schedule a free consultation if needed</li>
                <li>💎 Provide a detailed quote for your luxury cleaning service</li>
                <li>🗓️ Book your preferred date and time</li>
              </ul>
            </div>
            
            <div style="background: linear-gradient(135deg, #7c9768 0%, #443474 100%); color: white; padding: 20px; border-radius: 10px; text-align: center; margin: 20px 0;">
              <h3 style="margin: 0 0 10px 0;">Need Immediate Assistance?</h3>
              <p style="margin: 0; font-size: 1.2rem; font-weight: bold;">(512) 781-0527</p>
              <p style="margin: 5px 0 0; font-size: 0.9rem;">Available Mon-Sat 8am-6pm</p>
            </div>
            
            <p style="color: #666; text-align: center; margin-top: 30px;">
              Valerie Boatman & Dustin Allan<br>
              <em>Your Time-Saving Cleaning Partners</em>
            </p>
          </div>
        </div>
      `,
    };

    // Send emails
    await Promise.all([
      transporter.sendMail(businessEmail),
      transporter.sendMail(clientEmail)
    ]);

    return NextResponse.json({
      message: 'Contact form submitted successfully',
      success: true,
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to send message. Please try again or call us directly.',
        success: false,
      },
      { status: 500 }
    );
  }
}