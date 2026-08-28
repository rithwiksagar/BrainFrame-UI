import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { FaReact } from "react-icons/fa";
import { RiTailwindCssFill } from "react-icons/ri";
import { SiFramer, SiNextdotjs } from "react-icons/si";

const Tools = [
  {
    title: "Next JS",
    icon: <SiNextdotjs />,
  },
  {
    title: "React",
    icon: <FaReact />,
  },
  {
    title: "Tailwind",
    icon: <RiTailwindCssFill />,
  },
  {
    title: "Motion",
    icon: <SiFramer />,
  },
];
export default function Home() {
  return (
    <main className="min-h-screen w-full bg-background text-foreground relative">
      <Navbar />

      <section className="px-4 md:px-28 pt-28 md:pt-40">
        <div className="max-w-[560px]">
          <h1 className="text-3xl md:text-5xl font-medium font-serif leading-[1.05] tracking-tight max-w-md md:max-w-xl dark:text-neutral-200">
            Build AI products that don&apos;t look generic
          </h1>

          <p className="mt-4 max-w-xl text-[15px] md:text-lg leading-7 text-neutral-500">
            Premium, production-ready AI components with polished interactions
            and zero styling headaches.
          </p>

          <div className="mt-8 flex items-center gap-4">
            <Link
              href="/docs/introduction"
              className={cn(
                "text-neutral-800 bg-neutral-100",
                "shadow-[0_2px_4px_rgba(0,0,0,0.06),0_8px_20px_rgba(0,0,0,0.08)]",
                "hover:bg-neutral-100",
                "active:bg-neutral-900 active:shadow-[0_1px_2px_rgba(0,0,0,0.2),0_3px_8px_rgba(0,0,0,0.2)]",
                "rounded-full px-4 py-2 select-none",
              )}
            >
              Get Started
            </Link>
            <Link
              href="/docs/gooey-input"
              className={cn(
                "bg-neutral-800 text-white dark:text-neutral-200",
                "shadow-[0_2px_4px_rgba(0,0,0,0.2),0_8px_20px_rgba(0,0,0,0.25)]",
                "hover:bg-neutral-700",
                "active:bg-neutral-900 active:shadow-[0_1px_2px_rgba(0,0,0,0.2),0_3px_8px_rgba(0,0,0,0.2)]",
                "rounded-full px-4 py-2 select-none",
              )}
            >
              Components
            </Link>
          </div>
        </div>

        <Chatbot />

        <div className="mt-20 md:mt-54">
          <h6 className="md:hidden flex justify-center mb-6 text-sm text-neutral-400">
            Built With
          </h6>
          <div className="grid grid-cols-2 md:grid-cols-8 gap-4 justify-items-center md:justify-items-start">
            {Tools.map((t) => (
              <div
                key={t.title}
                className="flex items-center md:gap-1 gap-2 text-md md:text-xl text-neutral-500 dark:text-neutral-300 hover:text-neutral-800"
              >
                <span>{t.icon}</span>
                {t.title}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}


//navbar
function Navbar() {
  return (
    <nav className="w-screen md:w-5xl flex items-center justify-between px-4 md:px-28 py-7 font-mono text-neutral-700 dark:text-neutral-300">
      <Link
        href="/"
        className="text-md md:text-xl font-semibold font-mono tracking-tight"
      >
        Brainframe UI
      </Link>

      <div className="flex items-center gap-4 md:gap-8 text-sm">
        <Link href="/docs/introduction">Docs</Link>

        <Link
          href="https://github.com/rithwiksagar/BrainFrame-ui"
          target="_blank"
        >
          Github
        </Link>
      </div>
    </nav>
  );
}


//right side chat box 
function Chatbot() {
  return (
    <div className="mt-20 md:mt-auto md:absolute md:right-0 md:top-0 h-120 md:h-screen md:w-120 rounded-lg bg-white dark:bg-neutral-800 p-1 md:p-2.5 select-none">
      <div className="relative h-full w-full overflow-hidden rounded-lg shadow-xl">
        <Image
          src="/image.png"
          alt="Brainframe UI"
          fill
          className="object-cover md:translate-y-24 scale-125 opacity-100 dark:opacity-90"
          priority
        />
      </div>
    </div>
  );
}
