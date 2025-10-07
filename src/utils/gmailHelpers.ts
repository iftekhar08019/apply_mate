import { google } from "googleapis";
import { GoogleGenAI } from "@google/genai";

export interface GmailTokens {
  access_token?: string | null;
  refresh_token?: string | null;
  scope?: string;
  token_type?: string;
  expiry_date?: number | null;
}

export function createOAuth2Client(tokens: GmailTokens) {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GMAIL_CLIENT_ID,
    process.env.GMAIL_CLIENT_SECRET,
    process.env.GMAIL_REDIRECT_URI
  );

  oauth2Client.setCredentials(tokens);
  return oauth2Client;
}

export async function fetchRecentEmails(
  oauth2Client: ReturnType<typeof createOAuth2Client>,
  maxResults: number = 50
) {
  const gmail = google.gmail({ version: "v1", auth: oauth2Client });

  const response = await gmail.users.messages.list({
    userId: "me",
    maxResults,
    q: "newer_than:7d", // Last 7 days
  });

  const messages = response.data.messages || [];
  const emailDetails = [];

  for (const message of messages) {
    try {
      const msg = await gmail.users.messages.get({
        userId: "me",
        id: message.id!,
        format: "full",
      });

      const headers = msg.data.payload?.headers || [];
      const subject = headers.find((h) => h.name === "Subject")?.value || "";
      const from = headers.find((h) => h.name === "From")?.value || "";
      const date = headers.find((h) => h.name === "Date")?.value || "";

      let body = "";
      if (msg.data.payload?.body?.data) {
        body = Buffer.from(msg.data.payload.body.data, "base64").toString();
      } else if (msg.data.payload?.parts) {
        const textPart = msg.data.payload.parts.find(
          (part) => part.mimeType === "text/plain"
        );
        if (textPart?.body?.data) {
          body = Buffer.from(textPart.body.data, "base64").toString();
        }
      }

      emailDetails.push({
        id: message.id,
        subject,
        from,
        date,
        body: body.substring(0, 2000), // Limit body length
      });
    } catch (error) {
      console.error(`Error fetching message ${message.id}:`, error);
    }
  }

  return emailDetails;
}

export interface ApplicationUpdate {
  company: string;
  position: string;
  status: "Applied" | "Interview" | "Offer" | "Rejected";
  confidence: number;
  reasoning: string;
}

interface EmailData {
  id?: string;
  subject: string;
  from: string;
  date: string;
  body: string;
}

export async function analyzeEmailWithAI(
  email: EmailData
): Promise<ApplicationUpdate | null> {
  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.GOOGLE_GEMINI_API_KEY!,
    });

    const model = "gemini-2.0-flash-exp";
    
    const contents = [
      {
        role: "user" as const,
        parts: [
          {
            text: `Analyze this email and extract job application status updates.
    
Email Subject: ${email.subject}
From: ${email.from}
Body: ${email.body}

If this email is related to a job application, extract:
1. Company name
2. Job position/title
3. Application status (one of: Applied, Interview, Offer, Rejected)
4. Your confidence level (0-100)
5. Brief reasoning

IMPORTANT: Use these EXACT status values:
- "Applied" - for application received/confirmation emails
- "Interview" - for interview invitations or scheduling
- "Offer" - for job offers
- "Rejected" - for rejections

Respond ONLY with a JSON object in this exact format:
{
  "company": "string",
  "position": "string", 
  "status": "Applied|Interview|Offer|Rejected",
  "confidence": number,
  "reasoning": "string"
}

If this is NOT a job application email, respond with: {"company": null}`,
          },
        ],
      },
    ];

    const response = await ai.models.generateContent({
      model,
      contents,
    });

    const text = response.text || "";

    // Extract JSON from response (handle markdown code blocks)
    let jsonText = text.trim();
    if (jsonText.startsWith("```json")) {
      jsonText = jsonText.replace(/```json\n?/g, "").replace(/```\n?/g, "");
    } else if (jsonText.startsWith("```")) {
      jsonText = jsonText.replace(/```\n?/g, "");
    }

    const parsed = JSON.parse(jsonText);

    if (!parsed.company || parsed.company === null) {
      return null;
    }

    return parsed as ApplicationUpdate;
  } catch (error) {
    console.error("Error analyzing email with AI:", error);
    return null;
  }
}

export function determineApplicationStatus(
  emailSubject: string,
  emailBody: string
): "Applied" | "Interview" | "Offer" | "Rejected" | null {
  const subject = emailSubject.toLowerCase();
  const body = emailBody.toLowerCase();
  const content = subject + " " + body;

  // Rejection patterns
  if (
    content.includes("unfortunately") ||
    content.includes("not moving forward") ||
    content.includes("other candidates") ||
    content.includes("position has been filled") ||
    content.includes("not selected")
  ) {
    return "Rejected";
  }

  // Offer patterns
  if (
    content.includes("offer") ||
    content.includes("congratulations") ||
    content.includes("we'd like to extend") ||
    content.includes("pleased to offer")
  ) {
    return "Offer";
  }

  // Interview patterns
  if (
    content.includes("interview") ||
    content.includes("schedule a call") ||
    content.includes("next steps") ||
    content.includes("speak with you")
  ) {
    return "Interview";
  }

  // Application received patterns
  if (
    content.includes("application received") ||
    content.includes("thank you for applying") ||
    content.includes("received your application")
  ) {
    return "Applied";
  }

  return null;
}

