// Microsoft Teams Phone Service - Handles SMS and Voice interactions
import { ClientSecretCredential } from '@azure/identity';
import fetch from 'node-fetch';

// Configuration for Teams Phone
const TEAMS_PHONE_CONFIG = {
  phoneNumber: '+17373301489',
  tenantId: process.env.AZURE_TENANT_ID || '753965c2-2a85-437e-a9c9-9f824df99584',
  clientId: process.env.AZURE_CLIENT_ID || '94d3924d-79c4-4280-975d-8223752343b8',
  clientSecret: process.env.AZURE_CLIENT_SECRET || '',
  graphApiUrl: 'https://graph.microsoft.com/v1.0'
};

// Initialize credential
const credential = new ClientSecretCredential(
  TEAMS_PHONE_CONFIG.tenantId,
  TEAMS_PHONE_CONFIG.clientId,
  TEAMS_PHONE_CONFIG.clientSecret
);

/**
 * Send SMS message via Teams Phone
 */
export async function sendSMS(to: string, message: string): Promise<any> {
  try {
    // Normalize phone number
    const toNumber = normalizePhoneNumber(to);
    
    // For now, we'll use a webhook to Power Automate which handles SMS
    // In production, this would use the Teams Phone API directly
    const powerAutomateUrl = process.env.POWER_AUTOMATE_SMS_URL || '';
    
    if (powerAutomateUrl) {
      const response = await fetch(powerAutomateUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: toNumber,
          from: TEAMS_PHONE_CONFIG.phoneNumber,
          message: message,
          timestamp: new Date().toISOString()
        })
      });
      
      if (!response.ok) {
        throw new Error(`SMS send failed: ${response.statusText}`);
      }
      
      console.log(`📱 SMS sent to ${toNumber}: ${message.substring(0, 50)}...`);
      return { success: true, to: toNumber };
    }
    
    // Fallback: Log the message (for development)
    console.log(`📱 [DEV MODE] SMS to ${toNumber}:`);
    console.log(message);
    console.log('---');
    
    // Also send to Teams channel for visibility
    await sendToTeamsChannel('SMS Conversations', {
      to: toNumber,
      message: message,
      timestamp: new Date().toISOString()
    });
    
    return { 
      success: true, 
      to: toNumber, 
      devMode: true,
      message: 'SMS logged (dev mode - configure Power Automate for production)'
    };
    
  } catch (error) {
    console.error('Error sending SMS:', error);
    throw error;
  }
}

/**
 * Send notification to Teams channel
 */
export async function sendToTeamsChannel(channelName: string, data: any): Promise<void> {
  try {
    const webhookUrl = process.env.TEAMS_WEBHOOK_URL;
    if (!webhookUrl) {
      console.log(`[Teams Channel: ${channelName}]`, data);
      return;
    }
    
    const card = {
      "@type": "MessageCard",
      "@context": "http://schema.org/extensions",
      "themeColor": "0076D7",
      "summary": `SMS Activity - ${channelName}`,
      "sections": [{
        "activityTitle": `📱 ${channelName}`,
        "facts": Object.entries(data).map(([key, value]) => ({
          "name": key,
          "value": String(value)
        })),
        "markdown": true
      }]
    };
    
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(card)
    });
    
  } catch (error) {
    console.error('Error sending to Teams channel:', error);
  }
}

/**
 * Handle incoming phone call (IVR)
 */
export async function handleIncomingCall(callData: any): Promise<any> {
  const { from, callId, timestamp } = callData;
  
  console.log(`📞 Incoming call from ${from} at ${timestamp}`);
  
  // Log to Teams
  await sendToTeamsChannel('Phone Bookings', {
    type: 'Incoming Call',
    from: from,
    callId: callId,
    timestamp: timestamp
  });
  
  // Return IVR menu structure
  return {
    greeting: "Thank you for calling Aura Spring Cleaning, Austin's premier luxury cleaning service.",
    menu: {
      "1": { 
        action: "booking",
        prompt: "To book a cleaning, press 1"
      },
      "2": { 
        action: "check_booking",
        prompt: "To check your existing booking, press 2"
      },
      "3": { 
        action: "transfer",
        target: "valerie",
        prompt: "To speak with Valerie, press 3"
      },
      "4": { 
        action: "pricing",
        prompt: "For pricing information, press 4"
      },
      "5": { 
        action: "hours",
        prompt: "For business hours and location, press 5"
      }
    },
    timeout: {
      action: "voicemail",
      after: 30
    }
  };
}

