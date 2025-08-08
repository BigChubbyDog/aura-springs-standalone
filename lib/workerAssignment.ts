import { sendWorkerAssignmentSMS } from './smsService';
import { sendTeamsNotification } from './teamsWebhook';

// Worker types and skills
export interface Worker {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  skills: string[];
  zones: string[]; // Areas they service (zip codes or neighborhoods)
  availability: {
    [date: string]: {
      start: string;
      end: string;
      booked: Array<{ start: string; end: string; bookingId: string }>;
    };
  };
  rating: number;
  completedJobs: number;
  currentLocation?: { lat: number; lng: number };
  isActive: boolean;
  preferredJobTypes: string[];
  maxDailyJobs: number;
  vehicle: boolean;
}

// Sample workers (in production, this would come from a database)
export const WORKERS: Worker[] = [
  {
    id: 'W001',
    firstName: 'Maria',
    lastName: 'Rodriguez',
    phone: '+15125551234',
    email: 'maria@auraspringcleaning.com',
    skills: ['deep-cleaning', 'airbnb', 'eco-friendly'],
    zones: ['78701', '78702', '78703', '78704'], // Central Austin
    availability: {},
    rating: 4.9,
    completedJobs: 523,
    isActive: true,
    preferredJobTypes: ['airbnb', 'deep'],
    maxDailyJobs: 5,
    vehicle: true
  },
  {
    id: 'W002',
    firstName: 'James',
    lastName: 'Wilson',
    phone: '+15125552345',
    email: 'james@auraspringcleaning.com',
    skills: ['standard', 'move-in-out', 'commercial'],
    zones: ['78758', '78759', '78750', '78731'], // North Austin
    availability: {},
    rating: 4.8,
    completedJobs: 412,
    isActive: true,
    preferredJobTypes: ['standard', 'commercial'],
    maxDailyJobs: 6,
    vehicle: true
  },
  {
    id: 'W003',
    firstName: 'Ana',
    lastName: 'Garcia',
    phone: '+15125553456',
    email: 'ana@auraspringcleaning.com',
    skills: ['deep-cleaning', 'post-construction', 'standard'],
    zones: ['78746', '78733', '78735', '78739'], // West Austin
    availability: {},
    rating: 5.0,
    completedJobs: 687,
    isActive: true,
    preferredJobTypes: ['deep', 'post-construction'],
    maxDailyJobs: 4,
    vehicle: true
  },
  {
    id: 'W004',
    firstName: 'David',
    lastName: 'Chen',
    phone: '+15125554567',
    email: 'david@auraspringcleaning.com',
    skills: ['airbnb', 'standard', 'eco-friendly'],
    zones: ['78741', '78744', '78745', '78748'], // South Austin
    availability: {},
    rating: 4.7,
    completedJobs: 289,
    isActive: true,
    preferredJobTypes: ['airbnb', 'standard'],
    maxDailyJobs: 7,
    vehicle: true
  }
];

