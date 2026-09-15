import Link from "next/link";

export default function NavBar() {
  return (
    <div className="fixed top-4 ">
    <div className="flex items-center justify-between gap-70 rounded-2xl bg-muted max-w-4xl py-2 px-4 z-999 dark:bg-neutral-900">
      <Link href="/" className="flex items-center px-1 py-1 cursor-pointer">
        <img
          src="/logo/mosaicLogo.jpeg"
          alt="Mosaic logo"
          className="size-8 rounded-lg object-cover shadow-sm"
        />
        <h6 className="text-[17px] font-medium text-neutral-800 px-2 dark:text-neutral-100">
          Mosaic
        </h6>
      </Link>

      <div className="flex items-center gap-2">
        {[
          { label: "Github", href: "https://github.com/rithwiksagar/Mosaic" },
          { label: "Docs", href: "/docs/introduction" },
          { label: "Try AI", href: "/try-ai" },
          { label: "Components", href: "/components" },
        ].map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="rounded-md py-2 px-2 text-sm font-medium text-neutral-500 hover:text-neutral-800 dark:text-neutral-300 dark:hover:text-neutral-400"
          >
            {item.label}
          </a>
        ))}

        <div className="rounded-xl dark:bg-neutral-200 bg-neutral-800 dark:text-neutral-800 px-4 py-2 text-sm font-medium text-white shadow-sm">
          Search
        </div>
      </div>
    </div>

  </div>
  );
}
