"use client";
import UseToggleTheme from "@/hooks/UseToggleTheme";
import { Github, GithubIcon, PanelLeft, Star } from "lucide-react";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import { Dispatch, RefObject, SetStateAction } from "react";

interface topBarProps {
  topbarRef: RefObject<HTMLDivElement | null>;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
export const TopBar = ({ topbarRef, setOpen }: topBarProps) => {
  return (
    <div
      ref={topbarRef}
      className="fixed left-0 top-0 flex w-full z-50 px-5 md:px-8 py-3 justify-between items-center border-b border-neutral-200 dark:border-neutral-800 backdrop-blur-xs"
    >
      <div className="">
        <Link
          href={"/"}
          className="text-md md:text-lg  font-mono tracking-wide"
        >
          BrainFrame.
        </Link>
      </div>
      <div className="flex gap-14 pr-6">
        <Link
          className="border rounded-sm flex items-center gap-2 px-2 py-1 border-neutral-300 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 font-semibold text-[13px]"
          href="https://github.com/rithwiksagar/Zero2"
        >
          <Github className="size-4" />
          <span className="border-l border-neutral-300 pl-2 dark:border-neutral-800">
            GitHub
          </span>
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
  );
};
