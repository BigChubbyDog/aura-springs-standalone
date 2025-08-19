/**
 * SharePoint CRM Service - Alternative to Dynamics 365
 * Uses SharePoint Lists to store customer and booking data
 */

import { Client } from '@microsoft/microsoft-graph-client';
import { ClientSecretCredential } from '@azure/identity';

// SharePoint Configuration
const SHAREPOINT_CONFIG = {
  siteUrl: 'https://adminaccountbcd.sharepoint.com/sites/AuraSpringCleaningTeams',
  tenantId: process.env.AZURE_TENANT_ID || '753965c2-2a85-437e-a9c9-9f824df99584',
  clientId: process.env.AZURE_CLIENT_ID || '94d3924d-79c4-4280-975d-8223752343b8',
  clientSecret: process.env.AZURE_CLIENT_SECRET || 'process.env.AZURE_CLIENT_SECRET'
};

// Initialize Graph client
function getGraphClient() {
  const credential = new ClientSecretCredential(
    SHAREPOINT_CONFIG.tenantId,
    SHAREPOINT_CONFIG.clientId,
    SHAREPOINT_CONFIG.clientSecret
  );

  return Client.initWithMiddleware({
    authProvider: {
      getAccessToken: async () => {
        const token = await credential.getToken('https://graph.microsoft.com/.default');
        return token?.token || '';
      },
    },
  });
}

/**
 * SharePoint Lists Structure (replaces Dynamics 365 entities)
 */
export const CRM_LISTS = {
  CUSTOMERS: {
    name: 'Customers',
    fields: [
      { name: 'Title', type: 'Text', required: true }, // Customer Name
      { name: 'Email', type: 'Text', required: true },
      { name: 'Phone', type: 'Text' },
      { name: 'Address', type: 'Note' },
      { name: 'CustomerType', type: 'Choice', choices: ['Residential', 'Commercial', 'Airbnb'] },
      { name: 'SquareFeet', type: 'Number' },
      { name: 'Bedrooms', type: 'Number' },
      { name: 'Bathrooms', type: 'Number' },
      { name: 'PreferredDay', type: 'Text' },
      { name: 'PreferredTime', type: 'Text' },
      { name: 'SpecialInstructions', type: 'Note' },
      { name: 'CustomerTier', type: 'Choice', choices: ['Standard', 'Premium', 'VIP'] },
      { name: 'LifetimeValue', type: 'Currency' },
      { name: 'LastServiceDate', type: 'DateTime' },
      { name: 'NextScheduledService', type: 'DateTime' },
      { name: 'Active', type: 'Boolean', default: true }
    ]
  },
  
  BOOKINGS: {
    name: 'Bookings',
    fields: [
      { name: 'Title', type: 'Text', required: true }, // Booking ID
      { name: 'CustomerLookup', type: 'Lookup', list: 'Customers' },
      { name: 'ServiceDate', type: 'DateTime', required: true },
      { name: 'ServiceType', type: 'Choice', choices: ['Standard', 'Deep Clean', 'Move In/Out', 'Airbnb', 'Commercial'] },
      { name: 'ServicePrice', type: 'Currency' },
      { name: 'ServiceStatus', type: 'Choice', choices: ['Scheduled', 'In Progress', 'Completed', 'Cancelled'] },
      { name: 'TeamAssigned', type: 'Text' },
      { name: 'Duration', type: 'Number' },
      { name: 'CustomerRating', type: 'Number' },
      { name: 'CompletionNotes', type: 'Note' },
      { name: 'BeforePhotos', type: 'URL' },
      { name: 'AfterPhotos', type: 'URL' }
    ]
  },
  
  INVOICES: {
    name: 'Invoices',
    fields: [
      { name: 'Title', type: 'Text', required: true }, // Invoice Number
      { name: 'CustomerLookup', type: 'Lookup', list: 'Customers' },
      { name: 'BookingLookup', type: 'Lookup', list: 'Bookings' },
      { name: 'InvoiceDate', type: 'DateTime' },
      { name: 'DueDate', type: 'DateTime' },
      { name: 'TotalAmount', type: 'Currency' },
      { name: 'PaymentStatus', type: 'Choice', choices: ['Pending', 'Paid', 'Overdue', 'Cancelled'] },
      { name: 'PaymentMethod', type: 'Choice', choices: ['Cash', 'Check', 'Card', 'Online'] },
      { name: 'PaymentDate', type: 'DateTime' },
      { name: 'InvoiceURL', type: 'URL' }
    ]
  },
  
  LEADS: {
    name: 'Leads',
    fields: [
      { name: 'Title', type: 'Text', required: true }, // Lead Name
      { name: 'Email', type: 'Text' },
      { name: 'Phone', type: 'Text' },
      { name: 'Source', type: 'Choice', choices: ['Website', 'Referral', 'Google', 'Facebook', 'Other'] },
      { name: 'ServiceInterest', type: 'Text' },
      { name: 'EstimatedValue', type: 'Currency' },
      { name: 'Urgency', type: 'Choice', choices: ['Low', 'Medium', 'High', 'Urgent'] },
      { name: 'Status', type: 'Choice', choices: ['New', 'Contacted', 'Qualified', 'Converted', 'Lost'] },
      { name: 'Notes', type: 'Note' },
      { name: 'ConvertedDate', type: 'DateTime' }
    ]
  }
};

