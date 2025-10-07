import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { connectToDatabase, collectionName } from "@/libs/mongodb";
import bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";
import { authOptions } from "@/utils/authOptions";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { currentPassword, newPassword } = await request.json();
    const userId = session.user.id as string; // TypeScript-safe

    const { db } = await connectToDatabase();

    // Find user by id
    const user = await db.collection(collectionName.USERS).findOne({ _id: new ObjectId(userId) });

    if (!user || !user.password) {
      return NextResponse.json({ message: "User not found or password not set" }, { status: 404 });
    }

    // Compare current password
    const isPasswordCorrect = await bcrypt.compare(currentPassword, user.password);

    if (!isPasswordCorrect) {
      return NextResponse.json({ message: "Incorrect current password" }, { status: 400 });
    }

    // Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update password in MongoDB
    await db.collection(collectionName.USERS).updateOne(
      { _id: new ObjectId(userId) },
      { $set: { password: hashedNewPassword } }
    );

    return NextResponse.json({ message: "Password changed successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error changing password:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
