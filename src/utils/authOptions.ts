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
    }),
  ],

  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  callbacks: {
    async signIn({ user, account }) {
      try {
        const { db } = await connectToDatabase();

        // Handle Google OAuth login
        if (account?.provider === "google") {
          const existingUser = await db
            .collection(collectionName.USERS)
            .findOne({ email: user.email });

          if (!existingUser) {
            // ✅ First-time Google user: Create new account automatically
            const insertResult = await db.collection(collectionName.USERS).insertOne({
              name: user.name,
              email: user.email,
              image: user.image || DEFAULT_AVATAR,
              provider: account.provider,
              createdAt: new Date(),
            });

            // ✅ Assign the newly created _id to user.id
            user.id = insertResult.insertedId.toString();
          } else {
            // ✅ Existing user: Retrieve their data
            user.id = existingUser._id.toString();
          }
        }

        return true;
      } catch (error) {
        console.error("SignIn callback error:", error);
        // Allow sign in to proceed even if DB fails (for credentials provider)
        // Google OAuth users won't be able to sign in if DB is down
        return account?.provider === "credentials";
      }
    },

    async redirect({ url, baseUrl }) {
      // Prevent infinite redirect loops
      if (url === baseUrl || url === `${baseUrl}/` || url === `${baseUrl}/login`) {
        return `${baseUrl}/dashboard`;
      }
      
      // Allows relative callback URLs
      if (url.startsWith("/")) {
        // Prevent /login redirecting to itself
        if (url === "/login" || url.startsWith("/login?")) {
          return "/dashboard";
        }
        return `${baseUrl}${url}`;
      }
      
      // Allows callback URLs on the same origin
      try {
        const urlObj = new URL(url);
        const baseUrlObj = new URL(baseUrl);
        
        if (urlObj.origin === baseUrlObj.origin) {
          // Prevent login page redirects
          if (urlObj.pathname === "/login") {
            return `${baseUrl}/dashboard`;
          }
          return url;
        }
      } catch {
        // Invalid URL, return dashboard
        return `${baseUrl}/dashboard`;
      }
      
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
