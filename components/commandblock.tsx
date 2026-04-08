"use client";

import { useState, useId } from "react";
import { CopyButton } from "./copybutton";
import { motion, spring } from "motion/react";

interface CommandBlockItem {
  title: string;
  cmd: string;
}

export default function CommandBlock({CommandLink}: {CommandLink: string}) {
  const cmdId = useId();
  const CommandBlockItems: CommandBlockItem[] = [
    {
      title: "pnpm",
      cmd: `pnpm dlx shadcn@latest add ${CommandLink}`,
    },
    {
      title: "npm",
      cmd: `npx shadcn@latest add ${CommandLink}`,
    },
    {
      title: "yarn",
      cmd: `yarn dlx shadcn@latest add ${CommandLink}`,
    },
    {
      title: "bun",
      cmd: `bunx --bun shadcn@latest add ${CommandLink}`,
    },
  ];
  const [currentCmd, setCurrentCmd] = useState(`pnpm dlx shadcn@latest add ${CommandLink}`)
  return (
    <div
      className="h-26 w-80 md:w-132 pb-1 md:pb-2 bg-neutral-200/40 border border-neutral-200
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
              <motion.div layoutId={`${cmdId}`}
              transition={{
                type: spring,
                stiffness: 500,
                damping:30
              }}
              className="absolute left-0 bottom-0 w-full h-0.5 bg-black dark:bg-white"></motion.div>
            )}
          </button>
        ))}
      </div>
    <CopyButton content={currentCmd}/>
      </div>
      <div className="flex-1 p-4 text-neutral-600 dark:text-neutral-400 max-w-screen whitespace-nowrap 
      overflow-x-scroll [scrollbar-width:thin] md:[scrollbar-width:none]">
        <span className="select-none pr-2">$</span>{currentCmd}
      </div>
    </div>
  );
}
