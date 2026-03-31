import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ModelComparisonTableProps {
  models: Array<{
    id: string;
    name: string;
    trainMetrics?: Record<string, number>;
    valMetrics?: Record<string, number>;
    overfittingStatus?: "none" | "mild" | "severe" | string;
  }>;
  selectedModels: any[];
  onToggleModel: (model: any) => void;
}

export function ModelComparisonTable({
  models,
  selectedModels,
  onToggleModel,
}: ModelComparisonTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Model Comparison</CardTitle>
        <CardDescription>
          Compare performance metrics of trained models (Training vs Validation)
        </CardDescription>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-foreground font-semibold">
                Model
              </th>
              <th className="text-center py-3 px-4 text-foreground font-semibold">
                Train Acc
              </th>
              <th className="text-center py-3 px-4 text-foreground font-semibold">
                Val Acc
              </th>
              <th className="text-center py-3 px-4 text-foreground font-semibold">
                Precision
              </th>
              <th className="text-center py-3 px-4 text-foreground font-semibold">
                Recall
              </th>
              <th className="text-center py-3 px-4 text-foreground font-semibold">
                F1-Score
              </th>
              <th className="text-center py-3 px-4 text-foreground font-semibold">
                Fitting
              </th>
              <th className="text-center py-3 px-4 text-foreground font-semibold">
                Export
              </th>
            </tr>
          </thead>
          <tbody>
            {models.map((model) => {
              const status = model.overfittingStatus || "none";
              return (
                <tr
                  key={model.id}
                  className="border-b border-border hover:bg-muted/30 transition-colors"
                >
                  <td className="py-3 px-4 text-foreground">{model.name}</td>
                  <td className="py-3 px-4 text-center text-foreground">
                    {model.trainMetrics?.accuracy
                      ? (model.trainMetrics.accuracy * 100).toFixed(1) + "%"
                      : "N/A"}
                  </td>
                  <td className="py-3 px-4 text-center text-foreground">
                    {model.valMetrics?.accuracy
                      ? (model.valMetrics.accuracy * 100).toFixed(1) + "%"
                      : "N/A"}
                  </td>
                  <td className="py-3 px-4 text-center text-foreground">
                    {model.trainMetrics?.precision
                      ? (model.trainMetrics.precision * 100).toFixed(1) + "%"
                      : "N/A"}
                  </td>
                  <td className="py-3 px-4 text-center text-foreground">
                    {model.trainMetrics?.recall
                      ? (model.trainMetrics.recall * 100).toFixed(1) + "%"
                      : "N/A"}
                  </td>
                  <td className="py-3 px-4 text-center text-foreground">
                    {model.trainMetrics?.["f1-score"]
                      ? (model.trainMetrics["f1-score"] * 100).toFixed(1) + "%"
                      : "N/A"}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium text-white ${
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
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => onToggleModel(model)}
                      className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                        selectedModels.some((m) => m.id === model.id)
                          ? "bg-primary text-white"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                    >
                      {selectedModels.some((m) => m.id === model.id)
                        ? "Selected"
                        : "Select"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
