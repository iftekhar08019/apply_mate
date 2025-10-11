import { authOptions } from "@/utils/authOptions"
import NextAuth from "next-auth"

// Force Node.js runtime for Netlify compatibility
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
