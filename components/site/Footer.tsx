import UseToggleTheme from "@/hooks/UseToggleTheme";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";

const componentLinks = [
  { label: "Mosaic Prompt Bar", href: "/playground/001" },
  { label: "Text Actions", href: "/playground/002" },
  { label: "Citations", href: "/playground/003" },
  { label: "Ask AI 001", href: "/playground/00" },
  { label: "Ask AI 002", href: "/playground/" },
  { label: "Streaming Text", href: "/playground/004" },
];

const pageLinks = [
  { label: "About", href: "/about" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "License", href: "/license" },
];

const resourceLinks = [
  { label: "Documentation", href: "/docs/introduction" },
  { label: "Quick start", href: "/docs/quick-start" },
  { label: "Try AI", href: "/try-ai" },
  { label: "Contact", href: "/contact" },
];

const linkClassName =
  "w-fit text-sm text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200 py-2";

export default function Footer() {
  return (
    <footer className="w-full text-neutral-900 dark:text-neutral-100 md:px-10">
      <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between md:gap-24">
        <div className="flex max-w-xs flex-col items-start gap-4">
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/logo/mosaicLogo.jpeg"
              alt="Mosaic logo"
              className="size-9 rounded-lg object-cover"
            />
          </Link>
          <p className="w-64 text-sm leading-6 text-neutral-500 dark:text-neutral-400">
            Thoughtful components for building better AI experiences
          </p>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Product by{" "}
            <span className="font-medium text-neutral-900 dark:text-white">
              Rithwik Sagar
            </span>
          </p>
          <div className="flex items-center gap-2">
            <Link
              href=""
              className="text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
            >
              <FaGithub className="size-4" />
            </Link>
            <Link
              href=""
              className="text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
            >
              <RiTwitterXFill className="size-4" />
            </Link>
            <span>
              <UseToggleTheme />
            </span>
          </div>
        </div>

        <div className="grid gap-12 sm:grid-cols-3 sm:gap-16">
          <FooterColumn title="Components" links={componentLinks} />
          <FooterColumn title="Pages" links={pageLinks} />
          <FooterColumn title="Links" links={resourceLinks} />
        </div>
      </div>

      <div className="mt-20 mb-8 text-sm text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
        © 2026 Mosaic. MIT License.
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-sm font-semibold text-neutral-900 dark:text-white">
        {title}
      </h2>
      <nav className="flex flex-col items-start" aria-label={title}>
        {links.map((link) => (
          <Link key={link.label} href={link.href} className={linkClassName}>
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
