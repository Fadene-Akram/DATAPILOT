"use client";

import { useState } from "react";

export function useExport() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = (format: string) => {
    console.log(`Downloading model in ${format} format`);
    // Add download logic here
  };

  const handleExport = () => {
    console.log("Exporting model with advanced options");
    // Add export logic here
  };

  return {
    copied,
    handleCopy,
    handleDownload,
    handleExport,
  };
}
