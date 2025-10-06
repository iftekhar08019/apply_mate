import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { v2 as cloudinary } from "cloudinary";
import { connectToDatabase, collectionName } from "@/libs/mongodb";
import { ObjectId } from "mongodb";
import { authOptions } from "@/utils/authOptions";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("avatar") as File;

    if (!file) {
      return NextResponse.json({ message: "No file provided" }, { status: 400 });
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary
    const uploadResult = await new Promise<{ secure_url: string }>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { resource_type: "image" },
        (error, result) => {
          if (error) return reject(error);
          resolve(result as { secure_url: string });
        }
      ).end(buffer);
    });

    const { secure_url } = uploadResult;

    // Update user's avatar in MongoDB
    const { db } = await connectToDatabase();
    await db.collection(collectionName.USERS).updateOne(
      { _id: new ObjectId(session.user.id) },
      { $set: { image: secure_url } }
    );

    return NextResponse.json({
      message: "Avatar uploaded successfully",
      avatarUrl: secure_url,
    }, { status: 200 });

  } catch (error) {
    console.error("Error uploading avatar:", error);
    return NextResponse.json({ message: "Failed to upload avatar" }, { status: 500 });
  }
}
