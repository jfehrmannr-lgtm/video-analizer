import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SiteFooter from "@/src/layout/SiteFooter";
import SiteHeader from "@/src/layout/SiteHeader";
import QueryProvider from "@/src/providers/QueryProvider.client";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Barbakahn Archive | Video Intelligence",
  description: "Explore the Barbakahn video archive through stories, experiments, and ideas.",
};

const RootLayout = ({ children }: LayoutProps<"/">) => {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <QueryProvider>
          <div className="relative isolate min-h-screen overflow-hidden bg-[var(--ink)] text-[var(--paper)]">
            <div className="pointer-events-none absolute -top-40 right-0 -z-10 h-96 w-96 rounded-full bg-[var(--accent)] opacity-[0.06] blur-3xl" />
            <SiteHeader />
            {children}
            <SiteFooter />
          </div>
        </QueryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
