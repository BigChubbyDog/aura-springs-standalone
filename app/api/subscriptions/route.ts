import { NextRequest, NextResponse } from 'next/server';
import { 
  createCheckoutSession, 
  createOrRetrieveCustomer,
  createSubscription,
  cancelSubscription,
  updateSubscription,
  pauseSubscription,
  resumeSubscription,
  createCustomerPortalSession,
  SUBSCRIPTION_PLANS
} from '@/lib/stripeSubscriptions';

// Helper to get base URL
function getBaseUrl(request: NextRequest): string {
  const host = request.headers.get('host') || 'localhost:3000';
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  return `${protocol}://${host}`;
}

// POST /api/subscriptions - Create subscription checkout session
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      planId, 
      customerEmail, 
      customerName,
      customerPhone,
      metadata = {}
    } = body;

    // Validate plan
    if (!planId || !Object.values(SUBSCRIPTION_PLANS).find(p => p.id === planId)) {
      return NextResponse.json(
        { error: 'Invalid subscription plan' },
        { status: 400 }
      );
    }

    // Validate customer info
    if (!customerEmail || !customerName) {
      return NextResponse.json(
        { error: 'Customer email and name are required' },
        { status: 400 }
      );
    }

    const baseUrl = getBaseUrl(request);

    // Create checkout session
    const session = await createCheckoutSession(
      planId,
      customerEmail,
      `${baseUrl}/booking/success`,
      `${baseUrl}/booking`,
      {
        customer_name: customerName,
        customer_phone: customerPhone || '',
        ...metadata
      }
    );

    // Log to Azure Application Insights
    console.log('Subscription checkout session created:', {
      sessionId: session.id,
      planId,
      customerEmail
    });

    // Send to Teams webhook for notification
    if (process.env.TEAMS_WEBHOOK_URL) {
      await fetch(process.env.TEAMS_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: `New Subscription Signup Started`,
          sections: [{
            facts: [
              { name: 'Customer', value: customerName },
              { name: 'Email', value: customerEmail },
              { name: 'Plan', value: SUBSCRIPTION_PLANS[planId as keyof typeof SUBSCRIPTION_PLANS].name },
              { name: 'Monthly Value', value: `$${(SUBSCRIPTION_PLANS[planId as keyof typeof SUBSCRIPTION_PLANS].price / 100).toFixed(2)}` }
            ]
          }]
        })
      }).catch(console.error);
    }

    return NextResponse.json({
      sessionId: session.id,
      checkoutUrl: session.url
    });

  } catch (error) {
    console.error('Error creating subscription checkout:', error);
    return NextResponse.json(
      { error: 'Failed to create subscription checkout' },
      { status: 500 }
    );
  }
}

// PUT /api/subscriptions - Update subscription
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      subscriptionId, 
      action,
      newPlanId,
      resumeDate,
      reason
    } = body;

    if (!subscriptionId || !action) {
      return NextResponse.json(
        { error: 'Subscription ID and action are required' },
        { status: 400 }
      );
    }

    let result;

    switch (action) {
      case 'upgrade':
      case 'downgrade':
        if (!newPlanId) {
          return NextResponse.json(
            { error: 'New plan ID is required for upgrade/downgrade' },
            { status: 400 }
          );
        }
        
        // Get the Stripe price ID for the new plan
        // In production, you'd look this up from your price mapping
        const newPriceId = `price_${newPlanId}`;
        result = await updateSubscription(subscriptionId, newPriceId);
        break;

      case 'cancel':
        result = await cancelSubscription(subscriptionId, false, reason);
        break;

      case 'cancel_immediately':
        result = await cancelSubscription(subscriptionId, true, reason);
        break;

      case 'pause':
        result = await pauseSubscription(
          subscriptionId, 
          resumeDate ? new Date(resumeDate) : undefined
        );
        break;

      case 'resume':
        result = await resumeSubscription(subscriptionId);
        break;

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }

    // Log action
    console.log('Subscription updated:', {
      subscriptionId,
      action,
      result: result.status
    });

    return NextResponse.json({
      success: true,
      subscription: {
        id: result.id,
        status: result.status,
        currentPeriodEnd: result.current_period_end,
        cancelAtPeriodEnd: result.cancel_at_period_end
      }
    });

  } catch (error) {
    console.error('Error updating subscription:', error);
    return NextResponse.json(
      { error: 'Failed to update subscription' },
      { status: 500 }
    );
  }
}

// GET /api/subscriptions/portal - Get customer portal URL
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const customerId = searchParams.get('customerId');

    if (!customerId) {
      return NextResponse.json(
        { error: 'Customer ID is required' },
        { status: 400 }
      );
    }

    const baseUrl = getBaseUrl(request);
    const portalUrl = await createCustomerPortalSession(
      customerId,
      `${baseUrl}/account`
    );

    return NextResponse.json({ portalUrl });

  } catch (error) {
    console.error('Error creating customer portal session:', error);
    return NextResponse.json(
      { error: 'Failed to create customer portal session' },
      { status: 500 }
    );
  }
}