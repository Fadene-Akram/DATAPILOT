import { Upload } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

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
    <Card
      className="border-2 border-dashed"
      onClick={() => document.getElementById("file-input")?.click()}
    >
      <CardContent className="p-12">
        <div
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDragOver={onDragOver}
          onDrop={onDrop}
          className={`text-center cursor-pointer transition-colors ${
            isDragActive ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <Upload
            className={`w-12 h-12 mx-auto mb-4 ${
              isDragActive ? "text-primary" : ""
            }`}
          />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Drag and drop your files here
          </h3>
          <p className="text-sm mb-4">or click to browse your computer</p>
          <input
            id="file-input"
            type="file"
            multiple
            accept=".csv,.xlsx,.xls"
            onChange={onFileInput}
            className="hidden"
          />
        </div>
      </CardContent>
    </Card>
  );
}
