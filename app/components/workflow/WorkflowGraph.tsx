"use client";

import { useEffect, useRef, useState } from "react";
import {
  Bot,
  Check,
  FlaskConical,
  Lightbulb,
  NotebookPen,
  Pause,
  Play,
  Rocket,
  RotateCcw,
  ScrollText,
  StepForward,
  Terminal,
  TestTubeDiagonal,
  X,
  type LucideIcon,
} from "lucide-react";
import {
  CANVAS,
  EDGES,
  MEMORY_LINKS,
  NODE_HEIGHT,
  NODE_WIDTH,
  NODES,
  PLAN_INPUT_HEIGHT,
  PLAN_INPUT_Y,
  PLAN_INPUTS,
  SUB_AGENT_CAPTION_X,
  SUB_AGENTS,
  SEQUENCE,
  type MemoryLink,
  type WorkflowEdge,
  type WorkflowNode,
  type WorkflowNodeId,
} from "../../lib/workflow";

type Status = "idle" | "running" | "done" | "failed";

type LogLine = {
  id: number;
  nodeId: WorkflowNodeId;
  text: string;
  fail: boolean;
};

type Run = {
  step: number;
  seq: number;
  logs: LogLine[];
};

const ICONS: Record<WorkflowNodeId, LucideIcon> = {
  input: Lightbulb,
  plan: ScrollText,
  tests: TestTubeDiagonal,
  execute: Bot,
  verify: FlaskConical,
  ship: Rocket,
  memory: NotebookPen,
};

const LANES = [
  { label: "Prepare", x: 320 },
  { label: "Build loop", x: 845 },
  { label: "Final", x: 1160 },
];

const LAST = SEQUENCE.length - 1;
const BASE_INTERVAL = 1900;

const NODE_MAP = Object.fromEntries(NODES.map((node) => [node.id, node])) as Record<
  WorkflowNodeId,
  WorkflowNode
>;

const INITIAL_RUN: Run = { step: -1, seq: 0, logs: [] };

const nextRun = (run: Run): Run => {
  if (run.step >= LAST) {
    return run;
  }
  const step = run.step + 1;
  const entry = SEQUENCE[step];
  let seq = run.seq;
  const lines = entry.log.map((text) => {
    seq += 1;
    return { id: seq, nodeId: entry.node, text, fail: entry.fail === true };
  });
  return { step, seq, logs: [...run.logs, ...lines] };
};

const startIfIdle = (run: Run): Run => {
  if (run.step === -1) {
    return nextRun(run);
  }
  return run;
};

const memoryLinkAt = (index: number, link: MemoryLink) => {
  if (index < 0) {
    return false;
  }
  const entry = SEQUENCE[index];
  return entry.node === link.node && (link.mode === "read" || entry.fail === true);
};

const memoryLinkStatus = (run: Run, link: MemoryLink): Status => {
  if (memoryLinkAt(run.step, link)) {
    return "running";
  }
  for (let index = 0; index < run.step; index += 1) {
    if (memoryLinkAt(index, link)) {
      return "done";
    }
  }
  return "idle";
};

const memoryStatus = (run: Run): Status => {
  const statuses = MEMORY_LINKS.map((link) => memoryLinkStatus(run, link));
  if (statuses.includes("running")) {
    return "running";
  }
  if (statuses.includes("done")) {
    return "done";
  }
  return "idle";
};

const statusOf = (run: Run, id: WorkflowNodeId): Status => {
  if (id === "memory") {
    return memoryStatus(run);
  }
  if (run.step >= 0 && SEQUENCE[run.step].node === id) {
    return "running";
  }
  for (let index = run.step - 1; index >= 0; index -= 1) {
    const entry = SEQUENCE[index];
    if (entry.node === id) {
      if (entry.fail) {
        return "failed";
      }
      return "done";
    }
  }
  return "idle";
};

const transitionAt = (index: number, edge: WorkflowEdge) => {
  return (
    index > 0 &&
    SEQUENCE[index - 1].node === edge.from &&
    SEQUENCE[index].node === edge.to
  );
};

const edgeStatus = (run: Run, edge: WorkflowEdge): Status => {
  if (transitionAt(run.step, edge)) {
    return "running";
  }
  for (let index = 1; index < run.step; index += 1) {
    if (transitionAt(index, edge)) {
      return "done";
    }
  }
  return "idle";
};

