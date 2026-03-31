import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { calculateQuality } from "../utils/calculations";
import type { DataState } from "../types";

interface DataOverviewCardProps {
  dataState: DataState;
}

export function DataOverviewCard({ dataState }: DataOverviewCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Data Overview</CardTitle>
        <CardDescription>Current state of your dataset</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-muted/30 rounded-lg">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">
              Total Records
            </p>
            <p className="text-2xl font-bold text-foreground mt-1">
              {dataState.rows.toLocaleString()}
            </p>
          </div>
          <div className="p-3 bg-muted/30 rounded-lg">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">
              Features
            </p>
            <p className="text-2xl font-bold text-foreground mt-1">
              {dataState.features}
            </p>
          </div>
          <div className="p-3 bg-muted/30 rounded-lg">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">
              Missing Values
            </p>
            <p className="text-2xl font-bold text-accent mt-1">
              {dataState.missingValues.toFixed(1)}%
            </p>
          </div>
          <div className="p-3 bg-muted/30 rounded-lg">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">
              Quality Score
            </p>
            <p className="text-2xl font-bold text-primary mt-1">
              {calculateQuality(dataState)}%
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
