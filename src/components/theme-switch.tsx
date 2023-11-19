"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import sun from "../assets/sun.svg";
import moon from "../assets/moon.svg";
import Image from "next/image";

type Props = {
  className?: string;
};

const isReady = typeof window !== "undefined";
const theme = isReady && localStorage.getItem("theme") === "dark";

export default function ThemeSwitch({ className }: Props) {
  const [screenWidth, setScreenWidth] = useState(0);
  const [screenHeight, setScreenHeight] = useState(0);
  const toggleRef = useRef<HTMLDivElement>(null);
  const [isDark, setIsDark] = useState(theme);

  useEffect(() => {
    if (isReady) {
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);
    }
  }, [isReady]);

  const diameter = Math.sqrt(
    screenWidth * screenWidth + screenHeight * screenHeight
  );
  const cornerW = (diameter - screenWidth) / 2;
  const cornerH = (diameter - screenHeight) / 2;

  const togglePosition = {
    x: toggleRef.current?.offsetLeft || 0,
    y: toggleRef.current?.offsetTop || 0,
  };

  const toggleCenter = {
    v: (toggleRef.current?.offsetHeight || 0) / 2,
    h: (toggleRef.current?.offsetWidth || 0) / 2,
  };

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => {
      if (prev) {
        document.documentElement.classList.remove("dark");
        localStorage.removeItem("theme");
      } else {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      }
      return !prev;
    });
  };

  const initialBgStyle = {
    scale: 0,
  };

  const initialSwitchStyle = {
    rotate: 0,
  };

  return (
    <AnimatePresence initial={false}>
      <motion.div
        onClick={toggleTheme}
        ref={toggleRef}
        className={
          "cursor-pointer rounded-full w-[40px] h-[40px] flex justify-center items-center bg-slate-500 inner-shadow z-50 " +
          className
        }
        initial={initialSwitchStyle}
        animate={
          isDark
            ? {
                rotate: 180,
              }
            : initialSwitchStyle
        }
        transition={{
          duration: 0.5,
        }}
      >
        {isDark ? (
          <Image src={sun} alt="sun" className="w-5 h-5" />
        ) : (
          <Image src={moon} alt="moon" className="w-5 h-5" />
        )}
      </motion.div>
      <motion.div
        style={{
          position: "fixed",
          top: -cornerH,
          left: -cornerW,
          zIndex: -9999,
          width: diameter,
          height: diameter,
          backgroundColor: "#1b0021",
          borderRadius: diameter / 2,
          transformOrigin: `
            ${toggleCenter.h + cornerW + togglePosition.x}px
            ${toggleCenter.v + cornerH + togglePosition.y}px
            `,
        }}
        initial={initialBgStyle}
        animate={
          isDark
            ? {
                scale: 1,
              }
            : initialBgStyle
        }
        transition={{
          duration: 0.3,
        }}
      />
    </AnimatePresence>
  );
}
