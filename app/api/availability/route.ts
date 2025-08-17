import { NextRequest, NextResponse } from 'next/server';
import { getAvailableSlots, getWeekAvailability, getNextAvailableSlot } from '@/lib/calendarService';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');
    const days = searchParams.get('days');
    const next = searchParams.get('next');
    
    // Get next available slot
    if (next === 'true') {
      const nextSlot = await getNextAvailableSlot();
      return NextResponse.json({ 
        success: true, 
        nextSlot 
      });
    }
    
    // Get week availability
    if (days) {
      const startDate = date ? new Date(date) : new Date();
      const numDays = parseInt(days);
      const availability = await getWeekAvailability(startDate, numDays);
      
      return NextResponse.json({ 
        success: true, 
        availability 
      });
    }
    
    // Get single day availability
    if (date) {
      const targetDate = new Date(date);
      const slots = await getAvailableSlots(targetDate);
      
      return NextResponse.json({ 
        success: true, 
        date: targetDate.toISOString(),
        slots 
      });
    }
    
    // Default: Get today's availability
    const today = new Date();
    const todaySlots = await getAvailableSlots(today);
    
    return NextResponse.json({ 
      success: true, 
      date: today.toISOString(),
      slots: todaySlots 
    });
    
  } catch (error) {
    console.error('Availability API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch availability' 
      },
      { status: 500 }
    );
  }
}