"use client"
import { useEffect, useState } from "react";
import { CopyButton } from "./copybutton";

export default function CodeBlockClient({ code }: { code: string }) {
  const [html, setHtml] = useState("");
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);

    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("dark");
      setIsDark(isDark);
    });

    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    import("shiki").then(async (shiki) => {
      const result = await shiki.codeToHtml(code, {
        lang: "tsx",
        theme: isDark ? "github-dark" : "github-light",
        transformers: [
          {
            pre(node) {
              node.properties.style = "";
              node.properties.className = "";
            },
            span(node) {
              if (node.properties.style && typeof node.properties.style === 'string') {
                node.properties.style = node.properties.style
                  .replace(/background-color:[^;]+;?/g, "")
                  .trim();
              }
            },
          },
        ],
      });

      setHtml(result);
    });
  }, [code, isDark]);

  return (
    <div className="w-fit ml-4 overflow-scroll [scrollbar-width:none]">
      <div
        className="text-md [&_pre]:bg-transparent [&_pre]:p-0 [&_code]:bg-transparent [&_span]:bg-transparent"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
