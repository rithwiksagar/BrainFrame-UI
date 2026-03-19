"use client";

import DisplayFrame from "@/components/browserdisplay";
import { ArrowUpRight } from "lucide-react";
import { easeOut, motion } from "motion/react";
import Link from "next/link";
import { ReactNode } from "react";
import { FaReact } from "react-icons/fa";
import { RiNextjsFill, RiTailwindCssFill } from "react-icons/ri";
import { SiFramer } from "react-icons/si";

interface stackIcon {
  title: string;
  icon: ReactNode;
}
const stackIcons: stackIcon[] = [
  {
    title: "Tailwind",
    icon: <RiTailwindCssFill className="size-4 lg:size-8" />,
  },
  {
    title: "Next.js",
    icon: <RiNextjsFill className="size-4 lg:size-8" />,
  },
  {
    title: "React",
    icon: <FaReact className="size-4 lg:size-8" />,
  },
  {
    title: "Motion",
    icon: <SiFramer className="size-3.5 lg:size-7" />,
  },
];
export default function Home() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 10,
        filter: "blur(10px)",
      }}
      animate={{
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
      }}
      transition={{
        duration: 0.5,
        ease: easeOut,
      }}
      className="mt-54 lg:mx-6 flex-1"
    >
      <h1 className="text-3xl lg:text-4xl">
        Build AI Interfaces faster with{" "}
        <span className="font-medium  tracking-wide">BrainFrame</span>
      </h1>
      <h4 className="text-lg md:text-xl lg:text-2xl mt-2 text-neutral-500">
        Composable UI components built for AI applications.
        <span className="hidden md:block">
          Simple to integrate, easy to customize, and ready for production.
        </span>
      </h4>
      <div className="flex gap-4 mt-6">
        <Link
          href={"/docs/introduction"}
          className=" bg-neutral-900 dark:bg-white/95 text-white/90 hover:bg-neutral-900/95 dark:hover:bg-white/90
         dark:text-neutral-900 border border-neutral-700/20 px-3 lg:px-4 py-2 rounded-4xl text-[15px] lg:text-[18px] cursor-pointer
         flex items-center"
        >
          Get Started
          <ArrowUpRight className="size-5 ml-2"></ArrowUpRight>
        </Link>
      </div>
      <div
        className="h-130 lg:h-150 w-full md:max-w-screen border
       border-neutral-300 dark:border-neutral-800 mt-36 
       rounded-xl bg-neutral-200/50 dark:bg-neutral-900/40
       flex justify-center items-center"
      >
        <DisplayFrame />
      </div>
      <div className="mt-16">
        <h6 className="flex justify-center font-medium text-sm text-neutral-500">
          Built with
        </h6>
        <div className="flex gap-4 lg:gap-16 justify-center mt-3">
          {stackIcons.map((stack) => (
            <div
              key={stack.title}
              className="flex gap-1 lg:gap-2 justify-center items-center "
            >
              {stack.icon}
              <span className="text-md lg:text-3xl font-medium tracking-wide">
                {stack.title}
              </span>
            </div>
          ))}
        </div>
        <div className=" max-w-screen border-t border-neutral-300 dark:border-neutral-700/30 mt-20 pt-20 pb-8 ">
          <h2 className="text-xl md:text-3xl">BrainFrame UI</h2>
          <div className="text-sm md:text-md text-neutral-500">
            © 2026 Brainframe UI. All rights reserved.
          </div>
          <div className="text-sm md:text-md text-neutral-500">
            Source code is available on
            <Link
              href="https://github.com/rithwiksagar/brainframe-ui"
              className="text-black/90 dark:text-white/90 underline px-1"
            >
              github
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
