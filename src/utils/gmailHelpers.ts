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
  maxResults: number = 10
) {
  const gmail = google.gmail({ version: "v1", auth: oauth2Client });

  const response = await gmail.users.messages.list({
    userId: "me",
    maxResults,
    q: "newer_than:1d", // Last 24 hours (1 day)
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
      // console.error(`Error fetching message ${message.id}:`, error);
    }
  }

  return emailDetails;
}

export interface ApplicationUpdate {
  company: string;
  position: string;
  status: "Applied" | "Interview" | "Offer" | "Rejected";
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
    // console.log("🤖 [AI] Analyzing email:", {
    //   subject: email.subject.substring(0, 80),
    //   from: email.from
    // });
    
    const ai = new GoogleGenAI({
      apiKey: process.env.GOOGLE_GEMINI_API_KEY!,
    });

    const model = "gemini-2.0-flash";
    
    const prompt = `Is this a job application email? Extract company, position, and status.

Subject: ${email.subject}
From: ${email.from}
Body: ${email.body.substring(0, 400)}

Return ONLY JSON, no explanation:
- Job email: {"company":"CompanyName","position":"JobTitle","status":"Applied"}
- Status must be ONE of: Applied, Interview, Offer, Rejected
- Not a job email: {"company":null}

JSON:`;

    // console.log("🤖 [AI] Sending prompt to Gemini (tokens: ~" + Math.ceil(prompt.length / 4) + ")");
    
    const contents = [
      {
        role: "user" as const,
        parts: [{ text: prompt }],
      },
    ];

    const response = await ai.models.generateContent({
      model,
      contents,
      config: {
        temperature: 0.1, // Low temperature for more consistent outputs
        maxOutputTokens: 100, // Short response expected
      },
    });

    const text = response.text || "";
    // console.log("🤖 [AI] Raw AI response:", text);

