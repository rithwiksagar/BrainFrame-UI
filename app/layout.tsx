import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClientLayout } from "./clientlayout";
import { ThemeProvider } from "next-themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
    <html lang="en" suppressHydrationWarning>
      <body
        className="font-helvetica antialiased
       selection:bg-neutral-800 dark:selection:bg-white
        selection:text-white dark:selection:text-black "
      >
        <ThemeProvider attribute="class" defaultTheme="system">
          <ClientLayout>{children}</ClientLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
