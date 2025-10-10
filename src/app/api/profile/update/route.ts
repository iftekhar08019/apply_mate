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
    const userId = session?.user?.id;
    const userEmail = session?.user?.email;
    const { name, bio, image } = await request.json();
    
    const { db } = await connectToDatabase();
    
    let filter = {};
    if (userId) {
      filter = { _id: new ObjectId(userId) };
    } else if (userEmail) {
      filter = { email: userEmail };
    } else {
      return NextResponse.json({ message: "No user identifier found" }, { status: 400 });
    }

    // Prepare update data (only include defined fields)
    const updateData: Record<string, string> = { name, bio };
    if (image !== undefined) updateData.image = image;

    // Update the user document
    const result = await db.collection(collectionName.USERS).findOneAndUpdate(
      filter,
      { $set: updateData },
      { returnDocument: "after" }
    );

    // console.log("Update result:", result);

    // Check if user was found and updated
    if (!result) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Extract the updated document (MongoDB v5+ uses 'value', v6+ might use differently)
    const updatedUser = result.value || result;
    
    if (!updatedUser) {
      return NextResponse.json({ message: "Failed to retrieve updated user" }, { status: 404 });
    }

    // Remove password from response
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = updatedUser as Record<string, unknown>;

    return NextResponse.json({
      message: "Profile updated successfully",
      user: userWithoutPassword,
    }, { status: 200 });
    
  } catch (error) {
    // console.error("Error updating profile:", error);
    return NextResponse.json({ 
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}
