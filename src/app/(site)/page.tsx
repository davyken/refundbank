import { Cta } from "@/components/landing/Cta";
import { Devices } from "@/components/landing/Devices";
import { Features } from "@/components/landing/Features";
import { Hero } from "@/components/landing/Hero";
import { Marquee } from "@/components/landing/Marquee";
import { Why } from "@/components/landing/Why";
import { Intro } from "@/components/ui/Intro";

export default function HomePage() {
  return (
    <>
      <Intro />
      <Hero />
      <Marquee />
      <Why />
      <Features />
      <Devices />
      <Cta />
    </>
  );
}
