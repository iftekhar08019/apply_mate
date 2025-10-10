import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase, collectionName } from "@/libs/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.redirect(
        new URL("/login?error=unauthorized", request.url)
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code");

    if (!code) {
      return NextResponse.redirect(
        new URL("/dashboard/profile?error=no_code", request.url)
      );
    }

    const oauth2Client = new google.auth.OAuth2(
      process.env.GMAIL_CLIENT_ID,
      process.env.GMAIL_CLIENT_SECRET,
      process.env.GMAIL_REDIRECT_URI
    );

    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Store tokens in database
    const { db } = await connectToDatabase();
    await db.collection(collectionName.USERS).updateOne(
      { email: session.user.email },
      {
        $set: {
          gmailTokens: {
            access_token: tokens.access_token,
            refresh_token: tokens.refresh_token,
            scope: tokens.scope,
            token_type: tokens.token_type,
            expiry_date: tokens.expiry_date,
          },
          gmailConnected: true,
          gmailConnectedAt: new Date(),
        },
      }
    );

    // Return HTML that closes popup and refreshes parent
    return new NextResponse(
      `
      <!DOCTYPE html>
      <html>
        <head><title>Gmail Connected</title></head>
        <body>
          <script>
            // Close popup and notify parent
            if (window.opener) {
              window.opener.postMessage({ type: 'gmail_connected', success: true }, '*');
              window.close();
            } else {
              // Fallback if not popup - go to dashboard
              window.location.href = '/dashboard';
            }
          </script>
          <p>Gmail connected successfully! This window will close automatically...</p>
        </body>
      </html>
      `,
      {
        status: 200,
        headers: { 'Content-Type': 'text/html' },
      }
    );
  } catch (error) {
    // console.error("Error in Gmail callback:", error);
    // Return HTML with error message
    return new NextResponse(
      `
      <!DOCTYPE html>
      <html>
        <head><title>Gmail Connection Failed</title></head>
        <body>
          <script>
            if (window.opener) {
              window.opener.postMessage({ type: 'gmail_connected', success: false, error: 'Connection failed' }, '*');
              window.close();
            } else {
              window.location.href = '/dashboard';
            }
          </script>
          <p>Failed to connect Gmail. This window will close automatically...</p>
        </body>
      </html>
      `,
      {
        status: 200,
        headers: { 'Content-Type': 'text/html' },
      }
    );
  }
}

