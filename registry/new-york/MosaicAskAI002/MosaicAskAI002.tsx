"use client";

import { cn } from "@/lib/utils";
import { ArrowUp, AudioWaveform, PlusIcon, Square } from "lucide-react";
import { AnimatePresence, motion, Transition } from "motion/react";
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

const transition: Transition<any> = { duration: 0.3, ease: [0.22, 1, 0.36, 1] };

function MosaicAskAI002({
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
            layout: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
          }}
          style={{ width: isExpanded ? 400 : "auto" }}
          className={cn(
            "bg-neutral-100 dark:bg-neutral-800 dark:text-white font-medium shadow-[0_2px_4px_rgba(0,0,0,0.06),0_8px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_4px_rgba(0,0,0,0.2),0_8px_20px_rgba(0,0,0,0.25)]",
            multiLine ? "rounded-2xl" : "rounded-3xl",
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

function AskAIButton002({ className }: { className?: string }) {
  const { setIsExpanded } = useMosaicAskAI();

  return (
    <button
      type="button"
      className={cn(
        "flex items-center justify-between text-lg gap-2 cursor-pointer pl-4 pr-3 py-2.5",
        className,
      )}
      onClick={() => setIsExpanded(true)}
    >
      <motion.span layoutId="ask-ai" transition={transition}>
        Ask AI
      </motion.span>
      <motion.span layoutId="ask-ai-button" transition={transition}>
        <AudioWaveform className="size-7 bg-pink-400 p-1 rounded-full text-neutral-100" />
      </motion.span>
    </button>
  );
}

function AskAiPromptBar002({
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
        <div className={cn(" space-y-4 p-4", className)}>{children}</div>
      )}
    </AnimatePresence>
  );
}

function AskAITextarea002({ className }: { className?: string }) {
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
    <div className="relative">
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
          "w-full h-8 max-h-64 py-1 px-2 resize-none outline-none dark:text-neutral-100 overflow-y-scroll [scrollbar-width:none] mask-[linear-gradient(to_bottom,transparent,black_4%,black_98%,transparent)]",
          className,
        )}
      />
      {value === "" && (
        <motion.span
          layoutId="ask-ai"
          transition={transition}
          className="absolute text-neutral-500 left-2 top-1 select-none pointer-events-none"
        >
          Ask AI
        </motion.span>
      )}
    </div>
  );
}

function AskAIActions002({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      {children}
    </div>
  );
}

function AskAIAttachments002({ className }: { className?: string }) {
  return (
    <button
      type="button"
      aria-label="Add attachment"
      className={cn(
        "rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700 p-1 text-neutral-600 cursor-pointer dark:text-neutral-300",
        className,
      )}
    >
      <PlusIcon className="size-5" />
    </button>
  );
}

function AskAISubmit002({ className }: { className?: string }) {
  const { isLoading, onSubmit, value } = useMosaicAskAI();

  const handleSubmit = () => {
    if (!value.trim() || isLoading) return;
    onSubmit();
  };

  return (
    <motion.button
      type="button"
      layoutId="ask-ai-button"
      transition={transition}
      onClick={handleSubmit}
      className={cn("bg-pink-400 rounded-full", className)}
    >
      {isLoading ? (
        <Square className="size-4 md:size-8 fill-white cursor-pointer text-white p-2" />
      ) : (
        <ArrowUp className="size-7 md:size-8 cursor-pointer p-1.5 text-white" />
      )}
    </motion.button>
  );
}



function AIIcon(){
  return 
}
export {
  AskAIButton002,
  AskAITextarea002,
  AskAiPromptBar002,
  AskAIActions002,
  AskAISubmit002,
  AskAIAttachments002,
  MosaicAskAI002,
};
