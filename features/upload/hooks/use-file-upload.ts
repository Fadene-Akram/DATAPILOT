"use client";

import { useState } from "react";
import type { DataUploadPayload } from "../types";

interface UseFileUploadProps {
  onDataUpload: (data: DataUploadPayload) => void;
}

export function useFileUpload({ onDataUpload }: UseFileUploadProps) {
  const [isDragActive, setIsDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const processFiles = (files: File[]) => {
    const validFiles = files.filter(
      (f) => f.type === "text/csv" || f.type === "application/vnd.ms-excel"
    );
    setUploadedFiles((prev) => [...prev, ...validFiles]);
    if (validFiles.length > 0) {
      onDataUpload({
        files: validFiles.map((f) => f.name),
        timestamp: new Date(),
      });
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
    const files = Array.from(e.dataTransfer.files);
    processFiles(files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    processFiles(files);
  };

  return {
    isDragActive,
    uploadedFiles,
    handleDrag,
    handleDrop,
    handleFileInput,
  };
}
