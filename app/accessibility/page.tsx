import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Eye, 
  Ear, 
  Hand, 
  Brain, 
  Keyboard,
  MousePointer,
  Smartphone,
  Monitor,
  CheckCircle,
  ArrowLeft
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Accessibility Statement | Aura Spring Cleaning',
  description: 'Our commitment to making our cleaning services accessible to everyone. WCAG AAA compliance and accessibility features.',
};

export default function AccessibilityPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-aura-primary-50/20">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-aura-primary-600 hover:text-aura-primary-700 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Accessibility Statement
        </h1>

        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Our Commitment to Accessibility
            </h2>
            <p className="text-gray-700 mb-4">
              Aura Spring Cleaning is committed to ensuring digital accessibility for people with disabilities. 
              We are continually improving the user experience for everyone and applying the relevant 
              accessibility standards.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Measures to Support Accessibility
            </h2>
            <p className="text-gray-700 mb-4">
              Aura Spring Cleaning takes the following measures to ensure accessibility:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <span>Include accessibility as part of our mission statement</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <span>Integrate accessibility into our procurement practices</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <span>Provide continual accessibility training for our staff</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <span>Assign clear accessibility goals and responsibilities</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <span>Employ formal accessibility quality assurance methods</span>
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Conformance Status
            </h2>
            <p className="text-gray-700 mb-4">
              The Web Content Accessibility Guidelines (WCAG) defines requirements for designers and 
              developers to improve accessibility for people with disabilities. It defines three levels 
              of conformance: Level A, Level AA, and Level AAA. Aura Spring Cleaning is fully conformant 
              with WCAG 2.1 level AAA.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Accessibility Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <Eye className="w-6 h-6 text-aura-primary-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Visual</h3>
                  <p className="text-gray-700 text-sm">High contrast mode, resizable text, clear navigation</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Ear className="w-6 h-6 text-aura-primary-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Auditory</h3>
                  <p className="text-gray-700 text-sm">No audio-only content, visual indicators for all alerts</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Hand className="w-6 h-6 text-aura-primary-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Motor</h3>
                  <p className="text-gray-700 text-sm">Large clickable areas, keyboard navigation, no time limits</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Brain className="w-6 h-6 text-aura-primary-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Cognitive</h3>
                  <p className="text-gray-700 text-sm">Simple language, consistent layout, clear instructions</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Keyboard className="w-6 h-6 text-aura-primary-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Keyboard Navigation</h3>
                  <p className="text-gray-700 text-sm">Full keyboard accessibility, skip links, focus indicators</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Monitor className="w-6 h-6 text-aura-primary-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Screen Reader</h3>
                  <p className="text-gray-700 text-sm">Semantic HTML, ARIA labels, alt text for images</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Technical Specifications
            </h2>
            <p className="text-gray-700 mb-4">
              Accessibility of Aura Spring Cleaning relies on the following technologies to work:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>HTML</li>
              <li>WAI-ARIA</li>
              <li>CSS</li>
              <li>JavaScript</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Assessment Approach
            </h2>
            <p className="text-gray-700 mb-4">
              Aura Spring Cleaning assessed the accessibility of this website by the following approaches:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Self-evaluation</li>
              <li>External evaluation</li>
              <li>Automated testing tools</li>
              <li>Manual testing with assistive technologies</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Feedback
            </h2>
            <p className="text-gray-700 mb-4">
              We welcome your feedback on the accessibility of Aura Spring Cleaning. Please let us know 
              if you encounter accessibility barriers:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700">
                <strong>Phone:</strong> <a href="tel:512-781-0527" className="text-aura-primary-600 hover:text-aura-primary-700">(512) 781-0527</a>
              </p>
              <p className="text-gray-700">
                <strong>Email:</strong> <a href="mailto:accessibility@aurasprings.com" className="text-aura-primary-600 hover:text-aura-primary-700">accessibility@aurasprings.com</a>
              </p>
              <p className="text-gray-700">
                <strong>Address:</strong> Austin, TX 78701
              </p>
            </div>
            <p className="text-gray-700 mt-4">
              We try to respond to accessibility feedback within 2 business days.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Date
            </h2>
            <p className="text-gray-700">
              This statement was created on December 15, 2023 and last reviewed on {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}