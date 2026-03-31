import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ToolItem } from "./tool-item";
import { DATA_CLEANING_TOOLS } from "../constants";
import type { CleaningTool } from "../types";

interface DataCleaningToolsProps {
  onApplyTool: (tool: CleaningTool) => void;
}

export function DataCleaningTools({ onApplyTool }: DataCleaningToolsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Data Cleaning Tools</CardTitle>
        <CardDescription>Apply transformations to your dataset</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {DATA_CLEANING_TOOLS.map((tool) => (
          <ToolItem key={tool.id} tool={tool} onApply={onApplyTool} />
        ))}
      </CardContent>
    </Card>
  );
}
