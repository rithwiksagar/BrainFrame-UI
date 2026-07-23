import { ReactNode } from "react";
import CodeBlock from "./codeblock";

interface ComponentPreviewCardProps {
  component: ReactNode;
  code: string;
}

export default function ComponentPreviewCard({
  component,
  code,
}: ComponentPreviewCardProps) {
  return (
    <div className="w-84 md:w-158 h-180 md:h-200 bg-neutral-200 rounded-2xl p-2 grid grid-rows-2 gap-4 min-h-0 dark:bg-neutral-800 -mx-2">
      <div className="bg-background rounded-xl flex items-center justify-center dark:bg-neutral-900/80">
        {component}
      </div>

      <div className="bg-background rounded-xl overflow-auto min-h-0 dark:bg-neutral-900/80">
        <CodeBlock name={code} />
      </div>
    </div>
  );
}