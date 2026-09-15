import { motion, spring } from "motion/react";
import { CopyButton } from "./CopyButton";
import Link from "next/link";

export default function Hero() {
  const MotionLink = motion(Link);
  return (
    <div className="mt-60 flex flex-col items-center px-6">
      <div className="flex flex-col items-center justify-center gap-8 text-center">
        <div className="flex max-w-3xl flex-col items-center text-center">
          <h1 className="text-3xl md:text-6xl font-medium leading-tight tracking-tighter text-neutral-800 dark:text-neutral-100 ">
            Build Better AI Interfaces
          </h1>

          <p className="mt-3 text-md md:text-xl leading-4 md:leading-6 tracking-tighter text-neutral-600 dark:text-neutral-400">
            <span className="mt-2 block">
              High-quality React and Next.js components
            </span>
            <span className="mt-2 block">
              Built to be copied, customized, and shipped
            </span>
            <span className="mt-2 block">Free to use in your projects</span>
          </p>
        </div>
      </div>
      <div className="mt-32 flex flex-col md:flex-row items-center gap-4 md:gap-1">
        <motion.div
          whileHover={{ width: 340, transition: { type: spring, bounce: 0.5 } }}
          className="flex items-center gap-1 text-sm md:w-72 justify-center rounded-xl md:rounded-2xl bg-muted px-4 py-2 md:py-3 text-neutral-500 dark:bg-neutral-900 dark:text-neutral-300 "
        >
          <span>npx create-brainframe-ui@latest</span>
          <CopyButton content="" />
        </motion.div>
        <MotionLink
          href="/docs/introduction"
          whileHover={{ width: 140, transition: { type: spring, bounce: 0.5 } }}
          className="rounded-2xl px-4 py-2 md:py-3 bg-blue-500 text-white flex justify-center"
        >
          Get started
        </MotionLink>
      </div>
    </div>
  );
}
