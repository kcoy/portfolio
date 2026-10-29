import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import Script from "next/script";
import "./globals.css";

import { site } from "@/content/site";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Cursor } from "@/components/cursor";
import { MotionProvider } from "@/components/motion-provider";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });
const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Product Designer (UX/UI)`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — Product Designer (UX/UI)`,
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#f2f0eb",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      // Next 16 only suspends smooth scrolling during route changes when asked to; without
      // this, navigating to a new page glides up from the old scroll position.
      data-scroll-behavior="smooth"
      className={`${geist.variable} ${geistMono.variable} ${instrument.variable}`}
    >
      <body className="grain min-h-dvh">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-4 focus:py-3 focus:text-paper"
        >
          Skip to content
        </a>
        <noscript>
          <style>{`[style*="opacity:0"],[style*="opacity: 0"]{opacity:1!important;transform:none!important;clip-path:none!important}`}</style>
        </noscript>
        {process.env.NEXT_PUBLIC_FIGMA_CAPTURE === "1" && (
          <>
            <style>{`[style*="opacity:0"],[style*="opacity: 0"]{opacity:1!important;transform:none!important;clip-path:none!important}[style*="translateY"]{transform:none!important}*,*::before,*::after{animation:none!important;transition:none!important}`}</style>
            <Script src="https://mcp.figma.com/mcp/html-to-design/capture.js" strategy="afterInteractive" />
          </>
        )}
        <MotionProvider>
          <Nav />
          <main id="main">{children}</main>
          <Footer />
          <Cursor />
        </MotionProvider>
      </body>
    </html>
  );
}
