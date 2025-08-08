import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import Stripe from 'stripe';
import { 
  BookingData, 
  processNewBooking
} from '@/lib/microsoftIntegration';
import { syncBookingToDynamics } from '@/lib/dynamics365Integration';
import { sendBookingToTeams } from '@/lib/teamsWebhook';

// Initialize Stripe (only if key is provided)
const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-07-30.basil',
    })
  : null;

// Email transporter
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
    const booking: BookingData = await request.json();
    
    // Validate required fields
    if (!booking.customerName || !booking.customerEmail || !booking.customerPhone) {
      return NextResponse.json(
        { error: 'Missing required customer information' },
        { status: 400 }
      );
    }

    if (!booking.serviceDate || !booking.serviceTime) {
      return NextResponse.json(
        { error: 'Missing service date/time' },
        { status: 400 }
      );
    }

    // Generate unique booking ID
    const bookingId = `ASC-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
    // Create Stripe payment intent if payment method is card
    let paymentIntent = null;
    if (stripe && booking.totalPrice && booking.totalPrice > 0) {
      try {
        paymentIntent = await stripe.paymentIntents.create({
          amount: Math.round(booking.totalPrice * 100), // Convert to cents
          currency: 'usd',
          metadata: {
            bookingId: bookingId,
            customerName: booking.customerName,
            serviceType: booking.serviceType,
          },
        });
      } catch (stripeError) {
        console.error('Stripe error:', stripeError);
      }
    }

    // Process booking in Microsoft 365
    const m365Results = await processNewBooking(booking);
    console.log('M365 Integration Results:', m365Results);
    
    // Sync to Dynamics 365 CRM
    const dynamicsResults = await syncBookingToDynamics(booking);
    console.log('Dynamics 365 Integration Results:', dynamicsResults);
    
    // Send enhanced booking emails
    await sendBookingEmails(booking, bookingId);
    
    // Send notification to Teams
    const teamsResult = await sendBookingToTeams({
      ...booking,
      bookingId: bookingId
    });
    console.log('Teams Webhook Result:', teamsResult);

    // Return success response with integration status
    return NextResponse.json({
      success: true,
      message: 'Booking processed successfully',
      bookingId: bookingId,
      paymentIntent: paymentIntent?.client_secret,
      integrations: {
        m365: m365Results,
        dynamics365: {
          success: dynamicsResults.success,
          contactCreated: !!dynamicsResults.contact,
          leadCreated: !!dynamicsResults.lead,
          opportunityCreated: !!dynamicsResults.opportunity,
          appointmentCreated: !!dynamicsResults.appointment
        },
        emailSent: true,
        teamsNotification: teamsResult?.success || false
      },
      booking: {
        ...booking,
        bookingId: bookingId,
        createdAt: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Error processing booking:', error);
    return NextResponse.json(
      { 
        error: 'Failed to process booking', 
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Email sending function with brand colors
async function sendBookingEmails(booking: BookingData, bookingId: string) {
  try {
    // Email to business - using brand colors (green/purple)
    const businessBookingEmail = {
      from: process.env.SMTP_USER || 'Mail@auraspringcleaning.com',
      to: process.env.BUSINESS_EMAIL || 'Mail@auraspringcleaning.com',
      subject: `New Booking: ${booking.serviceType} - ${booking.customerName}`,
      html: `
        <div style="font-family: 'Inter', Arial, sans-serif; max-width: 700px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #4c673d 0%, #7c9768 100%); color: white; padding: 30px; text-align: center;">
            <h1 style="margin: 0;">🎉 NEW BOOKING RECEIVED</h1>
            <p style="margin: 10px 0 0; font-size: 1.1rem; opacity: 0.9;">Booking ID: ${bookingId}</p>
          </div>
          
          <div style="padding: 30px; background: white;">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
              <div style="background: #f7f9f6; padding: 20px; border-radius: 10px;">
                <h3 style="color: #7c9768; margin-top: 0;">Customer Details</h3>
                <p><strong>Name:</strong> ${booking.customerName}</p>
                <p><strong>Email:</strong> ${booking.customerEmail}</p>
                <p><strong>Phone:</strong> ${booking.customerPhone}</p>
                <p><strong>Address:</strong> ${booking.address}</p>
                <p><strong>Size:</strong> ${booking.squareFeet} sq ft</p>
                <p><strong>Rooms:</strong> ${booking.bedrooms} bed / ${booking.bathrooms} bath</p>
              </div>
              
              <div style="background: #f4f0f8; padding: 20px; border-radius: 10px;">
                <h3 style="color: #443474; margin-top: 0;">Service Details</h3>
                <p><strong>Service:</strong> ${booking.serviceType}</p>
                <p><strong>Date:</strong> ${booking.serviceDate}</p>
                <p><strong>Time:</strong> ${booking.serviceTime}</p>
                <p><strong>Frequency:</strong> ${booking.frequency || 'One-time'}</p>
                <p><strong>Add-ons:</strong> ${booking.addOns?.join(', ') || 'None'}</p>
              </div>
            </div>
            
            <div style="background: linear-gradient(135deg, #7c9768 0%, #443474 100%); color: white; padding: 20px; border-radius: 10px; margin: 20px 0; text-align: center;">
              <h3 style="margin: 0 0 10px 0;">Total Amount</h3>
              <p style="margin: 0; font-size: 2rem; font-weight: bold;">$${booking.totalPrice}</p>
            </div>
            
            ${booking.specialInstructions ? `
              <div style="background: #fff3cd; padding: 20px; border-radius: 10px; margin: 20px 0;">
                <h3 style="color: #856404; margin-top: 0;">Special Instructions</h3>
                <p style="margin: 0;">${booking.specialInstructions}</p>
              </div>
            ` : ''}
          </div>
        </div>
      `,
    };

    // Confirmation email to customer - using brand colors
    const customerBookingEmail = {
      from: process.env.SMTP_USER || 'Mail@auraspringcleaning.com',
      to: booking.customerEmail,
      subject: `Booking Confirmed: ${booking.serviceType} - ${bookingId}`,
      html: `
        <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #4c673d 0%, #7c9768 100%); color: white; padding: 30px; text-align: center;">
            <h1 style="margin: 0;">✨ Booking Confirmed!</h1>
            <p style="margin: 10px 0 0; opacity: 0.9;">Your time-saving cleaning service is scheduled</p>
          </div>
          
          <div style="background: white; padding: 30px;">
            <h2 style="color: #4c673d;">Thank you, ${booking.customerName}!</h2>
            <p>Your booking has been confirmed. Here are your service details:</p>
            
            <div style="background: #f7f9f6; padding: 20px; border-radius: 10px; margin: 20px 0;">
              <h3 style="color: #7c9768; margin-top: 0;">Service Summary</h3>
              <p><strong>Service:</strong> ${booking.serviceType}</p>
              <p><strong>Date & Time:</strong> ${booking.serviceDate} at ${booking.serviceTime}</p>
              <p><strong>Location:</strong> ${booking.address}</p>
              <p><strong>Total Amount:</strong> $${booking.totalPrice}</p>
              <p><strong>Booking ID:</strong> ${bookingId}</p>
            </div>
            
            <div style="background: #f4f0f8; padding: 20px; border-radius: 10px; margin: 20px 0;">
              <h3 style="color: #443474; margin-top: 0;">What to Expect</h3>
              <ul style="margin: 0; padding-left: 20px;">
                <li>Our team will arrive promptly at your scheduled time</li>
                <li>All cleaning supplies and equipment will be provided</li>
                <li>We'll perform a final walkthrough with you</li>
                <li>Enjoy your free time while we handle the cleaning!</li>
              </ul>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <p style="color: #666;">Need to modify your booking?</p>
              <p style="font-size: 1.2rem; color: #7c9768; font-weight: bold;">(512) 781-0527</p>
            </div>
            
            <p style="color: #666; text-align: center; margin-top: 30px;">
              Valerie Boatman & Dustin Allan<br>
              <em>Giving You Time Back for What Matters</em>
            </p>
          </div>
        </div>
      `,
    };

    // Send emails
    await Promise.all([
      transporter.sendMail(businessBookingEmail),
      transporter.sendMail(customerBookingEmail)
    ]);

    return { success: true };
  } catch (error) {
    console.error('Email sending error:', error);
    return { success: false, error };
  }
}

// Test endpoint to verify integrations are working
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const test = searchParams.get('test');
    
    if (test === 'dynamics') {
      // Test Dynamics 365 connection
      const { testDynamicsConnection } = await import('@/lib/dynamics365Integration');
      const isConnected = await testDynamicsConnection();
      
      return NextResponse.json({
        service: 'Dynamics 365',
        connected: isConnected,
        url: process.env.DYNAMICS_365_URL,
        tenantId: process.env.NEXT_PUBLIC_AZURE_TENANT_ID
      });
    }
    
    // Return general status
    return NextResponse.json({
      status: 'Booking API is running',
      integrations: {
        m365: {
          tenantId: process.env.NEXT_PUBLIC_AZURE_TENANT_ID,
          clientId: process.env.NEXT_PUBLIC_AZURE_CLIENT_ID,
          configured: !!(process.env.AZURE_CLIENT_SECRET)
        },
        dynamics365: {
          url: process.env.DYNAMICS_365_URL,
          configured: !!(process.env.DYNAMICS_365_CLIENT_SECRET || process.env.AZURE_CLIENT_SECRET)
        },
        email: {
          host: process.env.SMTP_HOST,
          user: process.env.SMTP_USER,
          configured: !!(process.env.SMTP_PASSWORD)
        }
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to check status', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}