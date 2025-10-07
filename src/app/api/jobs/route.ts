import { collectionName, connectToDatabase } from "@/libs/mongodb";
import { NextResponse } from "next/server";


export async function GET(req: Request) {
  try {
    const { db } = await connectToDatabase();

    // extract email from query string
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    const userData = await db
      .collection(collectionName.JOBS)
      .findOne({ email });

    if (!userData) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ data: userData });
  } catch (error) {
    console.error("Error fetching user jobs:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, job } = body;
    if (!email || !job) return NextResponse.json({ message: "Email and job required" }, { status: 400 });

    // ensure jobId
    job.jobId = job.jobId ?? (globalThis.crypto?.randomUUID?.() ?? Date.now().toString());

    const { db } = await connectToDatabase();
    await db.collection(collectionName.JOBS).updateOne(
      { email },
      { $push: { jobs: job } },
      { upsert: true }
    );

    return NextResponse.json({ success: true, data: job }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { email, jobId, updates } = body;
    if (!email || !jobId || !updates) return NextResponse.json({ message: "Missing fields" }, { status: 400 });

    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const setObj: Record<string, any> = {};
    Object.entries(updates).forEach(([k, v]) => {
      setObj[`jobs.$.${k}`] = v;
    });

    const { db } = await connectToDatabase();
    const result = await db.collection(collectionName.JOBS).updateOne(
      { email, "jobs.jobId": jobId },
      { $set: setObj }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ message: "Job not found" }, { status: 404 });
    }

    // fetch updated job element
    const doc = await db.collection(collectionName.JOBS).findOne(
      { email },
      { projection: { jobs: { $elemMatch: { jobId } } } }
    );
    const updatedJob = doc?.jobs?.[0] ?? null;

    return NextResponse.json({ success: true, data: updatedJob }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}