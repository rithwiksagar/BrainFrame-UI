"use client";

import { useEffect, useState } from "react";

let shikiInstance: any = null;

export default function CodeBlockClient({ code }: { code: string }) {
  const [html, setHtml] = useState("");
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const updateTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    async function highlight() {
      if (!shikiInstance) {
        const { createHighlighter } = await import("shiki");

        shikiInstance = await createHighlighter({
          themes: ["github-dark", "github-light"],
          langs: ["tsx"],
        });
      }

      const html = shikiInstance.codeToHtml(code.trimStart(), {
        lang: "tsx",
        theme: isDark ? "github-dark" : "github-light",
        transformers: [
          {
            pre(node: any) {
              node.properties.style = "";
              node.properties.className = "";
            },
            span(node: any) {
              if (
                typeof node.properties.style === "string"
              ) {
                node.properties.style = node.properties.style
                  .replace(/background-color:[^;]+;?/g, "")
                  .trim();
              }
            },
          },
        ],
      });

      setHtml(html);
    }

    highlight();
  }, [code, isDark]);

  return (
    <div className="w-full px-4">
      <div
  className="
    text-sm
    [&_pre]:!m-0
    [&_pre]:!mt-0
    [&_pre]:!pt-4
    [&_pre]:bg-transparent
    [&_pre]:overflow-visible
    [&_pre]:whitespace-pre
    [&_code]:bg-transparent
    [&_span]:bg-transparent
  "
  dangerouslySetInnerHTML={{ __html: html }}
/>
    </div>
  );
}