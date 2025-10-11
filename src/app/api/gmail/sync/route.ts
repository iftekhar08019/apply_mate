import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
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

export async function POST() {
  try {
    // console.log("🟢 [API] Gmail sync API called");
    
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      // console.log("❌ [API] No session or user email");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // console.log("🟢 [API] User authenticated:", session.user.email);

    const { db } = await connectToDatabase();

    // Get user with Gmail tokens
    const user = await db
      .collection(collectionName.USERS)
      .findOne({ email: session.user.email });

    if (!user?.gmailTokens) {
      // console.log("❌ [API] Gmail not connected for user");
      return NextResponse.json(
        { error: "Gmail not connected" },
        { status: 400 }
      );
    }

    // console.log("🟢 [API] Gmail tokens found, creating OAuth client");

    // Create OAuth2 client
    const oauth2Client = createOAuth2Client(user.gmailTokens as GmailTokens);

    // Fetch recent emails (last 24 hours, max 10 emails)
    // console.log("🟢 [API] Fetching emails from Gmail (last 24 hours, max 10)...");
    const emails = await fetchRecentEmails(oauth2Client, 10);
    // console.log(`🟢 [API] Fetched ${emails.length} emails from Gmail`);

    interface ApplicationUpdate {
      id: string;
      company: string;
      position: string;
      oldStatus?: string;
      newStatus: string;
    }

    interface ProcessedEmail {
      email: string;
      analysis: {
        company: string;
        position: string;
        status: string;
      };
    }

    const updates: ApplicationUpdate[] = [];
    const processed: ProcessedEmail[] = [];
    
    // First, analyze all emails and collect matches
    const analyzedEmails: Array<{
      company: string;
      position: string;
      status: "Applied" | "Interview" | "Offer" | "Rejected";
      date: string;
    }> = [];

    // console.log("🟢 [API] Starting email analysis loop...");
    
    for (let i = 0; i < emails.length; i++) {
      const email = emails[i];
      try {
        // console.log(`📧 [EMAIL ${i + 1}/${emails.length}] Analyzing: "${email.subject.substring(0, 50)}..."`);
        
        const emailData = {
          id: email.id || undefined,
          subject: email.subject,
          from: email.from,
          date: email.date,
          body: email.body,
        };
        
        const analysis = await analyzeEmailWithAI(emailData);
        
        // console.log(`📧 [EMAIL ${i + 1}] AI Analysis result:`, analysis);

        if (analysis) {
          // Process all valid matches
          // console.log(`✅ [EMAIL ${i + 1}] Valid job email found:`, {
          //   company: analysis.company,
          //   position: analysis.position,
          //   status: analysis.status
          // });
          
          processed.push({
            email: email.subject,
            analysis,
          });

          analyzedEmails.push({
            ...analysis,
            date: email.date,
          });
        } else {
          // console.log(`⚪ [EMAIL ${i + 1}] Not a job email or low confidence`);
        }
      } catch {
        // Continue processing other emails even if one fails
        // console.error(`❌ [EMAIL ${i + 1}] Failed to analyze email "${email.subject}":`, error);
        continue;
      }
    }

    // console.log(`🟢 [API] Email analysis complete. Found ${analyzedEmails.length} job-related emails`);
    // console.log("🟢 [API] Analyzed emails before merge:", analyzedEmails);

    // Merge duplicate emails - keep only the latest status for each job
    // console.log("🟢 [API] Merging duplicate applications...");
    const mergedApplications = mergeJobApplications(analyzedEmails);
    // console.log(`🟢 [API] After merge: ${mergedApplications.length} unique jobs`, mergedApplications);

    // Now process the merged applications
    // console.log("🟢 [API] Processing merged applications against database...");
    
    for (let i = 0; i < mergedApplications.length; i++) {
      const application = mergedApplications[i];
      // console.log(`🔄 [APP ${i + 1}/${mergedApplications.length}] Processing:`, {
      //   company: application.company,
      //   position: application.position,
      //   status: application.status
      // });
      
      // Find user's jobs document
      const userJobs = await db
        .collection(collectionName.JOBS)
        .findOne({ email: session.user.email });

      // console.log(`🔄 [APP ${i + 1}] User has ${userJobs?.jobs?.length || 0} existing jobs in database`);

      if (userJobs && userJobs.jobs) {
        // Find matching job using improved matching logic
        const matchingJobIndex = userJobs.jobs.findIndex(
          (job: { title: string; company: string }) =>
            isSameJob(
              { company: job.company, position: job.title },
              { company: application.company, position: application.position }
            )
        );

        // console.log(`🔄 [APP ${i + 1}] Matching job index:`, matchingJobIndex);

        if (matchingJobIndex !== -1) {
          // Job found - check if we should update based on date
          const existingJob = userJobs.jobs[matchingJobIndex];
          // console.log(`🔄 [APP ${i + 1}] Existing job found:`, {
          //   company: existingJob.company,
          //   position: existingJob.title,
          //   currentStatus: existingJob.status,
          //   currentDate: existingJob.lastEmailDate || existingJob.date
          // });
          
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

          // console.log(`🔄 [APP ${i + 1}] Should update?`, shouldUpdate);

          if (shouldUpdate) {
            const oldStatus = existingJob.status;
            
            // console.log(`💾 [APP ${i + 1}] Updating job in database:`, {
            //   oldStatus,
            //   newStatus: application.status
            // });
            
            await db.collection(collectionName.JOBS).updateOne(
              { email: session.user.email },
              {
                $set: {
                  [`jobs.${matchingJobIndex}.status`]: application.status,
                  [`jobs.${matchingJobIndex}.aiUpdated`]: true,
                  [`jobs.${matchingJobIndex}.lastEmailDate`]: application.date,
                  updatedAt: new Date(),
                },
              }
            );

            // console.log(`✅ [APP ${i + 1}] Database updated successfully!`);

            updates.push({
              id: matchingJobIndex.toString(),
              company: existingJob.company,
              position: existingJob.title,
              oldStatus: oldStatus,
              newStatus: application.status,
            });
          } else {
            // console.log(`⏭️ [APP ${i + 1}] Skipped - not newer than existing data`);
          }
        } else {
          // console.log(`⏭️ [APP ${i + 1}] No matching job found in database - skipping (only update existing jobs)`);
        }
        // If job not found, skip it (only update existing jobs, don't create new ones)
      } else {
        // console.log(`⚪ [APP ${i + 1}] User has no jobs document yet`);
      }
    }
    
    // console.log(`🟢 [API] Processing complete. Updated ${updates.length} applications`);
    // console.log("📊 [API SUMMARY]", {
    //   totalEmailsFetched: emails.length,
    //   jobEmailsFound: processed.length,
    //   uniqueJobsAfterMerge: mergedApplications.length,
    //   applicationsActuallyUpdated: updates.length,
    //   updateDetails: updates
    // });

    // Update last sync time
    // console.log("🟢 [API] Updating last sync time in database...");
    await db.collection(collectionName.USERS).updateOne(
      { email: session.user.email },
      {
        $set: {
          lastGmailSync: new Date(),
        },
      }
    );

    // console.log("✅ [API] Gmail sync completed successfully!");

    return NextResponse.json({
      success: true,
      emailsProcessed: emails.length,
      updatesFound: processed.length,
      applicationsUpdated: updates.length,
      jobsAfterMerge: mergedApplications.length,
      updates,
      message: `Processed ${emails.length} emails, found ${processed.length} job-related emails, merged to ${mergedApplications.length} unique jobs, updated ${updates.length} existing applications`,
    });
  } catch {
    // console.error("Error occurred");
    return NextResponse.json(
      { 
        error: "Failed to sync Gmail",
        success: false 
      },
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
  } catch {
    // console.error("Error occurred");
    return NextResponse.json(
      { error: "Failed to check sync status" },
      { status: 500 }
    );
  }
}

