// Debug helpers that work great with Console Ninja
// These will show inline values in VS Code with your Pro license

export const debugCustomerJourney = {
  // Track when customer lands on site
  landingPage: (page: string, referrer?: string) => {
    console.group('🎯 Customer Landing');
    console.log('Page:', page);
    console.log('Time:', new Date().toLocaleTimeString());
    console.log('Referrer:', referrer || 'Direct');
    console.log('Valerie will be notified at:', '(512) 781-0527');
    console.groupEnd();
    
    // Performance tracking
    console.time(`Page_Load_${page}`);
    return () => console.timeEnd(`Page_Load_${page}`);
  },

  // Track form interactions
  formInteraction: (formName: string, data: any) => {
    console.group(`📝 Form: ${formName}`);
    console.table(data);
    console.log('Will notify Valerie:', 'valerie@auraspringcleaning.com');
    console.trace('Form submission trace');
    console.groupEnd();
    
    // Validate phone format for Valerie
    if (data.phone) {
      const isValid = /^\(?512\)?[-.\s]?781[-.\s]?0527$/.test(data.phone.replace(/\D/g, ''));
      if (isValid) {
        console.warn('⚠️ This is Valerie\'s number - customer might be testing');
      }
    }
    
    return data;
  },

  // Track booking flow
  bookingStep: (step: string, details: any) => {
    console.group(`📅 Booking Step: ${step}`);
    console.log('Customer:', details.customer);
    console.log('Service:', details.service);
    console.log('Date:', details.date);
    console.log('Notification will go to Valerie');
    
    // Calculate pricing
    if (details.price) {
      console.log('💰 Price:', `$${details.price}`);
      const commission = details.price * 0.2; // Example 20% commission
      console.log('Commission:', `$${commission.toFixed(2)}`);
    }
    
    console.groupEnd();
  },

  // Track API calls
  apiCall: async (endpoint: string, method: string, data?: any) => {
    console.group(`🌐 API: ${method} ${endpoint}`);
    console.time('API_Duration');
    
    if (data) {
      console.log('Payload:', data);
    }
    
    try {
      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: data ? JSON.stringify(data) : undefined
      });
      
      const result = await response.json();
      console.log('Response:', result);
      console.log('Status:', response.status);
      
      // Check if notification was sent to Valerie
      if (result.notificationSent) {
        console.log('✅ Valerie notified at:', '(512) 781-0527');
      }
      
      console.timeEnd('API_Duration');
      console.groupEnd();
      
      return result;
    } catch (error) {
      console.error('API Error:', error);
      console.timeEnd('API_Duration');
      console.groupEnd();
      throw error;
    }
  },

  // Track lead quality
  leadScore: (lead: any) => {
    console.group('🎯 Lead Scoring');
    
    let score = 0;
    const factors: Record<string, number> = {};
    
    // Score based on service type
    if (lead.service === 'deep-cleaning') {
      score += 30;
      factors['Deep Cleaning'] = 30;
    } else if (lead.service === 'regular-cleaning') {
      score += 50;
      factors['Regular Service'] = 50;
    }
    
    // Score based on area
    if (lead.area?.includes('downtown') || lead.area?.includes('rainey')) {
      score += 20;
      factors['Premium Area'] = 20;
    }
    
    // Score based on urgency
    if (lead.urgent || lead.sameDay) {
      score += 25;
      factors['Urgent Need'] = 25;
    }
    
    console.table(factors);
    console.log('Total Score:', score);
    console.log('Quality:', score > 60 ? '🔥 HOT' : score > 30 ? '✅ WARM' : '❄️ COLD');
    console.log('Send to Valerie immediately:', score > 60);
    
    console.groupEnd();
    return score;
  },

  // Performance monitoring
  performance: {
    start: (operation: string) => {
      console.time(operation);
      performance.mark(`${operation}_start`);
      return {
        end: () => {
          console.timeEnd(operation);
          performance.mark(`${operation}_end`);
          performance.measure(operation, `${operation}_start`, `${operation}_end`);
          
          const measure = performance.getEntriesByName(operation)[0];
          console.log(`⚡ ${operation} took ${measure.duration.toFixed(2)}ms`);
          
          if (measure.duration > 3000) {
            console.warn('⚠️ Slow operation - customer might leave!');
            console.warn('Consider optimizing or showing loading state');
          }
        }
      };
    }
  },

  // Track conversion funnel
  funnel: {
    step: (stepName: string, data?: any) => {
      const timestamp = new Date().toISOString();
      const sessionId = typeof window !== 'undefined' ? window.sessionStorage.getItem('sessionId') || 'unknown' : 'server';
      
      console.group(`📊 Funnel: ${stepName}`);
      console.log('Session:', sessionId);
      console.log('Time:', timestamp);
      
      if (data) {
        console.table(data);
      }
      
      // Track drop-off points
      if (stepName === 'abandoned') {
        console.error('❌ Customer abandoned at:', data?.lastPage);
        console.warn('Send recovery email to customer');
        console.warn('Notify Valerie for follow-up: (512) 781-0527');
      }
      
      console.groupEnd();
    }
  }
};

// Memory leak detector (great with Console Ninja)
export class MemoryMonitor {
  private interval: NodeJS.Timeout | null = null;
  
  start() {
    if (typeof window === 'undefined') return;
    
    this.interval = setInterval(() => {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        console.log('💾 Memory:', {
          used: `${(memory.usedJSHeapSize / 1048576).toFixed(2)} MB`,
          total: `${(memory.totalJSHeapSize / 1048576).toFixed(2)} MB`,
          limit: `${(memory.jsHeapSizeLimit / 1048576).toFixed(2)} MB`,
          usage: `${((memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100).toFixed(1)}%`
        });
        
        if (memory.usedJSHeapSize > memory.jsHeapSizeLimit * 0.9) {
          console.error('⚠️ High memory usage - possible memory leak!');
        }
      }
    }, 5000);
  }
  
  stop() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}

// Export for use in components
export default debugCustomerJourney;