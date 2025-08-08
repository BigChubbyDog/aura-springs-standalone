import { BookingData } from './microsoftIntegration';

// Dynamics 365 CRM Configuration
const DYNAMICS_URL = process.env.DYNAMICS_365_URL || 'https://org829637ae.crm.dynamics.com';
const TENANT_ID = process.env.NEXT_PUBLIC_AZURE_TENANT_ID || '753965c2-2a85-437e-a9c9-9f824df99584';
const CLIENT_ID = process.env.DYNAMICS_365_CLIENT_ID || process.env.NEXT_PUBLIC_AZURE_CLIENT_ID || '33a34c59-1641-47f5-8227-6bfcb11bdf42';
const CLIENT_SECRET = process.env.DYNAMICS_365_CLIENT_SECRET || process.env.AZURE_CLIENT_SECRET || '';

interface DynamicsContact {
  contactid?: string;
  firstname: string;
  lastname: string;
  emailaddress1: string;
  telephone1: string;
  address1_line1?: string;
  address1_city?: string;
  address1_stateorprovince?: string;
  address1_postalcode?: string;
}

interface DynamicsLead {
  leadid?: string;
  subject: string;
  firstname: string;
  lastname: string;
  emailaddress1: string;
  telephone1: string;
  address1_line1?: string;
  address1_city?: string;
  address1_stateorprovince?: string;
  leadqualitycode?: number;
  leadsourcecode?: number;
  description?: string;
}

interface DynamicsOpportunity {
  opportunityid?: string;
  name: string;
  customerid?: string;
  estimatedvalue: number;
  estimatedclosedate: string;
  closeprobability: number;
  description?: string;
  opportunityratingcode?: number;
  currencyid?: string;
}

interface DynamicsServiceAppointment {
  activityid?: string;
  subject: string;
  scheduledstart: string;
  scheduledend: string;
  location?: string;
  description?: string;
  regardingobjectid?: string;
  serviceid?: string;
  resources?: string[];
}

// Get access token for Dynamics 365
async function getAccessToken(): Promise<string> {
  try {
    const tokenEndpoint = `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/token`;
    
    const params = new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      scope: `${DYNAMICS_URL}/.default`,
      grant_type: 'client_credentials'
    });

    const response = await fetch(tokenEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString()
    });

    if (!response.ok) {
      throw new Error(`Failed to get access token: ${response.statusText}`);
    }

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('Error getting Dynamics 365 access token:', error);
    throw error;
  }
}

// Create or update contact in Dynamics 365
export async function createOrUpdateContact(booking: BookingData): Promise<DynamicsContact | null> {
  try {
    const accessToken = await getAccessToken();
    const [firstName, ...lastNameParts] = booking.customerName.split(' ');
    const lastName = lastNameParts.join(' ') || firstName;

    // First, check if contact exists
    const searchUrl = `${DYNAMICS_URL}/api/data/v9.2/contacts?$filter=emailaddress1 eq '${booking.customerEmail}'`;
    
    const searchResponse = await fetch(searchUrl, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json',
        'OData-MaxVersion': '4.0',
        'OData-Version': '4.0',
        'Prefer': 'return=representation'
      }
    });

    const searchData = await searchResponse.json();
    
    if (searchData.value && searchData.value.length > 0) {
      // Update existing contact
      const contactId = searchData.value[0].contactid;
      const updateUrl = `${DYNAMICS_URL}/api/data/v9.2/contacts(${contactId})`;
      
      const updateData: Partial<DynamicsContact> = {
        telephone1: booking.customerPhone,
        address1_line1: booking.address,
        address1_city: 'Austin',
        address1_stateorprovince: 'TX'
      };

      const updateResponse = await fetch(updateUrl, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'OData-MaxVersion': '4.0',
          'OData-Version': '4.0'
        },
        body: JSON.stringify(updateData)
      });

      if (updateResponse.ok) {
        return { ...searchData.value[0], ...updateData };
      }
    } else {
      // Create new contact
      const contactData: DynamicsContact = {
        firstname: firstName,
        lastname: lastName,
        emailaddress1: booking.customerEmail,
        telephone1: booking.customerPhone,
        address1_line1: booking.address,
        address1_city: 'Austin',
        address1_stateorprovince: 'TX'
      };

      const createResponse = await fetch(`${DYNAMICS_URL}/api/data/v9.2/contacts`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'OData-MaxVersion': '4.0',
          'OData-Version': '4.0',
          'Prefer': 'return=representation'
        },
        body: JSON.stringify(contactData)
      });

      if (createResponse.ok) {
        return await createResponse.json();
      }
    }
  } catch (error) {
    console.error('Error creating/updating contact in Dynamics 365:', error);
  }
  
  return null;
}

// Create lead in Dynamics 365
export async function createLead(booking: BookingData): Promise<DynamicsLead | null> {
  try {
    const accessToken = await getAccessToken();
    const [firstName, ...lastNameParts] = booking.customerName.split(' ');
    const lastName = lastNameParts.join(' ') || firstName;

    const leadData: DynamicsLead = {
      subject: `${booking.serviceType} - ${booking.customerName}`,
      firstname: firstName,
      lastname: lastName,
      emailaddress1: booking.customerEmail,
      telephone1: booking.customerPhone,
      address1_line1: booking.address,
      address1_city: 'Austin',
      address1_stateorprovince: 'TX',
      leadqualitycode: 1, // Hot
      leadsourcecode: 2, // Web
      description: `Service: ${booking.serviceType}
Property: ${booking.bedrooms}BR/${booking.bathrooms}BA - ${booking.squareFeet} sq ft
Frequency: ${booking.frequency}
Date: ${booking.serviceDate} at ${booking.serviceTime}
Price: $${booking.totalPrice}
${booking.specialInstructions ? `Notes: ${booking.specialInstructions}` : ''}`
    };

    const response = await fetch(`${DYNAMICS_URL}/api/data/v9.2/leads`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'OData-MaxVersion': '4.0',
        'OData-Version': '4.0',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(leadData)
    });

    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error creating lead in Dynamics 365:', error);
  }
  
  return null;
}

