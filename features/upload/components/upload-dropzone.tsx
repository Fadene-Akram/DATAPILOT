// import { Upload } from "lucide-react";
// import { Card, CardContent } from "@/components/ui/card";

// interface UploadDropzoneProps {
//   isDragActive: boolean;
//   onDragEnter: (e: React.DragEvent) => void;
//   onDragLeave: (e: React.DragEvent) => void;
//   onDragOver: (e: React.DragEvent) => void;
//   onDrop: (e: React.DragEvent) => void;
//   onFileInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
// }

// export function UploadDropzone({
//   isDragActive,
//   onDragEnter,
//   onDragLeave,
//   onDragOver,
//   onDrop,
//   onFileInput,
// }: UploadDropzoneProps) {
//   return (
//     <Card
//       className="border-2 border-dashed"
//       onClick={() => document.getElementById("file-input")?.click()}
//     >
//       <CardContent className="p-12">
//         <div
//           onDragEnter={onDragEnter}
//           onDragLeave={onDragLeave}
//           onDragOver={onDragOver}
//           onDrop={onDrop}
//           className={`text-center cursor-pointer transition-colors ${
//             isDragActive ? "text-primary" : "text-muted-foreground"
//           }`}
//         >
//           <Upload
//             className={`w-12 h-12 mx-auto mb-4 ${
//               isDragActive ? "text-primary" : ""
//             }`}
//           />
//           <h3 className="text-lg font-semibold text-foreground mb-2">
//             Drag and drop your files here
//           </h3>
//           <p className="text-sm mb-4">or click to browse your computer</p>
//           <input
//             id="file-input"
//             type="file"
//             multiple
//             accept=".csv,.xlsx,.xls"
//             onChange={onFileInput}
//             className="hidden"
//           />
//         </div>
//       </CardContent>
//     </Card>
//   );
// }
"use client";

import { Upload, FileSpreadsheet } from "lucide-react";

interface UploadDropzoneProps {
  isDragActive: boolean;
  onDragEnter: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onFileInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function UploadDropzone({
  isDragActive,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDrop,
  onFileInput,
}: UploadDropzoneProps) {
  return (
    <div
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onClick={() => document.getElementById("file-input")?.click()}
      className={`
        relative cursor-pointer rounded-xl border-2 border-dashed
        transition-all duration-200 group
        ${
          isDragActive
            ? "border-primary bg-primary/5 scale-[1.01]"
            : "border-border hover:border-primary/50 hover:bg-muted/30 bg-card"
        }
      `}
    >
      {/* Subtle corner accents */}
      <span className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-primary/30 rounded-tl-sm" />
      <span className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-primary/30 rounded-tr-sm" />
      <span className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-primary/30 rounded-bl-sm" />
      <span className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-primary/30 rounded-br-sm" />

      <div className="py-14 px-6 flex flex-col items-center gap-4 text-center">
        {/* Icon */}
        <div
          className={`
          w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-200
          ${
            isDragActive
              ? "bg-primary text-primary-foreground scale-110"
              : "bg-muted group-hover:bg-primary/10 text-muted-foreground group-hover:text-primary"
          }
        `}
        >
          <Upload className="w-6 h-6" />
        </div>

        <div>
          <p className="text-base font-semibold text-foreground mb-1">
            {isDragActive ? "Release to upload" : "Drop your file here"}
          </p>
          <p className="text-sm text-muted-foreground">
            or{" "}
            <span className="text-primary font-medium underline underline-offset-2">
              browse your computer
            </span>
          </p>
        </div>

        {/* Format badges */}
        <div className="flex items-center gap-2 mt-1">
          {[".csv", ".xlsx", ".xls"].map((fmt) => (
            <span
              key={fmt}
              className="flex items-center gap-1 px-2.5 py-1 bg-muted rounded-full text-xs font-medium text-muted-foreground"
            >
              <FileSpreadsheet className="w-3 h-3" />
              {fmt}
            </span>
          ))}
          <span className="text-xs text-muted-foreground/60">· max 500 MB</span>
        </div>
      </div>

      <input
        id="file-input"
        type="file"
        multiple
        accept=".csv,.xlsx,.xls"
        onChange={onFileInput}
        className="hidden"
      />
    </div>
  );
}
