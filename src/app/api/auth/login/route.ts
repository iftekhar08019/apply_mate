import { collectionName, connectToDatabase } from "@/libs/mongodb";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const { db } = await connectToDatabase();

  const user = await db.collection(collectionName.USERS).findOne({ email });
  if (!user) {
    return NextResponse.json({ message: "user not found" }, { status: 404 });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }
  // jwt generate

  return NextResponse.json({
    message: "Login Successfully",
    user: { email: user.email, name: user.name },
  });
}
