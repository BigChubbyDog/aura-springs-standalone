import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const ACCESS_TOKEN = process.env.META_CONVERSION_ACCESS_TOKEN;
const PIXEL_ID = process.env.META_DATASET_ID || '753683467224168';

// Hash user data for privacy (required by Meta)
function hashData(data: string): string {
  return crypto.createHash('sha256').update(data.toLowerCase().trim()).digest('hex');
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      eventName,
      eventData,
      userData,
      sourceUrl,
      userAgent,
    } = body;

    // Get user's IP address
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '';
    
    // Get fbc (Facebook click ID) and fbp (Facebook browser ID) from cookies
    const cookies = request.headers.get('cookie') || '';
    const fbc = cookies.match(/_fbc=([^;]+)/)?.[1] || '';
    const fbp = cookies.match(/_fbp=([^;]+)/)?.[1] || '';

    // Prepare user data (hashed for privacy)
    const hashedUserData: any = {};
    if (userData?.email) {
      hashedUserData.em = hashData(userData.email);
    }
    if (userData?.phone) {
      // Remove non-numeric characters and hash
      const cleanPhone = userData.phone.replace(/\D/g, '');
      hashedUserData.ph = hashData(cleanPhone);
    }
    if (userData?.firstName) {
      hashedUserData.fn = hashData(userData.firstName);
    }
    if (userData?.lastName) {
      hashedUserData.ln = hashData(userData.lastName);
    }
    if (userData?.city) {
      hashedUserData.ct = hashData(userData.city);
    }
    if (userData?.state) {
      hashedUserData.st = hashData(userData.state);
    }
    if (userData?.zipCode) {
      hashedUserData.zp = hashData(userData.zipCode);
    }

    // Add client user agent and IP
    if (userAgent) {
      hashedUserData.client_user_agent = userAgent;
    }
    if (ip) {
      hashedUserData.client_ip_address = ip;
    }
    if (fbc) {
      hashedUserData.fbc = fbc;
    }
    if (fbp) {
      hashedUserData.fbp = fbp;
    }

    // Prepare the event data for Conversion API
    const conversionData = {
      data: [
        {
          event_name: eventName,
          event_time: Math.floor(Date.now() / 1000),
          event_source_url: sourceUrl,
          action_source: 'website',
          user_data: hashedUserData,
          custom_data: eventData,
        },
      ],
    };

    // Send to Meta Conversion API
    const metaResponse = await fetch(
      `https://graph.facebook.com/v18.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(conversionData),
      }
    );

    if (!metaResponse.ok) {
      const errorData = await metaResponse.json();
      console.error('Meta Conversion API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to track conversion', details: errorData },
        { status: 500 }
      );
    }

    const responseData = await metaResponse.json();
    
    return NextResponse.json({
      success: true,
      events_received: responseData.events_received,
      fbtrace_id: responseData.fbtrace_id,
    });
  } catch (error) {
    console.error('Conversion API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}