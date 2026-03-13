"use client";
import UseToggleTheme from "@/hooks/UseToggleTheme";
import { Github, PanelLeft } from "lucide-react";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import {
  Dispatch,
  RefObject,
  SetStateAction,
} from "react";


interface topBarProps {
  topbarRef: RefObject<HTMLDivElement | null>;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
export const TopBar = ({ topbarRef, setOpen }: topBarProps) => {
  return (
    <ThemeProvider attribute="class">
      <div
        ref={topbarRef}
        className="flex w-full z-10 px-5 md:px-15 py-3 justify-between items-center border-b border-neutral-700/15 backdrop-blur-xs fixed left-0 top-0"
      >
        <div className="">
          <Link
            href={"/"}
            className="text-xl md:text-2xl font-semibold tracking-wide"
          >
            BrainFrame.
          </Link>
        </div>
        <div className="flex gap-6">
          <Link href="https://github.com/rithwiksagar/Zero2">
            <Github className="size-4.5" />
          </Link>
          <div className="flex justify-center items-center">
            <UseToggleTheme />
          </div>
          <PanelLeft
            onClick={() => {
              setOpen((open) => !open);
            }}
            className="size-4.5 block md:hidden cursor-pointer"
          />
        </div>
      </div>
    </ThemeProvider>
  );
};
