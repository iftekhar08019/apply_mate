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
    const {name, bio, image}=await request.json()
    const { db } = await connectToDatabase();
    let filter = {};
    if (userId) {
      filter = {_id: new ObjectId(userId)}

    } else if(userEmail) {
      filter= {email : userEmail}
    } else {
      return NextResponse.json({status: 404})
    }
   const result = await db.collection(collectionName.USERS).findOneAndUpdate(
  filter,
  { $set: { name, bio, image } },
  { returnDocument: "after" }
);
    console.log(result);


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
