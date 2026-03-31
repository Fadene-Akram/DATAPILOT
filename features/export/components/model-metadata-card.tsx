import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MODEL_METADATA } from "../constants/export-formats";

export function ModelMetadataCard() {
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Model Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {MODEL_METADATA.map((item, idx) => (
            <div key={idx}>
              <p className="text-xs text-muted-foreground uppercase mb-1">
                {item.label}
              </p>
              <p className="text-sm font-medium text-foreground">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
