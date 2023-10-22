import "@/styles/globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ThemeProvider } from "@/context/theme-provider";
import { SessionProvider } from "@/context/session-provider";
import { Toaster } from "@/components/ui/toaster";
import { getServerSession } from "next-auth";

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
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className={font.className}>
        <SessionProvider session={session}>
          <ThemeProvider>
            {children}
            <Toaster />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
