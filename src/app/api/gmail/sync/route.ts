import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { connectToDatabase, collectionName } from "@/libs/mongodb";
import {
  createOAuth2Client,
  fetchRecentEmails,
  analyzeEmailWithAI,
  GmailTokens,
} from "@/utils/gmailHelpers";

export async function POST() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { db } = await connectToDatabase();

    // Get user with Gmail tokens
    const user = await db
      .collection(collectionName.USERS)
      .findOne({ email: session.user.email });

    if (!user?.gmailTokens) {
      return NextResponse.json(
        { error: "Gmail not connected" },
        { status: 400 }
      );
    }

    // Create OAuth2 client
    const oauth2Client = createOAuth2Client(user.gmailTokens as GmailTokens);

    // Fetch recent emails
    const emails = await fetchRecentEmails(oauth2Client, 50);

    interface ApplicationUpdate {
      id: string;
      company: string;
      position: string;
      oldStatus?: string;
      newStatus: string;
      reasoning: string;
      created?: boolean;
    }

    interface ProcessedEmail {
      email: string;
      analysis: {
        company: string;
        position: string;
        status: string;
        confidence: number;
        reasoning: string;
      };
    }

    const updates: ApplicationUpdate[] = [];
    const processed: ProcessedEmail[] = [];

    // Analyze each email with AI
    for (const email of emails) {
      const emailData = {
        id: email.id || undefined,
        subject: email.subject,
        from: email.from,
        date: email.date,
        body: email.body,
      };
      const analysis = await analyzeEmailWithAI(emailData);

      if (analysis && analysis.confidence > 60) {
        // Only process high-confidence matches
        processed.push({
          email: email.subject,
          analysis,
        });

        // Find user's jobs document
        const userJobs = await db
          .collection(collectionName.JOBS)
          .findOne({ email: session.user.email });

        if (userJobs && userJobs.jobs) {
          // Find matching job in the jobs array
          const matchingJobIndex = userJobs.jobs.findIndex(
            (job: { title: string; company: string }) =>
              job.company.toLowerCase().includes(analysis.company.toLowerCase()) ||
              analysis.company.toLowerCase().includes(job.company.toLowerCase()) ||
              job.title.toLowerCase().includes(analysis.position.toLowerCase()) ||
              analysis.position.toLowerCase().includes(job.title.toLowerCase())
          );

          if (matchingJobIndex !== -1) {
            // Job found - update its status
            const oldStatus = userJobs.jobs[matchingJobIndex].status;
            
            await db.collection(collectionName.JOBS).updateOne(
              { email: session.user.email },
              {
                $set: {
                  [`jobs.${matchingJobIndex}.status`]: analysis.status,
                  [`jobs.${matchingJobIndex}.aiUpdated`]: true,
                  [`jobs.${matchingJobIndex}.aiReasoning`]: analysis.reasoning,
                  updatedAt: new Date(),
                },
              }
            );

            updates.push({
              id: matchingJobIndex.toString(),
              company: userJobs.jobs[matchingJobIndex].company,
              position: userJobs.jobs[matchingJobIndex].title,
              oldStatus: oldStatus,
              newStatus: analysis.status,
              reasoning: analysis.reasoning,
            });
          } else {
            // Job not found - add new job to array
            const newJob = {
              title: analysis.position,
              company: analysis.company,
              location: "Not specified",
              type: "unknown",
              description: "",
              status: analysis.status,
              url: "",
              date: new Date().toISOString().split("T")[0],
              source: "gmail-auto",
              aiCreated: true,
              aiReasoning: analysis.reasoning,
            };

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            await (db.collection(collectionName.JOBS) as any).updateOne(
              { email: session.user.email },
              {
                $push: { jobs: newJob },
                $set: { updatedAt: new Date() },
              }
            );

            updates.push({
              id: "new",
              company: analysis.company,
              position: analysis.position,
              oldStatus: undefined,
              newStatus: analysis.status,
              reasoning: analysis.reasoning,
              created: true,
            });
          }
        } else {
          // User doesn't have jobs document yet - create one
          const newUserJobs = {
            email: session.user.email,
            jobs: [
              {
                title: analysis.position,
                company: analysis.company,
                location: "Not specified",
                type: "unknown",
                description: "",
                status: analysis.status,
                url: "",
                date: new Date().toISOString().split("T")[0],
                source: "gmail-auto",
                aiCreated: true,
                aiReasoning: analysis.reasoning,
              },
            ],
            createdAt: new Date(),
            updatedAt: new Date(),
          };

          await db.collection(collectionName.JOBS).insertOne(newUserJobs);

          updates.push({
            id: "new",
            company: analysis.company,
            position: analysis.position,
            oldStatus: undefined,
            newStatus: analysis.status,
            reasoning: analysis.reasoning,
            created: true,
          });
        }
      }
    }

    // Update last sync time
    await db.collection(collectionName.USERS).updateOne(
      { email: session.user.email },
      {
        $set: {
          lastGmailSync: new Date(),
        },
      }
    );

    return NextResponse.json({
      success: true,
      emailsProcessed: emails.length,
      updatesFound: processed.length,
      applicationsUpdated: updates.length,
      updates,
    });
  } catch (error) {
    console.error("Error syncing Gmail:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to sync Gmail";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

// GET endpoint to check sync status
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { db } = await connectToDatabase();
    const user = await db
      .collection(collectionName.USERS)
      .findOne({ email: session.user.email });

    return NextResponse.json({
      gmailConnected: user?.gmailConnected || false,
      lastSync: user?.lastGmailSync || null,
    });
  } catch (error) {
    console.error("Error checking sync status:", error);
    return NextResponse.json(
      { error: "Failed to check sync status" },
      { status: 500 }
    );
  }
}

