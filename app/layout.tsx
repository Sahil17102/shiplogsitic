import type { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SmoothScroll } from "@/components/smooth-scroll";

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const displayFont = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://shiplogsitic-12.onrender.com"),
  title: { default: "ShipRoute — Move shipments faster", template: "%s | ShipRoute" },
  description: "AI-powered courier, freight and fulfilment for modern Indian businesses.",
  icons: { icon: "/shiproute-mark.png", apple: "/shiproute-mark.png" },
  openGraph: { title: "ShipRoute Logistics", description: "Move shipments faster. Deliver with confidence.", type: "website" },
  twitter: { card: "summary_large_image", title: "ShipRoute Logistics", description: "Move shipments faster. Deliver with confidence." },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${bodyFont.variable} ${displayFont.variable} font-sans`}>
        <SmoothScroll />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
