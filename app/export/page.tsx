// "use client";

// import { useState } from "react";
// import { Download, Copy, CheckCircle, FileJson, Package } from "lucide-react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { useModelContext } from "../../context/model-context";

// export default function ExportPage() {
//   const { selectedModelsForExport } = useModelContext();
//   const [copied, setCopied] = useState(false);

//   const handleCopy = () => {
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   if (selectedModelsForExport.length === 0) {
//     return (
//       <div className="p-6">
//         <div className="space-y-6">
//           <div>
//             <h1 className="text-3xl font-bold text-foreground mb-2">
//               Export Models
//             </h1>
//             <p className="text-muted-foreground">
//               Select models from the Model Build page to export them here
//             </p>
//           </div>

//           <Card>
//             <CardContent className="p-8 text-center">
//               <p className="text-muted-foreground">
//                 No models selected for export. Go to the Model Build page and
//                 select models to export them.
//               </p>
//               <Button className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground">
//                 Go to Model Build
//               </Button>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 space-y-6">
//       <div>
//         <h1 className="text-3xl font-bold text-foreground mb-2">
//           Export Models
//         </h1>
//         <p className="text-muted-foreground">
//           Export {selectedModelsForExport.length} selected model(s) in your
//           preferred format
//         </p>
//       </div>

//       <Card>
//         <CardHeader>
//           <CardTitle>Selected Models for Export</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {selectedModelsForExport.map((model) => (
//               <div
//                 key={model.id}
//                 className="p-4 rounded-lg border border-border bg-muted/30"
//               >
//                 <h3 className="font-semibold text-foreground mb-2">
//                   {model.name}
//                 </h3>
//                 <div className="space-y-1 text-xs text-muted-foreground">
//                   <p>
//                     Training Accuracy:{" "}
//                     {(model.trainMetrics.accuracy * 100).toFixed(1)}%
//                   </p>
//                   <p>
//                     Validation Accuracy:{" "}
//                     {(model.valMetrics.accuracy * 100).toFixed(1)}%
//                   </p>
//                   <p>
//                     Precision: {(model.trainMetrics.precision * 100).toFixed(1)}
//                     %
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </CardContent>
//       </Card>

//       {/* Export Formats */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {[
//           {
//             format: "PyTorch Model",
//             ext: ".pth",
//             desc: "PyTorch model file format",
//             icon: FileJson,
//           },
//           {
//             format: "ONNX Model",
//             ext: ".onnx",
//             desc: "Open Neural Network Exchange",
//             icon: Package,
//           },
//           {
//             format: "TensorFlow",
//             ext: ".pb",
//             desc: "TensorFlow SavedModel format",
//             icon: FileJson,
//           },
//           {
//             format: "Pickle (Scikit-learn)",
//             ext: ".pkl",
//             desc: "Python pickle serialization",
//             icon: Package,
//           },
//         ].map((item, idx) => {
//           const Icon = item.icon;
//           return (
//             <Card
//               key={idx}
//               className="hover:border-primary/50 transition-colors cursor-pointer"
//             >
//               <CardContent className="p-6">
//                 <div className="flex items-start justify-between mb-3">
//                   <Icon className="w-8 h-8 text-primary" />
//                   <span className="text-xs font-mono bg-muted px-2 py-1 rounded text-muted-foreground">
//                     {item.ext}
//                   </span>
//                 </div>
//                 <h3 className="font-semibold text-foreground mb-1">
//                   {item.format}
//                 </h3>
//                 <p className="text-xs text-muted-foreground mb-4">
//                   {item.desc}
//                 </p>
//                 <Button className="w-full bg-primary/10 hover:bg-primary/20 text-primary">
//                   <Download className="w-4 h-4 mr-2" />
//                   Download
//                 </Button>
//               </CardContent>
//             </Card>
//           );
//         })}
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Model Metadata */}
//         <Card className="lg:col-span-2">
//           <CardHeader>
//             <CardTitle>Model Information</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="grid grid-cols-2 gap-4">
//               {[
//                 { label: "Model Name", value: "random_forest_v1.0" },
//                 { label: "Created", value: "Nov 25, 2024" },
//                 { label: "Training Time", value: "3m 45s" },
//                 { label: "Accuracy", value: "94.2%" },
//                 { label: "Dataset Rows", value: "15,234" },
//                 { label: "Features Used", value: "42" },
//               ].map((item, idx) => (
//                 <div key={idx}>
//                   <p className="text-xs text-muted-foreground uppercase mb-1">
//                     {item.label}
//                   </p>
//                   <p className="text-sm font-medium text-foreground">
//                     {item.value}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>

//         {/* Integration Code */}
//         <Card>
//           <CardHeader>
//             <CardTitle className="text-lg">Quick Start Code</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="relative bg-muted/30 rounded p-3 font-mono text-xs text-muted-foreground overflow-auto">
//               <pre className="text-xs">{`import joblib

// model = joblib.load(
//   'model.pkl'
// )
// predictions = model
//   .predict(X_test)`}</pre>
//               <button
//                 onClick={handleCopy}
//                 className="absolute top-2 right-2 p-1.5 hover:bg-muted rounded transition-colors"
//               >
//                 {copied ? (
//                   <CheckCircle className="w-4 h-4 text-accent" />
//                 ) : (
//                   <Copy className="w-4 h-4" />
//                 )}
//               </button>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Advanced Options */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Advanced Export Options</CardTitle>
//           <CardDescription>Additional export configurations</CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <div className="space-y-3">
//             {[
//               { label: "Include preprocessing pipeline", checked: true },
//               { label: "Include feature importance", checked: true },
//               { label: "Generate documentation", checked: false },
//               { label: "Include test dataset metrics", checked: true },
//             ].map((item, idx) => (
//               <label
//                 key={idx}
//                 className="flex items-center gap-3 cursor-pointer"
//               >
//                 <input
//                   type="checkbox"
//                   defaultChecked={item.checked}
//                   className="w-4 h-4 rounded border-border"
//                 />
//                 <span className="text-sm text-foreground">{item.label}</span>
//               </label>
//             ))}
//           </div>

//           <div className="flex gap-3 pt-4">
//             <Button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
//               <Download className="w-4 h-4 mr-2" />
//               Export Model
//             </Button>
//             <Button variant="outline" className="flex-1 bg-transparent">
//               Preview
//             </Button>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

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
