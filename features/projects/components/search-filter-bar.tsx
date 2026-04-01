import { Search, SlidersHorizontal } from "lucide-react";
import type { FilterStatus, SortKey } from "../hooks/use-projects";

interface SearchFilterBarProps {
  searchQuery: string;
  onSearchChange: (v: string) => void;
  filterStatus: FilterStatus;
  onFilterChange: (v: FilterStatus) => void;
  sortKey: SortKey;
  onSortChange: (v: SortKey) => void;
  resultCount: number;
}

const FILTER_OPTIONS: { label: string; value: FilterStatus }[] = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Archived", value: "archived" },
];

const SORT_OPTIONS: { label: string; value: SortKey }[] = [
  { label: "Last Modified", value: "lastModified" },
  { label: "Name", value: "name" },
  { label: "Date Created", value: "created" },
  { label: "Datasets", value: "datasets" },
];

export function SearchFilterBar({
  searchQuery,
  onSearchChange,
  filterStatus,
  onFilterChange,
  sortKey,
  onSortChange,
  resultCount,
}: SearchFilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
      {/* Search input */}
      <div className="relative flex-1 min-w-0">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        <input
          type="text"
          placeholder="Search projects, tags…"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-9 pr-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Status filter pills */}
      <div className="flex items-center gap-1 bg-muted/40 rounded-lg p-1 shrink-0">
        {FILTER_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onFilterChange(opt.value)}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
              filterStatus === opt.value
                ? "bg-background shadow-sm text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Sort select */}
      <div className="flex items-center gap-2 shrink-0">
        <SlidersHorizontal className="w-3.5 h-3.5 text-muted-foreground" />

        <select
          value={sortKey}
          onChange={(e) => onSortChange(e.target.value as SortKey)}
          className="text-xs bg-input border border-border rounded-lg px-2 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
        >
          {SORT_OPTIONS.map((opt) => (
            <option
              key={opt.value}
              value={opt.value}
              className="bg-card text-foreground"
            >
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Result count */}
      {searchQuery && (
        <span className="text-xs text-muted-foreground shrink-0">
          {resultCount} result{resultCount !== 1 ? "s" : ""}
        </span>
      )}
    </div>
  );
}
