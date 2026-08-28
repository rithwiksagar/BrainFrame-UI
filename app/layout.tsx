import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { fraunces, jetbrainsMono, satoshi } from "./fonts";

export const metadata: Metadata = {
  title: "BrainFrame | AI interfaces",
  description:
    "BrainFrame provides a curated set of modern UI components and developer utilities designed for building responsive, customizable, and accessible AI chat experiences in web applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${satoshi.variable} ${jetbrainsMono.variable} ${fraunces.variable}`}
    >
      <body
        className="font-sans font-medium
      selection:bg-neutral-700 dark:selection:bg-white
      selection:text-white dark:selection:text-black"
      >
        <ThemeProvider attribute="class" defaultTheme="system">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
