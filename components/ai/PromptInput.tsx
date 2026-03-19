"use client";
import PreviewPage from "@/components/previewpage";
import {
  Copy,
  MoveUpRight,
  Paperclip,
  Plus,
  Send,
  SendHorizontal,
  Square,
} from "lucide-react";
import { createContext, ReactNode, useContext, useRef, useState } from "react";

type promptInputContextType = {
  value: string;
  setValue: (v: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
};

type PromptInputTypes = {
  value: string;
  setValue: (v: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  children: React.ReactNode;
};
const promptInputContext = createContext<promptInputContextType | null>(null);

function usePromptInput() {
  const context = useContext(promptInputContext);
  if (!context) throw new Error("must be inside the component");

  return context;
}

function PromptInput({
  value,
  setValue,
  onSubmit,
  isLoading,
  children,
}: PromptInputTypes) {
  return (
    <promptInputContext.Provider
      value={{ value, setValue, onSubmit, isLoading }}
    >
      <div className="w-78 md:w-120">
        <div className="border border-neutral-300 dark:border-neutral-800 rounded-2xl">
          {children}
        </div>
      </div>
    </promptInputContext.Provider>
  );
}

function PromptInputTextArea({ placeholder }: { placeholder: string }) {
  const { value, setValue, onSubmit } = usePromptInput();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  function handleChange(e: { target: { value: string } }) {
    const textarea = textareaRef.current!;
    textarea.style.height = "0";
    textarea.style.height = textarea.scrollHeight + "px";
    setValue(e.target.value);
  }
  return (
    <textarea
      value={value}
      ref={textareaRef}
      onChange={handleChange}
      onKeyDown={(e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          onSubmit();
        }
      }}
      placeholder={placeholder}
      className={`w-70 md:w-120 h-10 max-h-60 py-2 px-4
               placeholder:text-neutral-400 dark:placeholder:text-neutral-700 focus:outline-0 
               overflow-y-auto resize-none [scrollbar-width:none] leading-6`}
    ></textarea>
  );
}

function PromptInputActions({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-between items-center px-3 pb-2">
      {children}
    </div>
  );
}

function PromptInputAttachments() {
  return (
    <Plus className="size-4 md:size-5 dark:text-neutral-400 cursor-pointer" />
  );
}

function PromptInputButton() {
  const { isLoading, onSubmit, value } = usePromptInput();
  return isLoading ? (
    <div className="bg-neutral-800 size-7  md:size-9 rounded-full flex justify-center items-center">
      <Square className="size-4 md:size-5 fill-white cursor-pointer text-white" />
    </div>
  ) : (
    <button onClick={onSubmit} disabled={!value.trim()}>
      <SendHorizontal className="bg-neutral-800 p-2 size-7 md:size-9 rounded-full cursor-pointer text-neutral-300" />
    </button>
  );
}
export {
  PromptInput,
  PromptInputTextArea,
  PromptInputActions,
  PromptInputAttachments,
  PromptInputButton,
};
