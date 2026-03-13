"use client";

import { CircleCheck, Copy } from "lucide-react";
import { useState } from "react";

export function CopyButton() {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={async () => {
        await navigator.clipboard.writeText("npx brainframe init");
        setCopied(true)
      }}
    >
      {!copied && <Copy className="size-4 text-neutral-500 cursor-pointer"  />}
      {copied && <CircleCheck className="size-4.5 text-neutral-300 cursor-pointer" />}
    </button>
  );
}
