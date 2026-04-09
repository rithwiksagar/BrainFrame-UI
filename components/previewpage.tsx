"use client"
import { PreviewPageProvider, usePreviewContext } from "@/hooks/usePreviewContext";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { CopyButton } from "./copybutton";




function PreviewPageContent({ children }: { children: ReactNode }) {
  const { preview, setPreview } = usePreviewContext();
  return (
    <div className="">
      <div className="flex space-x-3 my-2 mr-10">
        <button
          className={`font-medium cursor-pointer ${preview ? "text-black dark:text-white " : "text-neutral-400"}`}
          onClick={() => {
            setPreview(true);
          }}
        >
          Preview
        </button>
        <button
          className={`font-medium cursor-pointer ${!preview ? "text-black dark:text-white " : "text-neutral-400"}`}
          onClick={() => {
            setPreview(false);
          }}
        >
          Usage
        </button>
      </div>
      <div
        className="h-96 w-80 md:w-132 md:h-110 pb-1 md:pb-2 border dark:border-neutral-800/80
           border-neutral-300
           rounded-xl overflow-scroll [scrollbar-width:none] relative"
      >
        {children}
      </div>
    </div>
  );
}

export default function PreviewPage({ children }: { children: ReactNode }) {
  return (
    <PreviewPageProvider>
      <PreviewPageContent>{children}</PreviewPageContent>
    </PreviewPageProvider>
  );
}
