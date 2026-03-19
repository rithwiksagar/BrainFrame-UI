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
  models: { chef: string; id: string; names: string[] }[];
};

interface ModelSelectorProps {
  children: React.ReactNode;
  models: { chef: string; id: string; names: string[] }[];
  defaultModel: string;
  setDefaultModel: Dispatch<SetStateAction<string>>;
}

const ModelSelectorContext = createContext<ModelSelectorContextType | null>(
  null,
);
function useModelSelector() {
  const Context = useContext(ModelSelectorContext);
  if (!Context) throw new Error("must be inside the selector");
  return Context;
}
function ModelSelector({
  children,
  models,
  defaultModel,
  setDefaultModel,
}: ModelSelectorProps) {
  const [open, setOpen] = useState(false);
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
        models,
      }}
    >
      <div className="flex justify-center items-center">{children}</div>
    </ModelSelectorContext.Provider>
  );
}

function ModelTrigger() {
  const { defaultModel, setOpen } = useModelSelector();
  return (
    <button
      className="relative bg-[#f7f7f7] dark:bg-neutral-900 p-1 rounded-md border
       border-neutral-300/90 text-neutral-800/90 dark:text-neutral-50 dark:border-neutral-50/10 
       px-4 dark:hover:bg-neutral-900/90 cursor-pointer text-[14px] lg:text-[16px]"
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
          className="absolute bg-[#f7f7f7] border dark:border-neutral-50/0 border-neutral-300/90  dark:bg-neutral-900 h-84 w-76 md:w-102 rounded-md flex flex-col"
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
  const { search, setSearch, setDefaultModel, setOpen, defaultModel, models } =
    useModelSelector();
  const filteredModels = models.filter((model) =>
    model.names.some((n) => n.toLowerCase().includes(search.toLowerCase())),
  );
  return (
    <div
      className="flex-1 overflow-y-auto [scrollbar-width:thin] [scrollbar-color:var(--color-zinc-300)_transparent]
     dark:[scrollbar-color:var(--color-zinc-500)_transparent]"
    >
      {filteredModels.map((model) => (
        <div key={model.id} className="">
          <span className="text-neutral-900 font-medium dark:text-neutral-400 text-[14px] ml-2.5">
            {model.chef}
          </span>
          <div className="flex flex-col">
            {model.names.map((modelName) => (
              <div
                key={modelName}
                className={`text-neutral-700 dark:text-neutral-50 text-[14px] pl-6 pr-2 py-1 cursor-pointer
                   hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50 rounded-md flex justify-between items-center 
                   ${defaultModel === modelName ? "bg-neutral-200 dark:bg-neutral-800/60" : ""}`}
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
export { ModelSelector, ModelTrigger, ModelContent, ModelInput, ModelItems };
