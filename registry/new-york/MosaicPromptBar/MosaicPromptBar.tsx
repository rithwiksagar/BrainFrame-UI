"use client";

import {
  ArrowUp,
  PlusIcon,
  Square,
  Trash2,
  type LucideIcon,
} from "lucide-react";
import {
  createContext,
  Children,
  cloneElement,
  Dispatch,
  ReactElement,
  SetStateAction,
  useContext,
  useState,
  type ReactNode,
  useRef,
  useEffect,
} from "react";
import { cn } from "@/lib/utils";
import { motion, spring } from "motion/react";

export type PromptPayload = {
  prompt: string;
  tool: string | null;
};

type MosaicPromptBarProps = {
  payload: PromptPayload;
  setPayload: Dispatch<SetStateAction<PromptPayload>>;
  isLoading: boolean;
  onSubmit: (payload: PromptPayload) => void;
  tools: Tool[];
  children?: ReactNode;
  className?: string;
};

type MosaicPromptBarContextType = {
  payload: MosaicPromptBarProps["payload"];
  setPayload: MosaicPromptBarProps["setPayload"];
  onSubmit: MosaicPromptBarProps["onSubmit"];
  isLoading: MosaicPromptBarProps["isLoading"];
  isToolMenuOpen: boolean;
  setIsToolMenuOpen: Dispatch<SetStateAction<boolean>>;
  selectedIndex: number;
  setSelectedIndex: Dispatch<SetStateAction<number>>;
  slashIndex: number;
  setSlashIndex: Dispatch<SetStateAction<number>>;
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  tools: Tool[];
  filteredTools: Tool[];
};

const MosaicPromptBarContext = createContext<MosaicPromptBarContextType | null>(
  null,
);

const useMosaicContext = () => {
  const context = useContext(MosaicPromptBarContext);
  if (!context) throw new Error("must be inside the component");
  return context;
};

// Provides shared prompt state and the outer prompt bar layout.
function MosaicPromptBar({
  payload,
  setPayload,
  isLoading,
  onSubmit,
  tools,
  children,
  className,
}: MosaicPromptBarProps) {
  const [isToolMenuOpen, setIsToolMenuOpen] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [slashIndex, setSlashIndex] = useState<number>(-1);
  const [query, setQuery] = useState("");
  const filteredTools = tools.filter((tool) =>
    tool.title
      .replace(/\s/g, "")
      .toLocaleLowerCase()
      .includes(query.toLowerCase()),
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  return (
    <MosaicPromptBarContext.Provider
      value={{
        payload,
        setPayload,
        isLoading,
        onSubmit,
        isToolMenuOpen,
        setIsToolMenuOpen,
        selectedIndex,
        setSelectedIndex,
        slashIndex,
        setSlashIndex,
        query,
        setQuery,
        tools,
        filteredTools,
      }}
    >
      <div
        className={cn(
          "p-2 rounded-3xl border border-white/30 bg-white/10 backdrop-blur-sm shadow-md",
          className,
        )}
      >
        {children}
      </div>
    </MosaicPromptBarContext.Provider>
  );
}

export type Tool = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
};

type ToolMenuProps = {
  children: ReactElement<ToolItemProps>;
  className?: string;
};

// Shows the keyboard-navigable tool choices opened from the prompt textarea.
function ToolMenu({ children, className }: ToolMenuProps) {
  const { isToolMenuOpen, filteredTools } = useMosaicContext();
  return (
    isToolMenuOpen &&
    filteredTools.length > 0 && (
      <motion.div className={cn("flex flex-col mb-2", className)}>
        {filteredTools.map((tool, index) =>
          cloneElement(children, { ...tool, index, key: tool.id }),
        )}
      </motion.div>
    )
  );
}

type ToolItemProps = Partial<Tool> & {
  index?: number;
  className?: string;
};

function ToolItem({
  id,
  title,
  description,
  icon,
  color,
  index = 0,
  className,
}: ToolItemProps) {
  const {
    selectedIndex,
    setPayload,
    slashIndex,
    setSlashIndex,
    setQuery,
    setIsToolMenuOpen,
  } = useMosaicContext();
  const Icon = icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.2,
        delay: index * 0.03,
      }}
      onClick={() => {
        setPayload((prev) => ({
          prompt: slashIndex === -1 ? prev.prompt : prev.prompt.slice(0, slashIndex),
          tool: id ?? null,
        }));
        setQuery("");
        setSlashIndex(-1);
        setIsToolMenuOpen(false);
      }}
      className={cn(
        "flex items-center gap-2 rounded-lg leading-none py-2 px-4 cursor-pointer hover:bg-neutral-100/60 select-none",
        index === selectedIndex && "bg-neutral-100/60",
        className,
      )}
    >
      {Icon && <Icon className={cn("size-4 shrink-0", color)} />}
      <div className="flex items-center gap-2">
        <p className={cn("text-sm font-medium tracking-wide")}>{title}</p>
        <p
          className={cn(
            "text-sm font-normal",
            index === selectedIndex ? "text-neutral-600" : "text-neutral-500",
          )}
        >
          {description}
        </p>
      </div>
    </motion.div>
  );
}

