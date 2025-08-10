// Meta Pixel Events specific to cleaning service business
import { metaPixel, trackConversion } from './metaPixel';

// High-value events for cleaning services
export const cleaningServiceEvents = {
  // Track when someone views a specific service page (important for retargeting)
  viewService: (serviceName: string, price: number) => {
    metaPixel.viewContent({
      content_name: serviceName,
      content_category: 'Cleaning Service',
      content_type: 'service',
      value: price,
      currency: 'USD',
    });
  },

  // Track when someone starts booking process
  startBooking: (serviceType: string, estimatedValue: number) => {
    metaPixel.initiateCheckout({
      content_category: 'Cleaning Service',
      content_ids: [serviceType],
      value: estimatedValue,
      currency: 'USD',
    });
  },

  // Track when someone selects a date/time
  selectDateTime: (date: string, time: string, serviceType: string) => {
    metaPixel.trackCustom('SelectDateTime', {
      date,
      time,
      service_type: serviceType,
      content_category: 'Booking',
    });
  },

  // Track when someone enters address (high intent signal)
  enterAddress: (zipCode: string, serviceType: string) => {
    metaPixel.trackCustom('AddressEntered', {
      zip_code: zipCode,
      service_type: serviceType,
      content_category: 'Booking',
    });
  },

  // Track quote requests (very high value)
  requestQuote: async (userData: {
    email?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
    zipCode?: string;
    serviceType: string;
    estimatedValue: number;
  }) => {
    // Track with both Pixel and Conversion API for accuracy
    await trackConversion('Lead', {
      content_name: `Quote Request - ${userData.serviceType}`,
      content_category: 'Quote',
      value: userData.estimatedValue,
      currency: 'USD',
      predicted_ltv: userData.estimatedValue * 12, // Assume monthly service
    }, {
      email: userData.email,
      phone: userData.phone,
      firstName: userData.firstName,
      lastName: userData.lastName,
      zipCode: userData.zipCode,
    });
  },

  // Track actual bookings (highest value)
  completeBooking: async (bookingData: {
    email: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
    zipCode?: string;
    serviceType: string;
    price: number;
    frequency: 'onetime' | 'weekly' | 'biweekly' | 'monthly';
    bookingId: string;
  }) => {
    const ltv = bookingData.frequency === 'onetime' 
      ? bookingData.price 
      : bookingData.frequency === 'weekly' 
        ? bookingData.price * 52 
        : bookingData.frequency === 'biweekly' 
          ? bookingData.price * 26 
          : bookingData.price * 12;

    await trackConversion('Purchase', {
      content_ids: [bookingData.bookingId],
      content_name: bookingData.serviceType,
      content_type: 'service',
      contents: [{
        id: bookingData.serviceType,
        quantity: 1,
      }],
      value: bookingData.price,
      currency: 'USD',
      predicted_ltv: ltv,
      frequency: bookingData.frequency,
    }, {
      email: bookingData.email,
      phone: bookingData.phone,
      firstName: bookingData.firstName,
      lastName: bookingData.lastName,
      zipCode: bookingData.zipCode,
    });
  },

  // Track recurring customer signups (very valuable)
  subscribeRecurring: (frequency: string, monthlyValue: number) => {
    const annualValue = monthlyValue * 12;
    metaPixel.trackCustom('Subscribe', {
      predicted_ltv: annualValue,
      value: monthlyValue,
      currency: 'USD',
      frequency,
      content_category: 'Subscription',
    });
  },

  // Track phone calls (high intent)
  clickToCall: (source: string) => {
    metaPixel.trackCustom('ClickToCall', {
      source,
      content_category: 'Contact',
      value: 50, // Estimated value of phone lead
      currency: 'USD',
    });
  },

  // Track live chat interactions
  startChat: () => {
    metaPixel.trackCustom('StartChat', {
      content_category: 'Support',
      value: 30, // Estimated value of chat lead
      currency: 'USD',
    });
  },

  // Track review/testimonial views (social proof)
  viewReviews: () => {
    metaPixel.trackCustom('ViewReviews', {
      content_category: 'Social Proof',
    });
  },

  // Track special offers/discounts viewed
  viewOffer: (offerName: string, discountAmount: number) => {
    metaPixel.trackCustom('ViewOffer', {
      offer_name: offerName,
      discount_amount: discountAmount,
      content_category: 'Promotion',
    });
  },

  // Track tower/building specific interest
  viewTowerPage: (towerName: string, estimatedResidents: number) => {
    metaPixel.viewContent({
      content_name: `Tower - ${towerName}`,
      content_category: 'Location',
      content_type: 'building',
      custom_data: {
        potential_customers: estimatedResidents,
      },
    });
  },

  // Track add-on services selected
  selectAddOn: (addOnName: string, price: number) => {
    metaPixel.trackCustom('AddToCart', {
      content_name: addOnName,
      content_category: 'Add-on Service',
      value: price,
      currency: 'USD',
    });
  },

  // Track abandoned bookings for retargeting
  abandonBooking: (step: string, serviceType: string, estimatedValue: number) => {
    metaPixel.trackCustom('AbandonedBooking', {
      abandonment_step: step,
      service_type: serviceType,
      value: estimatedValue,
      currency: 'USD',
    });
  },

  // Track referral program interactions
  viewReferralProgram: () => {
    metaPixel.trackCustom('ViewReferralProgram', {
      content_category: 'Referral',
    });
  },

  // Track customer reactivation
  returnCustomer: (daysSinceLastService: number, customerValue: number) => {
    metaPixel.trackCustom('CustomerReturn', {
      days_inactive: daysSinceLastService,
      customer_ltv: customerValue,
      content_category: 'Retention',
    });
  },
};