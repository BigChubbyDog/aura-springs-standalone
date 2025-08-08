import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Home, 
  Sparkles, 
  Package, 
  Building2, 
  Key, 
  Truck,
  CheckCircle,
  Clock,
  Shield,
  Star
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Professional Cleaning Services | Aura Spring Cleaning Austin',
  description: 'Comprehensive cleaning services in Austin TX. House cleaning, deep cleaning, move in/out, Airbnb turnovers, and commercial cleaning. Licensed, insured, eco-friendly.',
  keywords: 'cleaning services Austin, house cleaning, deep cleaning, commercial cleaning, Airbnb cleaning, move out cleaning',
};

const services = [
  {
    icon: Home,
    title: 'Regular House Cleaning',
    slug: 'house-cleaning',
    description: 'Maintain a consistently clean and healthy home with our regular cleaning service.',
    features: ['Weekly/Bi-weekly/Monthly', 'Customizable checklist', 'Same cleaner requests', 'Eco-friendly products'],
    price: 'From $89',
    popular: true,
  },
  {
    icon: Sparkles,
    title: 'Deep Cleaning',
    slug: 'deep-cleaning',
    description: 'Comprehensive top-to-bottom cleaning that reaches every corner of your home.',
    features: ['Baseboards & trim', 'Inside appliances', 'Light fixtures', 'Window sills & blinds'],
    price: 'From $149',
  },
  {
    icon: Truck,
    title: 'Move In/Out Cleaning',
    slug: 'move-in-out-cleaning',
    description: 'Ensure your deposit return or prepare your new home with our thorough moving clean.',
    features: ['Empty home cleaning', 'Inside cabinets/drawers', 'Appliance deep clean', 'Garage cleaning'],
    price: 'From $199',
  },
  {
    icon: Key,
    title: 'Airbnb Cleaning',
    slug: 'airbnb-cleaning',
    description: 'Quick turnaround cleaning for vacation rentals with 5-star standards.',
    features: ['Same-day service', 'Linen service available', 'Restocking supplies', 'Photo documentation'],
    price: 'From $79',
  },
  {
    icon: Building2,
    title: 'Commercial Cleaning',
    slug: 'commercial-cleaning',
    description: 'Professional cleaning services for offices, retail spaces, and commercial properties.',
    features: ['Flexible scheduling', 'Evening/weekend service', 'Fully insured team', 'Custom contracts'],
    price: 'Custom Quote',
  },
  {
    icon: Package,
    title: 'Post-Construction',
    slug: 'post-construction',
    description: 'Specialized cleaning to remove construction dust and debris from renovations.',
    features: ['Dust removal', 'Surface sanitization', 'Floor care', 'Window cleaning (Interior Only)'],
    price: 'From $299',
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#7c9768] to-[#4c673d] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Our Cleaning Services
            </h1>
            <p className="text-xl text-[#e1e9d9] max-w-3xl mx-auto">
              Professional, reliable, and eco-friendly cleaning solutions tailored to your needs
            </p>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-8 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center justify-center gap-2">
              <Shield className="w-5 h-5 text-[#7c9768]" />
              <span className="text-gray-400 font-medium">Licensed & Insured</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Star className="w-5 h-5 text-[#7c9768]" />
              <span className="text-gray-400 font-medium">4.9 Star Rating</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Clock className="w-5 h-5 text-[#7c9768]" />
              <span className="text-gray-400 font-medium">Same Day Service</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="w-5 h-5 text-[#7c9768]" />
              <span className="text-gray-400 font-medium">Satisfaction Guaranteed</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.slug}
                className={`relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${
                  service.popular ? 'ring-2 ring-[#7c9768]' : ''
                }`}
              >
                {service.popular && (
                  <div className="absolute top-0 right-0 bg-[#7c9768] text-white px-3 py-1 text-sm font-semibold rounded-bl-lg">
                    Most Popular
                  </div>
                )}
                
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-[#7c9768]/10 rounded-lg flex items-center justify-center">
                      <service.icon className="w-6 h-6 text-[#7c9768]" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-500">{service.title}</h3>
                  </div>
                  
                  <p className="text-gray-400 mb-4">{service.description}</p>
                  
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-[#7c9768] mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-400">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <p className="text-sm text-gray-500">Starting at</p>
                      <p className="text-2xl font-bold text-[#7c9768]">{service.price}</p>
                    </div>
                    <Link
                      href={`/services/${service.slug}`}
                      className="px-4 py-2 bg-gradient-to-r from-[#7c9768] to-[#4c673d] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#7c9768] to-[#4c673d]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready for a Cleaner Home?
          </h2>
          <p className="text-xl text-[#e1e9d9] mb-8">
            Book your first cleaning and get 20% off. Satisfaction guaranteed!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/booking"
              className="px-8 py-3 bg-white text-[#7c9768] font-semibold rounded-lg hover:shadow-xl transition-all duration-300"
            >
              Book Now - Get 20% Off
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300"
            >
              Get Custom Quote
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}