/**
 * Create all SharePoint lists for CRM
 */
export async function createCrmLists() {
  const client = getGraphClient();
  const results = [];
  
  try {
    // Get site ID
    const site = await client
      .api('/sites/adminaccountbcd.sharepoint.com:/sites/AuraSpringCleaningTeams')
      .get();
    
    const siteId = site.id;
    
    // Create each list
    for (const [key, listConfig] of Object.entries(CRM_LISTS)) {
      try {
        // Create the list
        const list = await client
          .api(`/sites/${siteId}/lists`)
          .post({
            displayName: listConfig.name,
            columns: listConfig.fields.map(field => ({
              name: field.name,
              text: field.type === 'Text' ? {} : undefined,
              number: field.type === 'Number' ? {} : undefined,
              currency: field.type === 'Currency' ? {} : undefined,
              dateTime: field.type === 'DateTime' ? {} : undefined,
              choice: field.type === 'Choice' ? { choices: field.choices } : undefined,
              boolean: field.type === 'Boolean' ? {} : undefined,
              lookup: field.type === 'Lookup' ? { 
                allowMultipleValues: false,
                lookupSourceId: field.list 
              } : undefined,
              required: field.required || false
            }))
          });
        
        console.log(`✅ Created list: ${listConfig.name}`);
        results.push({ list: listConfig.name, success: true, id: list.id });
        
      } catch (error) {
        console.error(`Error creating list ${listConfig.name}:`, error);
        results.push({ list: listConfig.name, success: false, error });
      }
    }
    
    return results;
    
  } catch (error) {
    console.error('Error creating CRM lists:', error);
    throw error;
  }
}

/**
 * Customer operations
 */
export async function createOrUpdateCustomer(customerData: {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  squareFeet?: number;
  bedrooms?: number;
  bathrooms?: number;
  specialInstructions?: string;
}) {
  const client = getGraphClient();
  
  try {
    const site = await client
      .api('/sites/adminaccountbcd.sharepoint.com:/sites/AuraSpringCleaningTeams')
      .get();
    
    // Check if customer exists
    const existingCustomers = await client
      .api(`/sites/${site.id}/lists/Customers/items`)
      .filter(`fields/Email eq '${customerData.email}'`)
      .expand('fields')
      .get();
    
    if (existingCustomers.value && existingCustomers.value.length > 0) {
      // Update existing customer
      const customerId = existingCustomers.value[0].id;
      
      await client
        .api(`/sites/${site.id}/lists/Customers/items/${customerId}/fields`)
        .patch({
          Title: customerData.name,
          Phone: customerData.phone,
          Address: customerData.address,
          SquareFeet: customerData.squareFeet,
          Bedrooms: customerData.bedrooms,
          Bathrooms: customerData.bathrooms,
          SpecialInstructions: customerData.specialInstructions,
          LastServiceDate: new Date().toISOString()
        });
      
      console.log(`✅ Updated customer: ${customerData.name}`);
      return { success: true, customerId, action: 'updated' };
      
    } else {
      // Create new customer
      const newCustomer = await client
        .api(`/sites/${site.id}/lists/Customers/items`)
        .post({
          fields: {
            Title: customerData.name,
            Email: customerData.email,
            Phone: customerData.phone,
            Address: customerData.address,
            CustomerType: 'Residential',
            SquareFeet: customerData.squareFeet,
            Bedrooms: customerData.bedrooms,
            Bathrooms: customerData.bathrooms,
            SpecialInstructions: customerData.specialInstructions,
            CustomerTier: 'Standard',
            Active: true
          }
        });
      
      console.log(`✅ Created new customer: ${customerData.name}`);
      return { success: true, customerId: newCustomer.id, action: 'created' };
    }
    
  } catch (error) {
    console.error('Error in createOrUpdateCustomer:', error);
    return { success: false, error };
  }
}

