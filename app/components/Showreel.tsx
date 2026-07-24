"use client";

import { useRef, useState } from "react";
import { Lock, Pause, Play, RotateCcw, Volume2, VolumeX } from "lucide-react";

export default function Showreel() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);

  function toggleMuted() {
    const video = videoRef.current;
    if (!video) return;
    const next = !muted;
    video.muted = next;
    if (!next) {
      video.play().catch(() => {});
    }
    setMuted(next);
  }

  function restartWithSound() {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    video.muted = false;
    video.play().catch(() => {});
    setMuted(false);
    setPlaying(true);
  }

  function togglePlaying() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  }

  return (
    <section id="showreel" className="relative w-full px-6 pt-8 pb-16 md:px-10 md:pt-12 md:pb-24">
      <div className="mx-auto max-w-3xl">
        <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg-soft)]">
          <div className="flex items-center gap-2 border-b border-[var(--border)] px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />

            <div className="mx-auto flex items-center gap-2 rounded-md border border-[var(--border)] bg-black/20 px-3 py-1 text-xs text-[var(--muted)]">
              <Lock size={11} />
              zahinafsar.com
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={togglePlaying}
                aria-label={playing ? "Pause video" : "Play video"}
                className="flex h-7 w-7 items-center justify-center rounded-md text-[var(--muted)] transition hover:bg-white/10 hover:text-white"
              >
                {playing ? <Pause size={15} /> : <Play size={15} />}
              </button>
              <button
                type="button"
                onClick={restartWithSound}
                aria-label="Restart video with sound"
                className="flex h-7 w-7 items-center justify-center rounded-md text-[var(--muted)] transition hover:bg-white/10 hover:text-white"
              >
                <RotateCcw size={15} />
              </button>
              <button
                type="button"
                onClick={toggleMuted}
                aria-label={muted ? "Unmute video" : "Mute video"}
                className="flex h-7 w-7 items-center justify-center rounded-md text-[var(--muted)] transition hover:bg-white/10 hover:text-white"
              >
                {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
              </button>
            </div>
          </div>

          <video
            ref={videoRef}
            className="block h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          >
            <source src="/showreel.webm" type="video/webm" />
            <source src="/showreel.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  );
}
