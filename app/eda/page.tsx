"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/features/eda/components/page-header";
import { StatisticsOverview } from "@/features/eda/components/statistics-overview";
import { DataCleaningTools } from "@/features/eda/components/data-cleaning-tools";
import { DataOverviewCard } from "@/features/eda/components/data-overview-card";
import { FeatureStatisticsCard } from "@/features/eda/components/feature-statistics-card";
import { OperationHistoryCard } from "@/features/eda/components/operation-history-card";
import { DataVisualizationCard } from "@/features/eda/components/data-visualization-card";
import { DataTableCard } from "@/features/eda/components/data-table-card";
import { useEdaOperations } from "@/features/eda/hooks/use-eda-operations";
import type { EdaPageProps } from "@/features/eda/types";
import { useRouter } from "next/navigation";

export default function EdaPage({ data }: EdaPageProps) {
  const router = useRouter();

  function handlePreceedToModelBuilding() {
    router.push("/model");
  }

  const { dataState, appliedOperations, handleApplyTool, handleUndoOperation } =
    useEdaOperations();

  return (
    <div className="p-6 space-y-6">
      <PageHeader />

      <StatisticsOverview dataState={dataState} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <DataCleaningTools onApplyTool={handleApplyTool} />
        </div>

        <div className="lg:col-span-2 space-y-4">
          <DataOverviewCard dataState={dataState} />
          <FeatureStatisticsCard dataState={dataState} />
          <OperationHistoryCard
            operations={appliedOperations}
            onUndoOperation={handleUndoOperation}
          />
        </div>
      </div>

      {/* New Data Visualization Section */}
      <DataVisualizationCard dataState={dataState} />

      {/* New Data Table Section */}
      <DataTableCard />

      <Button
        className="bg-primary hover:bg-primary/90 text-primary-foreground"
        onClick={handlePreceedToModelBuilding}
      >
        <Plus className="w-4 h-4 mr-2" />
        Proceed to Model Building
      </Button>
    </div>
  );
}
