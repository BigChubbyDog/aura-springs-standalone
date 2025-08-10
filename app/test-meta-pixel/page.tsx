'use client';

import { useState } from 'react';
import { metaPixel, trackConversion } from '@/lib/metaPixel';
import { cleaningServiceEvents } from '@/lib/metaPixelEvents';

export default function TestMetaPixelPage() {
  const [testResults, setTestResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addResult = (message: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const testPageView = () => {
    metaPixel.pageView();
    addResult('✅ PageView event sent');
  };

  const testLead = async () => {
    setIsLoading(true);
    try {
      await cleaningServiceEvents.requestQuote({
        email: 'test@example.com',
        phone: '5125551234',
        firstName: 'Test',
        lastName: 'User',
        zipCode: '78701',
        serviceType: 'Standard Cleaning',
        estimatedValue: 150,
      });
      addResult('✅ Lead event sent with Conversion API');
    } catch (error) {
      addResult('❌ Lead event failed: ' + error);
    }
    setIsLoading(false);
  };

  const testPurchase = async () => {
    setIsLoading(true);
    try {
      await cleaningServiceEvents.completeBooking({
        email: 'customer@example.com',
        phone: '5125555678',
        firstName: 'John',
        lastName: 'Doe',
        zipCode: '78701',
        serviceType: 'Deep Cleaning',
        price: 250,
        frequency: 'monthly',
        bookingId: 'TEST-BOOKING-001',
      });
      addResult('✅ Purchase event sent with Conversion API');
    } catch (error) {
      addResult('❌ Purchase event failed: ' + error);
    }
    setIsLoading(false);
  };

  const testViewContent = () => {
    cleaningServiceEvents.viewService('Tower Cleaning Service', 200);
    addResult('✅ ViewContent event sent');
  };

  const testInitiateCheckout = () => {
    cleaningServiceEvents.startBooking('Standard Cleaning', 150);
    addResult('✅ InitiateCheckout event sent');
  };

  const testSchedule = () => {
    cleaningServiceEvents.selectDateTime('2025-08-15', '10:00 AM', 'Standard Cleaning');
    addResult('✅ Schedule event sent');
  };

  const testContact = () => {
    cleaningServiceEvents.clickToCall('test-page');
    addResult('✅ Contact (Call) event sent');
  };

  const testAllEvents = async () => {
    addResult('🚀 Starting comprehensive test...');
    
    // Test browser-only events
    testPageView();
    await new Promise(resolve => setTimeout(resolve, 500));
    
    testViewContent();
    await new Promise(resolve => setTimeout(resolve, 500));
    
    testInitiateCheckout();
    await new Promise(resolve => setTimeout(resolve, 500));
    
    testSchedule();
    await new Promise(resolve => setTimeout(resolve, 500));
    
    testContact();
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Test server-side events
    await testLead();
    await new Promise(resolve => setTimeout(resolve, 500));
    
    await testPurchase();
    
    addResult('✅ All tests completed!');
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Meta Pixel & Conversion API Test Page
          </h1>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-blue-800">
              <strong>Test Event Code:</strong> TEST63150
            </p>
            <p className="text-sm text-blue-600 mt-1">
              All events sent from this page will appear in your Test Events tab in Facebook Events Manager
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            <button
              onClick={testPageView}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
            >
              Test PageView
            </button>
            
            <button
              onClick={testViewContent}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors"
            >
              Test ViewContent
            </button>
            
            <button
              onClick={testInitiateCheckout}
              className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition-colors"
            >
              Test InitiateCheckout
            </button>
            
            <button
              onClick={testSchedule}
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
            >
              Test Schedule
            </button>
            
            <button
              onClick={testContact}
              className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition-colors"
            >
              Test Contact
            </button>
            
            <button
              onClick={testLead}
              disabled={isLoading}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              Test Lead (API)
            </button>
            
            <button
              onClick={testPurchase}
              disabled={isLoading}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              Test Purchase (API)
            </button>
            
            <button
              onClick={testAllEvents}
              disabled={isLoading}
              className="col-span-2 md:col-span-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors font-semibold disabled:opacity-50"
            >
              {isLoading ? 'Testing...' : 'Run All Tests'}
            </button>
          </div>

          <div className="bg-gray-900 text-green-400 rounded-lg p-4 font-mono text-sm">
            <h2 className="text-white font-bold mb-2">Test Results:</h2>
            {testResults.length === 0 ? (
              <p className="text-gray-500">Click buttons above to test events...</p>
            ) : (
              <div className="space-y-1">
                {testResults.map((result, index) => (
                  <div key={index}>{result}</div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h3 className="font-semibold text-yellow-900 mb-2">Next Steps:</h3>
            <ol className="list-decimal list-inside text-sm text-yellow-800 space-y-1">
              <li>Click "Run All Tests" above</li>
              <li>Go to Facebook Events Manager → Test Events tab</li>
              <li>You should see all events appearing in real-time</li>
              <li>Check that Event Match Quality shows "Good" or "Great"</li>
              <li>Once verified, remove TEST63150 from .env.local to go live</li>
            </ol>
          </div>
        </div>
      </div>
    </main>
  );
}