// Assignment algorithm
export async function assignWorkerToBooking(booking: any): Promise<{
  success: boolean;
  worker?: Worker;
  reason?: string;
  alternatives?: Worker[];
}> {
  // Extract zip code from address
  const zipMatch = booking.address.match(/\b\d{5}\b/);
  const bookingZip = zipMatch ? zipMatch[0] : null;

  // Filter available workers
  const availableWorkers = WORKERS.filter(worker => {
    // Check if worker is active
    if (!worker.isActive) return false;

    // Check if worker services this zone
    if (bookingZip && !worker.zones.includes(bookingZip)) return false;

    // Check if worker has the required skills
    const requiredSkill = mapServiceTypeToSkill(booking.serviceType);
    if (!worker.skills.includes(requiredSkill)) return false;

    // Check availability for the date/time
    const isAvailable = checkWorkerAvailability(worker, booking.serviceDate, booking.serviceTime, booking.duration || 3);
    if (!isAvailable) return false;

    // Check daily job limit
    const jobsOnDate = getWorkerJobCount(worker, booking.serviceDate);
    if (jobsOnDate >= worker.maxDailyJobs) return false;

    return true;
  });

  if (availableWorkers.length === 0) {
    // Find workers who could do it but are in wrong zone or at capacity
    const alternatives = WORKERS.filter(w => 
      w.isActive && 
      w.skills.includes(mapServiceTypeToSkill(booking.serviceType))
    ).slice(0, 3);

    return {
      success: false,
      reason: 'No workers available for this time and location',
      alternatives
    };
  }

  // Score and rank workers
  const scoredWorkers = availableWorkers.map(worker => ({
    worker,
    score: calculateWorkerScore(worker, booking)
  }));

  // Sort by score (highest first)
  scoredWorkers.sort((a, b) => b.score - a.score);

  // Assign the best worker
  const selectedWorker = scoredWorkers[0].worker;

  // Update worker's schedule
  await updateWorkerSchedule(selectedWorker, booking);

  // Send notifications
  await notifyWorkerOfAssignment(selectedWorker, booking);

  return {
    success: true,
    worker: selectedWorker
  };
}

// Calculate worker score for assignment
function calculateWorkerScore(worker: Worker, booking: any): number {
  let score = 0;

  // Base score from rating (0-50 points)
  score += worker.rating * 10;

  // Experience bonus (0-20 points)
  score += Math.min(20, worker.completedJobs / 50);

  // Preferred job type bonus (0-15 points)
  if (worker.preferredJobTypes.includes(booking.serviceType)) {
    score += 15;
  }

  // Zone preference (0-10 points) - prioritize workers in same zone
  const zipMatch = booking.address.match(/\b\d{5}\b/);
  if (zipMatch && worker.zones[0] === zipMatch[0]) {
    score += 10;
  }

  // Workload balance (0-5 points) - prefer workers with fewer jobs that day
  const jobsOnDate = getWorkerJobCount(worker, booking.serviceDate);
  score += (worker.maxDailyJobs - jobsOnDate);

  return score;
}

// Check if worker is available
function checkWorkerAvailability(worker: Worker, date: string, time: string, duration: number): boolean {
  const daySchedule = worker.availability[date];
  if (!daySchedule) {
    // No schedule means available all day
    return true;
  }

  const requestedStart = parseTime(time);
  const requestedEnd = requestedStart + duration * 60; // Convert hours to minutes

  // Check for conflicts with existing bookings
  for (const booking of daySchedule.booked) {
    const bookingStart = parseTime(booking.start);
    const bookingEnd = parseTime(booking.end);

    // Check for overlap
    if (!(requestedEnd <= bookingStart || requestedStart >= bookingEnd)) {
      return false;
    }
  }

  return true;
}

// Parse time string to minutes since midnight
function parseTime(timeStr: string): number {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + (minutes || 0);
}

// Get number of jobs for worker on a date
function getWorkerJobCount(worker: Worker, date: string): number {
  const daySchedule = worker.availability[date];
  return daySchedule ? daySchedule.booked.length : 0;
}

// Map service type to required skill
function mapServiceTypeToSkill(serviceType: string): string {
  const skillMap: { [key: string]: string } = {
    'standard': 'standard',
    'deep': 'deep-cleaning',
    'moveInOut': 'move-in-out',
    'airbnb': 'airbnb',
    'postConstruction': 'post-construction',
    'commercial': 'commercial'
  };
  return skillMap[serviceType] || 'standard';
}

// Update worker's schedule with new booking
async function updateWorkerSchedule(worker: Worker, booking: any) {
  const date = booking.serviceDate;
  const duration = booking.duration || 3;
  
  if (!worker.availability[date]) {
    worker.availability[date] = {
      start: '08:00',
      end: '18:00',
      booked: []
    };
  }

  const endTime = calculateEndTime(booking.serviceTime, duration);
  
  worker.availability[date].booked.push({
    start: booking.serviceTime,
    end: endTime,
    bookingId: booking.bookingId || booking.id
  });

  // Sort bookings by start time
  worker.availability[date].booked.sort((a, b) => 
    parseTime(a.start) - parseTime(b.start)
  );

  // In production, save to database
  // await saveWorkerSchedule(worker);
}

