import { Card, CardContent } from "@/components/ui/card";
import type { StatCardData } from "../types";

export function StatCard({ label, value, icon: Icon }: StatCardData) {
  return (
    <Card className="bg-card/50">
      <CardContent className="p-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wide">
            {label}
          </p>
          <p className="text-xl font-bold text-foreground mt-1">{value}</p>
        </div>
        <Icon className="w-6 h-6 text-primary/50" />
      </CardContent>
    </Card>
  );
}
