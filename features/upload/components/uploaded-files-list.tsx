import { File, CheckCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface UploadedFilesListProps {
  files: File[];
}

export function UploadedFilesList({ files }: UploadedFilesListProps) {
  if (files.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Uploaded Files</CardTitle>
        <CardDescription>
          {files.length} file(s) ready for analysis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {files.map((file, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg border border-border"
            >
              <File className="w-5 h-5 text-primary flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {file.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {(file.size / 1024).toFixed(2)} KB
                </p>
              </div>
              <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
            </div>
          ))}
        </div>

        <div className="mt-6 flex gap-3">
          <Button
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={() => (window.location.hash = "/eda")}
          >
            Proceed to EDA
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
