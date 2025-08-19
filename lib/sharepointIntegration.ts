// SharePoint Integration for Client Document Management
// Creates automated client folders and manages all client documents

import { GraphServiceClient } from '@microsoft/microsoft-graph-client';

// SharePoint Configuration
const SHAREPOINT_CONFIG = {
  tenantId: '753965c2-2a85-437e-a9c9-9f824df99584',
  clientId: '94d3924d-79c4-4280-975d-8223752343b8', // Claude-Master-Automation
  clientSecret: 'process.env.CLAUDE_AUTO_CLIENT_SECRET',
  siteId: 'bigchubbydog.sharepoint.com',
  clientsLibraryName: 'AuraSpringClients',
  documentsLibraryName: 'ClientDocuments'
};

// Client folder structure template
const CLIENT_FOLDER_STRUCTURE = {
  root: '{CustomerName} - {CustomerID}',
  subfolders: [
    'Invoices',
    'Service_History', 
    'Photos/Before',
    'Photos/After',
    'Contracts_and_Agreements',
    'Communications',
    'Team_Reports',
    'Cleaning_Plans',
    'Feedback_and_Reviews'
  ]
};

// Authentication for SharePoint
class SharePointAuthProvider {
  private accessToken: string | null = null;
  private tokenExpiry: number = 0;

