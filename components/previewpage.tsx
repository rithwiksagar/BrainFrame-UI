import { ReactNode } from "react";

export default function PreviewPage({ children }: { children: ReactNode }) {
  return (
    <div className="">
      <div className="flex space-x-3 my-2 mr-10">
        <h6 className="font-medium text-black dark:text-white">Preview</h6>
        <h6 className="text-neutral-400 font-medium">Usage</h6>
      </div>
      <div
        className="h-96 w-80 md:w-132 md:h-110 pb-1 md:pb-2 border dark:border-neutral-800/80
             border-neutral-300
             rounded-xl flex justify-center"
      >
        {children}
      </div>
    </div>
  );
}
