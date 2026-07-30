"use client";

import Installation from "@/components/Installation";
import ComponentPreviewCard from "@/components/ComponentPreviewCard";
import { GooeyAI, GooeyAIButton, GooeyAIDialog, GooeyAITextArea } from "@/registry/new-york/gooey-ai/GooeyAIInput";

import { useState } from "react";
import PropsTable from "@/components/PropsTable";
import { MessagesSquare } from "lucide-react";



const CommandLink = "https://brainframeui.tech/r/gooey-ai.json";
export const gooeyAIProps = [
  {
    prop: "value",
    type: "string",
    default: '""',
    description: "The current value of the textarea",
  },
  {
    prop: "setValue",
    type: `SetStateAction<string>`,
    default: "false",
    description: "State setter function used to update the textarea value"
  },
  {
    prop: "isLoading",
    type: "boolean",
    default: "false",
    description: "Disables input and shows the loading state while a request is in progress",
  },
  {
    prop: "setIsLoading",
    type: "SetStateAction<boolean>",
    default: "false",
    description : "State setter function used to control the loading state of the component"
  },
  {
    prop: "side",
    type: '"left" | "right"',
    default: '"left"',
    description: "Controls which side the dialog expands from",
  },
  {
    prop: "onSubmit",
    type: "function",
    default: "Provided by GooeyAI",
    description: "Triggered when pressing Enter or clicking the send button with valid input.",
  }
];

export const gooeyAIButtonProps = [
  {
    prop: "buttonPlaceholder",
    type: "ReactNode",
    default: "false",
    description: "Content rendered inside the floating action button.",
  },
  {
    prop: "className",
    type: "string",
    default: "undefined",
    description: "Additional Tailwind or CSS classes applied to the button.",
  }
];

export const gooeyAITextAreaProps = [
  {
    prop: "placeholder",
    type: "string",
    default: '"Ask me anything..."',
    description: "Placeholder text displayed when the textarea is empty.",
  },
  {
    prop: "className",
    type: "string",
    default: "undefined",
    description: "Additional Tailwind or CSS classes applied to the textarea.",
  }
];

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

        setIsLoading(true);

        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      }}

    >
      <GooeyAIButton buttonPlaceholder={<MessagesSquare className="size-6"/>} />
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

      <PropsTable title="GooeyAI Props" data={gooeyAIProps}/>
      <PropsTable title="GooeyAIButton Props" data={gooeyAIButtonProps}/>
      <PropsTable title="GooeyAITextArea Props" data={gooeyAITextAreaProps}/>
    </>
  );
}