import Stripe from 'stripe';

// Initialize Stripe lazily to avoid build-time errors
let stripe: Stripe | null = null;

function getStripe(): Stripe {
  if (!stripe) {
    const key = process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder';
    if (!key) {
      throw new Error('STRIPE_SECRET_KEY is not configured');
    }
    stripe = new Stripe(key, {
      apiVersion: '2024-11-20.acacia',
    });
  }
  return stripe;
}

// Subscription plans for Aura Spring Cleaning
export const SUBSCRIPTION_PLANS = {
  WEEKLY_STANDARD: {
    id: 'weekly_standard',
    name: 'Weekly Standard Cleaning',
    price: 25000, // $250 per week
    interval: 'week' as const,
    features: [
      '2-hour cleaning session',
      'Same team every week',
      'Eco-friendly products',
      'Priority scheduling',
      '15% discount from regular price'
    ],
    metadata: {
      service_type: 'standard',
      frequency: 'weekly',
      duration_hours: '2',
      team_size: '2'
    }
  },
  WEEKLY_LUXURY: {
    id: 'weekly_luxury',
    name: 'Weekly Luxury Cleaning',
    price: 38000, // $380 per week
    interval: 'week' as const,
    features: [
      '3-hour deep cleaning',
      'Dedicated luxury team',
      'Premium products',
      'White glove service',
      '20% discount from regular price',
      'Complimentary add-ons'
    ],
    metadata: {
      service_type: 'luxury',
      frequency: 'weekly',
      duration_hours: '3',
      team_size: '3'
    }
  },
  BIWEEKLY_STANDARD: {
    id: 'biweekly_standard',
    name: 'Bi-Weekly Standard Cleaning',
    price: 28000, // $280 every 2 weeks
    interval: 'week' as const,
    interval_count: 2,
    features: [
      '2.5-hour cleaning session',
      'Consistent team',
      'Eco-friendly products',
      'Flexible scheduling',
      '10% discount from regular price'
    ],
    metadata: {
      service_type: 'standard',
      frequency: 'biweekly',
      duration_hours: '2.5',
      team_size: '2'
    }
  },
  BIWEEKLY_LUXURY: {
    id: 'biweekly_luxury',
    name: 'Bi-Weekly Luxury Cleaning',
    price: 42000, // $420 every 2 weeks
    interval: 'week' as const,
    interval_count: 2,
    features: [
      '3.5-hour deep cleaning',
      'Luxury team',
      'Premium products',
      'Concierge service',
      '15% discount from regular price'
    ],
    metadata: {
      service_type: 'luxury',
      frequency: 'biweekly',
      duration_hours: '3.5',
      team_size: '3'
    }
  },
  MONTHLY_DEEP: {
    id: 'monthly_deep',
    name: 'Monthly Deep Cleaning',
    price: 45000, // $450 per month
    interval: 'month' as const,
    features: [
      '5-hour deep cleaning',
      'Full team (4 cleaners)',
      'All appliances included',
      'Baseboards & windows',
      'Satisfaction guarantee'
    ],
    metadata: {
      service_type: 'deep',
      frequency: 'monthly',
      duration_hours: '5',
      team_size: '4'
    }
  }
};

// Create or retrieve a Stripe customer
export async function createOrRetrieveCustomer(
  email: string,
  name: string,
  phone?: string,
  metadata?: Record<string, string>
): Promise<Stripe.Customer> {
  try {
    // Check if customer exists
    const existingCustomers = await getStripe().customers.list({
      email,
      limit: 1
    });

    if (existingCustomers.data.length > 0) {
      // Update existing customer
      return await getStripe().customers.update(existingCustomers.data[0].id, {
        name,
        phone,
        metadata: {
          ...existingCustomers.data[0].metadata,
          ...metadata,
          updated_at: new Date().toISOString()
        }
      });
    }

    // Create new customer
    return await getStripe().customers.create({
      email,
      name,
      phone,
      metadata: {
        source: 'website',
        created_via: 'aura_spring_app',
        ...metadata
      }
    });
  } catch (error) {
    console.error('Error creating/retrieving customer:', error);
    throw error;
  }
}

// Create a subscription for a customer
export async function createSubscription(
  customerId: string,
  priceId: string,
  paymentMethodId?: string,
  trialDays: number = 0,
  metadata?: Record<string, string>
): Promise<Stripe.Subscription> {
  try {
    const subscriptionData: Stripe.SubscriptionCreateParams = {
      customer: customerId,
      items: [{ price: priceId }],
      payment_behavior: 'default_incomplete',
      payment_settings: {
        save_default_payment_method: 'on_subscription'
      },
      expand: ['latest_invoice.payment_intent'],
      metadata: {
        app: 'aura_spring',
        ...metadata
      }
    };

    // Add payment method if provided
    if (paymentMethodId) {
      subscriptionData.default_payment_method = paymentMethodId;
    }

    // Add trial period if specified
    if (trialDays > 0) {
      subscriptionData.trial_period_days = trialDays;
    }

    // Add discount for first-time customers
    const customer = await getStripe().customers.retrieve(customerId) as Stripe.Customer;
    if (!customer.metadata?.has_subscription) {
      // Apply 20% off first month coupon
      const coupon = await getStripe().coupons.create({
        percent_off: 20,
        duration: 'once',
        name: 'First Time Customer - 20% Off'
      });
      subscriptionData.discounts = [{ coupon: coupon.id }];
    }

    const subscription = await getStripe().subscriptions.create(subscriptionData);

    // Update customer metadata
    await getStripe().customers.update(customerId, {
      metadata: {
        has_subscription: 'true',
        subscription_id: subscription.id,
        subscription_status: subscription.status
      }
    });

    return subscription;
  } catch (error) {
    console.error('Error creating subscription:', error);
    throw error;
  }
}

