import { Footer } from "@/components/landing/Footer";
import { LandingMotion } from "@/components/landing/LandingMotion";
import { Nav } from "@/components/landing/Nav";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LandingMotion />
      <Nav />
      <main>{children}</main>
      <Footer />
    </>
  );
}
