import { Download } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { ExportFormat } from "../types";

interface ExportFormatCardProps {
  format: ExportFormat;
  onDownload: (format: string) => void;
}

export function ExportFormatCard({
  format,
  onDownload,
}: ExportFormatCardProps) {
  const Icon = format.icon;

  return (
    <Card className="hover:border-primary/50 transition-colors cursor-pointer">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <Icon className="w-8 h-8 text-primary" />
          <span className="text-xs font-mono bg-muted px-2 py-1 rounded text-muted-foreground">
            {format.ext}
          </span>
        </div>
        <h3 className="font-semibold text-foreground mb-1">{format.format}</h3>
        <p className="text-xs text-muted-foreground mb-4">{format.desc}</p>
        <Button
          onClick={() => onDownload(format.format)}
          className="w-full bg-primary/10 hover:bg-primary/20 text-primary"
        >
          <Download className="w-4 h-4 mr-2" />
          Download
        </Button>
      </CardContent>
    </Card>
  );
}
