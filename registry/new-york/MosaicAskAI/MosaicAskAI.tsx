"use client";

import { cn } from "@/lib/utils";
import { ArrowUp, AudioWaveform, Square } from "lucide-react";
import { AnimatePresence, easeInOut, motion, spring } from "motion/react";
import {
  Children,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type MosaicAskAIProps = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  className?: string;
  onSubmit: () => void;
};

type MosaicAskAIContextValue = Omit<MosaicAskAIProps, "children"> & {
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  multiLine: boolean;
  setMultiLine: React.Dispatch<React.SetStateAction<boolean>>;
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
};

const MosaicAskAIContext = createContext<MosaicAskAIContextValue | null>(null);

function useMosaicAskAI() {
  const context = useContext(MosaicAskAIContext);
  if (!context) {
    throw new Error(
      "MosaicAskAI compound components must be used inside MosaicAskAI",
    );
  }
  return context;
}

function MosaicAskAI({
  value,
  setValue,
  isLoading,
  setIsLoading,
  children,
  className,
  onSubmit,
}: MosaicAskAIProps) {
  const [isExpanded, setIsExpanded] = useState(false);
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
        setMultiLine(false);
        setValue("");
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

  return (
    <MosaicAskAIContext.Provider
      value={{
        value,
        setValue,
        isLoading,
        setIsLoading,
        isExpanded,
        setIsExpanded,
        multiLine,
        setMultiLine,
        textareaRef,
        onSubmit,
      }}
    >
      <div ref={containerRef} className={cn(className)}>
        <motion.div
          layout
          transition={{
            layout: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
          }}
          style={{ width: isExpanded ? 500 : "auto" }}
          className={cn(
            "bg-neutral-100 dark:bg-neutral-800 dark:text-white font-medium pl-4 pr-3 py-2.5 shadow-[0_2px_4px_rgba(0,0,0,0.06),0_8px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_4px_rgba(0,0,0,0.2),0_8px_20px_rgba(0,0,0,0.25)]",
            multiLine ? "rounded-2xl" : "rounded-full",
          )}
        >
          {isExpanded
            ? Children.toArray(children)[1]
            : Children.toArray(children)[0]}
        </motion.div>
      </div>
    </MosaicAskAIContext.Provider>
  );
}

function AskAIButton({ className }: { className?: string }) {
  const { setIsExpanded } = useMosaicAskAI();

  return (
    <button
      type="button"
      className={cn(
        "flex items-center justify-between text-lg gap-2 cursor-pointer",
        className,
      )}
      onClick={() => setIsExpanded(true)}
    >
      <motion.span
        layoutId="ask-ai"
        transition={{ ease: easeInOut, duration: 0.15 }}
      >
        Ask AI
      </motion.span>
      <AudioWaveform className="size-7 bg-sky-500 p-1 rounded-full text-neutral-100" />
    </button>
  );
}

function AskAiPromptBar({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { isExpanded } = useMosaicAskAI();
  return (
    <AnimatePresence mode="popLayout">
      {isExpanded && (
        <div className={cn("flex items-center relative", className)}>
          {children}
        </div>
      )}
    </AnimatePresence>
  );
}

function AskAITextarea({ className }: { className?: string }) {
  const { value, setValue, textareaRef, setMultiLine, onSubmit } =
    useMosaicAskAI();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "0";
    textarea.style.height = textarea.scrollHeight + "px";
    setValue(e.target.value);
    setMultiLine(textarea.scrollHeight > 32);
  };

  return (
    <>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            onSubmit();
          }
        }}
        className={cn(
          "w-110 h-8 max-h-64 py-1 px-3 resize-none outline-none dark:text-neutral-100 overflow-y-scroll [scrollbar-width:none] mask-[linear-gradient(to_bottom,transparent,black_4%,black_98%,transparent)]",
          className,
        )}
      />
      {value === "" && (
        <motion.span
          layoutId="ask-ai"
          transition={{ ease: easeInOut, duration: 0.15 }}
          className="absolute text-neutral-500 left-3.5"
        >
          Ask AI
        </motion.span>
      )}
    </>
  );
}

function AskAISubmit({ className }: { className?: string }) {
  const { isLoading, onSubmit, value } = useMosaicAskAI();

  const handleSubmit = () => {
    if (!value.trim() || isLoading) return;
    onSubmit();
  };

  return isLoading ? (
    <div
      className={cn(
        "bg-sky-500 size-7 md:size-8 rounded-full flex justify-center items-center",
        className,
      )}
    >
      <Square className="size-4 md:size-4 fill-white cursor-pointer text-white" />
    </div>
  ) : (
    <button type="button" onClick={handleSubmit}>
      <ArrowUp className="size-7 md:size-8 rounded-full bg-sky-500 p-2 cursor-pointer text-white" />
    </button>
  );
}

export { AskAIButton, AskAITextarea, AskAiPromptBar, AskAISubmit, MosaicAskAI };
