/**
 * SharePoint Document Management Service
 * Centralized document storage and collaboration for Aura Spring Cleaning
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
 * SharePoint Document Library Structure
 */
export const DOCUMENT_LIBRARIES = {
  // Customer Documents
  CUSTOMERS: {
    name: 'Customers',
    description: 'Customer profiles, contracts, and service history',
    folders: [
      'Active Customers',
      'Inactive Customers',
      'VIP Customers',
      'Commercial Accounts'
    ]
  },
  
  // Service Records
  SERVICES: {
    name: 'Service Records',
    description: 'Service reports, before/after photos, and completion records',
    folders: [
      'Daily Reports',
      'Before-After Photos',
      'Customer Feedback',
      'Quality Audits'
    ]
  },
  
  // Financial Documents
  FINANCIAL: {
    name: 'Financial',
    description: 'Invoices, receipts, and payment records',
    folders: [
      'Invoices',
      'Receipts',
      'Expense Reports',
      'Tax Documents'
    ]
  },
  
  // Team Resources
  TEAM: {
    name: 'Team Resources',
    description: 'Training materials, schedules, and team documents',
    folders: [
      'Training Materials',
      'Schedules',
      'Policies & Procedures',
      'Team Announcements'
    ]
  },
  
  // Marketing Materials
  MARKETING: {
    name: 'Marketing',
    description: 'Marketing materials, campaigns, and brand assets',
    folders: [
      'Brand Assets',
      'Social Media',
      'Email Campaigns',
      'Promotional Materials'
    ]
  },
  
  // Legal & Compliance
  LEGAL: {
    name: 'Legal & Compliance',
    description: 'Contracts, insurance, licenses, and compliance documents',
    folders: [
      'Contracts',
      'Insurance',
      'Licenses',
      'Compliance Reports'
    ]
  }
};

/**
 * Create document library structure
 */
export async function createDocumentLibraries() {
  try {
    const client = getGraphClient();
    const results = [];
    
    for (const [key, library] of Object.entries(DOCUMENT_LIBRARIES)) {
      try {
        // Create document library
        const list = await client
          .api(`/sites/adminaccountbcd.sharepoint.com:/sites/AuraSpringCleaningTeams:/lists`)
          .post({
            displayName: library.name,
            description: library.description,
            list: {
              template: 'documentLibrary'
            }
          });
        
        console.log(`✅ Created library: ${library.name}`);
        
        // Create folders within library
        for (const folder of library.folders) {
          await createFolder(library.name, folder);
        }
        
        results.push({ library: library.name, success: true });
      } catch (error) {
        console.error(`Error creating library ${library.name}:`, error);
        results.push({ library: library.name, success: false, error });
      }
    }
    
    return results;
  } catch (error) {
    console.error('Error creating document libraries:', error);
    throw error;
  }
}

/**
 * Create folder in document library
 */
export async function createFolder(libraryName: string, folderPath: string) {
  try {
    const client = getGraphClient();
    
    const driveItem = await client
      .api(`/sites/adminaccountbcd.sharepoint.com:/sites/AuraSpringCleaningTeams:/drives`)
      .get();
    
    const driveId = driveItem.value[0].id;
    
    await client
      .api(`/drives/${driveId}/root:/${libraryName}/${folderPath}`)
      .put({
        folder: {},
        '@microsoft.graph.conflictBehavior': 'rename'
      });
    
    console.log(`📁 Created folder: ${libraryName}/${folderPath}`);
    return { success: true };
    
  } catch (error) {
    console.error(`Error creating folder ${folderPath}:`, error);
    return { success: false, error };
  }
}

/**
 * Upload document to SharePoint
 */
export async function uploadDocument(
  libraryName: string,
  folderPath: string,
  fileName: string,
  fileContent: Buffer | string,
  metadata?: any
) {
  try {
    const client = getGraphClient();
    
    // Get drive ID
    const drives = await client
      .api(`/sites/adminaccountbcd.sharepoint.com:/sites/AuraSpringCleaningTeams:/drives`)
      .get();
    
    const driveId = drives.value[0].id;
    
    // Upload file
    const uploadPath = folderPath 
      ? `/${libraryName}/${folderPath}/${fileName}`
      : `/${libraryName}/${fileName}`;
    
    const uploadedFile = await client
      .api(`/drives/${driveId}/root:${uploadPath}:/content`)
      .put(fileContent);
    
    // Add metadata if provided
    if (metadata) {
      await client
        .api(`/drives/${driveId}/items/${uploadedFile.id}`)
        .patch({
          ...metadata
        });
    }
    
    console.log(`📄 Uploaded document: ${uploadPath}`);
    return { 
      success: true, 
      fileId: uploadedFile.id,
      webUrl: uploadedFile.webUrl 
    };
    
  } catch (error) {
    console.error(`Error uploading document ${fileName}:`, error);
    return { success: false, error };
  }
}

/**
 * Create customer folder structure
 */
export async function createCustomerFolder(customerName: string, customerId: string) {
  try {
    const client = getGraphClient();
    const folderName = `${customerName.replace(/[^a-zA-Z0-9]/g, '_')}_${customerId}`;
    
    // Create main customer folder
    await createFolder('Customers/Active Customers', folderName);
    
    // Create subfolders
    const subfolders = [
      'Contracts',
      'Service History',
      'Invoices',
      'Photos',
      'Correspondence'
    ];
    
    for (const subfolder of subfolders) {
      await createFolder('Customers/Active Customers', `${folderName}/${subfolder}`);
    }
    
    console.log(`✅ Created customer folder structure for ${customerName}`);
    return { success: true, folderPath: `Customers/Active Customers/${folderName}` };
    
  } catch (error) {
    console.error('Error creating customer folder:', error);
    return { success: false, error };
  }
}

