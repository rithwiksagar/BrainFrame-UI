"use client";
import {
  PromptInput,
  PromptInputActions,
  PromptInputAttachments,
  PromptInputButton,
  PromptInputTextArea,
} from "@/components/ai/PromptInput";

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
