import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase, collectionName } from "@/libs/mongodb";
import {
  createOAuth2Client,
  fetchRecentEmails,
  analyzeEmailWithAI,
  GmailTokens,
} from "@/utils/gmailHelpers";

// This endpoint can be called by Vercel Cron or an external cron service
export async function GET(request: NextRequest) {
  try {
    // Optional: Verify cron secret for security
    const authHeader = request.headers.get("authorization");
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { db } = await connectToDatabase();

    // Get all users with Gmail connected
    const usersWithGmail = await db
      .collection(collectionName.USERS)
      .find({ gmailConnected: true })
      .toArray();

    const results = [];

    for (const user of usersWithGmail) {
      try {
        if (!user.gmailTokens) continue;

        // Create OAuth2 client
        const oauth2Client = createOAuth2Client(user.gmailTokens as GmailTokens);

        // Fetch recent emails
        const emails = await fetchRecentEmails(oauth2Client, 50);

        let updatesCount = 0;

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
            // Find user's jobs document
            const userJobs = await db
              .collection(collectionName.JOBS)
              .findOne({ email: user.email });

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
                await db.collection(collectionName.JOBS).updateOne(
                  { email: user.email },
                  {
                    $set: {
                      [`jobs.${matchingJobIndex}.status`]: analysis.status,
                      [`jobs.${matchingJobIndex}.aiUpdated`]: true,
                      [`jobs.${matchingJobIndex}.aiReasoning`]: analysis.reasoning,
                      updatedAt: new Date(),
                    },
                  }
                );
                updatesCount++;
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
                  { email: user.email },
                  {
                    $push: { jobs: newJob },
                    $set: { updatedAt: new Date() },
                  }
                );
                updatesCount++;
              }
            } else {
              // User doesn't have jobs document yet - create one
              const newUserJobs = {
                email: user.email,
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
              updatesCount++;
            }
          }
        }

        // Update last sync time
        await db.collection(collectionName.USERS).updateOne(
          { _id: user._id },
          {
            $set: {
              lastGmailSync: new Date(),
            },
          }
        );

        results.push({
          userEmail: user.email,
          emailsProcessed: emails.length,
          applicationsUpdated: updatesCount,
        });
      } catch (error) {
        console.error(`Error syncing for user ${user.email}:`, error);
        results.push({
          userEmail: user.email,
          error: "Failed to sync",
        });
      }
    }

    return NextResponse.json({
      success: true,
      usersProcessed: usersWithGmail.length,
      results,
    });
  } catch (error) {
    console.error("Error in cron job:", error);
    const errorMessage = error instanceof Error ? error.message : "Cron job failed";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

