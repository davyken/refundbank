import Link from "next/link";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { NotificationsMenu } from "@/components/dashboard/NotificationsMenu";
import { Logo } from "@/components/ui/Logo";
import { demoUser } from "@/lib/data/demo";
import { initials } from "@/lib/format";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-5 pb-24 sm:px-8 sm:pt-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5 font-extrabold tracking-tight">
          <Logo size={30} /> Refund Bank
        </Link>
        <div className="flex items-center gap-3">
          <NotificationsMenu />
          <div className="glass flex items-center gap-3 rounded-full py-1.5 pr-4 pl-1.5">
            <span className="grid size-8 place-items-center rounded-full bg-gold/90 text-sm font-bold text-[#2b1d03]">
              {initials(demoUser.name)}
            </span>
            <span className="hidden text-sm font-semibold sm:block">{demoUser.name}</span>
          </div>
        </div>
      </header>
      <div className="mt-6">
        <DashboardNav />
      </div>
      <main className="mt-8">{children}</main>
    </div>
  );
}
