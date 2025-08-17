// Vertex AI Booking Intelligence Service
import { getGenerativeModel } from '@firebase/vertexai-preview';
import { vertexAI } from './firebase';
import { FirebaseBooking } from './bookingService';
import { calculatePrice } from './pricingService';

// Initialize the Gemini Pro model
const model = getGenerativeModel(vertexAI, { 
  model: 'gemini-1.5-pro',
  generationConfig: {
    temperature: 0.7,
    topK: 40,
    topP: 0.95,
    maxOutputTokens: 1024
  },
  systemInstruction: `You are Aura, an AI assistant for Aura Spring Cleaning, Austin's premier luxury cleaning service. 
  You help customers book cleaning services, answer questions about pricing, and provide recommendations.
  
  Our services:
  - Regular House Cleaning: Base $150 for 3BR/2BA, discounts: Weekly 20%, Bi-Weekly 15%, Monthly 10%
  - Deep Cleaning: 1.5x base price
  - Move In/Out: 1.67x base price  
  - Airbnb: 0.9x base price
  - Post-Construction: 2.5x base price
  
  You should be helpful, professional, and emphasize our time-saving benefits for busy Austin professionals.
  Our main contact is Valerie at (512) 781-0527.`
});

// Analyze booking request and provide intelligent suggestions
export async function analyzeBookingRequest(request: {
  message: string;
  context?: Partial<FirebaseBooking>;
}): Promise<{
  serviceType: string;
  suggestedFrequency: string;
  estimatedPrice: number;
  addOns: string[];
  insights: string;
}> {
  try {
    const prompt = `
    Customer request: "${request.message}"
    
    ${request.context ? `Context: ${JSON.stringify(request.context)}` : ''}
    
    Based on this request, provide:
    1. Recommended service type (standard/deep/moveInOut/airbnb/postConstruction)
    2. Suggested frequency (onetime/weekly/biweekly/monthly)
    3. Recommended add-ons if any
    4. Key insights about their needs
    
    Respond in JSON format.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Parse AI response
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        
        // Calculate estimated price
        const pricing = calculatePrice({
          bedrooms: request.context?.bedrooms || 3,
          bathrooms: request.context?.bathrooms || 2,
          squareFeet: request.context?.squareFeet || 1300,
          serviceType: parsed.serviceType || 'standard',
          frequency: parsed.frequency || 'onetime',
          addOns: parsed.addOns || [],
          location: 'default'
        });
        
        return {
          serviceType: parsed.serviceType || 'standard',
          suggestedFrequency: parsed.frequency || 'biweekly',
          estimatedPrice: pricing.total,
          addOns: parsed.addOns || [],
          insights: parsed.insights || 'Standard cleaning service recommended'
        };
      }
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError);
    }
    
    // Fallback response
    return {
      serviceType: 'standard',
      suggestedFrequency: 'biweekly',
      estimatedPrice: 150,
      addOns: [],
      insights: 'Our standard bi-weekly service is perfect for maintaining a clean home.'
    };
  } catch (error) {
    console.error('Error analyzing booking request:', error);
    return {
      serviceType: 'standard',
      suggestedFrequency: 'biweekly',
      estimatedPrice: 150,
      addOns: [],
      insights: 'Standard cleaning service recommended'
    };
  }
}

// Generate personalized booking recommendations
export async function getPersonalizedRecommendations(customer: {
  pastBookings?: FirebaseBooking[];
  preferences?: any;
  propertyType?: string;
}): Promise<{
  recommendations: string[];
  specialOffers: string[];
  tips: string[];
}> {
  try {
    const prompt = `
    Generate personalized cleaning recommendations for a customer in Austin.
    
    Customer profile:
    - Past bookings: ${customer.pastBookings?.length || 0} bookings
    - Property type: ${customer.propertyType || 'residential'}
    - Previous services: ${customer.pastBookings?.map(b => b.serviceType).join(', ') || 'none'}
    
    Provide:
    1. 3 personalized service recommendations
    2. 2 special offers they might like
    3. 3 cleaning tips for Austin homes
    
    Focus on time-saving benefits and Austin lifestyle.
    Respond in JSON format.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return {
          recommendations: parsed.recommendations || [
            'Bi-weekly cleaning to maintain your home effortlessly',
            'Deep cleaning service for seasonal refresh',
            'Add window cleaning for crystal-clear Austin views'
          ],
          specialOffers: parsed.specialOffers || [
            'Save 20% with weekly service',
            'First-time customer: Get $25 off deep cleaning'
          ],
          tips: parsed.tips || [
            'Austin\'s cedar pollen season requires more frequent dusting',
            'Use dehumidifiers to combat Austin humidity and prevent mold',
            'Regular cleaning helps with allergens from local plants'
          ]
        };
      }
    } catch (parseError) {
      console.error('Error parsing recommendations:', parseError);
    }
    
    // Fallback recommendations
    return {
      recommendations: [
        'Bi-weekly cleaning saves you 6 hours every two weeks',
        'Deep cleaning perfect for ACL or SXSW prep',
        'Weekly service gives you weekends back for Lady Bird Lake'
      ],
      specialOffers: [
        'Save 20% with weekly recurring service',
        'New customer special: $25 off first deep clean'
      ],
      tips: [
        'Austin\'s limestone dust requires regular surface cleaning',
        'Keep AC filters clean during cedar fever season',
        'Regular cleaning helps with Hill Country allergens'
      ]
    };
  } catch (error) {
    console.error('Error getting recommendations:', error);
    return {
      recommendations: ['Bi-weekly service recommended'],
      specialOffers: ['Save with recurring service'],
      tips: ['Regular cleaning improves air quality']
    };
  }
}

