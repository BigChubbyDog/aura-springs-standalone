/**
 * Dynamics 365 CRM Service
 * Complete customer relationship management for Aura Spring Cleaning
 */

import axios from 'axios';
import { ClientSecretCredential } from '@azure/identity';

// Dynamics 365 Configuration - Using Claude-Master-Automation (has System Administrator role)
const DYNAMICS_CONFIG = {
  url: process.env.DYNAMICS_365_URL || 'https://mortgagelcdefault.crm.dynamics.com',
  clientId: process.env.DYNAMICS_365_CLIENT_ID || '94d3924d-79c4-4280-975d-8223752343b8',
  clientSecret: process.env.DYNAMICS_365_CLIENT_SECRET || 'process.env.AZURE_CLIENT_SECRET',
  tenantId: process.env.AZURE_TENANT_ID || '753965c2-2a85-437e-a9c9-9f824df99584'
};

// Get Dynamics 365 access token
async function getDynamicsToken(): Promise<string> {
  try {
    const credential = new ClientSecretCredential(
      DYNAMICS_CONFIG.tenantId,
      DYNAMICS_CONFIG.clientId,
      DYNAMICS_CONFIG.clientSecret
    );
    
    const token = await credential.getToken(`${DYNAMICS_CONFIG.url}/.default`);
    return token?.token || '';
  } catch (error) {
    console.error('Error getting Dynamics token:', error);
    throw error;
  }
}

/**
 * Customer Entity Structure in Dynamics 365
 */
export interface DynamicsCustomer {
  contactid?: string;
  firstname: string;
  lastname: string;
  emailaddress1: string;
  telephone1: string;
  address1_line1?: string;
  address1_city?: string;
  address1_stateorprovince?: string;
  address1_postalcode?: string;
  // Custom fields for Aura Spring
  new_customertype?: 'Residential' | 'Commercial' | 'Airbnb';
  new_cleaningfrequency?: 'Weekly' | 'Biweekly' | 'Monthly' | 'OneTime';
  new_preferredday?: string;
  new_preferredtime?: string;
  new_lifetimevalue?: number;
  new_lastservicedate?: Date;
  new_nextscheduledservice?: Date;
  new_customertier?: 'Standard' | 'Premium' | 'VIP';
  new_specialinstructions?: string;
  new_keylocation?: string;
  new_petinfo?: string;
  new_squarefeet?: number;
  new_bedrooms?: number;
  new_bathrooms?: number;
}

/**
 * Service Record Entity
 */
export interface DynamicsServiceRecord {
  activityid?: string;
  subject: string;
  description?: string;
  scheduledstart: Date;
  scheduledend: Date;
  actualdurationminutes?: number;
  regardingobjectid?: string; // Links to contact
  new_servicetype?: string;
  new_serviceprice?: number;
  new_teamassigned?: string;
  new_servicestatus?: 'Scheduled' | 'InProgress' | 'Completed' | 'Cancelled';
  new_customerrating?: number;
  new_beforephotos?: string;
  new_afterphotos?: string;
  new_specialrequests?: string;
}

/**
 * Lead Entity for potential customers
 */
export interface DynamicsLead {
  leadid?: string;
  firstname: string;
  lastname: string;
  emailaddress1: string;
  telephone1?: string;
  subject: string;
  description?: string;
  new_source?: 'Website' | 'Referral' | 'Google' | 'Facebook' | 'Other';
  new_estimatedvalue?: number;
  new_serviceinterest?: string;
  new_urgency?: 'Low' | 'Medium' | 'High' | 'Urgent';
  leadqualitycode?: number;
  leadsourcecode?: number;
}

/**
 * Invoice Entity
 */
export interface DynamicsInvoice {
  invoiceid?: string;
  name: string;
  customerid: string;
  description?: string;
  totalamount: number;
  new_serviceid?: string;
  new_paymentstatus?: 'Pending' | 'Paid' | 'Overdue' | 'Cancelled';
  new_paymentmethod?: 'Cash' | 'Check' | 'Card' | 'Online';
  datedelivered?: Date;
  duedate?: Date;
}

/**
 * Create or update customer in Dynamics 365
 */
