export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="prose 
    prose-neutral 
    dark:prose-invert 
    prose-h1:text-3xl
    prose-h3:text-[18px] prose-h3:font-normal
    prose-h2:font-normal prose-h2:text-[22px] prose-h2:tracking-wide
    prose-p:text-[16px]
    max-w-3xl py-4 md:py-10 mx-4 lg:ml-40 mt-20"
    >
      {children}
    </div>
  );
}
