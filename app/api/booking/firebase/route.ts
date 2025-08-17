// Firebase Booking API with Vertex AI Intelligence
import { NextRequest, NextResponse } from 'next/server';
import { 
  createFirebaseBooking, 
  getBooking, 
  updateBookingStatus,
  updatePaymentStatus,
  getAvailableTimeSlots,
  getCustomerBookings,
  cancelBooking
} from '@/lib/bookingService';
import { 
  analyzeBookingRequest,
  getPersonalizedRecommendations,
  estimateCleaningDuration,
  generateConfirmationMessage
} from '@/lib/vertexBookingAI';
import { sendBookingToTeams } from '@/lib/teamsWebhook';
import Stripe from 'stripe';

// Initialize Stripe
const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2025-07-30.basil' })
  : null;

// POST - Create new booking with AI assistance
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    switch (action) {
      case 'analyze':
        // AI analyzes booking request
        const analysis = await analyzeBookingRequest({
          message: body.message,
          context: body.context
        });
        return NextResponse.json(analysis);

      case 'create':
        // Create booking in Firebase
        const bookingId = await createFirebaseBooking(body.booking);
        
        // Generate AI confirmation message
        const confirmationMessage = await generateConfirmationMessage({
          ...body.booking,
          bookingId
        });
        
        // Create Stripe payment intent if needed
        let paymentIntent = null;
        if (stripe && body.booking.totalPrice > 0) {
          try {
            paymentIntent = await stripe.paymentIntents.create({
              amount: Math.round(body.booking.totalPrice * 100),
              currency: 'usd',
              metadata: {
                bookingId,
                customerName: body.booking.customerName,
                serviceType: body.booking.serviceType
              }
            });
            
            // Update booking with payment intent ID
            await updatePaymentStatus(bookingId, 'pending', paymentIntent.id);
          } catch (stripeError) {
            console.error('Stripe error:', stripeError);
          }
        }
        
        return NextResponse.json({
          success: true,
          bookingId,
          paymentIntent: paymentIntent?.client_secret,
          confirmationMessage
        });

      case 'estimate':
        // Get AI duration estimate
        const estimate = await estimateCleaningDuration(body.booking);
        return NextResponse.json(estimate);

      case 'recommendations':
        // Get personalized recommendations
        const recommendations = await getPersonalizedRecommendations({
          pastBookings: body.pastBookings,
          preferences: body.preferences,
          propertyType: body.propertyType
        });
        return NextResponse.json(recommendations);

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Booking API error:', error);
    return NextResponse.json(
      { error: 'Failed to process request', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// GET - Retrieve booking information
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    
    switch (action) {
      case 'availability':
        // Get available time slots for a date
        const date = searchParams.get('date');
        if (!date) {
          return NextResponse.json(
            { error: 'Date parameter required' },
            { status: 400 }
          );
        }
        const slots = await getAvailableTimeSlots(date);
        return NextResponse.json({ slots });

      case 'customer':
        // Get customer's bookings
        const email = searchParams.get('email');
        if (!email) {
          return NextResponse.json(
            { error: 'Email parameter required' },
            { status: 400 }
          );
        }
        const bookings = await getCustomerBookings(email);
        return NextResponse.json({ bookings });

      case 'booking':
        // Get specific booking
        const bookingId = searchParams.get('id');
        if (!bookingId) {
          return NextResponse.json(
            { error: 'Booking ID required' },
            { status: 400 }
          );
        }
        const booking = await getBooking(bookingId);
        if (!booking) {
          return NextResponse.json(
            { error: 'Booking not found' },
            { status: 404 }
          );
        }
        return NextResponse.json({ booking });

      default:
        return NextResponse.json({
          status: 'Firebase Booking API',
          features: [
            'AI-powered booking analysis',
            'Intelligent scheduling',
            'Duration estimation',
            'Personalized recommendations'
          ],
          firebase: {
            project: 'aura-spring-cleaning-ce122',
            vertexAI: 'enabled'
          }
        });
    }
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}

// PUT - Update booking
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { bookingId, action } = body;
    
    if (!bookingId) {
      return NextResponse.json(
        { error: 'Booking ID required' },
        { status: 400 }
      );
    }
    
    switch (action) {
      case 'status':
        await updateBookingStatus(bookingId, body.status);
        return NextResponse.json({ success: true });

      case 'payment':
        await updatePaymentStatus(bookingId, body.paymentStatus, body.paymentIntentId);
        return NextResponse.json({ success: true });

      case 'cancel':
        await cancelBooking(bookingId, body.reason);
        return NextResponse.json({ success: true });

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json(
      { error: 'Failed to update booking' },
      { status: 500 }
    );
  }
}

// Webhook endpoint for Stripe payments
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, data } = body;
    
    if (type === 'payment_intent.succeeded') {
      const paymentIntent = data.object;
      const bookingId = paymentIntent.metadata.bookingId;
      
      if (bookingId) {
        await updatePaymentStatus(bookingId, 'paid', paymentIntent.id);
        await updateBookingStatus(bookingId, 'confirmed');
        
        // Send confirmation to Teams
        const booking = await getBooking(bookingId);
        if (booking) {
          await sendBookingToTeams({
            ...booking,
            bookingId,
            paymentStatus: 'paid'
          });
        }
      }
    }
    
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}