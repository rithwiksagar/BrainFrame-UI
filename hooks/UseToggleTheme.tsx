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
      className="cursor-pointer flex items-center">
        {resolvedTheme === "dark" ? (
          <>
            <Moon className="size-4 text-white/90" />
          </>
        ) : (
          <>
            <Sun className="size-4 bg text-neutral-900" />
          </>
        )}
    </button>
  );
}
