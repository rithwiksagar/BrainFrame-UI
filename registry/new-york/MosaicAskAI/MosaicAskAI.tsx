"use client";

import { ArrowUp, AudioWaveform } from "lucide-react";
import { AnimatePresence, easeInOut, motion, spring } from "motion/react";
import { useEffect, useRef, useState } from "react";

function MosaicAskAi() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [value, setvalue] = useState("");
  const containerRef = useRef< null | HTMLDivElement>(null);

  useEffect(()=>{
    function handleClickOutside(e: MouseEvent){
        if(containerRef.current && !containerRef.current.contains(e.target as Node)){
            setIsExpanded(false);
        }
    }

    window.addEventListener("pointerdown", handleClickOutside);

    return ()=>{
        window.removeEventListener("pointerdown", handleClickOutside)
    }
  },[]);
  return (
    <div>
      <motion.div
        ref={containerRef}
        layout
        transition={{
          layout: { duration: 0.2,
    ease: [0.22, 1, 0.36, 1],}
        }}
        onClick={() => {
          if (setIsExpanded) {
            setIsExpanded(true);
          }
        }}
        style={{ width: isExpanded ? 400 : "auto" }}
        className=" bg-neutral-800  rounded-full text-white font-medium  pl-4 pr-3 py-2.5 shadow-[0_2px_4px_rgba(0,0,0,0.2),0_8px_20px_rgba(0,0,0,0.25)]"
      >
        <AnimatePresence mode="popLayout">
        {isExpanded ? (
          <div className="flex items-center relative">
            <textarea
              value={value}
              onChange={(e) => setvalue(e.target.value)}
              className=" w-86 h-8 py-1 px-3 resize-none outline-none overflow-hidden text-neutral-100"
            ></textarea>
            {value == "" && (
              <motion.span
                layoutId="ask-ai"
                transition={{ ease: easeInOut, duration: 0.15 }}
                className="absolute text-neutral-500 left-3.5"
              >
                Ask Ai
              </motion.span>
            )}
            <button>
              <ArrowUp className="size-8 bg-sky-500 p-1 rounded-full text-white" />
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between text-lg gap-2 cursor-pointer">
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
