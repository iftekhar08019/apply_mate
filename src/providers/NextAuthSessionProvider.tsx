"use client"


import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import { ReactNode } from "react";

interface sessionProps {
    children: ReactNode;
    session?: Session | null
}
export default function SessionProvider({children, session}: sessionProps) {
  return (
      <NextAuthSessionProvider session={session}>
          {children}
  </NextAuthSessionProvider>
  )
}
