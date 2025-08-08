// Route optimization service using Traveling Salesman Problem algorithms
// In production, integrate with Google Maps or Azure Maps for real distances

export interface Location {
  bookingId: string;
  address: string;
  lat: number;
  lng: number;
  serviceTime: string;
  duration: number; // hours
  priority?: 'high' | 'normal' | 'low';
}

export interface OptimizedRoute {
  route: Location[];
  totalDistance: number; // miles
  totalTime: number; // minutes including service time
  estimatedSchedule: Array<{
    bookingId: string;
    arrivalTime: string;
    departureTime: string;
  }>;
}

// Calculate distance between two points (Haversine formula)
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 3959; // Earth's radius in miles
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(deg: number): number {
  return deg * (Math.PI / 180);
}

// Create distance matrix
function createDistanceMatrix(locations: Location[]): number[][] {
  const n = locations.length;
  const matrix: number[][] = Array(n).fill(null).map(() => Array(n).fill(0));
  
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i !== j) {
        matrix[i][j] = calculateDistance(
          locations[i].lat, locations[i].lng,
          locations[j].lat, locations[j].lng
        );
      }
    }
  }
  
  return matrix;
}

// Nearest Neighbor Algorithm for TSP
function nearestNeighbor(distanceMatrix: number[][], startIndex: number = 0): number[] {
  const n = distanceMatrix.length;
  const visited = new Set<number>([startIndex]);
  const route = [startIndex];
  let current = startIndex;
  
  while (visited.size < n) {
    let nearest = -1;
    let minDistance = Infinity;
    
    for (let i = 0; i < n; i++) {
      if (!visited.has(i) && distanceMatrix[current][i] < minDistance) {
        minDistance = distanceMatrix[current][i];
        nearest = i;
      }
    }
    
    if (nearest !== -1) {
      visited.add(nearest);
      route.push(nearest);
      current = nearest;
    }
  }
  
  return route;
}

// 2-opt improvement algorithm
function twoOpt(route: number[], distanceMatrix: number[][]): number[] {
  const n = route.length;
  let improved = true;
  let bestRoute = [...route];
  
  while (improved) {
    improved = false;
    
    for (let i = 1; i < n - 2; i++) {
      for (let j = i + 1; j < n; j++) {
        // Calculate current distance
        const currentDistance = 
          distanceMatrix[bestRoute[i - 1]][bestRoute[i]] +
          distanceMatrix[bestRoute[j]][bestRoute[(j + 1) % n]];
        
        // Calculate new distance after swap
        const newDistance = 
          distanceMatrix[bestRoute[i - 1]][bestRoute[j]] +
          distanceMatrix[bestRoute[i]][bestRoute[(j + 1) % n]];
        
        // If improvement found, perform 2-opt swap
        if (newDistance < currentDistance) {
          const newRoute = [...bestRoute];
          // Reverse the route segment between i and j
          let left = i;
          let right = j;
          while (left < right) {
            [newRoute[left], newRoute[right]] = [newRoute[right], newRoute[left]];
            left++;
            right--;
          }
          bestRoute = newRoute;
          improved = true;
        }
      }
    }
  }
  
  return bestRoute;
}

// Priority-based adjustments
function adjustForPriority(locations: Location[], route: number[]): number[] {
  const highPriorityIndices = locations
    .map((loc, idx) => ({ loc, idx }))
    .filter(({ loc }) => loc.priority === 'high')
    .map(({ idx }) => idx);
  
  if (highPriorityIndices.length === 0) return route;
  
  // Move high priority jobs to the beginning
  const adjustedRoute = [...route];
  highPriorityIndices.forEach(idx => {
    const currentPos = adjustedRoute.indexOf(idx);
    if (currentPos > highPriorityIndices.length) {
      adjustedRoute.splice(currentPos, 1);
      adjustedRoute.splice(1, 0, idx); // Insert after start point
    }
  });
  
  return adjustedRoute;
}

