import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { IoMenu } from "react-icons/io5";

type label = {
  label: string;
  href: string;
};
const labels: label[] = [
  { label: "Github", href: "https://github.com/rithwiksagar/Mosaic" },
  { label: "Docs", href: "/docs/introduction" },
  { label: "Try AI", href: "/try-ai" },
  { label: "Components", href: "/components" },
];

export default function NavBar() {
  return (
    <div className="fixed top-4 ">
      <div className="flex items-center justify-between gap-40 md:gap-80 rounded-2xl bg-muted max-w-4xl py-1 lg:py-2 px-4 z-999 dark:bg-neutral-900">
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

        <div className="hidden lg:flex items-center gap-2">
          {labels.map((item) => (
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

        <Menu labels={labels} />
      </div>
    </div>
  );
}

function Menu({ labels }: { labels: label[] }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(()=>{
    function closeMenu(e: MouseEvent){
      if(menuRef.current && !menuRef.current.contains(e.target as Node)){
        setIsMenuOpen(false);
      } 
    }

    window.addEventListener("click", closeMenu);

    return () => {
      window.removeEventListener("click", closeMenu)
    }
  },[])

  return (
    <div 
    ref={menuRef}
    className="relative lg:hidden">
      <IoMenu
        className="size-5 cursor-pointer"
        onClick={() => {
          setIsMenuOpen((p) => !p);
        }}
      />

      {isMenuOpen && (
        <div
          className="
          absolute -right-3 top-10
          w-80 rounded-2xl
          border border-neutral-200/30
          bg-neutral-200/40
          p-2
          backdrop-blur-xs
          dark:border-neutral-800/60
          dark:bg-neutral-900/70
          dark:shadow-black/20
        "
        >
          {labels.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="
              block rounded-xl
              px-3 py-2.5
              text-sm text-neutral-700
              transition-colors
              hover:bg-neutral-200/60
              dark:text-neutral-300
              dark:hover:bg-neutral-800/60
            "
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
