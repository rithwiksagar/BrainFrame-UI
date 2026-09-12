"use client";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import type { ReactNode } from "react";
import { createContext, useContext, useState } from "react";

type MosiacCitationsProps = {
  sources: SourceData[];
  children: ReactNode;
};

type SourceData = {
  title: string;
  description: string;
  url: string;
  favicon: string;
};

type MosaicCitationsContextValue = {
  sources: SourceData[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
};
const MosaicCitationsContext =
  createContext<MosaicCitationsContextValue | null>(null);

function useMosaicContext() {
  const context = useContext(MosaicCitationsContext);

  if (!context) {
    throw new Error("useMosaicContext must be used inside MosiacCitations");
  }
  return context;
}

function MosiacCitations({ sources, children }: MosiacCitationsProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <MosaicCitationsContext.Provider
      value={{ sources, activeIndex, setActiveIndex }}
    >
      {children}
    </MosaicCitationsContext.Provider>
  );
}

function Source() {
  const { sources, setActiveIndex } = useMosaicContext();

  return (
    <div className="flex items-center gap-2">
      {sources.map((source, index) => (
        <button
          key={source.title}
          type="button"
          onClick={() => setActiveIndex(index)}
        >
          <motion.div
            whileHover={{ y: -8 }}
            initial={{ x: -index * 20 }}
            style={{ zIndex: index }}
            className={cn(
              "size-8 rounded-full border-background border-3 cursor-pointer font-semibold bg-neutral-800 text-white",
            )}
          >
            {source.title.charAt(0)}
          </motion.div>
        </button>
      ))}
    </div>
  );
}

export { MosiacCitations, Source };
export type { SourceData };
