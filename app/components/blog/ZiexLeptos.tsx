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

type Row = { name: string; ziex: number; leptos: number };

const LATENCY: Row[] = [
  { name: "p50", ziex: 0.23, leptos: 0.1 },
  { name: "p90", ziex: 0.46, leptos: 0.54 },
  { name: "p99", ziex: 0.98, leptos: 0.9 },
];

const THROUGHPUT: Row[] = [{ name: "req/sec", ziex: 182.7, leptos: 235.0 }];

const ZIEX = "#7dd3fc";
const LEPTOS = "#ff6b3d";

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

function Chart({
  data,
  unit,
  title,
}: {
  data: Row[];
  unit: string;
  title: string;
}) {
  return (
    <div className="flex-1">
      <div className="mb-3 text-center text-[11px] font-semibold uppercase tracking-widest text-[var(--muted)]">
        {title}
      </div>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart
            data={data}
            margin={{ top: 24, right: 12, bottom: 8, left: 4 }}
            barCategoryGap="28%"
            barGap={6}
          >
            <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.06)" />
            <XAxis
              type="category"
              dataKey="name"
              axisLine={{ stroke: "rgba(255,255,255,0.12)" }}
              tickLine={false}
              tick={{ fill: "#f5f5f5", fontSize: 12 }}
              tickMargin={8}
            />
            <YAxis
              type="number"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9a9a9a", fontSize: 11 }}
              tickFormatter={(v: number) => `${v}${unit}`}
              width={52}
            />
            <Tooltip
              cursor={{ fill: "rgba(255,255,255,0.04)" }}
              content={(props) => (
                <ChartTooltip
                  active={props.active}
                  label={props.label as string | number | undefined}
                  payload={props.payload?.map((p) => ({
                    dataKey: p.dataKey as string | number | undefined,
                    name:
                      typeof p.name === "string" ? p.name : String(p.name ?? ""),
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
            <Bar
              dataKey="ziex"
              name="Ziex (Zig)"
              fill={ZIEX}
              radius={[4, 4, 0, 0]}
              maxBarSize={44}
            />
            <Bar
              dataKey="leptos"
              name="Leptos (Rust)"
              fill={LEPTOS}
              radius={[4, 4, 0, 0]}
              maxBarSize={44}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default function ZiexLeptos({
  caption = "Left: latency, shorter is better. Right: throughput, taller is better. 20s run, 50 connections.",
}: {
  caption?: string;
}) {
  return (
    <figure className="not-prose my-8 rounded-2xl border border-[var(--border)] bg-[var(--bg-soft)] p-5">
      <div className="flex flex-col gap-8 md:flex-row">
        <Chart data={LATENCY} unit="ms" title="Latency (lower better)" />
        <Chart data={THROUGHPUT} unit="k" title="Throughput (higher better)" />
      </div>
      <figcaption className="mt-4 text-center text-xs text-[var(--muted)]">
        {caption}
      </figcaption>
    </figure>
  );
}
