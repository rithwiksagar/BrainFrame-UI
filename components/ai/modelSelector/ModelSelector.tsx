"use client";
import { useState } from "react";
import { createContext, useContext } from "react";
import { AnimatePresence, easeOut, motion } from "motion/react";
import { Check } from "lucide-react";
import { Search, X } from "lucide-react";
import React from "react";
import { Dispatch, SetStateAction } from "react";

type ModelSelectorContextType = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  defaultModel: string;
  setDefaultModel: Dispatch<SetStateAction<string>>;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
};

type modelsType = {
  chef: string;
  id: string;
  names: string[];
};

interface ModelSelectorProps {
  children: React.ReactNode;
}
const models: modelsType[] = [
  {
    chef: "OpenAI",
    id: "gpt",
    names: ["GPT-4o", "GPT-4o Mini", "o1", "o1 Mini"],
  },
  {
    chef: "Anthropic",
    id: "claude",
    names: [
      "Claude 4 Opus",
      "Claude 4 Sonnet",
      "Claude 3.5 Sonnet",
      "Claude 3.5 Haiku",
    ],
  },
  {
    chef: "Google",
    id: "gemini-2.0-flash-exp",
    names: ["Gemini 2.0 Flash", "Gemini 1.5 Pro", "Gemini 1.5 Flash"],
  },
  {
    chef: "Meta",
    id: "llama-3.3-70b",
    names: ["Llama 3.3 70B", "Llama 3.1 405B", "Llama 3.1 70B", "Llama 3.1 8B"],
  },
  {
    chef: "DeepSeek",
    id: "deepseek-r1",
    names: ["DeepSeek R1", "DeepSeek V3", "DeepSeek Coder V2"],
  },
  {
    chef: "Mistral AI",
    id: "mistral-large",
    names: ["Mistral Large", "Mistral Small"],
  },
];
const ModelSelectorContext = createContext<ModelSelectorContextType | null>(
  null,
);
function useModelSelector() {
  const Context = useContext(ModelSelectorContext);
  if (!Context) throw new Error("must be inside the selector");
  return Context;
}
function ModelSelector({ children }: ModelSelectorProps) {
  const [open, setOpen] = useState(false);
  const [defaultModel, setDefaultModel] = useState("Claude 4 sonnet");
  const [search, setSearch] = useState("");
  return (
    <ModelSelectorContext.Provider
      value={{
        open,
        setOpen,
        defaultModel,
        setDefaultModel,
        search,
        setSearch,
      }}
    >
      {children}
    </ModelSelectorContext.Provider>
  );
}

function ModelTrigger() {
  const { defaultModel, setOpen } = useModelSelector();
  return (
    <button
      className="relative bg-white/60 dark:bg-neutral-900 p-2 rounded-md border
       border-neutral-300/90 text-neutral-800/90 dark:text-neutral-50 dark:border-neutral-50/10 
       px-4 dark:hover:bg-neutral-900/90 cursor-pointer "
      onClick={() => {
        setOpen(true);
      }}
    >
      {defaultModel}
    </button>
  );
}

function ModelContent({ children }: { children: React.ReactNode }) {
  const { open } = useModelSelector();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{
            scale: 0.98,
            opacity: 0,
          }}
          animate={{
            scale: 1,
            opacity: 1,
          }}
          exit={{
            scale: 0.98,
            opacity: 0,
          }}
          transition={{
            duration: 0.2,
            ease: easeOut,
          }}
          className="absolute bg-white border dark:border-neutral-50/0 border-neutral-300/90  dark:bg-neutral-900 h-84 w-76 md:w-102 rounded-md flex flex-col"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ModelInput() {
  const { setOpen, setSearch } = useModelSelector();
  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }
  return (
    <>
      <div className="flex justify-between items-center bg-oklch(27.4% 0.006 286.033) mx-2 my-1">
        <Search className="size-4.25 text-neutral-700/80 dark:text-neutral-100/40" />
        <input
          placeholder="Search for the model"
          className="ml-1 p-1 outline-0 placeholder:text-neutral-700/80 text-neutral-700/90 dark:text-neutral-50/90 darK:placeholder:text-neutral-100/40 placeholder:text-[14px] w-full"
          onChange={handleSearch}
        ></input>
        <button
          onClick={() => {
            setOpen(false);
            setSearch("");
          }}
        >
          <X className="size-4.5 text-neutral-700/80 dark:text-neutral-100/70 rounded-full cursor-pointer" />
        </button>
      </div>
      <div className="border-b border-neutral-300/90 dark:border-neutral-50/10"></div>
    </>
  );
}

function ModelItems() {
  const { search, setSearch, setDefaultModel, setOpen, defaultModel } =
    useModelSelector();

  const filteredModels = models.filter((model) =>
    model.names.some((n) => n.toLowerCase().includes(search.toLowerCase())),
  );
  return (
    <div className="flex-1 overflow-y-auto [scrollbar-width:thin] [scrollbar-color:var(--color-zinc-300)_transparent] dark:[scrollbar-color:var(--color-zinc-500)_transparent]">
      {filteredModels.map((model) => (
        <div key={model.id} className="">
          <span className="text-neutral-900 font-medium dark:text-neutral-400 text-[14px] ml-2.5">
            {model.chef}
          </span>
          <div className="flex flex-col">
            {model.names.map((modelName) => (
              <div
                key={modelName}
                className={`text-neutral-700 dark:text-neutral-50 text-[14px] pl-6 pr-2 py-1 cursor-pointer hover:bg-zinc-50 dark:hover:bg-neutral-800/80 rounded-md flex justify-between items-center ${defaultModel === modelName ? "bg-zinc-100/60 dark:bg-neutral-800/30" : ""}`}
                onClick={() => {
                  setDefaultModel(modelName);
                  setOpen(false);
                  setSearch("");
                }}
              >
                {modelName}
                {defaultModel === modelName ? (
                  <Check className="size-4.5 text-neutral-700/80" />
                ) : null}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
export {
  ModelSelector,
  ModelTrigger,
  ModelContent,
  ModelInput,
  ModelItems,
}