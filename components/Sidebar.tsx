"use client";
import Link from "next/link";
import {
  Dispatch,
  RefObject,
  SetStateAction
} from "react";
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
      { title: "Quick Start", href: "/docs/quick-start" },
    ],
  },
  {
    title: "Components",
    id: "2",
    items: [
      { title: "Gooey AI Input", href: "/docs/gooey-input" },
      { title: "Prompt Input", href: "/docs/prompt-input" },
      { title: "Model Selector", href: "/docs/modelselector" },
      { title: "Message Bubble", href: "/docs/message" },
      { title: "Prompt Suggestion", href: "/docs/prompt-suggestion" },
      { title: "Shimmering Text", href: "/docs/shimmering-text" },
      { title: "With Attachments", href: "/docs/attachments" },
      { title: "Streaming Output", href: "/docs/streaming-output"},
      { title: "Error Message", href: "/docs/error-message" },
      { title: "Expandable Input", href: "/docs/expandable-input" },
      { title: "File Upload", href: "/docs/file-upload" },
      { title: "Citations tooltip", href: "/docs/citation" }
    ]
  } 
];

interface sidebarProps {
  sidebarRef: RefObject<HTMLDivElement | null>;
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
}
export const Sidebar = ({ sidebarRef, setOpen, open }: sidebarProps) => {
  return (
    <div
      ref={sidebarRef}
      className={`fixed left-0 top-0 z-999 h-full md:h-160 md:w-64 pt-4 pb-12 border-r
     border-neutral-700/20 rounded-r-xl mt-13 md:mt-24 md:ml-5
     backdrop-blur-3xl md:backdrop-blur-none
     md:mask-[linear-gradient(to_bottom,transparent,black_4%,black_80%,transparent)]
      dark:border-neutral-100/10 overflow-y-scroll [scrollbar-width:none]
      select-none ${!open ? "w-0" : "w-60 transition-[width] duration-200 ease-out"}`}
    >
      {sidebarItems.map((elements) => (
        <div
          key={elements.id}
          className="p-3 py-4 text-[16px] font-medium text-neutral-500 dark:text-neutral-400/80 pl-10"
        >
          {elements.title}
          {elements.items.map((item) => (
            <Link
              href={item.href}
              key={item.title}
              className="text-neutral-900 flex flex-col font-medium py-1.5 pl-2 cursor-pointer text-[15px] 
              dark:text-neutral-100 hover:bg-neutral-200/30 rounded-sm dark:hover:bg-neutral-800/60"
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
