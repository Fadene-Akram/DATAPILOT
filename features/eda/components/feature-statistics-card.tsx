import { FEATURE_TYPES } from "../constants";
import type { DataState } from "../types";

interface FeatureStatisticsCardProps {
  dataState: DataState;
}

export function FeatureStatisticsCard({
  dataState,
}: FeatureStatisticsCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="px-4 py-3 border-b border-border bg-muted/20">
        <p className="text-sm font-semibold text-foreground">Feature Types</p>
        <p className="text-xs text-muted-foreground">
          Distribution across data types
        </p>
      </div>
      <div className="p-4 space-y-3">
        {FEATURE_TYPES.map((item, idx) => {
          const pct = Math.round((item.count / dataState.features) * 100);
          return (
            <div key={idx}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-foreground">
                  {item.type}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">
                    {item.count} cols
                  </span>
                  <span className="text-xs font-semibold text-foreground w-8 text-right">
                    {pct}%
                  </span>
                </div>
              </div>
              <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${item.color}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
