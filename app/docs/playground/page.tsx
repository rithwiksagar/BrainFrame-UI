"use client";

import { cn } from "@/lib/utils";
import {
  ArrowBigUp,
  ArrowUp,
  ArrowUp01,
  PlusIcon,
  SendHorizontal,
  Square,
} from "lucide-react";
import { AnimatePresence, easeOut, motion, spring } from "motion/react";
import { useRef, useState } from "react";

export default function PlayGround() {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const variants = {
    closed: {
      y: 0,
      width: 50,
      opacity: 0,
      transition: {
        y: {
          duration: 0.5,
        },
        opacity: {
          duration: 0.5,
        },
        ease: easeOut,
      },
    },

    open: {
      y: -62,
      width: 386,
      height: "auto",
      opacity: 1,
      transition: {
        y: {
          duration: 0.3,
        },
        width: {
          duration: 0.31,
          delay: 0.05,
        },
        height: {
          duration: 0.3,
          delay: 0.03,
        },
        opacity: {
          duration: 0.12,
        },
      },
    },
  };
  return (
    <div
      style={{
        filter: "url(#gooey-AI)",
      }}
      className=" flex flex-col justify-center space-y-2"
    >
      <GooeyFilter />

      <div className="relative w-14 h-14 flex items-center justify-center">
        {/* Button */}
        <button
          className="size-14 flex justify-center items-center z-999 cursor-pointer select-none bg-neutral-800 text-white rounded-full"
          onClick={() => {
            setIsExpanded(!isExpanded);
          }}
        >
          AI
        </button>

        {/* AI Dialog */}
        <motion.div
          initial="closed"
          animate={isExpanded ? "open" : "closed"}
          variants={variants}
          style={{
            transformOrigin: "left bottom",
          }}
          className={cn(
            "absolute -left-1 bottom-0 rounded-3xl p-3 py-4 bg-neutral-800 text-white",
          )}
        >
          <div>
            <InputTextArea />
            <div 
            className=" flex items-center justify-between ">
              <button>
                <PlusIcon className="size-9 rounded-full p-2 text-neutral-100 hover:bg-neutral-700 transition-colors cursor-pointer" />
              </button>

              <button>
                <ArrowUp className="size-9 rounded-full bg-neutral-700 p-2 text-neutral-100 hover:bg-neutral-600 transition-colors cursor-pointer" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

const GooeyFilter = () => {
  return (
    <svg aria-hidden="true">
      <defs>
        <filter id="gooey-AI">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -15"
            result="goo"
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </defs>
    </svg>
  );
};

const InputTextArea = () => {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>();

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  function handleChange(e: { target: { value: string } }) {
    const textarea = textareaRef.current!;
    textarea.style.height = "0";
    textarea.style.height = textarea.scrollHeight + "px";
    setValue(e.target.value);
  }

  function onSubmit() {
    if (!value.trim() || isLoading) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }

  return (
    <textarea
      value={value}
      ref={textareaRef}
      onChange={handleChange}
      onKeyDown={(e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          if (!value.trim() || isLoading) return;
          const textarea = textareaRef.current!;
          setValue("");
          textarea.style.height = "40px";
          onSubmit();
        }
      }}
      placeholder={"placeholder"}
      className={cn(`w-70 md:w-86 h-14 max-h-40 p-2 py-3 placeholder:text-neutral-400
         dark:placeholder:text-neutral-700 focus:outline-0
               overflow-y-auto resize-none [scrollbar-width:none] leading-6 mask-b-from-80% mask-b-to-100%`)}
    ></textarea>
  );
};
