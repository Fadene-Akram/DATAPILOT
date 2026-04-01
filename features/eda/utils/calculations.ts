import type { DataState } from "../types";

export function calculateQuality(dataState: DataState): string {
  const totalIssues =
    dataState.missingValues + dataState.duplicates + dataState.outliers;
  return Math.max(0, Math.min(100, 100 - totalIssues)).toFixed(1);
}

// ── Math helpers ─────────────────────────────────────────────
export function mean(arr: number[]) {
  return arr.reduce((s, v) => s + v, 0) / arr.length;
}
export function std(arr: number[]) {
  const m = mean(arr);
  return Math.sqrt(arr.reduce((s, v) => s + (v - m) ** 2, 0) / arr.length);
}
export function skewness(arr: number[]) {
  const m = mean(arr);
  const s = std(arr);
  return arr.reduce((acc, v) => acc + ((v - m) / s) ** 3, 0) / arr.length;
}
export function kurtosis(arr: number[]) {
  const m = mean(arr);
  const s = std(arr);
  return arr.reduce((acc, v) => acc + ((v - m) / s) ** 4, 0) / arr.length - 3;
}
export function pearson(x: number[], y: number[]) {
  const mx = mean(x),
    my = mean(y);
  const num = x.reduce((s, xi, i) => s + (xi - mx) * (y[i] - my), 0);
  const den = Math.sqrt(
    x.reduce((s, xi) => s + (xi - mx) ** 2, 0) *
      y.reduce((s, yi) => s + (yi - my) ** 2, 0),
  );
  return den === 0 ? 0 : num / den;
}
export function quantile(sorted: number[], q: number) {
  const pos = (sorted.length - 1) * q;
  const lo = Math.floor(pos);
  const hi = Math.ceil(pos);
  return sorted[lo] + (sorted[hi] - sorted[lo]) * (pos - lo);
}
export function entropy(counts: number[]) {
  const total = counts.reduce((s, c) => s + c, 0);
  return -counts
    .filter((c) => c > 0)
    .reduce((s, c) => {
      const p = c / total;
      return s + p * Math.log2(p);
    }, 0);
}
export function olsSlope(x: number[], y: number[]) {
  const mx = mean(x),
    my = mean(y);
  const num = x.reduce((s, xi, i) => s + (xi - mx) * (y[i] - my), 0);
  const den = x.reduce((s, xi) => s + (xi - mx) ** 2, 0);
  return den === 0 ? 0 : num / den;
}

// ── Palette ──────────────────────────────────────────────────
export const C = {
  blue: "#3b82f6",
  violet: "#8b5cf6",
  green: "#10b981",
  amber: "#f59e0b",
  rose: "#f43f5e",
  slate: "#94a3b8",
  teal: "#14b8a6",
  orange: "#f97316",
};
// ── Correlation cell color ───────────────────────────────────
export function corrColor(r: number) {
  if (r > 0.7) return C.blue;
  if (r > 0.3) return C.teal;
  if (r < -0.7) return C.rose;
  if (r < -0.3) return C.orange;
  return C.slate;
}
export function corrBg(r: number) {
  const abs = Math.abs(r);
  const base = r >= 0 ? "59,130,246" : "244,63,94";
  return `rgba(${base},${0.08 + abs * 0.55})`;
}
