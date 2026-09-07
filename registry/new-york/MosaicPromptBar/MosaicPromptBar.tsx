"use client";

import {
  ArrowUp,
  LucideIcon,
  PlusIcon,
  SendHorizontal,
  Square,
} from "lucide-react";
import {
  createContext,
  Children,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
  type ReactNode,
  useRef,
} from "react";
import { cn } from "@/lib/utils";

type MosaicPromptBarProps = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
  onSubmit: () => void;
  children?: ReactNode;
  className?: string;
};

type MosaicPromptBarContextType = {
  value: MosaicPromptBarProps["value"];
  setValue: MosaicPromptBarProps["setValue"];
  onSubmit: MosaicPromptBarProps["onSubmit"];
  isLoading: MosaicPromptBarProps["isLoading"];
  isCommandMenuOpen: boolean;
  setIsCommandMenuOpen: Dispatch<SetStateAction<boolean>>;
  selectedIndex: number;
  setSelectedIndex: Dispatch<SetStateAction<number>>;
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
  value,
  setValue,
  isLoading,
  onSubmit,
  children,
  className,
}: MosaicPromptBarProps) {
  const [isCommandMenuOpen, setIsCommandMenuOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <MosaicPromptBarContext.Provider
      value={{
        value,
        setValue,
        isLoading,
        onSubmit,
        isCommandMenuOpen,
        setIsCommandMenuOpen,
        selectedIndex,
        setSelectedIndex,
      }}
    >
      <div
        className={cn(
          "p-2 rounded-3xl border border-white/30 bg-neutral-200/30",
          className,
        )}
      >
        {children}
      </div>
    </MosaicPromptBarContext.Provider>
  );
}

type Command = {
  title: string;
  description: string;
  icon: LucideIcon;
};

type CommandMenuProps = {
  commands: Command[];
  className?: string;
};

// Shows the keyboard-navigable command choices opened from the prompt textarea.
function CommandMenu({ commands, className }: CommandMenuProps) {
  const { isCommandMenuOpen, selectedIndex, setIsCommandMenuOpen } =
    useMosaicContext();
  const iconColors = [
    "text-blue-500",
    "text-amber-500",
    "text-emerald-500",
    "text-rose-500",
  ];

  return (
    isCommandMenuOpen && (
      <div className={cn("flex flex-col mb-2", className)}>
        {commands.map(({ title, description, icon: Icon }, index) => (
          <div
            key={index}
            onClick={() => setIsCommandMenuOpen(false)}
            className={cn(
              "flex items-center gap-2 rounded-lg leading-none hover:bg-neutral-300/40 py-2 px-4",
              index === selectedIndex && "bg-neutral-300/80",
            )}
          >
            <Icon
              className={cn(
                "size-4 shrink-0",
                iconColors[index % iconColors.length],
              )}
            />
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium tracking-wide">{title}</p>
              <p
                className={cn(
                  "text-sm font-normal",
                  index === selectedIndex
                    ? "text-neutral-600"
                    : "text-neutral-500",
                )}
              >
                {description}
              </p>
            </div>
          </div>
        ))}
      </div>
    )
  );
}

type PromptInputProps = {
  placeholder: string;
  commands: Command[];
  className?: string;
};

// Groups the textarea and action controls into one prompt surface.
function PromptInput({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "w-148 flex flex-col justify-between rounded-2xl border border-white/30 dark:border-neutral-700 bg-white/90 dark:bg-neutral-800 p-3 space-y-1 shadow-[0_3px_10px_rgb(0,0,0,0.2)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

// Captures prompt text and handles command navigation and submission keys.
function PromptInputTextArea({
  placeholder,
  commands,
  className,
}: PromptInputProps) {
  const {
    value,
    setValue,
    onSubmit,
    isLoading,
    isCommandMenuOpen,
    setIsCommandMenuOpen,
    selectedIndex,
    setSelectedIndex,
  } = useMosaicContext();

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "/") {
      setIsCommandMenuOpen(true);
    }
    if (isCommandMenuOpen && event.key === "ArrowDown") {
      event.preventDefault();
      setSelectedIndex((prev) => (prev < commands.length - 1 ? prev + 1 : 0));
    }
    if (isCommandMenuOpen && event.key === "ArrowUp") {
      event.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : commands.length - 1));
    }
    if (isCommandMenuOpen && event.key === "Enter") {
      event.preventDefault();
      console.log(commands[selectedIndex].title);
      setIsCommandMenuOpen(false);
      return;
    }
    if (event.key === "Escape") {
      setIsCommandMenuOpen(false);
    }
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (!value.trim() || isLoading) return;
      const textarea = textareaRef.current!;
      setValue("");
      textarea.style.height = "40px";
      onSubmit();
    }
  };

  const handleChange = (e: any) => {
    const textarea = textareaRef.current!;
    textarea.style.height = "0";
    textarea.style.height = textarea.scrollHeight + "px";
    setValue(e.target.value);
  };
  return (
    <textarea
      value={value}
      ref={textareaRef}
      onChange={handleChange}
      onKeyDown={handleKeyPress}
      disabled={isLoading}
      placeholder={placeholder}
      className={cn(
        "block min-h-18 w-full max-h-80 py-1 px-2 bg-transparent outline-noneplaceholder:text-neutral-400 dark:placeholder:text-neutral-500 outline-0 overflow-y-auto resize-none [scrollbar-width:none] leading-6",
        "mask-[linear-gradient(to_bottom,transparent,black_4%,black_98%,transparent)]",
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
      <div className="flex items-center">{attachments}</div>
      <div className="flex items-center">{submit}</div>
    </div>
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
        className="rounded-full bg-white dark:bg-neutral-800 p-2 shadow-xs border border-neutral-200 dark:border-neutral-600 hover:backdrop-blur-2xl"
      >
        <PlusIcon className="size-5" />
      </button>
    </div>
  );
}

// Submits the prompt or displays the loading state while submission is active.
function PromptInputSubmit({ className }: ActionProps) {
  const { isLoading, onSubmit, value } = useMosaicContext();

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
    <button type="button" onClick={onSubmit} disabled={!value.trim()}>
      <ArrowUp className="size-7 md:size-10 rounded-full bg-linear-to-r from-neutral-600 to-neutral-800 p-2 cursor-pointer text-white" />
    </button>
  );
}

export {
  CommandMenu,
  MosaicPromptBar,
  PromptInput,
  PromptInputActions,
  PromptInputAttachments,
  PromptInputSubmit,
  PromptInputTextArea,
};
