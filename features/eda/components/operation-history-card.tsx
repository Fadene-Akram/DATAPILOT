// import { Trash2 } from "lucide-react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import type { Operation } from "../types";

// interface OperationHistoryCardProps {
//   operations: Operation[];
//   onUndoOperation: (id: number) => void;
// }

// export function OperationHistoryCard({
//   operations,
//   onUndoOperation,
// }: OperationHistoryCardProps) {
//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle className="text-lg">Operation History</CardTitle>
//         <CardDescription>
//           All transformations applied to dataset
//         </CardDescription>
//       </CardHeader>
//       <CardContent className="space-y-2 max-h-64 overflow-y-auto">
//         {operations.length === 0 ? (
//           <p className="text-sm text-muted-foreground">
//             No operations applied yet
//           </p>
//         ) : (
//           operations.map((item) => (
//             <div
//               key={item.id}
//               className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border hover:border-primary/30 transition-colors"
//             >
//               <div className="flex-1">
//                 <p className="text-sm text-foreground">{item.op}</p>
//                 <p className="text-xs text-muted-foreground">{item.time}</p>
//               </div>
//               {item.id !== 1 && (
//                 <button
//                   onClick={() => onUndoOperation(item.id)}
//                   className="p-1.5 hover:bg-muted rounded-lg transition-colors ml-2"
//                 >
//                   <Trash2 className="w-4 h-4 text-muted-foreground hover:text-destructive" />
//                 </button>
//               )}
//             </div>
//           ))
//         )}
//       </CardContent>
//     </Card>
//   );
// }
import { Trash2, History, RotateCcw } from "lucide-react";
import type { Operation } from "../types";

interface OperationHistoryCardProps {
  operations: Operation[];
  onUndoOperation: (id: number) => void;
}

export function OperationHistoryCard({
  operations,
  onUndoOperation,
}: OperationHistoryCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="px-4 py-3 border-b border-border bg-muted/20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-primary" />
          <div>
            <p className="text-sm font-semibold text-foreground">
              Operation History
            </p>
            <p className="text-xs text-muted-foreground">
              Applied transformations
            </p>
          </div>
        </div>
        {operations.length > 0 && (
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
            {operations.length} applied
          </span>
        )}
      </div>

      <div className="max-h-56 overflow-y-auto">
        {operations.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <RotateCcw className="w-7 h-7 text-muted-foreground/30 mb-2" />
            <p className="text-sm text-muted-foreground">No operations yet</p>
            <p className="text-xs text-muted-foreground/60 mt-0.5">
              Apply a cleaning tool to get started
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {operations.map((item, idx) => (
              <div
                key={item.id}
                className="flex items-center gap-3 px-4 py-2.5 hover:bg-muted/20 transition-colors group"
              >
                {/* Step number */}
                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-[9px] font-bold text-primary">
                    {idx + 1}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {item.op}
                  </p>
                  <p className="text-xs text-muted-foreground">{item.time}</p>
                </div>
                {item.id !== 1 && (
                  <button
                    onClick={() => onUndoOperation(item.id)}
                    className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-destructive/10 transition-all"
                    title="Undo"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-muted-foreground hover:text-destructive" />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
