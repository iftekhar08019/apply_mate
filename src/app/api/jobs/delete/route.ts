import { collectionName, connectToDatabase } from "@/libs/mongodb";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    const { db } = await connectToDatabase();
    const body = await req.json();
    const { email, uid } = body;

    if (!email || !uid) {
      return NextResponse.json({ message: "Email and Job UID are required" }, { status: 400 });
    }

    // Pull the job with matching uid from the jobs array
    const result = await db.collection(collectionName.JOBS).updateOne(
      { email },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      { $pull: { jobs: { uid } } as any }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json({ message: "Job not found or already deleted" }, { status: 404 });
    }

    return NextResponse.json({ message: "Job deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting job:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
