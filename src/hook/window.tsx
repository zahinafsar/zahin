'use client';

import { useEffect, useState } from "react";

export function useWindowSize() {
  const [screenWidth, setScreenWidth] = useState(0);
  const [screenHeight, setScreenHeight] = useState(0);

  useEffect(() => {
    const syncScreenSize = () => {
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);
    };
    window.addEventListener("resize", syncScreenSize);
    syncScreenSize();
    return () => window.removeEventListener("resize", syncScreenSize);
  }, []);

  return {
    screenWidth,
    screenHeight,
  };
}
