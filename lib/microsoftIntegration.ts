import { Client } from '@microsoft/microsoft-graph-client';
import { TokenCredentialAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials';
import { ClientSecretCredential } from '@azure/identity';

// Microsoft Graph API Configuration
const TENANT_ID = process.env.NEXT_PUBLIC_AZURE_TENANT_ID || 'your-tenant-id';
const CLIENT_ID = process.env.NEXT_PUBLIC_AZURE_CLIENT_ID || 'your-client-id';
const CLIENT_SECRET = process.env.AZURE_CLIENT_SECRET || 'your-client-secret';
const TEAMS_CHANNEL_ID = process.env.TEAMS_CHANNEL_ID || 'your-channel-id';
const TEAM_ID = process.env.TEAMS_TEAM_ID || 'your-team-id';
const GROUP_EMAIL = 'Schedule@AuraSpringCleaning.com';
const CALENDAR_ID = process.env.CALENDAR_ID || 'primary';

// Booking notification webhook URL (Microsoft Power Automate or Logic Apps)
const WEBHOOK_URL = process.env.BOOKING_WEBHOOK_URL || '';

export interface BookingData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  serviceType: string;
  serviceDate: string;
  serviceTime: string;
  address: string;
  squareFeet: number;
  bedrooms: number;
  bathrooms: number;
  addOns: string[];
  frequency: string;
  totalPrice: number;
  specialInstructions?: string;
}

// Initialize Microsoft Graph Client
function getGraphClient() {
  const credential = new ClientSecretCredential(
    TENANT_ID,
    CLIENT_ID,
    CLIENT_SECRET
  );

  const authProvider = new TokenCredentialAuthenticationProvider(credential, {
    scopes: [
      'https://graph.microsoft.com/.default',
      'Calendars.ReadWrite',
      'Mail.Send',
      'ChannelMessage.Send',
      'Team.ReadBasic.All'
    ]
  });

  return Client.initWithMiddleware({
    authProvider: authProvider,
  });
}

// Send booking notification to Teams channel
export async function sendToTeamsChannel(booking: BookingData) {
  try {
    const client = getGraphClient();
    
    const message = {
      body: {
        contentType: 'html',
        content: `
          <h2>🎉 New Booking Alert!</h2>
          <hr/>
          <p><strong>Customer:</strong> ${booking.customerName}</p>
          <p><strong>Email:</strong> <a href="mailto:${booking.customerEmail}">${booking.customerEmail}</a></p>
          <p><strong>Phone:</strong> <a href="tel:${booking.customerPhone}">${booking.customerPhone}</a></p>
          <hr/>
          <h3>Service Details</h3>
          <ul>
            <li><strong>Type:</strong> ${booking.serviceType}</li>
            <li><strong>Date:</strong> ${booking.serviceDate}</li>
            <li><strong>Time:</strong> ${booking.serviceTime}</li>
            <li><strong>Location:</strong> ${booking.address}</li>
            <li><strong>Size:</strong> ${booking.squareFeet} sq ft</li>
            <li><strong>Bedrooms:</strong> ${booking.bedrooms}</li>
            <li><strong>Bathrooms:</strong> ${booking.bathrooms}</li>
            <li><strong>Frequency:</strong> ${booking.frequency}</li>
            ${booking.addOns.length > 0 ? `<li><strong>Add-ons:</strong> ${booking.addOns.join(', ')}</li>` : ''}
            ${booking.specialInstructions ? `<li><strong>Notes:</strong> ${booking.specialInstructions}</li>` : ''}
          </ul>
          <h3>💰 Total: $${booking.totalPrice}</h3>
          <p><a href="https://aurasprings.com/admin/bookings/${booking.customerEmail}">View in Dashboard</a></p>
        `
      },
      importance: 'high',
      mentions: []
    };

    await client.api(`/teams/${TEAM_ID}/channels/${TEAMS_CHANNEL_ID}/messages`)
      .post(message);

    return { success: true, message: 'Sent to Teams channel' };
  } catch (error) {
    console.error('Error sending to Teams:', error);
    return { success: false, error: error.message };
  }
}

