// GET route: /api/profile/me.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { collectionName, connectToDatabase } from "@/libs/mongodb";
import { ObjectId } from "mongodb";


export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { db } = await connectToDatabase();
  const user = await db.collection(collectionName.USERS).findOne({ _id: new ObjectId(session.user.id) });

  if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

  const { password, ...rest } = user;
  return NextResponse.json(rest);
}
