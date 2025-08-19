/**
 * Teams Calendar & Webhook Routing Service
 * Manages master calendar and intelligent webhook routing
 */

import { Client } from '@microsoft/microsoft-graph-client';
import { ClientSecretCredential } from '@azure/identity';

// Initialize Graph client
function getGraphClient() {
  const credential = new ClientSecretCredential(
    process.env.AZURE_TENANT_ID || '753965c2-2a85-437e-a9c9-9f824df99584',
    process.env.AZURE_CLIENT_ID || '94d3924d-79c4-4280-975d-8223752343b8',
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

/**
 * Master Calendar Configuration
 * The central calendar for all Aura Spring bookings
 */
export const MASTER_CALENDAR = {
  // Main calendar hosted on schedule@auraspringcleaning.com
  calendarId: 'schedule@auraspringcleaning.com',
  displayName: 'Aura Spring Master Schedule',
  
  // Calendar categories for different service types
  categories: {
    STANDARD: { color: 'green', displayName: 'Standard Cleaning' },
    DEEP: { color: 'blue', displayName: 'Deep Cleaning' },
    MOVEINOUT: { color: 'orange', displayName: 'Move In/Out' },
    AIRBNB: { color: 'purple', displayName: 'Airbnb Turnover' },
    COMMERCIAL: { color: 'red', displayName: 'Commercial' },
    EMERGENCY: { color: 'darkRed', displayName: 'Emergency Service' }
  }
};

/**
 * Webhook Routing Configuration
 * Intelligent routing based on event type and priority
 */
export const WEBHOOK_ROUTES = {
  // Primary Teams webhook for all notifications
  MAIN_WEBHOOK: process.env.TEAMS_WEBHOOK_URL || 
    'https://adminaccountbcd.webhook.office.com/webhookb2/df9b5b12-f537-435b-a578-c6f540ae7c5c@753965c2-2a85-437e-a9c9-9f824df99584/IncomingWebhook/ade6e7bcf89a420f97b09dd6ca021bbc/85ae95d7-aee8-44ea-8e78-af97c72fa4a9/V2ChyK7Cl-K-zvRJAyxjNAJe8th0jh-73cKcm4Wdw7mfY1',
  
  // Routing rules - defines what goes where
  rules: {
    // New Bookings - High Priority
    NEW_BOOKING: {
      webhooks: ['MAIN_WEBHOOK'],
      emailTo: ['valerie@auraspringcleaning.com', 'dustin@auraspringcleaning.com'],
      emailCc: ['booking@auraspringcleaning.com'],
      createCalendarEvent: true,
      priority: 'HIGH',
      color: '#28a745', // Green
      icon: '🎉'
    },
    
    // Booking Modifications
    BOOKING_MODIFIED: {
      webhooks: ['MAIN_WEBHOOK'],
      emailTo: ['schedule@auraspringcleaning.com'],
      emailCc: ['valerie@auraspringcleaning.com'],
      updateCalendarEvent: true,
      priority: 'MEDIUM',
      color: '#ffc107', // Amber
      icon: '✏️'
    },
    
    // Cancellations - Urgent
    BOOKING_CANCELLED: {
      webhooks: ['MAIN_WEBHOOK'],
      emailTo: ['valerie@auraspringcleaning.com'],
      emailCc: ['dustin@auraspringcleaning.com', 'schedule@auraspringcleaning.com'],
      removeCalendarEvent: true,
      priority: 'HIGH',
      color: '#dc3545', // Red
      icon: '❌'
    },
    
    // Customer Inquiries
    CUSTOMER_INQUIRY: {
      webhooks: ['MAIN_WEBHOOK'],
      emailTo: ['hello@auraspringcleaning.com'],
      emailCc: ['valerie@auraspringcleaning.com'],
      createTask: true,
      priority: 'MEDIUM',
      color: '#17a2b8', // Info blue
      icon: '💬'
    },
    
    // Quote Requests
    QUOTE_REQUEST: {
      webhooks: ['MAIN_WEBHOOK'],
      emailTo: ['valerie@auraspringcleaning.com'],
      emailCc: ['booking@auraspringcleaning.com'],
      createTask: true,
      priority: 'MEDIUM',
      color: '#6f42c1', // Purple
      icon: '💰'
    },
    
    // Team Assignments
    TEAM_ASSIGNMENT: {
      webhooks: ['MAIN_WEBHOOK'],
      emailTo: ['cleaners@auraspringcleaning.com'],
      emailCc: ['schedule@auraspringcleaning.com'],
      updateCalendarEvent: true,
      priority: 'LOW',
      color: '#6c757d', // Gray
      icon: '👥'
    },
    
    // Service Completed
    SERVICE_COMPLETED: {
      webhooks: ['MAIN_WEBHOOK'],
      emailTo: ['valerie@auraspringcleaning.com'],
      emailCc: ['booking@auraspringcleaning.com'],
      updateCalendarEvent: true,
      priority: 'LOW',
      color: '#28a745', // Green
      icon: '✅'
    },
    
    // Payment Received
    PAYMENT_RECEIVED: {
      webhooks: ['MAIN_WEBHOOK'],
      emailTo: ['dustin@auraspringcleaning.com'],
      emailCc: ['booking@auraspringcleaning.com'],
      priority: 'LOW',
      color: '#28a745', // Green
      icon: '💳'
    },
    
    // Emergency/Last Minute
    EMERGENCY_BOOKING: {
      webhooks: ['MAIN_WEBHOOK'],
      emailTo: ['valerie@auraspringcleaning.com', 'dustin@auraspringcleaning.com'],
      smsTo: ['5127810527'], // Valerie's phone
      createCalendarEvent: true,
      priority: 'URGENT',
      color: '#ff0000', // Bright red
      icon: '🚨'
    }
  }
};

/**
 * Create calendar event for a booking
 */
export async function createCalendarEvent(booking: any, eventType: string = 'NEW_BOOKING') {
  try {
    const client = getGraphClient();
    const rule = WEBHOOK_ROUTES.rules[eventType as keyof typeof WEBHOOK_ROUTES.rules];
    
    // Determine category based on service type
    let category = MASTER_CALENDAR.categories.STANDARD;
    if (booking.serviceType?.toLowerCase().includes('deep')) {
      category = MASTER_CALENDAR.categories.DEEP;
    } else if (booking.serviceType?.toLowerCase().includes('move')) {
      category = MASTER_CALENDAR.categories.MOVEINOUT;
    } else if (booking.serviceType?.toLowerCase().includes('airbnb')) {
      category = MASTER_CALENDAR.categories.AIRBNB;
    }
    
    // Parse date and time
    const startDate = new Date(booking.serviceDate);
    const endDate = new Date(startDate);
    
    // Set time based on booking time slot
    if (booking.serviceTime?.toLowerCase().includes('morning')) {
      startDate.setHours(9, 0, 0);
      endDate.setHours(12, 0, 0);
    } else if (booking.serviceTime?.toLowerCase().includes('afternoon')) {
      startDate.setHours(13, 0, 0);
      endDate.setHours(16, 0, 0);
    } else if (booking.serviceTime?.toLowerCase().includes('evening')) {
      startDate.setHours(16, 0, 0);
      endDate.setHours(19, 0, 0);
    }
    
    const event = {
      subject: `${rule?.icon || '🧹'} ${booking.customerName} - ${booking.serviceType}`,
      body: {
        contentType: 'HTML',
        content: `
          <h3>Booking Details</h3>
          <p><strong>Customer:</strong> ${booking.customerName}</p>
          <p><strong>Phone:</strong> ${booking.customerPhone}</p>
          <p><strong>Email:</strong> ${booking.customerEmail}</p>
          <p><strong>Address:</strong> ${booking.address}</p>
          <p><strong>Service:</strong> ${booking.serviceType}</p>
          <p><strong>Size:</strong> ${booking.bedrooms} BR / ${booking.bathrooms} BA - ${booking.squareFeet} sq ft</p>
          <p><strong>Price:</strong> $${booking.totalPrice}</p>
          ${booking.specialInstructions ? `<p><strong>Notes:</strong> ${booking.specialInstructions}</p>` : ''}
          <p><strong>Booking ID:</strong> ${booking.bookingId}</p>
        `
      },
      start: {
        dateTime: startDate.toISOString(),
        timeZone: 'America/Chicago'
      },
      end: {
        dateTime: endDate.toISOString(),
        timeZone: 'America/Chicago'
      },
      location: {
        displayName: booking.address
      },
      categories: [category.displayName],
      importance: rule?.priority === 'URGENT' ? 'high' : 'normal',
      isReminderOn: true,
      reminderMinutesBeforeStart: 60,
      attendees: [
        {
          emailAddress: {
            address: 'valerie@auraspringcleaning.com',
            name: 'Valerie Boatman'
          },
          type: 'required'
        }
      ]
    };
    
    // Create the event
    const createdEvent = await client
      .api(`/users/${MASTER_CALENDAR.calendarId}/calendar/events`)
      .post(event);
    
    console.log(`📅 Calendar event created: ${createdEvent.id}`);
    return createdEvent;
    
  } catch (error) {
    console.error('Error creating calendar event:', error);
    throw error;
  }
}

/**
 * Send Teams webhook notification
 */
export async function sendTeamsNotification(eventType: string, data: any) {
  try {
    const rule = WEBHOOK_ROUTES.rules[eventType as keyof typeof WEBHOOK_ROUTES.rules];
    if (!rule) {
      console.warn(`No routing rule found for event type: ${eventType}`);
      return;
    }
    
    const webhookUrl = WEBHOOK_ROUTES.MAIN_WEBHOOK;
    
    const card = {
      '@type': 'MessageCard',
      '@context': 'https://schema.org/extensions',
      themeColor: rule.color?.replace('#', ''),
      summary: `${rule.icon} ${eventType.replace(/_/g, ' ')}`,
      title: `${rule.icon} ${eventType.replace(/_/g, ' ')}`,
      sections: [
        {
          activityTitle: data.customerName || 'Customer',
          activitySubtitle: new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' }),
          facts: [
            { name: 'Service', value: data.serviceType || 'N/A' },
            { name: 'Date', value: data.serviceDate || 'N/A' },
            { name: 'Time', value: data.serviceTime || 'N/A' },
            { name: 'Location', value: data.address || 'N/A' },
            { name: 'Price', value: `$${data.totalPrice || 0}` },
            { name: 'Phone', value: data.customerPhone || 'N/A' },
            { name: 'Email', value: data.customerEmail || 'N/A' }
          ],
          markdown: true
        }
      ],
      potentialAction: [
        {
          '@type': 'OpenUri',
          name: 'View in Calendar',
          targets: [
            {
              os: 'default',
              uri: `https://outlook.office.com/calendar/view/week`
            }
          ]
        },
        {
          '@type': 'OpenUri',
          name: 'Call Customer',
          targets: [
            {
              os: 'default',
              uri: `tel:${data.customerPhone?.replace(/\D/g, '')}`
            }
          ]
        }
      ]
    };
    
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(card)
    });
    
    if (response.ok) {
      console.log(`✅ Teams notification sent for ${eventType}`);
      return { success: true };
    } else {
      throw new Error(`Teams webhook failed: ${response.statusText}`);
    }
    
  } catch (error) {
    console.error('Error sending Teams notification:', error);
    return { success: false, error };
  }
}

