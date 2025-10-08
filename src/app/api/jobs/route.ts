import { collectionName, connectToDatabase } from "@/libs/mongodb";
import { NextResponse } from "next/server";

// Get all jobs for a user
export async function GET(req: Request) {
  try {
    const { db } = await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email)
      return NextResponse.json({ message: "Email is required" }, { status: 400 });

    const userData = await db.collection(collectionName.JOBS).findOne({ email });

    if (!userData)
      return NextResponse.json({ message: "User not found" }, { status: 404 });

    return NextResponse.json({ data: userData });
  } catch (error) {
    console.error("Error fetching user jobs:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// Add a new job
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, job } = body;

    if (!email || !job)
      return NextResponse.json({ message: "Email and job required" }, { status: 400 });

    job.jobId = job.jobId ?? (crypto.randomUUID?.() ?? Date.now().toString());
    job.createdAt = new Date();

    const { db } = await connectToDatabase();
    await db.collection(collectionName.JOBS).updateOne(
      { email },
      { $push: { jobs: job }, $setOnInsert: { email, createdAt: new Date() } },
      { upsert: true }
    );

    return NextResponse.json({ success: true, data: job }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

