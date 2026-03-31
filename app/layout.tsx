"use client";

import type React from "react";
import { Geist, Geist_Mono } from "next/font/google";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "../context/theme-provider";
import { ModelProvider } from "../context/model-context";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import DashboardLayout from "./components/dashboard-layout";
import "./globals.css";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

type PageType = "projects" | "upload" | "eda" | "model" | "export";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [currentPage, setCurrentPage] = useState<PageType>("projects");
  const [currentProject, setCurrentProject] = useState<string>("");

  // Sync current page with URL
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const path = pathname.split("/")[1] || "projects";
      if (["projects", "upload", "eda", "model", "export"].includes(path)) {
        setCurrentPage(path as PageType);
      } else {
        setCurrentPage("projects");
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ModelProvider>
            <DashboardLayout
              currentPage={currentPage}
              onNavigate={setCurrentPage}
              currentProject={currentProject}
            >
              {children}
            </DashboardLayout>
          </ModelProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
