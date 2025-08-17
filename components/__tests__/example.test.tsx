import React from 'react';
import { render, screen } from '@testing-library/react';

// Example component for testing
const ExampleComponent = ({ title }: { title: string }) => {
  // Console Ninja will show these inline in VS Code
  console.log('Component rendered with title:', title);
  
  const data = {
    phone: '(512) 781-0527',
    email: 'valerie@auraspringcleaning.com',
    businessName: 'Aura Spring Cleaning'
  };
  
  console.log('Business data:', data);
  
  return (
    <div>
      <h1>{title}</h1>
      <p>Call Valerie at {data.phone}</p>
      <p>Email: {data.email}</p>
    </div>
  );
};

// Test suite - Wallaby will run these and show results inline
describe('ExampleComponent', () => {
  it('renders the title correctly', () => {
    // This log will appear inline with Console Ninja
    console.log('Running title test...');
    
    render(<ExampleComponent title="Test Title" />);
    const heading = screen.getByText('Test Title');
    
    expect(heading).toBeInTheDocument();
  });
  
  it('displays Valerie\'s contact information', () => {
    console.log('Testing contact info display...');
    
    render(<ExampleComponent title="Contact Us" />);
    
    // Check for Valerie's phone number
    const phoneText = screen.getByText(/512.*781.*0527/);
    expect(phoneText).toBeInTheDocument();
    
    // Check for email
    const emailText = screen.getByText(/valerie@auraspringcleaning.com/);
    expect(emailText).toBeInTheDocument();
  });
  
  it('logs business data correctly', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    
    render(<ExampleComponent title="Debug Test" />);
    
    // Verify console.log was called with business data
    expect(consoleSpy).toHaveBeenCalledWith(
      'Business data:',
      expect.objectContaining({
        phone: '(512) 781-0527',
        email: 'valerie@auraspringcleaning.com'
      })
    );
    
    consoleSpy.mockRestore();
  });
});

// Debugging example - Console Ninja will show values inline
const debugExample = () => {
  const bookingData = {
    customer: 'John Doe',
    service: 'Deep Cleaning',
    date: '2025-08-20',
    phone: '(512) 555-1234'
  };
  
  console.log('New booking:', bookingData); // Will appear inline
  console.warn('Remember to notify Valerie!'); // Will show as warning
  console.error('Test error for debugging'); // Will show as error
  
  // Performance tracking
  console.time('Processing');
  // Some operation...
  console.timeEnd('Processing'); // Shows execution time
  
  return bookingData;
};

// Run the debug example when this file is executed
if (process.env.NODE_ENV === 'test') {
  debugExample();
}