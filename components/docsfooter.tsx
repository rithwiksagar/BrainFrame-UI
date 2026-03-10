import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

interface FooterProps {
    prevHref : string,
    nextHref: string,
    prevTitle: ReactNode,
    nextTitle: ReactNode
} 
export function DocsFooter ({prevHref, nextHref, prevTitle, nextTitle}: FooterProps) {
    return <div className="flex justify-between mt-20">
    <Link href={prevHref} className="px-3 border inline-flex justify-center items-center gap-1
     dark:border-neutral-800 rounded-md dark:text-neutral-400 no-underline
     border-neutral-300 text-neutral-600/90">
        <ArrowLeft className="size-4"/>
        {prevTitle}
    </Link>
        <Link href={nextHref} className="px-3 border inline-flex justify-center items-center gap-1
     dark:border-neutral-800 rounded-md dark:text-neutral-400 no-underline
     border-neutral-300 text-neutral-600/90">
        {nextTitle}
        <ArrowRight className="size-4"/>
    </Link>
    </div>

} 