/**
 * Upload service photos
 */
export async function uploadServicePhotos(
  customerId: string,
  serviceDate: string,
  beforePhotos: string[],
  afterPhotos: string[]
) {
  try {
    const results = {
      beforePhotos: [] as any[],
      afterPhotos: [] as any[],
      success: false
    };
    
    const photoFolder = `Service Records/Before-After Photos/${serviceDate.replace(/\//g, '-')}`;
    
    // Upload before photos
    for (let i = 0; i < beforePhotos.length; i++) {
      const result = await uploadDocument(
        'Service Records',
        `Before-After Photos/${serviceDate.replace(/\//g, '-')}`,
        `${customerId}_before_${i + 1}.jpg`,
        beforePhotos[i],
        {
          description: `Before photo ${i + 1} for service on ${serviceDate}`
        }
      );
      results.beforePhotos.push(result);
    }
    
    // Upload after photos
    for (let i = 0; i < afterPhotos.length; i++) {
      const result = await uploadDocument(
        'Service Records',
        `Before-After Photos/${serviceDate.replace(/\//g, '-')}`,
        `${customerId}_after_${i + 1}.jpg`,
        afterPhotos[i],
        {
          description: `After photo ${i + 1} for service on ${serviceDate}`
        }
      );
      results.afterPhotos.push(result);
    }
    
    results.success = true;
    return results;
    
  } catch (error) {
    console.error('Error uploading service photos:', error);
    return { success: false, error };
  }
}

/**
 * Upload invoice to SharePoint
 */
export async function uploadInvoice(
  customerId: string,
  invoiceNumber: string,
  invoiceContent: Buffer | string,
  invoiceDate: Date
) {
  try {
    const year = invoiceDate.getFullYear();
    const month = String(invoiceDate.getMonth() + 1).padStart(2, '0');
    
    const result = await uploadDocument(
      'Financial',
      `Invoices/${year}/${month}`,
      `Invoice_${invoiceNumber}_${customerId}.pdf`,
      invoiceContent,
      {
        invoiceNumber,
        customerId,
        invoiceDate: invoiceDate.toISOString(),
        documentType: 'Invoice'
      }
    );
    
    return result;
    
  } catch (error) {
    console.error('Error uploading invoice:', error);
    return { success: false, error };
  }
}

/**
 * Get customer documents
 */
export async function getCustomerDocuments(customerId: string) {
  try {
    const client = getGraphClient();
    
    // Get drive ID
    const drives = await client
      .api(`/sites/adminaccountbcd.sharepoint.com:/sites/AuraSpringCleaningTeams:/drives`)
      .get();
    
    const driveId = drives.value[0].id;
    
    // Search for customer documents
    const searchResult = await client
      .api(`/drives/${driveId}/root/search(q='${customerId}')`)
      .get();
    
    const documents = searchResult.value.map((doc: any) => ({
      id: doc.id,
      name: doc.name,
      webUrl: doc.webUrl,
      size: doc.size,
      createdDateTime: doc.createdDateTime,
      lastModifiedDateTime: doc.lastModifiedDateTime,
      folder: doc.folder ? true : false
    }));
    
    return { success: true, documents };
    
  } catch (error) {
    console.error('Error getting customer documents:', error);
    return { success: false, error };
  }
}

/**
 * Create team schedule document
 */
export async function createTeamSchedule(scheduleData: any) {
  try {
    const date = new Date();
    const weekNumber = getWeekNumber(date);
    const year = date.getFullYear();
    
    const scheduleContent = generateScheduleHTML(scheduleData);
    
    const result = await uploadDocument(
      'Team Resources',
      `Schedules/${year}`,
      `Week_${weekNumber}_Schedule.html`,
      scheduleContent,
      {
        weekNumber,
        year,
        documentType: 'Schedule'
      }
    );
    
    return result;
    
  } catch (error) {
    console.error('Error creating team schedule:', error);
    return { success: false, error };
  }
}

// Helper functions
function getWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
}

function generateScheduleHTML(scheduleData: any): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Team Schedule - Week ${scheduleData.weekNumber}</title>
      <style>
        body { font-family: Arial, sans-serif; }
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #7c9768; color: white; }
        tr:nth-child(even) { background-color: #f2f2f2; }
      </style>
    </head>
    <body>
      <h1>Aura Spring Cleaning - Team Schedule</h1>
      <h2>Week ${scheduleData.weekNumber}, ${scheduleData.year}</h2>
      <table>
        <tr>
          <th>Date</th>
          <th>Time</th>
          <th>Customer</th>
          <th>Address</th>
          <th>Service Type</th>
          <th>Team Assigned</th>
        </tr>
        ${scheduleData.appointments.map((apt: any) => `
          <tr>
            <td>${apt.date}</td>
            <td>${apt.time}</td>
            <td>${apt.customerName}</td>
            <td>${apt.address}</td>
            <td>${apt.serviceType}</td>
            <td>${apt.teamAssigned}</td>
          </tr>
        `).join('')}
      </table>
    </body>
    </html>
  `;
}

export default {
  DOCUMENT_LIBRARIES,
  createDocumentLibraries,
  createFolder,
  uploadDocument,
  createCustomerFolder,
  uploadServicePhotos,
  uploadInvoice,
  getCustomerDocuments,
  createTeamSchedule
};