// Groups the textarea and action controls into one prompt surface.
function PromptInput({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { setIsToolMenuOpen } = useMosaicContext();
  useEffect(() => {
    function handleOutSideClick(e: MouseEvent) {
      if (
        promptInputRef.current &&
        !promptInputRef.current.contains(e.target as Node)
      ) {
        setIsToolMenuOpen(false);
      }
    }

    window.addEventListener("click", handleOutSideClick);

    return () => {
      window.removeEventListener("click", handleOutSideClick);
    };
  }, []);

  const promptInputRef = useRef<HTMLDivElement | null>(null);
  return (
    <div
      ref={promptInputRef}
      className={cn(
        "w-160 flex flex-col justify-between rounded-2xl border border-white/30 dark:border-neutral-700 bg-white/90 dark:bg-neutral-700 p-3 space-y-1 shadow",
        className,
      )}
    >
      {children}
    </div>
  );
}

// Captures prompt text and handles tool navigation and submission keys.

type PromptInputTextAreaProps = {
  placeholder: string;
  className?: string;
};

function PromptInputTextArea({
  placeholder,
  className,
}: PromptInputTextAreaProps) {
  const {
    payload,
    setPayload,
    onSubmit,
    isLoading,
    isToolMenuOpen,
    setIsToolMenuOpen,
    selectedIndex,
    setSelectedIndex,
    slashIndex,
    setSlashIndex,
    setQuery,
    tools,
    filteredTools,
  } = useMosaicContext();

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "/") {
      const cursorPosition = event.currentTarget.selectionStart;
      const charBeforeCursor = event.currentTarget.value[cursorPosition - 1];
      const isAtWordBoundary =
        cursorPosition === 0 || /\s/.test(charBeforeCursor ?? "");

      // Only (re)trigger on a "/" that starts a fresh word. This is what
      // stops "////" from repeatedly reopening the menu (exception #2),
      // and what lets a "/" typed after a space reopen it (last bullet).
      if (isAtWordBoundary) {
        setSlashIndex(cursorPosition);
        setQuery("");
        setIsToolMenuOpen(true);
      }

      return;
    }
    if (isToolMenuOpen && event.key === "ArrowDown") {
      event.preventDefault();
      setSelectedIndex((prev) =>
        prev < filteredTools.length - 1 ? prev + 1 : 0,
      );
      return;
    }
    if (isToolMenuOpen && event.key === "ArrowUp") {
      event.preventDefault();
      setSelectedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredTools.length - 1,
      );
      return;
    }
    if (isToolMenuOpen && event.key === "Enter") {
      event.preventDefault();
      const selectedTool = filteredTools[selectedIndex];
      if (!selectedTool) return;
      setPayload((prev) => ({
        prompt: slashIndex === -1 ? prev.prompt : prev.prompt.slice(0, slashIndex),
        tool: selectedTool.id,
      }));
      setQuery("");
      setSlashIndex(-1);
      setIsToolMenuOpen(false);
      return;
    }
    if (event.key === "Escape") {
      setIsToolMenuOpen(false);
      return;
    }
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (!payload.prompt.trim() || isLoading) return;
      const textarea = textareaRef.current!;
      onSubmit(payload);
      setPayload({ prompt: "", tool: null });
      textarea.style.height = "40px";
      return;
    }
  };

  useEffect(() => {
    function handleKeyChange(e: KeyboardEvent) {
      if (e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.key === "/") {
        const textarea = textareaRef.current;
        textarea?.focus();

        const cursorPosition = textarea?.selectionStart ?? 0;
        const charBeforeCursor = textarea?.value[cursorPosition - 1];
        const isAtWordBoundary =
          cursorPosition === 0 || /\s/.test(charBeforeCursor ?? "");

        if (isAtWordBoundary) {
          setSlashIndex(cursorPosition);
          setQuery("");
          setIsToolMenuOpen(true);
        }

        return;
      }

      if (e.key.length === 1) {
        textareaRef.current?.focus();
      }
    }

    window.addEventListener("keydown", handleKeyChange);

    return () => {
      window.removeEventListener("keydown", handleKeyChange);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = textareaRef.current!;

    textarea.style.height = "0";
    textarea.style.height = textarea.scrollHeight + "px";

    const newValue = e.target.value;
    const cursorPosition = e.target.selectionStart;
    setPayload((prev) => ({ ...prev, prompt: newValue }));

    // No active tool trigger
    if (slashIndex === -1) {
      return;
    }

    // Cursor is at/before the anchor point (the "/" itself, or wherever a
    // failed query's anchor was last moved to) — cancel the trigger.
    if (cursorPosition <= slashIndex) {
      setQuery("");
      setIsToolMenuOpen(false);
      setSlashIndex(-1);
      return;
    }

    // Everything between the anchor and the cursor is the current query.
    const currentQuery = newValue.slice(slashIndex + 1, cursorPosition);

    // A space ends the tool word entirely. Fully deactivate — a "/"
    // typed after this space is a fresh word boundary and can retrigger.
    if (/\s/.test(currentQuery)) {
      setQuery("");
      setIsToolMenuOpen(false);
      setSlashIndex(-1);
      return;
    }

    const hasMatch = tools.some((tool) =>
      tool.title
        .replace(/\s/g, "")
        .toLocaleLowerCase()
        .includes(currentQuery.toLowerCase()),
    );

    if (currentQuery.length > 0 && !hasMatch) {
      // Exception #1: nothing matches — erase the query but keep the "/"
      // trigger alive (menu stays open) so the user can keep typing without
      // pressing "/" again. Move the anchor to "now" so the stray
      // non-matching text is left behind as plain text, not tracked as query.
      setQuery("");
      setIsToolMenuOpen(true);
      setSlashIndex(cursorPosition - 1);
      return;
    }

    setQuery(currentQuery);
    setIsToolMenuOpen(true);
  };

  return (
    <textarea
      value={payload.prompt}
      ref={textareaRef}
      onChange={handleChange}
      onKeyDown={handleKeyPress}
      disabled={isLoading}
      placeholder={placeholder}
      className={cn(
        "block min-h-18 w-full max-h-80 py-1 px-2 bg-transparent outline-none placeholder:text-neutral-400 dark:placeholder:text-neutral-400 outline-0 overflow-y-auto resize-none [scrollbar-width:none] leading-6",
        "mask-[linear-gradient(to_bottom,transparent,black_4%,black_98%,transparent)] select-none",
        className,
      )}
    />
  );
}

type PromptInputActionsProps = {
  children: ReactNode;
  className?: string;
};

// Places attachment controls on the left and submission controls on the right.
function PromptInputActions({ children, className }: PromptInputActionsProps) {
  const [attachments, submit] = Children.toArray(children);

  return (
    <div className={cn("flex items-center justify-between pt-2", className)}>
      <div className="flex items-center">
        {attachments}
        <SelectedTool />
      </div>
      <div className="flex items-center">{submit}</div>
    </div>
  );
}

function SelectedTool() {
  const { payload, setPayload, setIsToolMenuOpen, tools } = useMosaicContext();

  const tool = tools.find(({ id }) => id === payload.tool);

  if (!tool) return null;

  const Icon = tool.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 0.85, filter: "blur(4px)" }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      onClick={() => {
        setPayload((prev) => ({ ...prev, tool: null }));
        setIsToolMenuOpen(false);
      }}
      className={cn(
        "group flex items-center gap-1.5 rounded-full",
        "py-2 px-3 leading-none transition-colors duration-200",
        "hover:bg-red-100 cursor-pointer",
        tool.color,
      )}
    >
      <Icon
        className={cn(
          "size-4 shrink-0 transition-colors duration-200 group-hover:hidden",
          tool.color,
        )}
      />
      <Trash2
        aria-hidden="true"
        className="hidden size-4 shrink-0 text-red-600 group-hover:block"
      />

      <p
        className={cn(
          "text-[15px] font-medium tracking-wide select-none transition-colors duration-200 group-hover:text-red-600",
          tool.color,
        )}
      >
        {tool.title}
      </p>
    </motion.div>
  );
}

