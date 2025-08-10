import { NextResponse } from 'next/server';

interface AbandonedBooking {
  email?: string;
  name?: string;
  service?: string;
  bedrooms?: number;
  bathrooms?: number;
  frequency?: string;
  date?: string;
  time?: string;
  address?: string;
  phone?: string;
  timestamp?: number;
  step?: number;
}

// Store abandoned bookings (in production, use a database)
const abandonedBookings = new Map<string, AbandonedBooking>();

export async function POST(request: Request) {
  try {
    const booking: AbandonedBooking = await request.json();
    
    if (!booking.email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Store the abandoned booking
    abandonedBookings.set(booking.email, booking);
    
    // Schedule email reminders (in production, use a job queue like BullMQ or cron)
    scheduleAbandonedCartEmails(booking);
    
    // Track in analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'abandoned_cart', {
        value: estimateBookingValue(booking),
        currency: 'USD',
        items: [{
          item_name: booking.service || 'Regular Cleaning',
          price: estimateBookingValue(booking),
        }]
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Abandoned booking tracked',
    });

  } catch (error) {
    console.error('Abandoned cart tracking error:', error);
    return NextResponse.json(
      { error: 'Failed to track abandoned booking' },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve abandoned bookings for admin dashboard
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');
  
  if (email) {
    const booking = abandonedBookings.get(email);
    if (booking) {
      return NextResponse.json(booking);
    }
    return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
  }
  
  // Return all abandoned bookings (protect this in production)
  const allBookings = Array.from(abandonedBookings.values());
  return NextResponse.json({
    count: allBookings.length,
    bookings: allBookings,
  });
}

// Helper function to estimate booking value
function estimateBookingValue(booking: AbandonedBooking): number {
  let basePrice = 89; // Default studio price
  
  if (booking.bedrooms) {
    if (booking.bedrooms === 1) basePrice = 109;
    else if (booking.bedrooms === 2) basePrice = 139;
    else if (booking.bedrooms >= 3) basePrice = 169;
  }
  
  // Add frequency discount
  if (booking.frequency === 'weekly') basePrice *= 0.8;
  else if (booking.frequency === 'biweekly') basePrice *= 0.85;
  else if (booking.frequency === 'monthly') basePrice *= 0.9;
  
  return basePrice;
}

// Schedule abandoned cart recovery emails
async function scheduleAbandonedCartEmails(booking: AbandonedBooking) {
  if (!booking.email) return;
  
  // Email 1: 1 hour after abandonment
  setTimeout(() => {
    sendAbandonedCartEmail(booking, 1);
  }, 60 * 60 * 1000); // 1 hour
  
  // Email 2: 24 hours after abandonment with 10% discount
  setTimeout(() => {
    sendAbandonedCartEmail(booking, 2);
  }, 24 * 60 * 60 * 1000); // 24 hours
  
  // Email 3: 72 hours after abandonment with 15% discount
  setTimeout(() => {
    sendAbandonedCartEmail(booking, 3);
  }, 72 * 60 * 60 * 1000); // 72 hours
}

// Send abandoned cart recovery email
async function sendAbandonedCartEmail(booking: AbandonedBooking, emailNumber: number) {
  if (!booking.email) return;
  
  let subject = '';
  let discountCode = '';
  let discountAmount = 0;
  
  switch (emailNumber) {
    case 1:
      subject = `${booking.name ? booking.name + ', ' : ''}You're one step away from a cleaner home!`;
      break;
    case 2:
      subject = `Don't miss out! 10% off your cleaning service`;
      discountCode = 'SAVE10';
      discountAmount = 10;
      break;
    case 3:
      subject = `Last chance: 15% off expires soon!`;
      discountCode = 'COMEBACK15';
      discountAmount = 15;
      break;
  }
  
  const emailContent = generateEmailContent(booking, emailNumber, discountCode, discountAmount);
  
  // Send email via your email service
  // This is where you'd integrate with SendGrid, Resend, etc.
  console.log('Would send email to:', booking.email);
  console.log('Subject:', subject);
  console.log('Content:', emailContent);
  
  // In production, you would call your email service here:
  /*
  await sendEmail({
    to: booking.email,
    subject: subject,
    html: emailContent,
    from: 'hello@aurasprings.com',
  });
  */
}

// Generate email content based on booking data
function generateEmailContent(
  booking: AbandonedBooking, 
  emailNumber: number, 
  discountCode: string,
  discountAmount: number
): string {
  const estimatedPrice = estimateBookingValue(booking);
  const discountedPrice = estimatedPrice * (1 - discountAmount / 100);
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #7c9768, #4c673d); color: white; padding: 30px; text-align: center; }
        .content { padding: 30px; background: #f9f9f9; }
        .button { display: inline-block; padding: 15px 30px; background: #7c9768; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .discount-box { background: #fff; border: 2px dashed #7c9768; padding: 20px; margin: 20px 0; text-align: center; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Aura Spring Cleaning</h1>
          <p>Austin's Premier Cleaning Service</p>
        </div>
        
        <div class="content">
          <h2>Hi ${booking.name || 'there'},</h2>
          
          ${emailNumber === 1 ? `
            <p>We noticed you were booking a cleaning service but didn't complete your reservation. We're here to help!</p>
            <p>Your cleaning details:</p>
            <ul>
              <li>Service: ${booking.service || 'Regular Cleaning'}</li>
              ${booking.bedrooms ? `<li>Size: ${booking.bedrooms} bedroom${booking.bedrooms > 1 ? 's' : ''}</li>` : ''}
              ${booking.date ? `<li>Preferred Date: ${booking.date}</li>` : ''}
              ${booking.frequency ? `<li>Frequency: ${booking.frequency}</li>` : ''}
            </ul>
            <p>Ready to complete your booking? It only takes 30 seconds!</p>
          ` : ''}
          
          ${emailNumber === 2 ? `
            <p>Still thinking about booking your cleaning? We'd love to help make your home sparkle!</p>
            <div class="discount-box">
              <h3>Special Offer: 10% OFF</h3>
              <p>Use code: <strong>${discountCode}</strong></p>
              <p>Your price: <s>$${estimatedPrice}</s> <strong>$${discountedPrice.toFixed(2)}</strong></p>
              <p><em>Valid for 48 hours</em></p>
            </div>
          ` : ''}
          
          ${emailNumber === 3 ? `
            <p>This is your last chance to save on professional cleaning!</p>
            <div class="discount-box">
              <h3>🎁 FINAL OFFER: 15% OFF</h3>
              <p>Use code: <strong>${discountCode}</strong></p>
              <p>Your price: <s>$${estimatedPrice}</s> <strong>$${discountedPrice.toFixed(2)}</strong></p>
              <p><em>Expires in 24 hours!</em></p>
            </div>
            <p>Don't miss out on:</p>
            <ul>
              <li>✅ 100% Satisfaction Guarantee</li>
              <li>✅ Eco-friendly cleaning products</li>
              <li>✅ Licensed & insured professionals</li>
              <li>✅ Same-day service available</li>
            </ul>
          ` : ''}
          
          <center>
            <a href="https://aurasprings.com/booking?resume=true${discountCode ? `&discount=${discountCode}` : ''}" class="button">
              Complete Your Booking
            </a>
          </center>
          
          <p>Questions? Call us at (512) 781-0527 or reply to this email.</p>
          
          <p>Best regards,<br>The Aura Spring Cleaning Team</p>
        </div>
        
        <div class="footer">
          <p>Aura Spring Cleaning | Austin, TX | (512) 781-0527</p>
          <p>You received this email because you started a booking at aurasprings.com</p>
          <p><a href="https://aurasprings.com/unsubscribe?email=${booking.email}">Unsubscribe</a></p>
        </div>
      </div>
    </body>
    </html>
  `;
}

// DELETE endpoint to clear abandoned booking
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');
  
  if (!email) {
    return NextResponse.json(
      { error: 'Email is required' },
      { status: 400 }
    );
  }
  
  const deleted = abandonedBookings.delete(email);
  
  if (deleted) {
    return NextResponse.json({
      success: true,
      message: 'Abandoned booking cleared',
    });
  }
  
  return NextResponse.json(
    { error: 'Booking not found' },
    { status: 404 }
  );
}