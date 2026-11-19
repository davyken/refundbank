import Image from "next/image";
import { Monitor, Smartphone } from "lucide-react";
import { DesktopMock, PhoneMock } from "./DeviceMocks";

export function Devices() {
  return (
    <section id="devices" className="relative isolate overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 -z-10">
        <Image src="/images/phone.jpg" alt="" fill sizes="100vw" className="scale-110 object-cover opacity-25" data-parallax="0.1" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/70 to-ink" />
      </div>
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p data-reveal className="text-sm font-semibold tracking-widest text-mint uppercase">Desktop and mobile</p>
          <h2 data-reveal-words className="mt-4 text-3xl leading-tight font-extrabold tracking-tight sm:text-5xl">
            One account, every screen.
          </h2>
          <p data-reveal className="mt-5 text-muted">
            Start a refund on your laptop at work and check its status on your phone on the way home. The layout adapts, the features stay the same.
          </p>
        </div>

        <div className="mt-16 grid items-center gap-10 lg:grid-cols-[1.6fr_1fr]">
          <div data-reveal>
            <DesktopMock />
            <p className="mt-4 flex items-center justify-center gap-2 text-sm text-muted"><Monitor size={16} aria-hidden /> Full dashboard with tables and filters</p>
          </div>
          <div data-reveal data-delay="0.15">
            <PhoneMock />
            <p className="mt-4 flex items-center justify-center gap-2 text-sm text-muted"><Smartphone size={16} aria-hidden /> Thumb friendly, same data</p>
          </div>
        </div>
      </div>
    </section>
  );
}
