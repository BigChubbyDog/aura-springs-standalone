'use client';

import React, { useState, useEffect } from 'react';
import { 
  Calendar, Clock, MapPin, Phone, CheckCircle, 
  Navigation, Camera, AlertCircle, HelpCircle,
  DollarSign, Star, TrendingUp, User, LogOut,
  Play, Pause, Check, X, ChevronRight, Home
} from 'lucide-react';

interface Job {
  bookingId: string;
  customerName: string;
  address: string;
  serviceTime: string;
  serviceType: string;
  duration: number;
  phone: string;
  notes?: string;
  status: 'pending' | 'en-route' | 'arrived' | 'in-progress' | 'completed';
  payment: number;
}

const WorkerMobilePage = () => {
  const [workerId] = useState('W001'); // In production, get from auth
  const [workerName] = useState('Maria Rodriguez');
  const [currentDate] = useState(new Date().toISOString().split('T')[0]);
  const [activeJob, setActiveJob] = useState<string | null>(null);
  const [jobs, setJobs] = useState<Job[]>([
    {
      bookingId: 'ASC-001',
      customerName: 'Sarah Johnson',
      address: '123 Congress Ave, Apt 501, Austin, TX 78701',
      serviceTime: '09:00',
      serviceType: 'Deep Cleaning',
      duration: 3,
      phone: '+15125551234',
      notes: 'Gate code: 1234. Park in visitor spot B.',
      status: 'pending',
      payment: 250
    },
    {
      bookingId: 'ASC-002',
      customerName: 'Michael Chen',
      address: '456 Lamar Blvd, Austin, TX 78704',
      serviceTime: '13:00',
      serviceType: 'Standard Cleaning',
      duration: 2,
      phone: '+15125552345',
      status: 'pending',
      payment: 150
    },
    {
      bookingId: 'ASC-003',
      customerName: 'Jennifer Williams',
      address: '789 Guadalupe St, Austin, TX 78705',
      serviceTime: '16:00',
      serviceType: 'Airbnb Turnover',
      duration: 2,
      phone: '+15125553456',
      notes: 'Lockbox code: 4567',
      status: 'pending',
      payment: 120
    }
  ]);

  const [metrics] = useState({
    todayEarnings: 520,
    weekEarnings: 2340,
    todayJobs: 3,
    weekJobs: 18,
    rating: 4.9,
    onTimeRate: 98
  });

  const [showCamera, setShowCamera] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'schedule' | 'route' | 'earnings'>('schedule');

  // Update job status
  const updateJobStatus = async (bookingId: string, status: Job['status']) => {
    setJobs(jobs.map(job => 
      job.bookingId === bookingId ? { ...job, status } : job
    ));

    // Call API
    await fetch('/api/worker', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'update-status',
        workerId,
        bookingId,
        status
      })
    });

    if (status === 'en-route') {
      setActiveJob(bookingId);
    } else if (status === 'completed') {
      setActiveJob(null);
    }
  };

  // Check in at location
  const checkIn = async (bookingId: string) => {
    // Get current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        await fetch('/api/worker', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'check-in',
            workerId,
            bookingId,
            location: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
          })
        });
        
        updateJobStatus(bookingId, 'arrived');
      });
    }
  };

  // Complete job with photos
  const completeJob = async (bookingId: string, photos?: string[]) => {
    await fetch('/api/worker', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'complete',
        workerId,
        bookingId,
        photos
      })
    });
    
    updateJobStatus(bookingId, 'completed');
    setShowCamera(false);
  };

  // Request help
  const requestHelp = async (bookingId: string, issue: string) => {
    await fetch('/api/worker', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'request-help',
        workerId,
        bookingId,
        issue
      })
    });
    
    alert('Help request sent! Management will contact you shortly.');
  };

  const getStatusColor = (status: Job['status']) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'in-progress': return 'text-blue-600 bg-blue-100';
      case 'en-route': return 'text-purple-600 bg-purple-100';
      case 'arrived': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4 sticky top-0 z-10">
        <div className="flex justify-between items-center mb-3">
          <div>
            <h1 className="text-xl font-bold">Hi, {workerName.split(' ')[0]}!</h1>
            <p className="text-sm opacity-90">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
          </div>
          <button className="p-2 bg-white/20 rounded-lg">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-white/20 rounded-lg p-2">
            <div className="text-2xl font-bold">{jobs.length}</div>
            <div className="text-xs">Jobs Today</div>
          </div>
          <div className="bg-white/20 rounded-lg p-2">
            <div className="text-2xl font-bold">${metrics.todayEarnings}</div>
            <div className="text-xs">Earnings</div>
          </div>
          <div className="bg-white/20 rounded-lg p-2">
            <div className="text-2xl font-bold">{metrics.rating}★</div>
            <div className="text-xs">Rating</div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b sticky top-32 z-10">
        <div className="flex">
          {['schedule', 'route', 'earnings'].map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab as any)}
              className={`flex-1 py-3 capitalize font-medium ${
                selectedTab === tab 
                  ? 'text-green-600 border-b-2 border-green-600' 
                  : 'text-gray-500'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {selectedTab === 'schedule' && (
          <div className="space-y-4">
            {jobs.map((job) => (
              <div key={job.bookingId} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-4">
                  {/* Job Header */}
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-lg">{job.customerName}</h3>
                      <p className="text-sm text-gray-500">{job.serviceType}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                      {job.status.replace('-', ' ').toUpperCase()}
                    </span>
                  </div>

                  {/* Job Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span>{job.serviceTime} • {job.duration} hours</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                      <span className="flex-1">{job.address}</span>
                    </div>
                    {job.notes && (
                      <div className="bg-yellow-50 p-2 rounded-lg text-sm">
                        <strong>Notes:</strong> {job.notes}
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    {job.status === 'pending' && (
                      <>
                        <button
                          onClick={() => updateJobStatus(job.bookingId, 'en-route')}
                          className="flex-1 bg-green-600 text-white py-2 rounded-lg font-medium flex items-center justify-center gap-2"
                        >
                          <Navigation className="w-4 h-4" />
                          Start Route
                        </button>
                        <a
                          href={`tel:${job.phone}`}
                          className="bg-gray-100 text-gray-700 p-2 rounded-lg"
                        >
                          <Phone className="w-5 h-5" />
                        </a>
                      </>
                    )}
                    
                    {job.status === 'en-route' && (
                      <>
                        <button
                          onClick={() => checkIn(job.bookingId)}
                          className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-medium flex items-center justify-center gap-2"
                        >
                          <MapPin className="w-4 h-4" />
                          Check In
                        </button>
                        <a
                          href={`https://maps.google.com/?q=${encodeURIComponent(job.address)}`}
                          className="bg-gray-100 text-gray-700 p-2 rounded-lg"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Navigation className="w-5 h-5" />
                        </a>
                      </>
                    )}
                    
                    {job.status === 'arrived' && (
                      <button
                        onClick={() => updateJobStatus(job.bookingId, 'in-progress')}
                        className="flex-1 bg-purple-600 text-white py-2 rounded-lg font-medium flex items-center justify-center gap-2"
                      >
                        <Play className="w-4 h-4" />
                        Start Cleaning
                      </button>
                    )}
                    
                    {job.status === 'in-progress' && (
                      <>
                        <button
                          onClick={() => setShowCamera(true)}
                          className="flex-1 bg-green-600 text-white py-2 rounded-lg font-medium flex items-center justify-center gap-2"
                        >
                          <Check className="w-4 h-4" />
                          Complete
                        </button>
                        <button
                          onClick={() => requestHelp(job.bookingId, 'Need assistance')}
                          className="bg-red-100 text-red-700 p-2 rounded-lg"
                        >
                          <HelpCircle className="w-5 h-5" />
                        </button>
                      </>
                    )}
                    
                    {job.status === 'completed' && (
                      <div className="flex-1 bg-green-100 text-green-700 py-2 rounded-lg font-medium flex items-center justify-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Completed • ${job.payment}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedTab === 'route' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-4 shadow-md">
              <h3 className="font-bold mb-3">Optimized Route</h3>
              <div className="space-y-3">
                {jobs.map((job, index) => (
                  <div key={job.bookingId} className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                      job.status === 'completed' ? 'bg-green-600' : 'bg-gray-400'
                    }`}>
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{job.customerName}</p>
                      <p className="text-sm text-gray-500">{job.serviceTime} • {job.address.split(',')[0]}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                ))}
              </div>
              
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <div className="flex justify-between text-sm">
                  <span>Total Distance:</span>
                  <span className="font-medium">12.5 miles</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span>Est. Travel Time:</span>
                  <span className="font-medium">45 minutes</span>
                </div>
              </div>
            </div>

            <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2">
              <Navigation className="w-5 h-5" />
              Open in Maps
            </button>
          </div>
        )}

        {selectedTab === 'earnings' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-4 shadow-md">
              <h3 className="font-bold mb-3">Today's Earnings</h3>
              <div className="text-3xl font-bold text-green-600 mb-3">${metrics.todayEarnings}</div>
              <div className="space-y-2">
                {jobs.map((job) => (
                  <div key={job.bookingId} className="flex justify-between text-sm">
                    <span>{job.customerName}</span>
                    <span className={job.status === 'completed' ? 'text-green-600 font-medium' : 'text-gray-400'}>
                      ${job.payment}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-md">
                <div className="text-sm text-gray-500 mb-1">This Week</div>
                <div className="text-2xl font-bold">${metrics.weekEarnings}</div>
                <div className="text-xs text-green-600 mt-1">↑ 12% from last week</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-md">
                <div className="text-sm text-gray-500 mb-1">Jobs Completed</div>
                <div className="text-2xl font-bold">{metrics.weekJobs}</div>
                <div className="text-xs text-gray-500 mt-1">This week</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl p-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm opacity-90">Performance Bonus</div>
                  <div className="text-2xl font-bold">$150</div>
                  <div className="text-xs opacity-75 mt-1">Keep your rating above 4.8!</div>
                </div>
                <TrendingUp className="w-8 h-8 opacity-50" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Camera Modal */}
      {showCamera && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-4 w-full max-w-md">
            <h3 className="font-bold text-lg mb-3">Complete Job</h3>
            <p className="text-sm text-gray-600 mb-4">Take photos of the completed cleaning (optional)</p>
            
            <div className="grid grid-cols-3 gap-2 mb-4">
              <button className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                <Camera className="w-8 h-8 text-gray-400" />
              </button>
              <button className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                <Camera className="w-8 h-8 text-gray-400" />
              </button>
              <button className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                <Camera className="w-8 h-8 text-gray-400" />
              </button>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setShowCamera(false)}
                className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => completeJob(activeJob || jobs[0].bookingId)}
                className="flex-1 bg-green-600 text-white py-2 rounded-lg font-medium"
              >
                Complete Job
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
        <div className="flex">
          <button className="flex-1 py-3 flex flex-col items-center gap-1 text-green-600">
            <Calendar className="w-5 h-5" />
            <span className="text-xs">Schedule</span>
          </button>
          <button className="flex-1 py-3 flex flex-col items-center gap-1 text-gray-400">
            <MapPin className="w-5 h-5" />
            <span className="text-xs">Map</span>
          </button>
          <button className="flex-1 py-3 flex flex-col items-center gap-1 text-gray-400">
            <DollarSign className="w-5 h-5" />
            <span className="text-xs">Earnings</span>
          </button>
          <button className="flex-1 py-3 flex flex-col items-center gap-1 text-gray-400">
            <User className="w-5 h-5" />
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkerMobilePage;