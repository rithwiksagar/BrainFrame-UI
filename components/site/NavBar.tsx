export default function NavBar() {
  return (
    <div className="mt-2 flex items-center justify-between gap-72 rounded-2xl bg-muted max-w-4xl py-2 px-4">
      <div className="flex items-center px-1 py-1">
        <img
          src="/logo/mosaicLogo.jpeg"
          alt="Mosaic logo"
          className="size-8 rounded-lg object-cover shadow-sm"
        />
        <h6 className="text-[17px] font-medium text-gray-900 px-2">Mosaic</h6>
      </div>

      <div className="flex items-center gap-2">
        {[
          { label: 'Github', href: '#' },
          { label: 'Docs', href: '#' },
          { label: 'Components', href: '#' },
        ].map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="rounded-md py-2 px-2 text-sm font-medium text-neutral-500"
          >
            {item.label}
          </a>
        ))}

        <div className="rounded-xl bg-neutral-800 px-4 py-2 text-sm font-medium text-white shadow-sm">
          Search
        </div>
      </div>
    </div>
  );
}