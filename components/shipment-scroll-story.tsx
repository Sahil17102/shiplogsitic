"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Box,
  BrainCircuit,
  Check,
  CircleAlert,
  FileCheck2,
  MapPin,
  Network,
  PackageCheck,
  RadioTower,
  Route,
  ScanLine,
  Store,
  Truck,
  Warehouse,
} from "lucide-react";

const chapters = [
  {
    number: "01",
    label: "Connected logistics network",
    title: "Connect once. Ship everywhere.",
    description:
      "Bring orders, courier services and freight movements into one operating view. Your team books once and Shipray coordinates the route ahead.",
    bullets: [
      "29,000+ serviceable pin codes across India",
      "Domestic, international, air and surface options",
      "Orders accepted from your dashboard, store or spreadsheet",
    ],
    cta: "Explore the network",
    href: "/services",
    icon: Network,
  },
  {
    number: "02",
    label: "Operational intelligence",
    title: "Every scan strengthens the operation.",
    description:
      "Pickup events, warehouse scans and route updates form one reliable shipment timeline—so your team sees the next action without chasing a carrier.",
    bullets: [
      "Live status events create one clear shipment record",
      "Exceptions surface before customers need to ask",
      "Documents and tracking IDs stay linked to every order",
    ],
    cta: "See live tracking",
    href: "/tracking",
    icon: BrainCircuit,
  },
  {
    number: "03",
    label: "Proactive visibility",
    title: "Clarity that improves every delivery.",
    description:
      "More movement data means earlier signals and faster decisions. Shipray helps your team respond while a shipment can still be kept on track.",
    bullets: [
      "When a pickup slips, the operations team sees it early",
      "When a lane slows, alternate services can be compared",
      "When delivery fails, the next attempt stays visible",
    ],
    cta: "Start shipping today",
    href: "/book-shipment",
    icon: RadioTower,
  },
];

const cardTransition = { duration: .55, ease: [0.22, 1, 0.36, 1] as const };

function StageGrid() {
  return (
    <>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(6,182,212,.16) 1px,transparent 1px),linear-gradient(90deg,rgba(6,182,212,.16) 1px,transparent 1px)",
          backgroundSize: "88px 88px",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0)_30%,rgba(255,255,255,.76)_100%)]" />
    </>
  );
}

