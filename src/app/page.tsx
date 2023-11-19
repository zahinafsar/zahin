"use client";

import Image from "next/image";
import zahinImg from "../assets/zahin.png";
import { Button } from "@/components/button";
import { BubbleTopLeft } from "@/components/bubble";
import Link from "next/link";
import data from "../resource.json";
import { useState } from "react";
import { PageLoader } from "@/components/loader";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  setTimeout(() => {
    setLoaded(true);
  }, 1000);

  if (loaded === false) {
    return <PageLoader />;
  }

  return (
    <div className="flex flex-col-reverse md:flex-row gap-10 md:gap-0 items-center justify-between w-full">
      <div className="flex md:block flex-col justify-center items-center text-center md:text-left">
        <h1 className="text-4xl font-[800] text-primary">Hello There</h1>
        <p className="text-grey mt-2">
          This is <span className="text-primary font-bold">Zahin Afsar</span>.
          Software Developer <br /> from Bangladesh!
        </p>
        <div className="flex flex-col gap-2 mt-7 items-center md:items-start">
          <Button
            to={data.links.linkedin}
            className="md:hidden block bg-primary-light border border-primary !text-primary"
          >
            Who am I?
          </Button>
          <Button to={"mailto:" + data.contacts.email}>Message Me</Button>
        </div>
      </div>
      <div className="relative">
        <Link
          href={data.links.linkedin}
          target="_blank"
          className="cursor-pointer absolute -left-5 hidden md:block"
        >
          <BubbleTopLeft />
        </Link>
        <Image src={zahinImg} alt="Zahin Nizar" className="max-w-[400px]" />
      </div>
    </div>
  );
}
