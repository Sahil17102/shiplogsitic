"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { Brand } from "./brand";
import { Button } from "./ui";

const primary = [
  { name: "Services", href: "/services" },
  { name: "Solutions", href: "/industries" },
  { name: "Tracking", href: "/shipment-tracking" },
  { name: "Pricing", href: "/pricing" },
  { name: "Resources", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

const serviceLinks = [
  ["Domestic shipping", "/domestic-shipping"],
  ["International shipping", "/international-shipping"],
  ["Air freight", "/air-freight"],
  ["Sea freight", "/sea-freight"],
  ["Road transport", "/road-transport"],
  ["Warehousing", "/warehousing"],
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  if (pathname === "/") return null;

  return (
    <header className="sticky top-0 z-50 px-3 pt-3">
      <div className="page-shell glass flex h-[72px] items-center justify-between rounded-[22px] px-4 md:px-5">
        <Brand />
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {primary.map((item) =>
            item.name === "Services" ? (
              <div key={item.name} className="group relative">
                <Link href={item.href} className="flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-semibold text-muted hover:bg-white hover:text-ink">
                  {item.name}<ChevronDown className="h-3.5 w-3.5" />
                </Link>
                <div className="invisible absolute left-0 top-full w-64 translate-y-2 rounded-3xl border border-line bg-white p-2 opacity-0 shadow-card transition-all group-hover:visible group-hover:translate-y-1 group-hover:opacity-100">
                  {serviceLinks.map(([name, href]) => (
                    <Link key={href} href={href} className="block rounded-2xl px-4 py-3 text-sm font-semibold text-muted hover:bg-sky hover:text-blue">
                      {name}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link key={item.name} href={item.href} className="rounded-full px-3.5 py-2 text-sm font-semibold text-muted hover:bg-white hover:text-ink">
                {item.name}
              </Link>
            ),
          )}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <Button asChild variant="ghost" size="sm"><Link href="/dashboard-login">Log in</Link></Button>
          <Button asChild variant="blue" size="sm"><Link href="/book-shipment">Book shipment</Link></Button>
        </div>
        <button
          className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white md:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="page-shell glass mt-2 rounded-[22px] p-3 md:hidden"
          >
            {primary.map((item) => (
              <Link key={item.name} href={item.href} onClick={() => setOpen(false)} className="block rounded-2xl px-4 py-3 text-base font-bold text-ink hover:bg-sky">
                {item.name}
              </Link>
            ))}
            <div className="mt-2 grid grid-cols-2 gap-2 border-t border-line pt-3">
              <Button asChild variant="outline"><Link href="/dashboard-login">Log in</Link></Button>
              <Button asChild variant="blue"><Link href="/book-shipment">Book</Link></Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
