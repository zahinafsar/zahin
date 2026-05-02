"use client";

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

export default function SceneClient() {
  const { active, progress } = useProgress();
  const loading = active || progress < 100;

  return (
    <div className="relative h-full w-full">
      <Scene />
      {loading && <Loader />}
    </div>
  );
}
