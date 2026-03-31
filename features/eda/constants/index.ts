import { BarChart3 } from "lucide-react";
import type { CleaningTool } from "../types";

export const INITIAL_DATA_STATE = {
  rows: 15234,
  missingValues: 2.3,
  duplicates: 156,
  outliers: 23,
  features: 42,
};

export const DATA_CLEANING_TOOLS: CleaningTool[] = [
  {
    id: 1,
    name: "Handle Missing Values",
    icon: BarChart3,
    desc: "Drop, fill, or interpolate missing data",
    simulation: { missingValues: -1.5, rows: -45 },
  },
  {
    id: 2,
    name: "Remove Duplicates",
    icon: BarChart3,
    desc: "Identify and remove duplicate rows",
    simulation: { duplicates: -156, rows: -156 },
  },
  {
    id: 3,
    name: "Outlier Detection",
    icon: BarChart3,
    desc: "Find and handle outliers using IQR or Z-score",
    simulation: { outliers: -23, rows: -23 },
  },
  {
    id: 4,
    name: "Feature Scaling",
    icon: BarChart3,
    desc: "Normalize or standardize features",
    simulation: {},
  },
  {
    id: 5,
    name: "Categorical Encoding",
    icon: BarChart3,
    desc: "One-hot or label encoding for categories",
    simulation: { features: 5 },
  },
  {
    id: 6,
    name: "Data Type Conversion",
    icon: BarChart3,
    desc: "Convert and validate data types",
    simulation: {},
  },
];

export const FEATURE_TYPES = [
  { type: "Numerical", count: 28, color: "bg-blue-500/20" },
  { type: "Categorical", count: 10, color: "bg-purple-500/20" },
  { type: "DateTime", count: 2, color: "bg-green-500/20" },
  { type: "Other", count: 2, color: "bg-amber-500/20" },
];
