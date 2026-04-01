// import { File, CheckCircle } from "lucide-react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";

// interface UploadedFilesListProps {
//   files: File[];
// }

// export function UploadedFilesList({ files }: UploadedFilesListProps) {
//   if (files.length === 0) return null;

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Uploaded Files</CardTitle>
//         <CardDescription>
//           {files.length} file(s) ready for analysis
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <div className="space-y-3">
//           {files.map((file, idx) => (
//             <div
//               key={idx}
//               className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg border border-border"
//             >
//               <File className="w-5 h-5 text-primary flex-shrink-0" />
//               <div className="flex-1 min-w-0">
//                 <p className="text-sm font-medium text-foreground truncate">
//                   {file.name}
//                 </p>
//                 <p className="text-xs text-muted-foreground">
//                   {(file.size / 1024).toFixed(2)} KB
//                 </p>
//               </div>
//               <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
//             </div>
//           ))}
//         </div>

//         <div className="mt-6 flex gap-3">
//           <Button
//             className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
//             onClick={() => (window.location.hash = "/eda")}
//           >
//             Proceed to EDA
//           </Button>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }
"use client";

import {
  FileSpreadsheet,
  CheckCircle2,
  ArrowRight,
  X,
  AlertTriangle,
} from "lucide-react";
import { useRouter } from "next/navigation"; // ← correct import

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getFileExt(name: string) {
  return name.split(".").pop()?.toUpperCase() ?? "FILE";
}

interface UploadedFilesListProps {
  files: File[];
  onRemove: (name: string) => void;
  rejectedFiles: string[];
  onClearRejected: () => void;
}

export function UploadedFilesList({
  files,
  onRemove,
  rejectedFiles,
  onClearRejected,
}: UploadedFilesListProps) {
  const router = useRouter();

  if (files.length === 0 && rejectedFiles.length === 0) return null;

  return (
    <div className="space-y-3">
      {/* Rejected files warning */}
      {rejectedFiles.length > 0 && (
        <div className="flex items-start justify-between gap-3 px-4 py-3 rounded-xl border border-destructive/30 bg-destructive/5">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-destructive">
                {rejectedFiles.length} unsupported file
                {rejectedFiles.length > 1 ? "s" : ""} skipped
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {rejectedFiles.join(", ")} — only .csv, .xlsx, .xls are accepted
              </p>
            </div>
          </div>
          <button
            onClick={onClearRejected}
            className="p-0.5 rounded hover:bg-muted shrink-0"
          >
            <X className="w-3.5 h-3.5 text-muted-foreground" />
          </button>
        </div>
      )}

      {/* Valid files */}
      {files.length > 0 && (
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="px-4 py-3 border-b border-border bg-muted/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span className="text-sm font-semibold text-foreground">
                {files.length} file{files.length > 1 ? "s" : ""} ready
              </span>
            </div>
            <span className="text-xs text-muted-foreground">
              {formatSize(files.reduce((sum, f) => sum + f.size, 0))} total
            </span>
          </div>

          <div className="divide-y divide-border">
            {files.map((file, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 px-4 py-3 hover:bg-muted/20 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <span className="text-[9px] font-bold text-primary">
                    {getFileExt(file.name)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {file.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatSize(file.size)}
                  </p>
                </div>
                <button
                  onClick={() => onRemove(file.name)}
                  className="p-1 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-muted transition-all"
                  title="Remove file"
                >
                  <X className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
              </div>
            ))}
          </div>

          <div className="px-4 py-3 border-t border-border bg-muted/10">
            <button
              onClick={() => router.push("/eda")} // ← proper Next.js navigation
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-semibold transition-colors"
            >
              Proceed to Explore & Analyze
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
