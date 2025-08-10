import { Metadata } from 'next';
import { 
  Eye, 
  Ear, 
  Hand, 
  Brain, 
  Monitor, 
  Smartphone, 
  CheckCircle,
  AlertCircle,
  Globe,
  Keyboard
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Accessibility Statement - Aura Spring Cleaning',
  description: 'Our commitment to digital accessibility and WCAG AAA compliance. Making our services accessible to everyone.',
};

export default function AccessibilityStatement() {
  return (
    <main id="main-content" className="min-h-screen bg-white py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <Eye className="w-16 h-16 text-aura-primary-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Accessibility Statement</h1>
          <p className="text-xl text-gray-600">
            Our commitment to making cleaning services accessible to everyone
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <section className="mb-12 p-6 bg-aura-primary-50 rounded-xl">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Commitment</h2>
            <p className="text-gray-700 mb-4">
              Aura Spring Cleaning is committed to ensuring digital accessibility for people with disabilities. 
              We are continually improving the user experience for everyone and applying the relevant 
              accessibility standards.
            </p>
            <p className="text-gray-700">
              We strive to meet <strong>WCAG 2.1 Level AAA</strong> standards, the highest level of 
              web accessibility compliance, ensuring our services are accessible to the widest possible audience.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-green-600" />
              Accessibility Features
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <Eye className="w-5 h-5 text-aura-primary-600" />
                  <h3 className="font-semibold text-gray-900">Visual Accessibility</h3>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li>" High contrast colors (7:1 ratio minimum)</li>
                  <li>" Resizable text up to 200% without loss of functionality</li>
                  <li>" Alternative text for all images</li>
                  <li>" Clear visual focus indicators</li>
                  <li>" No reliance on color alone for information</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <Ear className="w-5 h-5 text-aura-primary-600" />
                  <h3 className="font-semibold text-gray-900">Auditory Accessibility</h3>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li>" Captions for all video content</li>
                  <li>" Visual alerts for audio notifications</li>
                  <li>" Transcripts for audio content</li>
                  <li>" No audio-only content</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <Hand className="w-5 h-5 text-aura-primary-600" />
                  <h3 className="font-semibold text-gray-900">Motor Accessibility</h3>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li>" Keyboard navigation for all features</li>
                  <li>" Large clickable areas (48x48px minimum)</li>
                  <li>" No time limits on forms</li>
                  <li>" Accessible dropdown menus</li>
                  <li>" Skip navigation links</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <Brain className="w-5 h-5 text-aura-primary-600" />
                  <h3 className="font-semibold text-gray-900">Cognitive Accessibility</h3>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li>" Clear, simple language</li>
                  <li>" Consistent navigation</li>
                  <li>" Error identification and suggestions</li>
                  <li>" Clear instructions and labels</li>
                  <li>" Predictable functionality</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Monitor className="w-6 h-6 text-aura-primary-600" />
              Technical Standards
            </h2>
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
              <p className="text-gray-700 mb-4">
                This website is designed to be compatible with:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>" <strong>Screen Readers:</strong> JAWS, NVDA, VoiceOver, TalkBack</li>
                <li>" <strong>Browsers:</strong> Chrome, Firefox, Safari, Edge (latest versions)</li>
                <li>" <strong>Operating Systems:</strong> Windows, macOS, iOS, Android</li>
                <li>" <strong>Assistive Technologies:</strong> Voice recognition, switch controls, eye tracking</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Globe className="w-6 h-6 text-aura-primary-600" />
              Language Support
            </h2>
            <p className="text-gray-700 mb-4">
              Our website is available in:
            </p>
            <ul className="space-y-2 text-gray-700 mb-4">
              <li>" <strong>English</strong> - Primary language</li>
              <li>" <strong>Spanish (Español)</strong> - Full translation available</li>
            </ul>
            <p className="text-gray-700">
              Use the language selector in the header to switch between languages. All content, 
              including forms and error messages, is translated.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Keyboard className="w-6 h-6 text-aura-primary-600" />
              Keyboard Shortcuts
            </h2>
            <div className="bg-gray-50 p-6 rounded-xl">
              <ul className="space-y-2 text-gray-700">
                <li><kbd className="px-2 py-1 bg-white rounded border">Tab</kbd> - Navigate forward through interactive elements</li>
                <li><kbd className="px-2 py-1 bg-white rounded border">Shift + Tab</kbd> - Navigate backward</li>
                <li><kbd className="px-2 py-1 bg-white rounded border">Enter</kbd> - Activate buttons and links</li>
                <li><kbd className="px-2 py-1 bg-white rounded border">Space</kbd> - Check/uncheck boxes, activate buttons</li>
                <li><kbd className="px-2 py-1 bg-white rounded border">Esc</kbd> - Close modals and dropdowns</li>
                <li><kbd className="px-2 py-1 bg-white rounded border">Arrow Keys</kbd> - Navigate within menus and form fields</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <AlertCircle className="w-6 h-6 text-yellow-600" />
              Known Limitations
            </h2>
            <p className="text-gray-700 mb-4">
              While we strive for full accessibility, some areas may have limitations:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li>" Third-party booking widget may not meet all AAA standards</li>
              <li>" Some older PDF documents may not be fully accessible</li>
              <li>" Live chat feature has limited screen reader support</li>
            </ul>
            <p className="text-gray-700 mt-4">
              We are actively working to address these limitations and improve accessibility across all features.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Feedback & Contact</h2>
            <div className="bg-green-50 p-6 rounded-xl border border-green-200">
              <p className="text-gray-700 mb-4">
                We welcome your feedback on the accessibility of our website. Please let us know if you 
                encounter accessibility barriers:
              </p>
              <div className="space-y-3">
                <p className="text-gray-700">
                  <strong>Email:</strong> accessibility@auraspringcleaning.com
                </p>
                <p className="text-gray-700">
                  <strong>Phone:</strong> (512) 781-0527 (Voice/TTY)
                </p>
                <p className="text-gray-700">
                  <strong>Mail:</strong> Aura Spring Cleaning<br />
                  Accessibility Team<br />
                  Austin, TX 78701
                </p>
              </div>
              <p className="text-gray-700 mt-4">
                We try to respond to accessibility feedback within <strong>2 business days</strong>.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Accessibility Testing</h2>
            <p className="text-gray-700 mb-4">
              Our website is regularly tested using:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li>" Automated testing tools (axe DevTools, WAVE, Lighthouse)</li>
              <li>" Manual keyboard navigation testing</li>
              <li>" Screen reader testing with NVDA and JAWS</li>
              <li>" User testing with people with disabilities</li>
              <li>" Color contrast analyzers</li>
            </ul>
            <p className="text-gray-700 mt-4">
              <strong>Last accessibility audit:</strong> January 2025<br />
              <strong>Next scheduled audit:</strong> April 2025
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Legal & Compliance</h2>
            <p className="text-gray-700 mb-4">
              We are committed to compliance with:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li>" <strong>ADA (Americans with Disabilities Act)</strong></li>
              <li>" <strong>Section 508</strong> of the Rehabilitation Act</li>
              <li>" <strong>WCAG 2.1 Level AAA</strong> Guidelines</li>
              <li>" <strong>Texas House Bill 1402</strong> (State accessibility requirements)</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Alternative Access Methods</h2>
            <p className="text-gray-700 mb-4">
              If you need assistance accessing any part of our website or services, we offer:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li>" Phone booking: (512) 781-0527</li>
              <li>" Email booking: booking@auraspringcleaning.com</li>
              <li>" In-person assistance at our Austin office</li>
              <li>" Video relay service for deaf customers</li>
              <li>" Documents in alternative formats (large print, Braille, audio)</li>
            </ul>
          </section>
        </div>

        <div className="mt-12 p-6 bg-aura-primary-50 rounded-xl text-center">
          <p className="text-gray-700 font-semibold">
            This statement was last updated on January 10, 2025
          </p>
        </div>
      </div>
    </main>
  );
}