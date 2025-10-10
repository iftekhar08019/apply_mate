import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { connectToDatabase, collectionName } from "@/libs/mongodb";

export async function POST() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { db } = await connectToDatabase();

    // Remove Gmail tokens and connection status
    await db.collection(collectionName.USERS).updateOne(
      { email: session.user.email },
      {
        $unset: {
          gmailTokens: "",
          gmailConnectedAt: "",
          lastGmailSync: "",
        },
        $set: {
          gmailConnected: false,
        },
      }
    );

    return NextResponse.json({
      success: true,
      message: "Gmail disconnected successfully",
    });
  } catch (error) {
    console.error("Error disconnecting Gmail:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to disconnect Gmail";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

