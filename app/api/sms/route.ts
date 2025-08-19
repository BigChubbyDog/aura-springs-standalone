// SMS Booking Handler API - Processes incoming SMS messages and automates booking
import { NextRequest, NextResponse } from 'next/server';
import { BookingData, processNewBooking } from '@/lib/microsoftIntegration';
import { createFirebaseBooking } from '@/lib/bookingService';
import { sendSMS } from '@/lib/teamsPhoneService';

// SMS conversation state storage (in production, use Redis or database)
const conversations = new Map<string, ConversationState>();

interface ConversationState {
  step: string;
  data: Partial<BookingData>;
  lastActivity: Date;
}

// Pricing configuration
const PRICING = {
  regular: { base: 120, perBedroom: 30 },
  deep: { base: 180, perBedroom: 40 },
  moveInOut: { base: 200, perBedroom: 50 },
  airbnb: { base: 100, perBedroom: 25 }
};

// Available time slots (in production, check actual availability)
const getAvailableSlots = (date: string) => {
  return [
    { time: '9:00 AM', available: true },
    { time: '11:00 AM', available: true },
    { time: '2:00 PM', available: true },
    { time: '4:00 PM', available: false }
  ].filter(slot => slot.available);
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { from, to, text } = body;
    
    // Normalize phone number
    const phoneNumber = from.replace(/\D/g, '');
    const message = text.trim().toUpperCase();
    
    console.log(`📱 SMS from ${phoneNumber}: ${message}`);
    
    // Check for keywords
    if (message === 'BOOK' || message === 'CLEAN' || message === 'CLEANING') {
      return startBookingConversation(phoneNumber);
    }
    
    if (message === 'PRICE' || message === 'COST' || message === 'PRICING') {
      return sendPricing(phoneNumber);
    }
    
    if (message === 'WHEN' || message === 'AVAILABLE' || message === 'AVAILABILITY') {
      return sendAvailability(phoneNumber);
    }
    
    if (message === 'HELP' || message === 'COMMANDS') {
      return sendHelp(phoneNumber);
    }
    
    if (message === 'STATUS' || message === 'CHECK') {
      return checkBookingStatus(phoneNumber);
    }
    
    // Check if user is in an active conversation
    if (conversations.has(phoneNumber)) {
      return continueConversation(phoneNumber, message);
    }
    
    // Natural language processing for common phrases
    if (message.includes('NEED') && (message.includes('CLEAN') || message.includes('SERVICE'))) {
      return startBookingConversation(phoneNumber);
    }
    
    if (message.includes('HOW MUCH') || message.includes('WHAT COST')) {
      return sendPricing(phoneNumber);
    }
    
    if (message.includes('CANCEL')) {
      return handleCancellation(phoneNumber, message);
    }
    
    // Default response for unrecognized messages
    return sendSMS(phoneNumber, 
      "Hi! I'm the Aura Spring booking assistant. 🏠✨\n\n" +
      "Reply with:\n" +
      "BOOK - Schedule a cleaning\n" +
      "PRICE - See our pricing\n" +
      "WHEN - Check availability\n" +
      "HELP - More options\n\n" +
      "Or call us at (737) 330-1489!"
    );
    
  } catch (error) {
    console.error('SMS handler error:', error);
    return NextResponse.json(
      { error: 'Failed to process SMS' },
      { status: 500 }
    );
  }
}

// Start a new booking conversation
async function startBookingConversation(phoneNumber: string) {
  conversations.set(phoneNumber, {
    step: 'SERVICE_TYPE',
    data: { customerPhone: phoneNumber },
    lastActivity: new Date()
  });
  
  const message = 
    "Great! Let's get your home sparkling! ✨\n\n" +
    "What type of cleaning do you need?\n" +
    "1️⃣ Regular Cleaning ($120+)\n" +
    "2️⃣ Deep Cleaning ($180+)\n" +
    "3️⃣ Move In/Out ($200+)\n" +
    "4️⃣ Airbnb Turnover ($100+)\n\n" +
    "Reply with number (1-4)";
  
  return sendSMS(phoneNumber, message);
}

