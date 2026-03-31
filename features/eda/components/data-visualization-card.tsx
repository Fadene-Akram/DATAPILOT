import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import type { DataState } from "../types";

interface DataVisualizationCardProps {
  dataState: DataState;
}

export function DataVisualizationCard({
  dataState,
}: DataVisualizationCardProps) {
  // Sample data for feature types distribution
  const featureTypeData = [
    { name: "Numerical", value: 28, color: "#3b82f6" },
    { name: "Categorical", value: 10, color: "#a855f7" },
    { name: "DateTime", value: 2, color: "#22c55e" },
    { name: "Other", value: 2, color: "#f59e0b" },
  ];

  // Data quality metrics over time (simulated)
  const qualityTrendData = [
    { step: "Initial", quality: 85, missing: 2.3, duplicates: 156 },
    { step: "Step 1", quality: 87, missing: 1.8, duplicates: 156 },
    { step: "Step 2", quality: 90, missing: 1.8, duplicates: 0 },
    { step: "Step 3", quality: 93, missing: 0.8, duplicates: 0 },
    {
      step: "Current",
      quality: 95,
      missing: dataState.missingValues,
      duplicates: dataState.duplicates,
    },
  ];

  // Missing values by feature type (simulated)
  const missingByTypeData = [
    { type: "Numerical", missing: 1.2, complete: 98.8 },
    { type: "Categorical", missing: 3.5, complete: 96.5 },
    { type: "DateTime", missing: 0.1, complete: 99.9 },
    { type: "Other", missing: 2.8, complete: 97.2 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Data Visualizations</CardTitle>
        <CardDescription>
          Visual insights into your dataset structure and quality
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Feature Types Distribution */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3">
            Feature Types Distribution
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={featureTypeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={70}
                fill="#8884d8"
                dataKey="value"
              >
                {featureTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Data Quality Trend */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3">
            Data Quality Trend
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={qualityTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="step" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="quality"
                stroke="#22c55e"
                strokeWidth={2}
                name="Quality Score"
              />
              <Line
                type="monotone"
                dataKey="missing"
                stroke="#ef4444"
                strokeWidth={2}
                name="Missing %"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Missing Values by Feature Type */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3">
            Missing Values by Feature Type
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={missingByTypeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="type" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="complete" fill="#22c55e" name="Complete %" />
              <Bar dataKey="missing" fill="#ef4444" name="Missing %" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
