import { Trash2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Operation History</CardTitle>
        <CardDescription>
          All transformations applied to dataset
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 max-h-64 overflow-y-auto">
        {operations.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No operations applied yet
          </p>
        ) : (
          operations.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border hover:border-primary/30 transition-colors"
            >
              <div className="flex-1">
                <p className="text-sm text-foreground">{item.op}</p>
                <p className="text-xs text-muted-foreground">{item.time}</p>
              </div>
              {item.id !== 1 && (
                <button
                  onClick={() => onUndoOperation(item.id)}
                  className="p-1.5 hover:bg-muted rounded-lg transition-colors ml-2"
                >
                  <Trash2 className="w-4 h-4 text-muted-foreground hover:text-destructive" />
                </button>
              )}
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