const edgePath = (edge: WorkflowEdge) => {
  const a = NODE_MAP[edge.from];
  const b = NODE_MAP[edge.to];
  const hw = NODE_WIDTH / 2;
  const hh = NODE_HEIGHT / 2;
  if (edge.loop) {
    return `M ${a.x} ${a.y + hh} C ${a.x} ${a.y + 150}, ${b.x} ${b.y + 150}, ${b.x} ${b.y + hh + 6}`;
  }
  const sx = a.x + hw;
  const ex = b.x - hw - 6;
  return `M ${sx} ${a.y} L ${ex} ${b.y}`;
};

const nodeClass = (status: Status, selected: boolean) => {
  let tone = "border-[var(--border)] bg-[var(--bg-soft)] text-[var(--muted)]";
  if (status === "running") {
    tone =
      "border-[var(--accent)] bg-[#140b07] text-white shadow-[0_0_40px_-6px_rgba(255,107,61,0.55)]";
  } else if (status === "done") {
    tone = "border-white/20 bg-[var(--bg-soft)] text-white";
  } else if (status === "failed") {
    tone = "border-red-500/60 bg-[var(--bg-soft)] text-white";
  }
  let ring = "";
  if (selected) {
    ring = "ring-2 ring-white/60 ring-offset-2 ring-offset-[var(--bg)]";
  }
  return `${tone} ${ring}`;
};

const subAgentAt = (index: number, id: string) => {
  if (index < 0) {
    return false;
  }
  const parallel = SEQUENCE[index].parallel;
  if (!parallel) {
    return false;
  }
  return parallel.includes(id);
};

const subAgentStatus = (run: Run, id: string): Status => {
  if (subAgentAt(run.step, id)) {
    return "running";
  }
  for (let index = 0; index < run.step; index += 1) {
    if (subAgentAt(index, id)) {
      return "done";
    }
  }
  return "idle";
};

type SatelliteProps = {
  label: string;
  x: number;
  width: number;
  status: Status;
  target: { x: number; y: number };
  seq: number;
  interval: number;
  roundTrip: boolean;
};

function Satellite({ label, x, width, status, target, seq, interval, roundTrip }: SatelliteProps) {
  const d = `M ${x} ${PLAN_INPUT_Y + PLAN_INPUT_HEIGHT / 2} L ${target.x} ${target.y}`;
  let stroke = "rgba(255,255,255,0.14)";
  let fill = "var(--bg-soft)";
  let border = "rgba(255,255,255,0.12)";
  let text = "var(--muted)";
  if (status === "running") {
    stroke = "var(--accent)";
    border = "var(--accent)";
    fill = "#140b07";
    text = "#ffffff";
  } else if (status === "done") {
    stroke = "rgba(255,255,255,0.45)";
    border = "rgba(255,255,255,0.3)";
    text = "#ffffff";
  }
  const packets = [
    { key: "in-0", offset: 0, reverse: false },
    { key: "in-1", offset: 0.5, reverse: false },
  ];
  if (roundTrip) {
    packets.push({ key: "out-0", offset: 0.25, reverse: true });
    packets.push({ key: "out-1", offset: 0.75, reverse: true });
  }
  return (
    <g>
      <path
        d={d}
        fill="none"
        stroke={stroke}
        strokeWidth={1.5}
        strokeDasharray="4 5"
        className="transition-[stroke] duration-500"
      />
      {status === "running" &&
        packets.map((packet) => (
          <circle
            key={`${seq}-${label}-${packet.key}`}
            r={3}
            fill="var(--accent)"
            style={{ filter: "drop-shadow(0 0 6px var(--accent))" }}
          >
            <animateMotion
              dur={`${interval * 0.5}ms`}
              begin={`${interval * 0.5 * packet.offset}ms`}
              repeatCount="indefinite"
              path={d}
              keyPoints={packet.reverse ? "1;0" : "0;1"}
              keyTimes="0;1"
              calcMode="linear"
            />
          </circle>
        ))}
      <rect
        x={x - width / 2}
        y={PLAN_INPUT_Y - PLAN_INPUT_HEIGHT / 2}
        width={width}
        height={PLAN_INPUT_HEIGHT}
        rx={PLAN_INPUT_HEIGHT / 2}
        fill={fill}
        stroke={border}
        className="transition-all duration-500"
      />
      <text
        x={x}
        y={PLAN_INPUT_Y + 4.5}
        textAnchor="middle"
        fill={text}
        className="text-[12px] transition-all duration-500"
      >
        {label}
      </text>
    </g>
  );
}

const percent = (value: number, total: number) => `${(value / total) * 100}%`;

