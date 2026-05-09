"use client";

import { Component, ReactNode, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useProgress } from "@react-three/drei";

const Scene = dynamic(() => import("./Scene"), {
  ssr: false,
  loading: () => <Loader />,
});

function Loader() {
  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center">
      <Image
        src="/loader.png"
        alt="Loading"
        width={1000}
        height={1000}
        className="blur-sm"
        priority
      />
      <div className="absolute h-14 w-14 animate-spin rounded-full border-4 border-white/10 border-t-[var(--accent)]" />
    </div>
  );
}

function Fallback() {
  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center">
      <Image src="/placeholder.png" alt="" width={1500} height={1500} priority />
      <p className="mt-2 text-xs text-white/60 -translate-x-8">
        Unable to load 3D model. Showing fallback. Reload browser to retry.
      </p>
    </div>
  );
}

class SceneErrorBoundary extends Component<
  { onError: () => void; children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: Error) {
    console.error("Scene load failed:", error);
    this.props.onError();
  }
  render() {
    return this.state.hasError ? null : this.props.children;
  }
}

export default function SceneClient() {
  const { active, progress } = useProgress();
  const [errored, setErrored] = useState(false);
  const loading = !errored && (active || progress < 100);

  return (
    <div className="relative h-full w-full">
      <SceneErrorBoundary onError={() => setErrored(true)}>
        <Scene />
      </SceneErrorBoundary>
      {errored && <Fallback />}
      {loading && <Loader />}
    </div>
  );
}