/**
 * Process IVR selection
 */
export async function processIVRSelection(callId: string, selection: string, context: any): Promise<any> {
  console.log(`📞 IVR Selection: ${selection} for call ${callId}`);
  
  switch (selection) {
    case '1': // Book a cleaning
      return startPhoneBooking(context);
    
    case '2': // Check booking
      return checkPhoneBooking(context);
    
    case '3': // Transfer to Valerie
      return transferCall('valerie', context);
    
    case '4': // Pricing info
      return playPricingInfo();
    
    case '5': // Business hours
      return playBusinessHours();
    
    default:
      return {
        action: 'repeat_menu',
        message: 'Invalid selection. Please try again.'
      };
  }
}

/**
 * Start phone booking flow
 */
async function startPhoneBooking(context: any): Promise<any> {
  return {
    action: 'collect',
    steps: [
      {
        id: 'service_type',
        prompt: 'What type of cleaning do you need? Press 1 for regular, 2 for deep cleaning, 3 for move in or out, 4 for Airbnb turnover.',
        type: 'digit',
        maxDigits: 1
      },
      {
        id: 'bedrooms',
        prompt: 'How many bedrooms? Press 1 for one, 2 for two, 3 for three, 4 for four or more.',
        type: 'digit',
        maxDigits: 1
      },
      {
        id: 'date',
        prompt: 'When would you like service? Press 1 for today, 2 for tomorrow, 3 for this week, 4 for next week.',
        type: 'digit',
        maxDigits: 1
      },
      {
        id: 'phone',
        prompt: 'Please say your phone number slowly after the beep.',
        type: 'speech',
        timeout: 10
      },
      {
        id: 'zipcode',
        prompt: 'Please enter your 5-digit zip code.',
        type: 'digit',
        maxDigits: 5
      }
    ],
    onComplete: 'create_booking',
    confirmation: 'Perfect! Your cleaning is scheduled. You will receive a text confirmation shortly. Thank you for choosing Aura Spring!'
  };
}

/**
 * Check existing booking
 */
async function checkPhoneBooking(context: any): Promise<any> {
  return {
    action: 'collect',
    steps: [
      {
        id: 'phone_lookup',
        prompt: 'Please enter your 10-digit phone number.',
        type: 'digit',
        maxDigits: 10
      }
    ],
    onComplete: 'lookup_booking',
    onSuccess: 'Your next cleaning is scheduled for [DATE] at [TIME]. [CLEANER] will be your cleaning specialist.',
    onNotFound: 'No booking found for that number. Press 1 to book now or 0 to return to the main menu.'
  };
}

/**
 * Transfer call to team member
 */
async function transferCall(target: string, context: any): Promise<any> {
  const transferNumbers: { [key: string]: string } = {
    'valerie': '+15127810527',
    'dustin': '+15125551234', // Update with actual number
    'support': '+17373301489'
  };
  
  return {
    action: 'transfer',
    target: transferNumbers[target] || transferNumbers['support'],
    announcement: 'Transferring you now. One moment please.',
    fallback: 'voicemail',
    fallbackAfter: 30
  };
}

/**
 * Play pricing information
 */
function playPricingInfo(): any {
  return {
    action: 'play',
    message: 'Our pricing starts at 120 dollars for regular cleaning, 180 dollars for deep cleaning, 200 dollars for move in or out, and 100 dollars for Airbnb turnover. All prices include supplies. Additional charges apply for larger homes. Press 1 to book now or 0 to return to the main menu.',
    nextAction: 'menu'
  };
}

/**
 * Play business hours
 */
function playBusinessHours(): any {
  return {
    action: 'play',
    message: 'Our business hours are Monday through Friday, 8 AM to 6 PM, and Saturday 9 AM to 5 PM. We are closed on Sundays. For emergency cleaning, please leave a message. Press 0 to return to the main menu.',
    nextAction: 'menu'
  };
}

/**
 * Process voicemail
 */
