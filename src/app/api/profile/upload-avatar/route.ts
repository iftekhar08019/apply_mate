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

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ message: "File size must be less than 5MB" }, { status: 400 });
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ message: "File must be an image" }, { status: 400 });
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary with optimizations
    const uploadResult = await new Promise<{ secure_url: string }>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { 
          resource_type: "image",
          folder: "apply_mate/avatars",
          transformation: [
            { width: 400, height: 400, crop: "fill", gravity: "face" },
            { quality: "auto" },
            { fetch_format: "auto" }
          ]
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result as { secure_url: string });
        }
      ).end(buffer);
    });

    const { secure_url } = uploadResult;

    // Update user's avatar in MongoDB (NOT updating here, just in the profile update)
    // This way the EditProfileForm can handle the final update
    // const { db } = await connectToDatabase();
    // await db.collection(collectionName.USERS).updateOne(
    //   { _id: new ObjectId(session.user.id) },
    //   { $set: { image: secure_url } }
    // );

    return NextResponse.json({
      message: "Avatar uploaded successfully",
      avatarUrl: secure_url,
    }, { status: 200 });

  } catch (error) {
    console.error("Error uploading avatar:", error);
    return NextResponse.json({ 
      message: "Failed to upload avatar",
      error: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}
