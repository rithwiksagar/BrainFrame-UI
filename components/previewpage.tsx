import { ReactNode, useState } from "react";

export default function PreviewPage({ children }: { children: ReactNode }) {
  const [preview,setPreview] = useState(true);
  return (
    <div className="">
      <div className="flex space-x-3 my-2 mr-10">
        <button className={`font-medium cursor-pointer ${preview ? "text-black dark:text-white ":"text-neutral-400"}`} onClick={()=>{setPreview(true)}}>Preview</button>
        <button className={`font-medium cursor-pointer ${!preview  ? "text-black dark:text-white ":"text-neutral-400"}`} onClick={()=>{setPreview(false)}}>Usage</button>
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
