import UseToggleTheme from "@/hooks/UseToggleTheme";
import { Github } from "lucide-react";
import { ThemeProvider } from "next-themes";
import Link from "next/link";

export default function TopBar() {
  return (
    <div className="flex w-screen z-10 px-15 py-3 justify-between items-center border-b border-neutral-700/15 backdrop-blur-xs fixed left-0 top-0">
    <div className="">
      <Link href={"/"} className="text-2xl font-medium font-serif tracking-wide">BrainFrame</Link>
    </div>
      <div className="flex gap-6">
        <Link href="https://github.com/rithwiksagar/Zero2"><Github className="size-4.5"/></Link>
        <div className="flex justify-center items-center">
        <ThemeProvider attribute="class">
          <UseToggleTheme />
        </ThemeProvider>
        </div>
      </div>
    </div>
  );
}
