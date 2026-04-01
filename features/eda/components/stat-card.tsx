// import { Card, CardContent } from "@/components/ui/card";
// import type { StatCardData } from "../types";

// export function StatCard({ label, value, icon: Icon }: StatCardData) {
//   return (
//     <Card className="bg-card/50">
//       <CardContent className="p-4 flex items-center justify-between">
//         <div>
//           <p className="text-xs text-muted-foreground uppercase tracking-wide">
//             {label}
//           </p>
//           <p className="text-xl font-bold text-foreground mt-1">{value}</p>
//         </div>
//         <Icon className="w-6 h-6 text-primary/50" />
//       </CardContent>
//     </Card>
//   );
// }
import type { StatCardData } from "../types";

const CARD_VARIANTS: Record<
  string,
  { bg: string; text: string; icon: string }
> = {
  "Total Rows": {
    bg: " bg-muted/30",
    text: "font-semibold text-foreground",
    icon: "bg-blue-500/15",
  },
  Features: {
    bg: " bg-muted/30",
    text: "font-semibold text-foreground",
    icon: "bg-violet-500/15",
  },
  "Missing %": {
    bg: " bg-muted/30",
    text: "font-semibold text-foreground",
    icon: "bg-amber-500/15",
  },
  Duplicates: {
    bg: " bg-muted/30",
    text: "font-semibold text-foreground",
    icon: "bg-rose-500/15",
  },
  "Data Quality": {
    bg: " bg-muted/30",
    text: "font-semibold text-foreground",
    icon: "bg-green-500/15",
  },
};

export function StatCard({ label, value, icon: Icon }: StatCardData) {
  const variant = CARD_VARIANTS[label] ?? {
    bg: "bg-primary/10",
    text: "text-primary",
    icon: "bg-primary/15",
  };

  return (
    <div
      className={`rounded-xl border border-border ${variant.bg} p-4 flex items-center gap-3`}
    >
      <div
        className={`w-9 h-9 rounded-lg ${variant.icon} flex items-center justify-center shrink-0`}
      >
        <Icon className={`w-4 h-4 ${variant.text}`} />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          {label}
        </p>
        <p className={`text-lg font-bold ${variant.text} leading-tight`}>
          {value}
        </p>
      </div>
    </div>
  );
}