/**
 * Process booking with intelligent routing
 */
export async function processBookingWithRouting(booking: any, eventType: string = 'NEW_BOOKING') {
  const results = {
    calendar: false,
    teams: false,
    emails: false
  };
  
  try {
    const rule = WEBHOOK_ROUTES.rules[eventType as keyof typeof WEBHOOK_ROUTES.rules];
    
    // Create/update calendar event if needed
    if (rule?.createCalendarEvent || rule?.updateCalendarEvent) {
      try {
        await createCalendarEvent(booking, eventType);
        results.calendar = true;
      } catch (error) {
        console.error('Calendar error:', error);
      }
    }
    
    // Send Teams notification
    if (rule?.webhooks?.length > 0) {
      try {
        await sendTeamsNotification(eventType, booking);
        results.teams = true;
      } catch (error) {
        console.error('Teams error:', error);
      }
    }
    
    // Send emails (using Graph email service)
    if (rule?.emailTo?.length > 0) {
      try {
        const { sendEmailViaGraph } = await import('./graphEmailService');
        await sendEmailViaGraph({
          to: rule.emailTo,
          cc: rule.emailCc,
          subject: `${rule.icon} ${eventType.replace(/_/g, ' ')}: ${booking.customerName}`,
          htmlContent: generateEmailHtml(booking, eventType, rule)
        });
        results.emails = true;
      } catch (error) {
        console.error('Email error:', error);
      }
    }
    
    return results;
    
  } catch (error) {
    console.error('Error in processBookingWithRouting:', error);
    return results;
  }
}

