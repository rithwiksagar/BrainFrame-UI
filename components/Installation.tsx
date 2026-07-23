"use client";

import { spring } from "motion";
import { motion } from "motion/react";
import { CopyButton } from "./copybutton";
import { useId, useState } from "react";
import CodeBlock from "./codeblock";

type InstallationProps = {
  CLILink: string;
  path: string,
  code: string;
};

interface CommandBlockItem {
  title: string;
  cmd: string;
}

export default function Installation({ CLILink, path, code }: InstallationProps) {
  const [isDefault, setIsDefault] = useState(true);
  return (
    <>
      <h6 className="mt-10 mb-2 text-[20px] ml-1 font-semibold">Installation</h6>
      <div className="flex gap-4 text-md text-neutral-700 dark:text-neutral-400">
        <div
          onClick={() => {
            setIsDefault(true);
          }}
          className={`cursor-pointer px-1 relative`}
        >
          CLI{" "}
          {isDefault && (
            <motion.div
              layoutId="underline"
              className="absolute left-0 right-0 -bottom-1 h-[2px] bg-neutral-600 dark:bg-neutral-300"
            ></motion.div>
          )}
        </div>
        <div
          onClick={() => {
            setIsDefault(false);
          }}
          className={`cursor-pointer px-1 relative`}
        >
          Manual{" "}
          {!isDefault && (
            <motion.div
              layoutId="underline"
              className="absolute left-0 right-0 -bottom-1 h-[2px] bg-black dark:bg-white"
            ></motion.div>
          )}
        </div>
      </div>
      <div className="h-fit w-80 md:w-136 mt-10">
        {isDefault ? <CommandBlock CLILink={CLILink} /> : <ManualSection path={path} code={code}/>}
      </div>
    </>
  );
}

function CommandBlock({ CLILink }: { CLILink: String }) {
  const cmdId = useId();
  const CommandBlockItems: CommandBlockItem[] = [
    {
      title: "pnpm",
      cmd: `pnpm dlx shadcn@latest add ${CLILink}`,
    },
    {
      title: "npm",
      cmd: `npx shadcn@latest add ${CLILink}`,
    },
    {
      title: "yarn",
      cmd: `yarn dlx shadcn@latest add ${CLILink}`,
    },
    {
      title: "bun",
      cmd: `bunx --bun shadcn@latest add ${CLILink}`,
    },
  ];
  const [currentCmd, setCurrentCmd] = useState(
    `pnpm dlx shadcn@latest add ${CLILink}`,
  );
  return (
    <div
      className="h-26 w-80 md:w-156 pb-1 md:pb-2 bg-neutral-200/40 border border-neutral-200
      dark:border-neutral-800 dark:bg-neutral-800/50 rounded-xl"
    >
      <div className="flex justify-between pt-2 px-4 ">
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
                  layoutId={`${cmdId}`}
                  transition={{
                    type: spring,
                    stiffness: 500,
                    damping: 30,
                  }}
                  className="absolute left-0 -bottom-1 w-full h-0.5 bg-black dark:bg-white"
                ></motion.div>
              )}
            </button>
          ))}
        </div>
        <CopyButton content={currentCmd} />
      </div>
      <div
        className="flex-1 p-4 text-neutral-600 dark:text-neutral-400 max-w-screen whitespace-nowrap 
      overflow-x-scroll [scrollbar-width:thin] md:[scrollbar-width:none] []]"
      >
        <span className="select-none pr-2">$</span>
        {currentCmd}
      </div>
    </div>
  );
}

function ManualSection({path, code}: {path: string, code: string}) {
  return (
    <div>
      <div>
        <h6 className="text-md font-semibold mb-2">
          Step 1: Install Dependencies
        </h6>
        <div className="not-prose bg-neutral-200 dark:bg-neutral-800 text-black dark:text-white/80 p-3 rounded-md flex items-center justify-between md:w-156 space-x-2">
          <pre className="overflow-x-auto text-sm tracking-wide">
            <code>npm install motion clsx tailwind-merge lucide-react</code>
          </pre>
          <CopyButton content="npm install motion clsx tailwind-merge lucide-react" />
        </div>
      </div>

      <div className="mt-10">
        <h6 className="text-md font-semibold mb-2">Step 2: Add Utils File</h6>
        <div className="md:w-156 h-60 bg-neutral-200 rounded-2xl dark:bg-neutral-800">
          <div className="p-1 px-4 text-neutral-600 dark:text-neutral-400 tracking-wide">
            lib/utils.ts
          </div>
          <div className="mx-2 bg-white rounded-xl h-48 dark:bg-neutral-900 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
            <CodeBlock name="clsx" />
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h6 className="text-md font-semibold mb-2">Step 3: Copy the code</h6>
        <div className="md:w-156 h-100 bg-neutral-200 rounded-2xl dark:bg-neutral-800">
          <div className="p-1 px-4 text-neutral-600 dark:text-neutral-400 tracking-wide">
            {path}
          </div>
          <div className="mx-2 bg-white rounded-xl h-88 dark:bg-neutral-900 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
            <CodeBlock name={code} />
          </div>
        </div>
      </div>
    </div>
  );
}
