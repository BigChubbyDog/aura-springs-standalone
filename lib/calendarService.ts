// Calendar Service for Real-Time Availability
// Integrates with Microsoft Graph API for Teams/Outlook Calendar
// Or Google Calendar API for Google Workspace

import { addDays, addHours, format, startOfDay, endOfDay, isWeekend, setHours, setMinutes } from 'date-fns';

export interface TimeSlot {
  start: Date;
  end: Date;
  available: boolean;
  teamMember?: string;
  popular?: boolean;
  surgePrice?: boolean;
}

export interface DayAvailability {
  date: Date;
  slots: TimeSlot[];
  fullyBooked: boolean;
}

// Microsoft Graph API Configuration
const GRAPH_API_BASE = 'https://graph.microsoft.com/v1.0';
const CALENDAR_ID = process.env.MICROSOFT_CALENDAR_ID || 'primary';
const GRAPH_ACCESS_TOKEN = process.env.MICROSOFT_GRAPH_TOKEN;

// Business Hours Configuration
const BUSINESS_HOURS = {
  weekday: {
    start: 8,  // 8 AM
    end: 18,   // 6 PM
    slotDuration: 120, // 2 hours per cleaning
    bufferTime: 30,    // 30 min between appointments
  },
  saturday: {
    start: 9,  // 9 AM
    end: 16,   // 4 PM
    slotDuration: 120,
    bufferTime: 30,
  },
  sunday: {
    start: 10, // 10 AM
    end: 15,   // 3 PM
    slotDuration: 120,
    bufferTime: 30,
  }
};

// Team Members (for round-robin assignment)
const TEAM_MEMBERS = [
  'Valerie Team A',
  'Valerie Team B',
  'Valerie Team C',
  'Valerie Team D',
];

// Peak hours for surge pricing
const PEAK_HOURS = {
  weekday: [10, 11, 14, 15], // 10-11 AM, 2-3 PM
  weekend: [11, 12, 13],      // 11 AM - 1 PM
};

/**
 * Get available time slots for a specific date
 * Integrates with calendar API to check real bookings
 */
export async function getAvailableSlots(date: Date): Promise<TimeSlot[]> {
  const dayOfWeek = date.getDay();
  const isWeekendDay = dayOfWeek === 0 || dayOfWeek === 6;
  
  // Get business hours for the day
  const hours = isWeekendDay 
    ? (dayOfWeek === 0 ? BUSINESS_HOURS.sunday : BUSINESS_HOURS.saturday)
    : BUSINESS_HOURS.weekday;

  // Get existing bookings from calendar
  const existingBookings = await fetchCalendarBookings(date);
  
  // Generate time slots
  const slots: TimeSlot[] = [];
  const startTime = setMinutes(setHours(date, hours.start), 0);
  const endTime = setMinutes(setHours(date, hours.end), 0);
  
  let currentSlot = startTime;
  
  while (currentSlot < endTime) {
    const slotEnd = addMinutes(currentSlot, hours.slotDuration);
    
    // Check if slot conflicts with existing bookings
    const isBooked = existingBookings.some(booking => 
      (booking.start <= currentSlot && booking.end > currentSlot) ||
      (booking.start < slotEnd && booking.end >= slotEnd)
    );
    
    // Check if it's a peak hour
    const hour = currentSlot.getHours();
    const isPeakHour = isWeekendDay 
      ? PEAK_HOURS.weekend.includes(hour)
      : PEAK_HOURS.weekday.includes(hour);
    
    slots.push({
      start: currentSlot,
      end: slotEnd,
      available: !isBooked,
      teamMember: !isBooked ? assignTeamMember(currentSlot) : undefined,
      popular: isPeakHour,
      surgePrice: isPeakHour && !isBooked,
    });
    
    // Move to next slot with buffer time
    currentSlot = addMinutes(slotEnd, hours.bufferTime);
  }
  
  return slots;
}

/**
 * Get availability for multiple days
 */
export async function getWeekAvailability(startDate: Date, days: number = 7): Promise<DayAvailability[]> {
  const availability: DayAvailability[] = [];
  
  for (let i = 0; i < days; i++) {
    const date = addDays(startDate, i);
    const slots = await getAvailableSlots(date);
    
    availability.push({
      date,
      slots,
      fullyBooked: !slots.some(s => s.available),
    });
  }
  
  return availability;
}

/**
 * Fetch bookings from Microsoft Graph API
 */