// Time window constraints
function respectTimeWindows(locations: Location[], route: number[]): number[] {
  // Sort by service time if specified
  const timedLocations = locations
    .map((loc, idx) => ({ loc, idx, time: parseTime(loc.serviceTime) }))
    .filter(({ loc }) => loc.serviceTime !== 'flexible')
    .sort((a, b) => a.time - b.time);
  
  if (timedLocations.length === 0) return route;
  
  // Reorder route to respect time windows
  const newRoute: number[] = [];
  const unscheduled = new Set(route);
  
  // Add timed appointments first
  timedLocations.forEach(({ idx }) => {
    if (unscheduled.has(idx)) {
      newRoute.push(idx);
      unscheduled.delete(idx);
    }
  });
  
  // Add remaining flexible appointments
  unscheduled.forEach(idx => newRoute.push(idx));
  
  return newRoute;
}

// Parse time string to minutes
function parseTime(timeStr: string): number {
  if (timeStr === 'flexible') return Infinity;
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + (minutes || 0);
}

// Calculate total route distance
function calculateTotalDistance(route: number[], distanceMatrix: number[][]): number {
  let total = 0;
  for (let i = 0; i < route.length - 1; i++) {
    total += distanceMatrix[route[i]][route[i + 1]];
  }
  return total;
}

// Estimate travel time (assuming average speed of 25 mph in city)
function estimateTravelTime(distance: number): number {
  const averageSpeed = 25; // mph in city traffic
  return Math.round((distance / averageSpeed) * 60); // minutes
}

// Generate schedule with arrival times
function generateSchedule(
  locations: Location[], 
  route: number[], 
  distanceMatrix: number[][],
  startTime: string = '08:00'
): Array<{ bookingId: string; arrivalTime: string; departureTime: string }> {
  const schedule = [];
  let currentTime = parseTime(startTime);
  
  for (let i = 0; i < route.length; i++) {
    const locationIdx = route[i];
    const location = locations[locationIdx];
    
    // Add travel time from previous location
    if (i > 0) {
      const travelDistance = distanceMatrix[route[i - 1]][locationIdx];
      const travelTime = estimateTravelTime(travelDistance);
      currentTime += travelTime + 10; // Add 10 minutes buffer
    }
    
    // If location has specific time requirement, adjust
    if (location.serviceTime !== 'flexible') {
      const requiredTime = parseTime(location.serviceTime);
      if (requiredTime > currentTime) {
        currentTime = requiredTime;
      }
    }
    
    const arrivalTime = formatTime(currentTime);
    const serviceMinutes = location.duration * 60;
    const departureTime = formatTime(currentTime + serviceMinutes);
    
    schedule.push({
      bookingId: location.bookingId,
      arrivalTime,
      departureTime
    });
    
    currentTime += serviceMinutes;
  }
  
  return schedule;
}

// Format minutes to time string
function formatTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
}

// Main optimization function
export async function optimizeRoute(locations: Location[]): Promise<OptimizedRoute> {
  if (locations.length === 0) {
    return {
      route: [],
      totalDistance: 0,
      totalTime: 0,
      estimatedSchedule: []
    };
  }
  
  if (locations.length === 1) {
    return {
      route: locations,
      totalDistance: 0,
      totalTime: locations[0].duration * 60,
      estimatedSchedule: [{
        bookingId: locations[0].bookingId,
        arrivalTime: locations[0].serviceTime || '09:00',
        departureTime: formatTime(parseTime(locations[0].serviceTime || '09:00') + locations[0].duration * 60)
      }]
    };
  }
  
  // Create distance matrix
  const distanceMatrix = createDistanceMatrix(locations);
  
  // Find initial route using nearest neighbor
  let route = nearestNeighbor(distanceMatrix);
  
  // Improve with 2-opt
  route = twoOpt(route, distanceMatrix);
  
  // Adjust for priorities
  route = adjustForPriority(locations, route);
  
  // Respect time windows
  route = respectTimeWindows(locations, route);
  
  // Calculate metrics
  const totalDistance = calculateTotalDistance(route, distanceMatrix);
  const travelTime = estimateTravelTime(totalDistance);
  const serviceTime = locations.reduce((sum, loc) => sum + loc.duration * 60, 0);
  const totalTime = travelTime + serviceTime;
  
  // Generate schedule
  const estimatedSchedule = generateSchedule(locations, route, distanceMatrix);
  
  // Map back to location objects
  const optimizedLocations = route.map(idx => locations[idx]);
  
  return {
    route: optimizedLocations,
    totalDistance: Math.round(totalDistance * 10) / 10,
    totalTime: Math.round(totalTime),
    estimatedSchedule
  };
}

