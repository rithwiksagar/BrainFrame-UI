"use client";
import { SidebarContext } from "@/libs/sidebarcontext";
import { AnimatePresence, easeOut, motion } from "motion/react";
import Link from "next/link";
import { useContext, useState } from "react";
interface sidebaritems {
  title: string;
  id: string;
  items: { title: string; href: string }[];
}
export const sidebarItems: sidebaritems[] = [
  {
    title: "Sections",
    id: "1",
    items: [
      { title: "Home", href: "/" },
      { title: "Introduction", href: "/docs/introduction" },
      { title: "Installation", href: "/docs/installation" },
    ],
  },
  {
    title: "AI primitives",
    id: "2",
    items: [
      { title: "Model Selector", href: "/docs/modelselector" },
      { title: "Message", href: "/docs/message" },
      { title: "Prompt Input", href: "/docs/prompt-input" },
      { title: "Prompt Suggestion", href: "/docs/prompt-suggestion" },
      { title: "Chain of Thought", href: "/docs/chain-of-thought" },
      { title: "Feedback Bar", href: "/docs/feedback-bar" },
    ],
  },
  {
    title: "Content",
    id: "3",
    items: [
      { title: "Markdown", href: "/docs/markdown" },
      { title: "Code Block", href: "/docs/code-block" },
      { title: "Image", href: "/docs/image" },
      { title: "File Upload", href: "/docs/file-upload" },
      { title: "Loader", href: "/docs/loader" },
    ],
  },
  {
    title: "Content",
    id: "4",
    items: [
      { title: "Markdown", href: "/docs/markdown" },
      { title: "Code Block", href: "/docs/code-block" },
      { title: "Image", href: "/docs/image" },
      { title: "File Upload", href: "/docs/file-upload" },
      { title: "Loader", href: "/docs/loader" },
    ],
  },
  {
    title: "Content",
    id: "5",
    items: [
      { title: "Markdown", href: "/docs/markdown" },
      { title: "Code Block", href: "/docs/code-block" },
      { title: "Image", href: "/docs/image" },
      { title: "File Upload", href: "/docs/file-upload" },
      { title: "Loader", href: "/docs/loader" },
    ],
  },
];
export default function Sidebar() {
  const { open, setOpen } = useContext(SidebarContext)!;
  return (
    <AnimatePresence>
      <motion.div
        // initial={{
        //   width: 0,
        // }}
        // animate={{
        //   width: 240,
        // }}
        // exit={{
        //   width: 0,
        // }}
        // transition={{
        //   duration: 0.3,
        //   ease: easeOut,
        // }}
        className={`fixed left-0 top-0 z-999 h-160 pt-4 pb-12 border-r
     border-neutral-700/20 rounded-r-xl mt-13 md:mt-20 md:ml-5
     backdrop-blur-3xl md:backdrop-blur-none
     md:mask-[linear-gradient(to_bottom,transparent,black_15%,black_80%,transparent)]
      dark:border-neutral-100/10 overflow-y-scroll [scrollbar-width:none]
      select-none ${open ? "w-60" : "w-0"} md:block md:transition-all tran duration-200 ease-out`}
      >
        {sidebarItems.map((elements) => (
          <div
            key={elements.id}
            className="p-3 text-[15px] font-medium text-neutral-500 dark:text-neutral-50/70 pl-8"
          >
            {elements.title}
            {elements.items.map((item) => (
              <Link
                href={item.href}
                key={item.title}
                className="text-neutral-900 flex flex-col font-medium py-1 pl-2 cursor-pointer text-[15px] dark:text-neutral-50/90 hover:bg-neutral-200/30 rounded-sm dark:hover:bg-neutral-800/60"
                onClick={() => {
                  setOpen(false);
                }}
              >
                {item.title}
              </Link>
            ))}
          </div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
