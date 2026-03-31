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

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
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
