"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
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
  TestTubeDiagonal,
  UserCheck,
  X,
  type LucideIcon,
} from "lucide-react";
import WorkflowHero from "./WorkflowHero";
import {
  AGENT_CARD_GAP,
  AGENT_CARD_HEIGHT,
  CANVAS,
  EDGES,
  MEMORY_LINKS,
  NODE_HEIGHT,
  NODE_WIDTH,
  NODES,
  PLAN_INPUT_HEIGHT,
  PLAN_INPUT_Y,
  PLAN_INPUTS,
  SUB_AGENTS,
  SEQUENCE,
  type MemoryLink,
  type WorkflowEdge,
  type WorkflowNode,
  type WorkflowNodeId,
} from "../../lib/workflow";

type Status = "idle" | "running" | "done" | "failed";

type Run = {
  step: number;
  seq: number;
};

const ICONS: Record<WorkflowNodeId, LucideIcon> = {
  input: Lightbulb,
  plan: ScrollText,
  tests: TestTubeDiagonal,
  execute: Bot,
  verify: FlaskConical,
  review: UserCheck,
  ship: Rocket,
  memory: NotebookPen,
};

const LANES = [
  { label: "Prepare", x: 320 },
  { label: "Build loop", x: 845 },
  { label: "Final", x: 1265 },
];

const LAST = SEQUENCE.length - 1;
const BASE_INTERVAL = 1900;

const NODE_MAP = Object.fromEntries(
  NODES.map((node) => [node.id, node]),
) as Record<WorkflowNodeId, WorkflowNode>;

const INITIAL_RUN: Run = { step: -1, seq: 0 };

