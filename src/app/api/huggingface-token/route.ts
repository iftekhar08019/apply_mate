import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Get the Hugging Face API token from environment variables
    const huggingfaceToken = process.env.HUGGINGFACE_API_TOKEN;
    
    if (!huggingfaceToken) {
      return NextResponse.json(
        { error: 'Hugging Face API token not configured' },
        { status: 500 }
      );
    }

    // Return the token (in production, you might want to add additional security checks)
    return NextResponse.json({
      token: huggingfaceToken
    });

  } catch (error) {
    console.error('Error fetching Hugging Face token:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
