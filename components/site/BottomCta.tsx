import { motion, spring } from "motion/react";

export default function BottomCTA() {
  return (
    <section className="relative overflow-hidden my-60">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-2xl font-medium tracking-tighter text-neutral-800 dark:text-neutral-200">
          Notify me
        </h2>

        <p className="mx-auto mt-2 max-w-xl text-base leading-7 text-neutral-500">
          Production-ready React and Next.js components for modern AI
          applications. Copy, customize, and ship.
        </p>

        <form className="mt-8 space-x-2">
          <motion.input
            whileHover={{ width: 300 }}
            whileFocus={{ width: 300 }}
            placeholder="you@gmail.com"
            className="w-50 border border-neutral-200 p-3 rounded-2xl placeholder:text-neutral-300 outline-none dark:border-neutral-800 dark:placeholder:text-neutral-600"
          ></motion.input>
          <motion.button
            whileHover={{
              width: 140,
              transition: { type: spring, bounce: 0.5 },
            }}

            className="rounded-2xl px-4 py-3 bg-blue-500 text-white"
          >
            Notify me
          </motion.button>
        </form>
        <p className="mt-4 text-xs text-neutral-400">
          No spam. Just the launch.
        </p>
      </div>
    </section>
  );
}
