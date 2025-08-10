'use client';

import { CheckSquare, Square, Download, Printer } from 'lucide-react';
import { useState } from 'react';

// Comprehensive room-by-room cleaning checklist
const checklistData = {
  kitchen: {
    title: 'Kitchen',
    tasks: [
      'Clear and wipe down countertops',
      'Clean stovetop and remove burner grates if applicable',
      'Wipe down backsplash',
      'Clean microwave inside and out',
      'Wipe down all appliance exteriors',
      'Clean sink and faucet, polish if needed',
      'Empty and clean inside of dishwasher filter',
      'Wipe cabinet fronts and handles',
      'Clean inside of refrigerator (monthly)',
      'Organize pantry (monthly)',
      'Sweep and mop floor',
      'Take out trash and recycling',
      'Replace dish towels',
    ],
  },
  bathroom: {
    title: 'Bathroom',
    tasks: [
      'Spray shower/tub with cleaner and let sit',
      'Clean toilet bowl, seat, and exterior',
      'Wipe down vanity and sink',
      'Clean mirror with glass cleaner',
      'Scrub shower/tub and rinse',
      'Clean shower door or curtain',
      'Wipe down light fixtures',
      'Empty trash and replace liner',
      'Fold and arrange towels',
      'Refill soap dispensers',
      'Clean floor and baseboards',
      'Organize under-sink storage (monthly)',
      'Wash bath mats (weekly)',
    ],
  },
  bedroom: {
    title: 'Bedroom',
    tasks: [
      'Make bed with fresh linens',
      'Dust all surfaces including nightstands',
      'Clean mirrors and glass surfaces',
      'Vacuum under bed',
      'Organize closet (monthly)',
      'Dust ceiling fan blades',
      'Wipe down light switches and door handles',
      'Vacuum or sweep floor',
      'Empty trash if applicable',
      'Organize dresser top',
      'Clean windows (monthly)',
      'Rotate mattress (quarterly)',
    ],
  },
  livingRoom: {
    title: 'Living Room',
    tasks: [
      'Dust all surfaces and decorative items',
      'Clean TV screen and electronics',
      'Vacuum upholstered furniture',
      'Fluff and arrange cushions',
      'Clean under couch cushions',
      'Dust ceiling fan and light fixtures',
      'Clean windows and window sills',
      'Vacuum or sweep floors',
      'Mop hard floors',
      'Organize entertainment center',
      'Dust books and bookshelves',
      'Clean remote controls',
      'Water plants if applicable',
    ],
  },
  general: {
    title: 'General Areas',
    tasks: [
      'Dust all picture frames and wall art',
      'Clean all door handles and light switches',
      'Vacuum all carpets and rugs',
      'Mop all hard floors',
      'Empty all trash cans',
      'Clean windows and mirrors throughout',
      'Dust baseboards',
      'Check and replace air filters (monthly)',
      'Clean air vents (quarterly)',
      'Organize entryway/mudroom',
      'Wipe down stair railings',
      'Vacuum stairs',
    ],
  },
  deepCleaning: {
    title: 'Deep Cleaning (Monthly/Quarterly)',
    tasks: [
      'Clean inside of oven',
      'Defrost and clean freezer',
      'Clean washing machine and dryer',
      'Shampoo carpets',
      'Clean garage or storage areas',
      'Organize and clean basement/attic',
      'Power wash exterior surfaces',
      'Clean gutters (seasonally)',
      'Detail clean all appliances',
      'Clean and organize all closets',
      'Steam clean upholstery',
      'Polish wood furniture',
    ],
  },
};

export default function CleaningChecklistPage() {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  const toggleItem = (item: string) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(item)) {
      newChecked.delete(item);
    } else {
      newChecked.add(item);
    }
    setCheckedItems(newChecked);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // In a real implementation, this would generate a PDF
    // For now, we'll trigger the browser's print-to-PDF
    window.print();
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 print:py-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 print:mb-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 print:text-2xl">
            Ultimate Room-by-Room Cleaning Checklist
          </h1>
          <p className="text-gray-600 print:text-sm">
            By Aura Spring Cleaning - Austin's Premier Cleaning Service
          </p>
          <div className="flex justify-center gap-4 mt-4 print:hidden">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <Printer className="w-5 h-5" />
              Print Checklist
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 bg-sage-600 text-white hover:bg-sage-700 rounded-lg transition-colors"
            >
              <Download className="w-5 h-5" />
              Download PDF
            </button>
          </div>
        </div>

        {/* Pro Tips */}
        <div className="bg-sage-50 rounded-lg p-6 mb-8 print:p-4 print:mb-4">
          <h2 className="text-xl font-semibold text-sage-900 mb-3">Pro Cleaning Tips:</h2>
          <ul className="space-y-2 text-sage-800 text-sm">
            <li>• Work from top to bottom - dust before vacuuming</li>
            <li>• Clean room by room to stay focused and see progress</li>
            <li>• Use microfiber cloths for streak-free surfaces</li>
            <li>• Let cleaning products sit for recommended time</li>
            <li>• Open windows for ventilation while cleaning</li>
            <li>• Play upbeat music to make cleaning more enjoyable!</li>
          </ul>
        </div>

        {/* Checklist Sections */}
        <div className="space-y-8 print:space-y-4">
          {Object.entries(checklistData).map(([key, section]) => (
            <div key={key} className="border rounded-lg p-6 print:p-4 print:break-inside-avoid">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 print:text-lg print:mb-2">
                {section.title}
              </h2>
              <div className="grid gap-2">
                {section.tasks.map((task, index) => {
                  const itemId = `${key}-${index}`;
                  const isChecked = checkedItems.has(itemId);
                  return (
                    <label
                      key={index}
                      className="flex items-start gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors print:p-1 print:hover:bg-transparent"
                    >
                      <button
                        type="button"
                        onClick={() => toggleItem(itemId)}
                        className="mt-0.5 print:hidden"
                      >
                        {isChecked ? (
                          <CheckSquare className="w-5 h-5 text-sage-600" />
                        ) : (
                          <Square className="w-5 h-5 text-gray-400" />
                        )}
                      </button>
                      <span className="hidden print:inline-block mt-0.5">
                        <Square className="w-5 h-5 text-gray-400" />
                      </span>
                      <span className={`text-gray-700 ${isChecked ? 'line-through text-gray-400' : ''} print:no-underline print:text-gray-700`}>
                        {task}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Special Offer */}
        <div className="mt-12 p-8 bg-gradient-to-r from-sage-500 to-sage-600 text-white rounded-2xl text-center print:hidden">
          <h2 className="text-2xl font-bold mb-2">
            Save 20% on Your First Professional Cleaning!
          </h2>
          <p className="mb-4">
            Let our expert team handle the deep cleaning while you enjoy your free time.
          </p>
          <p className="text-xl font-semibold mb-6">
            Use code: <span className="bg-white text-sage-600 px-3 py-1 rounded">CLEAN20</span>
          </p>
          <a
            href="/booking"
            className="inline-block bg-white text-sage-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Book Your First Cleaning
          </a>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-600 text-sm print:mt-4 print:pt-4">
          <p>© 2024 Aura Spring Cleaning - Austin, TX</p>
          <p className="mt-2">
            Call (512) 781-0527 or visit{' '}
            <a href="https://aurasprings.com" className="text-sage-600 hover:underline">
              aurasprings.com
            </a>
          </p>
        </div>
      </div>

      {/* Print styles */}
      <style jsx>{`
        @media print {
          @page {
            margin: 0.5in;
          }
          
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
        }
      `}</style>
    </div>
  );
}