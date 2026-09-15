"use client";
import { CopyButton } from "@/components/site/CopyButton";
import NavBar from "@/components/site/NavBar";
import { motion, spring } from "motion/react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center">
      <NavBar />
      <Hero />
    </div>
  );
}

function Hero() {
  return (
    <div className="mt-44 flex flex-col min-h-screen items-center px-6">
      <div className="flex flex-col items-center justify-center gap-8 text-center">
        <div className="flex max-w-3xl flex-col items-center text-center">
          <h1 className="text-6xl font-medium leading-tight tracking-tighter text-neutral-800">
            Build Better AI Interfaces
          </h1>

          <p className="mt-3 text-xl leading-6 tracking-tighter text-neutral-600">
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
      <div className="mt-32 flex items-center gap-1">
        <motion.div
          whileHover={{ width: 340, transition: { type: spring, bounce: 0.5 } }}
          className="flex items-center gap-1 text-sm w-76 justify-center rounded-2xl bg-neutral-200 px-4 py-3 text-neutral-500"
        >
          <span>npx create-brainframe-ui@latest</span>
          <CopyButton content="" />
        </motion.div>
        <motion.button
          whileHover={{ width: 140, transition: { type: spring, bounce: 0.5 } }}

          className="rounded-2xl px-4 py-3 bg-blue-500 text-white"
        >
          Get started
        </motion.button>
      </div>
    </div>
  );
}
