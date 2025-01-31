import { NextResponse } from 'next/server';
import { createClient } from '@sanity/client';

// Make sure we have the required environment variables
if (!process.env.SANITY_API_TOKEN) {
  throw new Error('SANITY_API_TOKEN environment variable is not set');
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2025-01-17',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

export async function POST(request: Request) {
  if (!process.env.SANITY_API_TOKEN) {
    return NextResponse.json(
      { success: false, error: 'Server configuration error' },
      { status: 500 }
    );
  }

  try {
    // Ensure the request has the correct content type
    const contentType = request.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return NextResponse.json(
        { success: false, error: 'Content-Type must be application/json' },
        { status: 400 }
      );
    }

    let orderData;
    try {
      orderData = await request.json();
    } catch (e) {
      return NextResponse.json(
        { success: false, error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    // Validate required fields
    if (!orderData || typeof orderData !== 'object') {
      return NextResponse.json(
        { success: false, error: 'Invalid order data' },
        { status: 400 }
      );
    }

    // Create order in Sanity
    const result = await client.create({
      _type: 'order',
      ...orderData,
    });

    if (!result._id) {
      throw new Error('Failed to create order');
    }

    return NextResponse.json({ success: true, orderId: result._id });
  } catch (error: any) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to place order'
      },
      { status: error.statusCode || 500 }
    );
  }
}
