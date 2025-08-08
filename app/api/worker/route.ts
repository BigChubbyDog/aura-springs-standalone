import { NextRequest, NextResponse } from 'next/server';
import { assignWorkerToBooking, getWorkerSchedule, reassignBooking, WORKERS } from '@/lib/workerAssignment';
import { sendEnRouteSMS, sendCompletionSMS, handleIncomingSMS } from '@/lib/smsService';
import { sendTeamsNotification } from '@/lib/teamsWebhook';
import { optimizeRoute } from '@/lib/routeOptimization';

// Worker status update endpoint
export async function POST(request: NextRequest) {
  try {
    const { action, ...data } = await request.json();

    switch (action) {
      case 'assign':
        // Assign worker to booking
        const assignment = await assignWorkerToBooking(data.booking);
        return NextResponse.json(assignment);

      case 'update-status':
        // Update job status
        const statusUpdate = await updateJobStatus(data.workerId, data.bookingId, data.status, data.notes);
        return NextResponse.json(statusUpdate);

      case 'check-in':
        // Worker arrived at location
        const checkIn = await workerCheckIn(data.workerId, data.bookingId, data.location);
        return NextResponse.json(checkIn);

      case 'complete':
        // Job completed
        const completion = await completeJob(data.workerId, data.bookingId, data.photos, data.notes);
        return NextResponse.json(completion);

      case 'reassign':
        // Reassign booking to different worker
        const reassignment = await reassignBooking(data.bookingId, data.newWorkerId, data.reason);
        return NextResponse.json(reassignment);

      case 'get-route':
        // Get optimized route for worker
        const route = await getWorkerRoute(data.workerId, data.date);
        return NextResponse.json(route);

      case 'update-location':
        // Update worker's current location
        const locationUpdate = await updateWorkerLocation(data.workerId, data.location);
        return NextResponse.json(locationUpdate);

      case 'request-help':
        // Worker needs assistance
        const helpRequest = await requestHelp(data.workerId, data.bookingId, data.issue);
        return NextResponse.json(helpRequest);

      case 'report-issue':
        // Report property or service issue
        const issueReport = await reportIssue(data.workerId, data.bookingId, data.issue, data.photos);
        return NextResponse.json(issueReport);

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Worker API error:', error);
    return NextResponse.json(
      { error: 'Failed to process request', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// GET endpoint for worker data
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const workerId = searchParams.get('workerId');
  const date = searchParams.get('date') || new Date().toISOString().split('T')[0];
  const action = searchParams.get('action');

  try {
    switch (action) {
      case 'schedule':
        // Get worker's schedule
        const schedule = getWorkerSchedule(workerId!, date);
        return NextResponse.json(schedule);

      case 'workers':
        // Get all workers
        return NextResponse.json(WORKERS);

      case 'available':
        // Get available workers for a time slot
        const time = searchParams.get('time') || '09:00';
        const duration = parseInt(searchParams.get('duration') || '3');
        const availableWorkers = WORKERS.filter(w => 
          w.isActive && 
          (!workerId || w.id === workerId)
        );
        return NextResponse.json(availableWorkers);

      case 'metrics':
        // Get worker performance metrics
        const metrics = await getWorkerMetrics(workerId!);
        return NextResponse.json(metrics);

      default:
        // Return worker info
        const worker = WORKERS.find(w => w.id === workerId);
        if (!worker) {
          return NextResponse.json({ error: 'Worker not found' }, { status: 404 });
        }
        return NextResponse.json(worker);
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch worker data', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// Job status update
async function updateJobStatus(workerId: string, bookingId: string, status: string, notes?: string) {
  const validStatuses = ['assigned', 'en-route', 'arrived', 'in-progress', 'completed', 'cancelled'];
  
  if (!validStatuses.includes(status)) {
    return { success: false, error: 'Invalid status' };
  }

  // Update database (placeholder)
  const timestamp = new Date().toISOString();

  // Send notifications based on status
  if (status === 'en-route') {
    // Calculate ETA and notify customer
    const eta = calculateETA(workerId, bookingId);
    await sendEnRouteSMS({ customerPhone: '+1234567890' }, eta); // Get actual booking data
  } else if (status === 'completed') {
    // Send completion notification
    await sendCompletionSMS({ customerPhone: '+1234567890', customerName: 'Customer' });
  }

  // Notify team via Teams
  await sendTeamsNotification({
    title: `Job Status Update: ${status}`,
    message: `Worker ${workerId} updated booking ${bookingId} to ${status}`,
    color: status === 'completed' ? '00ff00' : '0078d4',
    facts: [
      { name: 'Booking ID', value: bookingId },
      { name: 'Worker ID', value: workerId },
      { name: 'Status', value: status },
      { name: 'Time', value: timestamp },
      ...(notes ? [{ name: 'Notes', value: notes }] : [])
    ]
  });

  return {
    success: true,
    bookingId,
    status,
    timestamp,
    notes
  };
}

// Worker check-in at location
async function workerCheckIn(workerId: string, bookingId: string, location: { lat: number; lng: number }) {
  const timestamp = new Date().toISOString();

  // Verify location is near booking address (in production)
  // const isNearLocation = await verifyLocation(location, bookingAddress);

  // Update status to arrived
  await updateJobStatus(workerId, bookingId, 'arrived');

  // Log check-in
  await sendTeamsNotification({
    title: '📍 Worker Checked In',
    message: `Worker ${workerId} arrived at booking ${bookingId}`,
    color: '00ff00',
    facts: [
      { name: 'Worker', value: workerId },
      { name: 'Booking', value: bookingId },
      { name: 'Location', value: `${location.lat}, ${location.lng}` },
      { name: 'Time', value: timestamp }
    ]
  });

  return {
    success: true,
    checkInTime: timestamp,
    location
  };
}

// Complete job
async function completeJob(workerId: string, bookingId: string, photos?: string[], notes?: string) {
  const timestamp = new Date().toISOString();

  // Update status
  await updateJobStatus(workerId, bookingId, 'completed', notes);

  // Send completion SMS to customer
  await sendCompletionSMS({ customerPhone: '+1234567890', customerName: 'Customer' });

  // Log completion with photos
  await sendTeamsNotification({
    title: '✅ Job Completed',
    message: `Worker ${workerId} completed booking ${bookingId}`,
    color: '00ff00',
    facts: [
      { name: 'Worker', value: workerId },
      { name: 'Booking', value: bookingId },
      { name: 'Completion Time', value: timestamp },
      { name: 'Photos', value: photos ? `${photos.length} photos uploaded` : 'No photos' },
      ...(notes ? [{ name: 'Notes', value: notes }] : [])
    ]
  });

  return {
    success: true,
    completionTime: timestamp,
    photos: photos?.length || 0,
    notes
  };
}

// Get optimized route for worker
async function getWorkerRoute(workerId: string, date: string) {
  const schedule = getWorkerSchedule(workerId, date);
  
  if (!schedule || schedule.jobs.length === 0) {
    return {
      workerId,
      date,
      jobs: [],
      optimizedRoute: [],
      totalDistance: 0,
      estimatedTime: 0
    };
  }

  // Get booking details for each job (placeholder)
  const bookings = schedule.jobs.map(job => ({
    bookingId: job.bookingId,
    address: '123 Main St, Austin, TX', // Get from database
    lat: 30.2672 + Math.random() * 0.1,
    lng: -97.7431 + Math.random() * 0.1,
    serviceTime: job.start,
    duration: 3
  }));

  // Optimize route
  const optimizedRoute = await optimizeRoute(bookings);

  return {
    workerId,
    date,
    jobs: schedule.jobs,
    optimizedRoute,
    totalDistance: optimizedRoute.totalDistance,
    estimatedTime: optimizedRoute.totalTime
  };
}

// Update worker location
async function updateWorkerLocation(workerId: string, location: { lat: number; lng: number }) {
  const worker = WORKERS.find(w => w.id === workerId);
  if (!worker) {
    return { success: false, error: 'Worker not found' };
  }

  worker.currentLocation = location;

  // In production, save to database and potentially update customer ETA
  
  return {
    success: true,
    workerId,
    location,
    timestamp: new Date().toISOString()
  };
}

// Request help from management
async function requestHelp(workerId: string, bookingId: string, issue: string) {
  // Send urgent notification to management
  await sendTeamsNotification({
    title: '🚨 HELP REQUESTED',
    message: `Worker ${workerId} needs assistance at booking ${bookingId}`,
    color: 'ff0000',
    facts: [
      { name: 'Worker', value: workerId },
      { name: 'Booking', value: bookingId },
      { name: 'Issue', value: issue },
      { name: 'Time', value: new Date().toISOString() }
    ],
    potentialAction: [
      {
        '@type': 'OpenUri',
        name: 'Call Worker',
        target: [`tel:+15125551234`] // Get actual worker phone
      }
    ]
  });

  return {
    success: true,
    ticketId: `HELP-${Date.now()}`,
    status: 'pending'
  };
}

// Report property or service issue
async function reportIssue(workerId: string, bookingId: string, issue: string, photos?: string[]) {
  const issueId = `ISSUE-${Date.now()}`;

  // Log issue
  await sendTeamsNotification({
    title: '⚠️ Issue Reported',
    message: `Worker ${workerId} reported an issue at booking ${bookingId}`,
    color: 'ffa500',
    facts: [
      { name: 'Issue ID', value: issueId },
      { name: 'Worker', value: workerId },
      { name: 'Booking', value: bookingId },
      { name: 'Description', value: issue },
      { name: 'Photos', value: photos ? `${photos.length} photos attached` : 'No photos' },
      { name: 'Time', value: new Date().toISOString() }
    ]
  });

  return {
    success: true,
    issueId,
    status: 'reported',
    followUp: 'Management will review and respond'
  };
}

// Calculate ETA
function calculateETA(workerId: string, bookingId: string): string {
  // Simple placeholder - in production, use real location and traffic data
  const now = new Date();
  now.setMinutes(now.getMinutes() + 20); // Add 20 minutes
  return now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}

// Get worker metrics
async function getWorkerMetrics(workerId: string) {
  // In production, fetch from database
  return {
    workerId,
    metrics: {
      todayJobs: 3,
      weekJobs: 15,
      monthJobs: 67,
      rating: 4.8,
      onTimeRate: 96.5,
      completionRate: 99.2,
      customerSatisfaction: 4.9,
      earnings: {
        today: 450,
        week: 2250,
        month: 9750
      }
    }
  };
}

// Handle incoming SMS from workers
export async function PUT(request: NextRequest) {
  try {
    const { From, Body } = await request.json();
    
    const result = await handleIncomingSMS(From, Body);
    
    // Process based on action type
    if (result.action === 'availability') {
      // Update worker availability
      const worker = WORKERS.find(w => w.phone === result.phone);
      if (worker) {
        // Update availability in database
        await sendTeamsNotification({
          title: 'Worker Availability Update',
          message: `${worker.firstName} responded: ${result.available ? 'AVAILABLE' : 'NOT AVAILABLE'}`,
          color: result.available ? '00ff00' : 'ff0000'
        });
      }
    } else if (result.action === 'status-update') {
      // Process status update
      const worker = WORKERS.find(w => w.phone === result.phone);
      if (worker) {
        await sendTeamsNotification({
          title: 'Status Update via SMS',
          message: `${worker.firstName} updated status: ${result.status}`,
          color: '0078d4'
        });
      }
    }
    
    return NextResponse.json({ success: true, processed: result });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process SMS', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}