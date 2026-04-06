"use client";
import {
  PromptInput,
  PromptInputActions,
  PromptInputAttachments,
  PromptInputButton,
  PromptInputTextArea,
} from "@/registry/new-york/prompt-input/PromptInput";

import PreviewPage from "@/components/previewpage";
import { useState } from "react";

export default function PromptInputDemo() {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit() {
    if (!value.trim() || isLoading) return;
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      setValue("");
    }, 2000);
  }

  return (
    <PreviewPage>
      <div className="flex flex-col justify-end items-center">
        <PromptInput
          value={value}
          setValue={setValue}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          className="bg-white/90 dark:bg-neutral-950"
        >
          <PromptInputTextArea placeholder="Ask me anything..." />

          <PromptInputActions>
            <PromptInputAttachments />
            <PromptInputButton />
          </PromptInputActions>
        </PromptInput>
      </div>
    </PreviewPage>
  );
}
