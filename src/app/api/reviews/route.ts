import { collectionName, connectToDatabase } from "@/libs/mongodb";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";

// GET all reviews
export async function GET() {
  try {
    const { db } = await connectToDatabase();
    
    const reviews = await db
      .collection(collectionName.REVIEWS)
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    // Transform the data to a more consistent format
    const transformedReviews = reviews.map(review => ({
      _id: review._id.toString(),
      userName: review.userName,
      userImage: review.userImage,
      userBio: review.userBio,
      rating: review.rating,
      comment: review.comment,
      createdAt: review.createdAt.toISOString(),
    }));

    return NextResponse.json({ success: true, data: transformedReviews });
  } catch (error) {
    // console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// POST a new review
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { rating, bio, comment } = body;

    // Validation
    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json(
        { success: false, message: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    if (!bio || bio.trim().length < 3) {
      return NextResponse.json(
        { success: false, message: "Bio/Role must be at least 3 characters" },
        { status: 400 }
      );
    }

    if (!comment || comment.trim().length < 10) {
      return NextResponse.json(
        { success: false, message: "Comment must be at least 10 characters" },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();

    // Check if user already submitted a review
    const existingReview = await db
      .collection(collectionName.REVIEWS)
      .findOne({ userEmail: session.user.email });

    if (existingReview) {
      return NextResponse.json(
        { success: false, message: "You have already submitted a review" },
        { status: 400 }
      );
    }

    const review = {
      userName: session.user.name || "Anonymous",
      userEmail: session.user.email,
      userImage: session.user.image || "https://i.imgur.com/YxEP0Zh.png",
      userBio: bio.trim(),
      rating,
      comment: comment.trim(),
      createdAt: new Date(),
    };

    const result = await db.collection(collectionName.REVIEWS).insertOne(review);

    return NextResponse.json(
      {
        success: true,
        message: "Review submitted successfully! Thank you for your feedback.",
        data: { ...review, _id: result.insertedId },
      },
      { status: 201 }
    );
  } catch (error) {
    // console.error("Error creating review:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

