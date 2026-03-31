import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CleaningTool } from "../types";

interface ToolItemProps {
  tool: CleaningTool;
  onApply: (tool: CleaningTool) => void;
}

export function ToolItem({ tool, onApply }: ToolItemProps) {
  const Icon = tool.icon;

  return (
    <div className="p-3 border border-border rounded-lg hover:border-primary/50 hover:shadow-sm transition-all">
      <div className="flex items-start gap-3 mb-2">
        <Icon className="w-6 h-6 text-primary/50" />
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm text-foreground truncate">
            {tool.name}
          </p>
          <p className="text-xs text-muted-foreground">{tool.desc}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1 text-xs h-8 bg-transparent"
        >
          <Eye className="w-3 h-3 mr-1" />
          Preview
        </Button>
        <Button
          size="sm"
          onClick={() => onApply(tool)}
          className="flex-1 text-xs h-8 bg-primary hover:bg-primary/90"
        >
          Apply
        </Button>
      </div>
    </div>
  );
}