  async getAccessToken(): Promise<string> {
    // Check if token is still valid (with 5-minute buffer)
    if (this.accessToken && Date.now() < this.tokenExpiry - 300000) {
      return this.accessToken;
    }

    try {
      console.log('🔐 Acquiring SharePoint access token...');
      
      const tokenUrl = `https://login.microsoftonline.com/${SHAREPOINT_CONFIG.tenantId}/oauth2/v2.0/token`;
      
      const body = new URLSearchParams({
        client_id: SHAREPOINT_CONFIG.clientId,
        client_secret: SHAREPOINT_CONFIG.clientSecret,
        scope: 'https://graph.microsoft.com/.default',
        grant_type: 'client_credentials'
      });

      const response = await fetch(tokenUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body.toString()
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Token acquisition failed: ${response.status} - ${errorText}`);
      }

      const tokenData = await response.json();
      
      this.accessToken = tokenData.access_token;
      this.tokenExpiry = Date.now() + (tokenData.expires_in * 1000);
      
      console.log('✅ SharePoint access token acquired successfully');
      return this.accessToken;

    } catch (error) {
      console.error('❌ Failed to acquire SharePoint token:', error);
      throw new Error(`SharePoint authentication failed: ${error.message}`);
    }
  }
}

const authProvider = new SharePointAuthProvider();

// Client folder management interface
export interface ClientFolderStructure {
  rootFolderId: string;
  rootFolderPath: string;
  subfolders: {
    [key: string]: {
      id: string;
      path: string;
      webUrl: string;
    };
  };
  createdDate: Date;
  lastUpdated: Date;
}

export interface ClientDocument {
  id: string;
  name: string;
  folder: string;
  webUrl: string;
  downloadUrl: string;
  size: number;
  createdDate: Date;
  modifiedDate: Date;
  uploadedBy: string;
  documentType: 'invoice' | 'photo_before' | 'photo_after' | 'contract' | 'report' | 'communication' | 'other';
}

// Photo management interfaces specifically for cleaning teams
export interface CleaningPhoto {
  filename: string;
  data: Buffer;
  description?: string;
  location?: string; // Room/area where photo was taken
  timestamp?: Date;
  teamMember: string;
}

export interface PhotoUploadResult {
  success: boolean;
  uploadedPhotos: ClientDocument[];
  failedUploads: string[];
  totalUploaded: number;
}

/**
 * Create comprehensive client folder structure in SharePoint
 */
export async function createClientFolderStructure(
  customerName: string,
  customerEmail: string,
  customerId?: string
): Promise<ClientFolderStructure> {
  try {
    console.log(`📁 Creating SharePoint folder structure for ${customerName}...`);
    
    const accessToken = await authProvider.getAccessToken();
    const clientId = customerId || generateClientId(customerName, customerEmail);
    
    // Sanitize folder name for SharePoint
    const sanitizedName = sanitizeFolderName(`${customerName} - ${clientId}`);
    
    // Create root client folder
    const rootFolder = await createFolder(accessToken, '', sanitizedName);
    
    if (!rootFolder) {
      throw new Error('Failed to create root client folder');
    }

    console.log(`✅ Created root folder: ${sanitizedName}`);
    
    // Create all subfolders
    const subfolders: { [key: string]: any } = {};
    
    for (const subfolderName of CLIENT_FOLDER_STRUCTURE.subfolders) {
      try {
        const subfolder = await createFolder(accessToken, sanitizedName, subfolderName);
        if (subfolder) {
          subfolders[subfolderName.replace('/', '_')] = {
            id: subfolder.id,
            path: `${sanitizedName}/${subfolderName}`,
            webUrl: subfolder.webUrl
          };
          console.log(`  ✅ Created subfolder: ${subfolderName}`);
        }
      } catch (error) {
        console.warn(`⚠️ Failed to create subfolder ${subfolderName}:`, error.message);
      }
    }

    // Create client profile readme file
    await createClientProfileReadme(accessToken, sanitizedName, customerName, customerEmail);

    const folderStructure: ClientFolderStructure = {
      rootFolderId: rootFolder.id,
      rootFolderPath: sanitizedName,
      subfolders,
      createdDate: new Date(),
      lastUpdated: new Date()
    };

    console.log(`🎉 Client folder structure created successfully for ${customerName}`);
    return folderStructure;

  } catch (error) {
    console.error('❌ Error creating client folder structure:', error);
    throw error;
  }
}

/**
 * Upload before/after photos from cleaning team - MAIN PHOTO MANAGEMENT FUNCTION
 */
export async function uploadCleaningPhotos(
  clientFolderPath: string,
  photos: {
    beforePhotos: CleaningPhoto[];
    afterPhotos: CleaningPhoto[];
  },
  serviceDetails: {
    serviceDate: string;
    bookingId: string;
    teamMembers: string[];
    serviceType: string;
    location: string;
  }
): Promise<PhotoUploadResult> {
  try {
    console.log(`📸 Uploading cleaning photos for ${clientFolderPath}...`);
    
    const result: PhotoUploadResult = {
      success: false,
      uploadedPhotos: [],
      failedUploads: [],
      totalUploaded: 0
    };

    // Upload before photos
    console.log(`📷 Uploading ${photos.beforePhotos.length} before photos...`);
    for (const photo of photos.beforePhotos) {
      try {
        const timestampedName = generatePhotoFileName(
          serviceDetails.serviceDate,
          'Before',
          photo.filename,
          photo.location,
          serviceDetails.bookingId
        );
        
        const uploaded = await uploadClientDocument(
          clientFolderPath,
          'Photos/Before',
          timestampedName,
          photo.data,
          'photo_before',
          photo.teamMember
        );
        
        if (uploaded) {
          result.uploadedPhotos.push(uploaded);
          console.log(`  ✅ Uploaded before photo: ${timestampedName}`);
        } else {
          result.failedUploads.push(photo.filename);
          console.log(`  ❌ Failed to upload before photo: ${photo.filename}`);
        }
      } catch (error) {
        result.failedUploads.push(photo.filename);
        console.error(`❌ Error uploading before photo ${photo.filename}:`, error);
      }
    }

    // Upload after photos
    console.log(`📷 Uploading ${photos.afterPhotos.length} after photos...`);
    for (const photo of photos.afterPhotos) {
      try {
        const timestampedName = generatePhotoFileName(
          serviceDetails.serviceDate,
          'After',
          photo.filename,
          photo.location,
          serviceDetails.bookingId
        );
        
        const uploaded = await uploadClientDocument(
          clientFolderPath,
          'Photos/After',
          timestampedName,
          photo.data,
          'photo_after',
          photo.teamMember
        );
        
        if (uploaded) {
          result.uploadedPhotos.push(uploaded);
          console.log(`  ✅ Uploaded after photo: ${timestampedName}`);
        } else {
          result.failedUploads.push(photo.filename);
          console.log(`  ❌ Failed to upload after photo: ${photo.filename}`);
        }
      } catch (error) {
        result.failedUploads.push(photo.filename);
        console.error(`❌ Error uploading after photo ${photo.filename}:`, error);
      }
    }

    // Create photo summary report
    await createPhotoSummaryReport(
      clientFolderPath,
      serviceDetails,
      result.uploadedPhotos,
      result.failedUploads
    );

    result.totalUploaded = result.uploadedPhotos.length;
    result.success = result.totalUploaded > 0;
    
    console.log(`📊 Photo upload summary: ${result.totalUploaded} uploaded, ${result.failedUploads.length} failed`);
    return result;

  } catch (error) {
    console.error('❌ Error uploading cleaning photos:', error);
    return {
      success: false,
      uploadedPhotos: [],
      failedUploads: photos.beforePhotos.concat(photos.afterPhotos).map(p => p.filename),
      totalUploaded: 0
    };
  }
}

/**
 * Upload document to specific client folder
 */
export async function uploadClientDocument(
  clientFolderPath: string,
  subfolder: string,
  fileName: string,
  fileContent: Buffer | Blob,
  documentType: ClientDocument['documentType'],
  uploadedBy: string = 'System'
): Promise<ClientDocument | null> {
  try {
    console.log(`📄 Uploading ${fileName} to ${clientFolderPath}/${subfolder}...`);
    
    const accessToken = await authProvider.getAccessToken();
    const fullPath = `${clientFolderPath}/${subfolder}/${fileName}`;
    
    // Upload file to SharePoint
    const uploadUrl = `https://graph.microsoft.com/v1.0/sites/${SHAREPOINT_CONFIG.siteId}/drive/root:/${SHAREPOINT_CONFIG.clientsLibraryName}/${fullPath}:/content`;
    
    const response = await fetch(uploadUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/octet-stream'
      },
      body: fileContent
    });

    if (response.ok) {
      const fileData = await response.json();
      
      const document: ClientDocument = {
        id: fileData.id,
        name: fileData.name,
        folder: subfolder,
        webUrl: fileData.webUrl,
        downloadUrl: fileData['@microsoft.graph.downloadUrl'],
        size: fileData.size,
        createdDate: new Date(fileData.createdDateTime),
        modifiedDate: new Date(fileData.lastModifiedDateTime),
        uploadedBy,
        documentType
      };

      console.log(`✅ Successfully uploaded ${fileName}`);
      return document;
    } else {
      const error = await response.text();
      console.error(`❌ Failed to upload ${fileName}:`, error);
      return null;
    }

  } catch (error) {
    console.error('❌ Error uploading document:', error);
    return null;
  }
}

