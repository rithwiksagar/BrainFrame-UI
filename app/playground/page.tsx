"use client";
import {
  PromptPayload,
  ToolMenu,
  ToolItem,
  MosaicPromptBar,
  PromptInput,
  PromptInputAttachments,
  PromptInputActions,
  PromptInputSubmit,
  PromptInputTextArea,
} from "@/registry/new-york/MosaicPromptBar/MosaicPromptBar";
import { FileText, Lightbulb, PenLine, ImageIcon } from "lucide-react";
import { useState } from "react";

const tools = [
  {
    id: "write",
    title: "Write",
    description: "Draft or refine your content",
    icon: PenLine,
    color: "text-blue-500",
  },
  {
    id: "analyze",
    title: "Analyze",
    description: "Explore ideas and find insights",
    icon: Lightbulb,
    color: "text-amber-500",
  },
  {
    id: "summarize",
    title: "Summarize",
    description: "Turn long text into key points",
    icon: FileText,
    color: "text-emerald-500",
  },
  {
    id: "create_image",
    title: "Create Image",
    description: "Generate an image from a prompt",
    icon: ImageIcon,
    color: "text-red-500",
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
  const [payload, setPayload] = useState<PromptPayload>({
    prompt: "",
    tool: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = (submittedPayload: PromptPayload) => {
    console.log(submittedPayload);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };
  return (
    <MosaicPromptBar
      payload={payload}
      setPayload={setPayload}
      isLoading={isLoading}
      onSubmit={handleSubmit}
      tools={tools}
    >
      <ToolMenu>
        <ToolItem />
      </ToolMenu>

      <PromptInput className="">
        <PromptInputTextArea placeholder="Type / to get started" />
        <PromptInputActions>
          <PromptInputAttachments />
          <PromptInputSubmit />
        </PromptInputActions>
      </PromptInput>
    </MosaicPromptBar>
  );
}
