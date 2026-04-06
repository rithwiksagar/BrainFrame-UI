"use client";
import { X } from "lucide-react";
import { useState } from "react";
import { Toaster, toast } from "sonner";
import CodeBlock from "./codeblock";
import {
  PromptInput,
  PromptInputActions,
  PromptInputAttachments,
  PromptInputButton,
  PromptInputTextArea,
} from "@/registry/new-york/prompt-input/PromptInput";
export default function DisplayFrame() {
  const [preview, setPreview] = useState(true);
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  function handlesubmit() {
    setIsLoading(true);
    toast("This is a demo component");
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }
  return (
    <div className="flex flex-col w-[min(100vw-2rem,25rem)] md:w-210 h-140 dark:bg-neutral-900 bg-white rounded-3xl shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
      <Toaster position="top-center" className="top-[40%]! !-translate-y-1/2" />
      <div className="border-b border-neutral-200 dark:border-neutral-800">
        <div className=" flex justify-between items-center my-2 mx-6">
          <div className="flex gap-2 ">
            <div className="bg-red-400 rounded-full size-3 border border-neutral-500"></div>
            <div className="bg-yellow-400 rounded-full size-3 border border-neutral-500"></div>
            <div className="bg-green-500 rounded-full size-3 border border-neutral-500"></div>
          </div>
          <div className="border border-neutral-200 rounded-md p-1 text-[12px] text-neutral-500 dark:border-neutral-800">
            https://www.brainframe.com
          </div>
          <div></div>
        </div>
      </div>
      <div className="border-b border-neutral-100 dark:border-neutral-800 flex">
        <div
          className={`text-neutral-400font-extralight text-[12px] flex gap-2 items-center p-1 px-2 w-fit border-r
             border-neutral-100 dark:border-neutral-800 cursor-pointer ${preview ? "bg-neutral-100 dark:bg-neutral-800" : ""}`}
          onClick={() => {
            setPreview(true);
          }}
        >
          Preview <X className="size-3.5" />
        </div>
        <div
          className={`text-neutral-400font-extralight text-[12px] flex gap-2 items-center p-1 px-2 w-fit border-r
             border-neutral-100 dark:border-neutral-800 cursor-pointer ${!preview ? "bg-neutral-100 dark:bg-neutral-800" : ""}`}
          onClick={() => {
            setPreview(false);
          }}
        >
          Code <X className="size-3.5" />
        </div>
      </div>
      {preview && (
        <div className="flex-1 flex flex-col justify-center items-center">
          <div className="text-md md:text-2xl">
            Hi There !! How Can I Help You Today?
          </div>
        </div>
      )}
      {preview && (
        <div className="flex justify-center mb-8">
          <PromptInput
            value={value}
            setValue={setValue}
            onSubmit={handlesubmit}
            isLoading={isLoading}
            className="bg-white/90 dark:bg-neutral-900"
          >
            <PromptInputTextArea placeholder="Ask me anything..." />
            <PromptInputActions>
              <PromptInputAttachments />
              <PromptInputButton />
            </PromptInputActions>
          </PromptInput>
        </div>
      )}
      {!preview && (
        <div>
          <CodeBlock
            code={`"use client";
import { PromptInput, PromptInputActions, PromptInputAttachments, PromptInputButton,
PromptInputTextArea} from "@/components/ai/PromptInput";
export default function PromptInputExample() {
  return (
    <PromptInput
      value={value}
      setValue={setValue}
      onSubmit={handlesubmit}
      isLoading={isLoading}
    >
      <PromptInputTextArea placeholder="Ask me" />
      <PromptInputActions>
        <PromptInputAttachments />
        <PromptInputButton />
      </PromptInputActions>
    </PromptInput>
  );
}
          `}
          />
        </div>
      )}
    </div>
  );
}
