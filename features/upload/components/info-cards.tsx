// import { File, AlertCircle, CheckCircle } from "lucide-react";
// import { Card, CardContent } from "@/components/ui/card";

// const INFO_ITEMS = [
//   {
//     title: "Supported Formats",
//     desc: "CSV, Excel (.xlsx, .xls)",
//     icon: File,
//   },
//   {
//     title: "Max File Size",
//     desc: "Up to 500 MB per file",
//     icon: AlertCircle,
//   },
//   {
//     title: "Privacy",
//     desc: "Your data stays private & secure",
//     icon: CheckCircle,
//   },
// ];

// export function InfoCards() {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//       {INFO_ITEMS.map((item, idx) => {
//         const Icon = item.icon;
//         return (
//           <Card key={idx} className="bg-card/50">
//             <CardContent className="p-4">
//               <Icon className="w-8 h-8 text-primary mb-2" />
//               <h4 className="font-semibold text-foreground text-sm mb-1">
//                 {item.title}
//               </h4>
//               <p className="text-xs text-muted-foreground">{item.desc}</p>
//             </CardContent>
//           </Card>
//         );
//       })}
//     </div>
//   );
// }
import { FileSpreadsheet, ShieldCheck, Zap } from "lucide-react";

const INFO_ITEMS = [
  {
    icon: FileSpreadsheet,
    title: "CSV & Excel",
    desc: "Supports .csv, .xlsx, and .xls formats with automatic column detection",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    icon: Zap,
    title: "Up to 500 MB",
    desc: "Large datasets handled efficiently with streaming parse",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    icon: ShieldCheck,
    title: "Private & Secure",
    desc: "Files are processed locally and never stored on external servers",
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
];

export function InfoCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {INFO_ITEMS.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.title}
            className="flex gap-3 p-4 rounded-xl border border-border bg-card hover:bg-muted/20 transition-colors"
          >
            <div
              className={`w-8 h-8 rounded-lg ${item.bg} flex items-center justify-center shrink-0 mt-0.5`}
            >
              <Icon className={`w-4 h-4 ${item.color}`} />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                {item.title}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
