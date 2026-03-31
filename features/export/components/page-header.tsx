interface PageHeaderProps {
  selectedCount: number;
}

export function PageHeader({ selectedCount }: PageHeaderProps) {
  return (
    <div>
      <h1 className="text-3xl font-bold text-foreground mb-2">Export Models</h1>
      <p className="text-muted-foreground">
        Export {selectedCount} selected model(s) in your preferred format
      </p>
    </div>
  );
}
