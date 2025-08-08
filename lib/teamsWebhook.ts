import axios from 'axios';

const TEAMS_WEBHOOK_URL = process.env.TEAMS_WEBHOOK_URL || '';

export interface TeamNotification {
  title: string;
  message: string;
  color?: string;
  facts?: Array<{ name: string; value: string }>;
  potentialAction?: Array<{
    '@type': string;
    name: string;
    target?: string[];
  }>;
}

export async function sendTeamsNotification(notification: TeamNotification) {
  if (!TEAMS_WEBHOOK_URL) {
    console.warn('Teams webhook URL not configured');
    return { success: false, error: 'Teams webhook not configured' };
  }

  try {
    const payload = {
      '@type': 'MessageCard',
      '@context': 'https://schema.org/extensions',
      themeColor: notification.color || '7c9768', // Aura Spring green
      summary: notification.title,
      sections: [{
        activityTitle: notification.title,
        activitySubtitle: new Date().toLocaleString('en-US', { 
          timeZone: 'America/Chicago',
          dateStyle: 'full',
          timeStyle: 'short'
        }),
        activityImage: 'https://aurasprings.com/logo.png',
        text: notification.message,
        facts: notification.facts || [],
      }],
      potentialAction: notification.potentialAction || []
    };

    const response = await axios.post(TEAMS_WEBHOOK_URL, payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return { success: true, response: response.data };
  } catch (error) {
    console.error('Error sending Teams notification:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

export async function sendBookingToTeams(booking: any) {
  const facts = [
    { name: 'Customer', value: booking.customerName },
    { name: 'Email', value: booking.customerEmail },
    { name: 'Phone', value: booking.customerPhone },
    { name: 'Service', value: booking.serviceType },
    { name: 'Date', value: `${booking.serviceDate} at ${booking.serviceTime}` },
    { name: 'Address', value: booking.address },
    { name: 'Size', value: `${booking.squareFeet} sq ft (${booking.bedrooms} bed / ${booking.bathrooms} bath)` },
    { name: 'Frequency', value: booking.frequency || 'One-time' },
    { name: 'Total Price', value: `$${booking.totalPrice}` }
  ];

  if (booking.addOns && booking.addOns.length > 0) {
    facts.push({ name: 'Add-ons', value: booking.addOns.join(', ') });
  }

  if (booking.specialInstructions) {
    facts.push({ name: 'Special Instructions', value: booking.specialInstructions });
  }

  const notification: TeamNotification = {
    title: '🎉 New Booking Alert!',
    message: `A new ${booking.serviceType} booking has been received for ${booking.customerName}`,
    color: '00ff00', // Green for success
    facts: facts,
    potentialAction: [
      {
        '@type': 'OpenUri',
        name: 'View in Dashboard',
        target: [`https://aurasprings.com/admin/bookings/${booking.bookingId || booking.customerEmail}`]
      },
      {
        '@type': 'OpenUri',
        name: 'Call Customer',
        target: [`tel:${booking.customerPhone}`]
      },
      {
        '@type': 'OpenUri',
        name: 'Email Customer',
        target: [`mailto:${booking.customerEmail}`]
      }
    ]
  };

  return sendTeamsNotification(notification);
}

export async function sendQuoteToTeams(quote: any) {
  const facts = [
    { name: 'Name', value: quote.name },
    { name: 'Email', value: quote.email },
    { name: 'Phone', value: quote.phone || 'Not provided' },
    { name: 'Service', value: quote.serviceType },
    { name: 'Size', value: `${quote.squareFeet} sq ft` },
    { name: 'Bedrooms', value: quote.bedrooms },
    { name: 'Bathrooms', value: quote.bathrooms },
    { name: 'Frequency', value: quote.frequency || 'One-time' },
    { name: 'Estimated Price', value: `$${quote.estimatedPrice}` }
  ];

  if (quote.addOns && quote.addOns.length > 0) {
    facts.push({ name: 'Add-ons', value: quote.addOns.join(', ') });
  }

  const notification: TeamNotification = {
    title: '💰 New Quote Request',
    message: `${quote.name} requested a quote for ${quote.serviceType}`,
    color: 'ffa500', // Orange for quote
    facts: facts,
    potentialAction: [
      {
        '@type': 'OpenUri',
        name: 'Email Customer',
        target: [`mailto:${quote.email}`]
      }
    ]
  };

  return sendTeamsNotification(notification);
}

export async function sendContactToTeams(contact: any) {
  const facts = [
    { name: 'Name', value: contact.name },
    { name: 'Email', value: contact.email },
    { name: 'Phone', value: contact.phone || 'Not provided' },
    { name: 'Subject', value: contact.subject || 'General Inquiry' }
  ];

  if (contact.message) {
    facts.push({ name: 'Message', value: contact.message });
  }

  const notification: TeamNotification = {
    title: '📧 New Contact Form Submission',
    message: `${contact.name} sent a message via the contact form`,
    color: '0078d4', // Blue for contact
    facts: facts,
    potentialAction: [
      {
        '@type': 'OpenUri',
        name: 'Reply to Email',
        target: [`mailto:${contact.email}?subject=Re: ${contact.subject || 'Your inquiry'}`]
      }
    ]
  };

  return sendTeamsNotification(notification);
}

export async function sendPaymentToTeams(payment: any) {
  const facts = [
    { name: 'Booking ID', value: payment.bookingId },
    { name: 'Customer', value: payment.customerName },
    { name: 'Amount', value: `$${payment.amount}` },
    { name: 'Status', value: payment.status },
    { name: 'Payment Method', value: payment.paymentMethod || 'Card' },
    { name: 'Transaction ID', value: payment.transactionId }
  ];

  const notification: TeamNotification = {
    title: payment.status === 'succeeded' ? '✅ Payment Received' : '❌ Payment Failed',
    message: `Payment ${payment.status} for ${payment.customerName}`,
    color: payment.status === 'succeeded' ? '00ff00' : 'ff0000',
    facts: facts,
    potentialAction: [
      {
        '@type': 'OpenUri',
        name: 'View in Stripe',
        target: [`https://dashboard.stripe.com/payments/${payment.transactionId}`]
      }
    ]
  };

  return sendTeamsNotification(notification);
}