"use client";

import { ArrowUp, PlusIcon, Square } from "lucide-react";
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

type MosaicPromptBarProps = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
  onSubmit: () => void;
  commands: Command[];
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
  slashIndex: number;
  setSlashIndex: Dispatch<SetStateAction<number>>;
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  filteredCommands: Command[];
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
  commands,
  children,
  className,
}: MosaicPromptBarProps) {
  const [isCommandMenuOpen, setIsCommandMenuOpen] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [slashIndex, setSlashIndex] = useState<number>(-1);
  const [query, setQuery] = useState("");
  const filteredCommands = commands.filter((command) =>
    command.title.toLocaleLowerCase().includes(query.toLowerCase()),
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

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
        slashIndex,
        setSlashIndex,
        query,
        setQuery,
        filteredCommands,
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

type Command = {
  title: string;
  description: string;
  icon: ReactNode;
};

type CommandMenuProps = {
  children: ReactElement<CommandItemProps>;
  className?: string;
};

// Shows the keyboard-navigable command choices opened from the prompt textarea.
function CommandMenu({ children, className }: CommandMenuProps) {
  const { isCommandMenuOpen, filteredCommands } = useMosaicContext();
  return (
    isCommandMenuOpen &&
    filteredCommands.length > 0 && (
      <motion.div className={cn("flex flex-col mb-2", className)}>
        {filteredCommands.map((command, index) =>
          cloneElement(children, { ...command, index, key: command.title }),
        )}
      </motion.div>
    )
  );
}

type CommandItemProps = Partial<Command> & {
  index?: number;
  className?: string;
};

function CommandItem({
  title,
  description,
  icon,
  index = 0,
  className,
}: CommandItemProps) {
  const { selectedIndex, setIsCommandMenuOpen } = useMosaicContext();

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.2,
        delay: index * 0.03,
      }}
      onClick={() => setIsCommandMenuOpen(false)}
      className={cn(
        "flex items-center gap-2 rounded-lg leading-none py-2 px-4 cursor-pointer",
        index === selectedIndex && "bg-neutral-100/60",
        className,
      )}
    >
      {icon}
      <div className="flex items-center gap-2">
        <p className="text-sm font-medium tracking-wide text-neutral-800">
          {title}
        </p>
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
  const { setIsCommandMenuOpen } = useMosaicContext();
  useEffect(() => {
    function handleOutSideClick(e: MouseEvent) {
      if (
        promptInputRef.current &&
        !promptInputRef.current.contains(e.target as Node)
      ) {
        setIsCommandMenuOpen(false);
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

// Captures prompt text and handles command navigation and submission keys.

type PromptInputTextAreaProps = {
  placeholder: string;
  className?: string;
};

function PromptInputTextArea({
  placeholder,
  className,
}: PromptInputTextAreaProps) {
  const {
    value,
    setValue,
    onSubmit,
    isLoading,
    isCommandMenuOpen,
    setIsCommandMenuOpen,
    selectedIndex,
    setSelectedIndex,
    setSlashIndex,
    setQuery,
    filteredCommands,
  } = useMosaicContext();

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "/") {
      setIsCommandMenuOpen(true);
      return;
    }
    if (isCommandMenuOpen && event.key === "ArrowDown") {
      event.preventDefault();
      setSelectedIndex((prev) =>
        prev < filteredCommands.length - 1 ? prev + 1 : 0,
      );
      return;
    }
    if (isCommandMenuOpen && event.key === "ArrowUp") {
      event.preventDefault();
      setSelectedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredCommands.length - 1,
      );
      return;
    }
    if (isCommandMenuOpen && event.key === "Enter") {
      event.preventDefault();
      const selectedCommand = filteredCommands[selectedIndex];
      if (!selectedCommand) return;
      setValue((prev) => prev + selectedCommand.title);
      setQuery(selectedCommand.title);
      setIsCommandMenuOpen(false);
      return;
    }
    if (event.key === "Escape") {
      setIsCommandMenuOpen(false);
      return;
    }
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (!value.trim() || isLoading) return;
      const textarea = textareaRef.current!;
      setValue("");
      textarea.style.height = "40px";
      onSubmit();
      return;
    }
  };

  useEffect(() => {
    function handleKeyChange(e: KeyboardEvent) {
      if (e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.key === "/") {
        textareaRef.current?.focus();
        setIsCommandMenuOpen(true);
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

  const handleChange = (e: any) => {
    const textarea = textareaRef.current!;
    textarea.style.height = "0";
    textarea.style.height = textarea.scrollHeight + "px";
    const newValue = e.target.value;
    setValue(newValue);
    const index = newValue.lastIndexOf("/");
    if (index === -1) {
      setQuery("");
      setIsCommandMenuOpen(false);
      return;
    }

    setSlashIndex(index);
    const query = newValue.slice(index + 1);
    setQuery(query);
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
        className="rounded-full p-2 hover:bg-neutral-100 dark:hover:bg-neutral-600"
      >
        <PlusIcon className="size-5 text-neutral-700 dark:text-neutral-100" />
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
      <ArrowUp className="size-7 md:size-10 rounded-full bg-linear-to-r from-neutral-600 to-neutral-800 dark:from-neutral-100 dark:to-neutral-200 p-2 cursor-pointer text-white dark:text-black" />
    </button>
  );
}

export {
  CommandMenu,
  CommandItem,
  MosaicPromptBar,
  PromptInput,
  PromptInputActions,
  PromptInputAttachments,
  PromptInputSubmit,
  PromptInputTextArea,
};
