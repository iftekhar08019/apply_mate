import { collectionName, connectToDatabase } from "@/libs/mongodb";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const { db } = await connectToDatabase();
    const body = await req.json();
    const { email, uid, updatedJob } = body;

    if (!email || !uid || !updatedJob) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    // Update specific job using positional $ operator
    const result = await db.collection(collectionName.JOBS).updateOne(
      { email, "jobs.uid": uid },
      { $set: { "jobs.$": { ...updatedJob, uid } } }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json({ message: "Job not found or not updated" }, { status: 404 });
    }

    return NextResponse.json({ message: "Job updated successfully" }, { status: 200 });
  } catch (error) {
    // console.error("Error updating job:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
