import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SelectedModelCard } from "./selected-model-card";

interface SelectedModelsListProps {
  models: any[];
}

export function SelectedModelsList({ models }: SelectedModelsListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Selected Models for Export</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {models.map((model) => (
            <SelectedModelCard key={model.id} model={model} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
