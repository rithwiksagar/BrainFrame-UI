"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { CopyButton } from "./copybutton";

interface CommandBlockItem {
  title: string;
  cmd: string;
}
const CommandBlockItems: CommandBlockItem[] = [
  {
    title: "pnpm",
    cmd: "pnpm shadcn@latest brainframe/prompt-input",
  },
  {
    title: "npm",
    cmd: "npm shadcn@latest brainframe/prompt-input",
  },
  {
    title: "yarn",
    cmd: "yarn shadcn@latest brainframe/prompt-input",
  },
  {
    title: "bun",
    cmd: "bun shadcn@latest brainframe/prompt-input",
  },
];
export default function CommandBlock() {
  const [currentCmd, setCurrentCmd] = useState(
    "pnpm shadcn@latest brainframe/prompt-input",
  );
  return (
    <div
      className="mt-10 h-26 w-80 md:w-132 pb-1 md:pb-2 bg-neutral-200/40 border border-neutral-200
      dark:border-neutral-800 dark:bg-neutral-800/50 rounded-xl"
    ><div className="flex justify-between pt-2 px-4 ">
      <div className="flex">
        {CommandBlockItems.map((item) => (
          <button
            key={item.title}
            onClick={() => setCurrentCmd(item.cmd)}
            className="relative px-2 cursor-pointer "
          >
            {item.title}

            {currentCmd === item.cmd && (
              <motion.div
                layoutId="title"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="absolute left-0 bottom-0 w-full h-0.5 bg-black dark:bg-white"
              />
            )}
          </button>
        ))}
      </div>
    <CopyButton content={currentCmd}/>
      </div>
      <div className="flex-1 p-4 text-neutral-600 dark:text-neutral-400 max-w-screen whitespace-nowrap overflow-x-scroll [scrollbar-width:thin] md:[scrollbar-width:none]">
        <span className="select-none pr-2">$</span>{currentCmd}
      </div>
    </div>
  );
}
