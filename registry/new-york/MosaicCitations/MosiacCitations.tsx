"use client";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  ArrowRight,
  BookOpenText,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { AnimatePresence, easeOut, motion, scale, spring } from "motion/react";
import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useRef, useState } from "react";

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
  const [activeIndex, setActiveIndex] = useState(-1);

  return (
    <MosaicCitationsContext.Provider
      value={{ sources, activeIndex, setActiveIndex }}
    >
      {children}
    </MosaicCitationsContext.Provider>
  );
}

function Source() {
  const { sources, setActiveIndex, activeIndex } = useMosaicContext();
  const activeSource = sources[activeIndex];

  const goToPrevious = () =>
    setActiveIndex((activeIndex - 1 + sources.length) % sources.length);
  const goToNext = () => setActiveIndex((activeIndex + 1) % sources.length);
  const Ref = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (Ref.current && !Ref.current.contains(event.target as Node)) {
        setActiveIndex(-1);
      }
    }

    window.addEventListener("pointerdown", handleOutsideClick);

    return () => {
      window.removeEventListener("pointerdown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="relative">
      <div className="flex items-center gap-2 font-medium text-neutral-600 pb-2 px-1 dark:text-neutral-400">
        <BookOpenText className="size-4 mt-0.5" /> Sources
      </div>
      <div ref={Ref} className="flex items-center">
        {sources.map((source, index) => (
          <button
            key={source.title}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={cn(index > 0 && "-ml-3")}
          >
            <motion.div
              initial={{
                x: 8,
                rotateZ: 20,
                opacity: 0,
                filter: "blur(1px)",
              }}
              animate={{
                x: 0,
                rotateZ: 0,
                opacity: 1,
                filter: "blur(0px)",
                transition: {
                  duration: 0.3,
                  delay: index * 0.25,
                  ease: easeOut,
                },
              }}
              style={{ zIndex: index }}
              className={cn(
                "size-9 rounded-full border-background border-3 cursor-pointer font-semibold bg-neutral-700 text-white shadow-sm flex items-center justify-center dark:bg-neutral-800 dark:text-neutral-300",
              )}
            >
              {source.title.charAt(0)}
            </motion.div>
          </button>
        ))}

        <AnimatePresence>
          {activeSource && (
            <motion.div
              layoutId="preview"
              transition={{ duration: 0.1 }}
              initial={{ opacity: 0, scale: 0.98, filter: "blur(2px)" }}
              animate={{
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
                transition: { duration: 0.1, ease: easeOut },
              }}
              exit={{
                opacity: 0,
                scale: 0.98,
                filter: "blur(2px)",
                transition: { duration: 0.1 },
              }}
              style={{ transformOrigin: "top left" }}
              className="absolute left-0 top-19 z-20 w-84 overflow-hidden rounded-xl bg-white text-left dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800"
            >
              <div className="p-2 flex items-center justify-between rounded-t-xl bg-neutral-100  dark:bg-neutral-800">
                <span className="px-2 text-[12px] font-medium tabular-nums text-neutral-500 dark:text-neutral-400">
                  {activeIndex + 1} / {sources.length}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={goToPrevious}
                    aria-label="Next source"
                    className="flex size-6 items-center justify-center rounded-lg text-neutral-500 hover:text-neutral-950 hover:bg-neutral-200 dark:text-neutral-400 dark:hover:text-neutral-100 dark:hover:bg-neutral-600 cursor-pointer"
                  >
                    <ArrowLeft className="size-4" />
                  </button>
                  <button
                    type="button"
                    onClick={goToNext}
                    aria-label="Previous source"
                    className="flex size-6 items-center justify-center rounded-lg text-neutral-500 hover:text-neutral-950 hover:bg-neutral-200 dark:text-neutral-400 dark:hover:text-neutral-100 dark:hover:bg-neutral-600 cursor-pointer"
                  >
                    <ArrowRight className="size-4" />
                  </button>
                </div>
              </div>

              <div className="cursor-pointer">
                <div className="px-2 pt-2 flex items-center">
                  <span className="flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full">
                    <img
                      src={activeSource.favicon}
                      alt=""
                      className="size-4 object-contain"
                    />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-[14px] font-medium text-neutral-800 dark:text-neutral-100">
                      {activeSource.title}
                    </span>
                  </span>
                </div>
                <p className="px-4 pt-1 pb-3 text-[14px] font-normal text-neutral-400 dark:text-neutral-500 ">
                  {activeSource.description}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export { MosiacCitations, Source };
export type { SourceData };
