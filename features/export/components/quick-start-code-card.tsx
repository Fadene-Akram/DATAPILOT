import { Copy, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QUICK_START_CODE } from "../constants/export-formats";

interface QuickStartCodeCardProps {
  copied: boolean;
  onCopy: () => void;
}

export function QuickStartCodeCard({
  copied,
  onCopy,
}: QuickStartCodeCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Quick Start Code</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative bg-muted/30 rounded p-3 font-mono text-xs text-muted-foreground overflow-auto">
          <pre className="text-xs">{QUICK_START_CODE}</pre>
          <button
            onClick={onCopy}
            className="absolute top-2 right-2 p-1.5 hover:bg-muted rounded transition-colors"
          >
            {copied ? (
              <CheckCircle className="w-4 h-4 text-accent" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
