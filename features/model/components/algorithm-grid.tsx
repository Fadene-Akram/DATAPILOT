import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlgorithmCard } from "./algorithm-card";
import type { Algorithm } from "../types";

interface AlgorithmGridProps {
  algorithms: Algorithm[];
  selectedModels: string[];
  onToggleModel: (id: string) => void;
  taskName: string;
}

export function AlgorithmGrid({
  algorithms,
  selectedModels,
  onToggleModel,
  taskName,
}: AlgorithmGridProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Available Algorithms</CardTitle>
        <CardDescription>
          Select algorithms for {taskName} tasks
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {algorithms.map((algorithm) => (
            <AlgorithmCard
              key={algorithm.id}
              algorithm={algorithm}
              isSelected={selectedModels.includes(algorithm.id)}
              onToggle={onToggleModel}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
