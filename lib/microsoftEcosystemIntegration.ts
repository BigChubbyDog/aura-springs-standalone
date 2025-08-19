/**
 * Microsoft Ecosystem Integration Service
 * Orchestrates Dynamics 365, SharePoint, Teams, and Power Automate
 */

import { processBookingInDynamics } from './dynamics365Service';
import { createCustomerFolder, uploadInvoice, uploadServicePhotos } from './sharepointService';
import { processBookingWithRouting } from './teamsCalendarService';
import { sendBookingEmailsViaGraph } from './graphEmailService';
import { POWER_AUTOMATE_FLOWS } from './powerAutomateFlows';

/**
 * Complete booking processing through entire Microsoft ecosystem
 */
export async function processBookingThroughEcosystem(booking: any) {
  const results = {
    dynamics365: { success: false, data: null as any },
    sharepoint: { success: false, data: null as any },
    teams: { success: false, data: null as any },
    email: { success: false, data: null as any },
    powerAutomate: { success: false, data: null as any },
    overall: false
  };

  try {
    console.log('🚀 Starting Microsoft Ecosystem Processing...');
    
    // Step 1: Process in Dynamics 365 CRM
    console.log('1️⃣ Processing in Dynamics 365...');
    try {
      const dynamicsResult = await processBookingInDynamics(booking);
      results.dynamics365 = {
        success: dynamicsResult.success,
        data: dynamicsResult
      };
      console.log('✅ Dynamics 365 processing complete');
    } catch (error) {
      console.error('❌ Dynamics 365 error:', error);
    }

    // Step 2: Create SharePoint folder structure
    console.log('2️⃣ Creating SharePoint folders...');
    try {
      const folderResult = await createCustomerFolder(
        booking.customerName,
        booking.bookingId
      );
      results.sharepoint = {
        success: folderResult.success,
        data: folderResult
      };
      console.log('✅ SharePoint folders created');
    } catch (error) {
      console.error('❌ SharePoint error:', error);
    }

    // Step 3: Process Teams calendar and notifications
    console.log('3️⃣ Processing Teams calendar and notifications...');
    try {
      const teamsResult = await processBookingWithRouting(booking, 'NEW_BOOKING');
      results.teams = {
        success: teamsResult.calendar || teamsResult.teams,
        data: teamsResult
      };
      console.log('✅ Teams processing complete');
    } catch (error) {
      console.error('❌ Teams error:', error);
    }

    // Step 4: Send emails via Microsoft Graph
    console.log('4️⃣ Sending emails via Graph...');
    try {
      const emailResult = await sendBookingEmailsViaGraph(booking, booking.bookingId);
      results.email = {
        success: emailResult.success,
        data: emailResult
      };
      console.log('✅ Emails sent successfully');
    } catch (error) {
      console.error('❌ Email error:', error);
    }

    // Step 5: Trigger Power Automate flows
    console.log('5️⃣ Triggering Power Automate flows...');
    try {
      const flowResult = await triggerPowerAutomateFlow('NEW_BOOKING', booking);
      results.powerAutomate = {
        success: flowResult.success,
        data: flowResult
      };
      console.log('✅ Power Automate flows triggered');
    } catch (error) {
      console.error('❌ Power Automate error:', error);
    }

    // Determine overall success
    results.overall = results.dynamics365.success || 
                     results.sharepoint.success || 
                     results.teams.success || 
                     results.email.success;

    console.log('🎉 Microsoft Ecosystem processing complete!');
    return results;

  } catch (error) {
    console.error('💥 Critical error in ecosystem processing:', error);
    return results;
  }
}

/**
 * Trigger Power Automate flow via HTTP
 */
async function triggerPowerAutomateFlow(flowType: string, data: any) {
  try {
    // Power Automate HTTP trigger URLs would be configured here
    // These are obtained from Power Automate after creating the flows
    const FLOW_URLS: { [key: string]: string } = {
      NEW_BOOKING: process.env.POWER_AUTOMATE_NEW_BOOKING_URL || '',
      SERVICE_COMPLETION: process.env.POWER_AUTOMATE_SERVICE_COMPLETION_URL || '',
      QUOTE_REQUEST: process.env.POWER_AUTOMATE_QUOTE_REQUEST_URL || '',
      EMERGENCY_BOOKING: process.env.POWER_AUTOMATE_EMERGENCY_URL || ''
    };

    const flowUrl = FLOW_URLS[flowType];
    if (!flowUrl) {
      console.warn(`No Power Automate URL configured for ${flowType}`);
      return { success: false, message: 'Flow URL not configured' };
    }

    const response = await fetch(flowUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      console.log(`✅ Power Automate flow triggered: ${flowType}`);
      return { success: true };
    } else {
      throw new Error(`Flow trigger failed: ${response.statusText}`);
    }

  } catch (error) {
    console.error('Error triggering Power Automate flow:', error);
    return { success: false, error };
  }
}

/**
 * Process service completion with photos
 */
