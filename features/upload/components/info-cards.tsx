import { File, AlertCircle, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const INFO_ITEMS = [
  {
    title: "Supported Formats",
    desc: "CSV, Excel (.xlsx, .xls)",
    icon: File,
  },
  {
    title: "Max File Size",
    desc: "Up to 500 MB per file",
    icon: AlertCircle,
  },
  {
    title: "Privacy",
    desc: "Your data stays private & secure",
    icon: CheckCircle,
  },
];

export function InfoCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {INFO_ITEMS.map((item, idx) => {
        const Icon = item.icon;
        return (
          <Card key={idx} className="bg-card/50">
            <CardContent className="p-4">
              <Icon className="w-8 h-8 text-primary mb-2" />
              <h4 className="font-semibold text-foreground text-sm mb-1">
                {item.title}
              </h4>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
