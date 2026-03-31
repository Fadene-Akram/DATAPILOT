import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  onNavigateToModelBuild: () => void;
}

export function EmptyState({ onNavigateToModelBuild }: EmptyStateProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Export Models
        </h1>
        <p className="text-muted-foreground">
          Select models from the Model Build page to export them here
        </p>
      </div>

      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-muted-foreground">
            No models selected for export. Go to the Model Build page and select
            models to export them.
          </p>
          <Button
            onClick={onNavigateToModelBuild}
            className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Go to Model Build
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
