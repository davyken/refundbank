import type { Metadata, Viewport } from "next";
import { Geist_Mono, Manrope } from "next/font/google";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import "./globals.css";

const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Refund Bank | Get refunds into the right account",
  description:
    "Register your bank details once, validate them instantly and follow every refund from request to payout. On desktop and mobile.",
};

export const viewport: Viewport = {
  themeColor: "#060b12",
  width: "device-width",
  initialScale: 1,
};

/** Adds the `js` class before paint so reveal targets start hidden without a flash. */
const JS_FLAG = `(function(){var c=document.documentElement.classList;c.add('js');try{if(sessionStorage.getItem('refund-bank:intro-seen')==='1')c.add('intro-seen')}catch(e){}})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${mono.variable} antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: JS_FLAG }} />
      </head>
      <body className="min-h-screen">
        <SmoothScroll>
          <ScrollProgress />
          {children}
          <ScrollToTop />
        </SmoothScroll>
      </body>
    </html>
  );
}
