import { useEffect, useState } from "react";

export default function CodeBlockClient({ code }: { code: string }) {
  const [html, setHtml] = useState("");

  useEffect(() => {
    import("shiki").then(async (shiki) => {
      const result = await shiki.codeToHtml(code, {
        lang: "tsx",
        theme: "material-theme-palenight",
        transformers: [
          {
            pre(node) {
              node.properties.style = "";
            },
          },
        ],
      });

      setHtml(result);
    });
  }, [code]);

  return (
    <div className="dark:h-120 dark:bg-neutral-900 p-4 rounded-2xl overflow-clip">
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