const nextRun = (run: Run): Run => {
  if (run.step >= LAST) {
    return run;
  }
  return { step: run.step + 1, seq: run.seq + 1 };
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
  return (
    entry.node === link.node && (link.mode === "read" || entry.fail === true)
  );
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

const AGENT_STEP = AGENT_CARD_HEIGHT + AGENT_CARD_GAP;
const STACK_HALF =
  ((SUB_AGENTS.length - 1) * AGENT_STEP + AGENT_CARD_HEIGHT) / 2;

const agentY = (index: number) => {
  return (
    NODE_MAP.execute.y + (index - (SUB_AGENTS.length - 1) / 2) * AGENT_STEP
  );
};

type EdgePath = {
  key: string;
  d: string;
  agent?: string;
};

const edgePaths = (edge: WorkflowEdge): EdgePath[] => {
  const a = NODE_MAP[edge.from];
  const b = NODE_MAP[edge.to];
  const hw = NODE_WIDTH / 2;
  const hh = NODE_HEIGHT / 2;
  if (edge.loop) {
    let endY = b.y + hh + 6;
    if (edge.to === "execute") {
      endY = b.y + STACK_HALF + 6;
    }
    return [
      {
        key: "loop",
        d: `M ${a.x} ${a.y + hh} C ${a.x} ${a.y + 160}, ${b.x} ${b.y + 160}, ${b.x} ${endY}`,
      },
    ];
  }
  const sx = a.x + hw;
  const ex = b.x - hw - 6;
  const mx = (sx + ex) / 2;
  if (edge.to === "execute") {
    return SUB_AGENTS.map((agent, index) => {
      const y = agentY(index);
      return {
        key: agent.id,
        agent: agent.id,
        d: `M ${sx} ${a.y} C ${mx} ${a.y}, ${mx} ${y}, ${ex} ${y}`,
      };
    });
  }
  if (edge.from === "execute") {
    return SUB_AGENTS.map((agent, index) => {
      const y = agentY(index);
      return {
        key: agent.id,
        agent: agent.id,
        d: `M ${sx} ${y} C ${mx} ${y}, ${mx} ${b.y}, ${ex} ${b.y}`,
      };
    });
  }
  return [{ key: "line", d: `M ${sx} ${a.y} L ${ex} ${b.y}` }];
};

const nodeClass = (status: Status) => {
  let tone = "border-[var(--border)] bg-[var(--bg-soft)] text-[var(--muted)]";
  if (status === "running") {
    tone =
      "border-[var(--accent)] bg-[#140b07] text-white shadow-[0_0_40px_-6px_rgba(255,107,61,0.55)]";
  } else if (status === "done") {
    tone = "border-white/20 bg-[var(--bg-soft)] text-white";
  } else if (status === "failed") {
    tone = "border-red-500/60 bg-[var(--bg-soft)] text-white";
  }
  return tone;
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

const pathStatus = (
  run: Run,
  edge: WorkflowEdge,
  agent: string | undefined,
): Status => {
  const base = edgeStatus(run, edge);
  if (base !== "running" || !agent) {
    return base;
  }
  let executeStep = run.step - 1;
  if (edge.to === "execute") {
    executeStep = run.step;
  }
  if (subAgentAt(executeStep, agent)) {
    return "running";
  }
  return "done";
};

type SatelliteProps = {
  label: string;
  x: number;
  width: number;
  status: Status;
  target: { x: number; y: number };
  seq: number;
  interval: number;
};

function Satellite({
  label,
  x,
  width,
  status,
  target,
  seq,
  interval,
}: SatelliteProps) {
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
    { key: "in-0", offset: 0 },
    { key: "in-1", offset: 0.5 },
  ];
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

function Face({ size }: { size: number }) {
  return (
    <span
      className="relative block shrink-0 overflow-hidden rounded-full"
      style={{ width: size, height: size }}
    >
      <Image
        src="/hero.png"
        alt="Md. Zahin Afsar"
        width={1387}
        height={1403}
        sizes={`${size * 3}px`}
        className="absolute"
        style={{
          width: "231%",
          height: "auto",
          maxWidth: "none",
          left: "-70%",
          top: "-23%",
        }}
      />
    </span>
  );
}

export default function WorkflowGraph() {
  const [run, setRun] = useState<Run>(INITIAL_RUN);
  const [playing, setPlaying] = useState(false);
  const [fast, setFast] = useState(false);
  const [scale, setScale] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const finished = run.step === LAST;
  const active = playing && !finished;

  let interval = BASE_INTERVAL;
  if (fast) {
    interval = BASE_INTERVAL / 2;
  }

  useLayoutEffect(() => {
    const element = canvasRef.current;
    if (!element) {
      return;
    }
    const measure = () => {
      setScale(element.clientWidth / CANVAS.width);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) {
      return;
    }
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
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

  const togglePlay = () => {
    if (finished) {
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
    setRun(INITIAL_RUN);
  };

  let canvasVisibility: "visible" | "hidden" = "hidden";
  if (scale > 0) {
    canvasVisibility = "visible";
  }

  let playLabel = "Run";
  if (active) {
    playLabel = "Pause";
  } else if (finished) {
    playLabel = "Run again";
  }

  return (
    <>
      <WorkflowHero
        actions={
          <>
            <button
              type="button"
              onClick={togglePlay}
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-[var(--accent)]"
            >
              {active ? <Pause size={16} /> : <Play size={16} />}
              {playLabel}
            </button>
            <button
              type="button"
              onClick={step}
              disabled={finished}
              aria-label="Next step"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-5 py-3 text-sm text-white transition hover:border-white disabled:pointer-events-none disabled:opacity-40"
            >
              <StepForward size={16} />
              Step
            </button>
            <button
              type="button"
              onClick={() => setFast((value) => !value)}
              aria-pressed={fast}
              className={`rounded-full border px-5 py-3 text-sm transition ${
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
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] text-white transition hover:border-white"
            >
              <RotateCcw size={16} />
            </button>
          </>
        }
      />
      <section id="workflow" className="relative px-6 pb-24 md:px-10">
        <div ref={sectionRef} className="mx-auto w-full max-w-7xl">
          <div className="overflow-x-auto rounded-3xl border border-[var(--border)] bg-black/40 md:overflow-hidden">
            <div
              ref={canvasRef}
              className="relative min-w-[900px] overflow-hidden md:min-w-0"
              style={{ aspectRatio: `${CANVAS.width} / ${CANVAS.height}` }}
            >
              <div
                className="absolute left-0 top-0"
                style={{
                  width: CANVAS.width,
                  height: CANVAS.height,
                  transform: `scale(${scale})`,
                  transformOrigin: "0 0",
                  visibility: canvasVisibility,
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.09) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                    maskImage:
                      "radial-gradient(ellipse at center, black 40%, rgba(0,0,0,0.75) 100%)",
                  }}
                />

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
                        target={{
                          x: plan.x + (source.x - plan.x) * 0.3,
                          y: plan.y - NODE_HEIGHT / 2 - 4,
                        }}
                        seq={run.seq}
                        interval={interval}
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
                              style={{
                                filter: "drop-shadow(0 0 6px var(--accent))",
                              }}
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

                  {EDGES.flatMap((edge) =>
                    edgePaths(edge).map((path) => ({ edge, path })),
                  ).map(({ edge, path }) => {
                    const status = pathStatus(run, edge, path.agent);
                    const d = path.d;
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
                      <g key={`${edge.from}-${edge.to}-${path.key}`}>
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
                              key={`${run.seq}-${path.key}-${offset}`}
                              r={4}
                              fill="var(--accent)"
                              style={{
                                filter: "drop-shadow(0 0 6px var(--accent))",
                              }}
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
                    y={402}
                    textAnchor="middle"
                    className="fill-[var(--muted)] text-[12px] uppercase tracking-[0.25em]"
                  >
                    Red? Loop back
                  </text>
                </svg>

                {SUB_AGENTS.map((agent, index) => {
                  const status = subAgentStatus(run, agent.id);
                  const Icon = ICONS.execute;
                  return (
                    <div
                      key={agent.id}
                      aria-label={`${agent.label} agent, ${status}`}
                      className={`absolute flex items-center gap-2 rounded-xl border px-2.5 text-left transition-all duration-500 ${nodeClass(
                        status,
                      )}`}
                      style={{
                        left: percent(
                          NODE_MAP.execute.x - NODE_WIDTH / 2,
                          CANVAS.width,
                        ),
                        top: percent(
                          agentY(index) - AGENT_CARD_HEIGHT / 2,
                          CANVAS.height,
                        ),
                        width: percent(NODE_WIDTH, CANVAS.width),
                        height: percent(AGENT_CARD_HEIGHT, CANVAS.height),
                      }}
                    >
                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
                          status === "running"
                            ? "bg-[var(--accent)] text-black"
                            : "bg-white/5"
                        }`}
                      >
                        <Icon size={15} />
                      </span>
                      <span className="flex-1 truncate text-sm font-semibold">
                        {agent.label}
                      </span>
                      {status === "running" && (
                        <span className="relative flex h-2 w-2">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-75" />
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent)]" />
                        </span>
                      )}
                      {status === "done" && (
                        <Check size={13} className="text-white" />
                      )}
                    </div>
                  );
                })}

                {NODES.filter((node) => node.id !== "execute").map((node) => {
                  const status = statusOf(run, node.id);
                  const Icon = ICONS[node.id];
                  return (
                    <div
                      key={node.id}
                      aria-label={`${node.label}, ${status}`}
                      className={`absolute flex flex-col justify-between rounded-2xl border p-2.5 text-left transition-all duration-500 ${nodeClass(
                        status,
                      )}`}
                      style={{
                        left: percent(node.x - NODE_WIDTH / 2, CANVAS.width),
                        top: percent(node.y - NODE_HEIGHT / 2, CANVAS.height),
                        width: percent(NODE_WIDTH, CANVAS.width),
                        height: percent(NODE_HEIGHT, CANVAS.height),
                      }}
                    >
                      <span className="flex items-center gap-2">
                        {node.id === "review" ? (
                          <Face size={28} />
                        ) : (
                          <span
                            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
                              status === "running"
                                ? "bg-[var(--accent)] text-black"
                                : "bg-white/5"
                            }`}
                          >
                            <Icon size={15} />
                          </span>
                        )}
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
                        {status === "done" && (
                          <Check size={13} className="text-white" />
                        )}
                        {status === "failed" && (
                          <X size={13} className="text-red-400" />
                        )}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
