/**
 * Test Script for Microsoft Ecosystem Integration
 * Run with: npx tsx scripts/test-microsoft-ecosystem.ts
 */

import { config } from 'dotenv';
import path from 'path';
import { processBookingThroughEcosystem } from '../lib/microsoftEcosystemIntegration';
import { createCustomerFolder, uploadDocument } from '../lib/sharepointService';
import { sendTeamsNotification } from '../lib/teamsCalendarService';
import { createOrUpdateCustomer } from '../lib/dynamics365Service';

// Load environment variables
config({ path: path.resolve(process.cwd(), '.env.local') });

// Test data
const testBooking = {
  bookingId: `TEST-${Date.now()}`,
  customerName: 'Test Customer',
  customerEmail: 'test@example.com', 
  customerPhone: '512-555-0100',
  address: '123 Test Street, Austin, TX 78701',
  serviceType: 'Standard Cleaning',
  serviceDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 days from now
  serviceTime: '10:00 AM',
  squareFeet: 1500,
  bedrooms: 2,
  bathrooms: 2,
  totalPrice: 150,
  frequency: 'OneTime',
  addOns: ['Deep Clean Kitchen'],
  specialInstructions: 'Test booking - please ignore'
};

async function testMicrosoftEcosystem() {
  console.log('🧪 Testing Microsoft Ecosystem Integration\n');
  console.log('=' .repeat(50));

  // Test 1: Teams Webhook
  console.log('\n📢 Test 1: Teams Webhook Notification');
  try {
    const teamsResult = await sendTeamsNotification('TEST', {
      title: '🧪 Integration Test',
      message: 'Testing Microsoft ecosystem integration',
      details: {
        timestamp: new Date().toISOString(),
        environment: 'Development',
        source: 'test-microsoft-ecosystem.ts'
      }
    });
    console.log('✅ Teams notification sent:', teamsResult?.success ? 'SUCCESS' : 'FAILED');
  } catch (error) {
    console.error('❌ Teams webhook error:', error);
  }

  // Test 2: Dynamics 365 Customer Creation
  console.log('\n👤 Test 2: Dynamics 365 Customer Creation');
  try {
    const customerResult = await createOrUpdateCustomer({
      firstname: 'Test',
      lastname: 'Customer',
      emailaddress1: testBooking.customerEmail,
      telephone1: testBooking.customerPhone,
      address1_line1: testBooking.address,
      address1_city: 'Austin',
      address1_stateorprovince: 'TX',
      address1_postalcode: '78701',
      description: 'Test customer created via API'
    });
    console.log('✅ Customer creation:', customerResult.success ? 'SUCCESS' : 'FAILED');
    if (customerResult.success) {
      console.log('   Customer ID:', customerResult.customerId);
      console.log('   Action:', customerResult.action);
    }
  } catch (error) {
    console.error('❌ Dynamics 365 error:', error);
  }

  // Test 3: SharePoint Folder Creation
  console.log('\n📁 Test 3: SharePoint Document Management');
  try {
    const folderResult = await createCustomerFolder(
      testBooking.customerName,
      testBooking.bookingId
    );
    console.log('✅ SharePoint folder creation:', folderResult.success ? 'SUCCESS' : 'FAILED');
    if (folderResult.success) {
      console.log('   Folder path:', folderResult.folderPath);
    }

    // Test document upload
    const testDocument = Buffer.from('Test document content for integration testing');
    const uploadResult = await uploadDocument(
      'Customers',
      `Active Customers/${testBooking.customerName.replace(/[^a-zA-Z0-9]/g, '_')}_${testBooking.bookingId}`,
      'test-document.txt',
      testDocument,
      {
        description: 'Integration test document',
        testRun: true
      }
    );
    console.log('✅ Document upload:', uploadResult.success ? 'SUCCESS' : 'FAILED');
    if (uploadResult.success) {
      console.log('   File ID:', uploadResult.fileId);
      console.log('   Web URL:', uploadResult.webUrl);
    }
  } catch (error) {
    console.error('❌ SharePoint error:', error);
  }

  // Test 4: Complete Ecosystem Processing
  console.log('\n🌐 Test 4: Complete Ecosystem Processing');
  try {
    const ecosystemResult = await processBookingThroughEcosystem(testBooking);
    console.log('✅ Ecosystem processing complete:');
    console.log('   Overall:', ecosystemResult.overall ? 'SUCCESS' : 'FAILED');
    console.log('   Dynamics 365:', ecosystemResult.dynamics365.success ? '✓' : '✗');
    console.log('   SharePoint:', ecosystemResult.sharepoint.success ? '✓' : '✗');
    console.log('   Teams:', ecosystemResult.teams.success ? '✓' : '✗');
    console.log('   Email:', ecosystemResult.email.success ? '✓' : '✗');
    console.log('   Power Automate:', ecosystemResult.powerAutomate.success ? '✓' : '✗');
  } catch (error) {
    console.error('❌ Ecosystem processing error:', error);
  }

  console.log('\n' + '=' .repeat(50));
  console.log('🎉 Integration tests complete!\n');
}

// Run tests
testMicrosoftEcosystem().catch(console.error);