export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="prose 
    prose-neutral 
    dark:prose-invert 
    prose-h1:text-3xl
    max-w-3xl mx-auto py-10 ml-1 mt-13">
      {children}
    </div>
  );
}
