import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { collectionName, connectToDatabase } from "@/libs/mongodb";

interface JobData {
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  url: string;
  date: string;
  status?: string;
  createdAt?: string;
  source?: string;
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { db } = await connectToDatabase();
    
    // Get user's jobs data
    const userData = await db
      .collection(collectionName.JOBS)
      .findOne({ email: session.user.email });

    if (!userData || !userData.jobs || userData.jobs.length === 0) {
      // Return empty stats if no jobs found
      return NextResponse.json({
        totalApplications: 0,
        statusSummary: {
          applied: 0,
          interview: 0,
          offer: 0,
          rejected: 0
        },
        recentApplications: [],
        responseRate: 0
      });
    }

    const jobs: JobData[] = userData.jobs;

    // Calculate total applications
    const totalApplications = jobs.length;

    // Calculate status summary
    const statusSummary = {
      applied: jobs.filter((job: JobData) => job.status === 'Applied' || !job.status).length,
      interview: jobs.filter((job: JobData) => job.status === 'Interview').length,
      offer: jobs.filter((job: JobData) => job.status === 'Offer').length,
      rejected: jobs.filter((job: JobData) => job.status === 'Rejected').length
    };

    // Calculate response rate (interviews + offers + rejected / total)
    const respondedApplications = statusSummary.interview + statusSummary.offer + statusSummary.rejected;
    const responseRate = totalApplications > 0 ? Math.round((respondedApplications / totalApplications) * 100) : 0;

    // Get recent applications (last 5, sorted by date)
    const recentApplications = jobs
      .sort((a: JobData, b: JobData) => new Date(b.date || b.createdAt || 0).getTime() - new Date(a.date || a.createdAt || 0).getTime())
      .slice(0, 5)
      .map((job: JobData, index: number) => ({
        id: index + 1,
        company: job.company || 'Unknown Company',
        role: job.title || 'Unknown Role',
        status: job.status || 'Applied',
        appliedDate: job.date || new Date().toISOString().split('T')[0],
        location: job.location || 'Location Not Specified',
        jobType: job.type || 'Not specified',
        url: job.url || '#'
      }));

    return NextResponse.json({
      totalApplications,
      statusSummary,
      recentApplications,
      responseRate
    });

  } catch (error) {
    // console.error("Error fetching dashboard stats:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
