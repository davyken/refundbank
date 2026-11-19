import { ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Logo } from "../ui/Logo";

const POINTS = ["Bank details checked as you type", "Account number always masked", "Every refund tracked to payout"];

interface AuthShellProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}

/** Fills the viewport exactly: the page never scrolls, on any screen size. */
export function AuthShell({ title, subtitle, children, footer }: AuthShellProps) {
  return (
    <div className="grid h-full overflow-hidden lg:grid-cols-[1.05fr_1fr]">
      <aside className="relative isolate hidden overflow-hidden lg:block">
        <Image src="/images/night.jpg" alt="" fill priority sizes="55vw" className="-z-10 object-cover opacity-60" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/50 to-ink/30" />
        <div className="flex h-full flex-col justify-between p-10 xl:p-14">
          <Link href="/" className="flex items-center gap-2.5 text-lg font-extrabold">
            <Logo size={34} /> Refund Bank
          </Link>
          <div>
            <h2 className="max-w-md text-4xl leading-tight font-extrabold tracking-tight xl:text-5xl">
              Your refund, in the right account.
            </h2>
            <ul className="mt-7 space-y-3 text-text/85">
              {POINTS.map((point) => (
                <li key={point} className="flex items-center gap-3">
                  <span className="grid size-6 place-items-center rounded-full bg-mint/20 text-mint">
                    <ShieldCheck size={13} aria-hidden />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>

      <main className="flex h-full items-center justify-center px-5 py-4 sm:px-8">
        <div className="w-full max-w-md">
          <Link href="/" className="mb-5 [@media(max-height:640px)]:mb-3 flex items-center gap-2.5 font-extrabold lg:hidden">
            <Logo size={30} /> Refund Bank
          </Link>
          <h1 className="text-3xl [@media(max-height:640px)]:text-2xl font-extrabold tracking-tight sm:text-4xl">{title}</h1>
          <p className="mt-2 [@media(max-height:640px)]:hidden text-sm text-muted sm:text-base">{subtitle}</p>
          <div className="mt-6 [@media(max-height:640px)]:mt-3">{children}</div>
          <p className="mt-5 [@media(max-height:640px)]:mt-3 text-center text-sm text-muted">{footer}</p>
        </div>
      </main>
    </div>
  );
}
