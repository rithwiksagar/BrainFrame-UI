"use client";
import {
  CommandMenu,
  MosaicPromptBar,
  PromptInput,
  PromptInputAttachments,
  PromptInputActions,
  PromptInputSubmit,
  PromptInputTextArea,
} from "@/registry/new-york/MosaicPromptBar/MosaicPromptBar";
import { FileText, Lightbulb, LucideIcon, PenLine, Image } from "lucide-react";
import { useState } from "react";

const commands: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: "Write",
    description: "Draft or refine your content",
    icon: PenLine,
  },
  {
    title: "Analyze",
    description: "Explore ideas and find insights",
    icon: Lightbulb,
  },
  {
    title: "Summarize",
    description: "Turn long text into key points",
    icon: FileText,
  },
  {
    title: "Create image",
    description: "Generate an image from a prompt",
    icon: Image,
  },
];

export default function Play() {
  return (
    <div className="h-screen flex items-center justify-center bg-neutral-200 dark:bg-neutral-900">
      <MosaicPromptBarDemo />
    </div>
  );
}

function MosaicPromptBarDemo() {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setValue("");
    }, 2000);
  };
  return (
    <MosaicPromptBar
      value={value}
      setValue={setValue}
      isLoading={isLoading}
      onSubmit={handleSubmit}
    >
      <CommandMenu commands={commands} />

      <PromptInput className="">
        <PromptInputTextArea
          placeholder="How Can I Help You Today?"
          commands={commands}
        />
        <PromptInputActions>
          <PromptInputAttachments />
          <PromptInputSubmit />
        </PromptInputActions>
      </PromptInput>
    </MosaicPromptBar>
  );
}
