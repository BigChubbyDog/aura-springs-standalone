/**
 * Microsoft Ecosystem API Endpoints
 * Handles integration with Dynamics 365, SharePoint, Teams, and Power Automate
 */

import { NextRequest, NextResponse } from 'next/server';
import { processBookingThroughEcosystem, processServiceCompletion, generateAndSendInvoice } from '@/lib/microsoftEcosystemIntegration';
import { getCustomerHistory } from '@/lib/dynamics365Service';
import { getCustomerDocuments } from '@/lib/sharepointService';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, data } = body;

    switch (action) {
      case 'process-booking':
        // Process new booking through entire Microsoft ecosystem
        const bookingResult = await processBookingThroughEcosystem(data);
        return NextResponse.json(bookingResult);

      case 'complete-service':
        // Process service completion with photos
        const completionResult = await processServiceCompletion(data);
        return NextResponse.json(completionResult);

      case 'generate-invoice':
        // Generate and send invoice
        const invoiceResult = await generateAndSendInvoice(data);
        return NextResponse.json(invoiceResult);

      case 'get-customer-history':
        // Get customer service history from Dynamics
        const historyResult = await getCustomerHistory(data.customerId);
        return NextResponse.json(historyResult);

      case 'get-customer-documents':
        // Get customer documents from SharePoint
        const docsResult = await getCustomerDocuments(data.customerId);
        return NextResponse.json(docsResult);

      default:
        return NextResponse.json(
          { error: 'Invalid action specified' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Microsoft API error:', error);
    return NextResponse.json(
      { error: 'Failed to process Microsoft ecosystem request' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const customerId = searchParams.get('customerId');
    const type = searchParams.get('type');

    if (!customerId) {
      return NextResponse.json(
        { error: 'Customer ID is required' },
        { status: 400 }
      );
    }

    if (type === 'history') {
      const history = await getCustomerHistory(customerId);
      return NextResponse.json(history);
    } else if (type === 'documents') {
      const documents = await getCustomerDocuments(customerId);
      return NextResponse.json(documents);
    } else {
      return NextResponse.json(
        { error: 'Invalid type parameter. Use "history" or "documents"' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Microsoft GET API error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve customer data' },
      { status: 500 }
    );
  }
}