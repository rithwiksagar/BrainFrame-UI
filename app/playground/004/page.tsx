"use client";

import {
  AskAIButton,
  AskAITextarea,
  AskAiPromptBar,
  AskAISubmit,
  MosaicAskAI,
} from "@/registry/new-york/MosaicAskAI/MosaicAskAI";
import { useEffect, useState } from "react";

export default function Play() {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = () => {
    setIsLoading(true);
    setValue("")
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <MosaicAskAI
        value={value}
        setValue={setValue}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        onSubmit={onSubmit}
      >
        <AskAIButton />
        <AskAiPromptBar>
          <AskAITextarea />
          <AskAISubmit />
        </AskAiPromptBar>
      </MosaicAskAI>
    </div>
  );
}
