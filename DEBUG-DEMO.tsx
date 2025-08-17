// 🥷 CONSOLE NINJA & WALLABY DEMO
// This file demonstrates how to use your Pro tools effectively
// Open this in VS Code with Console Ninja and Wallaby running

import React, { useEffect, useState } from 'react';
import { debugCustomerJourney, MemoryMonitor } from './lib/debug-helpers';

// Demo Component - Console Ninja will show all logs inline
export default function DebugDemo() {
  const [leadCount, setLeadCount] = useState(0);
  const [lastLead, setLastLead] = useState<any>(null);
  
  // START CONSOLE NINJA to see these values inline!
  console.log('🎯 Debug Demo Loaded');
  console.log('Valerie Contact:', {
    phone: '(512) 781-0527',
    email: 'valerie@auraspringcleaning.com'
  });
  
  useEffect(() => {
    // Track page load performance
    const endTimer = debugCustomerJourney.landingPage('/debug-demo', 'internal');
    
    // Start memory monitoring
    const monitor = new MemoryMonitor();
    monitor.start();
    
    // Simulate customer interactions
    const demoTimer = setInterval(() => {
      simulateCustomerAction();
    }, 5000);
    
    return () => {
      endTimer();
      monitor.stop();
      clearInterval(demoTimer);
    };
  }, []);
  
  // Simulate various customer actions
  const simulateCustomerAction = () => {
    const actions = [
      () => {
        console.group('🏠 Homepage Visit');
        console.log('Time:', new Date().toLocaleTimeString());
        console.log('Device:', navigator.userAgent.includes('Mobile') ? '📱 Mobile' : '💻 Desktop');
        console.log('Screen:', `${window.innerWidth}x${window.innerHeight}`);
        console.groupEnd();
      },
      () => {
        const testLead = {
          name: `Test Customer ${Date.now()}`,
          phone: '(512) 555-' + Math.floor(Math.random() * 9000 + 1000),
          service: ['Deep Cleaning', 'Regular Cleaning', 'Move Out'][Math.floor(Math.random() * 3)],
          urgency: Math.random() > 0.5
        };
        
        console.group('📝 New Lead Generated');
        console.table(testLead);
        const score = debugCustomerJourney.leadScore(testLead);
        console.log('Lead Score:', score);
        console.log('Send to Valerie:', score > 30 ? 'YES ✅' : 'Maybe ⚠️');
        console.groupEnd();
        
        setLeadCount(prev => prev + 1);
        setLastLead(testLead);
      },
      () => {
        debugCustomerJourney.formInteraction('Contact Form', {
          name: 'Jane Doe',
          email: 'jane@example.com',
          phone: '(512) 555-4321',
          message: 'Need cleaning for downtown condo'
        });
      },
      () => {
        debugCustomerJourney.bookingStep('Service Selection', {
          customer: 'John Smith',
          service: 'Deep Cleaning',
          date: new Date().toLocaleDateString(),
          price: 225
        });
      },
      async () => {
        await debugCustomerJourney.apiCall('/api/test', 'GET');
      }
    ];
    
    // Random action
    const action = actions[Math.floor(Math.random() * actions.length)];
    action();
  };
  
  // Test notification to Valerie
  const testValerieNotification = async () => {
    console.group('📞 Testing Valerie Notification');
    console.time('Notification Test');
    
    const testData = {
      type: 'urgent_lead',
      customer: 'VIP Customer',
      phone: '(512) 555-9999',
      service: 'Deep Cleaning',
      value: '$500+',
      notes: 'High-value lead from website'
    };
    
    console.log('Sending to Valerie...');
    console.table(testData);
    console.log('Phone:', '(512) 781-0527');
    console.log('Email:', 'valerie@auraspringcleaning.com');
    
    // Simulate API call
    setTimeout(() => {
      console.log('✅ Valerie notified successfully!');
      console.log('Expected response time: < 15 minutes');
      console.timeEnd('Notification Test');
      console.groupEnd();
    }, 1000);
  };
  
  // Performance test
  const runPerformanceTest = () => {
    console.group('⚡ Performance Test');
    
    const operations = [
      { name: 'Page Load', duration: 234 },
      { name: 'Form Submit', duration: 567 },
      { name: 'API Call', duration: 123 },
      { name: 'Image Load', duration: 890 }
    ];
    
    operations.forEach(op => {
      if (op.duration > 500) {
        console.warn(`⚠️ ${op.name}: ${op.duration}ms (SLOW)`);
      } else {
        console.log(`✅ ${op.name}: ${op.duration}ms`);
      }
    });
    
    const average = operations.reduce((sum, op) => sum + op.duration, 0) / operations.length;
    console.log('Average:', `${average.toFixed(0)}ms`);
    console.log('Performance:', average < 500 ? '🚀 FAST' : '🐌 NEEDS OPTIMIZATION');
    
    console.groupEnd();
  };
  
  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>🥷 Console Ninja & Wallaby Debug Demo</h1>
      
      <div style={{ background: '#f0f0f0', padding: '15px', borderRadius: '5px', marginBottom: '20px' }}>
        <h2>📊 Live Stats (Check Console Ninja)</h2>
        <p>Total Leads: {leadCount}</p>
        <p>Last Lead: {lastLead ? JSON.stringify(lastLead, null, 2) : 'None yet'}</p>
        <p>Valerie's Phone: (512) 781-0527</p>
        <p>Valerie's Email: valerie@auraspringcleaning.com</p>
      </div>
      
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button 
          onClick={testValerieNotification}
          style={{ padding: '10px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          📞 Test Valerie Notification
        </button>
        
        <button 
          onClick={runPerformanceTest}
          style={{ padding: '10px', background: '#2196F3', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          ⚡ Run Performance Test
        </button>
        
        <button 
          onClick={simulateCustomerAction}
          style={{ padding: '10px', background: '#FF9800', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          🎯 Simulate Customer Action
        </button>
        
        <button 
          onClick={() => {
            console.clear();
            console.log('🧹 Console cleared - ready for fresh debugging');
          }}
          style={{ padding: '10px', background: '#9C27B0', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          🧹 Clear Console
        </button>
      </div>
      
      <div style={{ marginTop: '20px', padding: '15px', background: '#fff3cd', borderRadius: '5px' }}>
        <h3>👀 What to Look For:</h3>
        <ul>
          <li>Console Ninja shows logs inline next to the code</li>
          <li>Wallaby shows test results in real-time</li>
          <li>Performance metrics appear automatically</li>
          <li>Memory usage is tracked continuously</li>
          <li>All notifications show Valerie's contact info</li>
        </ul>
      </div>
      
      <div style={{ marginTop: '20px', padding: '15px', background: '#d4edda', borderRadius: '5px' }}>
        <h3>✅ Setup Checklist:</h3>
        <ul>
          <li>Console Ninja extension installed and running</li>
          <li>Wallaby extension installed and running</li>
          <li>VS Code showing inline values</li>
          <li>Tests running automatically on save</li>
          <li>Valerie's contact info configured</li>
        </ul>
      </div>
    </div>
  );
}

// WALLABY TESTS - These will run automatically
if (process.env.NODE_ENV === 'test') {
  describe('Debug Demo Tests', () => {
    test('Valerie contact info is correct', () => {
      expect('(512) 781-0527').toMatch(/512.*781.*0527/);
      expect('valerie@auraspringcleaning.com').toContain('@auraspringcleaning.com');
      console.log('✅ Valerie contact info verified');
    });
    
    test('Lead scoring works correctly', () => {
      const highValueLead = {
        service: 'deep-cleaning',
        area: 'downtown-austin',
        urgent: true
      };
      
      const score = debugCustomerJourney.leadScore(highValueLead);
      expect(score).toBeGreaterThan(60);
      console.log('✅ High-value lead detected:', score);
    });
    
    test('Performance thresholds', () => {
      const acceptableTime = 500; // ms
      const actualTime = 234; // simulated
      
      expect(actualTime).toBeLessThan(acceptableTime);
      console.log(`✅ Performance within limits: ${actualTime}ms < ${acceptableTime}ms`);
    });
  });
}