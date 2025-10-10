import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase, collectionName } from "@/libs/mongodb";
import {
  createOAuth2Client,
  fetchRecentEmails,
  analyzeEmailWithAI,
  GmailTokens,
  isSameJob,
  shouldUpdateJobStatus,
  mergeJobApplications,
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

        // Fetch recent emails (last 24 hours, max 10)
        const emails = await fetchRecentEmails(oauth2Client, 10);

        let updatesCount = 0;

        // First, analyze all emails and collect matches
        const analyzedEmails: Array<{
          company: string;
          position: string;
          status: "Applied" | "Interview" | "Offer" | "Rejected";
          date: string;
        }> = [];

        // Analyze each email with AI
        for (const email of emails) {
          try {
            const emailData = {
              id: email.id || undefined,
              subject: email.subject,
              from: email.from,
              date: email.date,
              body: email.body,
            };
            const analysis = await analyzeEmailWithAI(emailData);

            if (analysis) {
              analyzedEmails.push({
                ...analysis,
                date: email.date,
              });
            }
          } catch (error) {
            // console.error(`Error analyzing email for ${user.email}:`, error);
            continue;
          }
        }

        // Merge duplicate emails - keep only the latest status for each job
        const mergedApplications = mergeJobApplications(analyzedEmails);

        // Process merged applications (only update existing jobs)
        for (const application of mergedApplications) {
          const userJobs = await db
            .collection(collectionName.JOBS)
            .findOne({ email: user.email });

          if (userJobs && userJobs.jobs) {
            // Find matching job using fuzzy matching
            const matchingJobIndex = userJobs.jobs.findIndex(
              (job: { title: string; company: string }) =>
                isSameJob(
                  { company: job.company, position: job.title },
                  { company: application.company, position: application.position }
                )
            );

            if (matchingJobIndex !== -1) {
              // Job found - check if we should update
              const existingJob = userJobs.jobs[matchingJobIndex];
              const shouldUpdate = shouldUpdateJobStatus(
                {
                  status: existingJob.status || "Applied",
                  date: existingJob.lastEmailDate || existingJob.date || new Date().toISOString(),
                },
                {
                  status: application.status,
                  date: application.date,
                }
              );

              if (shouldUpdate) {
                await db.collection(collectionName.JOBS).updateOne(
                  { email: user.email },
                  {
                    $set: {
                      [`jobs.${matchingJobIndex}.status`]: application.status,
                      [`jobs.${matchingJobIndex}.aiUpdated`]: true,
                      [`jobs.${matchingJobIndex}.lastEmailDate`]: application.date,
                      updatedAt: new Date(),
                    },
                  }
                );
                updatesCount++;
              }
            }
            // If no match, skip (only update existing jobs)
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
        // console.error(`Error syncing for user ${user.email}:`, error);
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
    // console.error("Error in cron job:", error);
    const errorMessage = error instanceof Error ? error.message : "Cron job failed";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

