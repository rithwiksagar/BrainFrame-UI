"use client";

import { cn } from "@/lib/utils";
import { ArrowUp, AudioWaveform } from "lucide-react";
import { AnimatePresence, easeInOut, motion, spring } from "motion/react";
import { useEffect, useRef, useState } from "react";

function MosaicAskAi() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [value, setvalue] = useState("");
  const containerRef = useRef<null | HTMLDivElement>(null);
  const textareaRef = useRef<null | HTMLTextAreaElement>(null);
  const [multiLine, setMultiLine] = useState(false);
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsExpanded(false);
      }
    }

    window.addEventListener("pointerdown", handleClickOutside);

    return () => {
      window.removeEventListener("pointerdown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isExpanded) {
      textareaRef.current?.focus();
    }
  }, [isExpanded]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = textareaRef.current!;
    textarea.style.height = "0";
    textarea.style.height = textarea.scrollHeight + "px";
    setvalue(e.target.value);
    if (textarea.scrollHeight > 40) {
      setMultiLine(true);
    }
    else{
      setMultiLine(false);
    }
  };
  return (
    <div>
      <motion.div
        ref={containerRef}
        layout
        transition={{
          layout: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
        }}
        style={{ width: isExpanded ? 500 : "auto" }}
        className={cn(" bg-neutral-800 text-white font-medium  pl-4 pr-3 py-2.5 shadow-[0_2px_4px_rgba(0,0,0,0.2),0_8px_20px_rgba(0,0,0,0.25)]", multiLine ? "rounded-2xl" : "rounded-full")}
      >
        <AnimatePresence mode="popLayout">
          {isExpanded ? (
            <div className="flex items-center relative">
              <textarea
                ref={textareaRef}
                value={value}
                onChange={handleChange}
                className=" w-110 h-8 max-h-64 py-1 px-3 resize-none outline-none text-neutral-100 overflow-y-scroll [scrollbar-width:none]"
              ></textarea>
              {value == "" && (
                <motion.span
                  layoutId="ask-ai"
                  transition={{ ease: easeInOut, duration: 0.15 }}
                  className="absolute text-neutral-500 left-3.5"
                >
                  Ask AI
                </motion.span>
              )}
              <button>
                <ArrowUp className="absolute bottom-0 size-8 bg-sky-500 p-1 rounded-full text-white" />
              </button>
            </div>
          ) : (
            <div
              onClick={() => {
                setIsExpanded(true);
              }}
              className="flex items-center justify-between text-lg gap-2 cursor-pointer"
            >
              <motion.span
                layoutId="ask-ai"
                transition={{ ease: easeInOut, duration: 0.15 }}
              >
                Ask AI
              </motion.span>
              <AudioWaveform className="size-7 bg-sky-500 p-1 rounded-full text-neutral-100" />
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export { MosaicAskAi };
