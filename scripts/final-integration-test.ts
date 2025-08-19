/**
 * Final Comprehensive Integration Test
 * Tests all Microsoft ecosystem components are working together
 */

import 'dotenv/config';
import { processBookingInDynamics } from '../lib/dynamics365Service';
import { sendBookingEmailsViaGraph } from '../lib/graphEmailService';
import { processBookingWithRouting } from '../lib/teamsCalendarService';
import { processBookingThroughEcosystem } from '../lib/microsoftEcosystemIntegration';

// Set the correct secret in environment
process.env.AZURE_CLIENT_SECRET = 'process.env.AZURE_CLIENT_SECRET';
process.env.DYNAMICS_365_CLIENT_SECRET = 'process.env.AZURE_CLIENT_SECRET';

const testBooking = {
  customerName: 'Final Test Customer',
  customerEmail: 'finaltest@example.com',
  customerPhone: '512-555-9999',
  address: '999 Test Finale Dr, Austin, TX 78701',
  serviceType: 'Deep Cleaning',
  serviceDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 14 days from now
  serviceTime: 'Afternoon (1 PM - 4 PM)',
  bedrooms: 3,
  bathrooms: 2.5,
  squareFeet: 2000,
  totalPrice: 250,
  frequency: 'Monthly',
  specialInstructions: 'Final integration test - all systems check',
  bookingId: `FINAL-TEST-${Date.now()}`
};

async function runFinalTest() {
  console.log('🚀 FINAL COMPREHENSIVE INTEGRATION TEST');
  console.log('==========================================\n');
  
  const results = {
    dynamics365: { success: false, details: '' },
    email: { success: false, details: '' },
    calendar: { success: false, details: '' },
    teams: { success: false, details: '' },
    ecosystem: { success: false, details: '' }
  };
  
  // Test 1: Dynamics 365 CRM
  console.log('1️⃣ Testing Dynamics 365 CRM Integration...');
  try {
    const dynamicsResult = await processBookingInDynamics(testBooking);
    if (dynamicsResult.success && dynamicsResult.customer?.success) {
      results.dynamics365.success = true;
      results.dynamics365.details = `Customer: ${dynamicsResult.customer.action} (${dynamicsResult.customer.customerId})`;
      console.log('   ✅ Customer record created/updated');
      if (dynamicsResult.appointment?.success) {
        console.log('   ✅ Service appointment scheduled');
      }
      if (dynamicsResult.lead?.success) {
        console.log('   ✅ Lead generated');
      }
    } else {
      console.log('   ❌ CRM operations failed');
    }
  } catch (error: any) {
    console.log('   ❌ Error:', error.message);
  }
  
  // Test 2: Email System
  console.log('\n2️⃣ Testing Email System...');
  try {
    const emailResult = await sendBookingEmailsViaGraph(testBooking, testBooking.bookingId);
    if (emailResult.success) {
      results.email.success = true;
      results.email.details = 'Emails sent to team and customer';
      console.log('   ✅ Business notification email sent');
      console.log('   ✅ Customer confirmation email sent');
    } else {
      console.log('   ❌ Email sending failed');
    }
  } catch (error: any) {
    console.log('   ❌ Error:', error.message);
  }
  
  // Test 3: Calendar & Teams
  console.log('\n3️⃣ Testing Calendar & Teams Integration...');
  try {
    const routingResult = await processBookingWithRouting(testBooking, 'NEW_BOOKING');
    if (routingResult.calendar) {
      results.calendar.success = true;
      results.calendar.details = 'Event created in schedule@auraspringcleaning.com';
      console.log('   ✅ Calendar event created');
    } else {
      console.log('   ⚠️ Calendar event failed (may need mailbox)');
    }
    if (routingResult.teams) {
      results.teams.success = true;
      results.teams.details = 'Notification sent to Teams channel';
      console.log('   ✅ Teams notification sent');
    } else {
      console.log('   ❌ Teams notification failed');
    }
  } catch (error: any) {
    console.log('   ❌ Error:', error.message);
  }
  
  // Test 4: Complete Ecosystem
  console.log('\n4️⃣ Testing Complete Ecosystem Integration...');
  try {
    const ecosystemResult = await processBookingThroughEcosystem({
      ...testBooking,
      bookingId: `ECOSYSTEM-${Date.now()}`
    });
    
    if (ecosystemResult.overall) {
      results.ecosystem.success = true;
      results.ecosystem.details = 'All systems processed booking successfully';
      console.log('   ✅ Complete ecosystem integration working');
    } else {
      console.log('   ⚠️ Partial ecosystem success');
    }
    
    // Show individual component status
    console.log('\n   Component Status:');
    console.log(`   • Dynamics 365: ${ecosystemResult.dynamics365?.success ? '✅' : '❌'}`);
    console.log(`   • SharePoint: ${ecosystemResult.sharepoint?.success ? '✅' : '❌'}`);
    console.log(`   • Teams: ${ecosystemResult.teams?.success ? '✅' : '❌'}`);
    console.log(`   • Email: ${ecosystemResult.email?.success ? '✅' : '❌'}`);
    console.log(`   • Power Automate: ${ecosystemResult.powerAutomate?.success ? '✅' : '⏳ (URLs not configured)'}`);
    
  } catch (error: any) {
    console.log('   ❌ Error:', error.message);
  }
  
  // Final Summary
  console.log('\n==========================================');
  console.log('📊 FINAL TEST RESULTS\n');
  
  const totalSuccess = Object.values(results).filter(r => r.success).length;
  const totalTests = Object.keys(results).length;
  const successRate = (totalSuccess / totalTests * 100).toFixed(0);
  
  console.log(`Overall Success Rate: ${successRate}% (${totalSuccess}/${totalTests})\n`);
  
  for (const [component, result] of Object.entries(results)) {
    const icon = result.success ? '✅' : '❌';
    console.log(`${icon} ${component.toUpperCase()}`);
    if (result.details) {
      console.log(`   ${result.details}`);
    }
  }
  
  console.log('\n==========================================');
  console.log('🎯 SYSTEM STATUS: ');
  
  if (successRate === '100') {
    console.log('🎉 PERFECT! All systems fully operational!');
  } else if (parseInt(successRate) >= 80) {
    console.log('✅ EXCELLENT! Core systems operational');
  } else if (parseInt(successRate) >= 60) {
    console.log('⚠️ GOOD! Most systems working, some issues to address');
  } else {
    console.log('❌ NEEDS ATTENTION! Multiple systems need configuration');
  }
  
  // Recommendations
  console.log('\n💡 NEXT STEPS:');
  if (!results.dynamics365.success) {
    console.log('• Fix Dynamics 365: Check service principal permissions');
  }
  if (!results.email.success) {
    console.log('• Fix Email: Verify mailbox configuration for booking@auraspringcleaning.com');
  }
  if (!results.calendar.success) {
    console.log('• Fix Calendar: Configure mailbox for schedule@auraspringcleaning.com');
  }
  if (!results.teams.success) {
    console.log('• Fix Teams: Check webhook URL configuration');
  }
  
  console.log('\n✅ Integration test complete!');
}

// Run the test
runFinalTest().catch(console.error);