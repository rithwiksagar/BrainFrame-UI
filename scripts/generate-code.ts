import fs from "fs/promises";
import path from "path";
import { createHighlighter } from "shiki";

async function generate() {
  const examplesDir = path.join(process.cwd(), "code");
  const outputDir = path.join(process.cwd(), "public", "generated");

  await fs.mkdir(outputDir, { recursive: true });

  const highlighter = await createHighlighter({
    themes: ["github-dark", "github-light"],
    langs: ["tsx"],
  });

  const files = await fs.readdir(examplesDir);

  for (const file of files) {
    if (!file.endsWith(".txt")) continue;

    const code = await fs.readFile(
      path.join(examplesDir, file),
      "utf8"
    );

    const clean = (html: string) =>
      html
        .replace(/background-color:[^;"]+;?/g, "")
        .replace(/background:[^;"]+;?/g, "");

    const dark = clean(
      highlighter.codeToHtml(code, {
        lang: "tsx",
        theme: "github-dark",
      })
    );

    const light = clean(
      highlighter.codeToHtml(code, {
        lang: "tsx",
        theme: "github-light",
      })
    );

    await fs.writeFile(
      path.join(outputDir, file.replace(".txt", ".json")),
      JSON.stringify(
        {
          code,
          dark,
          light,
        },
        null,
        2
      )
    );
  }
}

generate().catch(console.error);