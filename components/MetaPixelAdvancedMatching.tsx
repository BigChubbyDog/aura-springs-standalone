'use client';

import { useEffect } from 'react';
import Script from 'next/script';

export default function MetaPixelAdvancedMatching() {
  useEffect(() => {
    // Enable Advanced Matching when forms are submitted
    const setupAdvancedMatching = () => {
      if (typeof window !== 'undefined' && window.fbq) {
        // Listen for form submissions
        document.addEventListener('submit', (e) => {
          const form = e.target as HTMLFormElement;
          
          // Extract user data from form
          const formData = new FormData(form);
          const userData: any = {};
          
          // Get email
          const email = formData.get('email') as string;
          if (email) {
            userData.em = email.toLowerCase().trim();
          }
          
          // Get phone
          const phone = formData.get('phone') as string;
          if (phone) {
            // Remove non-numeric characters
            userData.ph = phone.replace(/\D/g, '');
          }
          
          // Get first name
          const firstName = formData.get('firstName') || formData.get('fname') || formData.get('first_name');
          if (firstName) {
            userData.fn = (firstName as string).toLowerCase().trim();
          }
          
          // Get last name
          const lastName = formData.get('lastName') || formData.get('lname') || formData.get('last_name');
          if (lastName) {
            userData.ln = (lastName as string).toLowerCase().trim();
          }
          
          // Get zip code
          const zipCode = formData.get('zipCode') || formData.get('zip') || formData.get('postal_code');
          if (zipCode) {
            userData.zp = (zipCode as string).trim();
          }
          
          // Get city
          const city = formData.get('city');
          if (city) {
            userData.ct = (city as string).toLowerCase().trim();
          }
          
          // State (default to Texas for your business)
          userData.st = 'tx';
          
          // Country (default to US)
          userData.country = 'us';
          
          // Initialize Facebook Pixel with Advanced Matching
          if (Object.keys(userData).length > 0) {
            window.fbq('init', '753683467224168', userData);
            
            // Track form submission as lead
            window.fbq('track', 'Lead', {
              content_name: 'Form Submission',
              content_category: form.getAttribute('data-form-type') || 'Contact',
            });
          }
        });
        
        // Also capture data from input fields as they're filled
        const captureFieldData = () => {
          const userData: any = {};
          
          // Email fields
          const emailFields = document.querySelectorAll('input[type="email"], input[name*="email"]');
          emailFields.forEach((field: any) => {
            if (field.value) {
              userData.em = field.value.toLowerCase().trim();
            }
          });
          
          // Phone fields
          const phoneFields = document.querySelectorAll('input[type="tel"], input[name*="phone"]');
          phoneFields.forEach((field: any) => {
            if (field.value) {
              userData.ph = field.value.replace(/\D/g, '');
            }
          });
          
          // Name fields
          const firstNameFields = document.querySelectorAll('input[name*="first"], input[name*="fname"]');
          firstNameFields.forEach((field: any) => {
            if (field.value) {
              userData.fn = field.value.toLowerCase().trim();
            }
          });
          
          const lastNameFields = document.querySelectorAll('input[name*="last"], input[name*="lname"]');
          lastNameFields.forEach((field: any) => {
            if (field.value) {
              userData.ln = field.value.toLowerCase().trim();
            }
          });
          
          // Zip code fields
          const zipFields = document.querySelectorAll('input[name*="zip"], input[name*="postal"]');
          zipFields.forEach((field: any) => {
            if (field.value) {
              userData.zp = field.value.trim();
            }
          });
          
          // Update Facebook Pixel with user data
          if (Object.keys(userData).length > 0) {
            window.fbq('init', '753683467224168', userData);
          }
        };
        
        // Capture data when fields lose focus
        document.addEventListener('blur', (e) => {
          const target = e.target as HTMLElement;
          if (target.tagName === 'INPUT') {
            setTimeout(captureFieldData, 100);
          }
        }, true);
        
        // Initial capture
        captureFieldData();
      }
    };
    
    // Wait for Facebook Pixel to load
    if (window.fbq) {
      setupAdvancedMatching();
    } else {
      // Try again after a delay
      setTimeout(setupAdvancedMatching, 2000);
    }
  }, []);
  
  return (
    <Script
      id="fb-advanced-matching"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          // Enable Advanced Matching on page load
          fbq('init', '753683467224168', {
            em: undefined,      // email
            ph: undefined,      // phone
            fn: undefined,      // first name
            ln: undefined,      // last name
            ct: 'austin',       // city (default)
            st: 'tx',          // state (default)
            zp: undefined,      // zip
            country: 'us'       // country (default)
          });
        `,
      }}
    />
  );
}