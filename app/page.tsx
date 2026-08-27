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
    title: "Tailwind CSS",
    icon: <RiTailwindCssFill />,
  },
  {
    title: "Motion",
    icon: <SiFramer />,
  },
];
export default function Home() {
  return (
    <main className="min-h-screen w-full bg-foreground text-background relative">
      <Navbar />

      <section className="px-28 pt-40">
        <div className="max-w-[560px]">
          <h1 className="text-5xl font-medium font-serif leading-[1.05] tracking-tight max-w-xl">
            Build AI products that don&apos;t look generic
          </h1>

          <p className="mt-4 max-w-xl text-lg leading-7 text-neutral-500">
            Premium, production-ready AI components with polished interactions
            and zero styling headaches.
          </p>

          <div className="mt-8 flex items-center gap-4">
            <Link
              href="/docs"
              className={cn(
                "text-neutral-800 bg-white",
                "shadow-[0_2px_4px_rgba(0,0,0,0.06),0_8px_20px_rgba(0,0,0,0.08)]",
                "hover:bg-neutral-100",
                "active:bg-neutral-900 active:shadow-[0_1px_2px_rgba(0,0,0,0.2),0_3px_8px_rgba(0,0,0,0.2)]",
                "rounded-full px-4 py-2",
              )}
            >
              Get Started
            </Link>
            <Link
              href="/docs"
              className={cn(
                "bg-neutral-800 text-white",
                "shadow-[0_2px_4px_rgba(0,0,0,0.2),0_8px_20px_rgba(0,0,0,0.25)]",
                "hover:bg-neutral-700",
                "active:bg-neutral-900 active:shadow-[0_1px_2px_rgba(0,0,0,0.2),0_3px_8px_rgba(0,0,0,0.2)]",
                "rounded-full px-4 py-2",
              )}
            >
              Components
            </Link>
          </div>
        </div>

        <div className="absolute right-0 top-0 h-screen w-120 rounded-lg bg-white p-2.5">
          <div className="relative h-full w-full overflow-hidden rounded-lg shadow-xl">
            <Image
              src="/image.png"
              alt="Brainframe UI"
              fill
              className="object-cover translate-y-24 scale-125"
              priority
            />
          </div>
        </div>

        <div className="mt-54">
          <div className="flex items-center gap-8">
            {Tools.map((t) => (
              <div
                key={t.title}
                className="flex items-center gap-2 text-xl text-neutral-500 hover:text-neutral-800"
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

function Navbar() {
  return (
    <nav className="w-5xl flex items-center justify-between px-28 py-7 font-mono">
      <Link href="/" className="text-xl font-semibold font-mono tracking-tight">
        Brainframe UI
      </Link>

      <div className="flex items-center gap-8 text-sm">
        <Link
          href="/docs/introduction"
          className="text-neutral-600 hover:text-black"
        >
          Docs
        </Link>

        <Link
          href="https://github.com/rithwiksagar/brainframeui"
          target="_blank"
          className="text-neutral-600 hover:text-black"
        >
          Github
        </Link>

        <Link href="#sponser" className="text-neutral-600 hover:text-black">
          Sponser
        </Link>
      </div>
    </nav>
  );
}
