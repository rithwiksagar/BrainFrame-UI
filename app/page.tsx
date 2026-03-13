import Link from "next/link";

export default function Home() {
  return (
    <div className="mt-44 lg:ml-20 flex-1">
      <h1 className="text-3xl lg:text-4xl">
        Build AI Interfaces faster with{" "}
        <span className="font-medium  tracking-wide">BrainFrame</span>
      </h1>
      <h4 className="text-lg md:text-xl lg:text-2xl mt-2 text-neutral-500">
        Composable UI components built for AI applications.
        <span className="hidden md:block">
          Simple to integrate, easy to customize, and ready for production.
        </span>
      </h4>
      <div className="flex gap-4 mt-6">
        <Link
          href={"/docs/introduction"}
          className=" bg-neutral-900 dark:bg-white/95 text-white/90 hover:bg-neutral-900/95 dark:hover:bg-white/90
         dark:text-neutral-900 border border-neutral-700/20 px-3 lg:px-4 rounded-4xl text-[15px] lg:text-[18px] cursor-pointer
         flex items-center"
        >
          Get Started
        </Link>
        <Link
          href={"/docs/modelselector"}
          className=" dark:bg-neutral-900 border border-neutral-700/40 
        py-2 px-3 lg:px-5 rounded-4xl text-[15px] lg:text-[18px] cursor-pointer hover:bg-white/90 dark:hover:bg-neutral-900/70"
        >
          View Components
        </Link>
      </div>
    </div>
  );
}
