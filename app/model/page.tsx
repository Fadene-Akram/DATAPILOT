"use client";

import { useModelContext } from "@/context/model-context";
import { PageHeader } from "@/features/model/components/page-header";
import { TabSelector } from "@/features/model/components/tab-selector";
import { TaskTypeSelector } from "@/features/model/components/task-type-selector";
import { AlgorithmGrid } from "@/features/model/components/algorithm-grid";
import { HyperparameterConfig } from "@/features/model/components/hyperparameter-config";
import { TrainingProgress } from "@/features/model/components/training-progress";
import { ConfigurationSidebar } from "@/features/model/components/configuration-sidebar";
import { ModelExportGrid } from "@/features/model/components/model-export-grid";
import { ModelComparisonTable } from "@/features/model/components/model-comparison-table";
import { useModelTraining } from "@/features/model/hooks/use-model-training";
import { TASK_TYPES } from "@/features/model/constants/task-types";
import type { ModelBuildPageProps } from "@/features/model/types";
import { Card, CardContent } from "@/components/ui/card";

export default function ModelBuildPage({ data }: ModelBuildPageProps) {
  const { toggleModelForExport, selectedModelsForExport } = useModelContext();
  const {
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
  } = useModelTraining();

  const taskConfig = TASK_TYPES[selectedTask];
  const algorithms = taskConfig.algorithms;

  return (
    <div className="p-6 space-y-6">
      <PageHeader />

      <TabSelector
        activeTab={activeTab}
        onTabChange={setActiveTab}
        selectedModelsCount={selectedModelsForExport.length}
      />

      {activeTab === "build" && (
        <div className="space-y-6">
          <TaskTypeSelector
            selectedTask={selectedTask}
            onTaskChange={handleTaskChange}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <AlgorithmGrid
                algorithms={algorithms}
                selectedModels={selectedModels}
                onToggleModel={toggleModel}
                taskName={taskConfig.name}
              />

              <HyperparameterConfig
                selectedModels={selectedModels}
                algorithms={algorithms}
                hyperparameters={hyperparameters}
                onUpdateHyperparameter={updateHyperparameter}
              />

              {isTraining && (
                <TrainingProgress
                  selectedModels={selectedModels}
                  algorithms={algorithms}
                />
              )}
            </div>

            <ConfigurationSidebar
              trainValSplit={trainValSplit}
              onTrainValSplitChange={setTrainValSplit}
              onTrain={handleTrain}
              canTrain={selectedModels.length > 0}
            />
          </div>
        </div>
      )}

      {activeTab === "compare" && (
        <div className="space-y-6">
          {trainedModels.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">
                  No trained models yet. Train some models first.
                </p>
              </CardContent>
            </Card>
          ) : (
            <>
              <ModelExportGrid
                models={trainedModels}
                selectedModels={selectedModelsForExport}
                onToggleModel={toggleModelForExport}
              />

              <ModelComparisonTable
                models={trainedModels}
                selectedModels={selectedModelsForExport}
                onToggleModel={toggleModelForExport}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
}
