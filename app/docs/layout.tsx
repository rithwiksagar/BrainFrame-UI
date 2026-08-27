"use client";

import  Sidebar  from "@/components/Sidebar";
import { TopBar } from "@/components/Topbar";

import { ReactNode, useEffect, useRef, useState } from "react";
import TOC from "@/components/TOC";

export default function DocsLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState<boolean>(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const topbarRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        sidebarRef.current &&
        topbarRef.current &&
        !sidebarRef.current.contains(e.target as Node) &&
        !topbarRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, setOpen]);
  return (
    <>
      <nav>
        <TopBar topbarRef={topbarRef} setOpen={setOpen} />
      </nav>
      <aside>
        <Sidebar sidebarRef={sidebarRef} setOpen={setOpen} open={open} />
      </aside>
      <div className="mx-4 md:ml-74">
            <div
      className="prose 
    prose-neutral 
    dark:prose-invert 
    prose-h1:text-3xl
    prose-h3:text-[20px] prose-h3:font-normal prose-h3:tracking-wide
    prose-h2:font-normal prose-h2:text-[22px] prose-h2:tracking-wide
    prose-p:text-[16px]
    max-w-3xl py-4 md:py-10 mx-4 lg:mx-24 mt-16"
    >
      {children}
    </div>  
      </div>      
      <TOC />
    </>
  );
}

