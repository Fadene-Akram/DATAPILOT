interface SelectedModelCardProps {
  model: {
    id: string;
    name: string;
    trainMetrics?: Record<string, number>;
    valMetrics?: Record<string, number>;
  };
}

export function SelectedModelCard({ model }: SelectedModelCardProps) {
  return (
    <div className="p-4 rounded-lg border border-border bg-muted/30">
      <h3 className="font-semibold text-foreground mb-2">{model.name}</h3>
      <div className="space-y-1 text-xs text-muted-foreground">
        {model.trainMetrics?.accuracy !== undefined && (
          <p>
            Training Accuracy: {(model.trainMetrics.accuracy * 100).toFixed(1)}%
          </p>
        )}
        {model.valMetrics?.accuracy !== undefined && (
          <p>
            Validation Accuracy: {(model.valMetrics.accuracy * 100).toFixed(1)}%
          </p>
        )}
        {model.trainMetrics?.precision !== undefined && (
          <p>Precision: {(model.trainMetrics.precision * 100).toFixed(1)}%</p>
        )}
      </div>
    </div>
  );
}
