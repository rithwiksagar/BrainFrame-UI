"use client";

import { useEffect, useState } from "react";
import { CopyButton } from "./copybutton";

type HighlightedCode = {
  code: string;
  dark: string;
  light: string;
};

export default function CodeBlock({
  name,
}: {
  name: string;
}) {
  const [data, setData] = useState<HighlightedCode | null>(null);
  const [html, setHtml] = useState("");

  

  useEffect(() => {
    let observer: MutationObserver;

    async function load() {
      const res = await fetch(`/generated/${name}.json`);
      const json: HighlightedCode = await res.json();

      setData(json);

      const updateTheme = () => {
        const isDark =
          document.documentElement.classList.contains("dark");

        setHtml(isDark ? json.dark : json.light);
      };

      updateTheme();

      observer = new MutationObserver(updateTheme);

      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      });
    }

    load();

    return () => observer?.disconnect();
  }, [name]);

  const copy = async () => {
    if (!data) return;

    await navigator.clipboard.writeText(data.code);
  };

  return (
  <div className="relative h-full w-full min-h-0">
    {data && (
      <div className="absolute top-4 right-4 z-20">
        <CopyButton content={data.code} />
      </div>
    )}

    <div className="h-full overflow-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      <div
        className="
          h-full
          w-full
          min-h-0
          overflow-visible
          px-4
          pt-12

          [&_pre]:m-0!
          [&_pre]:h-full!
          [&_pre]:overflow-visible!
          [&_pre]:bg-transparent!

          [&_code]:!bg-transparent
          [&_span]:!bg-transparent
        "
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  </div>
);


}