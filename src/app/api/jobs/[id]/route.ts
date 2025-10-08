import { collectionName, connectToDatabase } from "@/libs/mongodb";
import { NextResponse } from "next/server";


// Update a specific job
export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { email, jobId, updates } = body;

    if (!email || !jobId || !updates) {
      return NextResponse.json({ message: "Email, jobId and updates required" }, { status: 400 });
    }

    const { db } = await connectToDatabase();

    const result = await db.collection(collectionName.JOBS).updateOne(
      { email, "jobs.jobId": jobId },
{ $set: { "jobs.$": { ...updates, jobId } } }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json({ message: "Job not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { db } = await connectToDatabase();

    // URL theke jobId niye asho
    const url = new URL(req.url);
    const jobId = url.pathname.split("/").pop(); // last part = jobId
    const email = url.searchParams.get("email"); // query param

    if (!email || !jobId) {
      return NextResponse.json({ message: "Email and jobId required" }, { status: 400 });
    }

    const result = await db.collection(collectionName.JOBS).updateOne(
      { email },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      { $pull: { jobs: { jobId } } as any } // remove job from jobs array
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json({ message: "Job not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
