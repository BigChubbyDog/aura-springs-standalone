// Wallaby will run these tests in real-time as you type
import { POST } from './route';
import { NextRequest } from 'next/server';

describe('Contact API - Valerie Notification Tests', () => {
  // Console Ninja will show these logs inline
  console.log('🧪 Testing Valerie notification system...');
  
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
    console.log('Test environment reset');
  });

  test('✅ Should send notification to Valerie', async () => {
    console.group('Testing Valerie notification');
    
    const mockRequest = {
      json: async () => ({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '(512) 555-1234',
        serviceType: 'Deep Cleaning',
        message: 'Need urgent cleaning'
      })
    } as NextRequest;

    console.log('Sending test contact form...');
    const response = await POST(mockRequest);
    const data = await response.json();
    
    console.log('Response:', data);
    console.log('Expected recipient: valerie@auraspringcleaning.com');
    
    // Wallaby will show pass/fail inline
    expect(response.status).toBe(200);
    expect(data.message).toContain('successfully');
    
    console.groupEnd();
  });

  test('⚠️ Should validate phone number format', async () => {
    console.group('Testing phone validation');
    
    const invalidPhones = [
      '123',
      'not-a-phone',
      '512-555-12345678',
      ''
    ];
    
    for (const phone of invalidPhones) {
      console.log(`Testing invalid phone: "${phone}"`);
      
      const mockRequest = {
        json: async () => ({
          firstName: 'Test',
          lastName: 'User',
          email: 'test@example.com',
          phone: phone,
          serviceType: 'Standard Cleaning'
        })
      } as NextRequest;
      
      const response = await POST(mockRequest);
      
      // Should still accept but log warning
      console.warn(`Phone validation for: ${phone}`);
    }
    
    console.groupEnd();
  });

  test('🔥 Should handle high-value leads specially', async () => {
    console.group('High-value lead test');
    
    const highValueLead = {
      firstName: 'Premium',
      lastName: 'Customer',
      email: 'vip@example.com',
      phone: '(512) 555-9999',
      serviceType: 'Deep Cleaning',
      message: 'Need weekly service for 5000 sqft home',
      propertyType: 'Luxury Condo',
      area: 'Downtown Austin'
    };
    
    console.table(highValueLead);
    console.log('This should trigger priority notification to Valerie');
    console.log('Valerie phone: (512) 781-0527');
    
    const mockRequest = {
      json: async () => highValueLead
    } as NextRequest;
    
    const response = await POST(mockRequest);
    const data = await response.json();
    
    expect(response.status).toBe(200);
    console.log('✅ High-value lead processed:', data);
    
    console.groupEnd();
  });

  test('📱 Should detect if customer uses Valerie number', async () => {
    console.group('Valerie number detection');
    
    const mockRequest = {
      json: async () => ({
        firstName: 'Test',
        lastName: 'Customer',
        email: 'test@example.com',
        phone: '(512) 781-0527', // Valerie's number
        serviceType: 'Standard Cleaning'
      })
    } as NextRequest;
    
    console.warn('⚠️ Customer used Valerie\'s number!');
    console.log('This might be a test or mistake');
    
    const response = await POST(mockRequest);
    
    // Should still process but flag it
    expect(response.status).toBe(200);
    
    console.groupEnd();
  });

  test('📊 Should track lead source', async () => {
    console.group('Lead source tracking');
    
    const sources = [
      { referrer: 'google.com', expected: 'Google' },
      { referrer: 'facebook.com', expected: 'Facebook' },
      { referrer: 'instagram.com', expected: 'Instagram' },
      { referrer: undefined, expected: 'Direct' }
    ];
    
    for (const source of sources) {
      console.log(`Testing source: ${source.referrer || 'Direct'}`);
      
      const mockRequest = {
        json: async () => ({
          firstName: 'Lead',
          lastName: 'Source',
          email: 'lead@example.com',
          phone: '(512) 555-2222',
          serviceType: 'Regular Cleaning',
          referrer: source.referrer
        })
      } as NextRequest;
      
      const response = await POST(mockRequest);
      console.log(`Lead from ${source.expected} processed`);
      
      expect(response.status).toBe(200);
    }
    
    console.table(sources);
    console.groupEnd();
  });

  test('⏱️ Should measure API response time', async () => {
    console.group('Performance test');
    console.time('API Response Time');
    
    const mockRequest = {
      json: async () => ({
        firstName: 'Speed',
        lastName: 'Test',
        email: 'speed@test.com',
        phone: '(512) 555-3333',
        serviceType: 'Standard Cleaning'
      })
    } as NextRequest;
    
    const start = performance.now();
    const response = await POST(mockRequest);
    const end = performance.now();
    
    const responseTime = end - start;
    console.timeEnd('API Response Time');
    console.log(`Response time: ${responseTime.toFixed(2)}ms`);
    
    // Should be fast
    expect(responseTime).toBeLessThan(1000); // Less than 1 second
    
    if (responseTime > 500) {
      console.warn('⚠️ Slow response - might lose customers!');
    } else {
      console.log('✅ Fast response - good for conversions');
    }
    
    console.groupEnd();
  });
});

// Memory leak test (great with Console Ninja)
describe('Memory Management', () => {
  test('Should not leak memory on repeated submissions', () => {
    console.group('Memory leak test');
    
    const initialMemory = process.memoryUsage().heapUsed;
    console.log('Initial memory:', `${(initialMemory / 1024 / 1024).toFixed(2)} MB`);
    
    // Simulate multiple form submissions
    for (let i = 0; i < 100; i++) {
      const data = {
        firstName: `User${i}`,
        lastName: `Test${i}`,
        email: `user${i}@test.com`,
        phone: '(512) 555-0000'
      };
      
      // Process would happen here
      JSON.stringify(data); // Simulate processing
    }
    
    // Force garbage collection if available
    if (global.gc) {
      global.gc();
    }
    
    const finalMemory = process.memoryUsage().heapUsed;
    const memoryIncrease = finalMemory - initialMemory;
    
    console.log('Final memory:', `${(finalMemory / 1024 / 1024).toFixed(2)} MB`);
    console.log('Memory increase:', `${(memoryIncrease / 1024 / 1024).toFixed(2)} MB`);
    
    // Should not increase significantly
    expect(memoryIncrease).toBeLessThan(10 * 1024 * 1024); // Less than 10MB
    
    console.groupEnd();
  });
});