import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Algorithm, Hyperparameter } from "../types";

interface HyperparameterConfigProps {
  selectedModels: string[];
  algorithms: Algorithm[];
  hyperparameters: Record<string, Record<string, any>>;
  onUpdateHyperparameter: (
    modelId: string,
    paramName: string,
    value: any
  ) => void;
}

export function HyperparameterConfig({
  selectedModels,
  algorithms,
  hyperparameters,
  onUpdateHyperparameter,
}: HyperparameterConfigProps) {
  if (selectedModels.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hyperparameter Configuration</CardTitle>
        <CardDescription>
          Configure parameters for selected algorithms
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {selectedModels.map((modelId) => {
          const algorithm = algorithms.find((a) => a.id === modelId);
          if (!algorithm) return null;

          return (
            <div key={modelId} className="border-l-2 border-primary pl-4">
              <h4 className="font-semibold text-foreground mb-4">
                {algorithm.name}
              </h4>
              <div className="space-y-4">
                {algorithm.hyperparameters.map((hp) => (
                  <div key={`${modelId}-${hp.name}`} className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      {hp.name}
                      {hp.type === "float" || hp.type === "int" ? (
                        <span className="text-muted-foreground ml-2">
                          {hyperparameters[modelId]?.[hp.name] ?? hp.default}
                        </span>
                      ) : null}
                    </label>

                    {hp.type === "int" || hp.type === "float" ? (
                      <input
                        type="range"
                        min={hp.min}
                        max={hp.max}
                        step={hp.type === "float" ? 0.01 : 1}
                        value={
                          hyperparameters[modelId]?.[hp.name] ?? hp.default
                        }
                        onChange={(e) =>
                          onUpdateHyperparameter(
                            modelId,
                            hp.name,
                            hp.type === "float"
                              ? Number.parseFloat(e.target.value)
                              : Number.parseInt(e.target.value)
                          )
                        }
                        className="w-full"
                      />
                    ) : hp.type === "select" ? (
                      <select
                        value={
                          hyperparameters[modelId]?.[hp.name] ?? hp.default
                        }
                        onChange={(e) =>
                          onUpdateHyperparameter(
                            modelId,
                            hp.name,
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 bg-input border border-border rounded text-foreground text-sm"
                      >
                        {(hp.options || []).map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
