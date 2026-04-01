// "use client";

// import { useState } from "react";
// import type { DataUploadPayload } from "../types";

// interface UseFileUploadProps {
//   onDataUpload: (data: DataUploadPayload) => void;
// }

// export function useFileUpload({ onDataUpload }: UseFileUploadProps) {
//   const [isDragActive, setIsDragActive] = useState(false);
//   const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

//   const processFiles = (files: File[]) => {
//     const validFiles = files.filter(
//       (f) => f.type === "text/csv" || f.type === "application/vnd.ms-excel"
//     );
//     setUploadedFiles((prev) => [...prev, ...validFiles]);
//     if (validFiles.length > 0) {
//       onDataUpload({
//         files: validFiles.map((f) => f.name),
//         timestamp: new Date(),
//       });
//     }
//   };

//   const handleDrag = (e: React.DragEvent) => {
//     e.preventDefault();
//     setIsDragActive(e.type === "dragenter" || e.type === "dragover");
//   };

//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault();
//     setIsDragActive(false);
//     const files = Array.from(e.dataTransfer.files);
//     processFiles(files);
//   };

//   const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = Array.from(e.target.files || []);
//     processFiles(files);
//   };

//   return {
//     isDragActive,
//     uploadedFiles,
//     handleDrag,
//     handleDrop,
//     handleFileInput,
//   };
// }
"use client";

import { useState } from "react";
import type { DataUploadPayload } from "../types";

interface UseFileUploadProps {
  onDataUpload?: (data: DataUploadPayload) => void; // optional now
}

const ACCEPTED_EXTENSIONS = [".csv", ".xlsx", ".xls"];

function isValidFile(file: File): boolean {
  const name = file.name.toLowerCase();
  return ACCEPTED_EXTENSIONS.some((ext) => name.endsWith(ext));
}

export function useFileUpload({ onDataUpload }: UseFileUploadProps = {}) {
  const [isDragActive, setIsDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [rejectedFiles, setRejectedFiles] = useState<string[]>([]);

  const processFiles = (files: File[]) => {
    const valid = files.filter(isValidFile);
    const rejected = files.filter((f) => !isValidFile(f)).map((f) => f.name);

    if (valid.length > 0) {
      setUploadedFiles((prev) => {
        const existingNames = new Set(prev.map((f) => f.name));
        const newFiles = valid.filter((f) => !existingNames.has(f.name));
        return [...prev, ...newFiles];
      });
      onDataUpload?.({
        // safe call — only fires if provided
        files: valid.map((f) => f.name),
        timestamp: new Date(),
      });
    }

    setRejectedFiles(rejected);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
    processFiles(Array.from(e.dataTransfer.files));
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    processFiles(Array.from(e.target.files ?? []));
    e.target.value = "";
  };

  const removeFile = (name: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.name !== name));
  };

  const clearRejected = () => setRejectedFiles([]);

  return {
    isDragActive,
    uploadedFiles,
    rejectedFiles,
    handleDrag,
    handleDrop,
    handleFileInput,
    removeFile,
    clearRejected,
  };
}
