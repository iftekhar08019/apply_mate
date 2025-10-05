import { collectionName, connectToDatabase } from "@/libs/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const jobs = await db
      .collection(collectionName.JOBS)
      .find({})
      .toArray();

    return NextResponse.json(jobs);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 });
  }
}
