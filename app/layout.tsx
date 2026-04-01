import type React from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "../context/theme-provider";
import { ModelProvider } from "../context/model-context";
import { ProjectProvider } from "../context/project-context";
import DashboardWrapper from "./components/DashboardWrapper";
import "./globals.css";
// Keep as a Server Component — no "use client" here.
// All client-side logic lives in DashboardWrapper.

import localFont from "next/font/local";

const geist = localFont({
  src: [
    { path: "../public/fonts/Geist[wght].woff2", style: "normal" },
    { path: "../public/fonts/Geist-Italic[wght].woff2", style: "italic" },
  ],
  variable: "--font-sans",
  weight: "100 900",
  display: "swap",
});

const geistMono = localFont({
  src: [
    { path: "../public/fonts/GeistMono[wght].woff2", style: "normal" },
    { path: "../public/fonts/GeistMono-Italic[wght].woff2", style: "italic" },
  ],
  variable: "--font-mono",
  weight: "100 900",
  display: "swap",
});

export const metadata = {
  title: "DataPilot Studio",
  description: "End-to-end data science platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geist.variable} ${geistMono.variable}`}
    >
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ModelProvider>
            {/* ProjectProvider gives every page access to currentProject */}
            <ProjectProvider>
              <DashboardWrapper>{children}</DashboardWrapper>
            </ProjectProvider>
          </ModelProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
