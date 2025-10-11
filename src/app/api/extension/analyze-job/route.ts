import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase, collectionName } from '@/libs/mongodb';

interface PageContent {
  url: string;
  title: string;
  content: string;
  metaDescription?: string;
  ogTitle?: string;
  ogDescription?: string;
  structuredData?: string;
  date: string;
}

interface JobData {
  isJobPage: boolean;
  title?: string;
  company?: string;
  location?: string;
  type?: string;
  description?: string;
  status?: string;
  url?: string;
  date?: string;
  message?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, pageContent } = body as { email: string; pageContent: PageContent };

    // Validate required fields
    if (!email || !pageContent) {
      return NextResponse.json(
        { error: 'Email and page content are required' },
        { status: 400 }
      );
    }

    // Validate user exists in database
    const { db } = await connectToDatabase();
    const user = await db.collection(collectionName.USERS).findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized - User not found' },
        { status: 401 }
      );
    }

    // Get Groq API key from environment
    const groqApiKey = process.env.GROQ_API_KEY;
    if (!groqApiKey) {
      return NextResponse.json(
        { error: 'AI service not configured' },
        { status: 500 }
      );
    }

    // Process with AI on server-side
    const jobData = await processWithAI(pageContent, groqApiKey);

    return NextResponse.json({
      success: true,
      jobData,
    });
  } catch {
    // console.error('Error in analyze-job API:', error);
    return NextResponse.json(
      { 
        error: 'Failed to analyze job',
        details: 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Process job data with AI (moved from extension)
async function processWithAI(pageContent: PageContent, apiKey: string): Promise<JobData> {
  try {
    // Prepare the prompt for Groq API
    const prompt = createGroqPrompt(pageContent);

    // Call Groq API
    const response = await fetch(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant',
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 1000,
          temperature: 0.1
        })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Groq API error: ${response.status} - ${errorText}`);
    }

    const result = await response.json();

    // Parse the Groq response
    const jobData = parseGroqResponse(result, pageContent);

    return jobData;
  } catch (error) {
    // console.error('Error in AI processing:', error);
    throw error;
  }
}

// Create Groq extraction prompt
function createGroqPrompt(pageContent: PageContent): string {
  const { title, content, ogTitle, ogDescription, structuredData } = pageContent;

  // If structured data exists, prioritize it
  if (structuredData) {
    return `You are a helpful assistant that analyzes web pages to determine if they contain job postings. Always respond with valid JSON only.

**Structured Data (JSON-LD):**
${structuredData}

**Page Title:** ${title}
**Page Content:** ${content.substring(0, 3000)}

**Instructions:**
1. First, determine if this page contains a job posting by looking for job-related content
2. If it's NOT a job page, respond with: {"isJobPage": false, "message": "This page does not appear to contain a job posting"}
3. If it IS a job page, extract the information and respond with: {"isJobPage": true, "title":"job title","company":"company name","location":"location","type":"remote/hybrid/onsite","description":"brief job summary"}

Provide ONLY a JSON response in this exact format (no other text):`;
  }

  return `You are a helpful assistant that analyzes web pages to determine if they contain job postings. Always respond with valid JSON only.

**Page Title:** ${title}
${ogTitle ? `**OG Title:** ${ogTitle}` : ''}
${ogDescription ? `**Meta Description:** ${ogDescription}` : ''}

**Page Content:** ${content.substring(0, 4000)}

**Instructions:**
1. First, determine if this page contains a job posting
2. Look for indicators like: job titles, company names, job descriptions, requirements, "apply now", "job posting", hiring, employment, etc.
3. If it's NOT a job page (e.g., homepage, blog, about page, search results, etc.), respond with: {"isJobPage": false, "message": "This page does not appear to contain a job posting"}
4. If it IS a job page, extract the information and respond with: {"isJobPage": true, "title":"job title","company":"company name","location":"location","type":"remote/hybrid/onsite","description":"brief job summary"}

Provide ONLY a JSON response in this exact format (no other text):`;
}

// Parse Groq response
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseGroqResponse(aiResponse: any, pageContent: PageContent): JobData {
  try {
    // Extract content from Groq response
    let text = '';

    if (aiResponse.choices && aiResponse.choices.length > 0) {
      const choice = aiResponse.choices[0];
      if (choice.message && choice.message.content) {
        text = choice.message.content || '';
      }
    }

    // Try to extract JSON from the response (handle markdown code blocks)
    let jsonMatch = text.match(/```json\s*(\{[\s\S]*?\})\s*```/);
    if (!jsonMatch) {
      jsonMatch = text.match(/\{[\s\S]*\}/);
    }
    if (jsonMatch) {
      const jsonString = jsonMatch[1] || jsonMatch[0];
      const jsonData = JSON.parse(jsonString);

      // Check if it's not a job page
      if (jsonData.isJobPage === false) {
        return {
          isJobPage: false,
          message: jsonData.message || "This page does not appear to contain a job posting",
          url: pageContent.url
        };
      }

      // If it is a job page, validate and clean the data
      return {
        isJobPage: true,
        title: jsonData.title?.trim() || 'Job Title Not Found',
        company: jsonData.company?.trim() || 'Company Not Found',
        location: jsonData.location?.trim() || 'Location Not Specified',
        type: normalizeJobType(jsonData.type),
        description: jsonData.description?.trim() || 'Description not available',
        status: 'Applied', // Always set to "Applied" when scraped
        url: pageContent.url,
        date: pageContent.date
      };
    }

    throw new Error('Could not parse JSON from AI response');
  } catch {
    // Return fallback data - assume it's a job page with limited data
    return {
      isJobPage: true,
      title: pageContent.ogTitle || pageContent.title || 'Job Title Not Found',
      company: 'Company Not Found',
      location: 'Location Not Specified',
      type: 'unknown',
      description: pageContent.ogDescription || 'Description not available',
      status: 'Applied',
      url: pageContent.url,
      date: pageContent.date
    };
  }
}

// Normalize job type
function normalizeJobType(type: string | undefined): string {
  if (!type) return 'unknown';

  const normalized = type.toLowerCase().trim();

  if (normalized.includes('remote')) return 'remote';
  if (normalized.includes('hybrid')) return 'hybrid';
  if (normalized.includes('onsite') || normalized.includes('on-site')) return 'onsite';

  return 'unknown';
}

