import { Cpu } from "lucide-react";
import type { Algorithm } from "../types";

interface AlgorithmCardProps {
  algorithm: Algorithm;
  isSelected: boolean;
  onToggle: (id: string) => void;
}

export function AlgorithmCard({
  algorithm,
  isSelected,
  onToggle,
}: AlgorithmCardProps) {
  return (
    <button
      onClick={() => onToggle(algorithm.id)}
      className={`p-4 rounded-lg border-2 transition-all text-left ${
        isSelected
          ? "border-primary bg-primary/10"
          : "border-border hover:border-primary/50"
      }`}
    >
      <div className="flex items-start gap-3">
        <Cpu
          className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
            isSelected ? "text-primary" : "text-muted-foreground"
          }`}
        />
        <div>
          <h4 className="font-semibold text-foreground text-sm">
            {algorithm.name}
          </h4>
          <p className="text-xs text-muted-foreground mt-2">
            {algorithm.hyperparameters.length} hyperparameters
          </p>
        </div>
      </div>
    </button>
  );
}