// Continue an existing conversation
async function continueConversation(phoneNumber: string, message: string) {
  const conversation = conversations.get(phoneNumber)!;
  conversation.lastActivity = new Date();
  
  switch (conversation.step) {
    case 'SERVICE_TYPE':
      return handleServiceType(phoneNumber, message);
    
    case 'BEDROOMS':
      return handleBedrooms(phoneNumber, message);
    
    case 'DATE':
      return handleDate(phoneNumber, message);
    
    case 'TIME':
      return handleTime(phoneNumber, message);
    
    case 'ADDRESS':
      return handleAddress(phoneNumber, message);
    
    case 'NAME':
      return handleName(phoneNumber, message);
    
    case 'CONFIRM':
      return handleConfirmation(phoneNumber, message);
    
    default:
      return startBookingConversation(phoneNumber);
  }
}

// Handle service type selection
async function handleServiceType(phoneNumber: string, message: string) {
  const conversation = conversations.get(phoneNumber)!;
  
  const serviceMap: { [key: string]: string } = {
    '1': 'regular',
    '2': 'deep',
    '3': 'moveInOut',
    '4': 'airbnb'
  };
  
  const serviceType = serviceMap[message];
  if (!serviceType) {
    return sendSMS(phoneNumber, "Please reply with 1, 2, 3, or 4 to select service type.");
  }
  
  conversation.data.serviceType = serviceType;
  conversation.step = 'BEDROOMS';
  
  const response = 
    "Perfect! How many bedrooms? 🛏️\n\n" +
    "1️⃣ 1 bedroom\n" +
    "2️⃣ 2 bedrooms\n" +
    "3️⃣ 3 bedrooms\n" +
    "4️⃣ 4+ bedrooms\n\n" +
    "Reply with number (1-4)";
  
  return sendSMS(phoneNumber, response);
}

// Handle bedroom count
async function handleBedrooms(phoneNumber: string, message: string) {
  const conversation = conversations.get(phoneNumber)!;
  
  const bedroomMap: { [key: string]: number } = {
    '1': 1,
    '2': 2,
    '3': 3,
    '4': 4
  };
  
  const bedrooms = bedroomMap[message];
  if (!bedrooms) {
    return sendSMS(phoneNumber, "Please reply with 1, 2, 3, or 4 for bedroom count.");
  }
  
  conversation.data.bedrooms = bedrooms;
  conversation.data.bathrooms = Math.ceil(bedrooms / 2); // Estimate bathrooms
  conversation.data.squareFeet = bedrooms * 500 + 500; // Estimate square feet
  
  // Calculate price
  const serviceType = conversation.data.serviceType as keyof typeof PRICING;
  const price = PRICING[serviceType].base + (PRICING[serviceType].perBedroom * (bedrooms - 1));
  conversation.data.totalPrice = price;
  
  conversation.step = 'DATE';
  
  const response = 
    `Price estimate: $${price} 💰\n\n` +
    "When would you like service? 📅\n" +
    "1️⃣ Today (add $50 rush fee)\n" +
    "2️⃣ Tomorrow\n" +
    "3️⃣ Day after tomorrow\n" +
    "4️⃣ This weekend\n\n" +
    "Reply with number (1-4)";
  
  return sendSMS(phoneNumber, response);
}

// Handle date selection
async function handleDate(phoneNumber: string, message: string) {
  const conversation = conversations.get(phoneNumber)!;
  
  const today = new Date();
  const dateMap: { [key: string]: string } = {
    '1': formatDate(today),
    '2': formatDate(new Date(today.getTime() + 24 * 60 * 60 * 1000)),
    '3': formatDate(new Date(today.getTime() + 48 * 60 * 60 * 1000)),
    '4': formatDate(getNextWeekend())
  };
  
  const serviceDate = dateMap[message];
  if (!serviceDate) {
    return sendSMS(phoneNumber, "Please reply with 1, 2, 3, or 4 to select date.");
  }
  
  // Add rush fee for same-day
  if (message === '1') {
    conversation.data.totalPrice! += 50;
  }
  
  conversation.data.serviceDate = serviceDate;
  conversation.step = 'TIME';
  
  const slots = getAvailableSlots(serviceDate);
  let slotText = "Available times:\n";
  slots.forEach((slot, index) => {
    slotText += `${index + 1}️⃣ ${slot.time}\n`;
  });
  
  const response = slotText + "\nReply with number to select time";
  
  return sendSMS(phoneNumber, response);
}

