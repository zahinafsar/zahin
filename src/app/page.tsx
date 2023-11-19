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
    <div className="flex flex-col-reverse md:flex-row gap-5 md:gap-0 items-center justify-between w-full">
      <div className="flex md:block flex-col justify-center items-center text-center md:text-left max-w-[400px]">
        <h1 className="text-4xl font-[800] text-primary">It's Zahin Afsar</h1>
        <p className="text-grey mt-2 text-sm">
          Software Developer from Bangladesh. I am a self-taught developer who
          loves to spend time on
        </p>
        <div className="flex justify-center md:justify-start flex-wrap gap-[5px] mt-4">
          {data.interests.map((interest, index) => (
            <div
              key={index}
              className="bg-primary-light border border-primary px-1.5 py-0.5 rounded-md text-primary text-xs"
            >
              {interest}
            </div>
          ))}
        </div>
        <div className="flex gap-2 mt-7 items-center md:items-start">
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
        <Image
          src={zahinImg}
          alt="Zahin Nizar"
          className="max-w-[350px] md:max-w-[400px]"
        />
      </div>
    </div>
  );
}
