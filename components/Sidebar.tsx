"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Dispatch, RefObject, SetStateAction, useState } from "react";
interface sidebaritems {
  title: string;
  id: string;
  items: { title: string; href: string }[];
}
export const sidebarItems: sidebaritems[] = [
  {
    title: "GETTING STARTED",
    id: "1",
    items: [
      { title: "Introduction", href: "/docs/introduction" },
      { title: "Quick Start", href: "/docs/quick-start" },
    ],
  },
  {
    title: "COMPONENTS",
    id: "2",
    items: [
      { title: "Gooey AI Input", href: "/docs/gooey-input" },
      { title: "Prompt Input", href: "/docs/prompt-input" },
      { title: "Model Selector", href: "/docs/modelselector" },
      { title: "Message Bubble", href: "/docs/message" },
      { title: "Prompt Suggestion", href: "/docs/prompt-suggestion" },
      { title: "Shimmering Text", href: "/docs/shimmering-text" },
      { title: "With Attachments", href: "/docs/attachments" },
      { title: "Streaming Output", href: "/docs/streaming-output" },
      { title: "Error Message", href: "/docs/error-message" },
      { title: "Expandable Input", href: "/docs/expandable-input" },
      { title: "File Upload", href: "/docs/file-upload" },
      { title: "Citations tooltip", href: "/docs/citation" },
    ],
  },
];

interface sidebarProps {
  sidebarRef: RefObject<HTMLDivElement | null>;
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
}
export default function Sidebar({ sidebarRef, setOpen, open }: sidebarProps){
  return (
    <div
      ref={sidebarRef}
      className={`fixed left-0 top-[57px] z-999 h-full md:h-full md:w-80 border-r border-neutral-200 pt-5 md:backdrop-blur-none
      dark:border-neutral-800 overflow-y-scroll [scrollbar-width:none] bg-background
      select-none ${!open ? "w-0" : "w-60 transition-[width] duration-200 ease-out"}`}
    >
      {sidebarItems.map((elements) => (
        <div
          key={elements.id}
          className="py-4 text-[13px] font-mono font-medium text-neutral-600 dark:text-neutral-400/80 tracking-wider ml-8"
        >
          {elements.title}
          {elements.items.map((item) => (
            <Link
              href={item.href}
              key={item.title}
              className={cn(`text-neutral-500 flex flex-col font-normal tracking-normal font-sans py-2 cursor-pointer text-[14px] 
              dark:text-neutral-400 dark:hover:text-white hover:text-black`)}
              onClick={() => {
                setOpen((open) => !open);
              }}
            >
              {item.title}
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
};
