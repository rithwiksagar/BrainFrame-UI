"use client";

import { Sidebar } from "@/components/sidebar";
import { TopBar } from "@/components/topbar";

import { ReactNode, useEffect, useRef, useState } from "react";

export function ClientLayout({ children }: { children: ReactNode }) {
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
      <div className="mx-4 md:ml-74">{children}</div>
    </>
  );
}
