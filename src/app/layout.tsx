import "@/styles/globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { options } from "@/server/auth";
import { getServerSession } from "next-auth";

import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "@/context/session-provider";
import { ModalProvider } from "@/context/modal-provider";
import { ThemeProvider } from "@/context/theme-provider";
import { QueryProvider } from "@/context/query-provider";

const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "discourse",
  description: "Next Gen Chat Application Powered By Next.js",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(options);

  return (
    <html lang="en">
      <body className={font.className}>
        <SessionProvider session={session}>
          <ThemeProvider>
            <QueryProvider>{children}</QueryProvider>
            <Toaster />
            <ModalProvider />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