// Create calendar event for booking
export async function createCalendarEvent(booking: BookingData) {
  try {
    const client = getGraphClient();
    
    const startDateTime = new Date(`${booking.serviceDate}T${booking.serviceTime}`);
    const endDateTime = new Date(startDateTime);
    endDateTime.setHours(endDateTime.getHours() + 3); // Assume 3-hour service window

    const event = {
      subject: `Cleaning: ${booking.customerName} - ${booking.serviceType}`,
      body: {
        contentType: 'HTML',
        content: `
          <h3>Booking Details</h3>
          <p><strong>Customer:</strong> ${booking.customerName}</p>
          <p><strong>Phone:</strong> ${booking.customerPhone}</p>
          <p><strong>Email:</strong> ${booking.customerEmail}</p>
          <p><strong>Address:</strong> ${booking.address}</p>
          <p><strong>Service:</strong> ${booking.serviceType}</p>
          <p><strong>Property:</strong> ${booking.bedrooms}BR/${booking.bathrooms}BA - ${booking.squareFeet} sq ft</p>
          <p><strong>Price:</strong> $${booking.totalPrice}</p>
          ${booking.specialInstructions ? `<p><strong>Special Instructions:</strong> ${booking.specialInstructions}</p>` : ''}
        `
      },
      start: {
        dateTime: startDateTime.toISOString(),
        timeZone: 'America/Chicago'
      },
      end: {
        dateTime: endDateTime.toISOString(),
        timeZone: 'America/Chicago'
      },
      location: {
        displayName: booking.address,
        address: {
          street: booking.address,
          city: 'Austin',
          state: 'TX',
          countryOrRegion: 'USA'
        }
      },
      attendees: [
        {
          emailAddress: {
            address: booking.customerEmail,
            name: booking.customerName
          },
          type: 'required'
        },
        {
          emailAddress: {
            address: GROUP_EMAIL,
            name: 'Aura Spring Cleaning Team'
          },
          type: 'required'
        }
      ],
      isReminderOn: true,
      reminderMinutesBeforeStart: 1440, // 24 hours
      categories: ['Cleaning Service', booking.serviceType],
      showAs: 'busy',
      importance: 'high'
    };

    const response = await client.api(`/me/calendar/events`)
      .post(event);

    return { success: true, eventId: response.id };
  } catch (error) {
    console.error('Error creating calendar event:', error);
    return { success: false, error: error.message };
  }
}

// Send email notification to group email
export async function sendEmailNotification(booking: BookingData) {
  try {
    const client = getGraphClient();
    
    const message = {
      message: {
        subject: `New Booking: ${booking.customerName} - ${booking.serviceDate}`,
        body: {
          contentType: 'HTML',
          content: `
            <!DOCTYPE html>
            <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background-color: #7c9768; color: white; padding: 20px; text-align: center; }
                .content { background-color: #f5f5f5; padding: 20px; }
                .detail-row { margin: 10px 0; }
                .label { font-weight: bold; color: #333; }
                .value { color: #666; }
                .footer { background-color: #333; color: white; padding: 10px; text-align: center; }
                .btn { background-color: #7c9768; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>New Booking Received!</h1>
                </div>
                <div class="content">
                  <h2>Customer Information</h2>
                  <div class="detail-row">
                    <span class="label">Name:</span> <span class="value">${booking.customerName}</span>
                  </div>
                  <div class="detail-row">
                    <span class="label">Email:</span> <span class="value">${booking.customerEmail}</span>
                  </div>
                  <div class="detail-row">
                    <span class="label">Phone:</span> <span class="value">${booking.customerPhone}</span>
                  </div>
                  
                  <h2>Service Details</h2>
                  <div class="detail-row">
                    <span class="label">Service Type:</span> <span class="value">${booking.serviceType}</span>
                  </div>
                  <div class="detail-row">
                    <span class="label">Date:</span> <span class="value">${booking.serviceDate}</span>
                  </div>
                  <div class="detail-row">
                    <span class="label">Time:</span> <span class="value">${booking.serviceTime}</span>
                  </div>
                  <div class="detail-row">
                    <span class="label">Address:</span> <span class="value">${booking.address}</span>
                  </div>
                  <div class="detail-row">
                    <span class="label">Property Size:</span> <span class="value">${booking.bedrooms}BR/${booking.bathrooms}BA - ${booking.squareFeet} sq ft</span>
                  </div>
                  <div class="detail-row">
                    <span class="label">Frequency:</span> <span class="value">${booking.frequency}</span>
                  </div>
                  ${booking.addOns.length > 0 ? `
                  <div class="detail-row">
                    <span class="label">Add-ons:</span> <span class="value">${booking.addOns.join(', ')}</span>
                  </div>` : ''}
                  ${booking.specialInstructions ? `
                  <div class="detail-row">
                    <span class="label">Special Instructions:</span> <span class="value">${booking.specialInstructions}</span>
                  </div>` : ''}
                  
                  <h2>Pricing</h2>
                  <div class="detail-row" style="font-size: 1.2em;">
                    <span class="label">Total Price:</span> <span class="value">$${booking.totalPrice}</span>
                  </div>
                  
                  <div style="margin-top: 30px; text-align: center;">
                    <a href="https://aurasprings.com/admin/bookings" class="btn">View in Dashboard</a>
                  </div>
                </div>
                <div class="footer">
                  <p>Aura Spring Cleaning - Austin's Premier Cleaning Service</p>
                </div>
              </div>
            </body>
            </html>
          `
        },
        toRecipients: [
          {
            emailAddress: {
              address: GROUP_EMAIL
            }
          }
        ],
        ccRecipients: [
          {
            emailAddress: {
              address: 'Dustin@AuraSpringCleaning.com'
            }
          },
          {
            emailAddress: {
              address: 'Valerie@AuraSpringCleaning.com'
            }
          }
        ],
        importance: 'high'
      },
      saveToSentItems: true
    };

    await client.api('/me/sendMail').post(message);
    
    return { success: true, message: 'Email sent successfully' };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
}

// Main function to handle all booking notifications
export async function processNewBooking(booking: BookingData) {
  const results = {
    teams: false,
    calendar: false,
    email: false,
    webhook: false
  };

  // Send to Teams channel
  try {
    const teamsResult = await sendToTeamsChannel(booking);
    results.teams = teamsResult.success;
  } catch (error) {
    console.error('Teams notification failed:', error);
  }

  // Create calendar event
  try {
    const calendarResult = await createCalendarEvent(booking);
    results.calendar = calendarResult.success;
  } catch (error) {
    console.error('Calendar event creation failed:', error);
  }

  // Send email notification
  try {
    const emailResult = await sendEmailNotification(booking);
    results.email = emailResult.success;
  } catch (error) {
    console.error('Email notification failed:', error);
  }

  // Send to webhook (Power Automate/Logic Apps)
  if (WEBHOOK_URL) {
    try {
      const webhookResponse = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(booking)
      });
      results.webhook = webhookResponse.ok;
    } catch (error) {
      console.error('Webhook notification failed:', error);
    }
  }

  return results;
}

