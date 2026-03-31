import type { DataState } from "../types";

export function calculateQuality(dataState: DataState): string {
  const totalIssues =
    dataState.missingValues + dataState.duplicates + dataState.outliers;
  return Math.max(0, Math.min(100, 100 - totalIssues)).toFixed(1);
}
