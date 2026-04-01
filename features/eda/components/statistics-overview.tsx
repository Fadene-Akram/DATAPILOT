// import { Database, Activity, TrendingUp, BarChart } from "lucide-react";
// import { StatCard } from "./stat-card";
// import { calculateQuality } from "../utils/calculations";
// import type { DataState } from "../types";

// interface StatisticsOverviewProps {
//   dataState: DataState;
// }

// export function StatisticsOverview({ dataState }: StatisticsOverviewProps) {
//   const stats = [
//     {
//       label: "Total Rows",
//       value: dataState.rows.toLocaleString(),
//       icon: Database,
//     },
//     { label: "Features", value: dataState.features, icon: Activity },
//     {
//       label: "Missing %",
//       value: dataState.missingValues.toFixed(1) + "%",
//       icon: TrendingUp,
//     },
//     { label: "Duplicates", value: dataState.duplicates, icon: BarChart },
//     {
//       label: "Data Quality",
//       value: calculateQuality(dataState) + "%",
//       icon: Activity,
//     },
//   ];

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
//       {stats.map((stat, idx) => (
//         <StatCard key={idx} {...stat} />
//       ))}
//     </div>
//   );
// }
import {
  Database,
  Activity,
  TrendingUp,
  BarChart,
  ShieldCheck,
} from "lucide-react";
import { StatCard } from "./stat-card";
import { calculateQuality } from "../utils/calculations";
import type { DataState } from "../types";

interface StatisticsOverviewProps {
  dataState: DataState;
}

export function StatisticsOverview({ dataState }: StatisticsOverviewProps) {
  const stats = [
    {
      label: "Total Rows",
      value: dataState.rows.toLocaleString(),
      icon: Database,
    },
    { label: "Features", value: String(dataState.features), icon: Activity },
    {
      label: "Missing %",
      value: dataState.missingValues.toFixed(1) + "%",
      icon: TrendingUp,
    },
    {
      label: "Duplicates",
      value: String(dataState.duplicates),
      icon: BarChart,
    },
    {
      label: "Data Quality",
      value: calculateQuality(dataState) + "%",
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {stats.map((stat, idx) => (
        <StatCard key={idx} {...stat} />
      ))}
    </div>
  );
}