export async function processVoicemail(voicemailData: any): Promise<void> {
  const { from, duration, transcription, audioUrl, timestamp } = voicemailData;
  
  console.log(`📞 New voicemail from ${from} (${duration}s)`);
  
  // Extract phone number from transcription if possible
  const phoneRegex = /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g;
  const phoneNumbers = transcription.match(phoneRegex);
  
  // Send to Teams
  await sendToTeamsChannel('Phone Bookings', {
    type: 'Voicemail',
    from: from,
    duration: `${duration} seconds`,
    transcription: transcription,
    detectedPhones: phoneNumbers?.join(', ') || 'None detected',
    audioUrl: audioUrl,
    timestamp: timestamp,
    action: 'Follow up required'
  });
  
  // Create task in Dynamics 365
  // TODO: Implement Dynamics 365 task creation
  
  // Send SMS acknowledgment if phone number is valid
  if (from && from.length >= 10) {
    await sendSMS(from, 
      "Thanks for calling Aura Spring! We received your voicemail and will call you back within 2 hours during business hours. " +
      "For faster service, text BOOK to this number to schedule now!"
    );
  }
}

/**
 * Normalize phone number to E.164 format
 */
function normalizePhoneNumber(phone: string): string {
  // Remove all non-digits
  let cleaned = phone.replace(/\D/g, '');
  
  // Add country code if missing
  if (cleaned.length === 10) {
    cleaned = '1' + cleaned;
  }
  
  // Format as E.164
  return '+' + cleaned;
}

/**
 * Calculate estimated price based on service details
 */
export function calculatePhoneBookingPrice(details: any): number {
  const { serviceType, bedrooms } = details;
  
  const basePrices: { [key: string]: number } = {
    '1': 120, // Regular
    '2': 180, // Deep
    '3': 200, // Move In/Out
    '4': 100  // Airbnb
  };
  
  const bedroomMultipliers: { [key: string]: number } = {
    '1': 1.0,
    '2': 1.25,
    '3': 1.5,
    '4': 1.75
  };
  
  const basePrice = basePrices[serviceType] || 120;
  const multiplier = bedroomMultipliers[bedrooms] || 1.0;
  
  return Math.round(basePrice * multiplier);
}

/**
 * Send booking confirmation via SMS
 */
export async function sendBookingConfirmation(phoneNumber: string, bookingDetails: any): Promise<void> {
  const { bookingId, serviceType, date, time, address, price, cleaner } = bookingDetails;
  
  const message = 
    `✅ BOOKING CONFIRMED!\n` +
    `━━━━━━━━━━━━━━━\n` +
    `ID: ${bookingId}\n` +
    `Service: ${serviceType}\n` +
    `Date: ${date}\n` +
    `Time: ${time}\n` +
    `Address: ${address}\n` +
    `Price: $${price}\n` +
    `Cleaner: ${cleaner || 'TBD'}\n\n` +
    `We'll text you a reminder tomorrow!\n` +
    `Questions? Call (512) 781-0527`;
  
  await sendSMS(phoneNumber, message);
}

/**
 * Send service reminder
 */
export async function sendServiceReminder(phoneNumber: string, hours: number, bookingDetails: any): Promise<void> {
  const { date, time, cleaner, address } = bookingDetails;
  
  let message = '';
  
  if (hours === 48) {
    message = 
      `⏰ REMINDER: Your cleaning is in 2 days!\n` +
      `Date: ${date} at ${time}\n` +
      `Address: ${address}\n\n` +
      `Reply C to cancel or R to reschedule.`;
  } else if (hours === 24) {
    message = 
      `🏠 See you tomorrow!\n` +
      `Time: ${time}\n` +
      `Cleaner: ${cleaner}\n` +
      `Please secure pets and clear countertops if possible.\n\n` +
      `Any special requests? Reply to this message!`;
  } else if (hours === 1) {
    message = 
      `🚗 ${cleaner} is on the way!\n` +
      `Arrival: ~${time}\n` +
      `They'll text when they arrive.\n\n` +
      `Track: www.aurasprings.com/track`;
  }
  
  if (message) {
    await sendSMS(phoneNumber, message);
  }
}

export default {
  sendSMS,
  handleIncomingCall,
  processIVRSelection,
  processVoicemail,
  sendBookingConfirmation,
  sendServiceReminder,
  sendToTeamsChannel
};