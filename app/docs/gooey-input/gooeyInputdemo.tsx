"use client";

import Installation from "@/components/Installation";
import ComponentPreviewCard from "@/components/previewpage";
import { GooeyAI, GooeyAIButton, GooeyAIDialog, GooeyAITextArea } from "@/registry/new-york/gooey-AI/GooeyAI";

import { useState } from "react";



const CommandLink = "https://brainframeui.tech/r/gooey-ai.json";

function GooeyAIExample() {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <GooeyAI
      value={value}
      setValue={setValue}
      isLoading={isLoading}
      onSubmit={() => {
        if (!value.trim() || isLoading) return;

        setIsLoading(true);

        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      }}
    >
      <GooeyAIButton />

      <GooeyAIDialog >
        <GooeyAITextArea placeholder="Ask me anything..." />
      </GooeyAIDialog>
    </GooeyAI>
  );
}

export default function GooeyAIDemo() {
  return (
    <>
      <ComponentPreviewCard
        classname="items-end justify-start p-4"
        component={<GooeyAIExample />}
        code="gooeyAIInput"
      />

      <Installation
        CLILink={CommandLink}
        code="gooeyAIInput"
        path="components/ui/GooeyAI.tsx"
      />
    </>
  );
}