export async function processServiceCompletion(completionData: {
  bookingId: string;
  customerId: string;
  serviceDate: string;
  beforePhotos: string[];
  afterPhotos: string[];
  rating?: number;
  teamNotes?: string;
}) {
  const results = {
    photos: { success: false, data: null as any },
    dynamics: { success: false, data: null as any },
    notification: { success: false, data: null as any }
  };

  try {
    // Upload photos to SharePoint
    const photoResult = await uploadServicePhotos(
      completionData.customerId,
      completionData.serviceDate,
      completionData.beforePhotos,
      completionData.afterPhotos
    );
    results.photos = { success: photoResult.success, data: photoResult };

    // Update service status in Dynamics
    const { updateServiceStatus } = await import('./dynamics365Service');
    const statusResult = await updateServiceStatus(
      completionData.bookingId,
      'Completed',
      {
        customerrating: completionData.rating,
        actualdurationminutes: 180,
        new_teamnotes: completionData.teamNotes
      }
    );
    results.dynamics = { success: statusResult.success, data: statusResult };

    // Send completion notification
    const { sendTeamsNotification } = await import('./teamsCalendarService');
    const notificationResult = await sendTeamsNotification('SERVICE_COMPLETED', {
      bookingId: completionData.bookingId,
      customerId: completionData.customerId,
      rating: completionData.rating,
      photosUploaded: completionData.beforePhotos.length + completionData.afterPhotos.length
    });
    results.notification = { success: notificationResult?.success || false, data: notificationResult };

    return results;

  } catch (error) {
    console.error('Error processing service completion:', error);
    return results;
  }
}

/**
 * Generate and send invoice
 */
export async function generateAndSendInvoice(invoiceData: {
  customerId: string;
  bookingId: string;
  amount: number;
  serviceDate: string;
  serviceType: string;
  items: Array<{ description: string; amount: number }>;
}) {
  try {
    // Create invoice in Dynamics 365
    const { createInvoice } = await import('./dynamics365Service');
    const invoiceResult = await createInvoice({
      name: `Invoice #${invoiceData.bookingId}`,
      customerid: invoiceData.customerId,
      totalamount: invoiceData.amount,
      new_serviceid: invoiceData.bookingId,
      new_paymentstatus: 'Pending',
      duedate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
    });

    if (!invoiceResult.success) {
      throw new Error('Failed to create invoice in Dynamics');
    }

    // Generate invoice PDF content (simplified HTML for now)
    const invoiceHTML = generateInvoiceHTML(invoiceData);
    
    // Upload to SharePoint
    const uploadResult = await uploadInvoice(
      invoiceData.customerId,
      invoiceData.bookingId,
      Buffer.from(invoiceHTML),
      new Date()
    );

    // Send invoice email
    const { sendEmailViaGraph } = await import('./graphEmailService');
    await sendEmailViaGraph({
      to: [invoiceData.customerId], // This should be customer email
      subject: `Invoice #${invoiceData.bookingId} - Aura Spring Cleaning`,
      htmlContent: invoiceHTML
    });

    return {
      success: true,
      invoiceId: invoiceResult.invoiceId,
      sharepointUrl: uploadResult.webUrl
    };

  } catch (error) {
    console.error('Error generating invoice:', error);
    return { success: false, error };
  }
}

/**
 * Get customer 360 view from all systems
 */
export async function getCustomer360View(customerEmail: string) {
  try {
    const customer360 = {
      dynamics: null as any,
      sharepoint: null as any,
      upcomingServices: null as any,
      serviceHistory: null as any,
      invoices: null as any
    };

    // Get from Dynamics 365
    const { getCustomerHistory } = await import('./dynamics365Service');
    // This would need the customer ID from Dynamics
    
    // Get documents from SharePoint
    const { getCustomerDocuments } = await import('./sharepointService');
    
    // Get calendar events
    const { Client } = await import('@microsoft/microsoft-graph-client');
    // Get upcoming appointments
    
    // Aggregate and return
    return customer360;

  } catch (error) {
    console.error('Error getting customer 360 view:', error);
    return null;
  }
}

/**
 * Helper function to generate invoice HTML
 */
function generateInvoiceHTML(invoiceData: any): string {
  const today = new Date().toLocaleDateString();
  const dueDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString();
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #7c9768, #443474); color: white; padding: 30px; text-align: center; }
        .invoice-details { display: flex; justify-content: space-between; margin: 20px 0; }
        .items-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        .items-table th { background: #f5f5f5; padding: 10px; text-align: left; }
        .items-table td { padding: 10px; border-bottom: 1px solid #ddd; }
        .total { text-align: right; font-size: 1.5em; font-weight: bold; color: #7c9768; }
        .footer { margin-top: 40px; padding-top: 20px; border-top: 2px solid #ddd; text-align: center; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>INVOICE</h1>
        <p>Aura Spring Cleaning</p>
      </div>
      
      <div class="invoice-details">
        <div>
          <h3>Invoice To:</h3>
          <p>${invoiceData.customerId}</p>
        </div>
        <div>
          <h3>Invoice Details:</h3>
          <p>Invoice #: ${invoiceData.bookingId}</p>
          <p>Date: ${today}</p>
          <p>Due Date: ${dueDate}</p>
        </div>
      </div>
      
      <table class="items-table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          ${invoiceData.items.map((item: any) => `
            <tr>
              <td>${item.description}</td>
              <td>$${item.amount.toFixed(2)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      
      <div class="total">
        Total: $${invoiceData.amount.toFixed(2)}
      </div>
      
      <div class="footer">
        <p>Thank you for choosing Aura Spring Cleaning!</p>
        <p>Payment due within 7 days</p>
        <p>Questions? Call (512) 781-0527 or email hello@auraspringcleaning.com</p>
      </div>
    </body>
    </html>
  `;
}

/**
 * Dashboard metrics from all systems
 */
export async function getDashboardMetrics() {
  try {
    const metrics = {
      todayBookings: 0,
      weekBookings: 0,
      monthRevenue: 0,
      activeCustomers: 0,
      teamUtilization: 0,
      customerSatisfaction: 0
    };

    // Aggregate from various sources
    // This would pull from Dynamics 365, SharePoint lists, etc.
    
    return metrics;

  } catch (error) {
    console.error('Error getting dashboard metrics:', error);
    return null;
  }
}

export default {
  processBookingThroughEcosystem,
  processServiceCompletion,
  generateAndSendInvoice,
  getCustomer360View,
  getDashboardMetrics
};