// Austin-specific zone optimization
export function groupByZone(locations: Location[]): Map<string, Location[]> {
  const zones = new Map<string, Location[]>();
  
  // Austin zip code zones
  const zipToZone: { [key: string]: string } = {
    '78701': 'Downtown',
    '78702': 'East Austin',
    '78703': 'Central Austin',
    '78704': 'South Austin',
    '78705': 'University',
    '78731': 'Northwest Hills',
    '78746': 'West Lake Hills',
    '78748': 'South Austin',
    '78749': 'Southwest Austin',
    '78750': 'Northwest Austin',
    '78751': 'Hyde Park',
    '78752': 'North Central',
    '78753': 'North Austin',
    '78754': 'East Austin',
    '78756': 'Central Austin',
    '78757': 'North Central',
    '78758': 'North Austin',
    '78759': 'Northwest Austin'
  };
  
  locations.forEach(location => {
    // Extract zip from address
    const zipMatch = location.address.match(/\b787\d{2}\b/);
    const zip = zipMatch ? zipMatch[0] : '78701'; // Default to downtown
    const zone = zipToZone[zip] || 'Other';
    
    if (!zones.has(zone)) {
      zones.set(zone, []);
    }
    zones.get(zone)!.push(location);
  });
  
  return zones;
}

// Optimize multiple workers' routes
export async function optimizeMultipleRoutes(
  workers: Array<{ id: string; startLocation: { lat: number; lng: number } }>,
  locations: Location[]
): Promise<Map<string, OptimizedRoute>> {
  const routes = new Map<string, OptimizedRoute>();
  
  // Group locations by zone
  const zones = groupByZone(locations);
  
  // Assign zones to workers based on proximity
  const workerAssignments = new Map<string, Location[]>();
  const zoneArray = Array.from(zones.entries());
  
  workers.forEach((worker, idx) => {
    // Simple round-robin assignment (in production, use proximity)
    const assignedLocations: Location[] = [];
    for (let i = idx; i < zoneArray.length; i += workers.length) {
      assignedLocations.push(...zoneArray[i][1]);
    }
    workerAssignments.set(worker.id, assignedLocations);
  });
  
  // Optimize each worker's route
  for (const [workerId, workerLocations] of workerAssignments) {
    const optimized = await optimizeRoute(workerLocations);
    routes.set(workerId, optimized);
  }
  
  return routes;
}

// Real-time route adjustment
export async function adjustRouteForTraffic(
  route: Location[],
  trafficData?: any
): Promise<OptimizedRoute> {
  // In production, integrate with traffic API
  // For now, return the original optimized route
  return optimizeRoute(route);
}

// Emergency rerouting
export async function emergencyReroute(
  currentLocation: { lat: number; lng: number },
  remainingLocations: Location[],
  urgentLocation: Location
): Promise<OptimizedRoute> {
  // Add urgent location with high priority
  const locationsWithUrgent = [
    { ...urgentLocation, priority: 'high' as const },
    ...remainingLocations
  ];
  
  // Re-optimize from current location
  return optimizeRoute(locationsWithUrgent);
}