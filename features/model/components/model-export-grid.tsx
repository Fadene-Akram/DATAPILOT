import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ExportModelCard } from "./export-model-card";

interface ModelExportGridProps {
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

export function ModelExportGrid({
  models,
  selectedModels,
  onToggleModel,
}: ModelExportGridProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Select Models for Export</CardTitle>
        <CardDescription>
          Choose which models to export. {selectedModels.length} model(s)
          selected
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {models.map((model) => (
            <ExportModelCard
              key={model.id}
              model={model}
              isSelected={selectedModels.some((m) => m.id === model.id)}
              onToggle={onToggleModel}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
