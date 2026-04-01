// import { calculateQuality } from "../utils/calculations";
// import type { DataState } from "../types";

// interface DataOverviewCardProps {
//   dataState: DataState;
// }

// const OVERVIEW_ITEMS = (dataState: DataState) => [
//   {
//     label: "Total Records",
//     value: dataState.rows.toLocaleString(),
//     emphasis: false,
//   },
//   { label: "Features", value: String(dataState.features), emphasis: false },
//   {
//     label: "Missing Values",
//     value: dataState.missingValues.toFixed(1) + "%",
//     emphasis: false,
//   },
//   {
//     label: "Quality Score",
//     value: calculateQuality(dataState) + "%",
//     emphasis: true,
//   },
// ];

// export function DataOverviewCard({ dataState }: DataOverviewCardProps) {
//   const quality = Number(calculateQuality(dataState));
//   const qualityColor =
//     quality >= 80
//       ? "bg-green-500"
//       : quality >= 50
//         ? "bg-amber-500"
//         : "bg-rose-500";

//   return (
//     <div className="rounded-xl border border-border bg-card overflow-hidden">
//       <div className="px-4 py-3 border-b border-border bg-muted/20 flex items-center justify-between">
//         <div>
//           <p className="text-sm font-semibold text-foreground">Data Overview</p>
//           <p className="text-xs text-muted-foreground">Current dataset state</p>
//         </div>
//         {/* Quality pill */}
//         <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted border border-border">
//           <div className={`w-1.5 h-1.5 rounded-full ${qualityColor}`} />
//           <span className="text-xs font-semibold text-foreground">
//             {quality}% quality
//           </span>
//         </div>
//       </div>
//       <div className="p-4 grid grid-cols-2 gap-3">
//         {OVERVIEW_ITEMS(dataState).map((item) => (
//           <div
//             key={item.label}
//             className="p-3 rounded-lg bg-muted/30 border border-border/50"
//           >
//             <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
//               {item.label}
//             </p>
//             <p
//               className={`text-xl font-bold mt-1 ${item.emphasis ? "text-primary" : "text-foreground"}`}
//             >
//               {item.value}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
import {
  FileText,
  Clock,
  Tag,
  Layers,
  CheckCircle2,
  AlertCircle,
  XCircle,
} from "lucide-react";
import type { DataState } from "../types";

interface DataOverviewCardProps {
  dataState: DataState;
}

// Derive column health buckets from dataState
function getColumnHealth(dataState: DataState) {
  const total = dataState.features;
  const problematic = Math.round((dataState.missingValues / 100) * total);
  const duplicateCols = Math.min(dataState.duplicates, Math.floor(total * 0.1));
  const healthy = total - problematic - duplicateCols;
  return { healthy: Math.max(healthy, 0), problematic, duplicateCols };
}

export function DataOverviewCard({ dataState }: DataOverviewCardProps) {
  const { healthy, problematic, duplicateCols } = getColumnHealth(dataState);

  const columnHealth = [
    {
      label: "Healthy columns",
      count: healthy,
      icon: CheckCircle2,
      color: "text-green-500",
      bar: "bg-green-500",
    },
    {
      label: "Columns w/ missing",
      count: problematic,
      icon: AlertCircle,
      color: "text-amber-500",
      bar: "bg-amber-500",
    },
    {
      label: "Duplicate-linked",
      count: duplicateCols,
      icon: XCircle,
      color: "text-rose-500",
      bar: "bg-rose-500",
    },
  ];

  const metadata = [
    {
      icon: FileText,
      label: "Source",
      value: "uploaded_dataset.csv",
    },
    {
      icon: Clock,
      label: "Last Modified",
      value: "Just now",
    },
    {
      icon: Tag,
      label: "Schema Version",
      value: `v${dataState.features}.0`,
    },
    {
      icon: Layers,
      label: "Memory Est.",
      value: `${((dataState.rows * dataState.features * 8) / 1_000_000).toFixed(1)} MB`,
    },
  ];

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-border bg-muted/20">
        <p className="text-sm font-semibold text-foreground">Dataset Info</p>
        <p className="text-xs text-muted-foreground">
          Provenance, structure & column health
        </p>
      </div>

      <div className="p-4 space-y-4">
        {/* Metadata grid */}
        <div className="grid grid-cols-2 gap-2">
          {metadata.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="flex items-center gap-2 p-2.5 rounded-lg bg-muted/30 border border-border/50"
            >
              <div className="w-7 h-7 rounded-md bg-muted flex items-center justify-center shrink-0">
                <Icon className="w-3.5 h-3.5 text-muted-foreground" />
              </div>
              <div className="min-w-0">
                <p className="text-[9px] font-semibold uppercase tracking-widest text-muted-foreground leading-none">
                  {label}
                </p>
                <p className="text-xs font-semibold text-foreground truncate mt-0.5">
                  {value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Column health breakdown */}
        {/* <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">
            Column Health Breakdown
          </p>

          <div className="flex h-2 w-full rounded-full overflow-hidden gap-px mb-3">
            {columnHealth.map(({ label, count, bar }) => {
              const pct =
                dataState.features > 0 ? (count / dataState.features) * 100 : 0;
              return pct > 0 ? (
                <div
                  key={label}
                  className={`${bar} transition-all duration-500`}
                  style={{ width: `${pct}%` }}
                />
              ) : null;
            })}
          </div>

          <div className="space-y-1.5">
            {columnHealth.map(({ label, count, icon: Icon, color }) => (
              <div key={label} className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Icon className={`w-3.5 h-3.5 ${color}`} />
                  <span className="text-xs text-muted-foreground">{label}</span>
                </div>
                <span className="text-xs font-semibold text-foreground tabular-nums">
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
}
