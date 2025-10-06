import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { collectionName, connectToDatabase } from "@/libs/mongodb";
import { ObjectId } from "mongodb";
import { authOptions } from "@/utils/authOptions";


export async function PATCH(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { name, bio } = await request.json();
    const userId = session.user.id;

    const { db } = await connectToDatabase();

    const result = await db.collection(collectionName.USERS).findOneAndUpdate(
      { _id: new ObjectId(userId) },
      { $set: { name, bio } },
      { returnDocument: "after" }
    );


    if (!result || !result.value) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const updatedUser = { ...result.value, password: undefined };

    return NextResponse.json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
