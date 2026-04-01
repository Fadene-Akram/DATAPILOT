"use client";

import { useModelContext } from "@/context/model-context";
import { EmptyState } from "@/features/export/components/empty-state";
import { PageHeader } from "@/features/export/components/page-header";
import { SelectedModelsList } from "@/features/export/components/selected-models-list";
import { ExportFormatGrid } from "@/features/export/components/export-format-grid";
import { ModelMetadataCard } from "@/features/export/components/model-metadata-card";
import { QuickStartCodeCard } from "@/features/export/components/quick-start-code-card";
import { AdvancedOptionsCard } from "@/features/export/components/advanced-options-card";
import { useExport } from "@/features/export/hooks/use-export";

export default function ExportPage() {
  const { selectedModelsForExport } = useModelContext();
  const { copied, handleCopy, handleDownload, handleExport } = useExport();

  const handleNavigateToModelBuild = () => {
    window.location.hash = "/model";
  };

  if (selectedModelsForExport.length === 0) {
    return (
      <div className="p-6">
        <EmptyState onNavigateToModelBuild={handleNavigateToModelBuild} />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <PageHeader selectedCount={selectedModelsForExport.length} />

      <SelectedModelsList models={selectedModelsForExport} />

      <ExportFormatGrid onDownload={handleDownload} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ModelMetadataCard />
        <QuickStartCodeCard copied={copied} onCopy={handleCopy} />
      </div>

      <AdvancedOptionsCard onExport={handleExport} />
    </div>
  );
}