// Handle time selection
async function handleTime(phoneNumber: string, message: string) {
  const conversation = conversations.get(phoneNumber)!;
  
  const slots = getAvailableSlots(conversation.data.serviceDate!);
  const slotIndex = parseInt(message) - 1;
  
  if (slotIndex < 0 || slotIndex >= slots.length) {
    return sendSMS(phoneNumber, `Please reply with 1-${slots.length} to select time.`);
  }
  
  conversation.data.serviceTime = slots[slotIndex].time;
  conversation.step = 'ADDRESS';
  
  const response = 
    "Almost done! 🏠\n\n" +
    "What's the service address?\n" +
    "(Reply with full address including city and zip)";
  
  return sendSMS(phoneNumber, response);
}

// Handle address input
async function handleAddress(phoneNumber: string, message: string) {
  const conversation = conversations.get(phoneNumber)!;
  
  // Basic address validation
  if (message.length < 10 || !message.match(/\d{5}/)) {
    return sendSMS(phoneNumber, 
      "Please provide complete address with zip code.\n" +
      "Example: 123 Main St, Austin, TX 78701"
    );
  }
  
  conversation.data.address = message;
  conversation.step = 'NAME';
  
  const response = 
    "Last step! What's your name? 😊\n" +
    "(First and last name please)";
  
  return sendSMS(phoneNumber, response);
}

// Handle name input
async function handleName(phoneNumber: string, message: string) {
  const conversation = conversations.get(phoneNumber)!;
  
  if (message.length < 2) {
    return sendSMS(phoneNumber, "Please provide your full name.");
  }
  
  conversation.data.customerName = message;
  conversation.data.customerEmail = `${phoneNumber}@sms.auraspringcleaning.com`; // Placeholder email
  conversation.step = 'CONFIRM';
  
  const { serviceType, bedrooms, serviceDate, serviceTime, address, totalPrice } = conversation.data;
  
  const serviceNames: { [key: string]: string } = {
    regular: 'Regular Cleaning',
    deep: 'Deep Cleaning',
    moveInOut: 'Move In/Out',
    airbnb: 'Airbnb Turnover'
  };
  
  const summary = 
    "📋 BOOKING SUMMARY\n" +
    "━━━━━━━━━━━━━━━\n" +
    `Service: ${serviceNames[serviceType as string]}\n` +
    `Bedrooms: ${bedrooms}\n` +
    `Date: ${serviceDate}\n` +
    `Time: ${serviceTime}\n` +
    `Address: ${address}\n` +
    `Total: $${totalPrice}\n` +
    "━━━━━━━━━━━━━━━\n\n" +
    "Reply Y to confirm or N to cancel";
  
  return sendSMS(phoneNumber, summary);
}

// Handle booking confirmation
async function handleConfirmation(phoneNumber: string, message: string) {
  const conversation = conversations.get(phoneNumber)!;
  
  if (message === 'Y' || message === 'YES') {
    // Create the booking
    const bookingData = conversation.data as BookingData;
    
    try {
      // Create booking in Firebase
      const bookingId = await createFirebaseBooking(bookingData);
      
      // Process through Microsoft ecosystem
      await processNewBooking(bookingData);
      
      // Clear conversation
      conversations.delete(phoneNumber);
      
      const confirmationMessage = 
        `✅ BOOKING CONFIRMED!\n` +
        `━━━━━━━━━━━━━━━\n` +
        `Confirmation #${bookingId}\n\n` +
        `We'll send you:\n` +
        `• Reminder tomorrow\n` +
        `• Cleaner name morning of\n` +
        `• Arrival notification\n\n` +
        `Need help? Call Valerie:\n` +
        `(512) 781-0527\n\n` +
        `Thank you for choosing\n` +
        `Aura Spring Cleaning! 🏠✨`;
      
      return sendSMS(phoneNumber, confirmationMessage);
      
    } catch (error) {
      console.error('Booking creation error:', error);
      return sendSMS(phoneNumber, 
        "Sorry, there was an error creating your booking. " +
        "Please call us at (737) 330-1489 to complete your booking."
      );
    }
  } else if (message === 'N' || message === 'NO') {
    conversations.delete(phoneNumber);
    return sendSMS(phoneNumber, 
      "No problem! Booking cancelled.\n\n" +
      "When you're ready, just text BOOK to start again.\n" +
      "Or call us at (737) 330-1489 😊"
    );
  } else {
    return sendSMS(phoneNumber, "Please reply Y to confirm or N to cancel.");
  }
}

