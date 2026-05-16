"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type TooltipPayloadItem = {
  dataKey?: string | number;
  name: string;
  value: number;
  color?: string;
};

type ChartTooltipProps = {
  active?: boolean;
  label?: string | number;
  payload?: TooltipPayloadItem[];
  unit: string;
};

type Row = {
  name: string;
  avg: number;
  p95: number;
  p99: number;
};

const DEFAULT_DATA: Row[] = [
  { name: "Raw SQL", avg: 4.4, p95: 9.8, p99: 17.7 },
  { name: "Drizzle", avg: 11.1, p95: 17.0, p99: 28.6 },
  { name: "Prisma", avg: 35.2, p95: 46.7, p99: 58.5 },
  { name: "Supabase", avg: 55.5, p95: 69.5, p99: 103.2 },
];

const SERIES = [
  { key: "avg", label: "Avg", color: "#b8ff3e" },
  { key: "p95", label: "P95", color: "#7dd3fc" },
  { key: "p99", label: "P99", color: "#ff6b3d" },
] as const;

function ChartTooltip({ active, payload, label, unit }: ChartTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="min-w-[160px] rounded-xl border border-white/12 bg-[#0a0a0a]/95 px-3.5 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.4)] backdrop-blur">
      <div className="mb-2 border-b border-white/10 pb-2 text-[13px] font-semibold tracking-tight text-white">
        {label}
      </div>
      <ul
        className="space-y-1.5"
        style={{ margin: 0, padding: 0, listStyle: "none" }}
      >
        {payload.map((p) => (
          <li
            key={String(p.dataKey)}
            className="flex items-center justify-between gap-4 text-[12px]"
          >
            <span className="flex items-center gap-2">
              <span
                aria-hidden
                className="inline-block h-2 w-2 rounded-full"
                style={{ background: p.color }}
              />
              <span className="text-[var(--muted)]">{p.name}</span>
            </span>
            <span className="font-mono font-medium tabular-nums text-white">
              {p.value} <span className="text-[var(--muted)]">{unit}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function PerfChart({
  data = DEFAULT_DATA,
  unit = "ms",
  caption = "Latency by method — Avg, P95, P99. Lower is better.",
}: {
  data?: Row[];
  unit?: string;
  caption?: string;
}) {
  return (
    <figure className="not-prose my-8 rounded-2xl border border-[var(--border)] bg-[var(--bg-soft)] p-5">
      <div style={{ width: "100%", height: 360 }}>
        <ResponsiveContainer>
          <BarChart
            data={data}
            margin={{ top: 24, right: 16, bottom: 8, left: 8 }}
            barCategoryGap="22%"
            barGap={4}
          >
            <CartesianGrid
              vertical={false}
              stroke="rgba(255,255,255,0.06)"
            />
            <XAxis
              type="category"
              dataKey="name"
              axisLine={{ stroke: "rgba(255,255,255,0.12)" }}
              tickLine={false}
              tick={{ fill: "#f5f5f5", fontSize: 13 }}
              tickMargin={8}
            />
            <YAxis
              type="number"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9a9a9a", fontSize: 11 }}
              tickFormatter={(v: number) => `${v}${unit}`}
              width={48}
            />
            <Tooltip
              cursor={{ fill: "rgba(255,255,255,0.04)" }}
              content={(props) => (
                <ChartTooltip
                  active={props.active}
                  label={props.label as string | number | undefined}
                  payload={props.payload?.map((p) => ({
                    dataKey: p.dataKey as string | number | undefined,
                    name: typeof p.name === "string" ? p.name : String(p.name ?? ""),
                    value: typeof p.value === "number" ? p.value : Number(p.value),
                    color: p.color,
                  }))}
                  unit={unit}
                />
              )}
            />
            <Legend
              verticalAlign="top"
              align="right"
              height={28}
              iconType="circle"
              iconSize={9}
              wrapperStyle={{ fontSize: 12, color: "#f5f5f5" }}
            />
            {SERIES.map((s) => (
              <Bar
                key={s.key}
                dataKey={s.key}
                name={s.label}
                fill={s.color}
                radius={[4, 4, 0, 0]}
                maxBarSize={32}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
      <figcaption className="mt-3 text-center text-xs text-[var(--muted)]">
        {caption}
      </figcaption>
    </figure>
  );
}
