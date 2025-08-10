'use client';

import Link from 'next/link';
import { 
  Download, 
  CheckCircle, 
  Printer,
  ArrowLeft,
  Home,
  Sparkles,
  Clock,
  Star
} from 'lucide-react';

export default function CleaningChecklistPage() {
  const rooms = [
    {
      name: 'Kitchen',
      icon: '🍳',
      daily: [
        'Wipe down countertops',
        'Clean stovetop',
        'Load/unload dishwasher',
        'Sweep floor',
        'Wipe down sink',
        'Take out trash'
      ],
      weekly: [
        'Clean microwave inside and out',
        'Wipe cabinet fronts',
        'Mop floor',
        'Clean refrigerator exterior',
        'Sanitize trash can',
        'Clean small appliances'
      ],
      monthly: [
        'Clean inside refrigerator',
        'Clean oven',
        'Organize pantry',
        'Wipe down light fixtures',
        'Clean under appliances',
        'Deep clean sink and disposal'
      ]
    },
    {
      name: 'Bathrooms',
      icon: '🚿',
      daily: [
        'Wipe down sink and counter',
        'Clean toilet seat',
        'Hang towels to dry',
        'Empty wastebasket',
        'Quick mirror wipe'
      ],
      weekly: [
        'Scrub toilet thoroughly',
        'Clean shower/tub',
        'Mop floor',
        'Clean mirrors properly',
        'Wash bath mats',
        'Replace towels'
      ],
      monthly: [
        'Clean grout',
        'Wash shower curtain/liner',
        'Clean exhaust fan',
        'Organize cabinets',
        'Deep clean toilet base',
        'Clean light fixtures'
      ]
    },
    {
      name: 'Bedrooms',
      icon: '🛏️',
      daily: [
        'Make bed',
        'Put clothes away',
        'Clear nightstand',
        'Open windows for fresh air'
      ],
      weekly: [
        'Change bed sheets',
        'Dust all surfaces',
        'Vacuum floor',
        'Clean mirrors',
        'Empty trash',
        'Organize closet'
      ],
      monthly: [
        'Vacuum under bed',
        'Wash pillows',
        'Clean ceiling fan',
        'Wipe baseboards',
        'Clean light fixtures',
        'Rotate mattress (quarterly)'
      ]
    },
    {
      name: 'Living Areas',
      icon: '🛋️',
      daily: [
        'Fluff cushions',
        'Put items back in place',
        'Quick surface wipe',
        'Clear coffee table'
      ],
      weekly: [
        'Vacuum carpets/rugs',
        'Dust all surfaces',
        'Clean TV screen',
        'Vacuum under cushions',
        'Mop hard floors',
        'Dust electronics'
      ],
      monthly: [
        'Clean windows',
        'Vacuum/clean curtains',
        'Deep clean upholstery',
        'Dust ceiling fans',
        'Clean baseboards',
        'Polish wood furniture'
      ]
    }
  ];

  const proTips = [
    'Work from top to bottom - dust before vacuuming',
    'Use microfiber cloths for streak-free cleaning',
    'Clean one room at a time to stay focused',
    'Set a timer for each task to stay on track',
    'Open windows while cleaning for fresh air',
    'Keep cleaning supplies in each area for convenience',
    'Do a 10-minute pickup before bed each night',
    'Involve the whole family with age-appropriate tasks'
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-aura-primary-50/20">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-aura-primary-600 hover:text-aura-primary-700 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Ultimate Cleaning Checklist
              </h1>
              <p className="text-gray-600 mt-2">
                The same checklist our professional cleaners use
              </p>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => window.print()}
                className="flex items-center gap-2 bg-white border-2 border-aura-primary-600 text-aura-primary-600 px-6 py-3 rounded-lg hover:bg-aura-primary-50 transition-colors font-semibold"
              >
                <Printer className="w-5 h-5" />
                Print Checklist
              </button>
              <button
                onClick={() => {
                  // Create downloadable version
                  const element = document.createElement('a');
                  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(document.getElementById('checklist-content')?.innerText || ''));
                  element.setAttribute('download', 'aura-spring-cleaning-checklist.txt');
                  element.style.display = 'none';
                  document.body.appendChild(element);
                  element.click();
                  document.body.removeChild(element);
                }}
                className="flex items-center gap-2 bg-aura-primary-600 text-white px-6 py-3 rounded-lg hover:bg-aura-primary-700 transition-colors font-semibold"
              >
                <Download className="w-5 h-5" />
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Promo Banner */}
      <div className="bg-gradient-to-r from-aura-primary-600 to-aura-primary-700 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-lg font-semibold">
            🎉 Special Offer: Get 20% off your first professional cleaning!
          </p>
          <p className="text-sm mt-1">
            Use code: CHECKLIST20 when booking online or mention this checklist when calling
          </p>
        </div>
      </div>

      {/* Checklist Content */}
      <div id="checklist-content" className="max-w-7xl mx-auto px-4 py-12">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg p-6 shadow-md text-center">
            <Home className="w-8 h-8 text-aura-primary-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">4</div>
            <div className="text-gray-600">Main Areas</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md text-center">
            <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">60+</div>
            <div className="text-gray-600">Tasks Total</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md text-center">
            <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">2-3</div>
            <div className="text-gray-600">Hours Weekly</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md text-center">
            <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">Pro</div>
            <div className="text-gray-600">Grade Tips</div>
          </div>
        </div>

        {/* Room Checklists */}
        <div className="space-y-8 mb-12">
          {rooms.map((room, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-8 print:break-inside-avoid">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl">{room.icon}</span>
                <h2 className="text-2xl font-bold text-gray-900">{room.name}</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Daily Tasks */}
                <div>
                  <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm">Daily</span>
                  </h3>
                  <ul className="space-y-2">
                    {room.daily.map((task, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <input 
                          type="checkbox" 
                          className="mt-1 rounded border-gray-300 text-aura-primary-600 focus:ring-aura-primary-500"
                          id={`${room.name}-daily-${idx}`}
                        />
                        <label 
                          htmlFor={`${room.name}-daily-${idx}`}
                          className="text-gray-600 cursor-pointer"
                        >
                          {task}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Weekly Tasks */}
                <div>
                  <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm">Weekly</span>
                  </h3>
                  <ul className="space-y-2">
                    {room.weekly.map((task, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <input 
                          type="checkbox" 
                          className="mt-1 rounded border-gray-300 text-aura-primary-600 focus:ring-aura-primary-500"
                          id={`${room.name}-weekly-${idx}`}
                        />
                        <label 
                          htmlFor={`${room.name}-weekly-${idx}`}
                          className="text-gray-600 cursor-pointer"
                        >
                          {task}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Monthly Tasks */}
                <div>
                  <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-sm">Monthly</span>
                  </h3>
                  <ul className="space-y-2">
                    {room.monthly.map((task, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <input 
                          type="checkbox" 
                          className="mt-1 rounded border-gray-300 text-aura-primary-600 focus:ring-aura-primary-500"
                          id={`${room.name}-monthly-${idx}`}
                        />
                        <label 
                          htmlFor={`${room.name}-monthly-${idx}`}
                          className="text-gray-600 cursor-pointer"
                        >
                          {task}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pro Tips */}
        <div className="bg-gradient-to-r from-aura-primary-50 to-aura-primary-100 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-aura-primary-600" />
            Professional Cleaning Tips
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {proTips.map((tip, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700">{tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Need Professional Help?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Let our expert cleaners handle your home while you enjoy your free time. 
            We use this same checklist to ensure nothing is missed!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/booking"
              className="bg-aura-primary-600 text-white px-8 py-3 rounded-lg hover:bg-aura-primary-700 transition-colors font-semibold"
            >
              Book Professional Cleaning
            </Link>
            <a
              href="tel:512-781-0527"
              className="bg-white border-2 border-aura-primary-600 text-aura-primary-600 px-8 py-3 rounded-lg hover:bg-aura-primary-50 transition-colors font-semibold"
            >
              Call (512) 781-0527
            </a>
          </div>
          <p className="mt-4 text-sm text-gray-500">
            Remember: Use code CHECKLIST20 for 20% off your first cleaning!
          </p>
        </div>
      </div>

    </main>
  );
}