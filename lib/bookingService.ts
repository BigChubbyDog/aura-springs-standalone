// Firebase Booking Service with Vertex AI Intelligence
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  getDoc, 
  updateDoc, 
  query, 
  where, 
  orderBy, 
  Timestamp,
  serverTimestamp,
  DocumentData,
  QuerySnapshot
} from 'firebase/firestore';
import { db } from './firebase';
import { calculatePrice } from './pricingService';
import { sendBookingToTeams } from './teamsWebhook';

export interface FirebaseBooking {
  // Customer Information
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  
  // Service Details
  serviceType: 'standard' | 'deep' | 'moveInOut' | 'airbnb' | 'postConstruction';
  serviceDate: string;
  serviceTime: string;
  frequency: 'onetime' | 'weekly' | 'biweekly' | 'monthly';
  
  // Property Details
  address: string;
  squareFeet: number;
  bedrooms: number;
  bathrooms: number;
  
  // Pricing
  totalPrice: number;
  discount?: number;
  addOns?: string[];
  
  // Additional
  specialInstructions?: string;
  preferredCleaner?: string;
  keyInstructions?: string;
  petInfo?: string;
  
  // System Fields
  bookingId?: string;
  status?: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  createdAt?: any;
  updatedAt?: any;
  paymentStatus?: 'pending' | 'paid' | 'failed';
  paymentIntentId?: string;
  
  // AI Insights
  aiPriorityScore?: number; // 0-100 priority score from AI
  aiSuggestedTeam?: string[];
  aiEstimatedDuration?: number; // minutes
  aiSpecialNotes?: string;
}

