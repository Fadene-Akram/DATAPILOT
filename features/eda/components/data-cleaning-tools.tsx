// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { ToolItem } from "./tool-item";
// import { DATA_CLEANING_TOOLS } from "../constants";
// import type { CleaningTool } from "../types";

// interface DataCleaningToolsProps {
//   onApplyTool: (tool: CleaningTool) => void;
// }

// export function DataCleaningTools({ onApplyTool }: DataCleaningToolsProps) {
//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle className="text-lg">Data Cleaning Tools</CardTitle>
//         <CardDescription>Apply transformations to your dataset</CardDescription>
//       </CardHeader>
//       <CardContent className="space-y-3">
//         {DATA_CLEANING_TOOLS.map((tool) => (
//           <ToolItem key={tool.id} tool={tool} onApply={onApplyTool} />
//         ))}
//       </CardContent>
//     </Card>
//   );
// }
import { Wand2 } from "lucide-react";
import { ToolItem } from "./tool-item";
import { DATA_CLEANING_TOOLS } from "../constants";
import type { CleaningTool } from "../types";

interface DataCleaningToolsProps {
  onApplyTool: (tool: CleaningTool) => void;
}

export function DataCleaningTools({ onApplyTool }: DataCleaningToolsProps) {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="px-4 py-3 border-b border-border bg-muted/20 flex items-center gap-2">
        <Wand2 className="w-4 h-4 text-primary" />
        <div>
          <p className="text-sm font-semibold text-foreground">
            Cleaning Tools
          </p>
          <p className="text-xs text-muted-foreground">Apply transformations</p>
        </div>
      </div>
      <div className="p-3 space-y-2">
        {DATA_CLEANING_TOOLS.map((tool) => (
          <ToolItem key={tool.id} tool={tool} onApply={onApplyTool} />
        ))}
      </div>
    </div>
  );
}
