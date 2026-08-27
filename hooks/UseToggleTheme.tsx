"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function UseToggleTheme() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);

  if (!mount) return null;
  return (

      <button 
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="border rounded-sm flex items-center gap-2 px-2 py-1 border-neutral-300 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 font-medium text-[13px] cursor-pointer">
        {resolvedTheme === "dark" ? (
          <>
            <Moon className="size-4 text-white/90" />
            <span className="border-l border-neutral-300 pl-2 dark:border-neutral-800">
              Dark
            </span>
          </>
        ) : (
          <>
            <Sun className="size-4.5 bg text-neutral-900" />
            <span className="border-l border-neutral-300 pl-2 dark:border-neutral-800">
              Dark
            </span>
          </>
        )}
    </button>
  );
}
