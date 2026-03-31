import { Settings, RotateCcw, Play } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ConfigurationSidebarProps {
  trainValSplit: number;
  onTrainValSplitChange: (value: number) => void;
  onTrain: () => void;
  canTrain: boolean;
}

export function ConfigurationSidebar({
  trainValSplit,
  onTrainValSplitChange,
  onTrain,
  canTrain,
}: ConfigurationSidebarProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Settings className="w-5 h-5" />
          Configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Train/Validation Split
          </label>
          <input
            type="range"
            min="0.5"
            max="0.95"
            step="0.05"
            value={trainValSplit}
            onChange={(e) =>
              onTrainValSplitChange(Number.parseFloat(e.target.value))
            }
            className="w-full"
          />
          <p className="text-xs text-muted-foreground">
            {(trainValSplit * 100).toFixed(0)}% /{" "}
            {((1 - trainValSplit) * 100).toFixed(0)}%
          </p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Random Seed
          </label>
          <input
            type="number"
            defaultValue="42"
            className="w-full px-3 py-2 bg-input border border-border rounded text-foreground text-sm"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Target Variable
          </label>
          <select className="w-full px-3 py-2 bg-input border border-border rounded text-foreground text-sm">
            <option>Select target...</option>
            <option>Target_1</option>
            <option>Target_2</option>
          </select>
        </div>

        <button className="w-full flex items-center justify-center gap-2 bg-muted/30 hover:bg-muted/50 text-muted-foreground rounded py-2 text-sm transition-colors">
          <RotateCcw className="w-4 h-4" />
          Reset to Defaults
        </button>

        <Button
          onClick={onTrain}
          disabled={!canTrain}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-50"
        >
          <Play className="w-4 h-4 mr-2" />
          Train Selected
        </Button>
      </CardContent>
    </Card>
  );
}