// Calculate end time
function calculateEndTime(startTime: string, durationHours: number): string {
  const [hours, minutes] = startTime.split(':').map(Number);
  const totalMinutes = hours * 60 + (minutes || 0) + (durationHours * 60);
  const endHours = Math.floor(totalMinutes / 60);
  const endMinutes = totalMinutes % 60;
  return `${endHours.toString().padStart(2, '0')}:${endMinutes.toString().padStart(2, '0')}`;
}

// Notify worker of new assignment
async function notifyWorkerOfAssignment(worker: Worker, booking: any) {
  // Send SMS
  await sendWorkerAssignmentSMS(worker, booking);

  // Send Teams notification
  await sendTeamsNotification({
    title: `New Assignment for ${worker.firstName}`,
    message: `${worker.firstName} ${worker.lastName} assigned to ${booking.customerName} on ${booking.serviceDate}`,
    color: '0078d4',
    facts: [
      { name: 'Worker', value: `${worker.firstName} ${worker.lastName}` },
      { name: 'Customer', value: booking.customerName },
      { name: 'Service', value: booking.serviceType },
      { name: 'Date/Time', value: `${booking.serviceDate} at ${booking.serviceTime}` },
      { name: 'Address', value: booking.address }
    ]
  });
}

// Get worker schedule for a specific date
export function getWorkerSchedule(workerId: string, date: string) {
  const worker = WORKERS.find(w => w.id === workerId);
  if (!worker) return null;

  const daySchedule = worker.availability[date];
  if (!daySchedule || daySchedule.booked.length === 0) {
    return {
      worker,
      date,
      jobs: [],
      totalJobs: 0,
      available: true
    };
  }

  return {
    worker,
    date,
    jobs: daySchedule.booked,
    totalJobs: daySchedule.booked.length,
    available: daySchedule.booked.length < worker.maxDailyJobs
  };
}

// Get all available workers for a specific date/time
export function getAvailableWorkers(date: string, time: string, duration: number = 3): Worker[] {
  return WORKERS.filter(worker => 
    worker.isActive && 
    checkWorkerAvailability(worker, date, time, duration)
  );
}

// Reassign booking to different worker
export async function reassignBooking(bookingId: string, newWorkerId: string, reason: string) {
  const newWorker = WORKERS.find(w => w.id === newWorkerId);
  if (!newWorker) {
    return { success: false, error: 'Worker not found' };
  }

  // In production, update database and send notifications
  await sendTeamsNotification({
    title: 'Booking Reassigned',
    message: `Booking ${bookingId} reassigned to ${newWorker.firstName} ${newWorker.lastName}`,
    color: 'ffa500',
    facts: [
      { name: 'Booking ID', value: bookingId },
      { name: 'New Worker', value: `${newWorker.firstName} ${newWorker.lastName}` },
      { name: 'Reason', value: reason }
    ]
  });

  return { success: true, worker: newWorker };
}

// Worker performance metrics
export function getWorkerMetrics(workerId: string, startDate: string, endDate: string) {
  const worker = WORKERS.find(w => w.id === workerId);
  if (!worker) return null;

  // In production, calculate from database
  return {
    worker,
    period: { start: startDate, end: endDate },
    metrics: {
      totalJobs: worker.completedJobs,
      averageRating: worker.rating,
      onTimeRate: 98.5, // Placeholder
      customerSatisfaction: 4.9, // Placeholder
      revenue: worker.completedJobs * 150, // Placeholder calculation
      hoursWorked: worker.completedJobs * 3, // Placeholder
      zones: worker.zones,
      topServices: worker.preferredJobTypes
    }
  };
}