"use client";

import { easeOut, motion, spring } from "motion/react";
import { useEffect, useState } from "react";

const tokens = [
  "The",
  " future",
  " of",
  " AI",
  " is",
  " not",
  " just",
  " about",
  " models.",
  " It's",
  " about",
  " how",
  " we",
  " use",
  " them.",
  "The",
  " future",
  " of",
  " AI",
  " is",
  " not",
  " just",
  " about",
  " models.",
  " It's",
  " about",
  " how",
  " we",
  " use",
  " them.",
  "The",
  " future",
  " of",
  " AI",
  " is",
  " not",
  " just",
  " about",
  " models.",
  " It's",
  " about",
  " how",
  " we",
  " use",
  " them.",
];

function MosaicStreaming() {
  const [response, setResponse] = useState("");
  const [newToken, setNewToken] = useState("");

  useEffect(() => {
    setNewResponse();
  }, []);

  async function setNewResponse() {
    for (const token of tokens) {
      setNewToken(token);
      await new Promise((resolve) => setTimeout(resolve, 20));
      setResponse((r) => r + token);
      setNewToken("")
    }
  }

  return (
    <div className="text-black">
      <span>{response}</span>
      <motion.span 
      key={newToken}
      initial={{filter:"opacity:0"}}
      animate={{filter:"opacity:1"}}
      transition={{ease: [0.16, 1, 0.3, 1]}}
      >{newToken}</motion.span>
    </div>
  );
}

export { MosaicStreaming };
