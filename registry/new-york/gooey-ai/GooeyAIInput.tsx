"use client";

import { cn } from "@/lib/utils";
import { ArrowUp, PlusIcon, Square } from "lucide-react";
import { easeOut, motion } from "motion/react";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type GooeyAIContextType = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  onSubmit: () => void;
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  rootRef: React.RefObject<HTMLDivElement | null>;
  side: "left" | "right";
};

const GooeyAIContext = createContext<GooeyAIContextType | null>(null);

function useGooeyAI() {
  const context = useContext(GooeyAIContext);

  if (!context) {
    throw new Error("GooeyAI components must be inside <GooeyAI>");
  }

  return context;
}

type GooeyAIProps = {
  children: ReactNode;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  onSubmit: () => void;
  side: "left" | "right";
};

export function GooeyAI({
  children,
  value,
  setValue,
  isLoading,
  onSubmit,
  side,
}: GooeyAIProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isExpanded) return;

    function handleOutsideClick(e: MouseEvent) {
      if (rootRef.current?.contains(e.target as Node)) return;
      setIsExpanded(false);
    }

    document.addEventListener("pointerdown", handleOutsideClick);

    return () =>
      document.removeEventListener("pointerdown", handleOutsideClick);
  }, [isExpanded]);

  return (
    <GooeyAIContext.Provider
      value={{
        value,
        setValue,
        isLoading,
        onSubmit,
        isExpanded,
        setIsExpanded,
        rootRef,
        side,
      }}
    >
      <div
        style={{
          filter: "url(#gooey-AI)",
        }}
        className="flex flex-col justify-center space-y-2"
      >
        <GooeyFilter />

        <div
          ref={rootRef}
          className="relative w-14 h-14 flex items-center justify-center"
        >
          {children}
        </div>
      </div>
    </GooeyAIContext.Provider>
  );
}

export function GooeyAIButton({
  className,
  buttonPlaceholder,
}: {
  className?: string;
  buttonPlaceholder: any;
}) {
  const { isExpanded, setIsExpanded } = useGooeyAI();

  return (
    <button
      onClick={() => setIsExpanded(!isExpanded)}
      className={cn(
        "size-14 flex cursor-pointer items-center justify-center rounded-full bg-neutral-800 dark:bg-neutral-200 text-neutral-200 dark:text-neutral-800",
        className
      )}
    >
      {buttonPlaceholder}
    </button>
  );
}

export function GooeyAIDialog({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { isExpanded, side } = useGooeyAI();
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  const variants = {
    closed: {
      y: -20,
      width: 0,
      opacity: 0,
      scale: 0,
      transition: {
        y: { duration: 0.5 },
        opacity: { duration: 0.5 },
        ease: easeOut,
      },
    },
    open: {
      y: -62,
      width: isMobile ? 318 : 386,
      height: "auto",
      opacity: 1,
      scale: 1,
      transition: {
        y: { duration: 0.5 },
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
    <motion.div
      initial="closed"
      animate={isExpanded ? "open" : "closed"}
      variants={variants}
      style={{
        transformOrigin: side === "right" ? "right bottom" : "left bottom",
      }}
      className={cn(
        "absolute bottom-0 rounded-3xl bg-neutral-700 dark:bg-neutral-300 p-3 py-4 z-999",
        className,
        side == "right" ? "right-0" : "left-0",
      )}
    >
      {children}
    </motion.div>
  );
}

export function GooeyAITextArea({
  className,
  placeholder,
}: {
  className?: string;
  placeholder?: string;
}) {
  const { value, setValue, isLoading, onSubmit } = useGooeyAI();

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function handleSubmit() {
    if (!value.trim() || isLoading) return;

    onSubmit();
    setValue("");

    if (textareaRef.current) {
      textareaRef.current.style.height = "40px";
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const textarea = textareaRef.current!;

    textarea.style.height = "0";
    textarea.style.height = textarea.scrollHeight + "px";

    setValue(e.target.value);
  }
  const canSubmit = value.trim().length > 0 && !isLoading;
  return (
    <>
      <textarea
        ref={textareaRef}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
          }
        }}
        className={cn(
          "w-70 md:w-86 h-12 max-h-40 resize-none overflow-y-auto [scrollbar-width:none] px-2 py-3 focus:outline-none text-neutral-100 dark:text-neutral-800 placeholder:text-neutral-400/80 dark:placeholder:text-neutral-500 leading-6 mask-b-from-70% mask-b-to-100% ",
          className,
        )}
      />

      <div className="flex items-center justify-between">
        <AddAttachments />
        {isLoading ? (
          <button
            type="button"
            disabled
            className="size-9 flex items-center justify-center rounded-full bg-neutral-200 dark:bg-neutral-800 cursor-not-allowed"
          >
            <Square className="size-4 md:size-5 dark:fill-neutral-200 dark:text-neutral-200 fill-neutral-800 text-neutral-800" />
          </button>
        ) : (
          <button
            type="button"
            disabled={!canSubmit}
            onClick={handleSubmit}
            className={cn(
              "size-9 flex items-center justify-center rounded-full transition-colors",
              canSubmit
                ? "dark:bg-neutral-800 hover:bg-neutral-300 cursor-pointer bg-neutral-200 dark:text-neutral-100 text-neutral-800"
                : "dark:bg-neutral-400 dark:text-neutral-300 cursor-not-allowed bg-neutral-600 text-neutral-400",
            )}
          >
            <ArrowUp className="size-4 md:size-5" />
          </button>
        )}
      </div>
    </>
  );
}

function AddAttachments() {
  return (
    <button>
      <PlusIcon className="cursor-pointer size-9 rounded-full p-2 text-neutral-200 hover:bg-neutral-600 dark:text-neutral-700 dark:hover:bg-neutral-400/30" />
    </button>
  );
}
function GooeyFilter() {
  return (
    <svg aria-hidden="true">
      <defs>
        <filter id="gooey-AI">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 18 -15"
            result="goo"
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </defs>
    </svg>
  );
}
