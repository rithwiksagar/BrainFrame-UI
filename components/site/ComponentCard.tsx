import { motion } from "motion/react";

export default function ComponentCard() {
  return (
    <motion.div
      whileHover="hover"
      className="w-full h-64 rounded-2xl bg-neutral-200/30 border border-neutral-200 dark:border-neutral-800 dark:bg-neutral-900 p-2"
    >
      <motion.div
        variants={{
          hover: {
            height: "calc(100% - 2rem)",
          },
        }}
        transition={{
          duration: 0.15,
        }}
        className="w-full h-full bg-background rounded-xl border border-neutral-200 dark:bg-neutral-800 dark:border-neutral-700"
      ></motion.div>
    </motion.div>
  );
}
