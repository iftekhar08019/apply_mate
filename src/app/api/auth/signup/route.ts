import { collectionName, connectToDatabase } from "@/libs/mongodb";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";


const DEFAULT_AVATAR = "https://i.imgur.com/vIbJZdx.jpeg";

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();
  const { db } = await connectToDatabase();
  const existingUser = await db
    .collection(collectionName.USERS)
    .findOne({ email });
  if (existingUser) {
    return NextResponse.json(
      { message: "user already exists" },
      { status: 400 }
    );
  }
  const hasedPassword = await bcrypt.hash(password, 10);

  const result = await db.collection(collectionName.USERS).insertOne({
    name,
    email,
    password: hasedPassword,
    image: DEFAULT_AVATAR,
    createdAt: new Date(),
  });
  return NextResponse.json({
    message: "User Created",
    userId: result.insertedId,
    image: DEFAULT_AVATAR,
  });
}
