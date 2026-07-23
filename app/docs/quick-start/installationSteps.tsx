"use client";

import { motion } from "motion/react";
import { useState } from "react";
import ManualInstallation from "../../../components/mdx/ManualInstallation.mdx"
import CLIInstallation from "../../../components/mdx/CLIInstallation.mdx"


export default function InstallationSteps() {
  const [isDefault, setIsDefault] = useState(true);
  return (
    <div>
      <div className="flex gap-4 text-lg font ">
        <div
          onClick={() => {
            setIsDefault(true);
          }}
          className={`cursor-pointer px-1 relative`}
        >
          CLI{" "}
          {isDefault && (
            <motion.div
              layoutId="underline"
              className="absolute left-0 right-0 -bottom-1 h-[2px] bg-black dark:bg-white"
            ></motion.div>
          )}
        </div>
        <div
          onClick={() => {
            setIsDefault(false);
          }}
          className={`cursor-pointer px-1 relative`}
        >
          Manual{" "}
          {!isDefault && (
            <motion.div
              layoutId="underline"
              className="absolute left-0 right-0 -bottom-1 h-[2px] bg-black dark:bg-white"
            ></motion.div>
          )}
        </div>
      </div>
      <div className="h-fit w-80 md:w-136">
        {isDefault ? (
          <CLIInstallation />
        ) : (
            <ManualInstallation />
        )}
      </div>
    </div>
  );
}
