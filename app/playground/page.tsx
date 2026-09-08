"use client";
import {
  CommandMenu,
  CommandItem,
  MosaicPromptBar,
  PromptInput,
  PromptInputAttachments,
  PromptInputActions,
  PromptInputSubmit,
  PromptInputTextArea,
} from "@/registry/new-york/MosaicPromptBar/MosaicPromptBar";
import { FileText, Lightbulb, PenLine, Image } from "lucide-react";
import { useState } from "react";

const commands = [
  {
    title: "Write",
    description: "Draft or refine your content",
    icon: <PenLine className="size-4 shrink-0 text-blue-500" />,
  },
  {
    title: "Analyze",
    description: "Explore ideas and find insights",
    icon: <Lightbulb className="size-4 shrink-0 text-amber-500" />,
  },
  {
    title: "Summarize",
    description: "Turn long text into key points",
    icon: <FileText className="size-4 shrink-0 text-emerald-500" />,
  },
  {
    title: "Create image",
    description: "Generate an image from a prompt",
    icon: <Image className="size-4 shrink-0 text-rose-500" />,
  },
];

export default function Play() {
  return (
    <div
      className="h-screen flex items-center justify-center  min-h-screen
    bg-cover
    bg-center
    bg-no-repeat
    animate-[moveBg_15s_ease-in-out_infinite_alternate]"
      style={{ backgroundImage: "url('/image.png')" }}
    >
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
      commands={commands}
    >
      <CommandMenu>
        <CommandItem />
      </CommandMenu>

      <PromptInput className="">
        <PromptInputTextArea
          placeholder="What are we building today?"
        />
        <PromptInputActions>
          <PromptInputAttachments />
          <PromptInputSubmit />
        </PromptInputActions>
      </PromptInput>
    </MosaicPromptBar>
  );
}
