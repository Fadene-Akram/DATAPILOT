import { FileJson, Package } from "lucide-react";
import type { ExportFormat } from "../types";

export const EXPORT_FORMATS: ExportFormat[] = [
  {
    format: "PyTorch Model",
    ext: ".pth",
    desc: "PyTorch model file format",
    icon: FileJson,
  },
  {
    format: "ONNX Model",
    ext: ".onnx",
    desc: "Open Neural Network Exchange",
    icon: Package,
  },
  {
    format: "TensorFlow",
    ext: ".pb",
    desc: "TensorFlow SavedModel format",
    icon: FileJson,
  },
  {
    format: "Pickle (Scikit-learn)",
    ext: ".pkl",
    desc: "Python pickle serialization",
    icon: Package,
  },
];

export const MODEL_METADATA: ModelMetadataItem[] = [
  { label: "Model Name", value: "random_forest_v1.0" },
  { label: "Created", value: "Nov 25, 2024" },
  { label: "Training Time", value: "3m 45s" },
  { label: "Accuracy", value: "94.2%" },
  { label: "Dataset Rows", value: "15,234" },
  { label: "Features Used", value: "42" },
];

export const ADVANCED_OPTIONS: AdvancedOption[] = [
  { label: "Include preprocessing pipeline", checked: true },
  { label: "Include feature importance", checked: true },
  { label: "Generate documentation", checked: false },
  { label: "Include test dataset metrics", checked: true },
];

export const QUICK_START_CODE = `import joblib

model = joblib.load(
  'model.pkl'
)
predictions = model
  .predict(X_test)`;
