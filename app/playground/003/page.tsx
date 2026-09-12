import {
  MosiacCitations,
  Source,
  type SourceData,
} from "@/registry/new-york/MosaicCitations/MosiacCitations";

const sources: SourceData[] = [
  {
    title: "React Documentation",
    description:
      "The official React documentation covering components, hooks, state management, and modern React patterns.",
    url: "https://react.dev",
    favicon: "https://react.dev/favicon.ico",
  },
  {
    title: "Next.js Documentation",
    description:
      "Official Next.js documentation for building full-stack React applications with routing, rendering, and data fetching.",
    url: "https://nextjs.org/docs",
    favicon: "https://nextjs.org/favicon.ico",
  },
  {
    title: "TypeScript Handbook",
    description:
      "A comprehensive guide to TypeScript covering types, interfaces, generics, functions, and advanced type patterns.generics, functions, and advanced",
    url: "https://www.typescriptlang.org/docs/",
    favicon: "https://www.typescriptlang.org/favicon-32x32.png",
  },
  {
    title: "MDN Web Docs",
    description:
      "Web platform documentation covering HTML, CSS, JavaScript, browser APIs, and other core web technologies.",
    url: "https://developer.mozilla.org",
    favicon: "https://developer.mozilla.org/favicon.ico",
  },
];

export default function Play() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <MosiacCitations sources={sources}>
        <Source />
      </MosiacCitations>
    </div>
  );
}
