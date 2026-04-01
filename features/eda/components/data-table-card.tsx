// import { useState } from "react";
// import { ChevronLeft, ChevronRight, Search } from "lucide-react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";

// // Sample data - replace with your actual data
// const SAMPLE_DATA = [
//   {
//     id: 1,
//     name: "John Doe",
//     age: 28,
//     city: "New York",
//     salary: 75000,
//     department: "Engineering",
//   },
//   {
//     id: 2,
//     name: "Jane Smith",
//     age: 34,
//     city: "Los Angeles",
//     salary: 82000,
//     department: "Marketing",
//   },
//   {
//     id: 3,
//     name: "Bob Johnson",
//     age: 45,
//     city: "Chicago",
//     salary: 95000,
//     department: "Sales",
//   },
//   {
//     id: 4,
//     name: "Alice Williams",
//     age: 29,
//     city: "Houston",
//     salary: 78000,
//     department: "Engineering",
//   },
//   {
//     id: 5,
//     name: "Charlie Brown",
//     age: 52,
//     city: "Phoenix",
//     salary: 110000,
//     department: "Management",
//   },
//   {
//     id: 6,
//     name: "Diana Prince",
//     age: 31,
//     city: "Philadelphia",
//     salary: 85000,
//     department: "Marketing",
//   },
//   {
//     id: 7,
//     name: "Ethan Hunt",
//     age: 38,
//     city: "San Antonio",
//     salary: 92000,
//     department: "Operations",
//   },
//   {
//     id: 8,
//     name: "Fiona Apple",
//     age: 27,
//     city: "San Diego",
//     salary: 72000,
//     department: "Design",
//   },
//   {
//     id: 9,
//     name: "George Lucas",
//     age: 55,
//     city: "Dallas",
//     salary: 125000,
//     department: "Management",
//   },
//   {
//     id: 10,
//     name: "Hannah Montana",
//     age: 25,
//     city: "San Jose",
//     salary: 68000,
//     department: "Support",
//   },
//   {
//     id: 11,
//     name: "Ian McKellen",
//     age: 48,
//     city: "Austin",
//     salary: 98000,
//     department: "Engineering",
//   },
//   {
//     id: 12,
//     name: "Julia Roberts",
//     age: 42,
//     city: "Jacksonville",
//     salary: 105000,
//     department: "Sales",
//   },
//   {
//     id: 13,
//     name: "Kevin Hart",
//     age: 33,
//     city: "Columbus",
//     salary: 88000,
//     department: "Marketing",
//   },
//   {
//     id: 14,
//     name: "Laura Palmer",
//     age: 29,
//     city: "Fort Worth",
//     salary: 76000,
//     department: "Design",
//   },
//   {
//     id: 15,
//     name: "Mike Ross",
//     age: 31,
//     city: "Charlotte",
//     salary: 84000,
//     department: "Legal",
//   },
// ];

// const ROWS_PER_PAGE = 10;

// export function DataTableCard() {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState("");

//   // Filter data based on search
//   const filteredData = SAMPLE_DATA.filter((row) =>
//     Object.values(row).some((value) =>
//       value.toString().toLowerCase().includes(searchTerm.toLowerCase())
//     )
//   );

//   // Calculate pagination
//   const totalPages = Math.ceil(filteredData.length / ROWS_PER_PAGE);
//   const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
//   const endIndex = startIndex + ROWS_PER_PAGE;
//   const currentData = filteredData.slice(startIndex, endIndex);

//   // Get column names from first row
//   const columns = SAMPLE_DATA.length > 0 ? Object.keys(SAMPLE_DATA[0]) : [];

//   const handlePrevPage = () => {
//     setCurrentPage((prev) => Math.max(prev - 1, 1));
//   };

//   const handleNextPage = () => {
//     setCurrentPage((prev) => Math.min(prev + 1, totalPages));
//   };

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle className="text-lg">Data Preview</CardTitle>
//         <CardDescription>
//           Browse your dataset with pagination and search
//         </CardDescription>
//       </CardHeader>
//       <CardContent className="space-y-4">
//         {/* Search Bar */}
//         <div className="relative">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
//           <Input
//             type="text"
//             placeholder="Search across all columns..."
//             value={searchTerm}
//             onChange={(e) => {
//               setSearchTerm(e.target.value);
//               setCurrentPage(1); // Reset to first page on search
//             }}
//             className="pl-9"
//           />
//         </div>

