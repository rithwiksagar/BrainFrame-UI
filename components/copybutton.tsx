"use client";

import { CircleCheck, Copy } from "lucide-react";
import { easeOut, motion } from "motion/react";
import { useState } from "react";

export function CopyButton() {
  const [copied, setCopied] = useState(false);
  return (
    <motion.button
      whileTap={{
        scale: 0.98,
        opacity: 0,
      }}
      transition={{
        duration: 0.2,
        ease: easeOut,
      }}
      onClick={async () => {
        await navigator.clipboard.writeText("npx brainframe init");
        setCopied(true);
      }}
    >
      {!copied && (
        <Copy className="size-4 text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300 cursor-pointer" />
      )}
      {copied && (
        <CircleCheck className="size-4.5 text-neutral-600 dark:text-neutral-300 cursor-pointer" />
      )}
    </motion.button>
  );
}