// Estimate cleaning duration using AI
export async function estimateCleaningDuration(booking: Partial<FirebaseBooking>): Promise<{
  estimatedMinutes: number;
  factors: string[];
  teamSize: number;
}> {
  try {
    const prompt = `
    Estimate cleaning duration for:
    - Service: ${booking.serviceType}
    - Size: ${booking.squareFeet} sq ft
    - Bedrooms: ${booking.bedrooms}
    - Bathrooms: ${booking.bathrooms}
    - Add-ons: ${booking.addOns?.join(', ') || 'none'}
    - Special instructions: ${booking.specialInstructions || 'none'}
    
    Provide:
    1. Estimated minutes
    2. Key factors affecting duration
    3. Recommended team size (1-3 people)
    
    Respond in JSON format.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return {
          estimatedMinutes: parsed.estimatedMinutes || 120,
          factors: parsed.factors || ['Property size', 'Service type'],
          teamSize: parsed.teamSize || 2
        };
      }
    } catch (parseError) {
      console.error('Error parsing duration estimate:', parseError);
    }
    
    // Fallback calculation
    const baseMinutes = booking.squareFeet ? Math.round(booking.squareFeet / 15) : 120;
    const serviceMultiplier = booking.serviceType === 'deep' ? 1.5 : 
                             booking.serviceType === 'moveInOut' ? 1.67 : 1;
    
    return {
      estimatedMinutes: Math.round(baseMinutes * serviceMultiplier),
      factors: ['Property size', 'Service type', 'Number of rooms'],
      teamSize: booking.squareFeet && booking.squareFeet > 2500 ? 3 : 2
    };
  } catch (error) {
    console.error('Error estimating duration:', error);
    return {
      estimatedMinutes: 120,
      factors: ['Standard estimate'],
      teamSize: 2
    };
  }
}

// Generate booking confirmation message
export async function generateConfirmationMessage(booking: FirebaseBooking): Promise<string> {
  try {
    const prompt = `
    Generate a friendly, professional booking confirmation message for:
    - Customer: ${booking.customerName}
    - Service: ${booking.serviceType} cleaning
    - Date: ${booking.serviceDate} at ${booking.serviceTime}
    - Address: ${booking.address}
    - Price: $${booking.totalPrice}
    
    Include:
    1. Warm greeting
    2. Service confirmation details
    3. What to expect
    4. Time-saving benefit (Austin lifestyle focus)
    5. Contact info for Valerie at (512) 781-0527
    
    Keep it concise and friendly.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating confirmation:', error);
    
    // Fallback message
    return `
    Thank you, ${booking.customerName}!
    
    Your ${booking.serviceType} cleaning is confirmed for ${booking.serviceDate} at ${booking.serviceTime}.
    
    Our professional team will arrive at ${booking.address} ready to transform your space.
    
    Total: $${booking.totalPrice}
    
    While we handle the cleaning, enjoy your extra time exploring Austin!
    
    Questions? Call Valerie at (512) 781-0527.
    
    - The Aura Spring Team
    `;
  }
}

// Intelligent scheduling optimization
export async function optimizeSchedule(bookings: FirebaseBooking[]): Promise<{
  optimizedOrder: FirebaseBooking[];
  estimatedRouteTime: number;
  suggestions: string[];
}> {
  try {
    const prompt = `
    Optimize cleaning schedule for ${bookings.length} bookings in Austin.
    
    Bookings:
    ${bookings.map(b => `- ${b.serviceTime} at ${b.address} (${b.serviceType})`).join('\n')}
    
    Consider:
    1. Travel time between locations
    2. Service duration
    3. Traffic patterns in Austin
    4. Team availability
    
    Provide optimal order and routing suggestions.
    Respond in JSON format.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        
        // Reorder bookings based on AI suggestions
        const optimizedOrder = [...bookings].sort((a, b) => {
          // Sort by time first, then optimize by location
          return a.serviceTime.localeCompare(b.serviceTime);
        });
        
        return {
          optimizedOrder,
          estimatedRouteTime: parsed.estimatedRouteTime || bookings.length * 30,
          suggestions: parsed.suggestions || [
            'Start with downtown locations to avoid traffic',
            'Group nearby properties together',
            'Allow extra time during rush hours'
          ]
        };
      }
    } catch (parseError) {
      console.error('Error parsing schedule optimization:', parseError);
    }
    
    // Fallback optimization
    return {
      optimizedOrder: bookings.sort((a, b) => a.serviceTime.localeCompare(b.serviceTime)),
      estimatedRouteTime: bookings.length * 30,
      suggestions: [
        'Route optimized by time',
        'Consider traffic patterns',
        'Group nearby locations'
      ]
    };
  } catch (error) {
    console.error('Error optimizing schedule:', error);
    return {
      optimizedOrder: bookings,
      estimatedRouteTime: bookings.length * 30,
      suggestions: ['Manual optimization recommended']
    };
  }
}

// Answer customer questions about services
export async function answerCustomerQuestion(question: string): Promise<string> {
  try {
    const result = await model.generateContent(question);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error answering question:', error);
    return 'I\'d be happy to help! For immediate assistance, please call Valerie at (512) 781-0527.';
  }
}