import { collectionName, connectToDatabase } from "@/libs/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { db } = await connectToDatabase();
    const {id} = await params
    const user = await db
      .collection(collectionName.USERS)
      .findOne({ _id: new ObjectId(id) });
    if (!user) {
      return NextResponse.json({ status: 404 });
    }
    const formattedUser = {
      ...user,
      _id: user._id.toString(),
    };
    return NextResponse.json(formattedUser);
  } catch {
    return NextResponse.json({ status: 500 });
  }
}
