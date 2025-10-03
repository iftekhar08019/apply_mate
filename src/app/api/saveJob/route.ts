import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/libs/mongodb';

// Types for job data
interface JobData {
  title: string;
  description: string;
  company: string;
  location: string;
  type: 'remote' | 'hybrid' | 'onsite' | 'unknown';
  url: string;
  date: string;
}

interface SaveJobRequest {
  email: string;
  job: JobData;
}

interface UserDocument {
  email: string;
  jobs: JobData[];
  createdAt: Date;
  updatedAt: Date;
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body: SaveJobRequest = await request.json();
    const { email, job } = body;

    // Validate required fields
    if (!email || !job) {
      return NextResponse.json(
        { message: 'Email and job data are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate job data
    const requiredJobFields = ['title', 'description', 'company', 'location', 'url', 'date'];
    const missingFields = requiredJobFields.filter(field => !job[field as keyof JobData]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { message: `Missing required job fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate job type
    const validJobTypes = ['remote', 'hybrid', 'onsite', 'unknown'];
    if (!validJobTypes.includes(job.type)) {
      return NextResponse.json(
        { message: 'Invalid job type' },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    const { db } = await connectToDatabase();
    const jobsCollection = db.collection<UserDocument>('jobs');

    // Check if user already exists
    const existingUser = await jobsCollection.findOne({ email });

    if (existingUser) {
      // User exists - check if job already exists (by URL to avoid duplicates)
      const jobExists = existingUser.jobs.some(existingJob => existingJob.url === job.url);
      
      if (jobExists) {
        return NextResponse.json(
          { message: 'Job already saved for this user' },
          { status: 409 }
        );
      }

      // Add new job to existing user's jobs array
      await jobsCollection.updateOne(
        { email },
        {
          $push: { jobs: job },
          $set: { updatedAt: new Date() }
        }
      );

      return NextResponse.json({
        message: 'Job added successfully',
        totalJobs: existingUser.jobs.length + 1
      });

    } else {
      // New user - create new document
      const newUser: UserDocument = {
        email,
        jobs: [job],
        createdAt: new Date(),
        updatedAt: new Date()
      };

      await jobsCollection.insertOne(newUser);

      return NextResponse.json({
        message: 'Job saved successfully for new user',
        totalJobs: 1
      });
    }

  } catch (error) {
    console.error('Error saving job:', error);
    
    // Handle specific MongoDB errors
    if (error instanceof Error) {
      if (error.message.includes('duplicate key')) {
        return NextResponse.json(
          { message: 'Job already exists' },
          { status: 409 }
        );
      }
    }

    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve user's jobs (optional - for testing/debugging)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { message: 'Email parameter is required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    const { db } = await connectToDatabase();
    const jobsCollection = db.collection<UserDocument>('jobs');

    // Find user's jobs
    const user = await jobsCollection.findOne({ email });

    if (!user) {
      return NextResponse.json({
        message: 'No jobs found for this email',
        jobs: []
      });
    }

    return NextResponse.json({
      message: 'Jobs retrieved successfully',
      jobs: user.jobs,
      totalJobs: user.jobs.length,
      lastUpdated: user.updatedAt
    });

  } catch (error) {
    console.error('Error retrieving jobs:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE endpoint to remove a specific job (optional)
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const jobUrl = searchParams.get('jobUrl');

    if (!email || !jobUrl) {
      return NextResponse.json(
        { message: 'Email and jobUrl parameters are required' },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    const { db } = await connectToDatabase();
    const jobsCollection = db.collection<UserDocument>('jobs');

    // Remove the specific job from user's jobs array
    const result = await jobsCollection.updateOne(
      { email },
      {
        $pull: { jobs: { url: jobUrl } },
        $set: { updatedAt: new Date() }
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { message: 'Job not found for this user' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Job deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting job:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
