import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Create Stripe instance at runtime to avoid build-time errors
function getStripeInstance() {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  
  if (!stripeSecretKey) {
    throw new Error('STRIPE_SECRET_KEY environment variable is not configured');
  }
  
  return new Stripe(stripeSecretKey, {
    apiVersion: '2025-07-30.basil',
  });
}

export async function POST(request: NextRequest) {
  try {
    const stripe = getStripeInstance();
    const body = await request.text();
    const sig = request.headers.get('stripe-signature');

    if (!sig) {
      return NextResponse.json(
        { error: 'Missing stripe signature' },
        { status: 400 }
      );
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      return NextResponse.json(
        { error: 'STRIPE_WEBHOOK_SECRET environment variable is not configured' },
        { status: 500 }
      );
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        body,
        sig,
        webhookSecret
      );
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json(
        { error: `Webhook Error: ${err instanceof Error ? err.message : 'Unknown error'}` },
        { status: 400 }
      );
    }

    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log('Payment succeeded for booking:', paymentIntent.metadata.bookingId);
        
        // Here you would update your booking status in database
        // For now, we'll log it
        await handlePaymentSuccess(paymentIntent);
        break;
        
      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object as Stripe.PaymentIntent;
        console.log('Payment failed for booking:', failedPayment.metadata.bookingId);
        
        // Handle failed payment
        await handlePaymentFailure(failedPayment);
        break;
        
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ received: true });
    
  } catch (error) {
    console.error('Stripe webhook error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function handlePaymentSuccess(paymentIntent: Stripe.PaymentIntent) {
  // Update booking status in your database
  // Send confirmation email
  // Update CRM
  console.log(`Payment of $${paymentIntent.amount / 100} succeeded for booking ${paymentIntent.metadata.bookingId}`);
  
  // You could also trigger additional actions here:
  // - Update Microsoft 365 calendar
  // - Send SMS notification
  // - Update Dynamics 365
}

async function handlePaymentFailure(paymentIntent: Stripe.PaymentIntent) {
  // Handle failed payment
  // Send failure notification
  // Update booking status
  console.log(`Payment failed for booking ${paymentIntent.metadata.bookingId}`);
  
  // You could trigger:
  // - Send email about failed payment
  // - Update booking status to "payment failed"
  // - Notify admin team
}