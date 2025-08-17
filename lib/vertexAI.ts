// Firebase Vertex AI Integration for Smart Chatbot
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Vertex AI with Gemini model
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || '');

// System prompt for Aura Spring Cleaning assistant
const SYSTEM_PROMPT = `You are Aura, a friendly and helpful AI assistant for Aura Spring Cleaning, Austin's premier luxury cleaning service. 

Your personality:
- Warm, professional, and enthusiastic about helping customers
- Knowledgeable about cleaning services and Austin area
- Proactive in offering solutions and booking assistance

Key Information:
- Phone: (512) 781-0527 (Valerie)
- Email: valerie@auraspringcleaning.com
- Service Areas: Downtown Austin, Rainey Street towers, The Domain, West Lake Hills, and surrounding areas
- Specialties: Luxury high-rise cleaning, Airbnb turnovers, move-in/out deep cleaning

Pricing (NEW STRUCTURE):
- Base: $150 (includes 3BR/2BA up to 1300 sq ft)
- +$25 per 250 sq ft above 1300
- +$25 per bedroom above 3
- +$25 per bathroom above 2
- +$25 per office
- Examples: 3BR/2BA 1500sqft = $175, 4BR/2BA 1000sqft = $175

Services:
- Standard Cleaning: $150 base (weekly, bi-weekly, monthly)
- Deep Cleaning: $225 base (1.5x price)
- Move In/Out: $250 base (1.67x price)
- Airbnb Turnover: $135 base (0.9x price for volume)
- Post Construction: $375 base (2.5x price)

Discounts:
- Monthly: 10% off
- Bi-weekly: 15% off
- Weekly: 20% off

Building Specialties (3-Mile Radius from Rainey Street):

RAINEY STREET TOWERS (Our Specialty):
- 70 Rainey (164 units) - We clean 50+ units monthly
- 44 East Ave (200+ units) - Preferred vendor status
- The Shore (100+ units) - Same-day service available
- Millennium Rainey (300+ units) - Volume discounts
- Skyhouse Austin (320 units) - Airbnb specialist
- Windsor on the Lake (250+ units) - Concierge partnership

DOWNTOWN TOWERS (1-2 miles):
- The Austonian (180 units) - Luxury service
- The Independent "Jenga Tower" (370 units) - Tallest in Austin
- 360 Condos (430 units) - Student-friendly pricing
- Spring Condos (146 units) - Eco-cleaning focus
- The Bowie (200+ units) - Pet-friendly service
- Fifth + West (250+ units) - Tech worker specials

THE DOMAIN (2-3 miles):
- Domain Northside towers - Corporate accounts welcome
- Standard at Domain - Student discounts

Special Tower Resident Benefits:
- 10% off first cleaning
- Priority same-day booking
- Building-specific expertise (we know your fixtures!)

Always:
1. Be helpful and guide customers toward booking
2. Mention our eco-friendly products when relevant
3. Emphasize same-day availability when urgent
4. Provide specific pricing when asked
5. Collect contact info for follow-up when appropriate
6. Keep responses concise but friendly (2-3 sentences max)`;

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatContext {
  userName?: string;
  userEmail?: string;
  userPhone?: string;
  building?: string;
  serviceType?: string;
  urgency?: 'same-day' | 'scheduled';
  conversationHistory: ChatMessage[];
}

