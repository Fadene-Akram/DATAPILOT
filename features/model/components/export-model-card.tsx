import { CheckCircle } from "lucide-react";

interface ExportModelCardProps {
  model: {
    id: string;
    name: string;
    trainMetrics?: Record<string, number>;
    valMetrics?: Record<string, number>;
    overfittingStatus?: "none" | "mild" | "severe" | string;
  };
  isSelected: boolean;
  onToggle: (model: any) => void;
}

export function ExportModelCard({
  model,
  isSelected,
  onToggle,
}: ExportModelCardProps) {
  const trainAccuracy = model.trainMetrics?.accuracy;
  const valAccuracy = model.valMetrics?.accuracy;
  const status = model.overfittingStatus || "none";

  return (
    <div
      onClick={() => onToggle(model)}
      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
        isSelected
          ? "border-primary bg-primary/10"
          : "border-border hover:border-primary/50"
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4 className="font-semibold text-foreground text-sm mb-1">
            {model.name}
          </h4>
          <p className="text-xs text-muted-foreground">ID: {model.id}</p>
        </div>
        <div
          className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
            isSelected ? "border-primary bg-primary" : "border-border"
          }`}
        >
          {isSelected && <CheckCircle className="w-4 h-4 text-white" />}
        </div>
      </div>
      {trainAccuracy !== undefined && valAccuracy !== undefined && (
        <div className="space-y-2 mt-3">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Training Accuracy</span>
            <span className="text-foreground font-medium">
              {(trainAccuracy * 100).toFixed(1)}%
            </span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Validation Accuracy</span>
            <span className="text-foreground font-medium">
              {(valAccuracy * 100).toFixed(1)}%
            </span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Status</span>
            <span
              className={`px-2 py-0.5 rounded text-white text-xs font-medium ${
                status === "severe"
                  ? "bg-red-500/80"
                  : status === "mild"
                  ? "bg-yellow-500/80"
                  : "bg-green-500/80"
              }`}
            >
              {status === "severe"
                ? "Overfitting"
                : status === "mild"
                ? "Mild Overfit"
                : "Good Fit"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