// Create opportunity in Dynamics 365
export async function createOpportunity(booking: BookingData, contactId?: string): Promise<DynamicsOpportunity | null> {
  try {
    const accessToken = await getAccessToken();
    
    // Calculate annual value if recurring
    let estimatedValue = booking.totalPrice;
    if (booking.frequency === 'weekly') {
      estimatedValue = booking.totalPrice * 52;
    } else if (booking.frequency === 'biweekly') {
      estimatedValue = booking.totalPrice * 26;
    } else if (booking.frequency === 'monthly') {
      estimatedValue = booking.totalPrice * 12;
    }

    const opportunityData: DynamicsOpportunity = {
      name: `${booking.serviceType} - ${booking.customerName}`,
      estimatedvalue: estimatedValue,
      estimatedclosedate: booking.serviceDate,
      closeprobability: booking.frequency === 'one-time' ? 50 : 80,
      description: `Service Type: ${booking.serviceType}
Property: ${booking.bedrooms}BR/${booking.bathrooms}BA - ${booking.squareFeet} sq ft
Frequency: ${booking.frequency}
Service Date: ${booking.serviceDate} at ${booking.serviceTime}
Single Service Price: $${booking.totalPrice}
Estimated Annual Value: $${estimatedValue}`,
      opportunityratingcode: 1 // Hot
    };

    // Link to contact if provided
    if (contactId) {
      opportunityData.customerid = contactId;
    }

    const response = await fetch(`${DYNAMICS_URL}/api/data/v9.2/opportunities`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'OData-MaxVersion': '4.0',
        'OData-Version': '4.0',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(opportunityData)
    });

    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error creating opportunity in Dynamics 365:', error);
  }
  
  return null;
}

// Create service appointment in Dynamics 365
export async function createServiceAppointment(booking: BookingData, regardingId?: string): Promise<DynamicsServiceAppointment | null> {
  try {
    const accessToken = await getAccessToken();
    
    const startDateTime = new Date(`${booking.serviceDate}T${booking.serviceTime}`);
    const endDateTime = new Date(startDateTime);
    endDateTime.setHours(endDateTime.getHours() + 3); // 3-hour service window

    const appointmentData: DynamicsServiceAppointment = {
      subject: `Cleaning Service: ${booking.customerName}`,
      scheduledstart: startDateTime.toISOString(),
      scheduledend: endDateTime.toISOString(),
      location: booking.address,
      description: `Customer: ${booking.customerName}
Email: ${booking.customerEmail}
Phone: ${booking.customerPhone}
Service: ${booking.serviceType}
Property: ${booking.bedrooms}BR/${booking.bathrooms}BA - ${booking.squareFeet} sq ft
Add-ons: ${booking.addOns.join(', ') || 'None'}
Price: $${booking.totalPrice}
${booking.specialInstructions ? `Special Instructions: ${booking.specialInstructions}` : ''}`
    };

    // Link to opportunity or contact if provided
    if (regardingId) {
      appointmentData.regardingobjectid = regardingId;
    }

    const response = await fetch(`${DYNAMICS_URL}/api/data/v9.2/serviceappointments`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'OData-MaxVersion': '4.0',
        'OData-Version': '4.0',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(appointmentData)
    });

    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error creating service appointment in Dynamics 365:', error);
  }
  
  return null;
}

// Main function to sync booking with Dynamics 365
export async function syncBookingToDynamics(booking: BookingData) {
  const results = {
    contact: null as DynamicsContact | null,
    lead: null as DynamicsLead | null,
    opportunity: null as DynamicsOpportunity | null,
    appointment: null as DynamicsServiceAppointment | null,
    success: false
  };

  try {
    // 1. Create or update contact
    results.contact = await createOrUpdateContact(booking);
    
    // 2. Create lead (for tracking source)
    results.lead = await createLead(booking);
    
    // 3. Create opportunity (for sales tracking)
    if (results.contact) {
      results.opportunity = await createOpportunity(booking, results.contact.contactid);
    } else {
      results.opportunity = await createOpportunity(booking);
    }
    
    // 4. Create service appointment
    if (results.opportunity) {
      results.appointment = await createServiceAppointment(booking, results.opportunity.opportunityid);
    } else {
      results.appointment = await createServiceAppointment(booking);
    }
    
    results.success = !!(results.contact || results.lead || results.opportunity || results.appointment);
  } catch (error) {
    console.error('Error syncing to Dynamics 365:', error);
  }

  return results;
}

// Function to check Dynamics 365 connection
export async function testDynamicsConnection(): Promise<boolean> {
  try {
    const accessToken = await getAccessToken();
    
    const response = await fetch(`${DYNAMICS_URL}/api/data/v9.2/WhoAmI`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json',
        'OData-MaxVersion': '4.0',
        'OData-Version': '4.0'
      }
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Dynamics 365 connection successful:', data);
      return true;
    }
  } catch (error) {
    console.error('Dynamics 365 connection test failed:', error);
  }
  
  return false;
}