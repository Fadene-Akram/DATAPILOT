import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FEATURE_TYPES } from "../constants";
import type { DataState } from "../types";

interface FeatureStatisticsCardProps {
  dataState: DataState;
}

export function FeatureStatisticsCard({
  dataState,
}: FeatureStatisticsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Feature Statistics</CardTitle>
        <CardDescription>Distribution across data types</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {FEATURE_TYPES.map((item, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex justify-between items-center text-sm">
              <span className="text-foreground font-medium">{item.type}</span>
              <span className="text-primary font-semibold">{item.count}</span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div
                className={item.color}
                style={{
                  width: `${(item.count / dataState.features) * 100}%`,
                  height: "100%",
                }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
