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

const CommandLink: string = "https://brainframeui.tech/r/prompt-input.json";

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
    <Installation CLILink={CommandLink} code=""/>
    </>
  );
}