/**
 * Create booking record
 */
export async function createBooking(bookingData: {
  bookingId: string;
  customerId?: string;
  customerEmail: string;
  serviceDate: string;
  serviceType: string;
  servicePrice: number;
  teamAssigned?: string;
}) {
  const client = getGraphClient();
  
  try {
    const site = await client
      .api('/sites/adminaccountbcd.sharepoint.com:/sites/AuraSpringCleaningTeams')
      .get();
    
    // Get customer ID if not provided
    let customerId = bookingData.customerId;
    if (!customerId) {
      const customers = await client
        .api(`/sites/${site.id}/lists/Customers/items`)
        .filter(`fields/Email eq '${bookingData.customerEmail}'`)
        .select('id')
        .get();
      
      if (customers.value && customers.value.length > 0) {
        customerId = customers.value[0].id;
      }
    }
    
    // Create booking
    const booking = await client
      .api(`/sites/${site.id}/lists/Bookings/items`)
      .post({
        fields: {
          Title: bookingData.bookingId,
          CustomerLookupId: customerId,
          ServiceDate: new Date(bookingData.serviceDate).toISOString(),
          ServiceType: bookingData.serviceType,
          ServicePrice: bookingData.servicePrice,
          ServiceStatus: 'Scheduled',
          TeamAssigned: bookingData.teamAssigned || 'Unassigned'
        }
      });
    
    console.log(`✅ Created booking: ${bookingData.bookingId}`);
    return { success: true, bookingId: booking.id };
    
  } catch (error) {
    console.error('Error creating booking:', error);
    return { success: false, error };
  }
}

/**
 * Get customer history
 */
export async function getCustomerHistory(customerEmail: string) {
  const client = getGraphClient();
  
  try {
    const site = await client
      .api('/sites/adminaccountbcd.sharepoint.com:/sites/AuraSpringCleaningTeams')
      .get();
    
    // Get customer
    const customers = await client
      .api(`/sites/${site.id}/lists/Customers/items`)
      .filter(`fields/Email eq '${customerEmail}'`)
      .expand('fields')
      .get();
    
    if (!customers.value || customers.value.length === 0) {
      return { success: false, message: 'Customer not found' };
    }
    
    const customer = customers.value[0];
    
    // Get bookings for this customer
    const bookings = await client
      .api(`/sites/${site.id}/lists/Bookings/items`)
      .filter(`fields/CustomerLookupId eq ${customer.id}`)
      .expand('fields')
      .orderby('fields/ServiceDate desc')
      .get();
    
    return {
      success: true,
      customer: customer.fields,
      bookings: bookings.value.map((b: any) => b.fields),
      totalBookings: bookings.value.length
    };
    
  } catch (error) {
    console.error('Error getting customer history:', error);
    return { success: false, error };
  }
}

/**
 * Update booking status
 */
export async function updateBookingStatus(
  bookingId: string,
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled',
  additionalData?: any
) {
  const client = getGraphClient();
  
  try {
    const site = await client
      .api('/sites/adminaccountbcd.sharepoint.com:/sites/AuraSpringCleaningTeams')
      .get();
    
    // Find booking by Title (booking ID)
    const bookings = await client
      .api(`/sites/${site.id}/lists/Bookings/items`)
      .filter(`fields/Title eq '${bookingId}'`)
      .select('id')
      .get();
    
    if (!bookings.value || bookings.value.length === 0) {
      throw new Error('Booking not found');
    }
    
    const itemId = bookings.value[0].id;
    
    // Update booking
    await client
      .api(`/sites/${site.id}/lists/Bookings/items/${itemId}/fields`)
      .patch({
        ServiceStatus: status,
        ...additionalData
      });
    
    console.log(`✅ Updated booking status to ${status}: ${bookingId}`);
    return { success: true };
    
  } catch (error) {
    console.error('Error updating booking status:', error);
    return { success: false, error };
  }
}

export default {
  createCrmLists,
  createOrUpdateCustomer,
  createBooking,
  getCustomerHistory,
  updateBookingStatus
};