"use client";
import {
  PromptInput,
  PromptInputActions,
  PromptInputAttachments,
  PromptInputButton,
  PromptInputTextArea,
} from "@/registry/new-york/prompt-input/PromptInput";

import { useState } from "react";
import ComponentPreviewCard from "@/components/previewpage";
import Installation from "@/components/Installation";
import PropsTable from "@/components/propstable";

const CommandLink: string = "https://brainframeui.tech/r/prompt-input.json";
const promptInputProps = [
  {
    prop: "value",
    type: "string",
    description: "The current input value.",
  },
  {
    prop: "setValue",
    type: "(value: string) => void",
    description: "Updates the input value.",
  },
  {
    prop: "onSubmit",
    type: "() => void",
    description: "Called when the user submits the prompt.",
  },
  {
    prop: "isLoading",
    type: "boolean",
    default: "false",
    description: "Displays the loading state and prevents submission.",
  },
  {
    prop: "children",
    type: "ReactNode",
    description: "The prompt input content.",
  },
];

const promptInputTextAreaProps = [
  {
    prop: "placeholder",
    type: "string",
    description: "Placeholder text displayed when the input is empty.",
  },
];

function PromptInputDemoContent({
  value,
  setValue,
  isLoading,
  setIsLoading,
}: any) {
  return (
    <div className="">
      <PromptInput
        value={value}
        setValue={setValue}
        onSubmit={() => {
          if (!value.trim() || isLoading) return;
          setIsLoading(true);
          setTimeout(() => {
            setIsLoading(false);
          }, 2000);
        }}
        isLoading={isLoading}
      >
        <PromptInputTextArea placeholder="Ask me anything..." />
        <PromptInputActions>
          <PromptInputAttachments />
          <PromptInputButton />
        </PromptInputActions>
      </PromptInput>
    </div>
  );
}

export default function PromptInputDemo() {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <ComponentPreviewCard
        component={
          <PromptInputDemoContent
            value={value}
            setValue={setValue}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        }
        code="promptInputExample"
      />
      <Installation
        CLILink={CommandLink}
        code="promptInput"
        path="components/ui/promptInput.tsx"
      />
      <h6 className="mt-14 text-[20px] font-semibold">API Reference</h6>
      <p className="mb-4 mt-0">Reference for all public props available on this component.</p>
      <PropsTable
        title="PromptInput Props"
        data={promptInputProps}
      />
      <PropsTable
        title="promptInputTextArea Props"
        data={promptInputTextAreaProps}
      />
    </>
  );
}