function generateEmailHtml(booking: any, eventType: string, rule: any): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: ${rule.color}; color: white; padding: 20px; text-align: center;">
        <h2>${rule.icon} ${eventType.replace(/_/g, ' ')}</h2>
      </div>
      <div style="padding: 20px; background: #f5f5f5;">
        <h3>Booking Information</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Customer:</strong></td><td>${booking.customerName}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Service:</strong></td><td>${booking.serviceType}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Date:</strong></td><td>${booking.serviceDate}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Time:</strong></td><td>${booking.serviceTime}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Address:</strong></td><td>${booking.address}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Phone:</strong></td><td>${booking.customerPhone}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Email:</strong></td><td>${booking.customerEmail}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Total:</strong></td><td>$${booking.totalPrice}</td></tr>
        </table>
        ${booking.specialInstructions ? `<p><strong>Special Instructions:</strong> ${booking.specialInstructions}</p>` : ''}
      </div>
      <div style="padding: 20px; background: #333; color: white; text-align: center;">
        <p>Priority: ${rule.priority}</p>
        <p>Booking ID: ${booking.bookingId}</p>
      </div>
    </div>
  `;
}

export default {
  MASTER_CALENDAR,
  WEBHOOK_ROUTES,
  createCalendarEvent,
  sendTeamsNotification,
  processBookingWithRouting
};