"use client";

import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  to?: string;
  onClick?: () => void;
};

export const Button = (props: Props) => {
  const handleClick = () => {
    if (props.to) {
      window.open(props.to, "_blank");
    } else {
      props.onClick && props.onClick();
    }
  };
  return (
    <button
      onClick={handleClick}
      className={
        "bg-primary font-bold py-2 px-4 rounded text-white text-[12px] " + props.className
      }
    >
      {props.children}
    </button>
  );
};
