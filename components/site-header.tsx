"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Brand } from "./brand";
import { Button } from "./ui";
import { cn } from "@/lib/utils";

const primary = [
  { name: "Home", href: "/" },
  { name: "Weight Calculator", href: "/weight-calculator" },
  { name: "Rate Calculator", href: "/rate-calculator" },
  { name: "Track Order", href: "/tracking" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 px-3 pt-3">
      <div className="page-shell glass flex h-[72px] items-center justify-between rounded-[22px] px-4 md:px-5">
        <Brand />
        <nav className="hidden items-center gap-0 md:flex xl:gap-2" aria-label="Primary navigation">
          {primary.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "rounded-full px-2.5 py-2 text-[13px] font-semibold transition hover:bg-white hover:text-[#6747f5] xl:px-3.5 xl:text-sm",
                pathname === item.href ? "text-[#6747f5]" : "text-[#3f3f46]",
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center md:flex">
          <Button asChild variant="blue" size="sm" className="bg-[linear-gradient(135deg,#6d5dfc,#7047ec)] px-6 shadow-[0_12px_28px_rgba(109,93,252,.25)] hover:bg-[#6047ed]">
            <Link href="/rate-calculator">Calculate rate</Link>
          </Button>
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
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "block rounded-2xl px-4 py-3 text-base font-bold hover:bg-sky",
                  pathname === item.href ? "text-[#6747f5]" : "text-ink",
                )}
              >
                {item.name}
              </Link>
            ))}
            <div className="mt-2 border-t border-line pt-3">
              <Button asChild variant="blue" className="w-full bg-[linear-gradient(135deg,#6d5dfc,#7047ec)]">
                <Link href="/rate-calculator" onClick={() => setOpen(false)}>Calculate rate</Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
