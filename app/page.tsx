"use client";
import BottomCTA from "@/components/site/BottomCta";
import ComponentsGrid from "@/components/site/componentsGrid";
import Footer from "@/components/site/Footer";
import Hero from "@/components/site/Hero";
import NavBar from "@/components/site/NavBar";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center">
      <NavBar />
      <Hero />
      <ComponentsGrid />
      <BottomCTA />
      <Footer />
    </div>
  );
}
