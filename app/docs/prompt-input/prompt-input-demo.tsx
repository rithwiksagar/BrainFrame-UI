"use client";
import {
  PromptInput,
  PromptInputActions,
  PromptInputAttachments,
  PromptInputButton,
  PromptInputTextArea,
} from "@/registry/new-york/prompt-input/PromptInput";

import PreviewPage from "@/components/previewpage";
import { useState } from "react";
import CommandBlock from "@/components/commandblock";
import CodeBlockClient from "@/components/codeblock";
import { usePreviewContext } from "@/hooks/usePreviewContext";

const CommandLink: string = "https://brain-frame-ui.vercel.app/r/prompt-input.json";

function PromptInputDemoContent({ value, setValue, isLoading, setIsLoading }: any) {
  const { preview } = usePreviewContext();

  return (
    <div className="flex flex-col justify-end items-center">
      { preview ? <PromptInput
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
      : <div className="ml-60 md:ml-0"><CodeBlockClient code={`"use client";
import { PromptInput, PromptInputActions, PromptInputAttachments, PromptInputButton,
PromptInputTextArea} from "@/components/ai/PromptInput";
export default function PromptInputExample() {
  return (
    <PromptInput
      value={value}
      setValue={setValue}
      onSubmit={handlesubmit}
      isLoading={isLoading}
    >
      <PromptInputTextArea placeholder="Ask me" />
      <PromptInputActions>
        <PromptInputAttachments />
        <PromptInputButton />
      </PromptInputActions>
    </PromptInput>
  );
}`}/>
</div>}
    </div>
  );
}

export default function PromptInputDemo() {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
    <PreviewPage>
      <PromptInputDemoContent value={value} setValue={setValue} isLoading={isLoading} setIsLoading={setIsLoading} />
    </PreviewPage>
    <h6 className="mt-6 mb-2 text-lg ml-1">Installation</h6>
    <CommandBlock CommandLink={CommandLink}/>
    </>
  );
}