export async function createOrUpdateCustomer(customerData: Partial<DynamicsCustomer>) {
  try {
    const token = await getDynamicsToken();
    
    // Check if customer exists
    const searchResponse = await axios.get(
      `${DYNAMICS_CONFIG.url}/api/data/v9.2/contacts?$filter=emailaddress1 eq '${customerData.emailaddress1}'`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'OData-MaxVersion': '4.0',
          'OData-Version': '4.0',
          'Accept': 'application/json',
          'Prefer': 'return=representation'
        }
      }
    );
    
    if (searchResponse.data.value && searchResponse.data.value.length > 0) {
      // Update existing customer
      const existingCustomerId = searchResponse.data.value[0].contactid;
      
      await axios.patch(
        `${DYNAMICS_CONFIG.url}/api/data/v9.2/contacts(${existingCustomerId})`,
        customerData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'OData-MaxVersion': '4.0',
            'OData-Version': '4.0',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }
      );
      
      console.log(`✅ Updated customer in Dynamics 365: ${existingCustomerId}`);
      return { success: true, customerId: existingCustomerId, action: 'updated' };
      
    } else {
      // Create new customer
      const createResponse = await axios.post(
        `${DYNAMICS_CONFIG.url}/api/data/v9.2/contacts`,
        customerData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'OData-MaxVersion': '4.0',
            'OData-Version': '4.0',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Prefer': 'return=representation'
          }
        }
      );
      
      const newCustomerId = createResponse.data.contactid;
      console.log(`✅ Created new customer in Dynamics 365: ${newCustomerId}`);
      return { success: true, customerId: newCustomerId, action: 'created' };
    }
    
  } catch (error) {
    console.error('Error in createOrUpdateCustomer:', error);
    return { success: false, error };
  }
}

/**
 * Create service appointment in Dynamics 365
 */
export async function createServiceAppointment(appointmentData: Partial<DynamicsServiceRecord>) {
  try {
    const token = await getDynamicsToken();
    
    // Format the appointment data for Dynamics 365
    const formattedData: any = {
      subject: appointmentData.subject,
      description: appointmentData.description,
      scheduledstart: appointmentData.scheduledstart,
      scheduledend: appointmentData.scheduledend
    };
    
    // Add regardingobjectid if provided (link to contact)
    if (appointmentData.regardingobjectid) {
      formattedData['regardingobjectid_contact@odata.bind'] = `/contacts(${appointmentData.regardingobjectid})`;
    }
    
    const response = await axios.post(
      `${DYNAMICS_CONFIG.url}/api/data/v9.2/appointments`,
      formattedData,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'OData-MaxVersion': '4.0',
          'OData-Version': '4.0',
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        }
      }
    );
    
    console.log(`✅ Created service appointment in Dynamics 365: ${response.data.activityid}`);
    return { success: true, appointmentId: response.data.activityid };
    
  } catch (error) {
    console.error('Error creating service appointment:', error);
    return { success: false, error };
  }
}

/**
 * Create lead for potential customer
 */
export async function createLead(leadData: Partial<DynamicsLead>) {
  try {
    const token = await getDynamicsToken();
    
    const response = await axios.post(
      `${DYNAMICS_CONFIG.url}/api/data/v9.2/leads`,
      leadData,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'OData-MaxVersion': '4.0',
          'OData-Version': '4.0',
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        }
      }
    );
    
    console.log(`✅ Created lead in Dynamics 365: ${response.data.leadid}`);
    return { success: true, leadId: response.data.leadid };
    
  } catch (error) {
    console.error('Error creating lead:', error);
    return { success: false, error };
  }
}

/**
 * Create invoice in Dynamics 365
 */
export async function createInvoice(invoiceData: Partial<DynamicsInvoice>) {
  try {
    const token = await getDynamicsToken();
    
    const response = await axios.post(
      `${DYNAMICS_CONFIG.url}/api/data/v9.2/invoices`,
      invoiceData,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'OData-MaxVersion': '4.0',
          'OData-Version': '4.0',
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        }
      }
    );
    
    console.log(`✅ Created invoice in Dynamics 365: ${response.data.invoiceid}`);
    return { success: true, invoiceId: response.data.invoiceid };
    
  } catch (error) {
    console.error('Error creating invoice:', error);
    return { success: false, error };
  }
}

/**
 * Get customer service history
 */
