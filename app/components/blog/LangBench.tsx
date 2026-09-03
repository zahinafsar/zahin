"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Row = {
  name: string;
  value: number;
};

type TooltipPayloadItem = {
  payload?: Row;
  value?: number;
};

type ChartTooltipProps = {
  active?: boolean;
  label?: string | number;
  payload?: readonly TooltipPayloadItem[];
};

const CPU: Row[] = [
  { name: "Rust", value: 1175 },
  { name: "Zig", value: 1175 },
  { name: "Nim", value: 1176 },
  { name: "Odin", value: 1176 },
  { name: "Crystal", value: 1176 },
  { name: "C++ (g++)", value: 1178 },
  { name: "D (GDC)", value: 1178 },
  { name: "Ada", value: 1180 },
  { name: "C (gcc)", value: 1182 },
  { name: "Go", value: 1187 },
];

const MEM: Row[] = [
  { name: "Zig", value: 729 },
  { name: "Rust", value: 729 },
  { name: "Odin", value: 732 },
  { name: "C++ (g++)", value: 745 },
  { name: "Ada", value: 749 },
  { name: "C (gcc)", value: 750 },
  { name: "D (GDC)", value: 756 },
  { name: "Nim", value: 773 },
  { name: "Crystal", value: 821 },
  { name: "Go", value: 890 },
];

const PACK = "#b8ff3e";
const OUTLIER = "#ff6b3d";

function ChartTooltip({ active, payload }: ChartTooltipProps) {
  if (!active || !payload?.length) return null;
  const row = payload[0]?.payload;
  if (!row) return null;
  return (
    <div className="min-w-[150px] rounded-xl border border-white/12 bg-[#0a0a0a]/95 px-3.5 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.4)] backdrop-blur">
      <div className="mb-1.5 text-[13px] font-semibold tracking-tight text-white">
        {row.name}
      </div>
      <div className="font-mono text-[12px] tabular-nums text-white">
        {row.value} <span className="text-[var(--muted)]">ms</span>
      </div>
    </div>
  );
}

function Chart({
  data,
  domain,
  caption,
  highlight,
}: {
  data: Row[];
  domain: [number, number];
  caption: string;
  highlight?: string;
}) {
  return (
    <figure className="not-prose my-8 rounded-2xl border border-[var(--border)] bg-[var(--bg-soft)] p-5">
      <div style={{ width: "100%", height: 380 }}>
        <ResponsiveContainer>
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 8, right: 24, bottom: 8, left: 8 }}
            barCategoryGap="18%"
          >
            <CartesianGrid horizontal={false} stroke="rgba(255,255,255,0.06)" />
            <XAxis
              type="number"
              domain={domain}
              allowDataOverflow
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9a9a9a", fontSize: 11 }}
              tickFormatter={(v: number) => `${v}ms`}
            />
            <YAxis
              type="category"
              dataKey="name"
              axisLine={{ stroke: "rgba(255,255,255,0.12)" }}
              tickLine={false}
              tick={{ fill: "#f5f5f5", fontSize: 12 }}
              width={92}
            />
            <Tooltip
              cursor={{ fill: "rgba(255,255,255,0.04)" }}
              content={(props) => (
                <ChartTooltip
                  active={props.active}
                  payload={
                    props.payload as readonly TooltipPayloadItem[] | undefined
                  }
                />
              )}
            />
            <Bar dataKey="value" radius={[0, 4, 4, 0]} maxBarSize={22}>
              {data.map((row) => (
                <Cell
                  key={row.name}
                  fill={row.name === highlight ? OUTLIER : PACK}
                />
              ))}
              <LabelList
                dataKey="value"
                position="right"
                offset={8}
                formatter={(v: unknown) => `${v} ms`}
                style={{
                  fill: "#f5f5f5",
                  fontSize: 11,
                  fontVariantNumeric: "tabular-nums",
                }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <figcaption className="mt-3 text-center text-sm text-[var(--muted)]">
        {caption}
      </figcaption>
    </figure>
  );
}

export function LangBenchCpu() {
  return (
    <Chart
      data={CPU}
      domain={[1160, 1230]}
      caption="Mandelbrot, median of 25 runs. Axis starts at 1160 ms, not zero: the whole field fits in 13 ms."
    />
  );
}

export function LangBenchMem() {
  return (
    <Chart
      data={MEM}
      domain={[0, 1020]}
      caption="256 MB array plus 60M random reads, median of 25 runs. Shorter is better."
      highlight="Go"
    />
  );
}

export default function LangBench() {
  return (
    <>
      <LangBenchCpu />
      <LangBenchMem />
    </>
  );
}