type ActionProps = {
  className?: string;
};

// Renders the controls used to add files or other prompt attachments.
function PromptInputAttachments({ className }: ActionProps) {
  return (
    <div className={cn(className, "flex items-center")}>
      <button
        type="button"
        aria-label="Add attachment"
        className="rounded-full p-2 hover:bg-neutral-100 dark:hover:bg-neutral-600"
      >
        <PlusIcon className="size-5 text-neutral-700 dark:text-neutral-100" />
      </button>
    </div>
  );
}

// Submits the prompt or displays the loading state while submission is active.
function PromptInputSubmit({ className }: ActionProps) {
  const { isLoading, onSubmit, payload, setPayload } = useMosaicContext();

  const handleSubmit = () => {
    if (!payload.prompt.trim() || isLoading) return;
    onSubmit(payload);
    setPayload({ prompt: "", tool: null });
  };

  return isLoading ? (
    <div
      className={cn(
        "bg-linear-to-r from-neutral-600 to-neutral-800 dark:from-neutral-100 dark:to-neutral-300 size-7 md:size-10 rounded-full flex justify-center items-center",
        className,
      )}
    >
      <Square className="size-4 md:size-5 fill-white cursor-pointer text-white" />
    </div>
  ) : (
    <button type="button" onClick={handleSubmit} disabled={!payload.prompt.trim()}>
      <ArrowUp className="size-7 md:size-10 rounded-full bg-linear-to-r from-neutral-600 to-neutral-800 dark:from-neutral-100 dark:to-neutral-200 p-2 cursor-pointer text-white dark:text-black" />
    </button>
  );
}

export {
  ToolMenu,
  ToolItem,
  MosaicPromptBar,
  PromptInput,
  PromptInputActions,
  PromptInputAttachments,
  PromptInputSubmit,
  PromptInputTextArea,
  SelectedTool,
};
