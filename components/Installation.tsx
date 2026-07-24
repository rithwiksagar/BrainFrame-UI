"use client";

import { motion } from "motion/react";
import { CopyButton } from "./copybutton";
import { useEffect, useRef, useState } from "react";
import CodeBlock from "./codeblock";

type InstallationProps = {
  CLILink: string;
  path: string;
  code: string;
};

interface CommandBlockItem {
  title: string;
  cmd: string;
}

type UnderlineRect = { left: number; width: number };

export default function Installation({ CLILink, path, code }: InstallationProps) {
  const [isDefault, setIsDefault] = useState(true);

  const cliRef = useRef<HTMLDivElement>(null);
  const manualRef = useRef<HTMLDivElement>(null);
  const [underline, setUnderline] = useState<UnderlineRect | null>(null);

  useEffect(() => {
    const el = isDefault ? cliRef.current : manualRef.current;
    if (el) {
      setUnderline({ left: el.offsetLeft, width: el.offsetWidth });
    }
  }, [isDefault]);

  return (
    <>
      <h6 className="mt-10 mb-2 text-[20px] ml-1 font-semibold">Installation</h6>
      <div className="flex gap-4 text-md text-neutral-700 dark:text-neutral-400 relative">
        <div
          ref={cliRef}
          onClick={() => setIsDefault(true)}
          className="cursor-pointer px-1"
        >
          CLI
        </div>
        <div
          ref={manualRef}
          onClick={() => setIsDefault(false)}
          className="cursor-pointer px-1"
        >
          Manual
        </div>

        {underline && (
          <motion.div
            className="absolute -bottom-1 h-[2px] bg-neutral-600 dark:bg-neutral-300"
            initial={false}
            animate={{ left: underline.left, width: underline.width }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        )}
      </div>
      <div className="h-fit w-80 md:w-136 mt-10">
        {isDefault ? <CommandBlock CLILink={CLILink} /> : <ManualSection path={path} code={code} />}
      </div>
    </>
  );
}

function CommandBlock({ CLILink }: { CLILink: string }) {
  const CommandBlockItems: CommandBlockItem[] = [
    { title: "pnpm", cmd: `pnpm dlx shadcn@latest add ${CLILink}` },
    { title: "npm", cmd: `npx shadcn@latest add ${CLILink}` },
    { title: "yarn", cmd: `yarn dlx shadcn@latest add ${CLILink}` },
    { title: "bun", cmd: `bunx --bun shadcn@latest add ${CLILink}` },
  ];

  const [currentCmd, setCurrentCmd] = useState(CommandBlockItems[0].cmd);
  const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [underline, setUnderline] = useState<UnderlineRect | null>(null);

  useEffect(() => {
    const activeTitle = CommandBlockItems.find((i) => i.cmd === currentCmd)?.title;
    const el = activeTitle ? itemRefs.current[activeTitle] : null;
    if (el) {
      setUnderline({ left: el.offsetLeft, width: el.offsetWidth });
    }
  }, [currentCmd]);

  return (
    <div
      className="h-26 w-80 md:w-156 pb-1 md:pb-2 bg-neutral-200/40 border border-neutral-200
      dark:border-neutral-800 dark:bg-neutral-800/50 rounded-xl"
    >
      <div className="flex justify-between pt-2 px-4 ">
        <div className="flex relative">
          {CommandBlockItems.map((item) => (
            <button
              key={item.title}
              ref={(el) => {
                itemRefs.current[item.title] = el;
              }}
              onClick={() => setCurrentCmd(item.cmd)}
              className="px-2 cursor-pointer"
            >
              {item.title}
            </button>
          ))}

          {underline && (
            <motion.div
              className="absolute -bottom-1 h-0.5 bg-black dark:bg-white"
              initial={false}
              animate={{ left: underline.left, width: underline.width }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
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

function ManualSection({ path, code }: { path: string; code: string }) {
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