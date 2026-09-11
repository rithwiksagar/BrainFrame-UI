"use client";
import { motion } from "motion/react";
import { ReactNode, useEffect, useRef, useState } from "react";

function MosaicTextActions({ children }: { children?: String }) {
  const [selectedText, setSelectedText] = useState("");
  const [coordinates, setCoordinates] = useState({ top: 0, left: 0 });
  const [showActions, setShowActions] = useState(false);
  const textRef = useRef<null | HTMLDivElement>(null);
  useEffect(() => {
    function handleSelectionChange() {
      const selection = window.getSelection();

      if (
        !selection ||
        selection.isCollapsed ||
        selection.rangeCount === 0 ||
        !selection.toString().trim()
      ) {
        setShowActions(false);
        return;
      }
      const selectedText = selection.toString();
      if (!selectedText.trim()) return;
      setShowActions(true);
      const range = selection.getRangeAt(0);
      const startRange = range.cloneRange();
      startRange.collapse(true);

      if (!textRef.current) return;
      const TextTop = textRef.current.getBoundingClientRect().height;
      const selectionRect = startRange.getBoundingClientRect();
      setSelectedText(selectedText);
      if (TextTop < selectionRect.top) {
        setCoordinates({
          top: selectionRect.top - 45,
          left: selectionRect.left,
        });
      } else {
        setCoordinates({
          top: range.getBoundingClientRect().bottom + 6,
          left: selectionRect.left,
        });
      }
    }

    document.addEventListener("selectionchange", handleSelectionChange);

    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
    };
  }, []);

  return (
    <div ref={textRef}>
      {children}

      {showActions && selectedText && (
        <div
          className="fixed z-50 flex items-center overflow-hidden rounded-lg border-neutral-200/80 bg-white text-sm font-medium text-neutral-700 shadow-[0_3px_10px_rgb(0,0,0,0.2)] backdrop-blur dark:border-neutral-700/80 dark:bg-neutral-900/95 dark:text-neutral-200"
          style={{ top: coordinates.top, left: coordinates.left }}
        >
          <button
            type="button"
            className="select-none rounded-l-md px-3 py-2.5 transition-colors hover:bg-neutral-100 hover:text-neutral-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white cursor-pointer"
            onClick={() => {
              console.log("Ask AI:", selectedText);
              setShowActions(false);
            }}
          >
            Add to chat
          </button>
          <span
            className="h-10 w-px bg-neutral-200 dark:bg-neutral-700"
            aria-hidden="true"
          />
          <button
            type="button"
            className="select-none rounded-r-md px-3 py-2.5 transition-colors hover:bg-neutral-100 hover:text-neutral-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white cursor-pointer"
            onClick={() => {
              console.log("Ask AI:", selectedText);
              setShowActions(false);
            }}
          >
            Ask AI
          </button>
        </div>
      )}
    </div>
  );
}

export { MosaicTextActions };
