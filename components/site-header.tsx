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
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 shadow-[0_10px_34px_rgba(15,46,99,.09)] backdrop-blur-xl">
      <div className="page-shell flex h-[76px] items-center justify-between px-4 md:h-[82px] md:px-6">
        <Brand />
        <nav className="hidden items-center gap-0 md:flex xl:gap-2" aria-label="Primary navigation">
          {primary.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "rounded-xl px-2.5 py-2.5 text-[13px] font-bold text-slate-700 transition hover:bg-blue-50 hover:text-[#2352bd] xl:px-4 xl:text-[15px]",
                pathname === item.href && "bg-[#e8f0ff] text-[#2352bd] shadow-[inset_0_0_0_1px_rgba(35,82,189,.08)]",
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
              "border-[#2352bd]/30 bg-white px-5 font-extrabold text-[#2352bd] hover:border-[#2352bd] hover:bg-[#2352bd] hover:text-white",
              pathname === "/dashboard-login" && "border-[#2352bd] bg-[#2352bd] text-white",
            )}
          >
            <Link href="/dashboard-login"><LogIn className="h-4 w-4" /> Log in</Link>
          </Button>
          <Button asChild size="sm" className="bg-[#35ddd3] px-6 font-extrabold text-[#07375c] shadow-[0_12px_28px_rgba(53,221,211,.22)] hover:bg-[#58e8df]">
            <Link href="/rate-calculator">Calculate rate</Link>
          </Button>
        </div>
        <button
          className="grid h-11 w-11 place-items-center rounded-full border border-blue-200 bg-blue-50 text-[#2352bd] transition hover:border-[#2352bd] hover:bg-[#2352bd] hover:text-white md:hidden"
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
            className="border-t border-slate-200 bg-white p-3 shadow-2xl md:hidden"
          >
            {primary.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "block rounded-2xl px-4 py-3 text-base font-bold text-slate-700 hover:bg-blue-50 hover:text-[#2352bd]",
                  pathname === item.href && "bg-[#e8f0ff] text-[#2352bd]",
                )}
              >
                {item.name}
              </Link>
            ))}
            <div className="mt-2 border-t border-slate-200 pt-3">
              <Button asChild variant="outline" className="mb-2 w-full border-[#2352bd]/30 bg-white font-extrabold text-[#2352bd] hover:border-[#2352bd] hover:bg-[#2352bd] hover:text-white">
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
