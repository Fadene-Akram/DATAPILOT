// import { Eye } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import type { CleaningTool } from "../types";

// interface ToolItemProps {
//   tool: CleaningTool;
//   onApply: (tool: CleaningTool) => void;
// }

// export function ToolItem({ tool, onApply }: ToolItemProps) {
//   const Icon = tool.icon;

//   return (
//     <div className="p-3 border border-border rounded-lg hover:border-primary/50 hover:shadow-sm transition-all">
//       <div className="flex items-start gap-3 mb-2">
//         <Icon className="w-6 h-6 text-primary/50" />
//         <div className="flex-1 min-w-0">
//           <p className="font-medium text-sm text-foreground truncate">
//             {tool.name}
//           </p>
//           <p className="text-xs text-muted-foreground">{tool.desc}</p>
//         </div>
//       </div>
//       <div className="flex gap-2">
//         <Button
//           variant="outline"
//           size="sm"
//           className="flex-1 text-xs h-8 bg-transparent"
//         >
//           <Eye className="w-3 h-3 mr-1" />
//           Preview
//         </Button>
//         <Button
//           size="sm"
//           onClick={() => onApply(tool)}
//           className="flex-1 text-xs h-8 bg-primary hover:bg-primary/90"
//         >
//           Apply
//         </Button>
//       </div>
//     </div>
//   );
// }
import { Eye, Play } from "lucide-react";
import type { CleaningTool } from "../types";

interface ToolItemProps {
  tool: CleaningTool;
  onApply: (tool: CleaningTool) => void;
}

export function ToolItem({ tool, onApply }: ToolItemProps) {
  const Icon = tool.icon;

  return (
    <div className="group p-3 rounded-xl border border-border hover:border-primary/40 hover:bg-primary/5 transition-all duration-150">
      <div className="flex items-start gap-2.5 mb-3">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
          <Icon className="w-4 h-4 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm text-foreground leading-tight">
            {tool.name}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5 leading-snug">
            {tool.desc}
          </p>
        </div>
      </div>
      <div className="flex gap-2">
        <button className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg border border-border text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
          <Eye className="w-3 h-3" />
          Preview
        </button>
        <button
          onClick={() => onApply(tool)}
          className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold transition-colors"
        >
          <Play className="w-3 h-3" />
          Apply
        </button>
      </div>
    </div>
  );
}
