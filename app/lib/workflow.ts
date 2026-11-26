export type WorkflowNodeId =
  | "input"
  | "plan"
  | "tests"
  | "execute"
  | "verify"
  | "review"
  | "ship"
  | "memory";

export type WorkflowOwner = "Me" | "Agent" | "Me + agent";

export type WorkflowNode = {
  id: WorkflowNodeId;
  label: string;
  kicker: string;
  owner: WorkflowOwner;
  x: number;
  y: number;
  summary: string;
  tools: string[];
  output: string;
};

export type WorkflowEdge = {
  from: WorkflowNodeId;
  to: WorkflowNodeId;
  loop?: boolean;
};

export type MemoryLink = {
  id: string;
  node: WorkflowNodeId;
  mode: "read" | "write";
  d: string;
};

export type WorkflowStep = {
  node: WorkflowNodeId;
  log: string[];
  fail?: boolean;
  parallel?: string[];
};

export const CANVAS = { width: 1490, height: 550 } as const;
export const NODE_WIDTH = 160;
export const NODE_HEIGHT = 84;

export const NODES: WorkflowNode[] = [
  {
    id: "input",
    label: "Input",
    kicker: "Brief",
    owner: "Me",
    x: 110,
    y: 240,
    summary:
      "One page. Problem, user, constraints, definition of done. If I can't write it down, no agent can build it.",
    tools: ["Discovery call", "Markdown"],
    output: "brief.md",
  },
  {
    id: "plan",
    label: "Plan",
    kicker: "Plan mode",
    owner: "Me + agent",
    x: 320,
    y: 240,
    summary:
      "The agent loads my best-practice and efficiency skills, pulls every referenced issue from my task managers over MCP, reads the codebase and drafts a plan. I cut it down, answer the open questions and lock the acceptance criteria.",
    tools: [
      "Claude Code plan mode",
      "Best-practice skills",
      "Efficiency skills",
      "Linear MCP",
      "Jira MCP",
      "GitHub MCP",
    ],
    output: "Tasks + acceptance criteria",
  },
  {
    id: "tests",
    label: "Write tests",
    kicker: "Tests first",
    owner: "Me + agent",
    x: 530,
    y: 240,
    summary:
      "Acceptance criteria become failing tests before any implementation exists. The tests are the contract the agent has to meet.",
    tools: ["Vitest", "Playwright", "Fixtures"],
    output: "Failing test suite",
  },
  {
    id: "execute",
    label: "Execute",
    kicker: "Agent",
    owner: "Agent",
    x: 740,
    y: 240,
    summary:
      "The agent implements the plan against the tests. When tasks are independent it splits them across parallel sub-agents and merges the results. Small fixes stay with one agent. On a retry it gets the exact compiler errors and failing tests, nothing else.",
    tools: ["Claude Code", "Codex", "Coodeen", "Sub-agents", "Git worktrees"],
    output: "Code changes",
  },
  {
    id: "verify",
    label: "Test & compile",
    kicker: "Gate",
    owner: "Agent",
    x: 950,
    y: 240,
    summary:
      "Type check, compile, run the full suite. Anything red goes straight back to Execute. The loop runs until everything is green.",
    tools: ["TypeScript strict", "next build", "Vitest", "Playwright"],
    output: "Green build",
  },
  {
    id: "review",
    label: "Review",
    kicker: "Me",
    owner: "Me",
    x: 1160,
    y: 240,
    summary:
      "Green is not done. I read the diff, click through the preview and check it against the brief. Nothing deploys until I sign off.",
    tools: ["GitHub PR", "Preview deploy"],
    output: "Approved diff",
  },
  {
    id: "ship",
    label: "Ship",
    kicker: "Final",
    owner: "Agent",
    x: 1370,
    y: 240,
    summary:
      "Approved code deploys. The pipeline ends here. No loop after deploy.",
    tools: ["Vercel", "EasyHost"],
    output: "Live URL",
  },
  {
    id: "memory",
    label: "memory.md",
    kicker: "Agent memory",
    owner: "Me + agent",
    x: 530,
    y: 450,
    summary:
      "Every fault the agent makes gets written down with how to deal with it. Plan and Execute read it before they start, so the same mistake never costs me twice.",
    tools: ["memory.md", "CLAUDE.md"],
    output: "Known faults + fixes",
  },
];

export const MEMORY_LINKS: MemoryLink[] = [
  {
    id: "read-plan",
    node: "plan",
    mode: "read",
    d: "M 450 450 C 320 450, 320 370, 320 288",
  },
  {
    id: "read-execute",
    node: "execute",
    mode: "read",
    d: "M 610 450 C 700 450, 700 400, 700 328",
  },
  {
    id: "write-verify",
    node: "verify",
    mode: "write",
    d: "M 990 282 C 1000 530, 640 540, 560 498",
  },
];

export type PlanInput = {
  label: string;
  x: number;
  width: number;
};

export const PLAN_INPUTS: PlanInput[] = [
  { label: "Task manager", x: 170, width: 124 },
  { label: "MCP", x: 300, width: 80 },
  { label: "Skills", x: 420, width: 90 },
];

export const SUB_AGENTS = [
  { id: "backend", label: "Backend" },
  { id: "frontend", label: "Frontend" },
  { id: "data", label: "Data" },
];

export const AGENT_CARD_HEIGHT = 48;
export const AGENT_CARD_GAP = 10;

export const PLAN_INPUT_Y = 130;
export const PLAN_INPUT_HEIGHT = 30;

export const EDGES: WorkflowEdge[] = [
  { from: "input", to: "plan" },
  { from: "plan", to: "tests" },
  { from: "tests", to: "execute" },
  { from: "execute", to: "verify" },
  { from: "verify", to: "execute", loop: true },
  { from: "verify", to: "review" },
  { from: "review", to: "ship" },
];

export const SEQUENCE: WorkflowStep[] = [
  { node: "input", log: ["brief received", "definition of done locked"] },
  {
    node: "plan",
    log: [
      "reading memory.md: 7 known faults",
      "loading skills: best-practices, efficiency",
      "fetching referenced issues via MCP",
      "5 issues pulled from Linear, Jira, GitHub",
      "reading codebase",
      "plan drafted: 4 tasks",
      "plan approved",
    ],
  },
  {
    node: "tests",
    log: ["tests written from acceptance criteria", "12 tests, 12 failing"],
  },
  {
    node: "execute",
    log: [
      "applying memory.md rules",
      "tasks are independent: splitting into 3 agents",
      "backend, frontend, data running in parallel",
      "agents merged: 6 files changed",
    ],
    parallel: ["backend", "frontend", "data"],
  },
  {
    node: "verify",
    log: [
      "tsc ok",
      "9/12 passed, 3 failing",
      "fault + fix appended to memory.md",
      "failures sent back to agent",
    ],
    fail: true,
  },
  {
    node: "execute",
    log: [
      "checking memory.md for this fault",
      "fix is small: one agent, no fan-out",
      "fixing 3 failing tests",
      "2 files changed",
    ],
    parallel: ["backend"],
  },
  { node: "verify", log: ["tsc ok", "12/12 passed", "build compiled"] },
  { node: "review", log: ["diff reviewed", "preview checked against brief", "approved"] },
  { node: "ship", log: ["deployed to production", "pipeline complete"] },
];