function NetworkVisual() {
  const satellites = [
    { label: "Store", Icon: Store, className: "left-[7%] top-[12%]" },
    { label: "Carrier", Icon: Truck, className: "right-[5%] top-[20%]" },
    { label: "Hub", Icon: Warehouse, className: "bottom-[15%] left-[5%]" },
    { label: "Customer", Icon: MapPin, className: "bottom-[9%] right-[7%]" },
  ];

  return (
    <div className="relative h-full w-full">
      <StageGrid />
      <svg viewBox="0 0 620 660" className="absolute inset-0 h-full w-full" fill="none" aria-hidden="true">
        {[
          "M103 120 C185 120 175 247 264 275",
          "M520 165 C425 165 445 250 354 281",
          "M98 540 C188 540 177 420 264 392",
          "M525 568 C430 568 441 430 355 402",
        ].map((path, index) => (
          <g key={path}>
            <path d={path} stroke="#A5E8F2" strokeWidth="2" />
            <motion.path
              d={path}
              stroke="#08B5D2"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="7 34"
              animate={{ strokeDashoffset: [42, 0] }}
              transition={{ duration: 1.9 + index * .18, repeat: Infinity, ease: "linear" }}
            />
          </g>
        ))}
      </svg>

      {satellites.map(({ label, Icon, className }, index) => (
        <motion.div
          key={label}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3.4, delay: index * .35, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute ${className} w-24 rounded-2xl border border-cyan-200 bg-white p-3 text-center shadow-[0_16px_45px_rgba(8,145,178,.09)]`}
        >
          <Icon className="mx-auto h-5 w-5 text-cyan-600" />
          <p className="mt-2 text-[9px] font-extrabold uppercase tracking-[.1em] text-slate-500">{label}</p>
        </motion.div>
      ))}

      <div className="absolute left-1/2 top-1/2 h-[82%] w-[47%] -translate-x-1/2 -translate-y-1/2 rounded-[48px] border-[3px] border-cyan-500 bg-white/95 p-3 shadow-[0_32px_90px_rgba(8,145,178,.16)]">
        <div className="h-full rounded-[36px] border border-cyan-300 bg-[#fbfdff] px-5 py-7">
          <div className="mx-auto flex w-fit items-center gap-2 rounded-full bg-cyan-50 px-3 py-1.5 text-[9px] font-black uppercase tracking-[.12em] text-cyan-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Network live
          </div>
          <div className="mt-7 space-y-3">
            {[
              ["Order received", PackageCheck],
              ["Best service found", Route],
              ["Pickup assigned", Truck],
              ["Tracking activated", RadioTower],
            ].map(([label, Icon], index) => {
              const RowIcon = Icon as typeof Box;
              return (
                <motion.div
                  key={label as string}
                  initial={{ opacity: .4, x: -8 }}
                  animate={{ opacity: [0.45, 1, .45], x: [-4, 0, -4] }}
                  transition={{ duration: 3, delay: index * .6, repeat: Infinity }}
                  className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-3"
                >
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-blue-50 text-blue"><RowIcon className="h-4 w-4" /></span>
                  <span className="text-[10px] font-bold text-slate-700">{label as string}</span>
                  <Check className="ml-auto h-3.5 w-3.5 text-emerald-500" />
                </motion.div>
              );
            })}
          </div>
          <div className="mt-5 rounded-2xl bg-slate-950 p-4 text-white">
            <p className="text-[9px] font-bold uppercase tracking-[.12em] text-white/45">Connected reach</p>
            <p className="mt-2 text-2xl font-extrabold tracking-[-.04em]">29,000+</p>
            <p className="mt-1 text-[9px] text-white/60">serviceable pin codes</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function WorkflowVisual() {
  const flow = [
    ["Order imported", Store, "09:12"],
    ["Courier selected", Truck, "09:13"],
    ["Pickup confirmed", PackageCheck, "09:16"],
    ["Parcel scanned", ScanLine, "14:42"],
    ["ETA recalculated", Route, "14:43"],
    ["Customer notified", FileCheck2, "14:44"],
  ];

  return (
    <div className="relative h-full w-full">
      <StageGrid />
      <div className="absolute left-1/2 top-1/2 h-[84%] w-[50%] min-w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-[50px] border-[3px] border-cyan-500 bg-white p-3 shadow-[0_32px_90px_rgba(8,145,178,.15)]">
        <div className="relative h-full overflow-hidden rounded-[37px] border border-cyan-300 bg-[#f8fbff] px-5 py-8">
          <div className="mx-auto h-1.5 w-12 rounded-full bg-cyan-300" />
          <p className="mt-6 text-[9px] font-black uppercase tracking-[.14em] text-blue">Live shipment workflow</p>
          <h4 className="mt-2 text-xl font-extrabold tracking-[-.04em] text-slate-950">SRX-2084-9182</h4>
          <div className="relative mt-6 space-y-3">
            <div className="absolute bottom-5 left-[17px] top-5 w-px bg-cyan-200" />
            {flow.map(([label, Icon, time], index) => {
              const FlowIcon = Icon as typeof Box;
              return (
                <motion.div
                  key={label as string}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: .4, delay: index * .13 }}
                  className="relative flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-2.5 shadow-sm"
                >
                  <motion.span
                    animate={{ boxShadow: ["0 0 0 0 rgba(6,182,212,0)", "0 0 0 7px rgba(6,182,212,.12)", "0 0 0 0 rgba(6,182,212,0)"] }}
                    transition={{ duration: 2.1, delay: index * .35, repeat: Infinity }}
                    className="relative z-10 grid h-9 w-9 place-items-center rounded-lg bg-cyan-50 text-cyan-700"
                  >
                    <FlowIcon className="h-4 w-4" />
                  </motion.span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[10px] font-extrabold text-slate-800">{label as string}</p>
                    <p className="mt-1 text-[8px] text-slate-400">{time as string}</p>
                  </div>
                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function VisibilityVisual() {
  const routes = [
    "M105 249 C165 203 205 234 264 170 C305 127 338 156 410 92",
    "M113 249 C174 281 248 281 301 227 C342 185 388 215 452 163",
    "M121 252 C195 332 316 338 446 278",
  ];

  return (
    <div className="relative h-full w-full">
      <StageGrid />
      <div className="absolute left-1/2 top-1/2 w-[84%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[34px] border-[3px] border-cyan-500 bg-white p-6 shadow-[0_32px_90px_rgba(8,145,178,.15)]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[9px] font-black uppercase tracking-[.14em] text-cyan-700">Live movement intelligence</p>
            <h4 className="mt-2 text-xl font-extrabold tracking-[-.04em] text-slate-950">Shipments needing attention</h4>
          </div>
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-amber-50 text-amber-600"><CircleAlert className="h-5 w-5" /></span>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-2">
          {[["18", "Active lanes"], ["04", "Early alerts"], ["98.4%", "On-time dispatch"]].map(([value, label]) => (
            <div key={label} className="rounded-xl border border-slate-200 p-3">
              <p className="text-lg font-extrabold tracking-[-.04em] text-slate-950">{value}</p>
              <p className="mt-1 text-[8px] leading-3 text-slate-500">{label}</p>
            </div>
          ))}
        </div>
        <div className="relative mt-5 h-64 overflow-hidden rounded-2xl bg-[#eefaff]">
          <svg viewBox="0 0 540 330" className="absolute inset-0 h-full w-full" fill="none" aria-hidden="true">
            <path d="M74 75 123 46l64 22 51-27 79 17 67-20 86 43-14 61 25 51-49 76-98 24-64-28-77 35-92-50-25-81Z" fill="#CBEFF5" opacity=".88" />
            {routes.map((path, index) => (
              <g key={path}>
                <path d={path} stroke="#79D4E5" strokeWidth="3" strokeLinecap="round" />
                <motion.path
                  d={path}
                  stroke={index === 1 ? "#F59E0B" : "#0EA5E9"}
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray="4 30"
                  animate={{ strokeDashoffset: [35, 0] }}
                  transition={{ duration: 2.2 + index * .3, repeat: Infinity, ease: "linear" }}
                />
              </g>
            ))}
            {[[105,249],[410,92],[452,163],[446,278],[264,170],[301,227]].map(([cx, cy], index) => (
              <motion.circle
                key={`${cx}-${cy}`}
                cx={cx}
                cy={cy}
                r="7"
                fill={index === 4 ? "#F97316" : "#0EA5E9"}
                animate={{ r: [5, 9, 5], opacity: [1, .45, 1] }}
                transition={{ duration: 1.8, delay: index * .2, repeat: Infinity }}
              />
            ))}
          </svg>
          <motion.div
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 2.6, repeat: Infinity }}
            className="absolute bottom-3 left-3 flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-[9px] font-extrabold text-slate-700 shadow-md"
          >
            <Truck className="h-3.5 w-3.5 text-blue" /> Route update received
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function StoryVisual({ active, animateChange = true }: { active: number; animateChange?: boolean }) {
  const visuals = [<NetworkVisual key="network" />, <WorkflowVisual key="workflow" />, <VisibilityVisual key="visibility" />];

  return (
    <div className="relative aspect-[.92] w-full max-w-[720px] overflow-hidden bg-white">
      {animateChange ? (
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 28, scale: .985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: .99 }}
            transition={cardTransition}
            className="absolute inset-0"
          >
            {visuals[active]}
          </motion.div>
        </AnimatePresence>
      ) : (
        <div className="absolute inset-0">{visuals[active]}</div>
      )}
    </div>
  );
}

function ChapterCopy({ chapter }: { chapter: (typeof chapters)[number] }) {
  const Icon = chapter.icon;
  return (
    <div className="max-w-[620px]">
      <div className="grid h-14 w-14 place-items-center rounded-xl border border-cyan-500 bg-cyan-50 text-cyan-600">
        <Icon className="h-6 w-6" />
      </div>
      <p className="mt-7 text-xs font-extrabold uppercase tracking-[.16em] text-cyan-700">{chapter.label}</p>
      <h3 className="mt-4 text-balance text-4xl font-extrabold leading-[1.02] tracking-[-.045em] text-slate-950 xl:text-5xl">
        {chapter.title}
      </h3>
      <p className="mt-5 text-base leading-8 text-slate-600 md:text-lg">{chapter.description}</p>
      <ul className="mt-7 space-y-4">
        {chapter.bullets.map((bullet) => (
          <li key={bullet} className="flex gap-4 border-l-[3px] border-cyan-500 pl-4 text-sm leading-6 text-slate-600 md:text-base">
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
      <Link href={chapter.href} className="mt-8 inline-flex h-13 items-center gap-3 rounded-lg bg-cyan-500 px-6 py-3.5 text-sm font-extrabold text-[#062b4f] shadow-[0_12px_30px_rgba(6,182,212,.2)] transition hover:-translate-y-0.5 hover:bg-cyan-400">
        {chapter.cta} <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

export function ShipmentScrollStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeChapter, setActiveChapter] = useState(0);

  useEffect(() => {
    let disposed = false;
    let cleanup = () => {};

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([gsapModule, triggerModule]) => {
      if (disposed || !sectionRef.current) return;
      const gsap = gsapModule.default;
      const ScrollTrigger = triggerModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);
      const context = gsap.context(() => {
        const triggers = gsap.utils.toArray<HTMLElement>("[data-network-chapter]");
        triggers.forEach((trigger, index) => {
          ScrollTrigger.create({
            trigger,
            start: "top 57%",
            end: "bottom 43%",
            onEnter: () => setActiveChapter(index),
            onEnterBack: () => setActiveChapter(index),
          });
        });
      }, sectionRef);
      cleanup = () => context.revert();
    });

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return (
    <section ref={sectionRef} className="border-y border-slate-200 bg-white">
      <div className="page-shell py-20 text-center md:py-28">
        <p className="text-xs font-extrabold uppercase tracking-[.18em] text-cyan-700">Shipray connected logistics</p>
        <h2 className="mx-auto mt-5 max-w-5xl text-balance text-4xl font-extrabold leading-[1.02] tracking-[-.05em] text-slate-950 md:text-7xl">
          The network behind every successful delivery.
        </h2>
        <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-600 md:text-lg">
          One connected operating layer brings orders, carriers, scans and delivery decisions together—giving every team a clearer way to move.
        </p>
      </div>

      <div className="page-shell hidden grid-cols-2 border-t border-slate-200 lg:grid">
        <div className="pr-10 xl:pr-20">
          {chapters.map((chapter) => (
            <article key={chapter.number} data-network-chapter className="flex min-h-[96svh] items-center border-b border-slate-200 py-20 last:border-b-0">
              <ChapterCopy chapter={chapter} />
            </article>
          ))}
        </div>
        <div className="relative border-l border-slate-200">
          <div className="sticky top-0 flex h-[100svh] items-center justify-center pl-8 xl:pl-12">
            <StoryVisual active={activeChapter} />
            <div className="absolute bottom-8 right-6 flex gap-2">
              {chapters.map((chapter, index) => (
                <span key={chapter.number} className={index === activeChapter ? "h-1.5 w-10 rounded-full bg-cyan-500 transition-all" : "h-1.5 w-3 rounded-full bg-slate-200 transition-all"} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="page-shell border-t border-slate-200 py-16 lg:hidden">
        <div className="space-y-24">
          {chapters.map((chapter, index) => (
            <article key={chapter.number}>
              <ChapterCopy chapter={chapter} />
              <div className="mt-10 overflow-hidden rounded-3xl border border-slate-200">
                <StoryVisual active={index} animateChange={false} />
              </div>
            </article>
          ))}
        </div>
      </div>

    </section>
  );
}
