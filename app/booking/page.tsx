import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book Cleaning Service | Aura Springs Austin',
  description: 'Book Austin\'s premier luxury cleaning service. Downtown high-rises, Airbnb turnovers, and residential cleaning. Get instant quote and 20% off first clean.',
};

export default function BookingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-8">
          <span className="text-[#4c673d]">Book Your</span>{' '}
          <span className="bg-gradient-to-r from-[#7c9768] to-[#4c673d] bg-clip-text text-transparent">
            Luxury Cleaning Service
          </span>
        </h1>
        
        <p className="text-center text-gray-600 mb-12">
          Experience Austin's premier cleaning service. Get location-based pricing instantly.
        </p>

        {/* Simple Booking Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form className="space-y-6">
            {/* Service Type */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Service Type
              </label>
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7c9768] focus:border-transparent">
                <option value="standard">Regular Cleaning - From $175</option>
                <option value="deep">Deep Cleaning - From $350</option>
                <option value="movein">Move In/Out - From $495</option>
                <option value="airbnb">Airbnb Turnover - From $150</option>
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Your Neighborhood
              </label>
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7c9768] focus:border-transparent">
                <option value="downtown">Downtown Austin - 78701</option>
                <option value="domain">The Domain - 78758</option>
                <option value="soco">South Congress - 78704</option>
                <option value="eastaustin">East Austin - 78702</option>
                <option value="westlake">Westlake Hills - 78746</option>
                <option value="zilker">Zilker - 78704</option>
                <option value="mueller">Mueller - 78723</option>
                <option value="other">Other Austin Area</option>
              </select>
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Preferred Date
              </label>
              <input
                type="date"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7c9768] focus:border-transparent"
              />
            </div>

            {/* Time */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Preferred Time
              </label>
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7c9768] focus:border-transparent">
                <option value="8am">8:00 AM</option>
                <option value="10am">10:00 AM</option>
                <option value="12pm">12:00 PM</option>
                <option value="2pm">2:00 PM</option>
                <option value="4pm">4:00 PM</option>
              </select>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7c9768] focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7c9768] focus:border-transparent"
                  placeholder="(512) 555-0000"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7c9768] focus:border-transparent"
                placeholder="john@example.com"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Service Address
              </label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7c9768] focus:border-transparent"
                placeholder="123 Congress Ave, Austin, TX 78701"
              />
            </div>

            {/* Special Notes */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Special Instructions (Optional)
              </label>
              <textarea
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7c9768] focus:border-transparent"
                placeholder="Gate code, pets, specific areas to focus on..."
              />
            </div>

            {/* Referral */}
            <div className="bg-purple-50 p-4 rounded-lg">
              <label className="block text-sm font-semibold text-[#443474] mb-2">
                Referred by a Realtor or Mortgage Broker?
              </label>
              <input
                type="text"
                className="w-full p-3 border border-purple-300 rounded-lg focus:ring-2 focus:ring-[#443474] focus:border-transparent"
                placeholder="Enter referral partner name for special rates"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-[#7c9768] to-[#4c673d] text-white font-bold rounded-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
            >
              Book Now & Get 20% Off First Clean
            </button>
          </form>

          {/* Trust Badges */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="flex justify-around text-center text-sm text-gray-600">
              <div>
                <div className="font-bold text-[#7c9768]">✓</div>
                <div>Licensed & Insured</div>
              </div>
              <div>
                <div className="font-bold text-[#443474]">✓</div>
                <div>Background Checked</div>
              </div>
              <div>
                <div className="font-bold text-[#4c673d]">✓</div>
                <div>Satisfaction Guaranteed</div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="font-bold text-[#7c9768] mb-2">Location-Based Pricing</h3>
            <p className="text-gray-600">
              Our smart system adjusts pricing based on your Austin neighborhood for the best value.
            </p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="font-bold text-[#443474] mb-2">Same-Day Service</h3>
            <p className="text-gray-600">
              Available for downtown high-rises and urgent cleaning needs.
            </p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="font-bold text-[#4c673d] mb-2">Eco-Friendly Options</h3>
            <p className="text-gray-600">
              Green cleaning products safe for pets, kids, and the environment.
            </p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="font-bold text-[#8d9199] mb-2">Trusted Teams</h3>
            <p className="text-gray-600">
              Background-checked professionals experienced with Austin's premier properties.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}