//         {/* Table */}
//         <div className="border rounded-lg overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-muted/50">
//                 <tr>
//                   {columns.map((column) => (
//                     <th
//                       key={column}
//                       className="px-4 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider"
//                     >
//                       {column}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-border">
//                 {currentData.length > 0 ? (
//                   currentData.map((row, rowIndex) => (
//                     <tr
//                       key={rowIndex}
//                       className="hover:bg-muted/30 transition-colors"
//                     >
//                       {columns.map((column) => (
//                         <td
//                           key={column}
//                           className="px-4 py-3 text-sm text-foreground whitespace-nowrap"
//                         >
//                           {row[column as keyof typeof row]}
//                         </td>
//                       ))}
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td
//                       colSpan={columns.length}
//                       className="px-4 py-8 text-center text-sm text-muted-foreground"
//                     >
//                       No data found matching your search
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Pagination Controls */}
//         <div className="flex items-center justify-between">
//           <p className="text-sm text-muted-foreground">
//             Showing {startIndex + 1} to{" "}
//             {Math.min(endIndex, filteredData.length)} of {filteredData.length}{" "}
//             rows
//           </p>
//           <div className="flex items-center gap-2">
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={handlePrevPage}
//               disabled={currentPage === 1}
//             >
//               <ChevronLeft className="w-4 h-4 mr-1" />
//               Previous
//             </Button>
//             <span className="text-sm text-foreground px-3">
//               Page {currentPage} of {totalPages}
//             </span>
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={handleNextPage}
//               disabled={currentPage === totalPages}
//             >
//               Next
//               <ChevronRight className="w-4 h-4 ml-1" />
//             </Button>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }
import { useState, useMemo } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  SlidersHorizontal,
  X,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

// Sample data — replace with your actual data
const SAMPLE_DATA = [
  {
    id: 1,
    name: "John Doe",
    age: 28,
    city: "New York",
    salary: 75000,
    department: "Engineering",
  },
  {
    id: 2,
    name: "Jane Smith",
    age: 34,
    city: "Los Angeles",
    salary: 82000,
    department: "Marketing",
  },
  {
    id: 3,
    name: "Bob Johnson",
    age: 45,
    city: "Chicago",
    salary: 95000,
    department: "Sales",
  },
  {
    id: 4,
    name: "Alice Williams",
    age: 29,
    city: "Houston",
    salary: 78000,
    department: "Engineering",
  },
  {
    id: 5,
    name: "Charlie Brown",
    age: 52,
    city: "Phoenix",
    salary: 110000,
    department: "Management",
  },
  {
    id: 6,
    name: "Diana Prince",
    age: 31,
    city: "Philadelphia",
    salary: 85000,
    department: "Marketing",
  },
  {
    id: 7,
    name: "Ethan Hunt",
    age: 38,
    city: "San Antonio",
    salary: 92000,
    department: "Operations",
  },
  {
    id: 8,
    name: "Fiona Apple",
    age: 27,
    city: "San Diego",
    salary: 72000,
    department: "Design",
  },
  {
    id: 9,
    name: "George Lucas",
    age: 55,
    city: "Dallas",
    salary: 125000,
    department: "Management",
  },
  {
    id: 10,
    name: "Hannah Montana",
    age: 25,
    city: "San Jose",
    salary: 68000,
    department: "Support",
  },
  {
    id: 11,
    name: "Ian McKellen",
    age: 48,
    city: "Austin",
    salary: 98000,
    department: "Engineering",
  },
  {
    id: 12,
    name: "Julia Roberts",
    age: 42,
    city: "Jacksonville",
    salary: 105000,
    department: "Sales",
  },
  {
    id: 13,
    name: "Kevin Hart",
    age: 33,
    city: "Columbus",
    salary: 88000,
    department: "Marketing",
  },
  {
    id: 14,
    name: "Laura Palmer",
    age: 29,
    city: "Fort Worth",
    salary: 76000,
    department: "Design",
  },
  {
    id: 15,
    name: "Mike Ross",
    age: 31,
    city: "Charlotte",
    salary: 84000,
    department: "Legal",
  },
];

type SortDir = "asc" | "desc" | null;
type Row = (typeof SAMPLE_DATA)[number];

const ROWS_PER_PAGE = 8;
const ALL_COLUMNS =
  SAMPLE_DATA.length > 0 ? (Object.keys(SAMPLE_DATA[0]) as (keyof Row)[]) : [];

function formatCell(value: unknown): string {
  if (typeof value === "number" && String(value).length >= 5) {
    return value.toLocaleString();
  }
  return String(value);
}

