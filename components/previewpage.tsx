import { ReactNode } from "react";

export default function PreviewPage({ children }: { children: ReactNode }) {
  return (
    <div className="">
      <div className="flex space-x-3 my-2">
        <h6 className="font-medium dark:text-white">Preview</h6>
        <h6 className="text-neutral-400 font-medium">Usage</h6>
      </div>
      <div
        className="h-100 md:h-130 border dark:border-neutral-800/80
             border-neutral-300
             rounded-xl flex justify-center items-center"
      >
        {children}
      </div>
    </div>
  );
}
