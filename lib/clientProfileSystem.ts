// Comprehensive Client Profile Management System
// Integrates Firebase, Dynamics 365, SharePoint, Teams, and AI systems

import { syncBookingToDynamics } from './dynamics365Integration';
import { 
  createClientFolderStructure, 
  uploadClientDocument, 
  uploadCleaningPhotos, 
  uploadInvoice,
  getClientDocuments,
  ClientFolderStructure,
  ClientDocument,
  CleaningPhoto,
  PhotoUploadResult
} from './sharepointIntegration';
import { createTeamsCalendarEvent } from './microsoftIntegration';

// Firebase imports - assuming these exist from your current setup
interface FirebaseBooking {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: string;
  serviceDate: string;
  serviceTime: string;
  serviceType: string;
  squareFeet: number;
  bedrooms: number;
  bathrooms: number;
  totalPrice: number;
  frequency: string;
  addOns?: string[];
  specialInstructions?: string;
  keyInstructions?: string;
  petInfo?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Comprehensive client profile interface
export interface ComprehensiveClientProfile {
  // Basic Information
  clientId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  primaryAddress: string;
  
  // Account Details
  accountStatus: 'active' | 'inactive' | 'pending' | 'suspended';
  customerTier: 'standard' | 'premium' | 'vip';
  lifetimeValue: number;
  averageOrderValue: number;
  paymentStatus: 'current' | 'overdue' | 'collection';
  
  // Service History
  totalBookings: number;
  completedCleanings: number;
  cancelledBookings: number;
  lastServiceDate?: Date;
  nextScheduledService?: Date;
  preferredServices: string[];
  frequencyPattern: 'weekly' | 'biweekly' | 'monthly' | 'irregular';
  
  // Property Information
  properties: ClientProperty[];
  primaryPropertyId: string;
  
  // Team Preferences
  preferredTeamMembers: string[];
  teamRatings: { [teamMemberId: string]: number };
  specialRequirements: string[];
  
  // Document Management
  sharepointFolder: ClientFolderStructure;
  documentCount: number;
  lastDocumentUpdate: Date;
  
  // Financial Information
  totalSpent: number;
  outstandingBalance: number;
  invoices: InvoiceRecord[];
  paymentMethods: PaymentMethod[];
  
  // Communication History
  communicationLog: CommunicationRecord[];
  feedbackScores: number[];
  averageSatisfaction: number;
  
  // AI Insights
  aiProfile: {
    priorityScore: number; // 0-100
    churnRisk: 'low' | 'medium' | 'high';
    upsellOpportunities: string[];
    predictedNextBooking?: Date;
    recommendedServices: string[];
    personalizedNotes: string[];
  };
  
