import { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/libs/mongodb";

const DEFAULT_AVATAR = "https://i.ibb.co.com/ZRKJrzNz/5856.jpg"; 

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
          .collection("users")
          .findOne({ email: credentials.email });

        if (!user) return null;

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) return null;

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.image || DEFAULT_AVATAR, // default image
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
 callbacks: {
  async jwt({ token, user }) {
    if (user) {
      token.id = user.id;
      token.image = user.image;
    }
    return token;
  },
  async session({ session, token }) {
    if (session.user) { // <-- safe check
      session.user.id = token.id as string;
      session.user.image = token.image as string;
    }
    return session;
  },
},

  secret: process.env.NEXTAUTH_SECRET,
};
