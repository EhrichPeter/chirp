import React from "react";
import "@/styles/globals.css";

import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import BottomDrawer from "./_components/drawer";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Chirp",
  description: "An emoji only social network",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased ",
            inter.variable,
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <main className="flex justify-center">
              <div className="flex h-full min-h-screen w-full flex-col border-secondary md:max-w-2xl md:border-x">
                {children}
              </div>
            </main>
            <BottomDrawer />
            <Toaster position="bottom-center" reverseOrder={false} />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
