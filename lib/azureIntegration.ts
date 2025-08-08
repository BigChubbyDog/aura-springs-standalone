import { Client } from '@microsoft/microsoft-graph-client';
import { TokenCredentialAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials';
import { ClientSecretCredential } from '@azure/identity';
import { SecretClient } from '@azure/keyvault-secrets';
import { BlobServiceClient } from '@azure/storage-blob';
import { CosmosClient } from '@azure/cosmos';

// Azure Service Principal Configuration (from environment variables)
const TENANT_ID = process.env.AZURE_TENANT_ID || '';
const CLIENT_ID = process.env.AZURE_CLIENT_ID || '';
const CLIENT_SECRET = process.env.AZURE_CLIENT_SECRET || '';

// Dynamics 365 Configuration
const DYNAMICS_URL = 'https://org829637ae.crm.dynamics.com';
const DYNAMICS_RESOURCE = 'https://org829637ae.api.crm.dynamics.com';

// SharePoint Configuration
const SHAREPOINT_URL = 'https://bigchubbydog.sharepoint.com/sites/AuraSpringCleaning';
const SHAREPOINT_SITE_ID = 'bigchubbydog.sharepoint.com,{site-id},{web-id}';

// Azure Resources
const KEYVAULT_URL = 'https://auraspringcleaning.vault.azure.net';
const STORAGE_ACCOUNT = 'auraspringcleaning';
const COSMOS_ENDPOINT = 'https://auraspringcleaning.documents.azure.com:443/';
const COSMOS_KEY = process.env.COSMOS_KEY || '';

// Initialize Azure Credential
const credential = new ClientSecretCredential(TENANT_ID, CLIENT_ID, CLIENT_SECRET);

// Initialize Microsoft Graph Client
export function getGraphClient() {
  const authProvider = new TokenCredentialAuthenticationProvider(credential, {
    scopes: [
      'https://graph.microsoft.com/.default',
      'Sites.ReadWrite.All',
      'Files.ReadWrite.All',
      'Calendars.ReadWrite',
      'Mail.Send',
      'ChannelMessage.Send',
      'Team.ReadBasic.All',
      'User.Read.All',
      'Directory.Read.All'
    ]
  });

  return Client.initWithMiddleware({
    authProvider: authProvider,
  });
}

// Key Vault Integration
export async function getSecretFromKeyVault(secretName: string) {
  try {
    const client = new SecretClient(KEYVAULT_URL, credential);
    const secret = await client.getSecret(secretName);
    return secret.value;
  } catch (error) {
    console.error('Error retrieving secret:', error);
    return null;
  }
}

// SharePoint Integration
export async function createBookingInSharePoint(booking: any) {
  try {
    const client = getGraphClient();
    
    // Create item in SharePoint list
    const listItem = {
      fields: {
        Title: `Booking - ${booking.customerName}`,
        CustomerName: booking.customerName,
        CustomerEmail: booking.customerEmail,
        CustomerPhone: booking.customerPhone,
        ServiceType: booking.serviceType,
        ServiceDate: booking.serviceDate,
        ServiceTime: booking.serviceTime,
        Address: booking.address,
        TotalPrice: booking.totalPrice,
        Status: 'New',
        PaymentStatus: 'Pending',
        AssignedTeam: '',
        Notes: booking.specialInstructions
      }
    };

    const response = await client.api(`/sites/${SHAREPOINT_SITE_ID}/lists/Bookings/items`)
      .post(listItem);

    return response;
  } catch (error) {
    console.error('Error creating SharePoint item:', error);
    throw error;
  }
}

// Dynamics 365 Integration
export async function createCustomerInDynamics(customer: any) {
  try {
    const tokenResponse = await credential.getToken([`${DYNAMICS_RESOURCE}/.default`]);
    
    const response = await fetch(`${DYNAMICS_RESOURCE}/api/data/v9.2/accounts`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokenResponse.token}`,
        'Content-Type': 'application/json',
        'OData-MaxVersion': '4.0',
        'OData-Version': '4.0',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: customer.customerName,
        emailaddress1: customer.customerEmail,
        telephone1: customer.customerPhone,
        address1_line1: customer.address,
        address1_city: 'Austin',
        address1_stateorprovince: 'TX',
        address1_postalcode: customer.zipCode,
        customertypecode: 2, // Customer
        accountcategorycode: 1, // Preferred Customer
        aura_servicetype: customer.serviceType,
        aura_frequency: customer.frequency,
        aura_building: customer.building || 'Rainey Street'
      })
    });

    if (!response.ok) {
      throw new Error(`Dynamics 365 error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating Dynamics 365 customer:', error);
    throw error;
  }
}

// Azure Blob Storage for Documents
export async function uploadDocumentToBlob(fileName: string, content: Buffer) {
  try {
    const blobServiceClient = new BlobServiceClient(
      `https://${STORAGE_ACCOUNT}.blob.core.windows.net`,
      credential
    );
    
    const containerClient = blobServiceClient.getContainerClient('bookings');
    const blockBlobClient = containerClient.getBlockBlobClient(fileName);
    
    await blockBlobClient.upload(content, content.length);
    
    return blockBlobClient.url;
  } catch (error) {
    console.error('Error uploading to blob storage:', error);
    throw error;
  }
}

// Cosmos DB for Booking Storage
export async function saveBookingToCosmos(booking: any) {
  try {
    const client = new CosmosClient({
      endpoint: COSMOS_ENDPOINT,
      key: COSMOS_KEY || await getSecretFromKeyVault('CosmosDBKey') || '',
    });

    const database = client.database('AuraSpringCleaning');
    const container = database.container('Bookings');

    const item = {
      id: `${booking.customerEmail}_${Date.now()}`,
      partitionKey: booking.zipCode || '78701',
      ...booking,
      createdAt: new Date().toISOString(),
      status: 'pending'
    };

    const { resource } = await container.items.create(item);
    return resource;
  } catch (error) {
    console.error('Error saving to Cosmos DB:', error);
    throw error;
  }
}

// Power Automate Integration
export async function triggerPowerAutomate(booking: any) {
  const POWER_AUTOMATE_URL = 'https://prod-00.southcentralus.logic.azure.com/workflows/YOUR_WORKFLOW_ID/triggers/manual/paths/invoke';
  
  try {
    const response = await fetch(POWER_AUTOMATE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(booking)
    });

    return response.ok;
  } catch (error) {
    console.error('Error triggering Power Automate:', error);
    return false;
  }
}