export default function WorkflowGraph() {
  const [run, setRun] = useState<Run>(INITIAL_RUN);
  const [playing, setPlaying] = useState(false);
  const [fast, setFast] = useState(false);
  const [selectedId, setSelectedId] = useState<WorkflowNodeId | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const logRef = useRef<HTMLDivElement>(null);

  const finished = run.step === LAST;
  const active = playing && !finished;

  let interval = BASE_INTERVAL;
  if (fast) {
    interval = BASE_INTERVAL / 2;
  }

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) {
      return;
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setRun(startIfIdle);
          setPlaying(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!active) {
      return;
    }
    const timer = window.setInterval(() => {
      setRun(nextRun);
    }, interval);
    return () => {
      window.clearInterval(timer);
    };
  }, [active, interval]);

  useEffect(() => {
    const element = logRef.current;
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  }, [run.logs]);

  const togglePlay = () => {
    if (finished) {
      setSelectedId(null);
      setRun(nextRun(INITIAL_RUN));
      setPlaying(true);
      return;
    }
    if (!active) {
      setRun(startIfIdle);
    }
    setPlaying(!active);
  };

  const step = () => {
    setPlaying(false);
    setRun(nextRun);
  };

  const reset = () => {
    setPlaying(false);
    setSelectedId(null);
    setRun(INITIAL_RUN);
  };

  let detailId: WorkflowNodeId = "input";
  if (selectedId) {
    detailId = selectedId;
  } else if (run.step >= 0) {
    detailId = SEQUENCE[run.step].node;
  }
  const detail = NODE_MAP[detailId];
  const DetailIcon = ICONS[detail.id];
  const detailStatus = statusOf(run, detail.id);

  let attempt = 0;
  for (let index = 0; index <= run.step; index += 1) {
    if (SEQUENCE[index].node === "execute") {
      attempt += 1;
    }
  }

  let statusLabel = "Idle";
  if (finished) {
    statusLabel = "Shipped. Pipeline complete.";
  } else if (attempt > 0) {
    statusLabel = `Step ${run.step + 1} of ${SEQUENCE.length}, attempt ${attempt}`;
  } else if (run.step >= 0) {
    statusLabel = `Step ${run.step + 1} of ${SEQUENCE.length}`;
  }

  let playLabel = "Run";
  if (active) {
    playLabel = "Pause";
  } else if (finished) {
    playLabel = "Run again";
  }

  return (
    <section id="workflow" className="relative px-6 pb-24 md:px-10">
      <div ref={sectionRef} className="mx-auto w-full max-w-7xl">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              <span className="text-gradient">The pipeline, live.</span>
            </h2>
            <p className="mt-2 text-sm text-[var(--muted)]">{statusLabel}</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={togglePlay}
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-[var(--accent)]"
            >
              {active ? <Pause size={16} /> : <Play size={16} />}
              {playLabel}
            </button>
            <button
              type="button"
              onClick={step}
              disabled={finished}
              aria-label="Next step"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-4 py-2 text-sm text-white transition hover:border-white disabled:pointer-events-none disabled:opacity-40"
            >
              <StepForward size={16} />
              Step
            </button>
            <button
              type="button"
              onClick={() => setFast((value) => !value)}
              aria-pressed={fast}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                fast
                  ? "border-[var(--accent)] text-[var(--accent)]"
                  : "border-[var(--border)] text-white hover:border-white"
              }`}
            >
              {fast ? "2x" : "1x"}
            </button>
            <button
              type="button"
              onClick={reset}
              aria-label="Reset workflow"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] text-white transition hover:border-white"
            >
              <RotateCcw size={16} />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto rounded-3xl border border-[var(--border)] bg-black/40">
          <div
            className="relative min-w-[1120px]"
            style={{ aspectRatio: `${CANVAS.width} / ${CANVAS.height}` }}
          >
            <div className="absolute inset-0 grid-bg opacity-60" />

            <svg
              viewBox={`0 0 ${CANVAS.width} ${CANVAS.height}`}
              className="absolute inset-0 h-full w-full"
              aria-hidden
            >
              <defs>
                {[
                  { id: "idle", fill: "rgba(255,255,255,0.18)" },
                  { id: "done", fill: "rgba(255,255,255,0.55)" },
                  { id: "running", fill: "var(--accent)" },
                ].map((marker) => (
                  <marker
                    key={marker.id}
                    id={`wf-arrow-${marker.id}`}
                    viewBox="0 0 10 10"
                    refX="8"
                    refY="5"
                    markerWidth="7"
                    markerHeight="7"
                    orient="auto-start-reverse"
                  >
                    <path d="M 0 0 L 10 5 L 0 10 z" fill={marker.fill} />
                  </marker>
                ))}
              </defs>

              {LANES.map((lane) => (
                <text
                  key={lane.label}
                  x={lane.x}
                  y={40}
                  textAnchor="middle"
                  className="fill-[var(--muted)] text-[13px] uppercase tracking-[0.25em]"
                >
                  {lane.label}
                </text>
              ))}

              {PLAN_INPUTS.map((source) => {
                const plan = NODE_MAP.plan;
                return (
                  <Satellite
                    key={source.label}
                    label={source.label}
                    x={source.x}
                    width={source.width}
                    status={statusOf(run, "plan")}
                    target={{ x: plan.x + (source.x - plan.x) * 0.3, y: plan.y - NODE_HEIGHT / 2 - 4 }}
                    seq={run.seq}
                    interval={interval}
                    roundTrip={false}
                  />
                );
              })}

              <text
                x={SUB_AGENT_CAPTION_X}
                y={PLAN_INPUT_Y - 30}
                textAnchor="middle"
                className="fill-[var(--muted)] text-[11px] uppercase tracking-[0.25em]"
              >
                Sub-agents, if needed
              </text>

              {SUB_AGENTS.map((agent) => {
                const execute = NODE_MAP.execute;
                return (
                  <Satellite
                    key={agent.id}
                    label={agent.label}
                    x={agent.x}
                    width={agent.width}
                    status={subAgentStatus(run, agent.id)}
                    target={{ x: execute.x + (agent.x - execute.x) * 0.3, y: execute.y - NODE_HEIGHT / 2 - 4 }}
                    seq={run.seq}
                    interval={interval}
                    roundTrip
                  />
                );
              })}

              {MEMORY_LINKS.map((link) => {
                const status = memoryLinkStatus(run, link);
                let stroke = "rgba(255,255,255,0.14)";
                let width = 1.5;
                if (status === "done") {
                  stroke = "rgba(255,255,255,0.45)";
                } else if (status === "running") {
                  stroke = "var(--accent)";
                  width = 2.5;
                }
                return (
                  <g key={link.id}>
                    <path
                      d={link.d}
                      fill="none"
                      stroke={stroke}
                      strokeWidth={width}
                      strokeDasharray="2 6"
                      strokeLinecap="round"
                      markerEnd={`url(#wf-arrow-${status})`}
                      className="transition-[stroke] duration-500"
                    />
                    {status === "running" &&
                      [0, 0.5].map((offset) => (
                        <circle
                          key={`${run.seq}-${link.id}-${offset}`}
                          r={3.5}
                          fill="var(--accent)"
                          style={{ filter: "drop-shadow(0 0 6px var(--accent))" }}
                        >
                          <animateMotion
                            dur={`${interval * 0.6}ms`}
                            begin={`${interval * 0.6 * offset}ms`}
                            repeatCount="indefinite"
                            path={link.d}
                          />
                        </circle>
                      ))}
                  </g>
                );
              })}

              <text
                x={820}
                y={528}
                textAnchor="middle"
                className="fill-[var(--muted)] text-[12px] uppercase tracking-[0.25em]"
              >
                Fault? Save the fix
              </text>

              {EDGES.map((edge) => {
                const status = edgeStatus(run, edge);
                const d = edgePath(edge);
                let stroke = "rgba(255,255,255,0.14)";
                let width = 1.5;
                if (status === "done") {
                  stroke = "rgba(255,255,255,0.45)";
                } else if (status === "running") {
                  stroke = "var(--accent)";
                  width = 2.5;
                }
                let dash: string | undefined;
                if (edge.loop || status === "idle") {
                  dash = "6 6";
                }
                return (
                  <g key={`${edge.from}-${edge.to}`}>
                    <path
                      d={d}
                      fill="none"
                      stroke={stroke}
                      strokeWidth={width}
                      strokeDasharray={dash}
                      markerEnd={`url(#wf-arrow-${status})`}
                      className="transition-[stroke] duration-500"
                    />
                    {status === "running" &&
                      [0, 0.33, 0.66].map((offset) => (
                        <circle
                          key={`${run.seq}-${offset}`}
                          r={4}
                          fill="var(--accent)"
                          style={{ filter: "drop-shadow(0 0 6px var(--accent))" }}
                        >
                          <animateMotion
                            dur={`${interval * 0.9}ms`}
                            begin={`${interval * 0.9 * offset}ms`}
                            repeatCount="indefinite"
                            path={d}
                          />
                        </circle>
                      ))}
                  </g>
                );
              })}

              <text
                x={845}
                y={385}
                textAnchor="middle"
                className="fill-[var(--muted)] text-[12px] uppercase tracking-[0.25em]"
              >
                Red? Loop back
              </text>
            </svg>

            {NODES.map((node) => {
              const status = statusOf(run, node.id);
              const Icon = ICONS[node.id];
              const selected = selectedId === node.id;
              return (
                <button
                  key={node.id}
                  type="button"
                  onClick={() => setSelectedId(selected ? null : node.id)}
                  aria-pressed={selected}
                  aria-label={`${node.label}, ${status}`}
                  className={`absolute flex flex-col justify-between rounded-2xl border p-2.5 text-left transition-all duration-500 hover:-translate-y-0.5 hover:border-white/50 ${nodeClass(
                    status,
                    selected,
                  )}`}
                  style={{
                    left: percent(node.x - NODE_WIDTH / 2, CANVAS.width),
                    top: percent(node.y - NODE_HEIGHT / 2, CANVAS.height),
                    width: percent(NODE_WIDTH, CANVAS.width),
                    height: percent(NODE_HEIGHT, CANVAS.height),
                  }}
                >
                  <span className="flex items-center gap-2">
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
                        status === "running"
                          ? "bg-[var(--accent)] text-black"
                          : "bg-white/5"
                      }`}
                    >
                      <Icon size={15} />
                    </span>
                    <span className="truncate text-sm font-semibold">
                      {node.label}
                    </span>
                  </span>
                  <span className="flex items-center justify-between text-[11px] uppercase tracking-widest text-[var(--muted)]">
                    {node.kicker}
                    {status === "running" && (
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent)]" />
                      </span>
                    )}
                    {status === "done" && <Check size={13} className="text-white" />}
                    {status === "failed" && <X size={13} className="text-red-400" />}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-5">
          <div className="rounded-3xl border border-[var(--border)] bg-[var(--bg-soft)] p-6 md:p-8 lg:col-span-3">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-[var(--accent)]">
                  <DetailIcon size={20} />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-widest text-[var(--muted)]">
                    {detail.kicker}
                  </p>
                  <h3 className="text-xl font-semibold text-white">
                    {detail.label}
                  </h3>
                </div>
              </div>
              <span className="rounded-full border border-[var(--border)] px-3 py-1 text-xs text-[var(--muted)]">
                {detail.owner}
              </span>
            </div>

            <p className="mt-5 text-base leading-relaxed text-[var(--muted)]">
              {detail.summary}
            </p>

            <div className="mt-6">
              <p className="text-xs uppercase tracking-widest text-[var(--muted)]">
                Tools
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {detail.tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full border border-[var(--border)] bg-white/5 px-3 py-1 text-sm text-white"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-[var(--border)] pt-4 text-sm">
              <span className="text-[var(--muted)]">Output</span>
              <span className="font-medium text-white">{detail.output}</span>
            </div>

            <p className="mt-4 text-xs uppercase tracking-widest">
              {detailStatus === "running" && (
                <span className="text-[var(--accent)]">Running now</span>
              )}
              {detailStatus === "done" && <span className="text-white">Done</span>}
              {detailStatus === "failed" && (
                <span className="text-red-400">Failed, looping back</span>
              )}
              {detailStatus === "idle" && (
                <span className="text-[var(--muted)]">Waiting</span>
              )}
            </p>
          </div>

          <div className="flex flex-col overflow-hidden rounded-3xl border border-[var(--border)] bg-black lg:col-span-2">
            <div className="flex items-center gap-2 border-b border-[var(--border)] px-5 py-3 text-sm text-[var(--muted)]">
              <Terminal size={15} />
              <code>agent.log</code>
            </div>
            <div
              ref={logRef}
              className="h-80 overflow-y-auto px-5 py-4 text-[13px] leading-relaxed"
              aria-live="polite"
            >
              {run.logs.length === 0 && (
                <code className="text-[var(--muted)]">
                  $ waiting for input. Press Run.
                </code>
              )}
              {run.logs.map((line) => (
                <div key={line.id}>
                  <code>
                    <span className="text-[var(--accent)]">{line.nodeId}</span>{" "}
                    <span className={line.fail ? "text-red-400" : "text-white/85"}>
                      {line.text}
                    </span>
                  </code>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
