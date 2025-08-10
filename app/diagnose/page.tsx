'use client';

import { useEffect, useState } from 'react';

interface DiagnosticResult {
  test: string;
  status: 'pending' | 'success' | 'error' | 'warning';
  message: string;
  details?: any;
}

export default function DiagnosePage() {
  const [results, setResults] = useState<DiagnosticResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const addResult = (result: DiagnosticResult) => {
    setResults(prev => [...prev, result]);
  };

  const runDiagnostics = async () => {
    setIsRunning(true);
    setResults([]);

    // Test 1: Check if fbq is loaded
    addResult({
      test: 'Meta Pixel Script',
      status: typeof window !== 'undefined' && typeof (window as any).fbq !== 'undefined' ? 'success' : 'error',
      message: typeof (window as any).fbq !== 'undefined' ? 'Meta Pixel (fbq) is loaded' : 'Meta Pixel NOT loaded - may be blocked',
      details: { fbqType: typeof (window as any).fbq }
    });

    // Test 2: Check GTM
    addResult({
      test: 'Google Tag Manager',
      status: typeof (window as any).dataLayer !== 'undefined' ? 'success' : 'error',
      message: typeof (window as any).dataLayer !== 'undefined' ? 'GTM dataLayer exists' : 'GTM not found',
      details: { dataLayerLength: (window as any).dataLayer?.length || 0 }
    });

    // Test 3: Check cookies
    const cookies = document.cookie;
    const fbp = cookies.match(/_fbp=([^;]+)/);
    const fbc = cookies.match(/_fbc=([^;]+)/);
    
    addResult({
      test: 'Facebook Cookies',
      status: fbp ? 'success' : 'warning',
      message: fbp ? `FB Pixel cookie found: ${fbp[1]}` : 'No FB Pixel cookie (will be created on first event)',
      details: { fbp: fbp?.[1], fbc: fbc?.[1] }
    });

    // Test 4: Test browser event
    if (typeof (window as any).fbq !== 'undefined') {
      try {
        (window as any).fbq('track', 'PageView');
        addResult({
          test: 'Browser PageView Event',
          status: 'success',
          message: 'PageView event sent successfully',
          details: { eventName: 'PageView' }
        });
      } catch (error: any) {
        addResult({
          test: 'Browser PageView Event',
          status: 'error',
          message: `Failed to send: ${error.message}`,
          details: { error: error.message }
        });
      }
    }

    // Test 5: Test Conversion API
    try {
      const response = await fetch('/api/meta-conversion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventName: 'Test',
          eventData: { test: true, value: 100, currency: 'USD' },
          userData: { email: 'diagnostic@test.com' },
          sourceUrl: window.location.href,
          userAgent: navigator.userAgent
        })
      });

      const data = await response.json();
      
      if (data.success) {
        addResult({
          test: 'Conversion API',
          status: 'success',
          message: `API working! Events received: ${data.events_received}`,
          details: data
        });
      } else {
        addResult({
          test: 'Conversion API',
          status: 'error',
          message: data.error || 'API call failed',
          details: data.details || data
        });
      }
    } catch (error: any) {
      addResult({
        test: 'Conversion API',
        status: 'error',
        message: `Network error: ${error.message}`,
        details: { error: error.message }
      });
    }

    // Test 6: Check domain
    addResult({
      test: 'Domain Check',
      status: 'warning',
      message: `Current domain: ${window.location.hostname}`,
      details: { 
        hostname: window.location.hostname,
        note: 'Make sure this domain is whitelisted in Facebook Events Manager'
      }
    });

    // Test 7: Check for ad blockers
    const testImg = new Image();
    testImg.src = 'https://www.facebook.com/tr?id=test&ev=test&noscript=1';
    
    await new Promise(resolve => {
      testImg.onload = () => {
        addResult({
          test: 'Facebook Domain Access',
          status: 'success',
          message: 'Facebook domain is accessible',
          details: { canLoadFacebookImages: true }
        });
        resolve(true);
      };
      
      testImg.onerror = () => {
        addResult({
          test: 'Facebook Domain Access',
          status: 'warning',
          message: 'Facebook domain may be blocked by ad blocker',
          details: { canLoadFacebookImages: false }
        });
        resolve(false);
      };
      
      // Timeout after 3 seconds
      setTimeout(() => resolve(null), 3000);
    });

    setIsRunning(false);
  };

  const getStatusColor = (status: DiagnosticResult['status']) => {
    switch(status) {
      case 'success': return 'text-green-600';
      case 'error': return 'text-red-600';
      case 'warning': return 'text-yellow-600';
      default: return 'text-gray-500';
    }
  };

  const getStatusIcon = (status: DiagnosticResult['status']) => {
    switch(status) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      default: return '⏳';
    }
  };

  useEffect(() => {
    // Auto-run diagnostics on page load
    runDiagnostics();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🔍 Meta Pixel Diagnostic Tool
          </h1>
          <p className="text-gray-600 mb-6">
            Automatically checking your Meta Pixel and Conversion API setup...
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-blue-900">Configuration</p>
                <p className="text-sm text-blue-700">Pixel ID: 753683467224168</p>
                <p className="text-sm text-blue-700">Test Code: TEST63150</p>
              </div>
              <button
                onClick={runDiagnostics}
                disabled={isRunning}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {isRunning ? 'Running...' : 'Run Again'}
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {results.map((result, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 bg-gray-50"
              >
                <div className="flex items-start gap-3">
                  <span className="text-xl">{getStatusIcon(result.status)}</span>
                  <div className="flex-1">
                    <h3 className={`font-semibold ${getStatusColor(result.status)}`}>
                      {result.test}
                    </h3>
                    <p className="text-gray-700 mt-1">{result.message}</p>
                    {result.details && (
                      <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-x-auto">
                        {JSON.stringify(result.details, null, 2)}
                      </pre>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {results.length > 0 && (
            <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h3 className="font-semibold text-yellow-900 mb-2">📋 Summary</h3>
              <div className="text-sm text-yellow-800 space-y-1">
                <p>✅ Success: {results.filter(r => r.status === 'success').length}</p>
                <p>❌ Errors: {results.filter(r => r.status === 'error').length}</p>
                <p>⚠️ Warnings: {results.filter(r => r.status === 'warning').length}</p>
              </div>
              
              {results.some(r => r.test === 'Conversion API' && r.status === 'error' && r.details?.error?.code === 190) && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded">
                  <p className="font-semibold text-red-900">🚨 Action Required</p>
                  <p className="text-sm text-red-800 mt-1">
                    Your Meta Conversion API access token is invalid. You need to generate a new token in Facebook Events Manager.
                  </p>
                  <a 
                    href="/scripts/fix-meta-pixel.md" 
                    target="_blank"
                    className="inline-block mt-2 text-sm text-red-700 underline hover:text-red-900"
                  >
                    View detailed fix instructions →
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}