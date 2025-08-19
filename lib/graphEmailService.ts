// Microsoft Graph Email Service
// Uses OAuth2 authentication instead of SMTP

import { Client } from '@microsoft/microsoft-graph-client';
import { ClientSecretCredential } from '@azure/identity';

// Initialize Graph client with app-only authentication
// Using Claude-Master-Automation which has Mail.Send, Calendars.ReadWrite permissions
function getGraphClient() {
  const credential = new ClientSecretCredential(
    process.env.AZURE_TENANT_ID || '753965c2-2a85-437e-a9c9-9f824df99584',
    process.env.AZURE_CLIENT_ID || '94d3924d-79c4-4280-975d-8223752343b8',  // Claude-Master-Automation
    process.env.AZURE_CLIENT_SECRET || 'process.env.AZURE_CLIENT_SECRET'
  );

  return Client.initWithMiddleware({
    authProvider: {
      getAccessToken: async () => {
        const token = await credential.getToken('https://graph.microsoft.com/.default');
        return token?.token || '';
      },
    },
  });
}

export interface EmailData {
  to: string[];
  cc?: string[];
  subject: string;
  htmlContent: string;
  from?: string;
}

/**
 * Send email using Microsoft Graph API
 * More secure and reliable than SMTP
 */
export async function sendEmailViaGraph(emailData: EmailData) {
  try {
    const client = getGraphClient();
    
    // Default sender
    const sender = emailData.from || 'booking@auraspringcleaning.com';
    
    const message = {
      subject: emailData.subject,
      body: {
        contentType: 'HTML',
        content: emailData.htmlContent
      },
      toRecipients: emailData.to.map(email => ({
        emailAddress: { address: email }
      })),
      ccRecipients: emailData.cc ? emailData.cc.map(email => ({
        emailAddress: { address: email }
      })) : [],
      from: {
        emailAddress: { address: sender }
      }
    };

    // Send mail on behalf of the user
    await client.api(`/users/${sender}/sendMail`)
      .post({
        message,
        saveToSentItems: true
      });

    console.log('✅ Email sent successfully via Microsoft Graph');
    return { success: true };
  } catch (error) {
    console.error('❌ Error sending email via Graph:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

/**
 * Send booking confirmation emails
 */
export async function sendBookingEmailsViaGraph(booking: any, bookingId: string) {
  try {
    // Email to business
    await sendEmailViaGraph({
      to: [process.env.EMAIL_TO || 'valerie@auraspringcleaning.com'],
      cc: process.env.EMAIL_CC?.split(',') || ['hello@auraspringcleaning.com'],
      subject: `🎉 NEW BOOKING: ${booking.serviceType} - ${booking.customerName} - $${booking.totalPrice}`,
      htmlContent: generateBusinessEmailHtml(booking, bookingId)
    });

    // Email to customer
    await sendEmailViaGraph({
      to: [booking.customerEmail],
      subject: `Booking Confirmation - Aura Spring Cleaning`,
      htmlContent: generateCustomerEmailHtml(booking, bookingId)
    });

    return { success: true };
  } catch (error) {
    console.error('Error sending booking emails:', error);
    return { success: false, error };
  }
}

function generateBusinessEmailHtml(booking: any, bookingId: string): string {
  return `
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
          </div>
          
          <div style="background: #f4f0f8; padding: 20px; border-radius: 10px;">
            <h3 style="color: #443474; margin-top: 0;">Service Details</h3>
            <p><strong>Service:</strong> ${booking.serviceType}</p>
            <p><strong>Date:</strong> ${booking.serviceDate}</p>
            <p><strong>Time:</strong> ${booking.serviceTime}</p>
            <p><strong>Total:</strong> $${booking.totalPrice}</p>
          </div>
        </div>
        
        ${booking.specialInstructions ? `
          <div style="background: #fff3cd; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h3 style="color: #856404; margin-top: 0;">Special Instructions</h3>
            <p style="margin: 0;">${booking.specialInstructions}</p>
          </div>
        ` : ''}
      </div>
    </div>
  `;
}

function generateCustomerEmailHtml(booking: any, bookingId: string): string {
  return `
    <div style="font-family: 'Inter', Arial, sans-serif; max-width: 700px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #7c9768 0%, #443474 100%); color: white; padding: 30px; text-align: center;">
        <h1 style="margin: 0;">✨ Booking Confirmed!</h1>
        <p style="margin: 10px 0 0; font-size: 1.1rem; opacity: 0.9;">Thank you for choosing Aura Spring Cleaning</p>
      </div>
      
      <div style="padding: 30px; background: white;">
        <p>Dear ${booking.customerName},</p>
        <p>Your cleaning service has been confirmed! We're excited to transform your space.</p>
        
        <div style="background: #f7f9f6; padding: 20px; border-radius: 10px; margin: 20px 0;">
          <h3 style="color: #7c9768; margin-top: 0;">Service Summary</h3>
          <p><strong>Service:</strong> ${booking.serviceType}</p>
          <p><strong>Date & Time:</strong> ${booking.serviceDate} at ${booking.serviceTime}</p>
          <p><strong>Location:</strong> ${booking.address}</p>
          <p><strong>Total Amount:</strong> $${booking.totalPrice}</p>
          <p><strong>Booking ID:</strong> ${bookingId}</p>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <p style="color: #666;">Need to modify your booking?</p>
          <p style="font-size: 1.2rem; color: #7c9768; font-weight: bold;">Call Valerie: (512) 781-0527</p>
        </div>
        
        <p style="color: #666; text-align: center; margin-top: 30px;">
          Valerie Boatman & Dustin Allan<br>
          <em>Giving You Time Back for What Matters</em>
        </p>
      </div>
    </div>
  `;
}