// Create a checkout session for subscription
export async function createCheckoutSession(
  planId: string,
  customerEmail: string,
  successUrl: string,
  cancelUrl: string,
  metadata?: Record<string, string>
): Promise<Stripe.Checkout.Session> {
  try {
    const plan = Object.values(SUBSCRIPTION_PLANS).find(p => p.id === planId);
    if (!plan) {
      throw new Error(`Invalid plan ID: ${planId}`);
    }

    // Create price in Stripe if it doesn't exist
    let price: Stripe.Price;
    try {
      const prices = await getStripe().prices.list({
        lookup_keys: [planId],
        limit: 1
      });
      
      if (prices.data.length > 0) {
        price = prices.data[0];
      } else {
        // Create product first
        const product = await getStripe().products.create({
          name: plan.name,
          metadata: plan.metadata
        });

        // Create recurring price
        price = await getStripe().prices.create({
          product: product.id,
          unit_amount: plan.price,
          currency: 'usd',
          recurring: {
            interval: plan.interval,
            interval_count: (plan as any).interval_count || 1
          },
          lookup_key: planId,
          metadata: plan.metadata
        });
      }
    } catch (error) {
      console.error('Error with price creation:', error);
      throw error;
    }

    // Create checkout session
    const session = await getStripe().checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price: price.id,
        quantity: 1
      }],
      mode: 'subscription',
      success_url: `${successUrl}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl,
      customer_email: customerEmail,
      subscription_data: {
        trial_period_days: 7, // 7-day free trial
        metadata: {
          ...plan.metadata,
          ...metadata
        }
      },
      allow_promotion_codes: true,
      billing_address_collection: 'required',
      phone_number_collection: {
        enabled: true
      },
      metadata: {
        plan_id: planId,
        ...metadata
      }
    });

    return session;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
}

// Update subscription (upgrade/downgrade)
export async function updateSubscription(
  subscriptionId: string,
  newPriceId: string,
  prorationBehavior: 'create_prorations' | 'none' | 'always_invoice' = 'create_prorations'
): Promise<Stripe.Subscription> {
  try {
    const subscription = await getStripe().subscriptions.retrieve(subscriptionId);
    
    // Update the subscription item with new price
    const updatedSubscription = await getStripe().subscriptions.update(subscriptionId, {
      items: [{
        id: subscription.items.data[0].id,
        price: newPriceId
      }],
      proration_behavior: prorationBehavior
    });

    return updatedSubscription;
  } catch (error) {
    console.error('Error updating subscription:', error);
    throw error;
  }
}

// Cancel subscription
export async function cancelSubscription(
  subscriptionId: string,
  immediately: boolean = false,
  reason?: string
): Promise<Stripe.Subscription> {
  try {
    if (immediately) {
      // Cancel immediately
      return await getStripe().subscriptions.cancel(subscriptionId, {
        cancellation_details: {
          comment: reason
        }
      });
    } else {
      // Cancel at end of billing period
      return await getStripe().subscriptions.update(subscriptionId, {
        cancel_at_period_end: true,
        cancellation_details: {
          comment: reason
        }
      });
    }
  } catch (error) {
    console.error('Error canceling subscription:', error);
    throw error;
  }
}

// Pause subscription
export async function pauseSubscription(
  subscriptionId: string,
  resumeAt?: Date
): Promise<Stripe.Subscription> {
  try {
    const pauseData: Stripe.SubscriptionUpdateParams = {
      pause_collection: {
        behavior: 'mark_uncollectible'
      }
    };

    if (resumeAt) {
      pauseData.pause_collection!.resumes_at = Math.floor(resumeAt.getTime() / 1000);
    }

    return await getStripe().subscriptions.update(subscriptionId, pauseData);
  } catch (error) {
    console.error('Error pausing subscription:', error);
    throw error;
  }
}

// Resume paused subscription
export async function resumeSubscription(
  subscriptionId: string
): Promise<Stripe.Subscription> {
  try {
    return await getStripe().subscriptions.update(subscriptionId, {
      pause_collection: null
    });
  } catch (error) {
    console.error('Error resuming subscription:', error);
    throw error;
  }
}

// Create payment recovery session for failed payments
export async function createPaymentRecoverySession(
  customerId: string,
  returnUrl: string
): Promise<string> {
  try {
    // Get customer's subscriptions
    const subscriptions = await getStripe().subscriptions.list({
      customer: customerId,
      status: 'past_due',
      limit: 1
    });

    if (subscriptions.data.length === 0) {
      throw new Error('No past due subscriptions found');
    }

    const subscription = subscriptions.data[0];
    const invoice = await getStripe().invoices.retrieve(subscription.latest_invoice as string);

    // Create a payment recovery link
    const session = await getStripe().checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer: customerId,
      line_items: [{
        price: subscription.items.data[0].price.id,
        quantity: 1
      }],
      success_url: `${returnUrl}?recovered=true`,
      cancel_url: `${returnUrl}?recovered=false`,
      metadata: {
        subscription_id: subscription.id,
        invoice_id: invoice.id,
        recovery: 'true'
      }
    });

    return session.url!;
  } catch (error) {
    console.error('Error creating payment recovery session:', error);
    throw error;
  }
}

// Get customer portal link for self-service management
export async function createCustomerPortalSession(
  customerId: string,
  returnUrl: string
): Promise<string> {
  try {
    const session = await getStripe().billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl
    });

    return session.url;
  } catch (error) {
    console.error('Error creating customer portal session:', error);
    throw error;
  }
}
