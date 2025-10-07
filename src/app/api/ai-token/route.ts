import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Get the Groq API key from environment variables
    const groqApiKey = process.env.GROQ_API_KEY;
    
    if (!groqApiKey) {
      return NextResponse.json(
        { error: 'Groq API key not configured' },
        { status: 500 }
      );
    }

    // Return the API key (in production, you might want to add additional security checks)
    return NextResponse.json({
      token: groqApiKey
    });

  } catch (error) {
    console.error('Error fetching Groq API key:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
