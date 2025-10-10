import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/authOptions';

/**
 * DEPRECATED: This endpoint is no longer used by the Chrome extension.
 * AI processing has been moved to /api/extension/analyze-job for security.
 * 
 * This endpoint is kept with authentication for potential future admin use.
 * To completely remove this endpoint, delete this file.
 */
export async function GET() {
  try {
    // Require authentication
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized - Authentication required' },
        { status: 401 }
      );
    }

    // Get the Groq API key from environment variables
    const groqApiKey = process.env.GROQ_API_KEY;
    
    if (!groqApiKey) {
      return NextResponse.json(
        { error: 'Groq API key not configured' },
        { status: 500 }
      );
    }

    // Only return to authenticated users
    return NextResponse.json({
      token: groqApiKey,
      deprecated: true,
      message: 'This endpoint is deprecated. Use /api/extension/analyze-job instead.'
    });

  } catch (error) {
    // console.error('Error fetching Groq API key:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