// Entra ID (Azure AD) User Management
export async function createCustomerUser(customer: any) {
  try {
    const client = getGraphClient();
    
    const user = {
      accountEnabled: true,
      displayName: customer.customerName,
      mailNickname: customer.customerEmail.split('@')[0],
      userPrincipalName: `${customer.customerEmail.split('@')[0]}@auraspringcleaning.com`,
      passwordProfile: {
        forceChangePasswordNextSignIn: true,
        password: generateTempPassword()
      },
      mail: customer.customerEmail,
      mobilePhone: customer.customerPhone,
      usageLocation: 'US'
    };

    const response = await client.api('/users').post(user);
    
    // Add to customer group
    await client.api(`/groups/{customer-group-id}/members/$ref`).post({
      '@odata.id': `https://graph.microsoft.com/v1.0/users/${response.id}`
    });

    return response;
  } catch (error) {
    console.error('Error creating Entra ID user:', error);
    return null;
  }
}

// Microsoft Bookings Integration
export async function createMicrosoftBooking(booking: any) {
  try {
    const client = getGraphClient();
    
    const bookingAppointment = {
      customerTimeZone: 'America/Chicago',
      customerName: booking.customerName,
      customerEmail: booking.customerEmail,
      customerPhone: booking.customerPhone,
      customerNotes: booking.specialInstructions,
      start: {
        dateTime: `${booking.serviceDate}T${booking.serviceTime}:00`,
        timeZone: 'America/Chicago'
      },
      end: {
        dateTime: calculateEndTime(booking.serviceDate, booking.serviceTime),
        timeZone: 'America/Chicago'
      },
      serviceId: getServiceId(booking.serviceType),
      serviceName: booking.serviceType,
      serviceLocation: {
        displayName: booking.address,
        address: {
          street: booking.address,
          city: 'Austin',
          state: 'TX',
          countryOrRegion: 'USA',
          postalCode: booking.zipCode
        }
      },
      priceType: 'fixedPrice',
      price: booking.totalPrice,
      reminders: [
        {
          message: 'Your Aura Spring Cleaning service is tomorrow!',
          offset: 'P1D'
        }
      ]
    };

    const response = await client.api('/bookingBusinesses/{business-id}/appointments')
      .post(bookingAppointment);

    return response;
  } catch (error) {
    console.error('Error creating Microsoft Booking:', error);
    return null;
  }
}

