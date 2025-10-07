import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/libs/mongodb';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
  try {
    console.log('=== saveJob API called ===');
    const body = await request.json();
    const { email, job } = body;
    
    console.log('Request body:', { email, job });

    // Validate required fields
    if (!email || !job) {
      console.log('Validation failed: missing email or job');
      return NextResponse.json(
        { error: 'Email and job data are required' },
        { status: 400 }
      );
    }

    // Validate job data structure
    if (!job.title || !job.company) {
      console.log('Validation failed: missing title or company');
      return NextResponse.json(
        { error: 'Job title and company are required' },
        { status: 400 }
      );
    }

    // Connect to database
    console.log('Connecting to database...');
    let db;
    try {
      const connection = await connectToDatabase();
      db = connection.db;
      console.log('Database connected successfully');
      console.log('Database name:', db.databaseName);
    } catch (dbError) {
      console.error('Database connection error:', dbError);
      return NextResponse.json(
        { error: 'Database connection failed' },
        { status: 500 }
      );
    }

    // Create job object to add to user's jobs array
    const jobData = {
      uid: uuidv4(),
      title: job.title,
      company: job.company,
      location: job.location || 'Not specified',
      type: job.type || 'unknown',
      description: job.description || '',
      status: job.status || 'Applied', // Default to "Applied" if not provided
      url: job.url || '',
      date: job.date || new Date().toISOString().split('T')[0],
      source: 'chrome-extension'
    };

    console.log('Adding job to user document:', jobData);

    // Check if user exists and add job to their jobs array
    try {
      // First, check if user exists
      const existingUser = await db.collection('jobs').findOne({ email: email });
      
      if (existingUser) {
        // Check if this job already exists for this user
        const isDuplicate = existingUser.jobs?.some((existingJob: typeof jobData) => 
          existingJob.title === jobData.title && 
          existingJob.company === jobData.company &&
          existingJob.url === jobData.url
        );

        if (isDuplicate) {
          console.log('Duplicate job detected, not saving');
          return NextResponse.json({
            message: 'Job already exists',
            totalJobs: existingUser.jobs?.length || 0,
            isDuplicate: true
          });
        }

        // User exists and job is not duplicate, add job to their existing jobs array
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const updateResult = await (db.collection('jobs') as any).updateOne(
          { email: email },
          { 
            $push: { jobs: jobData },
            $set: { updatedAt: new Date() }
          }
        );

        if (updateResult.modifiedCount > 0) {
          const updatedUser = await db.collection('jobs').findOne({ email: email });
          const totalJobs = updatedUser?.jobs?.length || 0;
          console.log('Job added to existing user, total jobs:', totalJobs);
          
          return NextResponse.json({
            message: 'Job saved successfully',
            totalJobs: totalJobs
          });
        } else {
          console.log('Failed to update existing user');
          return NextResponse.json(
            { error: 'Failed to update user' },
            { status: 500 }
          );
        }
      } else {
        // User doesn't exist, create new user with first job
        const newUser = {
          email: email,
          jobs: [jobData],
          createdAt: new Date(),
          updatedAt: new Date()
        };

        const insertResult = await db.collection('jobs').insertOne(newUser);
        console.log('New user created with first job, inserted ID:', insertResult.insertedId);
        
        return NextResponse.json({
          message: 'Job saved successfully',
          totalJobs: 1
        });
      }
    } catch (dbError) {
      console.error('Error saving job to user document:', dbError);
      return NextResponse.json(
        { error: 'Failed to save job' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Error saving job:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