export function DataTableCard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortCol, setSortCol] = useState<keyof Row | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>(null);
  const [hiddenCols, setHiddenCols] = useState<Set<keyof Row>>(new Set());
  const [showColMenu, setShowColMenu] = useState(false);

  const visibleColumns = ALL_COLUMNS.filter((c) => !hiddenCols.has(c));

  // Filter
  const filtered = useMemo(() => {
    const term = searchTerm.toLowerCase();
    if (!term) return SAMPLE_DATA;
    return SAMPLE_DATA.filter((row) =>
      Object.values(row).some((v) => String(v).toLowerCase().includes(term)),
    );
  }, [searchTerm]);

  // Sort
  const sorted = useMemo(() => {
    if (!sortCol || !sortDir) return filtered;
    return [...filtered].sort((a, b) => {
      const av = a[sortCol];
      const bv = b[sortCol];
      const cmp =
        typeof av === "number" && typeof bv === "number"
          ? av - bv
          : String(av).localeCompare(String(bv));
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [filtered, sortCol, sortDir]);

  // Paginate
  const totalPages = Math.max(1, Math.ceil(sorted.length / ROWS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const start = (safePage - 1) * ROWS_PER_PAGE;
  const pageData = sorted.slice(start, start + ROWS_PER_PAGE);

  function handleSort(col: keyof Row) {
    if (sortCol !== col) {
      setSortCol(col);
      setSortDir("asc");
    } else if (sortDir === "asc") {
      setSortDir("desc");
    } else {
      setSortCol(null);
      setSortDir(null);
    }
    setCurrentPage(1);
  }

  function handleSearch(val: string) {
    setSearchTerm(val);
    setCurrentPage(1);
  }

  function toggleCol(col: keyof Row) {
    setHiddenCols((prev) => {
      const next = new Set(prev);
      next.has(col) ? next.delete(col) : next.add(col);
      return next;
    });
  }

  function SortIcon({ col }: { col: keyof Row }) {
    if (sortCol !== col) return <ArrowUpDown className="w-3 h-3 opacity-40" />;
    return sortDir === "asc" ? (
      <ArrowUp className="w-3 h-3 text-primary" />
    ) : (
      <ArrowDown className="w-3 h-3 text-primary" />
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">Data Preview</CardTitle>
            <CardDescription>
              Browse, search, and sort your dataset
            </CardDescription>
          </div>
          {filtered.length !== SAMPLE_DATA.length && (
            <Badge variant="secondary" className="text-xs mt-0.5">
              {filtered.length} of {SAMPLE_DATA.length} rows
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Toolbar */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <Input
              placeholder="Search all columns…"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-8 h-8 text-sm"
            />
            {searchTerm && (
              <button
                onClick={() => handleSearch("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Column visibility */}
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-1.5 text-xs"
              onClick={() => setShowColMenu((v) => !v)}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Columns
              {hiddenCols.size > 0 && (
                <Badge className="ml-0.5 h-4 px-1 text-[10px]">
                  {hiddenCols.size}
                </Badge>
              )}
            </Button>
            {showColMenu && (
              <div className="absolute right-0 top-full mt-1 z-10 bg-card border border-border rounded-lg shadow-lg p-2 min-w-[140px]">
                {ALL_COLUMNS.map((col) => (
                  <label
                    key={col}
                    className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-muted/50 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={!hiddenCols.has(col)}
                      onChange={() => toggleCol(col)}
                      className="w-3 h-3 accent-primary"
                    />
                    <span className="text-xs capitalize text-foreground">
                      {col}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="border border-border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/40 border-b border-border">
                  {visibleColumns.map((col) => (
                    <th
                      key={col}
                      onClick={() => handleSort(col)}
                      className="px-3 py-2.5 text-left cursor-pointer select-none group"
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground group-hover:text-foreground transition-colors">
                          {col}
                        </span>
                        <SortIcon col={col} />
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pageData.length > 0 ? (
                  pageData.map((row, i) => (
                    <tr
                      key={row.id}
                      className={`border-b border-border/50 last:border-0 transition-colors hover:bg-primary/5 ${
                        i % 2 === 0 ? "bg-background" : "bg-muted/15"
                      }`}
                    >
                      {visibleColumns.map((col) => (
                        <td
                          key={col}
                          className="px-3 py-2.5 text-sm text-foreground whitespace-nowrap tabular-nums"
                        >
                          {col === "department" ? (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-primary/10 text-primary">
                              {String(row[col])}
                            </span>
                          ) : (
                            formatCell(row[col])
                          )}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={visibleColumns.length}
                      className="px-4 py-12 text-center"
                    >
                      <Search className="w-8 h-8 text-muted-foreground/40 mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">
                        No rows match{" "}
                        <strong>&ldquo;{searchTerm}&rdquo;</strong>
                      </p>
                      <button
                        onClick={() => handleSearch("")}
                        className="text-xs text-primary hover:underline mt-1"
                      >
                        Clear search
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between pt-0.5">
          <p className="text-xs text-muted-foreground">
            {sorted.length === 0
              ? "No results"
              : `Rows ${start + 1}–${Math.min(start + ROWS_PER_PAGE, sorted.length)} of ${sorted.length}`}
          </p>
          <div className="flex items-center gap-1.5">
            <Button
              variant="outline"
              size="sm"
              className="h-7 px-2"
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={safePage === 1}
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </Button>
            <span className="text-xs text-foreground px-2 tabular-nums">
              {safePage} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              className="h-7 px-2"
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={safePage === totalPages}
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
