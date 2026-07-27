"use client";

import Link from "next/link";
import { ArrowRight, Globe2, Menu, PackageCheck } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const navigation = [
  ["Shipping & Freight", "/services"],
  ["Solutions", "/industries"],
  ["Carriers", "/carriers"],
  ["Resources", "/blog"],
  ["About", "/about"],
];

function HeroBrand() {
  return (
    <Link href="/" aria-label="Shipray home" className="inline-flex items-center gap-3 text-white">
      <span className="grid h-10 w-10 place-items-center">
        <svg viewBox="0 0 42 34" className="h-9 w-11" fill="none" aria-hidden="true">
          <rect x="1" y="4" width="8" height="11" rx="2" fill="#fff" />
          <rect x="1" y="19" width="8" height="11" rx="2" fill="#fff" />
          <rect x="13" y="1" width="8" height="17" rx="2" fill="#5BE9E1" />
          <rect x="13" y="22" width="8" height="8" rx="2" fill="#fff" />
          <rect x="25" y="8" width="16" height="20" rx="2.5" fill="#38DDD3" />
          <path d="M1 31.5h40" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </span>
      <span className="font-display text-[27px] font-extrabold uppercase tracking-[-.035em] md:text-[31px]">
        Shipray
      </span>
    </Link>
  );
}

function RadialDial({ side }: { side: "left" | "right" }) {
  const ticks = Array.from({ length: 54 }, (_, index) => {
    const strong = index % 9 === 0;
    return (
      <line
        key={index}
        x1="350"
        y1={strong ? "32" : "45"}
        x2="350"
        y2={strong ? "78" : "71"}
        transform={`rotate(${index * (360 / 54)} 350 350)`}
        stroke={index % 4 === 0 ? "#ffffff" : "#39E4D9"}
        strokeWidth={strong ? "4" : "3"}
        strokeLinecap="butt"
        opacity={strong ? ".98" : ".92"}
      />
    );
  });

  return (
    <motion.svg
      viewBox="0 0 700 700"
      className="h-full w-full overflow-visible"
      animate={{
        rotate: side === "right"
          ? [0, 2.2, -0.8, 0]
          : [0, -1.8, 0.7, 0],
      }}
      transition={{
        duration: 10,
        times: [0, .28, .66, 1],
        repeat: Infinity,
        repeatDelay: .8,
        ease: "easeInOut",
      }}
      fill="none"
      aria-hidden="true"
    >
      <circle cx="350" cy="350" r="318" stroke="#2163F1" strokeWidth="3" strokeDasharray="690 1310" strokeLinecap="round" opacity=".95" />
      <circle cx="350" cy="350" r="282" stroke="rgba(255,255,255,.9)" strokeWidth="2" strokeDasharray="390 1380" strokeLinecap="round" />
      {ticks}
    </motion.svg>
  );
}

