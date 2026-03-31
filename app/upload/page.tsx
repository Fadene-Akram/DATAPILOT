// "use client";

// import type React from "react";
// import { useState } from "react";
// import { Upload, File, CheckCircle, AlertCircle } from "lucide-react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";

// interface DataUploadPayload {
//   files: string[];
//   timestamp: Date;
// }

// interface DataUploadPageProps {
//   onDataUpload: (data: DataUploadPayload) => void;
// }

// export default function DataUploadPage({ onDataUpload }: DataUploadPageProps) {
//   const [isDragActive, setIsDragActive] = useState(false);
//   const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

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

//   const processFiles = (files: File[]) => {
//     const validFiles = files.filter(
//       (f) => f.type === "text/csv" || f.type === "application/vnd.ms-excel"
//     );
//     setUploadedFiles([...uploadedFiles, ...validFiles]);
//     if (validFiles.length > 0) {
//       onDataUpload({
//         files: validFiles.map((f) => f.name),
//         timestamp: new Date(),
//       });
//     }
//   };

//   return (
//     <div className="p-6 space-y-6">
//       <div>
//         <h1 className="text-3xl font-bold text-foreground mb-2">
//           Upload Your Data
//         </h1>
//         <p className="text-muted-foreground">
//           Import your dataset (CSV, Excel) to get started with analysis and
//           modeling
//         </p>
//       </div>

//       {/* Upload Area */}
//       <Card
//         className="border-2 border-dashed"
//         onClick={() => document.getElementById("file-input")?.click()}
//       >
//         <CardContent className="p-12">
//           <div
//             onDragEnter={handleDrag}
//             onDragLeave={handleDrag}
//             onDragOver={handleDrag}
//             onDrop={handleDrop}
//             className={`text-center cursor-pointer transition-colors ${
//               isDragActive ? "text-primary" : "text-muted-foreground"
//             }`}
//           >
//             <Upload
//               className={`w-12 h-12 mx-auto mb-4 ${
//                 isDragActive ? "text-primary" : ""
//               }`}
//             />
//             <h3 className="text-lg font-semibold text-foreground mb-2">
//               Drag and drop your files here
//             </h3>
//             <p className="text-sm mb-4">or click to browse your computer</p>
//             <input
//               id="file-input"
//               type="file"
//               multiple
//               accept=".csv,.xlsx,.xls"
//               onChange={handleFileInput}
//               className="hidden"
//             />
//           </div>
//         </CardContent>
//       </Card>

//       {/* File List */}
//       {uploadedFiles.length > 0 && (
//         <Card>
//           <CardHeader>
//             <CardTitle>Uploaded Files</CardTitle>
//             <CardDescription>
//               {uploadedFiles.length} file(s) ready for analysis
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-3">
//               {uploadedFiles.map((file, idx) => (
//                 <div
//                   key={idx}
//                   className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg border border-border"
//                 >
//                   <File className="w-5 h-5 text-primary flex-shrink-0" />
//                   <div className="flex-1 min-w-0">
//                     <p className="text-sm font-medium text-foreground truncate">
//                       {file.name}
//                     </p>
//                     <p className="text-xs text-muted-foreground">
//                       {(file.size / 1024).toFixed(2)} KB
//                     </p>
//                   </div>
//                   <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
//                 </div>
//               ))}
//             </div>

//             <div className="mt-6 flex gap-3">
//               <Button
//                 className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
//                 onClick={() => (window.location.hash = "/eda")}
//               >
//                 Proceed to EDA
//               </Button>
//             </div>
//           </CardContent>
//         </Card>
//       )}

//       {/* Info Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         {[
//           {
//             title: "Supported Formats",
//             desc: "CSV, Excel (.xlsx, .xls)",
//             icon: File,
//           },
//           {
//             title: "Max File Size",
//             desc: "Up to 500 MB per file",
//             icon: AlertCircle,
//           },
//           {
//             title: "Privacy",
//             desc: "Your data stays private & secure",
//             icon: CheckCircle,
//           },
//         ].map((item, idx) => {
//           const Icon = item.icon;
//           return (
//             <Card key={idx} className="bg-card/50">
//               <CardContent className="p-4">
//                 <Icon className="w-8 h-8 text-primary mb-2" />
//                 <h4 className="font-semibold text-foreground text-sm mb-1">
//                   {item.title}
//                 </h4>
//                 <p className="text-xs text-muted-foreground">{item.desc}</p>
//               </CardContent>
//             </Card>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

"use client";

import { PageHeader } from "@/features/upload/components/page-header";
import { UploadDropzone } from "@/features/upload/components/upload-dropzone";
import { UploadedFilesList } from "@/features/upload/components/uploaded-files-list";
import { InfoCards } from "@/features/upload/components/info-cards";
import { useFileUpload } from "@/features/upload/hooks/use-file-upload";
import type { DataUploadPageProps } from "@/features/upload/types";

export default function DataUploadPage({ onDataUpload }: DataUploadPageProps) {
  const {
    isDragActive,
    uploadedFiles,
    handleDrag,
    handleDrop,
    handleFileInput,
  } = useFileUpload({ onDataUpload });

  return (
    <div className="p-6 space-y-6">
      <PageHeader />

      <UploadDropzone
        isDragActive={isDragActive}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onFileInput={handleFileInput}
      />

      <UploadedFilesList files={uploadedFiles} />

      <InfoCards />
    </div>
  );
}