// Create a new booking in Firebase
export async function createFirebaseBooking(booking: FirebaseBooking): Promise<string> {
  try {
    // Generate unique booking ID
    const bookingId = `ASC-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
    // Calculate price
    const pricing = calculatePrice({
      bedrooms: booking.bedrooms,
      bathrooms: booking.bathrooms,
      squareFeet: booking.squareFeet,
      serviceType: booking.serviceType,
      frequency: booking.frequency,
      addOns: booking.addOns || [],
      location: 'default'
    });
    
    // Prepare booking document
    const bookingDoc = {
      ...booking,
      bookingId,
      totalPrice: pricing.total,
      discount: pricing.discount,
      status: 'pending',
      paymentStatus: 'pending',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    
    // Save to Firestore
    const docRef = await addDoc(collection(db, 'bookings'), bookingDoc);
    
    // Send notification to Teams
    await sendBookingToTeams({
      ...booking,
      bookingId,
      totalPrice: pricing.total
    });
    
    // Log for analytics
    console.log('✅ Booking created:', bookingId);
    
    return docRef.id;
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
}

// Get a booking by ID
export async function getBooking(bookingId: string): Promise<FirebaseBooking | null> {
  try {
    const bookingRef = doc(db, 'bookings', bookingId);
    const bookingSnap = await getDoc(bookingRef);
    
    if (bookingSnap.exists()) {
      return bookingSnap.data() as FirebaseBooking;
    }
    
    return null;
  } catch (error) {
    console.error('Error getting booking:', error);
    return null;
  }
}

// Get all bookings for a customer
export async function getCustomerBookings(email: string): Promise<FirebaseBooking[]> {
  try {
    const q = query(
      collection(db, 'bookings'),
      where('customerEmail', '==', email),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const bookings: FirebaseBooking[] = [];
    
    querySnapshot.forEach((doc) => {
      bookings.push({ ...doc.data(), id: doc.id } as FirebaseBooking);
    });
    
    return bookings;
  } catch (error) {
    console.error('Error getting customer bookings:', error);
    return [];
  }
}

// Get upcoming bookings
export async function getUpcomingBookings(): Promise<FirebaseBooking[]> {
  try {
    const today = new Date().toISOString().split('T')[0];
    const q = query(
      collection(db, 'bookings'),
      where('serviceDate', '>=', today),
      where('status', 'in', ['pending', 'confirmed']),
      orderBy('serviceDate', 'asc'),
      orderBy('serviceTime', 'asc')
    );
    
    const querySnapshot = await getDocs(q);
    const bookings: FirebaseBooking[] = [];
    
    querySnapshot.forEach((doc) => {
      bookings.push({ ...doc.data(), id: doc.id } as FirebaseBooking);
    });
    
    return bookings;
  } catch (error) {
    console.error('Error getting upcoming bookings:', error);
    return [];
  }
}

// Update booking status
export async function updateBookingStatus(
  bookingId: string, 
  status: FirebaseBooking['status']
): Promise<void> {
  try {
    const bookingRef = doc(db, 'bookings', bookingId);
    await updateDoc(bookingRef, {
      status,
      updatedAt: serverTimestamp()
    });
    
    console.log(`✅ Booking ${bookingId} status updated to ${status}`);
  } catch (error) {
    console.error('Error updating booking status:', error);
    throw error;
  }
}

// Update payment status
export async function updatePaymentStatus(
  bookingId: string,
  paymentStatus: FirebaseBooking['paymentStatus'],
  paymentIntentId?: string
): Promise<void> {
  try {
    const bookingRef = doc(db, 'bookings', bookingId);
    const updateData: any = {
      paymentStatus,
      updatedAt: serverTimestamp()
    };
    
    if (paymentIntentId) {
      updateData.paymentIntentId = paymentIntentId;
    }
    
    // If payment is successful, confirm the booking
    if (paymentStatus === 'paid') {
      updateData.status = 'confirmed';
    }
    
    await updateDoc(bookingRef, updateData);
    
    console.log(`✅ Payment status updated for booking ${bookingId}`);
  } catch (error) {
    console.error('Error updating payment status:', error);
    throw error;
  }
}

// Get available time slots for a specific date
export async function getAvailableTimeSlots(date: string): Promise<string[]> {
  try {
    // Define all possible time slots
    const allTimeSlots = [
      '08:00', '09:00', '10:00', '11:00',
      '12:00', '13:00', '14:00', '15:00',
      '16:00', '17:00'
    ];
    
    // Get bookings for the specified date
    const q = query(
      collection(db, 'bookings'),
      where('serviceDate', '==', date),
      where('status', 'in', ['pending', 'confirmed'])
    );
    
    const querySnapshot = await getDocs(q);
    const bookedSlots = new Set<string>();
    
    querySnapshot.forEach((doc) => {
      const booking = doc.data();
      bookedSlots.add(booking.serviceTime);
      
      // Block adjacent time slots for longer services
      const timeIndex = allTimeSlots.indexOf(booking.serviceTime);
      if (booking.serviceType === 'deep' || booking.serviceType === 'moveInOut') {
        // Block next slot for deep cleaning
        if (timeIndex < allTimeSlots.length - 1) {
          bookedSlots.add(allTimeSlots[timeIndex + 1]);
        }
      }
    });
    
    // Return available slots
    return allTimeSlots.filter(slot => !bookedSlots.has(slot));
  } catch (error) {
    console.error('Error getting available time slots:', error);
    return [];
  }
}

// Calculate optimal route for cleaners (for a specific date)
export async function getOptimizedRoute(date: string): Promise<FirebaseBooking[]> {
  try {
    const bookings = await getUpcomingBookings();
    const todaysBookings = bookings.filter(b => b.serviceDate === date);
    
    // Simple optimization: Sort by time and proximity
    // In production, this would use a proper routing algorithm
    todaysBookings.sort((a, b) => {
      // First sort by time
      if (a.serviceTime !== b.serviceTime) {
        return a.serviceTime.localeCompare(b.serviceTime);
      }
      // Then by address (simplified)
      return a.address.localeCompare(b.address);
    });
    
    return todaysBookings;
  } catch (error) {
    console.error('Error optimizing route:', error);
    return [];
  }
}

// Get booking statistics
export async function getBookingStats(): Promise<{
  total: number;
  pending: number;
  confirmed: number;
  completed: number;
  revenue: number;
}> {
  try {
    const q = query(collection(db, 'bookings'));
    const querySnapshot = await getDocs(q);
    
    const stats = {
      total: 0,
      pending: 0,
      confirmed: 0,
      completed: 0,
      revenue: 0
    };
    
    querySnapshot.forEach((doc) => {
      const booking = doc.data() as FirebaseBooking;
      stats.total++;
      
      switch (booking.status) {
        case 'pending':
          stats.pending++;
          break;
        case 'confirmed':
          stats.confirmed++;
          break;
        case 'completed':
          stats.completed++;
          if (booking.paymentStatus === 'paid') {
            stats.revenue += booking.totalPrice;
          }
          break;
      }
    });
    
    return stats;
  } catch (error) {
    console.error('Error getting booking stats:', error);
    return {
      total: 0,
      pending: 0,
      confirmed: 0,
      completed: 0,
      revenue: 0
    };
  }
}

// Cancel a booking
export async function cancelBooking(bookingId: string, reason?: string): Promise<void> {
  try {
    const bookingRef = doc(db, 'bookings', bookingId);
    await updateDoc(bookingRef, {
      status: 'cancelled',
      cancellationReason: reason || 'Customer requested cancellation',
      cancelledAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    
    console.log(`✅ Booking ${bookingId} cancelled`);
  } catch (error) {
    console.error('Error cancelling booking:', error);
    throw error;
  }
}