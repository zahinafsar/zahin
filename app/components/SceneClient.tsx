"use client";

import dynamic from "next/dynamic";

const Scene = dynamic(() => import("./Scene"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-[var(--accent)]" />
        <p className="text-xs uppercase tracking-widest text-[var(--muted)]">
          Loading 3D model
        </p>
      </div>
    </div>
  ),
});

export default function SceneClient() {
  return <Scene />;
}