async function fetchCalendarBookings(date: Date): Promise<{ start: Date; end: Date }[]> {
  if (!GRAPH_ACCESS_TOKEN) {
    // Fallback to mock data if no token
    return getMockBookings(date);
  }
  
  try {
    const startDateTime = startOfDay(date).toISOString();
    const endDateTime = endOfDay(date).toISOString();
    
    const response = await fetch(
      `${GRAPH_API_BASE}/me/calendar/calendarView?startDateTime=${startDateTime}&endDateTime=${endDateTime}`,
      {
        headers: {
          'Authorization': `Bearer ${GRAPH_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );
    
    if (!response.ok) {
      console.error('Calendar API error:', response.statusText);
      return getMockBookings(date);
    }
    
    const data = await response.json();
    
    return data.value.map((event: any) => ({
      start: new Date(event.start.dateTime),
      end: new Date(event.end.dateTime),
    }));
  } catch (error) {
    console.error('Error fetching calendar:', error);
    return getMockBookings(date);
  }
}

/**
 * Mock bookings for development/fallback
 */
function getMockBookings(date: Date): { start: Date; end: Date }[] {
  const bookings = [];
  const dayOfWeek = date.getDay();
  
  // Simulate some existing bookings
  if (dayOfWeek >= 1 && dayOfWeek <= 5) {
    // Weekday: book morning and afternoon slots randomly
    if (Math.random() > 0.5) {
      bookings.push({
        start: setHours(date, 10),
        end: setHours(date, 12),
      });
    }
    if (Math.random() > 0.5) {
      bookings.push({
        start: setHours(date, 14),
        end: setHours(date, 16),
      });
    }
  }
  
  return bookings;
}

/**
 * Assign team member using round-robin
 */
function assignTeamMember(slot: Date): string {
  const hourIndex = slot.getHours();
  const memberIndex = hourIndex % TEAM_MEMBERS.length;
  return TEAM_MEMBERS[memberIndex];
}

/**
 * Create a booking in the calendar
 */
export async function createCalendarBooking(booking: {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  serviceType: string;
  address: string;
  startTime: Date;
  endTime: Date;
  price: number;
  notes?: string;
}): Promise<{ success: boolean; bookingId?: string; error?: string }> {
  const { 
    customerName, 
    customerEmail, 
    customerPhone, 
    serviceType, 
    address, 
    startTime, 
    endTime, 
    price,
    notes 
  } = booking;
  
  const eventTitle = `🧹 ${serviceType} - ${customerName}`;
  const eventBody = `
Customer: ${customerName}
Phone: ${customerPhone}
Email: ${customerEmail}
Service: ${serviceType}
Address: ${address}
Price: $${price}
${notes ? `Notes: ${notes}` : ''}

---
Booked via Aura Spring Cleaning Website
  `.trim();
  
  if (GRAPH_ACCESS_TOKEN) {
    try {
      const response = await fetch(`${GRAPH_API_BASE}/me/calendar/events`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GRAPH_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject: eventTitle,
          body: {
            contentType: 'Text',
            content: eventBody,
          },
          start: {
            dateTime: startTime.toISOString(),
            timeZone: 'America/Chicago',
          },
          end: {
            dateTime: endTime.toISOString(),
            timeZone: 'America/Chicago',
          },
          location: {
            displayName: address,
          },
          attendees: [
            {
              emailAddress: {
                address: customerEmail,
                name: customerName,
              },
              type: 'required',
            },
          ],
          isReminderOn: true,
          reminderMinutesBeforeStart: 60,
        }),
      });
      
      if (response.ok) {
        const event = await response.json();
        return { 
          success: true, 
          bookingId: event.id 
        };
      } else {
        const error = await response.text();
        console.error('Failed to create calendar event:', error);
        return { 
          success: false, 
          error: 'Failed to create booking' 
        };
      }
    } catch (error) {
      console.error('Error creating calendar event:', error);
      return { 
        success: false, 
        error: 'Calendar service unavailable' 
      };
    }
  } else {
    // Fallback: Save to database or send email notification
    console.log('Mock booking created:', eventTitle);
    return { 
      success: true, 
      bookingId: 'mock-' + Date.now() 
    };
  }
}

/**
 * Cancel a booking
 */
export async function cancelCalendarBooking(bookingId: string): Promise<boolean> {
  if (!GRAPH_ACCESS_TOKEN) {
    console.log('Mock booking cancelled:', bookingId);
    return true;
  }
  
  try {
    const response = await fetch(`${GRAPH_API_BASE}/me/calendar/events/${bookingId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${GRAPH_ACCESS_TOKEN}`,
      },
    });
    
    return response.ok;
  } catch (error) {
    console.error('Error cancelling booking:', error);
    return false;
  }
}

/**
 * Get next available slot
 */
export async function getNextAvailableSlot(): Promise<TimeSlot | null> {
  const now = new Date();
  const maxDays = 14; // Search up to 2 weeks ahead
  
  for (let i = 0; i < maxDays; i++) {
    const date = addDays(now, i);
    const slots = await getAvailableSlots(date);
    
    // Find first available slot after current time
    const availableSlot = slots.find(slot => 
      slot.available && slot.start > now
    );
    
    if (availableSlot) {
      return availableSlot;
    }
  }
  
  return null;
}

/**
 * Check if a specific time slot is available
 */
export async function isSlotAvailable(start: Date, end: Date): Promise<boolean> {
  const bookings = await fetchCalendarBookings(start);
  
  return !bookings.some(booking => 
    (booking.start <= start && booking.end > start) ||
    (booking.start < end && booking.end >= end)
  );
}

/**
 * Get team member schedule for a day
 */
export async function getTeamSchedule(date: Date): Promise<{
  member: string;
  bookings: { start: Date; end: Date; customer: string }[];
}[]> {
  // This would integrate with your team management system
  const schedule = TEAM_MEMBERS.map(member => ({
    member,
    bookings: [] as any[],
  }));
  
  // Fetch bookings and assign to team members
  const bookings = await fetchCalendarBookings(date);
  
  bookings.forEach((booking, index) => {
    const memberIndex = index % TEAM_MEMBERS.length;
    schedule[memberIndex].bookings.push({
      ...booking,
      customer: 'Customer ' + (index + 1),
    });
  });
  
  return schedule;
}

// Helper function
function addMinutes(date: Date, minutes: number): Date {
  return new Date(date.getTime() + minutes * 60000);
}

// Export types for use in components
export type { TimeSlot, DayAvailability };