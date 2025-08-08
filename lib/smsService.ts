import twilio from 'twilio';

// Twilio configuration
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER || '+15127810527';
const BUSINESS_PHONE = '+15127810527';

// Lazy initialize Twilio client to avoid build-time errors
let twilioClient: ReturnType<typeof twilio> | null = null;

function getTwilioClient() {
  if (!twilioClient) {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    
    if (accountSid && authToken && accountSid.startsWith('AC')) {
      twilioClient = twilio(accountSid, authToken);
    }
  }
  return twilioClient;
}

export interface SMSMessage {
  to: string;
  body: string;
  mediaUrl?: string;
}

// Format phone number to E.164 format
export function formatPhoneNumber(phone: string): string {
  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Add US country code if not present
  if (cleaned.length === 10) {
    return `+1${cleaned}`;
  } else if (cleaned.length === 11 && cleaned.startsWith('1')) {
    return `+${cleaned}`;
  }
  
  return phone; // Return as-is if format is unclear
}

// Send SMS notification
export async function sendSMS(message: SMSMessage): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const client = getTwilioClient();
  
  if (!client) {
    console.warn('Twilio not configured - SMS not sent');
    return { success: false, error: 'SMS service not configured' };
  }

  try {
    const result = await client.messages.create({
      body: message.body,
      from: TWILIO_PHONE_NUMBER,
      to: formatPhoneNumber(message.to),
      ...(message.mediaUrl && { mediaUrl: [message.mediaUrl] })
    });

    return { 
      success: true, 
      messageId: result.sid 
    };
  } catch (error) {
    console.error('SMS sending error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to send SMS' 
    };
  }
}

// Customer notification templates
export const customerSMSTemplates = {
  bookingConfirmation: (name: string, date: string, time: string, bookingId: string) => 
    `Hi ${name}! Your Aura Spring cleaning is confirmed for ${date} at ${time}. Booking ID: ${bookingId}. Reply STOP to opt out.`,
  
  reminderTomorrow: (name: string, time: string) =>
    `Hi ${name}! Reminder: Your Aura Spring cleaning is tomorrow at ${time}. We'll see you then! Questions? Call ${BUSINESS_PHONE}`,
  
  reminderToday: (name: string, time: string) =>
    `Good morning ${name}! Your Aura Spring cleaning team will arrive today at ${time}. Please ensure we have access to your property.`,
  
  enRoute: (name: string, eta: string) =>
    `Hi ${name}! Your Aura Spring cleaning team is on the way! ETA: ${eta}. Track your cleaner: auraspringcleaning.com/track`,
  
  completed: (name: string) =>
    `Hi ${name}! Your home has been cleaned by Aura Spring. We hope you love it! Please rate your experience: auraspringcleaning.com/review`,
  
  paymentReminder: (name: string, amount: string) =>
    `Hi ${name}, payment of ${amount} for your cleaning service is due. Pay online: auraspringcleaning.com/pay`,
};

// Worker notification templates
export const workerSMSTemplates = {
  newAssignment: (workerName: string, customerName: string, address: string, time: string) =>
    `${workerName}, new job assigned! Customer: ${customerName} at ${address}, ${time}. View details: auraspringcleaning.com/worker`,
  
  scheduleReminder: (workerName: string, jobCount: number, firstJob: string) =>
    `Good morning ${workerName}! You have ${jobCount} cleanings today. First job at ${firstJob}. Check app for full schedule.`,
  
  routeUpdate: (workerName: string, change: string) =>
    `${workerName}, schedule update: ${change}. Check your app for updated route.`,
  
  urgentJob: (workerName: string, address: string) =>
    `URGENT: ${workerName}, emergency cleaning needed at ${address}. Please confirm availability by replying YES or NO.`,
};

// Send booking confirmation SMS to customer
export async function sendBookingConfirmationSMS(booking: any) {
  const message = customerSMSTemplates.bookingConfirmation(
    booking.customerName.split(' ')[0], // First name only
    booking.serviceDate,
    booking.serviceTime,
    booking.bookingId || 'PENDING'
  );

  return sendSMS({
    to: booking.customerPhone,
    body: message
  });
}

// Send assignment SMS to worker
export async function sendWorkerAssignmentSMS(worker: any, booking: any) {
  const message = workerSMSTemplates.newAssignment(
    worker.firstName,
    booking.customerName,
    booking.address,
    `${booking.serviceDate} at ${booking.serviceTime}`
  );

  return sendSMS({
    to: worker.phone,
    body: message
  });
}

// Send reminder SMS (can be scheduled with a cron job)
export async function sendReminderSMS(booking: any, type: 'tomorrow' | 'today') {
  const template = type === 'tomorrow' 
    ? customerSMSTemplates.reminderTomorrow
    : customerSMSTemplates.reminderToday;

  const message = template(
    booking.customerName.split(' ')[0],
    booking.serviceTime
  );

  return sendSMS({
    to: booking.customerPhone,
    body: message
  });
}

// Send en route notification
export async function sendEnRouteSMS(booking: any, eta: string) {
  const message = customerSMSTemplates.enRoute(
    booking.customerName.split(' ')[0],
    eta
  );

  return sendSMS({
    to: booking.customerPhone,
    body: message
  });
}

// Send completion notification
export async function sendCompletionSMS(booking: any) {
  const message = customerSMSTemplates.completed(
    booking.customerName.split(' ')[0]
  );

  return sendSMS({
    to: booking.customerPhone,
    body: message
  });
}

// Bulk SMS for marketing (with opt-out)
export async function sendMarketingSMS(customers: Array<{ name: string; phone: string }>, message: string) {
  const results = await Promise.all(
    customers.map(customer => 
      sendSMS({
        to: customer.phone,
        body: `${message}\n\nReply STOP to unsubscribe.`
      })
    )
  );

  return {
    sent: results.filter(r => r.success).length,
    failed: results.filter(r => !r.success).length,
    results
  };
}

// Handle incoming SMS (for two-way communication)
export async function handleIncomingSMS(from: string, body: string) {
  const message = body.trim().toUpperCase();
  
  // Handle opt-out
  if (['STOP', 'UNSUBSCRIBE', 'CANCEL'].includes(message)) {
    // Add to opt-out list in database
    return { action: 'opt-out', phone: from };
  }
  
  // Handle worker responses
  if (message === 'YES' || message === 'NO') {
    // Update worker availability in database
    return { action: 'availability', phone: from, available: message === 'YES' };
  }
  
  // Handle status updates from workers
  if (message.startsWith('STATUS:')) {
    const status = message.replace('STATUS:', '').trim();
    return { action: 'status-update', phone: from, status };
  }
  
  // Default: forward to customer service
  return { action: 'forward', phone: from, message: body };
}