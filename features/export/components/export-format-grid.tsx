import { ExportFormatCard } from "./export-format-card";
import { EXPORT_FORMATS } from "../constants/export-formats";

interface ExportFormatGridProps {
  onDownload: (format: string) => void;
}

export function ExportFormatGrid({ onDownload }: ExportFormatGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {EXPORT_FORMATS.map((format, idx) => (
        <ExportFormatCard key={idx} format={format} onDownload={onDownload} />
      ))}
    </div>
  );
}
