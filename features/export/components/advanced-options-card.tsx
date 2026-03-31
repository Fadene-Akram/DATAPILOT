import { Download } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ADVANCED_OPTIONS } from "../constants/export-formats";

interface AdvancedOptionsCardProps {
  onExport: () => void;
}

export function AdvancedOptionsCard({ onExport }: AdvancedOptionsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Advanced Export Options</CardTitle>
        <CardDescription>Additional export configurations</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {ADVANCED_OPTIONS.map((item, idx) => (
            <label key={idx} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                defaultChecked={item.checked}
                className="w-4 h-4 rounded border-border"
              />
              <span className="text-sm text-foreground">{item.label}</span>
            </label>
          ))}
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            onClick={onExport}
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Model
          </Button>
          <Button variant="outline" className="flex-1 bg-transparent">
            Preview
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
