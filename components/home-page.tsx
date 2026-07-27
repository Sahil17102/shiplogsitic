"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Box,
  Check,
  ChevronRight,
  CircleDot,
  Globe2,
  IndianRupee,
  MapPin,
  PackageCheck,
  Plane,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  Truck,
  Zap,
} from "lucide-react";
import { benefits, industries, services, testimonials } from "@/lib/site-data";
import { Button, Eyebrow, fieldClass, Label } from "./ui";
import { cn } from "@/lib/utils";

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const } },
};

function SectionHeading({ eyebrow, title, copy, align = "left" }: { eyebrow: string; title: string; copy?: string; align?: "left" | "center" }) {
  return (
    <motion.div
      variants={fade}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}
    >
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="text-balance text-4xl font-black tracking-[-0.055em] text-ink md:text-6xl">{title}</h2>
      {copy && <p className="mt-5 text-base leading-7 text-muted md:text-lg">{copy}</p>}
    </motion.div>
  );
}

function DashboardVisual() {
  const bars = [44, 58, 51, 70, 62, 81, 73, 91, 78, 100, 88, 109];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 28 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto max-w-[590px] lg:mx-0"
    >
      <div className="absolute -inset-6 -z-10 rounded-[48px] bg-blue/10 blur-3xl" />
      <div className="glass overflow-hidden rounded-[30px] border-white bg-white/85 p-2 shadow-float">
        <div className="rounded-[24px] border border-line bg-[#fafdff] p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-muted">Shipment overview</p>
              <p className="mt-1 text-lg font-black tracking-tight">Good morning, Aarav</p>
            </div>
            <div className="grid h-10 w-10 place-items-center rounded-full bg-blue text-sm font-black text-white">A</div>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {[
              ["Today", "184", "+12%"],
              ["In transit", "1,248", "+8%"],
              ["Delivered", "8,490", "99.2%"],
              ["Revenue", "₹4.2L", "+18%"],
            ].map(([label, value, delta], i) => (
              <motion.div key={label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.08 }} className="rounded-2xl border border-line bg-white p-3">
                <p className="text-[10px] font-bold text-muted">{label}</p>
                <p className="mt-1 text-lg font-black tracking-tight">{value}</p>
                <p className="mt-1 text-[9px] font-extrabold text-emerald-600">{delta}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-3 grid gap-3 sm:grid-cols-[1.35fr_.65fr]">
            <div className="rounded-[22px] border border-line bg-white p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold text-muted">Shipment activity</p>
                  <p className="mt-1 text-xl font-black">12,604</p>
                </div>
                <span className="rounded-full bg-emerald-50 px-2 py-1 text-[9px] font-black text-emerald-600">+18.2%</span>
              </div>
              <div className="mt-7 flex h-24 items-end gap-1.5">
                {bars.map((bar, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${bar * 0.68}%` }}
                    transition={{ delay: 0.45 + i * 0.035, duration: 0.5 }}
                    className={cn("flex-1 rounded-t-sm", i > 8 ? "bg-blue" : "bg-blue/15")}
                  />
                ))}
              </div>
            </div>
            <div className="rounded-[22px] bg-ink p-4 text-white">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-bold text-white/55">Live shipment</p>
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <div className="mt-4 grid h-10 w-10 place-items-center rounded-full bg-blue"><Truck className="h-4 w-4" /></div>
              <p className="mt-4 text-sm font-extrabold">Delhi → Jaipur</p>
              <p className="mt-1 text-[10px] text-white/50">Out for delivery · 2:40 PM</p>
              <div className="mt-4 h-1 rounded-full bg-white/10"><div className="h-full w-[78%] rounded-full bg-blue-400" /></div>
            </div>
          </div>
        </div>
      </div>
      <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity }} className="glass absolute -bottom-8 -left-3 hidden items-center gap-3 rounded-2xl px-4 py-3 shadow-card sm:flex">
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-50 text-emerald-600"><PackageCheck className="h-4 w-4" /></div>
        <div><p className="text-[10px] font-bold text-muted">Just delivered</p><p className="text-xs font-black">Order #SR-2048</p></div>
      </motion.div>
      <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 5, repeat: Infinity, delay: 0.6 }} className="glass absolute -right-3 -top-7 hidden items-center gap-3 rounded-2xl px-4 py-3 shadow-card sm:flex">
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-blue/10 text-blue"><Globe2 className="h-4 w-4" /></div>
        <div><p className="text-[10px] font-bold text-muted">Global coverage</p><p className="text-xs font-black">220+ countries</p></div>
      </motion.div>
    </motion.div>
  );
}

function TrackingCard() {
  const [tracking, setTracking] = useState("");
  const [result, setResult] = useState(false);
  return (
    <div className="relative overflow-hidden rounded-[30px] bg-ink p-6 text-white shadow-card md:p-9">
      <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-blue/30 blur-3xl" />
      <div className="relative">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-bold text-blue-200"><CircleDot className="h-3.5 w-3.5" /> Live tracking</span>
        <h3 className="mt-5 max-w-md text-3xl font-black tracking-[-0.04em] md:text-4xl">Wherever it is, you’ll know.</h3>
        <p className="mt-3 max-w-md text-sm leading-6 text-white/55">Try any number to preview the shipment journey.</p>
        <form onSubmit={(e) => { e.preventDefault(); setResult(true); }} className="mt-7 flex rounded-2xl bg-white p-1.5">
          <input aria-label="Tracking number" value={tracking} onChange={(e) => setTracking(e.target.value)} placeholder="Enter tracking number" className="min-w-0 flex-1 bg-transparent px-4 text-sm font-semibold text-ink outline-none" />
          <button className="grid h-11 w-11 place-items-center rounded-xl bg-blue" aria-label="Track"><Search className="h-4 w-4" /></button>
        </form>
        <motion.div layout className="mt-7">
          {result ? (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-[22px] border border-white/10 bg-white/10 p-5">
              <div className="flex items-start justify-between gap-4">
                <div><p className="text-[10px] font-extrabold uppercase tracking-wider text-white/45">Shipment {tracking || "SRX208491"}</p><p className="mt-1 text-lg font-black">Out for delivery</p></div>
                <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-[10px] font-black text-emerald-300">ON TIME</span>
              </div>
              <div className="mt-6 flex items-center">
                {[Check, Check, Truck, MapPin].map((Icon, i) => (
                  <div key={i} className="flex flex-1 items-center last:flex-none">
                    <div className={cn("grid h-8 w-8 shrink-0 place-items-center rounded-full", i < 3 ? "bg-blue" : "bg-white/10")}><Icon className="h-3.5 w-3.5" /></div>
                    {i < 3 && <div className={cn("h-1 flex-1", i < 2 ? "bg-blue" : "bg-white/10")} />}
                  </div>
                ))}
              </div>
              <div className="mt-5 flex justify-between text-[10px] text-white/45"><span>Picked up</span><span>In transit</span><span>Today · 6 PM</span></div>
            </motion.div>
          ) : (
            <p className="flex items-center gap-2 text-xs text-white/40"><ShieldCheck className="h-4 w-4" /> Secure, carrier-verified tracking updates</p>
          )}
        </motion.div>
      </div>
    </div>
  );
}

function RateCalculator() {
  const [calculated, setCalculated] = useState(false);
  return (
    <div className="rounded-[30px] border border-line bg-white p-6 shadow-card md:p-9">
      <div className="flex items-start justify-between gap-5">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-[0.15em] text-blue">Courier calculator</span>
          <h3 className="mt-3 text-3xl font-black tracking-[-0.04em]">The right rate, instantly.</h3>
        </div>
        <div className="hidden h-12 w-12 place-items-center rounded-2xl bg-sky text-blue sm:grid"><IndianRupee className="h-5 w-5" /></div>
      </div>
      <form onSubmit={(e) => { e.preventDefault(); setCalculated(true); }} className="mt-7 grid grid-cols-2 gap-3">
        <div><Label>Pickup</Label><input className={fieldClass} placeholder="110001" aria-label="Pickup pin code" /></div>
        <div><Label>Destination</Label><input className={fieldClass} placeholder="400001" aria-label="Destination pin code" /></div>
        <div><Label>Weight</Label><select className={fieldClass} aria-label="Weight"><option>0.5 kg</option><option>1 kg</option><option>2 kg</option><option>5 kg</option></select></div>
        <div><Label>Parcel type</Label><select className={fieldClass} aria-label="Parcel type"><option>Prepaid</option><option>COD</option><option>Document</option></select></div>
        <Button type="submit" variant="blue" className="col-span-2 mt-2">Calculate rates <ArrowRight className="h-4 w-4" /></Button>
      </form>
      {calculated && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-4 grid gap-2">
          {[["Recommended", "Shipray Priority", "2–3 days", "₹118"], ["Lowest", "Shipray Economy", "4–5 days", "₹86"]].map((row, i) => (
            <div key={row[0]} className={cn("flex items-center justify-between rounded-2xl border p-3", i === 0 ? "border-blue/25 bg-sky" : "border-line")}>
              <div><span className="text-[9px] font-black uppercase tracking-wider text-blue">{row[0]}</span><p className="text-sm font-black">{row[1]}</p><p className="text-[10px] text-muted">{row[2]}</p></div>
              <p className="text-lg font-black">{row[3]}</p>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
}

function QuickOrderCard() {
  const [parcelType, setParcelType] = useState("Parcel");
  const [quoted, setQuoted] = useState(false);

  return (
    <div className="mt-8 rounded-[26px] border border-line bg-white p-4 shadow-card sm:p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[.15em] text-blue">Quick order</p>
          <p className="mt-1 text-lg font-black tracking-[-0.03em]">Where should we deliver?</p>
        </div>
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-sky text-blue"><Box className="h-5 w-5" /></div>
      </div>

      <div className="mt-5 grid grid-cols-3 rounded-2xl bg-slate-100 p-1">
        {["Parcel", "Document", "Cargo"].map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => { setParcelType(type); setQuoted(false); }}
            className={cn("rounded-xl px-2 py-2.5 text-xs font-black transition", parcelType === type ? "bg-white text-blue shadow-sm" : "text-muted hover:text-ink")}
          >
            {type}
          </button>
        ))}
      </div>

      <form onSubmit={(event) => { event.preventDefault(); setQuoted(true); }} className="mt-5 grid gap-3 sm:grid-cols-2">
        <div><Label>Pickup pin code</Label><input required inputMode="numeric" maxLength={6} className={fieldClass} placeholder="110001" aria-label="Pickup pin code" /></div>
        <div><Label>Delivery pin code</Label><input required inputMode="numeric" maxLength={6} className={fieldClass} placeholder="400001" aria-label="Delivery pin code" /></div>
        <div><Label>Approx. weight</Label><select className={fieldClass} aria-label="Approximate weight"><option>Up to 500 g</option><option>500 g – 1 kg</option><option>1 – 2 kg</option><option>2 – 5 kg</option><option>5 kg+</option></select></div>
        <div><Label>Payment</Label><select className={fieldClass} aria-label="Payment type"><option>Prepaid</option><option>Cash on delivery</option></select></div>
        <Button type="submit" variant="blue" className="mt-1 sm:col-span-2">Check price & delivery time <ArrowRight className="h-4 w-4" /></Button>
      </form>

      {quoted && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-4 flex flex-col gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 sm:flex-row sm:items-center">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-emerald-600"><PackageCheck className="h-5 w-5" /></div>
          <div className="flex-1"><p className="text-[10px] font-black uppercase tracking-[.12em] text-emerald-700">Best available option</p><p className="mt-1 text-sm font-black text-ink">₹118 · Delivery in 2–3 days</p></div>
          <Button asChild size="sm"><Link href="/book-shipment">Continue</Link></Button>
        </motion.div>
      )}
    </div>
  );
}

export function HomePage() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let ctx: { revert: () => void } | undefined;
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([gsapModule, triggerModule]) => {
      const gsap = gsapModule.default;
      const ScrollTrigger = triggerModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((element) => {
          gsap.to(element, { yPercent: -10, ease: "none", scrollTrigger: { trigger: element, scrub: 0.6 } });
        });
      });
    });
    return () => ctx?.revert();
  }, []);

  return (
    <>
      <section className="relative overflow-hidden pb-16 pt-8 md:pb-24 md:pt-14">
        <div className="grid-fade absolute inset-x-0 top-0 -z-10 h-[860px]" />
        <div className="page-shell">
          <div className="relative overflow-hidden rounded-[32px] border border-white bg-[#f6f9fd] p-5 shadow-float sm:p-7 md:rounded-[44px] md:p-10">
            <div className="section-background" aria-hidden="true">
              <div className="stats-animation-gradient">
                <div className="stats-animation-gradient__gradient stats-animation-gradient__gradient--pre-dawn" />
                <div className="stats-animation-gradient__gradient stats-animation-gradient__gradient--sunrise" />
                <div className="stats-animation-gradient__gradient stats-animation-gradient__gradient--daytime" />
                <div className="stats-animation-gradient__gradient stats-animation-gradient__gradient--dusk" />
                <div className="stats-animation-gradient__gradient stats-animation-gradient__gradient--sunset" />
                <div className="stats-animation-gradient__gradient stats-animation-gradient__gradient--night stats-animation-gradient__gradient--active" />
              </div>
            </div>
            <div className="absolute -left-24 -top-20 h-72 w-72 rounded-full bg-blue/10 blur-[100px]" />
            <div className="relative z-10 grid items-stretch gap-8 lg:grid-cols-[1.04fr_.96fr]">
              <motion.div initial="hidden" animate="show" transition={{ staggerChildren: 0.08 }} className="flex flex-col justify-center py-4 lg:py-7">
                <motion.div variants={fade}><Eyebrow>Book. Pay. Track. Done.</Eyebrow></motion.div>
                <motion.h1 variants={fade} className="max-w-3xl text-balance text-[3.25rem] font-black leading-[.95] tracking-[-0.065em] text-ink sm:text-7xl xl:text-[5.35rem]">
                  Your shipment,<br /><span className="text-blue">booked in 60 seconds.</span>
                </motion.h1>
                <motion.p variants={fade} className="mt-6 max-w-xl text-base leading-7 text-muted md:text-lg">
                  Enter the route, choose the parcel and get an instant delivery price—pickup from your door included.
                </motion.p>
                <motion.div variants={fade}><QuickOrderCard /></motion.div>
                <motion.div variants={fade} className="mt-5 flex flex-wrap gap-x-5 gap-y-2 px-1 text-[11px] font-bold text-muted">
                  <span className="flex items-center gap-1.5"><BadgeCheck className="h-4 w-4 text-blue" /> No account needed</span>
                  <span className="flex items-center gap-1.5"><BadgeCheck className="h-4 w-4 text-blue" /> Secure payment</span>
                  <span className="flex items-center gap-1.5"><BadgeCheck className="h-4 w-4 text-blue" /> Doorstep pickup</span>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: .96, x: 22 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: .9, delay: .12, ease: [0.22, 1, 0.36, 1] }}
                className="relative min-h-[490px] overflow-hidden rounded-[28px] bg-[#020b1e] shadow-card lg:min-h-full"
              >
                <Image src="/shipray-3d-logistics-hero.png" fill priority alt="3D logistics network with delivery van, warehouse and global routes" className="object-cover object-[69%_center]" sizes="(max-width: 1024px) 100vw, 48vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020b1e]/55 via-transparent to-transparent" />
                <motion.div animate={{ y: [0, -7, 0] }} transition={{ duration: 4.5, repeat: Infinity }} className="glass absolute bottom-5 left-5 right-5 rounded-2xl border-white/20 bg-[#071936]/75 p-4 text-white backdrop-blur-xl sm:left-auto sm:w-[270px]">
                  <div className="flex items-center justify-between"><p className="text-[10px] font-black uppercase tracking-[.14em] text-white/45">Order journey</p><span className="flex items-center gap-1.5 text-[10px] font-black text-emerald-300"><span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" /> Live</span></div>
                  <div className="mt-4 flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-xl bg-blue"><Truck className="h-4 w-4" /></div><div><p className="text-sm font-black">Delhi → Bengaluru</p><p className="mt-1 text-[10px] text-white/45">Arriving Wednesday</p></div></div>
                  <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full w-[72%] rounded-full bg-gradient-to-r from-blue to-cyan-300" /></div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell py-24 md:py-32">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading eyebrow="Made to move" title="Every route. One clear system." copy="A complete logistics stack, designed around the way ambitious businesses actually ship." />
          <Button asChild variant="outline"><Link href="/services">Explore all services <ArrowRight className="h-4 w-4" /></Link></Button>
        </div>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.08 }} transition={{ staggerChildren: 0.06 }} className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div key={service.title} variants={fade} className={cn("group relative overflow-hidden rounded-[26px] border border-line p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-card", i === 0 || i === 5 ? "md:col-span-2" : "", i === 0 ? "bg-blue text-white" : "bg-white")}>
                <div className={cn("grid h-12 w-12 place-items-center rounded-2xl", i === 0 ? "bg-white/15" : "bg-sky text-blue")}><Icon className="h-5 w-5" /></div>
                <div className={cn("mt-12", i === 0 && "md:mt-20")}>
                  <h3 className="text-xl font-black tracking-[-0.035em]">{service.title}</h3>
                  <p className={cn("mt-2 max-w-sm text-sm leading-6", i === 0 ? "text-white/65" : "text-muted")}>{service.copy}</p>
                  <Link href={service.href} aria-label={`Learn about ${service.title}`} className={cn("mt-5 inline-flex h-9 w-9 items-center justify-center rounded-full transition-transform group-hover:translate-x-1", i === 0 ? "bg-white text-blue" : "bg-ink text-white")}><ArrowRight className="h-4 w-4" /></Link>
                </div>
                {i === 0 && <div className="absolute right-5 top-5 hidden h-28 w-28 rounded-full border-[18px] border-white/10 md:block" />}
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      <section className="page-shell">
        <div className="relative min-h-[640px] overflow-hidden rounded-[36px] bg-[#dfefff]">
          <Image src="/shipray-logistics-hub.png" fill alt="Shipray delivery van at a modern logistics hub" className="object-cover object-center lg:object-right" sizes="(max-width: 768px) 100vw, 1240px" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#eff7ff] via-[#eff7ff]/80 to-transparent" />
          <motion.div data-parallax initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="absolute inset-x-0 bottom-0 top-0 flex max-w-xl flex-col justify-center p-7 md:p-14">
            <Eyebrow>One connected network</Eyebrow>
            <h2 className="text-balance text-4xl font-black tracking-[-0.055em] md:text-6xl">Local precision. Global reach.</h2>
            <p className="mt-5 text-base leading-7 text-muted">From first-mile pickup to international customs and final doorstep delivery, every handoff stays visible.</p>
            <div className="mt-8 grid grid-cols-2 gap-3">
              {[["29,000+", "Indian pin codes"], ["220+", "Countries"], ["18", "Fulfilment centres"], ["99.9%", "Delivery success"]].map(([value, label]) => (
                <div key={label} className="glass rounded-2xl p-4"><p className="text-2xl font-black text-blue">{value}</p><p className="mt-1 text-xs font-bold text-muted">{label}</p></div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="page-shell py-24 md:py-32">
        <SectionHeading eyebrow="Why Shipray" title="The unfair advantage behind every delivery." copy="Intelligence where it saves time. People where judgment matters." align="center" />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div key={item.label} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} viewport={{ once: true }} className="rounded-[26px] border border-line bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-card">
                <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-sky text-blue"><Icon className="h-5 w-5" /></div>
                <p className="mt-7 text-3xl font-black tracking-[-0.05em]">{item.title}</p>
                <p className="mt-1 text-sm font-semibold text-muted">{item.label}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="bg-white/70 py-24 md:py-32">
        <div className="page-shell grid items-center gap-12 lg:grid-cols-[.9fr_1.1fr]">
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative min-h-[520px] overflow-hidden rounded-[34px] shadow-card">
            <Image src="/ecommerce-fulfillment-team.png" fill alt="Ecommerce team preparing and managing customer orders" className="object-cover" sizes="(max-width: 1024px) 100vw, 45vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/5 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white md:p-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-[10px] font-black uppercase tracking-[.14em] backdrop-blur-md"><Zap className="h-3.5 w-3.5 text-blue-300" /> Built for daily scale</span>
              <p className="mt-4 max-w-md text-2xl font-black tracking-[-0.04em] md:text-3xl">From today’s first order to tomorrow’s ten-thousandth.</p>
            </div>
          </motion.div>
          <div>
            <SectionHeading eyebrow="How it works" title="Booked to delivered, beautifully simple." copy="Five clear moments. One accountable shipping experience." />
            <div className="mt-9 space-y-3">
              {[
                ["01", "Book shipment", "Add the order or sync it from your store.", Box],
                ["02", "Pickup", "A verified partner collects it from your door.", Truck],
                ["03", "Courier matched", "The best carrier is chosen for route and speed.", Sparkles],
                ["04", "Live tracking", "Follow every movement from one clean timeline.", MapPin],
                ["05", "Delivered", "Proof of delivery closes the loop instantly.", PackageCheck],
              ].map(([num, label, copy, Icon], i) => (
                <motion.div key={label as string} initial={{ opacity: 0, x: 18 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }} viewport={{ once: true }} className="group flex items-center gap-4 rounded-[20px] border border-line bg-white p-3.5 transition hover:-translate-y-0.5 hover:border-blue/20 hover:shadow-sm">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-sky text-blue transition group-hover:bg-blue group-hover:text-white"><Icon className="h-4 w-4" /></div>
                  <div className="min-w-0 flex-1"><div className="flex items-center gap-2"><span className="text-[9px] font-black tracking-[.14em] text-blue">{num as string}</span><p className="text-sm font-black">{label as string}</p></div><p className="mt-1 text-xs leading-5 text-muted">{copy as string}</p></div>
                  <ChevronRight className="h-4 w-4 shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-blue" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell py-24 md:py-32">
        <div className="grid gap-5 lg:grid-cols-2">
          <TrackingCard />
          <RateCalculator />
        </div>
      </section>

      <section className="page-shell pb-24 md:pb-32">
        <SectionHeading eyebrow="Built around you" title="Every industry moves differently." copy="Shipray adapts the network, workflow and controls to the promise you make your customer." />
        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
          {industries.map((industry, i) => {
            const Icon = industry.icon;
            return (
              <motion.div key={industry.name} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} viewport={{ once: true }} className="group flex items-center gap-3 rounded-[22px] border border-line bg-white p-4 transition hover:-translate-y-0.5 hover:border-blue/20 hover:shadow-card md:p-5">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-sky text-blue transition group-hover:bg-blue group-hover:text-white"><Icon className="h-4 w-4" /></div>
                <p className="text-sm font-black">{industry.name}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="bg-sky/70 py-24 md:py-32">
        <div className="page-shell">
          <SectionHeading eyebrow="Customer stories" title="Trusted when the promise matters." align="center" />
          <div className="mt-12 flex snap-x gap-4 overflow-x-auto pb-6 no-scrollbar">
            {testimonials.map((testimonial) => (
              <article key={testimonial.name} className="min-w-[86%] snap-center rounded-[28px] border border-white bg-white p-7 shadow-sm sm:min-w-[58%] lg:min-w-[calc(33.333%-11px)]">
                <div className="flex gap-1 text-blue">{[1,2,3,4,5].map((v) => <Star key={v} className="h-4 w-4 fill-current" />)}</div>
                <blockquote className="mt-7 text-lg font-bold leading-8 tracking-[-0.02em]">“{testimonial.quote}”</blockquote>
                <div className="mt-8 flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-full bg-ink text-xs font-black text-white">{testimonial.initials}</div>
                  <div><p className="text-sm font-black">{testimonial.name}</p><p className="text-xs text-muted">{testimonial.role}</p></div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell py-24 md:py-32">
        <div className="flex items-end justify-between gap-5">
          <SectionHeading eyebrow="Shipray journal" title="Ideas that move businesses." />
          <Button asChild variant="outline" className="hidden sm:inline-flex"><Link href="/blog">View all <ArrowRight className="h-4 w-4" /></Link></Button>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            ["Operations", "A practical guide to lowering RTO without hurting conversion", "8 min"],
            ["Cross-border", "The new exporter’s checklist for smoother customs clearance", "6 min"],
            ["Intelligence", "What your delivery exceptions are trying to tell you", "5 min"],
          ].map(([tag, title, time], i) => (
            <Link href="/blog" key={title} className="group rounded-[26px] border border-line bg-white p-5 transition hover:-translate-y-1 hover:shadow-card">
              <div className={cn("relative h-44 overflow-hidden rounded-[19px]", i === 0 ? "bg-blue" : i === 1 ? "bg-[#d8ebff]" : "bg-ink")}>
                <div className="absolute inset-0 grid-fade opacity-40" />
                <div className={cn("absolute bottom-5 left-5 grid h-14 w-14 place-items-center rounded-2xl", i === 0 ? "bg-white text-blue" : "bg-white/90 text-ink")}>{i === 0 ? <TrendingUp /> : i === 1 ? <Plane /> : <Zap />}</div>
              </div>
              <div className="mt-5 flex items-center justify-between text-[10px] font-black uppercase tracking-wider text-blue"><span>{tag}</span><span className="text-muted">{time}</span></div>
              <h3 className="mt-3 text-xl font-black leading-7 tracking-[-0.035em] group-hover:text-blue">{title}</h3>
              <span className="mt-5 inline-flex items-center gap-1 text-xs font-black">Read story <ChevronRight className="h-3.5 w-3.5" /></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="page-shell">
        <div className="relative overflow-hidden rounded-[34px] bg-blue p-8 text-white md:p-14 lg:flex lg:items-center lg:justify-between">
          <div className="absolute -right-28 -top-28 h-80 w-80 rounded-full border-[52px] border-white/10" />
          <div className="relative max-w-2xl">
            <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-blue-100"><BadgeCheck className="h-4 w-4" /> Ready when you are</span>
            <h2 className="mt-5 text-balance text-4xl font-black tracking-[-0.055em] md:text-6xl">Your next shipment deserves a better system.</h2>
          </div>
          <div className="relative mt-8 flex flex-col gap-3 sm:flex-row lg:mt-0 lg:flex-col">
            <Button asChild size="lg" className="bg-white text-ink hover:bg-blue-50"><Link href="/book-shipment">Book a shipment <ArrowRight className="h-4 w-4" /></Link></Button>
            <Link href="/contact" className="text-center text-xs font-bold text-white/70 hover:text-white">Talk to a logistics expert</Link>
          </div>
        </div>
      </section>
    </>
  );
}