  // System Integration
  dynamicsContactId?: string;
  dynamicsLeadId?: string;
  dynamicsOpportunityId?: string;
  teamsChannelId?: string;
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  lastActivityDate: Date;
  createdBy: string;
  managedBy: string[];
}

export interface ClientProperty {
  propertyId: string;
  address: string;
  propertyType: 'house' | 'apartment' | 'condo' | 'office' | 'airbnb';
  squareFeet: number;
  bedrooms: number;
  bathrooms: number;
  specialFeatures: string[];
  cleaningNotes: string;
  keyInstructions: string;
  petInfo?: string;
  isActive: boolean;
}

export interface InvoiceRecord {
  invoiceId: string;
  invoiceNumber: string;
  date: Date;
  amount: number;
  status: 'paid' | 'pending' | 'overdue' | 'cancelled';
  serviceDate: Date;
  services: string[];
  documentUrl?: string;
  paidDate?: Date;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'bank' | 'cash' | 'check';
  last4?: string;
  isDefault: boolean;
  isActive: boolean;
}

export interface CommunicationRecord {
  id: string;
  date: Date;
  type: 'email' | 'phone' | 'sms' | 'teams' | 'in_person' | 'chat';
  direction: 'inbound' | 'outbound';
  subject: string;
  summary: string;
  teamMember: string;
  outcome: string;
  followUpRequired: boolean;
  followUpDate?: Date;
}

// In-memory storage for demo (replace with actual Firebase/database integration)
const clientProfiles = new Map<string, ComprehensiveClientProfile>();

/**
 * Create comprehensive client profile when new customer books
 */
async function createComprehensiveClientProfile(
  booking: FirebaseBooking,
  forceCreate: boolean = false
): Promise<ComprehensiveClientProfile> {
  try {
    console.log(`👤 Creating comprehensive client profile for ${booking.customerName}...`);
    
    // Check if profile already exists
    const existingProfile = await getClientProfile(booking.customerEmail);
    if (existingProfile && !forceCreate) {
      console.log(`✅ Client profile already exists, updating...`);
      return await updateClientProfile(existingProfile.clientId, booking);
    }
    
    // Generate unique client ID
    const clientId = generateClientId(booking.customerName, booking.customerEmail);
    
    // Step 1: Create SharePoint folder structure
    console.log('📁 Creating SharePoint client folders...');
    const sharepointFolder = await createClientFolderStructure(
      booking.customerName,
      booking.customerEmail,
      clientId
    );
    
    // Step 2: Sync with Dynamics 365
    console.log('🔄 Syncing with Dynamics 365...');
    const dynamicsResult = await syncBookingToDynamics({
      customerName: booking.customerName,
      customerEmail: booking.customerEmail,
      customerPhone: booking.customerPhone,
      serviceType: booking.serviceType,
      serviceDate: booking.serviceDate,
      serviceTime: booking.serviceTime,
      address: booking.address,
      squareFeet: booking.squareFeet,
      bedrooms: booking.bedrooms,
      bathrooms: booking.bathrooms,
      totalPrice: booking.totalPrice,
      frequency: booking.frequency,
      addOns: booking.addOns || [],
      specialInstructions: booking.specialInstructions || ''
    });
    
    // Step 3: Get AI insights for new client
    console.log('🤖 Generating AI insights...');
    const aiProfile = await generateAIProfile(booking, []);
    
    // Step 4: Create primary property record
    const primaryProperty: ClientProperty = {
      propertyId: `${clientId}-PROP-001`,
      address: booking.address,
      propertyType: 'house', // Default, can be updated
      squareFeet: booking.squareFeet,
      bedrooms: booking.bedrooms,
      bathrooms: booking.bathrooms,
      specialFeatures: [],
      cleaningNotes: booking.specialInstructions || '',
      keyInstructions: booking.keyInstructions || '',
      petInfo: booking.petInfo || '',
      isActive: true
    };
    
    // Step 5: Create comprehensive profile
    const profile: ComprehensiveClientProfile = {
      clientId,
      customerName: booking.customerName,
      customerEmail: booking.customerEmail,
      customerPhone: booking.customerPhone,
      primaryAddress: booking.address,
      
      accountStatus: 'active',
      customerTier: 'standard',
      lifetimeValue: booking.totalPrice,
      averageOrderValue: booking.totalPrice,
      paymentStatus: 'current',
      
      totalBookings: 1,
      completedCleanings: 0,
      cancelledBookings: 0,
      preferredServices: [booking.serviceType],
      frequencyPattern: booking.frequency as any,
      
      properties: [primaryProperty],
      primaryPropertyId: primaryProperty.propertyId,
      
      preferredTeamMembers: [],
      teamRatings: {},
      specialRequirements: booking.specialInstructions ? [booking.specialInstructions] : [],
      
      sharepointFolder,
      documentCount: 1, // README file
      lastDocumentUpdate: new Date(),
      
      totalSpent: booking.totalPrice,
      outstandingBalance: 0,
      invoices: [],
      paymentMethods: [],
      
      communicationLog: [],
      feedbackScores: [],
      averageSatisfaction: 0,
      
      aiProfile,
      
      dynamicsContactId: dynamicsResult.contact?.contactid,
      dynamicsLeadId: dynamicsResult.lead?.leadid,
      dynamicsOpportunityId: dynamicsResult.opportunity?.opportunityid,
      
      createdAt: new Date(),
      updatedAt: new Date(),
      lastActivityDate: new Date(),
      createdBy: 'System',
      managedBy: ['Valerie Boatman']
    };
    
    // Step 6: Save to storage (replace with Firebase/database)
    console.log('💾 Saving client profile...');
    clientProfiles.set(clientId, profile);
    
    // Step 7: Create welcome communication record
    await addCommunicationRecord(clientId, {
      type: 'email',
      direction: 'outbound',
      subject: 'Welcome to Aura Spring Cleaning!',
      summary: 'Welcome email sent with booking confirmation and next steps',
      teamMember: 'System',
      outcome: 'sent',
      followUpRequired: false
    });
    
    console.log(`🎉 Comprehensive client profile created successfully for ${booking.customerName}!`);
    return profile;
    
  } catch (error) {
    console.error('❌ Error creating comprehensive client profile:', error);
    throw error;
  }
}

/**
 * Get client profile by email or client ID
 */
async function getClientProfile(
  identifier: string,
  byEmail: boolean = true
): Promise<ComprehensiveClientProfile | null> {
  try {
    if (byEmail) {
      // Search by email
      for (const [id, profile] of clientProfiles) {
        if (profile.customerEmail === identifier) {
          return profile;
        }
      }
    } else {
      // Get by client ID
      return clientProfiles.get(identifier) || null;
    }
    
    return null;
  } catch (error) {
    console.error('❌ Error getting client profile:', error);
    return null;
  }
}

/**
 * Update client profile with new booking
 */
async function updateClientProfile(
  clientId: string,
  booking: FirebaseBooking
): Promise<ComprehensiveClientProfile> {
  try {
    console.log(`🔄 Updating client profile ${clientId} with new booking...`);
    
    const profile = await getClientProfile(clientId, false);
    if (!profile) {
      throw new Error(`Client profile ${clientId} not found`);
    }
    
    // Update service history
    const totalBookings = profile.totalBookings + 1;
    const totalSpent = profile.totalSpent + booking.totalPrice;
    const averageOrderValue = totalSpent / totalBookings;
    
    // Update preferred services
    const preferredServices = [...profile.preferredServices];
    if (!preferredServices.includes(booking.serviceType)) {
      preferredServices.push(booking.serviceType);
    }
    
    // Update AI profile with new data
    const allBookings = [booking]; // In real implementation, get all customer bookings
    const updatedAIProfile = await generateAIProfile(booking, allBookings);
    
    const updatedProfile = {
      ...profile,
      totalBookings,
      totalSpent,
      averageOrderValue,
      lifetimeValue: totalSpent,
      preferredServices,
      lastActivityDate: new Date(),
      aiProfile: updatedAIProfile,
      updatedAt: new Date()
    };
    
    // Update in storage
    clientProfiles.set(clientId, updatedProfile);
    
    console.log(`✅ Client profile ${clientId} updated successfully`);
    return updatedProfile;
    
  } catch (error) {
    console.error('❌ Error updating client profile:', error);
    throw error;
  }
}

/**
 * Add service completion with photos - MAIN PHOTO INTEGRATION FUNCTION
 */
async function completeServiceWithPhotos(
  clientId: string,
  serviceDetails: {
    bookingId: string;
    serviceDate: string;
    serviceType: string;
    teamMembers: string[];
    beforePhotos: CleaningPhoto[];
    afterPhotos: CleaningPhoto[];
    teamReport: string;
    customerSatisfaction?: number;
    duration: number;
    notes: string;
    location: string;
  }
): Promise<PhotoUploadResult> {
  try {
    console.log(`📸 Completing service with photos for client ${clientId}...`);
    
    const profile = await getClientProfile(clientId, false);
    if (!profile) {
      throw new Error(`Client profile ${clientId} not found`);
    }
    
    // Upload photos to SharePoint using the new photo management system
    const photoUploadResult = await uploadCleaningPhotos(
      profile.sharepointFolder.rootFolderPath,
      {
        beforePhotos: serviceDetails.beforePhotos,
        afterPhotos: serviceDetails.afterPhotos
      },
      {
        serviceDate: serviceDetails.serviceDate,
        bookingId: serviceDetails.bookingId,
        teamMembers: serviceDetails.teamMembers,
        serviceType: serviceDetails.serviceType,
        location: serviceDetails.location
      }
    );
    
    // Create team report document
    const reportContent = generateTeamReport(serviceDetails, profile);
    const reportFileName = `Service_Report_${serviceDetails.serviceDate}_${serviceDetails.bookingId}.md`;
    
    const reportDocument = await uploadClientDocument(
      profile.sharepointFolder.rootFolderPath,
      'Team_Reports',
      reportFileName,
      Buffer.from(reportContent, 'utf8'),
      'report',
      serviceDetails.teamMembers.join(', ')
    );
    
    // Update client profile with completion data
    const updates = {
      ...profile,
      completedCleanings: profile.completedCleanings + 1,
      lastServiceDate: new Date(serviceDetails.serviceDate),
      documentCount: profile.documentCount + photoUploadResult.totalUploaded + 1,
      lastDocumentUpdate: new Date(),
      updatedAt: new Date()
    };
    
    // Add satisfaction score if provided
    if (serviceDetails.customerSatisfaction) {
      const feedbackScores = [...profile.feedbackScores, serviceDetails.customerSatisfaction];
      const averageSatisfaction = feedbackScores.reduce((a, b) => a + b, 0) / feedbackScores.length;
      
      updates.feedbackScores = feedbackScores;
      updates.averageSatisfaction = averageSatisfaction;
    }
    
    clientProfiles.set(clientId, updates);
    
    // Add communication record for service completion
    await addCommunicationRecord(clientId, {
      type: 'teams',
      direction: 'outbound',
      subject: `Service completed - ${serviceDetails.serviceDate}`,
      summary: `Service completed by ${serviceDetails.teamMembers.join(', ')}. ${photoUploadResult.totalUploaded} photos uploaded.`,
      teamMember: serviceDetails.teamMembers[0],
      outcome: 'completed',
      followUpRequired: false
    });
    
    console.log(`✅ Service completed with ${photoUploadResult.totalUploaded} photos uploaded`);
    return photoUploadResult;
    
  } catch (error) {
    console.error('❌ Error completing service with photos:', error);
    return {
      success: false,
      uploadedPhotos: [],
      failedUploads: [],
      totalUploaded: 0
    };
  }
}

/**
 * Generate and upload invoice
 */
async function generateClientInvoice(
  clientId: string,
  invoiceData: {
    bookingId: string;
    serviceDate: string;
    amount: number;
    serviceType: string;
    items: Array<{ description: string; amount: number }>;
    dueDate?: Date;
  }
): Promise<InvoiceRecord | null> {
  try {
    console.log(`💰 Generating invoice for client ${clientId}...`);
    
    const profile = await getClientProfile(clientId, false);
    if (!profile) {
      throw new Error(`Client profile ${clientId} not found`);
    }
    
    // Generate invoice number
    const invoiceNumber = `ASC-${Date.now().toString(36).toUpperCase()}`;
    
    // Upload invoice to SharePoint
    const invoiceDocument = await uploadInvoice(
      profile.sharepointFolder.rootFolderPath,
      {
        invoiceNumber,
        serviceDate: invoiceData.serviceDate,
        amount: invoiceData.amount,
        serviceType: invoiceData.serviceType,
        customerName: profile.customerName,
        items: invoiceData.items
      }
    );
    
    if (!invoiceDocument) {
      throw new Error('Failed to upload invoice document');
    }
    
    // Create invoice record
    const invoiceRecord: InvoiceRecord = {
      invoiceId: `INV-${Date.now()}`,
      invoiceNumber,
      date: new Date(),
      amount: invoiceData.amount,
      status: 'pending',
      serviceDate: new Date(invoiceData.serviceDate),
      services: [invoiceData.serviceType],
      documentUrl: invoiceDocument.webUrl
    };
    
    // Update client profile with new invoice
    const updatedInvoices = [...profile.invoices, invoiceRecord];
    const outstandingBalance = profile.outstandingBalance + invoiceData.amount;
    
    const updatedProfile = {
      ...profile,
      invoices: updatedInvoices,
      outstandingBalance,
      documentCount: profile.documentCount + 1,
      lastDocumentUpdate: new Date(),
      updatedAt: new Date()
    };
    
    clientProfiles.set(clientId, updatedProfile);
    
    console.log(`✅ Invoice ${invoiceNumber} generated and uploaded`);
    return invoiceRecord;
    
  } catch (error) {
    console.error('❌ Error generating client invoice:', error);
    return null;
  }
}

/**
 * Add communication record
 */
async function addCommunicationRecord(
  clientId: string,
  communication: Omit<CommunicationRecord, 'id' | 'date'>
): Promise<void> {
  try {
    const profile = await getClientProfile(clientId, false);
    if (!profile) {
      throw new Error(`Client profile ${clientId} not found`);
    }
    
    const communicationRecord: CommunicationRecord = {
      id: `COMM-${Date.now()}`,
      date: new Date(),
      ...communication
    };
    
    const updatedLog = [...profile.communicationLog, communicationRecord];
    
    const updatedProfile = {
      ...profile,
      communicationLog: updatedLog,
      lastActivityDate: new Date(),
      updatedAt: new Date()
    };
    
    clientProfiles.set(clientId, updatedProfile);
    
  } catch (error) {
    console.error('❌ Error adding communication record:', error);
  }
}

// Helper functions

function generateClientId(customerName: string, customerEmail: string): string {
  const timestamp = Date.now().toString(36);
  const nameHash = customerName.replace(/\s+/g, '').substring(0, 3).toUpperCase();
  const emailHash = customerEmail.split('@')[0].substring(0, 3).toUpperCase();
  return `ASC-${nameHash}${emailHash}-${timestamp}`;
}

async function generateAIProfile(
  currentBooking: FirebaseBooking,
  historicalBookings: FirebaseBooking[]
): Promise<ComprehensiveClientProfile['aiProfile']> {
  // Simplified AI analysis - in production, use Vertex AI for detailed insights
  const totalBookings = historicalBookings.length + 1;
  const averagePrice = totalBookings > 1 
    ? (historicalBookings.reduce((sum, b) => sum + b.totalPrice, 0) + currentBooking.totalPrice) / totalBookings
    : currentBooking.totalPrice;
  
  // Calculate priority score based on various factors
  let priorityScore = 50; // Base score
  
  // Booking frequency bonus
  if (totalBookings > 5) priorityScore += 20;
  else if (totalBookings > 2) priorityScore += 10;
  
  // High value customer bonus
  if (averagePrice > 300) priorityScore += 15;
  else if (averagePrice > 200) priorityScore += 10;
  
  // Recent activity bonus
  if (historicalBookings.length > 0) {
    const lastBooking = historicalBookings[historicalBookings.length - 1];
    const daysSinceLastBooking = Math.floor(
      (Date.now() - new Date(lastBooking.serviceDate).getTime()) / (1000 * 60 * 60 * 24)
    );
    if (daysSinceLastBooking < 30) priorityScore += 10;
  }
  
  // Determine churn risk
  let churnRisk: 'low' | 'medium' | 'high' = 'low';
  if (historicalBookings.length > 0) {
    const lastBooking = historicalBookings[historicalBookings.length - 1];
    const daysSinceLastBooking = Math.floor(
      (Date.now() - new Date(lastBooking.serviceDate).getTime()) / (1000 * 60 * 60 * 24)
    );
    
    if (daysSinceLastBooking > 90) churnRisk = 'high';
    else if (daysSinceLastBooking > 60) churnRisk = 'medium';
  }
  
  // Generate recommendations
  const recommendedServices = [];
  if (!historicalBookings.some(b => b.serviceType === 'deep')) {
    recommendedServices.push('Deep cleaning for seasonal refresh');
  }
  if (currentBooking.frequency === 'onetime') {
    recommendedServices.push('Recurring service with discount');
  }
  
  return {
    priorityScore: Math.min(priorityScore, 100),
    churnRisk,
    upsellOpportunities: recommendedServices,
    recommendedServices: ['Window cleaning', 'Carpet deep clean', 'Organize closets'],
    personalizedNotes: [
      `Customer prefers ${currentBooking.serviceType} cleaning`,
      `Property size: ${currentBooking.squareFeet} sq ft`,
      'Austin area customer - familiar with local cleaning needs'
    ]
  };
}

function generateTeamReport(
  serviceDetails: any,
  profile: ComprehensiveClientProfile
): string {
  return `# Service Completion Report

## Client Information
- **Client:** ${profile.customerName}
- **Property:** ${profile.primaryAddress}
- **Service Date:** ${serviceDetails.serviceDate}
- **Booking ID:** ${serviceDetails.bookingId}

## Team Assignment
- **Team Members:** ${serviceDetails.teamMembers.join(', ')}
- **Duration:** ${serviceDetails.duration} minutes
- **Completion Status:** ✅ Completed

## Service Details
${serviceDetails.notes}

## Photos Captured
- **Before Photos:** ${serviceDetails.beforePhotos.length} uploaded
- **After Photos:** ${serviceDetails.afterPhotos.length} uploaded

## Customer Satisfaction
${serviceDetails.customerSatisfaction ? `Rating: ${serviceDetails.customerSatisfaction}/5 stars` : 'Not yet provided'}

## Team Notes
${serviceDetails.teamReport}

---
*Report generated automatically by Aura Spring Cleaning management system*
*Date: ${new Date().toLocaleString()}*
`;
}

// Export main functions
export {
  createComprehensiveClientProfile,
  getClientProfile,
  updateClientProfile,
  completeServiceWithPhotos,
  generateClientInvoice,
  addCommunicationRecord
};