/**
 * Generate invoice and upload to client folder
 */
export async function uploadInvoice(
  clientFolderPath: string,
  invoiceData: {
    invoiceNumber: string;
    serviceDate: string;
    amount: number;
    serviceType: string;
    customerName: string;
    items: Array<{ description: string; amount: number }>;
  }
): Promise<ClientDocument | null> {
  try {
    console.log(`💰 Creating and uploading invoice ${invoiceData.invoiceNumber}...`);
    
    // Generate invoice PDF content (simplified - in production use a proper PDF library)
    const invoiceContent = generateInvoicePDF(invoiceData);
    const fileName = `Invoice_${invoiceData.invoiceNumber}_${invoiceData.serviceDate}.pdf`;
    
    return await uploadClientDocument(
      clientFolderPath,
      'Invoices',
      fileName,
      invoiceContent,
      'invoice',
      'Billing System'
    );

  } catch (error) {
    console.error('❌ Error uploading invoice:', error);
    return null;
  }
}

/**
 * Get all documents for a client
 */
export async function getClientDocuments(clientFolderPath: string): Promise<ClientDocument[]> {
  try {
    console.log(`📋 Retrieving documents for ${clientFolderPath}...`);
    
    const accessToken = await authProvider.getAccessToken();
    
    // Get all files in client folder recursively
    const searchUrl = `https://graph.microsoft.com/v1.0/sites/${SHAREPOINT_CONFIG.siteId}/drive/root:/${SHAREPOINT_CONFIG.clientsLibraryName}/${clientFolderPath}:/children?$expand=children($expand=children)`;
    
    const response = await fetch(searchUrl, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      const data = await response.json();
      const documents: ClientDocument[] = [];
      
      // Process all files recursively
      processFilesRecursively(data.value, documents, '');
      
      console.log(`✅ Retrieved ${documents.length} documents for ${clientFolderPath}`);
      return documents;
    } else {
      console.error('❌ Failed to retrieve client documents');
      return [];
    }

  } catch (error) {
    console.error('❌ Error retrieving client documents:', error);
    return [];
  }
}

