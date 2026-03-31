import { useState } from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Sample data - replace with your actual data
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

const ROWS_PER_PAGE = 10;

export function DataTableCard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter data based on search
  const filteredData = SAMPLE_DATA.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredData.length / ROWS_PER_PAGE);
  const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
  const endIndex = startIndex + ROWS_PER_PAGE;
  const currentData = filteredData.slice(startIndex, endIndex);

  // Get column names from first row
  const columns = SAMPLE_DATA.length > 0 ? Object.keys(SAMPLE_DATA[0]) : [];

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Data Preview</CardTitle>
        <CardDescription>
          Browse your dataset with pagination and search
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search across all columns..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page on search
            }}
            className="pl-9"
          />
        </div>

        {/* Table */}
        <div className="border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  {columns.map((column) => (
                    <th
                      key={column}
                      className="px-4 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider"
                    >
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {currentData.length > 0 ? (
                  currentData.map((row, rowIndex) => (
                    <tr
                      key={rowIndex}
                      className="hover:bg-muted/30 transition-colors"
                    >
                      {columns.map((column) => (
                        <td
                          key={column}
                          className="px-4 py-3 text-sm text-foreground whitespace-nowrap"
                        >
                          {row[column as keyof typeof row]}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={columns.length}
                      className="px-4 py-8 text-center text-sm text-muted-foreground"
                    >
                      No data found matching your search
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {startIndex + 1} to{" "}
            {Math.min(endIndex, filteredData.length)} of {filteredData.length}{" "}
            rows
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </Button>
            <span className="text-sm text-foreground px-3">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
