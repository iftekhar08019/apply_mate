import { collectionName, connectToDatabase } from "@/libs/mongodb";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();

    // Check if user exists
    const user = await db
      .collection(collectionName.USERS)
      .findOne({ email: email.toLowerCase() });

    // For security, always return success even if user doesn't exist
    // This prevents email enumeration attacks
    if (!user) {
      return NextResponse.json({
        message: "If an account exists with this email, you will receive a password reset link.",
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // Set expiration time (1 hour from now)
    const resetTokenExpiry = new Date(Date.now() + 3600000);

    // Save hashed token to database
    await db.collection(collectionName.USERS).updateOne(
      { email: email.toLowerCase() },
      {
        $set: {
          resetPasswordToken: hashedToken,
          resetPasswordExpiry: resetTokenExpiry,
        },
      }
    );

    // Create reset URL
    const resetUrl = `${process.env.NEXTAUTH_URL || "https://apply-mate-two.vercel.app"}/reset-password?token=${resetToken}`;

    // Send email using Resend
    try {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
        to: email,
        subject: "Password Reset Request - ApplyMate",
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 20px 0;">
                <tr>
                  <td align="center">
                    <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                      <!-- Header -->
                      <tr>
                        <td style="background: linear-gradient(135deg, #0439e6 0%, #0051ff 100%); padding: 40px 30px; text-align: center;">
                          <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">ApplyMate</h1>
                          <p style="margin: 10px 0 0 0; color: #ffffff; opacity: 0.9; font-size: 14px;">AI-Powered Job Application Tracker</p>
                        </td>
                      </tr>
                      
                      <!-- Content -->
                      <tr>
                        <td style="padding: 40px 30px;">
                          <h2 style="margin: 0 0 20px 0; color: #1a1a1a; font-size: 24px; font-weight: 600;">Reset Your Password</h2>
                          
                          <p style="margin: 0 0 20px 0; color: #4a4a4a; font-size: 16px; line-height: 1.6;">
                            Hello,
                          </p>
                          
                          <p style="margin: 0 0 20px 0; color: #4a4a4a; font-size: 16px; line-height: 1.6;">
                            We received a request to reset your password for your ApplyMate account. Click the button below to create a new password:
                          </p>
                          
                          <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                            <tr>
                              <td align="center">
                                <a href="${resetUrl}" style="display: inline-block; padding: 16px 40px; background: linear-gradient(135deg, #0439e6 0%, #0051ff 100%); color: #ffffff; text-decoration: none; font-size: 16px; font-weight: 600; border-radius: 8px; box-shadow: 0 4px 12px rgba(4, 57, 230, 0.3);">
                                  Reset Password
                                </a>
                              </td>
                            </tr>
                          </table>
                          
                          <p style="margin: 0 0 15px 0; color: #4a4a4a; font-size: 14px; line-height: 1.6;">
                            Or copy and paste this link into your browser:
                          </p>
                          
                          <p style="margin: 0 0 25px 0; padding: 15px; background-color: #f8f9fa; border-radius: 6px; border-left: 4px solid #0439e6; word-break: break-all;">
                            <a href="${resetUrl}" style="color: #0439e6; text-decoration: none; font-size: 14px;">${resetUrl}</a>
                          </p>
                          
                          <div style="margin: 30px 0; padding: 20px; background-color: #fff3cd; border-radius: 8px; border-left: 4px solid #ffc107;">
                            <p style="margin: 0; color: #856404; font-size: 14px; line-height: 1.6;">
                              <strong>⚠️ Security Notice:</strong> This link will expire in 1 hour. If you didn't request a password reset, please ignore this email or contact support if you have concerns.
                            </p>
                          </div>
                          
                          <p style="margin: 25px 0 0 0; color: #6a6a6a; font-size: 14px; line-height: 1.6;">
                            Best regards,<br>
                            <strong style="color: #0439e6;">The ApplyMate Team</strong>
                          </p>
                        </td>
                      </tr>
                      
                      <!-- Footer -->
                      <tr>
                        <td style="background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e9ecef;">
                          <p style="margin: 0 0 10px 0; color: #6a6a6a; font-size: 12px;">
                            This is an automated email, please do not reply.
                          </p>
                          <p style="margin: 0; color: #6a6a6a; font-size: 12px;">
                            © ${new Date().getFullYear()} ApplyMate. All rights reserved.
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </body>
          </html>
        `,
      });
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return NextResponse.json(
        { message: "Failed to send reset email. Please try again later." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "If an account exists with this email, you will receive a password reset link.",
    });
  } catch {
    console.error("Error occurred");
    return NextResponse.json(
      { message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

