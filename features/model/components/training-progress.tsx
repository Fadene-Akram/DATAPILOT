import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Algorithm } from "../types";

interface TrainingProgressProps {
  selectedModels: string[];
  algorithms: Algorithm[];
}

export function TrainingProgress({
  selectedModels,
  algorithms,
}: TrainingProgressProps) {
  return (
    <Card className="border-accent/50 bg-accent/5">
      <CardHeader>
        <CardTitle className="text-lg">Training in Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {selectedModels.map((modelId, idx) => (
          <div key={modelId}>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-foreground">
                {algorithms.find((a) => a.id === modelId)?.name}
              </span>
              <span className="text-accent">{(idx + 1) * 25}%</span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-accent"
                style={{ width: `${(idx + 1) * 25}%` }}
              />
            </div>
          </div>
        ))}
        <p className="text-xs text-muted-foreground">
          Estimated time remaining: 3 min 15 sec
        </p>
      </CardContent>
    </Card>
  );
}
