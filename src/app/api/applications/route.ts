import { collectionName, connectToDatabase } from "@/libs/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const applications = await db
      .collection(collectionName.APPLICATIONS)
      .find({})
      .toArray();

    return NextResponse.json(applications);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch applications" }, { status: 500 });
  }
}