// Planner Task Creation for Teams
export async function createCleaningTask(booking: any) {
  try {
    const client = getGraphClient();
    
    const task = {
      planId: '{aura-cleaning-plan-id}',
      bucketId: '{new-bookings-bucket-id}',
      title: `${booking.serviceType} - ${booking.customerName}`,
      startDateTime: `${booking.serviceDate}T${booking.serviceTime}:00Z`,
      dueDateTime: calculateEndTime(booking.serviceDate, booking.serviceTime),
      assignments: {},
      details: {
        description: `
          Customer: ${booking.customerName}
          Phone: ${booking.customerPhone}
          Email: ${booking.customerEmail}
          Address: ${booking.address}
          Service: ${booking.serviceType}
          Price: $${booking.totalPrice}
          Notes: ${booking.specialInstructions || 'None'}
        `
      }
    };

    const response = await client.api('/planner/tasks').post(task);
    return response;
  } catch (error) {
    console.error('Error creating Planner task:', error);
    return null;
  }
}

// Helper Functions
function generateTempPassword(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%';
  let password = '';
  for (let i = 0; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password + 'Aa1!';
}

function calculateEndTime(date: string, time: string): string {
  const startDate = new Date(`${date}T${time}:00`);
  startDate.setHours(startDate.getHours() + 3); // 3-hour service window
  return startDate.toISOString();
}

function getServiceId(serviceType: string): string {
  const serviceMap: { [key: string]: string } = {
    'standard': 'service-standard-id',
    'deep': 'service-deep-id',
    'moveInOut': 'service-move-id',
    'airbnb': 'service-airbnb-id',
    'postConstruction': 'service-construction-id'
  };
  return serviceMap[serviceType] || 'service-standard-id';
}

// Main Integration Function
export async function processBookingWithAzure(booking: any) {
  const results = {
    cosmos: false,
    dynamics: false,
    sharepoint: false,
    planner: false,
    bookings: false,
    blob: false,
    powerAutomate: false
  };

  try {
    // Save to Cosmos DB
    const cosmosResult = await saveBookingToCosmos(booking);
    results.cosmos = !!cosmosResult;

    // Create customer in Dynamics 365
    const dynamicsResult = await createCustomerInDynamics(booking);
    results.dynamics = !!dynamicsResult;

    // Create SharePoint list item
    const sharepointResult = await createBookingInSharePoint(booking);
    results.sharepoint = !!sharepointResult;

    // Create Planner task
    const plannerResult = await createCleaningTask(booking);
    results.planner = !!plannerResult;

    // Create Microsoft Booking
    const bookingResult = await createMicrosoftBooking(booking);
    results.bookings = !!bookingResult;

    // Trigger Power Automate flow
    results.powerAutomate = await triggerPowerAutomate(booking);

    // Generate and upload booking document
    const bookingDoc = generateBookingDocument(booking);
    const blobUrl = await uploadDocumentToBlob(
      `bookings/${booking.customerEmail}_${Date.now()}.pdf`,
      bookingDoc
    );
    results.blob = !!blobUrl;

  } catch (error) {
    console.error('Error in Azure integration:', error);
  }

  return results;
}

function generateBookingDocument(booking: any): Buffer {
  // Generate PDF or document content
  // This is a placeholder - you'd use a library like PDFKit or similar
  const content = JSON.stringify(booking, null, 2);
  return Buffer.from(content);
}