// Function to send booking confirmation to customer
export async function sendCustomerConfirmation(booking: BookingData) {
  try {
    const client = getGraphClient();
    
    const message = {
      message: {
        subject: 'Booking Confirmation - Aura Spring Cleaning',
        body: {
          contentType: 'HTML',
          content: `
            <html>
            <body style="font-family: Arial, sans-serif;">
              <div style="max-width: 600px; margin: 0 auto;">
                <h1 style="color: #7c9768;">Thank You for Your Booking!</h1>
                <p>Dear ${booking.customerName},</p>
                <p>We're excited to confirm your cleaning service booking with Aura Spring Cleaning.</p>
                
                <div style="background-color: #f5f5f5; padding: 20px; border-radius: 10px; margin: 20px 0;">
                  <h2 style="color: #333;">Booking Details</h2>
                  <p><strong>Service:</strong> ${booking.serviceType}</p>
                  <p><strong>Date:</strong> ${booking.serviceDate}</p>
                  <p><strong>Time:</strong> ${booking.serviceTime}</p>
                  <p><strong>Address:</strong> ${booking.address}</p>
                  <p><strong>Total Price:</strong> $${booking.totalPrice}</p>
                </div>
                
                <p>Our professional cleaning team will arrive at your location on the scheduled date and time.</p>
                <p>If you need to make any changes to your booking, please contact us at:</p>
                <ul>
                  <li>Phone: (512) 781-0527</li>
                  <li>Email: Schedule@AuraSpringCleaning.com</li>
                </ul>
                
                <p>Thank you for choosing Aura Spring Cleaning!</p>
                
                <p style="color: #666; font-size: 0.9em;">
                  Best regards,<br>
                  The Aura Spring Cleaning Team
                </p>
              </div>
            </body>
            </html>
          `
        },
        toRecipients: [
          {
            emailAddress: {
              address: booking.customerEmail,
              name: booking.customerName
            }
          }
        ],
        importance: 'normal'
      },
      saveToSentItems: true
    };

    await client.api('/me/sendMail').post(message);
    
    return { success: true };
  } catch (error) {
    console.error('Error sending customer confirmation:', error);
    return { success: false, error: error.message };
  }
}