"use client";
import {
  ModelContent,
  ModelInput,
  ModelItems,
  ModelSelector,
  ModelTrigger,
} from "@/components/ai/ModelSelector";
import CodeBlockClient from "@/components/codeblock";
import CommandBlock from "@/components/commandblock";
import PreviewPage from "@/components/previewpage";
import { ModelSelectorCode } from "@/constants";
import { usePreviewContext } from "@/hooks/usePreviewContext";

import { ReactNode, useContext, useState } from "react";

type modelsType = {
  chef: string;
  id: string;
  names: string[];
};

const models: modelsType[] = [
  {
    chef: "OpenAI",
    id: "gpt",
    names: ["GPT-4o", "GPT-4o Mini", "o1", "o1 Mini"],
  },
  {
    chef: "Anthropic",
    id: "claude",
    names: [
      "Claude 4 Opus",
      "Claude 4 Sonnet",
      "Claude 3.5 Sonnet",
      "Claude 3.5 Haiku",
    ],
  },
  {
    chef: "Google",
    id: "gemini-2.0-flash-exp",
    names: ["Gemini 2.0 Flash", "Gemini 1.5 Pro", "Gemini 1.5 Flash"],
  },
  {
    chef: "Meta",
    id: "llama-3.3-70b",
    names: ["Llama 3.3 70B", "Llama 3.1 405B", "Llama 3.1 70B", "Llama 3.1 8B"],
  },
  {
    chef: "DeepSeek",
    id: "deepseek-r1",
    names: ["DeepSeek R1", "DeepSeek V3", "DeepSeek Coder V2"],
  },
  {
    chef: "Mistral AI",
    id: "mistral-large",
    names: ["Mistral Large", "Mistral Small"],
  },
];
const CommandLink: string = "https://brain-frame-ui.vercel.app/r/model-selector.json";
function ModelSelectorDemoContent({ defaultModel, setDefaultModel }: any) {
  const { preview } = usePreviewContext();
  return (
    <>
    <div className="flex justify-center items-center md:h-200 h-94">
      {preview ? <ModelSelector
        models={models}
        defaultModel={defaultModel}
        setDefaultModel={setDefaultModel}
      >
        <ModelTrigger />
        <ModelContent>
          <ModelInput />
          <ModelItems />
        </ModelContent>
      </ModelSelector>
        : <CodeBlockClient code={ModelSelectorCode}/>}
    </div>
    </>
  );
}

export default function ModelSelectorDemo() {
  const [defaultModel, setDefaultModel] = useState("GPT-4o");
  return (
    <>
      <PreviewPage>
        <ModelSelectorDemoContent defaultModel={defaultModel} setDefaultModel={setDefaultModel} />
      </PreviewPage>
      <h6 className="mt-6 mb-2 text-xl ml-1">Installation</h6>
      <CommandBlock CommandLink={CommandLink} />
    </>
  );
}
