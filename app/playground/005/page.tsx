"use client";

import {
  AskAIButton002,
  AskAiPromptBar002,
  AskAIActions002,
  AskAITextarea002,
  MosaicAskAI002,
  AskAIAttachments002,
  AskAISubmit002,
} from "@/registry/new-york/MosaicAskAI002/MosaicAskAI002";
import { useState } from "react";

export default function Play() {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = () => {
    setIsLoading(true);
    setValue("");
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <MosaicAskAI002
        value={value}
        setValue={setValue}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        onSubmit={onSubmit}
      >
        <AskAIButton002 />
        <AskAiPromptBar002>
          <AskAITextarea002 />
          <AskAIActions002>
            <AskAIAttachments002 />
            <AskAISubmit002 />
          </AskAIActions002>
        </AskAiPromptBar002>
      </MosaicAskAI002>
    </div>
  );
}
