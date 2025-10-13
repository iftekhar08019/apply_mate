import { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectToDatabase, collectionName } from "@/libs/mongodb";
import GoogleProvider from "next-auth/providers/google";

const DEFAULT_AVATAR = "https://i.imgur.com/YxEP0Zh.png"; 

interface AuthUser extends User {
  id: string;
  name: string;
  email: string;
  image: string | null;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: Record<"email" | "password", string> | undefined
      ): Promise<AuthUser | null> {
        if (!credentials?.email || !credentials.password) return null;

        const { db } = await connectToDatabase();
        const user = await db
          .collection(collectionName.USERS)
          .findOne({ email: credentials.email });

        if (!user) return null;

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) return null;

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.image || DEFAULT_AVATAR,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
  ],

  pages: {
    signIn: "/login",
    error: "/login", // Redirect to login page on error
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  callbacks: {
    async signIn({ user, account }) {
      try {
        // Only handle Google OAuth - credentials are handled by authorize()
        if (account?.provider === "google") {
          console.log("🔵 Google OAuth sign-in attempt for:", user.email);
          
          const { db } = await connectToDatabase();
          
          const existingUser = await db
            .collection(collectionName.USERS)
            .findOne({ email: user.email });

          if (!existingUser) {
            // ✅ First-time Google user: Create new account automatically
            console.log("✅ Creating new Google user:", user.email);
            
            const insertResult = await db.collection(collectionName.USERS).insertOne({
              name: user.name || "Google User",
              email: user.email,
              image: user.image || DEFAULT_AVATAR,
              provider: account.provider,
              createdAt: new Date(),
              updatedAt: new Date(),
            });

            // ✅ Assign the newly created _id to user.id
            user.id = insertResult.insertedId.toString();
            console.log("✅ New Google user created with ID:", user.id);
          } else {
            // ✅ Existing user: Retrieve their data and update image if from Google
            user.id = existingUser._id.toString();
            user.name = existingUser.name || user.name;
            
            // Update image if signing in with Google and image changed
            if (user.image && user.image !== existingUser.image) {
              await db.collection(collectionName.USERS).updateOne(
                { _id: existingUser._id },
                { 
                  $set: { 
                    image: user.image,
                    updatedAt: new Date() 
                  } 
                }
              );
            }
            
            console.log("✅ Existing Google user found:", user.id);
          }
        }

        return true;
      } catch (error) {
        console.error("❌ SignIn callback error:", error);
        console.error("Error details:", {
          provider: account?.provider,
          userEmail: user?.email,
          userName: user?.name,
          errorMessage: error instanceof Error ? error.message : 'Unknown error',
          errorStack: error instanceof Error ? error.stack : undefined
        });
        
        // ⚠️ For Google OAuth errors, we still allow sign-in but log the error
        // This prevents user lockout due to temporary database issues
        // The user will be created in JWT but may need to be synced to DB later
        if (account?.provider === "google") {
          console.warn("⚠️ Allowing Google sign-in despite error - user data may need manual sync");
          // Assign a temporary ID if none exists
          if (!user.id) {
            user.id = `temp_${Date.now()}`;
          }
        }
        
        // Allow sign-in to proceed
        return true;
      }
    },

    async redirect({ url, baseUrl }) {
      console.log("🔄 NextAuth redirect:", { url, baseUrl });
      
      // Aggressive loop detection - check URL length
      if (url.length > 500) {
        console.error("❌ Redirect loop detected - URL too long");
        return `${baseUrl}/dashboard`;
      }
      
      // Count how many times callbackUrl appears (indicates nesting)
      const callbackCount = (url.match(/callbackUrl/g) || []).length;
      if (callbackCount > 2) {
        console.error("❌ Redirect loop detected - too many callbackUrls");
        return `${baseUrl}/dashboard`;
      }
      
      // Detect /login redirecting to /login
      if (url.includes("/login") && url.includes("%2Flogin")) {
        console.error("❌ Redirect loop detected - login to login");
        return `${baseUrl}/dashboard`;
      }
      
      // Handle relative URLs
      if (url.startsWith("/")) {
        const fullUrl = `${baseUrl}${url}`;
        console.log("✅ Redirecting to relative URL:", fullUrl);
        return fullUrl;
      }
      
      // Handle same-origin URLs
      if (url.startsWith(baseUrl)) {
        console.log("✅ Redirecting to same-origin URL:", url);
        return url;
      }
      
      // Default: redirect to dashboard after successful login
      console.log("✅ Default redirect to dashboard");
      return `${baseUrl}/dashboard`;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = (user as AuthUser).id || token.id;
        token.image = user.image || token.image;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.image = token.image as string;
      }
      return session;
    },
  },


  secret: process.env.NEXTAUTH_SECRET,
};