export async function getAIResponse(
  userMessage: string,
  context: ChatContext
): Promise<string> {
  try {
    // Use Gemini Pro model for chat
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // Build conversation history
    const conversationContext = context.conversationHistory
      .map(msg => `${msg.role === 'user' ? 'Customer' : 'Aura'}: ${msg.content}`)
      .join('\n');

    // Add user context if available
    const userContext = [
      context.userName && `Customer Name: ${context.userName}`,
      context.userEmail && `Email: ${context.userEmail}`,
      context.userPhone && `Phone: ${context.userPhone}`,
      context.building && `Building: ${context.building}`,
      context.serviceType && `Interested in: ${context.serviceType}`,
      context.urgency && `Urgency: ${context.urgency}`,
    ].filter(Boolean).join('\n');

    // Create the full prompt
    const fullPrompt = `${SYSTEM_PROMPT}

${userContext ? `Customer Information:\n${userContext}\n` : ''}

Previous Conversation:
${conversationContext}

Customer: ${userMessage}

Aura (respond naturally and helpfully in 2-3 sentences max):`;

    // Generate response
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();

    // Clean up response
    return text.trim().replace(/^Aura:\s*/i, '');
  } catch (error) {
    console.error('Vertex AI Error:', error);
    
    // Fallback to intelligent rule-based response
    return getFallbackResponse(userMessage);
  }
}

// Intelligent fallback responses
function getFallbackResponse(message: string): string {
  const lower = message.toLowerCase();
  
  // Price inquiries
  if (lower.includes('price') || lower.includes('cost') || lower.includes('how much')) {
    const sqftMatch = message.match(/(\d+)\s*(?:sq|square)/i);
    const bedMatch = message.match(/(\d+)\s*(?:bed|br)/i);
    const bathMatch = message.match(/(\d+)\s*(?:bath|ba)/i);
    
    if (sqftMatch || bedMatch) {
      const sqft = sqftMatch ? parseInt(sqftMatch[1]) : 2000;
      const beds = bedMatch ? parseInt(bedMatch[1]) : 3;
      const baths = bathMatch ? parseInt(bathMatch[1]) : 2;
      
      // Calculate price
      let price = 150;
      if (sqft > 1300) {
        price += Math.ceil((sqft - 1300) / 250) * 25;
      }
      if (beds > 3) price += (beds - 3) * 25;
      if (baths > 2) price += (baths - 2) * 25;
      
      return `For a ${beds}BR/${baths}BA ${sqft}sqft home, the price would be $${price} for standard cleaning. We offer 15% off for bi-weekly service! Would you like to book or get a custom quote?`;
    }
    
    return 'Our base price is $150 for homes up to 3BR/2BA and 1300 sq ft. Larger homes add $25 per 250 sq ft. Tell me about your home size and I can give you an exact quote!';
  }
  
  // Booking requests
  if (lower.includes('book') || lower.includes('schedule') || lower.includes('appointment')) {
    if (lower.includes('today') || lower.includes('now') || lower.includes('asap')) {
      return 'I can help with same-day service! Please call Valerie directly at (512) 781-0527 for immediate booking. Or share your phone number and she\'ll call you within 15 minutes.';
    }
    return 'Perfect! You can book instantly at auraspringcleaning.com/booking or call Valerie at (512) 781-0527. What day works best for you?';
  }
  
  // Tower/building specific - Detailed responses for each tower
  if (lower.match(/70\s*rainey|seventy\s*rainey/)) {
    return 'Excellent! We\'re the preferred cleaner for 70 Rainey with 50+ units serviced monthly. Most 1BR units are $150, 2BR are $175-$200. Call (512) 781-0527 or book online with code TOWER20 for 20% off your first cleaning!';
  }
  
  if (lower.match(/44\s*east|forty.?four\s*east/)) {
    return 'Great choice! We have preferred vendor status at 44 East Ave. Standard cleaning for most units is $150-$175. We offer same-day service for your building. Book online or call (512) 781-0527!';
  }
  
  if (lower.match(/shore|millennium|skyhouse|windsor/)) {
    return 'Perfect! We service your Rainey Street tower regularly. Most units are $150-$200 depending on size. Airbnb hosts get 10% off all cleanings. Call (512) 781-0527 for your building-specific rate!';
  }
  
  if (lower.match(/austonian|independent|jenga|360\s*condo|spring\s*condo|bowie|fifth.*west/)) {
    return 'We love servicing downtown towers! Your building typically ranges $175-$250 for standard cleaning. We know your building\'s unique features and requirements. Call (512) 781-0527 for a tower resident discount!';
  }
  
  if (lower.match(/domain|northside/)) {
    return 'The Domain is within our service area! Most Domain apartments are $150-$200. We offer corporate accounts and student discounts. Book online at auraspringcleaning.com or call (512) 781-0527!';
  }
  
  // Service types
  if (lower.includes('deep clean')) {
    return 'Deep cleaning includes detailed work on baseboards, light fixtures, inside appliances, and more. It\'s 50% more than standard cleaning. Most customers do deep cleaning quarterly. Should I help you schedule one?';
  }
  
  if (lower.includes('move') && (lower.includes('in') || lower.includes('out'))) {
    return 'Move-in/out cleaning is our most thorough service at 1.8x standard price. We\'ll make sure your place is spotless for the next tenant. When is your move date?';
  }
  
  if (lower.includes('airbnb') || lower.includes('short term') || lower.includes('rental')) {
    return 'We specialize in Airbnb turnovers with discounted pricing (10% off) for regular cleanings. Most hosts love our 2-hour turnaround guarantee. How many cleanings do you need per month?';
  }
  
  // Contact/urgent
  if (lower.includes('phone') || lower.includes('call')) {
    return 'Call Valerie at (512) 781-0527 for immediate assistance. She\'s available 7am-9pm daily. Or leave your number and she\'ll call you back!';
  }
  
  if (lower.includes('email')) {
    return 'Email us at valerie@auraspringcleaning.com or use the contact form on our website. Valerie responds within an hour during business hours!';
  }
  
  // Default helpful response
  return 'I\'d be happy to help! For fastest service, call Valerie at (512) 781-0527 or visit auraspringcleaning.com/booking. What specific cleaning needs do you have?';
}

