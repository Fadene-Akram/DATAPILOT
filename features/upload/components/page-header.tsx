// export function PageHeader() {
//   return (
//     <div>
//       <h1 className="text-3xl font-bold text-foreground mb-2">
//         Upload Your Data
//       </h1>
//       <p className="text-muted-foreground">
//         Import your dataset (CSV, Excel) to get started with analysis and
//         modeling
//       </p>
//     </div>
//   );
// }
export function PageHeader() {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <div className="w-1 h-6 rounded-full bg-gradient-to-b from-primary to-accent" />
        <h1 className="text-xl font-bold text-foreground tracking-tight">
          Upload Dataset
        </h1>
      </div>
      <p className="text-sm text-muted-foreground pl-3">
        Import CSV or Excel files to begin your analysis pipeline
      </p>
    </div>
  );
}
