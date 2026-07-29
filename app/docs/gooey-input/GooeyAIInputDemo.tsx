"use client";

import Installation from "@/components/Installation";
import ComponentPreviewCard from "@/components/ComponentPreviewCard";
import { GooeyAI, GooeyAIButton, GooeyAIDialog, GooeyAITextArea } from "@/registry/new-york/gooey-ai/GooeyAIInput";

import { useState } from "react";



const CommandLink = "https://brainframeui.tech/r/gooey-ai.json";


function GooeyAIExample() {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  return (
    <GooeyAI
      side="left"
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
      <GooeyAIButton buttonPlaceholder={"AI"} />
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
        classname={`items-end p-2 justify-start`}
        component={<GooeyAIExample />}
        code="GooeyAIInputUsage"
      />

      <Installation
        CLILink={CommandLink}
        code="gooeyAIInput"
        path="components/ui/GooeyAI.tsx"
      />
    </>
  );
}