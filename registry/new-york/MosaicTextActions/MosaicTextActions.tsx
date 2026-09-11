"use client";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

function MosaicTextActions({
  children,
  className,
  actions
}: {
  children: String;
  className?: string;
  actions: {label: string, onClick: (text: string)=> void}[]
}) {
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
          className={cn(
            "fixed z-50 flex items-center overflow-hidden rounded-lg border-neutral-200/80 bg-white text-sm font-medium text-neutral-700 shadow-[0_3px_10px_rgb(0,0,0,0.2)] backdrop-blur dark:border-neutral-700/80 dark:bg-neutral-900/95 dark:text-neutral-200",
            className,
          )}
          style={{ top: coordinates.top, left: coordinates.left }}
        >
          {actions.map((action, index) => (
            <div key={action.label} className="flex items-center">
              <button
                type="button"
                className={cn(
                  "select-none px-3 py-2.5 transition-colors hover:bg-neutral-100 hover:text-neutral-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white cursor-pointer",
                  index === 0 && "rounded-l-md",
                  index === actions.length - 1 && "rounded-r-md",
                )}
                onClick={() => {
                  action.onClick(selectedText);
                  setShowActions(false);
                }}
              >
                {action.label}
              </button>
              {index < actions.length - 1 && (
                <span
                  className="h-10 w-px bg-neutral-200 dark:bg-neutral-700"
                  aria-hidden="true"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export { MosaicTextActions };