export async function getCustomerHistory(customerId: string) {
  try {
    const token = await getDynamicsToken();
    
    const response = await axios.get(
      `${DYNAMICS_CONFIG.url}/api/data/v9.2/appointments?$filter=_regardingobjectid_value eq ${customerId}&$orderby=scheduledstart desc`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'OData-MaxVersion': '4.0',
          'OData-Version': '4.0',
          'Accept': 'application/json'
        }
      }
    );
    
    return { 
      success: true, 
      services: response.data.value,
      totalServices: response.data.value.length
    };
    
  } catch (error) {
    console.error('Error getting customer history:', error);
    return { success: false, error };
  }
}

/**
 * Update service status (mark as completed, etc.)
 */
export async function updateServiceStatus(
  appointmentId: string, 
  status: 'Completed' | 'Cancelled' | 'InProgress',
  additionalData?: any
) {
  try {
    const token = await getDynamicsToken();
    
    const updateData = {
      new_servicestatus: status,
      ...additionalData
    };
    
    await axios.patch(
      `${DYNAMICS_CONFIG.url}/api/data/v9.2/appointments(${appointmentId})`,
      updateData,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'OData-MaxVersion': '4.0',
          'OData-Version': '4.0',
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
    );
    
    console.log(`✅ Updated service status to ${status}: ${appointmentId}`);
    return { success: true };
    
  } catch (error) {
    console.error('Error updating service status:', error);
    return { success: false, error };
  }
}

/**
 * Process complete booking with Dynamics 365 integration
 */
export async function processBookingInDynamics(booking: any) {
  const results = {
    customer: null as any,
    appointment: null as any,
    lead: null as any,
    success: false
  };
  
  try {
    // Parse customer name
    const nameParts = booking.customerName.split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ') || nameParts[0];
    
    // 1. Create or update customer (using standard fields only)
    const customerResult = await createOrUpdateCustomer({
      firstname: firstName,
      lastname: lastName,
      emailaddress1: booking.customerEmail,
      telephone1: booking.customerPhone,
      address1_line1: booking.address,
      address1_city: 'Austin',
      address1_stateorprovince: 'TX',
      address1_postalcode: '78701',
      description: `Service Type: ${booking.serviceType || 'Residential Cleaning'}\nFrequency: ${booking.frequency || 'OneTime'}\nSquare Feet: ${booking.squareFeet || 'N/A'}\nBedrooms: ${booking.bedrooms || 'N/A'}\nBathrooms: ${booking.bathrooms || 'N/A'}\nSpecial Instructions: ${booking.specialInstructions || 'None'}`
    });
    
    results.customer = customerResult;
    
    // 2. Create service appointment (using standard fields only)
    if (customerResult.success) {
      const appointmentResult = await createServiceAppointment({
        subject: `${booking.serviceType} - ${booking.customerName}`,
        description: `Service Type: ${booking.serviceType}\nPrice: $${booking.totalPrice}\nDate: ${booking.serviceDate}\nSpecial Instructions: ${booking.specialInstructions || 'None'}`,
        scheduledstart: new Date(booking.serviceDate),
        scheduledend: new Date(new Date(booking.serviceDate).getTime() + 3 * 60 * 60 * 1000), // 3 hours later
        regardingobjectid: customerResult.customerId
      });
      
      results.appointment = appointmentResult;
    }
    
    // 3. Create lead if first time customer (using standard fields only)
    if (customerResult.action === 'created') {
      const leadResult = await createLead({
        firstname: firstName,
        lastname: lastName,
        emailaddress1: booking.customerEmail,
        telephone1: booking.customerPhone,
        subject: `New Customer - ${booking.serviceType}`,
        description: `New customer from website booking.\nService: ${booking.serviceType}\nEstimated Value: $${booking.totalPrice}\nSource: Website`,
        estimatedvalue: booking.totalPrice,
        leadsourcecode: 10 // Web
      });
      
      results.lead = leadResult;
    }
    
    results.success = true;
    return results;
    
  } catch (error) {
    console.error('Error processing booking in Dynamics:', error);
    return results;
  }
}

export default {
  createOrUpdateCustomer,
  createServiceAppointment,
  createLead,
  createInvoice,
  getCustomerHistory,
  updateServiceStatus,
  processBookingInDynamics
};