    // Extract JSON from response (handle markdown code blocks)
    let jsonText = text.trim();
    if (jsonText.startsWith("```json")) {
      jsonText = jsonText.replace(/```json\n?/g, "").replace(/```\n?/g, "");
    } else if (jsonText.startsWith("```")) {
      jsonText = jsonText.replace(/```\n?/g, "");
    }

    // console.log("🤖 [AI] Cleaned text:", jsonText);

    // Try to find JSON object in the response
    const jsonMatch = jsonText.match(/\{[^}]+\}/);
    if (!jsonMatch) {
      // console.log("⚠️ [AI] No valid JSON found in response");
      return null;
    }

    // console.log("🤖 [AI] Extracted JSON:", jsonMatch[0]);

    const parsed = JSON.parse(jsonMatch[0]);
    // console.log("🤖 [AI] Parsed object:", parsed);

    // Validate required fields
    if (!parsed.company || parsed.company === null || !parsed.position || !parsed.status) {
      // console.log("⚠️ [AI] Invalid response - missing required fields:", {
      //   hasCompany: !!parsed.company,
      //   hasPosition: !!parsed.position,
      //   hasStatus: !!parsed.status
      // });
      return null;
    }

    // Filter out template/placeholder values
    const invalidValues = ['name', 'title', 'companyname', 'jobtitle'];
    const companyLower = parsed.company.toLowerCase().trim();
    const positionLower = parsed.position.toLowerCase().trim();
    
    if (invalidValues.includes(companyLower) || invalidValues.includes(positionLower)) {
      // console.log("⚠️ [AI] Rejected - template/placeholder values detected:", {
      //   company: parsed.company,
      //   position: parsed.position
      // });
      return null;
    }

    // Validate status is a single valid value (not the template format)
    const validStatuses = ['Applied', 'Interview', 'Offer', 'Rejected'];
    if (!validStatuses.includes(parsed.status)) {
      // console.log("⚠️ [AI] Invalid status value:", parsed.status);
      return null;
    }

    // console.log("✅ [AI] Valid job application detected:", parsed);
    return parsed as ApplicationUpdate;
  } catch (error) {
    // console.error("❌ [AI] Error analyzing email with AI:", error);
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

/**
 * Normalize company and position names for comparison
 */
function normalizeText(text: string | null | undefined): string {
  if (!text) return "";
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s]/g, "") // Remove special characters
    .replace(/\s+/g, " "); // Normalize whitespace
}

/**
 * Check if two jobs are the same (same company and position)
 * Uses fuzzy matching - checks if company matches and position has significant overlap
 */
export function isSameJob(
  job1: { company: string; position: string },
  job2: { company: string; position: string }
): boolean {
  const company1 = normalizeText(job1.company);
  const company2 = normalizeText(job2.company);
  const position1 = normalizeText(job1.position);
  const position2 = normalizeText(job2.position);

  // Company must match (exact or one contains the other)
  const companyMatch = 
    company1 === company2 || 
    company1.includes(company2) || 
    company2.includes(company1);

  if (!companyMatch) {
    // console.log("🔍 [MATCH] Companies don't match:", {
    //   job1Company: company1,
    //   job2Company: company2
    // });
    return false;
  }

  // Position matching - more flexible
  // Check if exact match
  if (position1 === position2) {
    // console.log("🔍 [MATCH] ✅ Exact match:", {
    //   job1: { company: company1, position: position1 },
    //   job2: { company: company2, position: position2 }
    // });
    return true;
  }

  // Check if one contains the other (handles "Software Engineer" vs "Senior Software Engineer (m/w/d)")
  if (position1.includes(position2) || position2.includes(position1)) {
    // console.log("🔍 [MATCH] ✅ Partial match (contains):", {
    //   job1: { company: company1, position: position1 },
    //   job2: { company: company2, position: position2 }
    // });
    return true;
  }

  // Check significant word overlap (at least 60% of words match)
  const words1 = position1.split(' ').filter(w => w.length > 2); // Ignore short words
  const words2 = position2.split(' ').filter(w => w.length > 2);
  
  if (words1.length === 0 || words2.length === 0) {
    return false;
  }

  const commonWords = words1.filter(w => words2.includes(w));
  const overlapPercentage = (commonWords.length / Math.min(words1.length, words2.length)) * 100;

  const isFuzzyMatch = overlapPercentage >= 60;

  // console.log("🔍 [MATCH] Fuzzy matching:", {
  //   job1: { company: company1, position: position1 },
  //   job2: { company: company2, position: position2 },
  //   words1,
  //   words2,
  //   commonWords,
  //   overlapPercentage: Math.round(overlapPercentage) + '%',
  //   isMatch: isFuzzyMatch
  // });

  return isFuzzyMatch;
}

/**
 * Status priority (higher number = more recent/important status)
 */
const STATUS_PRIORITY = {
  Applied: 1,
  Interview: 2,
  Offer: 3,
  Rejected: 3, // Same priority as Offer, but chronologically later wins
};

/**
 * Merge duplicate job applications and keep the latest status
 */
export function mergeJobApplications(
  applications: Array<ApplicationUpdate & { date: string }>
): Array<ApplicationUpdate & { date: string }> {
  // console.log(`🔀 [MERGE] Starting merge of ${applications.length} applications`);
  const jobMap = new Map<string, ApplicationUpdate & { date: string }>();

  for (const app of applications) {
    // Skip invalid applications
    if (!app.company || !app.position || !app.status) {
      // console.log("⚠️ [MERGE] Skipping invalid application:", app);
      continue;
    }

    const key = `${normalizeText(app.company)}_${normalizeText(app.position)}`;
    
    // Skip if key is empty (both company and position normalized to empty)
    if (!key || key === "_") {
      // console.log("⚠️ [MERGE] Skipping application with empty key");
      continue;
    }

    const existing = jobMap.get(key);

    if (!existing) {
      // First occurrence of this job
      // console.log(`➕ [MERGE] New job added:`, { key, app });
      jobMap.set(key, app);
    } else {
      // Duplicate found - compare dates and status priority
      const existingDate = new Date(existing.date);
      const newDate = new Date(app.date);

      // console.log(`🔄 [MERGE] Duplicate found for key "${key}":`, {
      //   existing: { date: existing.date, status: existing.status },
      //   new: { date: app.date, status: app.status }
      // });

      // If new email is more recent, update
      if (newDate > existingDate) {
        // console.log(`✅ [MERGE] Keeping newer email (${app.date} > ${existing.date})`);
        jobMap.set(key, app);
      } else if (newDate.getTime() === existingDate.getTime()) {
        // Same date - use status priority
        const existingPriority = STATUS_PRIORITY[existing.status] || 0;
        const newPriority = STATUS_PRIORITY[app.status] || 0;

        if (newPriority >= existingPriority) {
          // console.log(`✅ [MERGE] Keeping higher priority status (${app.status} >= ${existing.status})`);
          jobMap.set(key, app);
        } else {
          // console.log(`⏭️ [MERGE] Keeping existing higher priority status`);
        }
      } else {
        // console.log(`⏭️ [MERGE] Keeping existing (newer date)`);
      }
      // If new email is older, keep existing
    }
  }

  const result = Array.from(jobMap.values());
  // console.log(`✅ [MERGE] Merge complete: ${applications.length} → ${result.length} unique jobs`);
  return result;
}

/**
 * Update existing job status if a newer email is found
 * Priority: Status priority > Date (always prefer higher status regardless of date)
 */
export function shouldUpdateJobStatus(
  existingJob: { status: string; date: string },
  newEmail: { status: string; date: string }
): boolean {
  // console.log("🔍 [UPDATE CHECK] Checking if should update:", {
  //   existing: existingJob,
  //   new: newEmail
  // });
  
  const existingPriority = STATUS_PRIORITY[existingJob.status as keyof typeof STATUS_PRIORITY] || 0;
  const newPriority = STATUS_PRIORITY[newEmail.status as keyof typeof STATUS_PRIORITY] || 0;

  // console.log(`🔍 [UPDATE CHECK] Priority comparison:`, {
  //   existingStatus: existingJob.status,
  //   existingPriority,
  //   newStatus: newEmail.status,
  //   newPriority
  // });

  // PRIORITY FIRST: If new status has higher priority, always update (regardless of date)
  if (newPriority > existingPriority) {
    // console.log(`✅ [UPDATE CHECK] Yes - higher priority status (${newEmail.status} > ${existingJob.status})`);
    return true;
  }

  // If same priority, check date
  if (newPriority === existingPriority) {
    const existingDate = new Date(existingJob.date);
    const newDate = new Date(newEmail.date);

    if (newDate > existingDate) {
      // console.log(`✅ [UPDATE CHECK] Yes - same priority but newer date (${newEmail.date} > ${existingJob.date})`);
      return true;
    }
    
    // console.log(`❌ [UPDATE CHECK] No - same priority but older or same date`);
    return false;
  }

  // New status has lower priority - don't downgrade
  // console.log(`❌ [UPDATE CHECK] No - lower priority status (${newEmail.status} < ${existingJob.status})`);
  return false;
}

