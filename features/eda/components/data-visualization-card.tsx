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
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
  ScatterChart,
  Scatter,
  Line,
  ComposedChart,
  ReferenceLine,
  TooltipProps,
} from "recharts";
import type { DataState } from "../types";
import {
  mean,
  std,
  skewness,
  kurtosis,
  quantile,
  pearson,
  olsSlope,
  entropy,
  corrColor,
  corrBg,
  C,
} from "../utils/calculations";

interface DataVisualizationCardProps {
  dataState: DataState;
}

// ── Tooltip ──────────────────────────────────────────────────
function Tip({ active, payload, label }: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-lg shadow-xl px-3 py-2 text-xs z-50">
      {label !== undefined && (
        <p className="font-semibold text-foreground mb-1">{label}</p>
      )}
      {payload.map((p, i) => (
        <div key={i} className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full shrink-0"
            style={{ background: p.color ?? p.fill }}
          />
          <span className="text-muted-foreground">{p.name}:</span>
          <span className="font-semibold text-foreground tabular-nums">
            {typeof p.value === "number" ? p.value.toFixed(2) : p.value}
          </span>
        </div>
      ))}
    </div>
  );
}

// ── Section wrapper ──────────────────────────────────────────
function Panel({
  title,
  subtitle,
  badge,
  children,
}: {
  title: string;
  subtitle?: string;
  badge?: { label: string; color: string };
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="px-4 py-3 border-b border-border bg-muted/20 flex items-start justify-between gap-2">
        <div>
          <p className="text-sm font-semibold text-foreground">{title}</p>
          {subtitle && (
            <p className="text-[11px] text-muted-foreground mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
        {badge && (
          <span
            className="mt-0.5 shrink-0 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold"
            style={{ background: badge.color + "22", color: badge.color }}
          >
            {badge.label}
          </span>
        )}
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

// ── Simulated dataset ────────────────────────────────────────
// Replace with real data piped from dataState
const RAW = Array.from({ length: 120 }, (_, i) => ({
  age: 20 + Math.round(Math.abs(((i * 7) % 50) + Math.sin(i) * 8)),
  salary: 40000 + Math.round(((i * 1200) % 80000) + Math.cos(i * 0.3) * 15000),
  score: Math.round(50 + 40 * Math.sin(i * 0.15) + (i % 7) * 1.5),
  hours: Math.round(20 + 25 * Math.abs(Math.sin(i * 0.2))),
}));

const NUM_COLS = ["age", "salary", "score", "hours"] as const;
type NumCol = (typeof NUM_COLS)[number];

const CATEGORY_DATA = [
  { name: "Engineering", count: 34 },
  { name: "Marketing", count: 28 },
  { name: "Sales", count: 22 },
  { name: "Design", count: 14 },
  { name: "Management", count: 11 },
  { name: "Operations", count: 9 },
  { name: "Legal", count: 5 },
  { name: "Support", count: 4 },
].sort((a, b) => b.count - a.count);

const MISSING_DATA = [
  { col: "salary", pct: 3.8 },
  { col: "score", pct: 2.1 },
  { col: "department", pct: 1.4 },
  { col: "age", pct: 0.9 },
  { col: "hours", pct: 0.4 },
  { col: "city", pct: 0.1 },
];

export function DataVisualizationCard({
  dataState,
}: DataVisualizationCardProps) {
  // ── 1. Histogram for "salary" ─────────────────────────────
  const salaryVals = RAW.map((r) => r.salary);
  const minS = Math.min(...salaryVals);
  const maxS = Math.max(...salaryVals);
  const BINS = 12;
  const binWidth = (maxS - minS) / BINS;
  const histData = Array.from({ length: BINS }, (_, i) => {
    const lo = minS + i * binWidth;
    const hi = lo + binWidth;
    return {
      bin: `${Math.round(lo / 1000)}k`,
      count: salaryVals.filter(
        (v) => v >= lo && (i === BINS - 1 ? v <= hi : v < hi),
      ).length,
    };
  });
  const sk = skewness(salaryVals);
  const ku = kurtosis(salaryVals);
  const skLabel =
    sk > 1 ? "Right-skewed" : sk < -1 ? "Left-skewed" : "Symmetric";
  const skColor = Math.abs(sk) > 1 ? C.amber : C.green;

  // ── 2. Correlation heatmap ────────────────────────────────
  const corrMatrix = NUM_COLS.map((c1) =>
    NUM_COLS.map((c2) =>
      parseFloat(
        pearson(
          RAW.map((r) => r[c1]),
          RAW.map((r) => r[c2]),
        ).toFixed(2),
      ),
    ),
  );

  // ── 3. Box plot for salary by department (top 4) ──────────
  const BOX_GROUPS = ["Engineering", "Marketing", "Sales", "Design"];
  const boxData = BOX_GROUPS.map((dept, i) => {
    const vals = Array.from(
      { length: 18 + i * 3 },
      (_, j) =>
        40000 + i * 8000 + Math.round(Math.sin(j * 0.5 + i) * 15000 + j * 500),
    ).sort((a, b) => a - b);
    const q1 = quantile(vals, 0.25);
    const med = quantile(vals, 0.5);
    const q3 = quantile(vals, 0.75);
    const iqr = q3 - q1;
    const lo = q1 - 1.5 * iqr;
    const hi = q3 + 1.5 * iqr;
    const outliers = vals.filter((v) => v < lo || v > hi);
    return {
      dept,
      q1,
      med,
      q3,
      lo: Math.max(lo, vals[0]),
      hi: Math.min(hi, vals[vals.length - 1]),
      outliers,
      mean: mean(vals),
    };
  });

  // ── 4. Scatter salary vs score + OLS ─────────────────────
  const scatterData = RAW.slice(0, 60).map((r) => ({
    x: r.score,
    y: r.salary,
  }));
  const xs = scatterData.map((d) => d.x);
  const ys = scatterData.map((d) => d.y);
  const slope = olsSlope(xs, ys);
  const intercept = mean(ys) - slope * mean(xs);
  const rVal = parseFloat(pearson(xs, ys).toFixed(2));
  const xMin = Math.min(...xs);
  const xMax = Math.max(...xs);
  const regressionLine = [
    { x: xMin, y: slope * xMin + intercept },
    { x: xMax, y: slope * xMax + intercept },
  ];

  // ── 5. Category balance entropy ───────────────────────────
  const totalCat = CATEGORY_DATA.reduce((s, d) => s + d.count, 0);
  const catEntropy = parseFloat(
    entropy(CATEGORY_DATA.map((d) => d.count)).toFixed(2),
  );
  const maxEntropy = parseFloat(Math.log2(CATEGORY_DATA.length).toFixed(2));
  const balanceRatio = parseFloat((catEntropy / maxEntropy).toFixed(2));
  const dominantPct = Math.round((CATEGORY_DATA[0].count / totalCat) * 100);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Visualizations</CardTitle>
        <CardDescription>
          Distribution, correlation, outliers, and category analysis
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 pt-2">
        {/* ── Row 1: Histogram + Missing ───────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Histogram */}
          <Panel
            title="Salary Distribution"
            subtitle="Frequency histogram with skewness & kurtosis"
            badge={{ label: skLabel, color: skColor }}
          >
            <ResponsiveContainer width="100%" height={180}>
              <BarChart
                data={histData}
                margin={{ top: 4, right: 4, left: -24, bottom: 0 }}
                barCategoryGap="8%"
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                  strokeOpacity={0.5}
                  vertical={false}
                />
                <XAxis
                  dataKey="bin"
                  tick={{ fontSize: 9, fill: "hsl(var(--muted-foreground))" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 9, fill: "hsl(var(--muted-foreground))" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<Tip />} />
                <Bar dataKey="count" name="Count" radius={[3, 3, 0, 0]}>
                  {histData.map((_, i) => (
                    <Cell
                      key={i}
                      fill={C.blue}
                      fillOpacity={0.5 + (i / histData.length) * 0.5}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="flex items-center gap-4 mt-1">
              {[
                { label: "Skewness", value: sk.toFixed(2), color: skColor },
                {
                  label: "Kurtosis",
                  value: ku.toFixed(2),
                  color: Math.abs(ku) > 1 ? C.violet : C.slate,
                },
                {
                  label: "σ",
                  value: `$${Math.round(std(salaryVals) / 1000)}k`,
                  color: C.slate,
                },
              ].map((s) => (
                <div key={s.label} className="flex flex-col">
                  <span className="text-[9px] font-semibold uppercase tracking-widest text-muted-foreground">
                    {s.label}
                  </span>
                  <span
                    className="text-sm font-bold tabular-nums"
                    style={{ color: s.color }}
                  >
                    {s.value}
                  </span>
                </div>
              ))}
            </div>
          </Panel>

          {/* Missing values bar */}
          <Panel
            title="Missing Values"
            subtitle="% null per column — sorted by severity"
          >
            <ResponsiveContainer width="100%" height={180}>
              <BarChart
                data={MISSING_DATA}
                layout="vertical"
                margin={{ top: 0, right: 32, left: 0, bottom: 0 }}
                barSize={12}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                  strokeOpacity={0.4}
                  horizontal={false}
                />
                <XAxis
                  type="number"
                  domain={[0, 5]}
                  tick={{ fontSize: 9, fill: "hsl(var(--muted-foreground))" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `${v}%`}
                />
                <YAxis
                  type="category"
                  dataKey="col"
                  tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                  axisLine={false}
                  tickLine={false}
                  width={64}
                />
                <Tooltip content={<Tip />} />
                <Bar dataKey="pct" name="Missing %" radius={[0, 5, 5, 0]}>
                  {MISSING_DATA.map((d, i) => (
                    <Cell
                      key={i}
                      fill={d.pct > 3 ? C.rose : d.pct > 1 ? C.amber : C.green}
                      fillOpacity={0.85}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="flex items-center gap-3 mt-1">
              {[
                { label: "> 3% critical", color: C.rose },
                { label: "1–3% moderate", color: C.amber },
                { label: "< 1% clean", color: C.green },
              ].map((l) => (
                <div key={l.label} className="flex items-center gap-1">
                  <span
                    className="w-2 h-2 rounded-sm"
                    style={{ background: l.color }}
                  />
                  <span className="text-[10px] text-muted-foreground">
                    {l.label}
                  </span>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        {/* ── Row 2: Correlation Heatmap ───────────────────── */}
        <Panel
          title="Correlation Matrix"
          subtitle="Pearson r between all numerical features — blue = positive, red = negative"
        >
          <div className="overflow-x-auto">
            <div
              className="inline-grid gap-1"
              style={{
                gridTemplateColumns: `80px repeat(${NUM_COLS.length}, minmax(72px, 1fr))`,
              }}
            >
              {/* Header row */}
              <div />
              {NUM_COLS.map((col) => (
                <div
                  key={col}
                  className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground text-center pb-1 truncate"
                >
                  {col}
                </div>
              ))}
              {/* Data rows */}
              {NUM_COLS.map((rowCol, ri) => (
                <div key={rowCol}>
                  <div
                    key={rowCol}
                    className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground self-center truncate pr-2"
                  >
                    {rowCol}
                  </div>
                  {NUM_COLS.map((colCol, ci) => {
                    const r = corrMatrix[ri][ci];
                    const isDiag = ri === ci;
                    return (
                      <div
                        key={colCol}
                        className="h-14 rounded-lg flex flex-col items-center justify-center gap-0.5 border border-border/30"
                        style={{
                          background: isDiag
                            ? "hsl(var(--muted)/0.4)"
                            : corrBg(r),
                        }}
                        title={`${rowCol} vs ${colCol}: r = ${r}`}
                      >
                        {isDiag ? (
                          <span className="text-[10px] font-bold text-muted-foreground">
                            —
                          </span>
                        ) : (
                          <>
                            <span
                              className="text-sm font-bold tabular-nums"
                              style={{ color: corrColor(r) }}
                            >
                              {r.toFixed(2)}
                            </span>
                            <span className="text-[8px] text-muted-foreground">
                              {Math.abs(r) > 0.7
                                ? "strong"
                                : Math.abs(r) > 0.3
                                  ? "moderate"
                                  : "weak"}
                            </span>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
          {/* Color scale legend */}
          <div className="mt-3 flex items-center gap-2">
            <span className="text-[10px] text-muted-foreground">−1</span>
            <div
              className="flex-1 h-2 rounded-full"
              style={{
                background: `linear-gradient(to right, ${C.rose}, ${C.slate}, ${C.blue})`,
              }}
            />
            <span className="text-[10px] text-muted-foreground">+1</span>
          </div>
        </Panel>

        {/* ── Row 3: Box Plot + Scatter ─────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Box Plot — custom SVG */}
          <Panel
            title="Salary by Department"
            subtitle="Box plot — median, IQR, whiskers, and outliers"
          >
            <div className="w-full overflow-x-auto">
              <svg
                width="100%"
                viewBox="0 0 420 200"
                className="overflow-visible"
              >
                {boxData.map((g, i) => {
                  const x = 40 + i * 95;
                  const W = 36;
                  const YMIN = 30000;
                  const YMAX = 90000;
                  const scale = (v: number) =>
                    180 - ((v - YMIN) / (YMAX - YMIN)) * 150;

                  const yQ1 = scale(g.q1);
                  const yQ3 = scale(g.q3);
                  const yMed = scale(g.med);
                  const yLo = scale(g.lo);
                  const yHi = scale(g.hi);
                  const boxColor = [C.blue, C.violet, C.teal, C.amber][i];

                  return (
                    <g key={g.dept}>
                      {/* Whisker lines */}
                      <line
                        x1={x + W / 2}
                        y1={yLo}
                        x2={x + W / 2}
                        y2={yQ1}
                        stroke={boxColor}
                        strokeWidth={1.5}
                        strokeDasharray="3 2"
                        strokeOpacity={0.6}
                      />
                      <line
                        x1={x + W / 2}
                        y1={yQ3}
                        x2={x + W / 2}
                        y2={yHi}
                        stroke={boxColor}
                        strokeWidth={1.5}
                        strokeDasharray="3 2"
                        strokeOpacity={0.6}
                      />
                      {/* Whisker caps */}
                      <line
                        x1={x + 8}
                        y1={yLo}
                        x2={x + W - 8}
                        y2={yLo}
                        stroke={boxColor}
                        strokeWidth={1.5}
                      />
                      <line
                        x1={x + 8}
                        y1={yHi}
                        x2={x + W - 8}
                        y2={yHi}
                        stroke={boxColor}
                        strokeWidth={1.5}
                      />
                      {/* IQR box */}
                      <rect
                        x={x}
                        y={yQ3}
                        width={W}
                        height={yQ1 - yQ3}
                        rx={4}
                        fill={boxColor}
                        fillOpacity={0.15}
                        stroke={boxColor}
                        strokeWidth={1.5}
                      />
                      {/* Median line */}
                      <line
                        x1={x}
                        y1={yMed}
                        x2={x + W}
                        y2={yMed}
                        stroke={boxColor}
                        strokeWidth={2.5}
                        strokeLinecap="round"
                      />
                      {/* Mean dot */}
                      <circle
                        cx={x + W / 2}
                        cy={scale(g.mean)}
                        r={3}
                        fill={boxColor}
                        fillOpacity={0.9}
                      />
                      {/* Outliers */}
                      {g.outliers.slice(0, 6).map((ov, oi) => (
                        <circle
                          key={oi}
                          cx={x + W / 2 + (oi % 2 === 0 ? -6 : 6)}
                          cy={scale(ov)}
                          r={2.5}
                          fill={C.rose}
                          fillOpacity={0.7}
                        />
                      ))}
                      {/* Label */}
                      <text
                        x={x + W / 2}
                        y={195}
                        textAnchor="middle"
                        fontSize={9}
                        fill="hsl(var(--muted-foreground))"
                        fontWeight={600}
                      >
                        {g.dept.slice(0, 4).toUpperCase()}
                      </text>
                    </g>
                  );
                })}
                {/* Y-axis ticks */}
                {[40000, 55000, 70000, 85000].map((v) => {
                  const y = 180 - ((v - 30000) / 60000) * 150;
                  return (
                    <g key={v}>
                      <line
                        x1={28}
                        y1={y}
                        x2={390}
                        y2={y}
                        stroke="hsl(var(--border))"
                        strokeOpacity={0.4}
                        strokeWidth={1}
                      />
                      <text
                        x={24}
                        y={y + 3}
                        textAnchor="end"
                        fontSize={8}
                        fill="hsl(var(--muted-foreground))"
                      >
                        {`$${v / 1000}k`}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
            <div className="flex items-center gap-4 mt-1">
              {[
                { shape: "rect", label: "IQR box (Q1–Q3)" },
                { shape: "line", label: "Median" },
                { shape: "dot", label: "Mean" },
                { shape: "out", label: "Outliers" },
              ].map((l) => (
                <div key={l.label} className="flex items-center gap-1.5">
                  {l.shape === "rect" && (
                    <span className="w-3 h-3 rounded-sm bg-blue-500/20 border border-blue-500/60" />
                  )}
                  {l.shape === "line" && (
                    <span className="w-3 h-0.5 bg-blue-500 rounded" />
                  )}
                  {l.shape === "dot" && (
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                  )}
                  {l.shape === "out" && (
                    <span className="w-2 h-2 rounded-full bg-rose-500/70" />
                  )}
                  <span className="text-[10px] text-muted-foreground">
                    {l.label}
                  </span>
                </div>
              ))}
            </div>
          </Panel>

          {/* Scatter + OLS regression */}
          <Panel
            title="Score vs Salary"
            subtitle="Scatter with OLS regression line"
            badge={{
              label: `r = ${rVal}`,
              color: Math.abs(rVal) > 0.5 ? C.blue : C.slate,
            }}
          >
            <ResponsiveContainer width="100%" height={188}>
              <ComposedChart
                margin={{ top: 4, right: 8, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                  strokeOpacity={0.4}
                />
                <XAxis
                  dataKey="x"
                  type="number"
                  domain={["auto", "auto"]}
                  name="Score"
                  tick={{ fontSize: 9, fill: "hsl(var(--muted-foreground))" }}
                  axisLine={false}
                  tickLine={false}
                  label={{
                    value: "Score",
                    position: "insideBottom",
                    offset: -2,
                    fontSize: 9,
                    fill: "hsl(var(--muted-foreground))",
                  }}
                />
                <YAxis
                  dataKey="y"
                  type="number"
                  domain={["auto", "auto"]}
                  name="Salary"
                  tick={{ fontSize: 9, fill: "hsl(var(--muted-foreground))" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `$${Math.round(v / 1000)}k`}
                />
                <Tooltip
                  cursor={{ strokeDasharray: "3 3" }}
                  content={({ active, payload }) => {
                    if (!active || !payload?.length) return null;
                    const d = payload[0]?.payload;
                    return (
                      <div className="bg-card border border-border rounded-lg px-3 py-2 text-xs shadow-lg">
                        <p className="text-muted-foreground">
                          Score:{" "}
                          <strong className="text-foreground">{d?.x}</strong>
                        </p>
                        <p className="text-muted-foreground">
                          Salary:{" "}
                          <strong className="text-foreground">
                            ${d?.y?.toLocaleString()}
                          </strong>
                        </p>
                      </div>
                    );
                  }}
                />
                <Scatter
                  data={scatterData}
                  name="Observations"
                  fill={C.blue}
                  fillOpacity={0.55}
                  r={3}
                />
                <Line
                  data={regressionLine}
                  type="linear"
                  dataKey="y"
                  stroke={C.rose}
                  strokeWidth={2}
                  dot={false}
                  name="OLS fit"
                  legendType="none"
                />
              </ComposedChart>
            </ResponsiveContainer>
            <div className="flex items-center gap-4 mt-1">
              {[
                { color: C.blue, shape: "dot", label: "Observations" },
                { color: C.rose, shape: "line", label: "OLS regression" },
              ].map((l) => (
                <div key={l.label} className="flex items-center gap-1.5">
                  {l.shape === "dot" && (
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ background: l.color }}
                    />
                  )}
                  {l.shape === "line" && (
                    <span
                      className="w-4 h-0.5 rounded"
                      style={{ background: l.color }}
                    />
                  )}
                  <span className="text-[10px] text-muted-foreground">
                    {l.label}
                  </span>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        {/* ── Row 4: Category Balance ──────────────────────── */}
        <Panel
          title="Category Frequency — Department"
          subtitle={`Shannon entropy: ${catEntropy} / ${maxEntropy} (balance ratio: ${balanceRatio})`}
          badge={{
            label:
              balanceRatio > 0.85
                ? "Well balanced"
                : balanceRatio > 0.6
                  ? "Moderate imbalance"
                  : "Imbalanced",
            color:
              balanceRatio > 0.85
                ? C.green
                : balanceRatio > 0.6
                  ? C.amber
                  : C.rose,
          }}
        >
          <ResponsiveContainer width="100%" height={160}>
            <BarChart
              data={CATEGORY_DATA}
              layout="vertical"
              margin={{ top: 0, right: 48, left: 0, bottom: 0 }}
              barSize={14}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
                strokeOpacity={0.4}
                horizontal={false}
              />
              <XAxis
                type="number"
                tick={{ fontSize: 9, fill: "hsl(var(--muted-foreground))" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                type="category"
                dataKey="name"
                tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                axisLine={false}
                tickLine={false}
                width={80}
              />
              <Tooltip content={<Tip />} />
              <Bar dataKey="count" name="Count" radius={[0, 5, 5, 0]}>
                {CATEGORY_DATA.map((d, i) => {
                  const pct = d.count / totalCat;
                  return (
                    <Cell
                      key={i}
                      fill={pct > 0.3 ? C.rose : pct > 0.15 ? C.amber : C.blue}
                      fillOpacity={0.75 + i * 0.01}
                    />
                  );
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-3">
              {[
                { label: "> 30% dominant", color: C.rose },
                { label: "15–30%", color: C.amber },
                { label: "< 15% balanced", color: C.blue },
              ].map((l) => (
                <div key={l.label} className="flex items-center gap-1">
                  <span
                    className="w-2 h-2 rounded-sm"
                    style={{ background: l.color }}
                  />
                  <span className="text-[10px] text-muted-foreground">
                    {l.label}
                  </span>
                </div>
              ))}
            </div>
            <span className="text-[10px] text-muted-foreground tabular-nums">
              Dominant:{" "}
              <strong className="text-foreground">
                {CATEGORY_DATA[0].name}
              </strong>{" "}
              ({dominantPct}%)
            </span>
          </div>
        </Panel>
      </CardContent>
    </Card>
  );
}
