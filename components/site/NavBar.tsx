export default function NavBar() {
  return (
    <div className="flex items-center justify-between gap-4 pt-4 px-28">
      <div className="flex items-center rounded-lg bg-muted px-1 py-1 shadow-xs">
        <img
          src="/logo/mosaicLogo.jpeg"
          alt="Mosaic logo"
          className="size-8 rounded-lg object-cover shadow-sm"
        />
        <h6 className="text-[16px] font-medium text-gray-900 px-2">Mosaic</h6>
      </div>

      <div className="flex items-center gap-2 bg-muted rounded-lg shadow-xs">
        {[
          { label: 'Github', href: '#' },
          { label: 'Docs', href: '#' },
          { label: 'Components', href: '#' },
        ].map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="rounded-md py-2 px-2 text-sm font-medium"
          >
            {item.label}
          </a>
        ))}

        <div className="rounded-md bg-neutral-800 px-4 py-2 text-sm font-medium text-white shadow-sm">
          Search
        </div>
      </div>
    </div>
  );
}