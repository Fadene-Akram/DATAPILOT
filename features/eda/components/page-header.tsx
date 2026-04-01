export function PageHeader() {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-bold text-foreground tracking-tight">
          Exploratory Data Analysis
        </h1>
      </div>
      <p className="text-sm text-muted-foreground ">
        Clean and explore your dataset — statistics update as you apply
        transformations
      </p>
    </div>
  );
}
