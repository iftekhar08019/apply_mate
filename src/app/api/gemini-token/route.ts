import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Get the Google Gemini API key from environment variables
    const geminiApiKey = process.env.GOOGLE_GEMINI_API_KEY;
    
    if (!geminiApiKey) {
      return NextResponse.json(
        { error: 'Google Gemini API key not configured' },
        { status: 500 }
      );
    }

    // Return the API key (in production, you might want to add additional security checks)
    return NextResponse.json({
      token: geminiApiKey
    });

  } catch (error) {
    console.error('Error fetching Google Gemini API key:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
