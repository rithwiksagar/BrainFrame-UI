"use client";

import { CircleCheck, Copy } from "lucide-react";
import { easeOut, motion } from "motion/react";
import { useState } from "react";

export function CopyButton({content}: {content: string}) {
  const [copied, setCopied] = useState(false);
  return (
    <motion.button
      whileTap={{
        scale: 0.9,
        opacity: 0,
        filter: "blur(4px)"
      }}
      transition={{
        duration: 0.2,
        ease: easeOut,
      }}
      onClick={async () => {
        await navigator.clipboard.writeText(content);
        setCopied(true);
        setTimeout(()=>{setCopied(false)},5000)
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