export function FreightOrbitHero() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 35, damping: 22, mass: 1.1 });
  const smoothY = useSpring(pointerY, { stiffness: 35, damping: 22, mass: 1.1 });
  const leftX = useTransform(smoothX, [-1, 1], [-10, 10]);
  const leftY = useTransform(smoothY, [-1, 1], [-6, 6]);
  const rightX = useTransform(smoothX, [-1, 1], [12, -12]);
  const rightY = useTransform(smoothY, [-1, 1], [7, -7]);

  return (
    <section
      onPointerMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        pointerX.set(((event.clientX - bounds.left) / bounds.width - .5) * 2);
        pointerY.set(((event.clientY - bounds.top) / bounds.height - .5) * 2);
      }}
      onPointerLeave={() => {
        pointerX.set(0);
        pointerY.set(0);
      }}
      className="relative min-h-[760px] overflow-hidden bg-[#194cbd] text-white md:min-h-[940px]"
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#194cbd_0%,#194cbd_25%,#3856ce_51%,#7669e3_70%,#a786ef_82%,#d8c7f8_92%,#ffffff_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-[190px] bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(245,240,253,.22)_34%,rgba(255,255,255,.78)_76%,#ffffff_100%)]" />

      <motion.div
        style={{ x: leftX, y: leftY }}
        className="pointer-events-none absolute -left-[365px] bottom-[-275px] h-[620px] w-[620px] md:-left-[390px] md:bottom-[-300px] md:h-[710px] md:w-[710px] xl:-left-[355px]"
      >
        <RadialDial side="left" />
      </motion.div>
      <motion.div
        style={{ x: rightX, y: rightY }}
        className="pointer-events-none absolute -right-[410px] top-[115px] h-[650px] w-[650px] md:-right-[390px] md:top-[115px] md:h-[710px] md:w-[710px] xl:-right-[335px]"
      >
        <RadialDial side="right" />
      </motion.div>

      <header className="relative z-20 mx-auto flex h-[122px] max-w-[1580px] items-center justify-between px-5 md:px-10 xl:px-14">
        <HeroBrand />
        <nav className="hidden items-center gap-8 xl:flex" aria-label="Homepage navigation">
          {navigation.map(([label, href]) => (
            <Link key={label} href={href} className="text-[15px] font-semibold text-white/95 transition hover:text-cyan-200">
              {label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-6 lg:flex">
          <Link href="/contact" className="inline-flex items-center gap-5 text-sm font-semibold text-white">
            <Globe2 className="h-5 w-5" />
            <span className="h-6 w-px bg-white/75" />
            Contact us
          </Link>
          <span className="h-6 w-px bg-white/75" />
          <Link href="/dashboard-login" className="text-sm font-semibold text-white">Log in</Link>
          <Link href="/contact" className="inline-flex h-11 items-center justify-center rounded-xl bg-[#3BDDD3] px-7 text-sm font-extrabold text-[#073a66] transition hover:-translate-y-0.5 hover:bg-[#58e7de]">
            Request demo
          </Link>
        </div>
        <Link href="/book-shipment" className="hidden h-11 items-center rounded-lg bg-[#3BDDD3] px-5 text-sm font-extrabold text-[#073a66] sm:inline-flex lg:hidden">
          Book now
        </Link>
        <button
          type="button"
          aria-label="Open navigation"
          aria-expanded={mobileNavOpen}
          onClick={() => setMobileNavOpen((open) => !open)}
          className="grid h-11 w-11 place-items-center rounded-lg border border-white/30 sm:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
      </header>
      <AnimatePresence>
        {mobileNavOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute inset-x-4 top-[105px] z-30 rounded-2xl border border-white/20 bg-[#133e9f]/95 p-3 shadow-2xl backdrop-blur-xl sm:hidden"
            aria-label="Mobile homepage navigation"
          >
            {navigation.map(([label, href]) => (
              <Link key={label} href={href} onClick={() => setMobileNavOpen(false)} className="block rounded-xl px-4 py-3 text-sm font-bold text-white hover:bg-white/10">
                {label}
              </Link>
            ))}
            <div className="mt-2 grid grid-cols-2 gap-2 border-t border-white/15 pt-3">
              <Link href="/dashboard-login" onClick={() => setMobileNavOpen(false)} className="grid h-11 place-items-center rounded-xl border border-white/25 text-sm font-bold text-white">Log in</Link>
              <Link href="/book-shipment" onClick={() => setMobileNavOpen(false)} className="grid h-11 place-items-center rounded-xl bg-[#3BDDD3] text-sm font-extrabold text-[#073a66]">Book now</Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      <div className="relative z-10 mx-auto flex min-h-[638px] max-w-[1500px] items-center justify-center px-5 pb-28 pt-14 text-center md:min-h-[818px] md:pb-44 md:pt-20">
        <div className="max-w-[1120px]">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .78, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto max-w-[1100px] font-display text-balance text-[3.2rem] font-extrabold leading-[.98] tracking-[-.035em] sm:text-6xl md:text-[4.45rem] xl:text-[5rem]"
          >
            The digital infrastructure powering modern logistics
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .7, delay: .1 }}
            className="mx-auto mt-8 max-w-[930px] text-base font-medium leading-7 text-white/95 md:text-[20px] md:leading-10"
          >
            Connecting businesses, carriers and customers on one platform—from instant courier booking to freight and real-time shipment visibility.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .7, delay: .2 }}
            className="mt-10 flex flex-col justify-center gap-4 sm:flex-row"
          >
            <Link href="/courier-calculator" className="inline-flex h-[60px] items-center justify-center gap-2 rounded-xl bg-[#39DED4] px-9 text-[16px] font-extrabold text-[#07375c] transition hover:-translate-y-0.5 hover:bg-[#59e8df]">
              Compare shipping rates <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/book-shipment" className="inline-flex h-[60px] items-center justify-center gap-2 rounded-xl border-2 border-white bg-white/5 px-9 text-[16px] font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-white hover:text-[#194cbd]">
              <PackageCheck className="h-4 w-4" /> Start booking
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