// Send pricing information
async function sendPricing(phoneNumber: string) {
  const message = 
    "💰 AURA SPRING PRICING\n" +
    "━━━━━━━━━━━━━━━\n" +
    "Regular Clean: $120+\n" +
    "Deep Clean: $180+\n" +
    "Move In/Out: $200+\n" +
    "Airbnb: $100+\n\n" +
    "Includes all supplies! ✨\n" +
    "Add-ons available:\n" +
    "• Windows +$45\n" +
    "• Oven +$35\n" +
    "• Fridge +$30\n\n" +
    "Reply BOOK to schedule!";
  
  return sendSMS(phoneNumber, message);
}

// Send availability
async function sendAvailability(phoneNumber: string) {
  const today = new Date();
  const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
  const dayAfter = new Date(today.getTime() + 48 * 60 * 60 * 1000);
  
  const message = 
    "📅 AVAILABLE TIMES\n" +
    "━━━━━━━━━━━━━━━\n" +
    `Today: 2pm, 4pm (+$50 rush)\n` +
    `Tomorrow: 9am, 11am, 2pm\n` +
    `${formatDate(dayAfter)}: 9am, 11am, 2pm, 4pm\n\n` +
    "Reply BOOK to schedule!";
  
  return sendSMS(phoneNumber, message);
}

// Send help message
async function sendHelp(phoneNumber: string) {
  const message = 
    "📱 SMS COMMANDS\n" +
    "━━━━━━━━━━━━━━━\n" +
    "BOOK - Start booking\n" +
    "PRICE - See pricing\n" +
    "WHEN - Check availability\n" +
    "STATUS - Check booking\n" +
    "CANCEL - Cancel booking\n\n" +
    "Or call: (737) 330-1489\n" +
    "Valerie: (512) 781-0527";
  
  return sendSMS(phoneNumber, message);
}

// Check booking status
async function checkBookingStatus(phoneNumber: string) {
  // In production, query Dynamics 365 or Firebase
  const message = 
    "To check your booking:\n\n" +
    "Please call us at:\n" +
    "(737) 330-1489\n\n" +
    "Or text your confirmation number";
  
  return sendSMS(phoneNumber, message);
}

// Handle cancellation
async function handleCancellation(phoneNumber: string, message: string) {
  const confirmationNumber = message.replace('CANCEL', '').trim();
  
  if (confirmationNumber) {
    // In production, look up and cancel the booking
    return sendSMS(phoneNumber, 
      `Booking ${confirmationNumber} has been cancelled.\n\n` +
      "We're sorry to see you go! 😢\n" +
      "We hope to serve you in the future."
    );
  } else {
    return sendSMS(phoneNumber, 
      "To cancel, please provide your confirmation number.\n" +
      "Example: CANCEL ASC-12345\n\n" +
      "Or call Valerie: (512) 781-0527"
    );
  }
}

// Utility functions
function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric' 
  });
}

function getNextWeekend(): Date {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const daysUntilSaturday = (6 - dayOfWeek + 7) % 7 || 7;
  return new Date(today.getTime() + daysUntilSaturday * 24 * 60 * 60 * 1000);
}

// Cleanup old conversations (run periodically)
setInterval(() => {
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
  for (const [phone, conv] of conversations.entries()) {
    if (conv.lastActivity < oneHourAgo) {
      conversations.delete(phone);
    }
  }
}, 30 * 60 * 1000); // Every 30 minutes

// Webhook endpoint for Microsoft Teams Phone
export async function GET(request: NextRequest) {
  return NextResponse.json({
    status: 'SMS Booking Handler Active',
    phone: '(737) 330-1489',
    keywords: ['BOOK', 'PRICE', 'WHEN', 'HELP', 'STATUS', 'CANCEL'],
    activeConversations: conversations.size
  });
}