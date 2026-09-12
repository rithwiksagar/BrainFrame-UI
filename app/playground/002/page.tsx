"use client";
import { MosaicTextActions } from "@/registry/new-york/MosaicTextActions/MosaicTextActions";
import { ArrowUp, Square } from "lucide-react";
import { useState } from "react";

const Message = `Somewhere, right now, a person is looking at the same moon you are, even though you may never meet. They might be celebrating something, worrying about tomorrow, listening to music, or simply staring out a window.It’s strange how enormous the world is, yet tiny moments can connect people without either of them knowing. A song, a smell after rain, an old photograph, or even the moon can become a quiet reminder that everyone is carrying a story you’ll probably never hear.And maybe that’s what makes ordinary life so interesting: there are billions of stories happening simultaneously, most of them completely invisible to us.And maybe that’s what makes ordinary life so interesting: there are billions of stories happening simultaneously, most of them completely invisible to us.
`;

export default function Play() {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(value: string) {
    if (!value.trim() || isLoading) return;

    setValue("");
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-3xl relative text-justify text-xl whitespace-pre-wrap mask-[linear-gradient(to_bottom,black_0%,black_5%,transparent_100%)]">
        <MosaicTextActions
          actions={[
            {
              label: "Add to chat",
              onClick: (text) => {
                setValue(value + text);
              },
            },
            {
              label: "Ask AI",
              onClick: (text) => {
                handleSubmit(text);
              },
            },
          ]}
        >
          {Message}
        </MosaicTextActions>
      </div>
      <div className="bg-neutral-100 border border-neutral-200 fixed bottom-10 left-50% flex w-xl h-12 items-center rounded-full px-2 py-2.5">
        <textarea
          value={value}
          placeholder="Ask me anything..."
          onChange={(e) => setValue(e.target.value)}
          onSubmit={() => handleSubmit(value)}
          className="h-8 flex-1 self-center resize-none py-1 px-2.5 outline-none placeholder:text-neutral-300 overflow-hidden"
        ></textarea>
        <button
          type="button"
          onClick={() => handleSubmit(value)}
          disabled={isLoading}
          className="flex size-8 items-center justify-center rounded-full bg-black p-1 text-white disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <Square className="size-4 fill-white" />
          ) : (
            <ArrowUp className="size-4" />
          )}
        </button>
      </div>
    </div>
  );
}
