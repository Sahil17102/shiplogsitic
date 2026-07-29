"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { LogIn, Menu, X } from "lucide-react";
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
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#2352bd] shadow-[0_14px_40px_rgba(20,63,155,.18)]">
      <div className="page-shell flex h-[76px] items-center justify-between px-4 md:h-[82px] md:px-6">
        <Brand inverse />
        <nav className="hidden items-center gap-0 md:flex xl:gap-2" aria-label="Primary navigation">
          {primary.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "rounded-xl px-2.5 py-2.5 text-[13px] font-bold text-white/80 transition hover:bg-white/10 hover:text-white xl:px-4 xl:text-[15px]",
                pathname === item.href && "bg-white/[0.12] text-white",
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <Button
            asChild
            variant="outline"
            size="sm"
            className={cn(
              "border-white/25 bg-white/10 px-5 font-extrabold text-white hover:border-white hover:bg-white hover:text-[#2352bd]",
              pathname === "/dashboard-login" && "border-white bg-white text-[#2352bd]",
            )}
          >
            <Link href="/dashboard-login"><LogIn className="h-4 w-4" /> Log in</Link>
          </Button>
          <Button asChild size="sm" className="bg-[#35ddd3] px-6 font-extrabold text-[#07375c] shadow-[0_12px_28px_rgba(53,221,211,.22)] hover:bg-[#58e8df]">
            <Link href="/rate-calculator">Calculate rate</Link>
          </Button>
        </div>
        <button
          className="grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/10 text-white md:hidden"
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
            className="border-t border-white/10 bg-[#2352bd] p-3 shadow-2xl md:hidden"
          >
            {primary.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "block rounded-2xl px-4 py-3 text-base font-bold text-white/80 hover:bg-white/10 hover:text-white",
                  pathname === item.href && "bg-white/10 text-white",
                )}
              >
                {item.name}
              </Link>
            ))}
            <div className="mt-2 border-t border-white/10 pt-3">
              <Button asChild variant="outline" className="mb-2 w-full border-white/25 bg-white/10 font-extrabold text-white hover:bg-white hover:text-[#2352bd]">
                <Link href="/dashboard-login" onClick={() => setOpen(false)}><LogIn className="h-4 w-4" /> Log in</Link>
              </Button>
              <Button asChild className="w-full bg-[#35ddd3] font-extrabold text-[#07375c] hover:bg-[#58e8df]">
                <Link href="/rate-calculator" onClick={() => setOpen(false)}>Calculate rate</Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
