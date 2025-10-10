"use client";
import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
import { ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Session } from "next-auth";

export interface sessionProps {
  children: ReactNode;
  session?: Session | null;
}
export default function SessionProvider({ children, session }: sessionProps) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <NextAuthSessionProvider session={session}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </NextAuthSessionProvider>
  );
}
