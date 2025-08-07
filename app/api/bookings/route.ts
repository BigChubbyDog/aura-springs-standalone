import { NextRequest, NextResponse } from 'next/server';
import { processNewBooking, sendCustomerConfirmation } from '@/lib/microsoftIntegration';

// Stripe configuration for payment processing
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || '';
const STRIPE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '';

// Square configuration (alternative payment)
const SQUARE_ACCESS_TOKEN = process.env.SQUARE_ACCESS_TOKEN || '';
const SQUARE_LOCATION_ID = process.env.SQUARE_LOCATION_ID || '';

// PayPal configuration
const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '';
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET || '';

export async function POST(request: NextRequest) {
  try {
    const booking = await request.json();
    
    // Validate booking data
    if (!booking.customerEmail || !booking.customerName || !booking.serviceDate) {
      return NextResponse.json(
        { error: 'Missing required booking information' },
        { status: 400 }
      );
    }

    // Create payment link using Stripe
    let paymentLink = '';
    if (STRIPE_SECRET_KEY) {
      const stripe = require('stripe')(STRIPE_SECRET_KEY);
      
      // Create a payment link for the booking
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: `${booking.serviceType} Cleaning Service`,
                description: `${booking.bedrooms}BR/${booking.bathrooms}BA - ${booking.squareFeet} sq ft`,
                metadata: {
                  booking_id: booking.customerEmail + '_' + Date.now(),
                  service_date: booking.serviceDate,
                },
              },
              unit_amount: booking.totalPrice * 100, // Convert to cents
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `https://aurasprings.com/booking/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `https://aurasprings.com/booking/cancel`,
        customer_email: booking.customerEmail,
        metadata: {
          booking_date: booking.serviceDate,
          booking_time: booking.serviceTime,
          service_type: booking.serviceType,
          customer_name: booking.customerName,
        },
        payment_intent_data: {
          description: `Aura Spring Cleaning - ${booking.serviceType}`,
          metadata: {
            booking_id: booking.customerEmail + '_' + Date.now(),
          },
        },
        invoice_creation: {
          enabled: true,
        },
      });
      
      paymentLink = session.url;
      booking.paymentLink = paymentLink;
      booking.paymentSessionId = session.id;
    }

    // Alternative: Create Square payment link
    if (!paymentLink && SQUARE_ACCESS_TOKEN) {
      const squareClient = require('square');
      const client = new squareClient.Client({
        accessToken: SQUARE_ACCESS_TOKEN,
        environment: 'production',
      });

      const response = await client.checkoutApi.createPaymentLink({
        idempotencyKey: `${booking.customerEmail}_${Date.now()}`,
        order: {
          locationId: SQUARE_LOCATION_ID,
          lineItems: [
            {
              name: `${booking.serviceType} Cleaning Service`,
              quantity: '1',
              basePriceMoney: {
                amount: BigInt(booking.totalPrice * 100),
                currency: 'USD',
              },
            },
          ],
        },
        checkoutOptions: {
          redirectUrl: 'https://aurasprings.com/booking/success',
          askForShippingAddress: false,
          merchantSupportEmail: 'hello@aurasprings.com',
        },
        prePopulatedData: {
          buyerEmail: booking.customerEmail,
          buyerPhoneNumber: booking.customerPhone,
        },
      });

      paymentLink = response.result.paymentLink.url;
      booking.paymentLink = paymentLink;
    }

    // Alternative: Create PayPal payment link
    if (!paymentLink && PAYPAL_CLIENT_ID) {
      // PayPal implementation
      const paypalUrl = `https://www.paypal.com/paypalme/auraspringcleaning/${booking.totalPrice}USD`;
      paymentLink = paypalUrl;
      booking.paymentLink = paymentLink;
    }

    // Process booking through Microsoft integrations
    const integrationResults = await processNewBooking(booking);
    
    // Send confirmation email with payment link
    if (paymentLink) {
      booking.paymentInstructions = `Please complete your payment here: ${paymentLink}`;
    }
    await sendCustomerConfirmation(booking);

    // Store booking in database (you can integrate with your preferred database)
    // For now, we'll store it in a JSON file or send to a webhook
    if (process.env.BOOKING_STORAGE_WEBHOOK) {
      await fetch(process.env.BOOKING_STORAGE_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...booking,
          integrationResults,
          timestamp: new Date().toISOString(),
        }),
      });
    }

    // Return success response with payment link
    return NextResponse.json({
      success: true,
      message: 'Booking created successfully',
      bookingId: `${booking.customerEmail}_${Date.now()}`,
      paymentLink: paymentLink || null,
      integrationResults,
    });
  } catch (error) {
    console.error('Booking API error:', error);
    return NextResponse.json(
      { error: 'Failed to process booking', details: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  // Get booking status or list bookings (protected endpoint)
  const authHeader = request.headers.get('authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  // Verify token (implement your auth logic here)
  // For now, just return a sample response
  return NextResponse.json({
    bookings: [],
    message: 'Bookings endpoint - implement database query here',
  });
}