// Photo Upload API for Cleaning Teams
// Mobile-friendly endpoint for before/after photo uploads

import { NextRequest, NextResponse } from 'next/server';
import { completeServiceWithPhotos, getClientProfile } from '@/lib/clientProfileSystem';
import { CleaningPhoto } from '@/lib/sharepointIntegration';

export async function POST(request: NextRequest) {
  try {
    console.log('📱 Processing photo upload from cleaning team...');
    
    const formData = await request.formData();
    
    // Extract service details
    const bookingId = formData.get('bookingId') as string;
    const clientId = formData.get('clientId') as string;
    const serviceDate = formData.get('serviceDate') as string;
    const serviceType = formData.get('serviceType') as string;
    const teamMember = formData.get('teamMember') as string;
    const location = formData.get('location') as string;
    const teamReport = formData.get('teamReport') as string || '';
    const customerSatisfaction = formData.get('customerSatisfaction') ? 
      parseInt(formData.get('customerSatisfaction') as string) : undefined;
    const duration = formData.get('duration') ? 
      parseInt(formData.get('duration') as string) : 120;
    const notes = formData.get('notes') as string || '';

    if (!bookingId || !clientId || !serviceDate || !teamMember) {
      return NextResponse.json(
        { error: 'Missing required fields: bookingId, clientId, serviceDate, teamMember' },
        { status: 400 }
      );
    }

    // Verify client exists
    const clientProfile = await getClientProfile(clientId, false);
    if (!clientProfile) {
      return NextResponse.json(
        { error: 'Client profile not found' },
        { status: 404 }
      );
    }

    // Process before photos
    const beforePhotos: CleaningPhoto[] = [];
    const beforePhotoFields = Array.from(formData.keys()).filter(key => key.startsWith('beforePhoto_'));
    
    for (const fieldName of beforePhotoFields) {
      const file = formData.get(fieldName) as File;
      const photoIndex = fieldName.split('_')[1];
      const description = formData.get(`beforeDescription_${photoIndex}`) as string || '';
      const photoLocation = formData.get(`beforeLocation_${photoIndex}`) as string || location;
      
      if (file && file.size > 0) {
        const buffer = Buffer.from(await file.arrayBuffer());
        beforePhotos.push({
          filename: file.name,
          data: buffer,
          description,
          location: photoLocation,
          timestamp: new Date(),
          teamMember
        });
      }
    }

    // Process after photos
    const afterPhotos: CleaningPhoto[] = [];
    const afterPhotoFields = Array.from(formData.keys()).filter(key => key.startsWith('afterPhoto_'));
    
    for (const fieldName of afterPhotoFields) {
      const file = formData.get(fieldName) as File;
      const photoIndex = fieldName.split('_')[1];
      const description = formData.get(`afterDescription_${photoIndex}`) as string || '';
      const photoLocation = formData.get(`afterLocation_${photoIndex}`) as string || location;
      
      if (file && file.size > 0) {
        const buffer = Buffer.from(await file.arrayBuffer());
        afterPhotos.push({
          filename: file.name,
          data: buffer,
          description,
          location: photoLocation,
          timestamp: new Date(),
          teamMember
        });
      }
    }

    console.log(`📷 Processing ${beforePhotos.length} before photos and ${afterPhotos.length} after photos`);

    if (beforePhotos.length === 0 && afterPhotos.length === 0) {
      return NextResponse.json(
        { error: 'No photos provided' },
        { status: 400 }
      );
    }

    // Upload photos and complete service
    const result = await completeServiceWithPhotos(clientId, {
      bookingId,
      serviceDate,
      serviceType,
      teamMembers: [teamMember], // Single team member for mobile upload
      beforePhotos,
      afterPhotos,
      teamReport,
      customerSatisfaction,
      duration,
      notes,
      location
    });

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: `Successfully uploaded ${result.totalUploaded} photos`,
        uploadedPhotos: result.uploadedPhotos.length,
        failedUploads: result.failedUploads.length,
        photoUrls: result.uploadedPhotos.map(photo => photo.webUrl)
      });
    } else {
      return NextResponse.json(
        { 
          error: 'Photo upload failed',
          failedUploads: result.failedUploads
        },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('❌ Photo upload API error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve client photos
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const clientId = searchParams.get('clientId');
    const serviceDate = searchParams.get('serviceDate');
    
    if (!clientId) {
      return NextResponse.json(
        { error: 'clientId parameter required' },
        { status: 400 }
      );
    }

    const clientProfile = await getClientProfile(clientId, false);
    if (!clientProfile) {
      return NextResponse.json(
        { error: 'Client profile not found' },
        { status: 404 }
      );
    }

    // Get all client documents
    const documents = await getClientDocuments(clientProfile.sharepointFolder.rootFolderPath);
    
    // Filter for photos
    let photos = documents.filter(doc => 
      doc.documentType === 'photo_before' || doc.documentType === 'photo_after'
    );

    // Filter by service date if provided
    if (serviceDate) {
      photos = photos.filter(photo => photo.name.includes(serviceDate));
    }

    // Group photos by type
    const beforePhotos = photos.filter(p => p.documentType === 'photo_before');
    const afterPhotos = photos.filter(p => p.documentType === 'photo_after');

    return NextResponse.json({
      success: true,
      clientId,
      totalPhotos: photos.length,
      beforePhotos: beforePhotos.map(p => ({
        id: p.id,
        name: p.name,
        webUrl: p.webUrl,
        uploadedBy: p.uploadedBy,
        createdDate: p.createdDate
      })),
      afterPhotos: afterPhotos.map(p => ({
        id: p.id,
        name: p.name,
        webUrl: p.webUrl,
        uploadedBy: p.uploadedBy,
        createdDate: p.createdDate
      }))
    });

  } catch (error) {
    console.error('❌ Photo retrieval API error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}