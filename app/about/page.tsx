import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Users, 
  Heart, 
  Award, 
  Shield,
  Sparkles,
  Target,
  TrendingUp,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | Aura Spring Cleaning - Austin\'s Premium Cleaning Service',
  description: 'Learn about Aura Spring Cleaning, Austin\'s trusted luxury cleaning service. Family-owned, eco-friendly, and dedicated to transforming homes since 2018.',
};

const values = [
  {
    icon: Heart,
    title: 'Customer First',
    description: 'Your satisfaction is our top priority. We go above and beyond to exceed expectations.',
  },
  {
    icon: Shield,
    title: 'Trust & Safety',
    description: 'Fully licensed, insured, and background-checked team members for your peace of mind.',
  },
  {
    icon: Sparkles,
    title: 'Excellence',
    description: 'We maintain the highest standards of cleanliness and professionalism in every service.',
  },
  {
    icon: Target,
    title: 'Reliability',
    description: 'On-time, every time. We respect your schedule and deliver consistent results.',
  },
];

const milestones = [
  { year: '2018', event: 'Founded Aura Spring Cleaning in Austin' },
  { year: '2019', event: 'Expanded to serve 500+ homes' },
  { year: '2020', event: 'Launched eco-friendly cleaning program' },
  { year: '2021', event: 'Named Best Cleaning Service by Austin Chronicle' },
  { year: '2022', event: 'Opened second location in Round Rock' },
  { year: '2023', event: 'Achieved 1000+ 5-star reviews' },
  { year: '2024', event: 'Launched premium high-rise cleaning division' },
];

const team = [
  {
    name: 'Dustin Allan',
    role: 'Co-Founder & CEO',
    bio: 'With 12 years in real estate and 6 years in mortgage, Dustin brings deep understanding of homeowner needs.',
    image: '/images/team/dustin.jpg',
  },
  {
    name: 'Valerie Boatman',
    role: 'Co-Founder & COO',
    bio: 'Valerie\'s attention to detail and operational excellence ensures every clean meets our high standards.',
    image: '/images/team/valerie.jpg',
  },
  {
    name: 'Maria Rodriguez',
    role: 'Head of Quality',
    bio: '15 years of experience in hospitality and cleaning services, ensuring 5-star service every time.',
    image: '/images/team/maria.jpg',
  },
  {
    name: 'James Chen',
    role: 'Customer Success Manager',
    bio: 'Dedicated to ensuring every customer has an exceptional experience from booking to completion.',
    image: '/images/team/james.jpg',
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#7c9768] to-[#4c673d] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Creating Auras That Glow
            </h1>
            <p className="text-xl text-[#e1e9d9] max-w-3xl mx-auto">
              Family-owned, eco-friendly, and dedicated to transforming Austin homes since 2018
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Aura Spring Cleaning was born from a simple belief: everyone deserves to come home 
                  to a space that radiates positive energy and cleanliness. Founded by Dustin Allan 
                  and Valerie Boatman in 2018, we set out to revolutionize the cleaning industry in Austin.
                </p>
                <p>
                  With Dustin\'s extensive background in real estate and mortgage services, we understood 
                  the importance of maintaining beautiful homes. We saw how a clean, organized space could 
                  transform not just properties, but lives.
                </p>
                <p>
                  Today, we\'re proud to be Austin\'s premier luxury cleaning service, specializing in 
                  downtown high-rises, upscale condos, and Airbnb properties. Our team of dedicated 
                  professionals shares our passion for creating spaces that truly glow with positive energy.
                </p>
                <p>
                  As part of the BigChubbyDog Holdings family of companies, we leverage synergies with 
                  Allan Home Group and Mortgage Loans Co to provide comprehensive home services to our clients.
                </p>
              </div>
            </div>
            
            <div className="relative h-96 rounded-xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-[#7c9768] to-[#4c673d] opacity-90"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <p className="text-6xl font-bold mb-2">6+</p>
                  <p className="text-xl">Years of Excellence</p>
                  <p className="text-4xl font-bold mt-6 mb-2">10,000+</p>
                  <p className="text-xl">Homes Cleaned</p>
                  <p className="text-4xl font-bold mt-6 mb-2">4.9★</p>
                  <p className="text-xl">Average Rating</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Core Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do, from our first interaction to the final sparkle
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div key={value.title} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-[#7c9768]/10 rounded-lg flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-[#7c9768]" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Journey</h2>
            <p className="text-gray-600">Milestones that shaped who we are today</p>
          </div>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-[#7c9768]/30"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={milestone.year} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className="flex-1">
                    <div className={`bg-white rounded-lg shadow-lg p-6 ${index % 2 === 0 ? 'mr-8 text-right' : 'ml-8'}`}>
                      <p className="text-2xl font-bold text-[#7c9768] mb-2">{milestone.year}</p>
                      <p className="text-gray-600">{milestone.event}</p>
                    </div>
                  </div>
                  
                  <div className="relative flex items-center justify-center">
                    <div className="w-4 h-4 bg-[#7c9768] rounded-full"></div>
                  </div>
                  
                  <div className="flex-1"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Meet Our Leadership</h2>
            <p className="text-gray-600">The people behind Austin\'s most trusted cleaning service</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div key={member.name} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-48 bg-gradient-to-br from-[#7c9768] to-[#4c673d] flex items-center justify-center">
                  <Users className="w-20 h-20 text-white/50" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">{member.name}</h3>
                  <p className="text-[#7c9768] font-medium mb-3">{member.role}</p>
                  <p className="text-sm text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#7c9768] to-[#4c673d] rounded-2xl shadow-2xl p-12 text-white">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Why Austin Chooses Aura Spring</h2>
              <p className="text-[#e1e9d9]">We\'re not just another cleaning service</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <Award className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Award-Winning Service</h3>
                <p className="text-[#e1e9d9]">Voted Best of Austin 3 years running</p>
              </div>
              
              <div className="text-center">
                <Shield className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Fully Protected</h3>
                <p className="text-[#e1e9d9]">$2M insurance & bonded professionals</p>
              </div>
              
              <div className="text-center">
                <TrendingUp className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Growing With Austin</h3>
                <p className="text-[#e1e9d9]">Serving more neighborhoods every year</p>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <Link
                href="/booking"
                className="inline-block px-8 py-3 bg-white text-[#7c9768] font-semibold rounded-lg hover:shadow-xl transition-all duration-300"
              >
                Experience the Aura Difference
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}