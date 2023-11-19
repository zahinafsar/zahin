'use client';

import Image from "next/image";
import React from "react";
import zahinImg from "../assets/zahin.png";
import { motion } from "framer-motion";

type Props = {};

export function PageLoader({}: Props) {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <Image src={zahinImg} alt="Zahin Nizar" className="w-[100px]" />
      <div className="absolute bottom-20 w-[200px] h-[10px] rounded-full bg-primary-light">
        <motion.div
          initial={{
            width: 0,
          }}
          animate={{
            width: "100%",
          }}
          transition={{
            duration: 1,
          }}
          className="h-full rounded-full bg-primary"
        ></motion.div>
      </div>
    </div>
  );
}