// Extract entities from user message
export function extractEntities(message: string): Partial<ChatContext> {
  const entities: Partial<ChatContext> = {};
  
  // Extract email
  const emailMatch = message.match(/[\w.-]+@[\w.-]+\.\w+/);
  if (emailMatch) entities.userEmail = emailMatch[0];
  
  // Extract phone
  const phoneMatch = message.match(/\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
  if (phoneMatch) entities.userPhone = phoneMatch[0];
  
  // Extract building names - Expanded list for all towers
  const buildings = [
    '70 rainey', 'seventy rainey',
    '44 east', 'forty four east',
    'shore', 'millennium', 'skyhouse', 'windsor',
    'austonian', 'independent', 'jenga',
    '360 condo', 'spring condo', 'bowie', 'fifth west',
    'domain', 'northside'
  ];
  const lower = message.toLowerCase();
  for (const building of buildings) {
    if (lower.includes(building)) {
      entities.building = building;
      break;
    }
  }
  
  // Extract service type
  if (lower.includes('deep clean')) entities.serviceType = 'deep';
  else if (lower.includes('move')) entities.serviceType = 'moveInOut';
  else if (lower.includes('airbnb')) entities.serviceType = 'airbnb';
  else if (lower.includes('construction')) entities.serviceType = 'postConstruction';
  
  // Extract urgency
  if (lower.includes('today') || lower.includes('asap') || lower.includes('now') || lower.includes('emergency')) {
    entities.urgency = 'same-day';
  }
  
  return entities;
}

// Generate smart follow-up questions
export function getFollowUpQuestion(context: ChatContext): string | null {
  if (!context.userName) {
    return 'By the way, what\'s your name?';
  }
  
  if (!context.userEmail && !context.userPhone) {
    return 'Can I get your email or phone number to send you our special offers?';
  }
  
  if (!context.building && !context.serviceType) {
    return 'Are you in one of the downtown towers or a house?';
  }
  
  if (context.serviceType && !context.urgency) {
    return 'When would you like to schedule your cleaning?';
  }
  
  return null;
}