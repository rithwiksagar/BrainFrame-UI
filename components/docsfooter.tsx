import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

interface FooterProps {
  prevHref: string;
  nextHref: string;
  prevTitle: ReactNode;
  nextTitle: ReactNode;
}
export function DocsFooter({
  prevHref,
  nextHref,
  prevTitle,
  nextTitle,
}: FooterProps) {
  return (
    <div className="flex w-78 md:w-132 justify-between mt-20">
      <Link
        href={prevHref}
        className="px-3 border inline-flex justify-center items-center gap-1
        rounded-md dark:text-neutral-500 no-underline
     dark:border-neutral-800/80 border-neutral-300 text-neutral-500 font-extralight text-[15px]"
      >
        <ArrowLeft className="size-3.5" />
        {prevTitle}
      </Link>
      <Link
        href={nextHref}
        className="px-3 border inline-flex justify-center items-center gap-1
        rounded-md dark:text-neutral-500 no-underline
     dark:border-neutral-800/80
      border-neutral-300 text-neutral-600 font-extralight text-[15px]"
      >
        {nextTitle}
        <ArrowRight className="size-3.5" />
      </Link>
    </div>
  );
}