// Helper functions

async function createFolder(accessToken: string, parentPath: string, folderName: string): Promise<any> {
  const createUrl = `https://graph.microsoft.com/v1.0/sites/${SHAREPOINT_CONFIG.siteId}/drive/root:/${SHAREPOINT_CONFIG.clientsLibraryName}/${parentPath}:/children`;
  
  const folderData = {
    name: folderName,
    folder: {},
    '@microsoft.graph.conflictBehavior': 'replace'
  };

  const response = await fetch(createUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(folderData)
  });

  if (response.ok) {
    return await response.json();
  } else {
    const error = await response.text();
    throw new Error(`Failed to create folder ${folderName}: ${error}`);
  }
}

function sanitizeFolderName(name: string): string {
  // Remove invalid characters for SharePoint folder names
  return name.replace(/[<>:"/\\|?*]/g, '_').trim();
}

function generateClientId(customerName: string, customerEmail: string): string {
  const timestamp = Date.now().toString(36);
  const nameHash = customerName.replace(/\s+/g, '').substring(0, 3).toUpperCase();
  const emailHash = customerEmail.split('@')[0].substring(0, 3).toUpperCase();
  return `ASC-${nameHash}${emailHash}-${timestamp}`;
}

function generatePhotoFileName(
  serviceDate: string,
  type: 'Before' | 'After',
  originalName: string,
  location?: string,
  bookingId?: string
): string {
  const timestamp = new Date().toISOString().slice(0, 16).replace(/:/g, '-');
  const locationPart = location ? `_${location.replace(/\s+/g, '_')}` : '';
  const bookingPart = bookingId ? `_${bookingId}` : '';
  const extension = originalName.substring(originalName.lastIndexOf('.'));
  
  return `${serviceDate}_${type}${locationPart}${bookingPart}_${timestamp}${extension}`;
}

async function createPhotoSummaryReport(
  clientFolderPath: string,
  serviceDetails: any,
  uploadedPhotos: ClientDocument[],
  failedUploads: string[]
): Promise<void> {
  const reportContent = `# Photo Upload Summary - ${serviceDetails.serviceDate}

## Service Details
- **Date**: ${serviceDetails.serviceDate}
- **Booking ID**: ${serviceDetails.bookingId}
- **Service Type**: ${serviceDetails.serviceType}
- **Location**: ${serviceDetails.location}
- **Team Members**: ${serviceDetails.teamMembers.join(', ')}

## Upload Results
- **Total Photos Uploaded**: ${uploadedPhotos.length}
- **Failed Uploads**: ${failedUploads.length}

### Successfully Uploaded Photos
${uploadedPhotos.map(photo => `- [${photo.name}](${photo.webUrl}) (${photo.folder})`).join('\n')}

### Failed Uploads
${failedUploads.map(file => `- ${file}`).join('\n')}

---
*Report generated: ${new Date().toLocaleString()}*
*Generated by: Aura Spring Cleaning Management System*
`;

  const buffer = Buffer.from(reportContent, 'utf8');
  const fileName = `Photo_Summary_${serviceDetails.serviceDate}_${serviceDetails.bookingId}.md`;
  
  await uploadClientDocument(
    clientFolderPath,
    'Team_Reports',
    fileName,
    buffer,
    'report',
    'System'
  );
}

async function createClientProfileReadme(
  accessToken: string,
  clientFolderPath: string,
  customerName: string,
  customerEmail: string
): Promise<void> {
  const readmeContent = `# Client Profile: ${customerName}

## Contact Information
- **Name:** ${customerName}
- **Email:** ${customerEmail}
- **Created:** ${new Date().toLocaleDateString()}

## Folder Structure
- **Invoices:** All billing documents and payment records
- **Service_History:** Records of all cleaning services provided
- **Photos/Before:** Before photos from each cleaning service
- **Photos/After:** After photos from each cleaning service  
- **Contracts_and_Agreements:** Service agreements and contracts
- **Communications:** Email correspondence and notes
- **Team_Reports:** Reports from assigned cleaning teams
- **Cleaning_Plans:** Customized cleaning plans and preferences
- **Feedback_and_Reviews:** Customer feedback and reviews

## Photo Management Guidelines
- All before/after photos are automatically organized by service date
- Photos include metadata: team member, location, timestamp
- Photo summary reports generated for each service

## Managed by Aura Spring Cleaning
Automated client management system powered by AI and Microsoft 365 integration.
`;

  const buffer = Buffer.from(readmeContent, 'utf8');
  
  await uploadClientDocument(
    clientFolderPath.replace(clientFolderPath, ''),
    clientFolderPath,
    'README.md',
    buffer,
    'other',
    'System'
  );
}

function generateInvoicePDF(invoiceData: any): Buffer {
  // Simplified invoice generation - in production use libraries like PDFKit or jsPDF
  const invoiceText = `
INVOICE #${invoiceData.invoiceNumber}

Date: ${invoiceData.serviceDate}
Customer: ${invoiceData.customerName}

Service Details:
${invoiceData.items.map(item => `- ${item.description}: $${item.amount}`).join('\n')}

Total Amount: $${invoiceData.amount}

Thank you for choosing Aura Spring Cleaning!
  `;
  
  return Buffer.from(invoiceText, 'utf8');
}

function processFilesRecursively(items: any[], documents: ClientDocument[], currentPath: string): void {
  for (const item of items) {
    if (item.file) {
      // It's a file
      const folderName = currentPath.split('/').pop() || 'root';
      const documentType = determineDocumentType(item.name, folderName);
      
      documents.push({
        id: item.id,
        name: item.name,
        folder: currentPath,
        webUrl: item.webUrl,
        downloadUrl: item['@microsoft.graph.downloadUrl'] || '',
        size: item.size,
        createdDate: new Date(item.createdDateTime),
        modifiedDate: new Date(item.lastModifiedDateTime),
        uploadedBy: item.createdBy?.user?.displayName || 'Unknown',
        documentType
      });
    } else if (item.folder && item.children) {
      // It's a folder with children
      processFilesRecursively(item.children, documents, `${currentPath}/${item.name}`.replace(/^\//, ''));
    }
  }
}

function determineDocumentType(fileName: string, folderName: string): ClientDocument['documentType'] {
  const lowerFileName = fileName.toLowerCase();
  const lowerFolderName = folderName.toLowerCase();
  
  if (lowerFolderName.includes('invoice')) return 'invoice';
  if (lowerFolderName.includes('before')) return 'photo_before';
  if (lowerFolderName.includes('after')) return 'photo_after';
  if (lowerFolderName.includes('contract')) return 'contract';
  if (lowerFolderName.includes('report')) return 'report';
  if (lowerFolderName.includes('communication')) return 'communication';
  
  if (lowerFileName.includes('invoice')) return 'invoice';
  if (lowerFileName.includes('before')) return 'photo_before';
  if (lowerFileName.includes('after')) return 'photo_after';
  if (lowerFileName.includes('contract')) return 'contract';
  if (lowerFileName.includes('report')) return 'report';
  
  return 'other';
}

// Export configuration for external use
export { SHAREPOINT_CONFIG, CLIENT_FOLDER_STRUCTURE };