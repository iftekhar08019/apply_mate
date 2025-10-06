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
