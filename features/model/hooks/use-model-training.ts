"use client";

import { useState } from "react";
import { TASK_TYPES } from "../constants/task-types";
import { detectFittingIssues } from "../utils/fitting-detection";
import type { TrainedModel, TaskTypeKey, Algorithm } from "../types";

export function useModelTraining() {
  const [selectedTask, setSelectedTask] =
    useState<TaskTypeKey>("classification");
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [hyperparameters, setHyperparameters] = useState<
    Record<string, Record<string, any>>
  >({});
  const [isTraining, setIsTraining] = useState(false);
  const [activeTab, setActiveTab] = useState<"build" | "compare">("build");
  const [trainValSplit, setTrainValSplit] = useState(0.8);
  const [trainedModels, setTrainedModels] = useState<TrainedModel[]>([]);

  const toggleModel = (modelId: string) => {
    setSelectedModels((prev) => {
      const newModels = prev.includes(modelId)
        ? prev.filter((m) => m !== modelId)
        : [...prev, modelId];
      if (newModels.includes(modelId) && !hyperparameters[modelId]) {
        const algorithm = TASK_TYPES[selectedTask].algorithms.find(
          (a) => a.id === modelId
        );
        if (algorithm) {
          const params: Record<string, any> = {};
          algorithm.hyperparameters.forEach((hp) => {
            params[hp.name] = hp.default;
          });
          setHyperparameters((prev) => ({ ...prev, [modelId]: params }));
        }
      }
      return newModels;
    });
  };

  const updateHyperparameter = (
    modelId: string,
    paramName: string,
    value: any
  ) => {
    setHyperparameters((prev) => ({
      ...prev,
      [modelId]: { ...prev[modelId], [paramName]: value },
    }));
  };

  const handleTrain = () => {
    setIsTraining(true);
    setTimeout(() => {
      const newModels: TrainedModel[] = selectedModels.map((modelId, idx) => {
        const algorithm = TASK_TYPES[selectedTask].algorithms.find(
          (a) => a.id === modelId
        );
        const trainMetrics = {
          accuracy: 0.92 + Math.random() * 0.05 - idx * 0.01,
          "f1-score": 0.91 + Math.random() * 0.05 - idx * 0.01,
          "training-loss": 0.15 - Math.random() * 0.05 + idx * 0.02,
          precision: 0.88 + Math.random() * 0.05 - idx * 0.01,
          recall: 0.89 + Math.random() * 0.05 - idx * 0.01,
        };
        const valMetrics = {
          accuracy: trainMetrics.accuracy - (Math.random() * 0.08 + idx * 0.02),
          "f1-score":
            trainMetrics["f1-score"] - (Math.random() * 0.08 + idx * 0.02),
          "validation-loss": 0.2 - Math.random() * 0.05 + idx * 0.03,
        };

        const { overfittingStatus, underfittingStatus } = detectFittingIssues(
          trainMetrics,
          valMetrics
        );

        return {
          id: modelId,
          name: algorithm?.name || modelId,
          trainMetrics,
          valMetrics,
          overfittingStatus,
          underfittingStatus,
        };
      });
      setTrainedModels(newModels);
      setIsTraining(false);
    }, 3000);
  };

  const handleTaskChange = (newTask: TaskTypeKey) => {
    setSelectedTask(newTask);
    setSelectedModels([]);
    setHyperparameters({});
  };

  return {
    selectedTask,
    selectedModels,
    hyperparameters,
    isTraining,
    activeTab,
    trainValSplit,
    trainedModels,
    setActiveTab,
    setTrainValSplit,
    toggleModel,
    updateHyperparameter,
    handleTrain,
    handleTaskChange,
  };
}
