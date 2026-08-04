"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import {
  ArrowRight,
  Box,
  Check,
  CheckCircle2,
  IndianRupee,
  MapPin,
  PackageCheck,
  Ruler,
  Search,
  ShieldCheck,
  Sparkles,
  Truck,
  Weight,
} from "lucide-react";

export type UtilityToolSlug = "weight-calculator" | "rate-calculator" | "tracking";

const pageConfig = {
  "weight-calculator": {
    eyebrow: "Weight calculator",
    title: "Measure once. Ship at the right weight.",
    description:
      "Compare actual and volumetric weight before you book, so courier charges stay clear from the start.",
    metric: "< 10 sec",
    metricLabel: "to calculate chargeable weight",
    Icon: Weight,
    points: ["Courier-ready result", "No account required", "Instant calculation"],
    features: [
      [Ruler, "Enter dimensions", "Add the parcel length, width and height in centimetres."],
      [Weight, "Add actual weight", "We compare the scale weight with volumetric weight."],
      [PackageCheck, "Use the higher value", "The result is ready to use when comparing courier rates."],
    ],
  },
  "rate-calculator": {
    eyebrow: "Rate calculator",
    title: "Know the cost before you ship.",
    description:
      "Enter a route and parcel details to compare an indicative courier rate before creating your shipment.",
    metric: "14+",
    metricLabel: "courier partners compared",
    Icon: IndianRupee,
    points: ["Fastest and lowest options", "Clear delivery estimate", "No hidden platform fee"],
    features: [
      [MapPin, "Add your route", "Enter the pickup and delivery pin codes for the shipment."],
      [Box, "Describe the parcel", "Add dead weight and choose the payment method."],
      [Truck, "Compare services", "Review a practical rate and delivery promise before booking."],
    ],
  },
  tracking: {
    eyebrow: "Track order",
    title: "Every shipment. One clear answer.",
    description:
      "Follow the latest scan, understand the current status and see the delivery promise in one clean view.",
    metric: "24×7",
    metricLabel: "shipment visibility",
    Icon: Search,
    points: ["Latest scan visible", "Delivery promise", "Exception updates"],
    features: [
      [Search, "Enter shipment ID", "Use the ShipRoute shipment number shared at booking."],
      [MapPin, "See every movement", "Follow pickup, hub transit and out-for-delivery scans."],
      [ShieldCheck, "Act on exceptions", "Get a clear status when a shipment needs attention."],
    ],
  },
} as const;

const inputClass =
  "mt-2 h-[54px] w-full rounded-lg border border-slate-300 bg-white px-4 text-[15px] font-semibold text-slate-950 outline-none transition placeholder:font-medium placeholder:text-slate-400 focus:border-[#2352bd] focus:ring-4 focus:ring-[#2352bd]/10";

const labelClass = "block text-[11px] font-black uppercase tracking-[.12em] text-slate-600";

function ToolCard({ slug }: { slug: UtilityToolSlug }) {
  const [showResult, setShowResult] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowResult(true);
  };

  return (
    <div className="relative overflow-hidden rounded-[24px] border border-white/70 bg-white text-[#081225] shadow-[0_30px_80px_rgba(8,18,37,.24)]">
      <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 md:px-7">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[.15em] text-[#2352bd]">Try it now</p>
          <h2 className="mt-1 text-xl font-black tracking-[-.035em]">
            {slug === "weight-calculator"
              ? "Calculate chargeable weight"
              : slug === "rate-calculator"
                ? "Check an indicative rate"
                : "Find your shipment"}
          </h2>
        </div>
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#eaf4ff] text-[#2352bd]">
          {slug === "weight-calculator" ? (
            <Ruler className="h-5 w-5" />
          ) : slug === "rate-calculator" ? (
            <IndianRupee className="h-5 w-5" />
          ) : (
            <Search className="h-5 w-5" />
          )}
        </span>
      </div>

      <form onSubmit={submit} className="p-5 md:p-7">
        {slug === "weight-calculator" && (
          <div className="grid gap-4 sm:grid-cols-2">
            <label className={labelClass}>
              Length
              <input className={inputClass} inputMode="decimal" placeholder="30 cm" required />
            </label>
            <label className={labelClass}>
              Width
              <input className={inputClass} inputMode="decimal" placeholder="20 cm" required />
            </label>
            <label className={labelClass}>
              Height
              <input className={inputClass} inputMode="decimal" placeholder="15 cm" required />
            </label>
            <label className={labelClass}>
              Actual weight
              <input className={inputClass} inputMode="decimal" placeholder="1.5 kg" required />
            </label>
          </div>
        )}

        {slug === "rate-calculator" && (
          <div className="grid gap-4 sm:grid-cols-2">
            <label className={labelClass}>
              Pickup pin code
              <input className={inputClass} inputMode="numeric" maxLength={6} placeholder="110001" required />
            </label>
            <label className={labelClass}>
              Delivery pin code
              <input className={inputClass} inputMode="numeric" maxLength={6} placeholder="400001" required />
            </label>
            <label className={labelClass}>
              Dead weight
              <input className={inputClass} inputMode="decimal" placeholder="0.5 kg" required />
            </label>
            <label className={labelClass}>
              Payment
              <select className={inputClass} defaultValue="Prepaid">
                <option>Prepaid</option>
                <option>Cash on delivery</option>
              </select>
            </label>
          </div>
        )}

        {slug === "tracking" && (
          <label className={labelClass}>
            Shipment number
            <input className={inputClass} placeholder="e.g. SRX 2084 9182" required />
          </label>
        )}

        <button
          type="submit"
          className="mt-5 inline-flex h-[54px] w-full items-center justify-center gap-2 rounded-lg bg-[#081225] px-6 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-[#2352bd]"
        >
          {slug === "weight-calculator"
            ? "Calculate weight"
            : slug === "rate-calculator"
              ? "Compare courier rates"
              : "Track shipment"}
          <ArrowRight className="h-4 w-4" />
        </button>

        {showResult && <ToolResult slug={slug} />}
      </form>
    </div>
  );
}

function ToolResult({ slug }: { slug: UtilityToolSlug }) {
  if (slug === "weight-calculator") {
    return (
      <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
          <div>
            <p className="text-sm font-black text-emerald-950">Chargeable weight: 1.8 kg</p>
            <p className="mt-1 text-xs leading-5 text-emerald-800/75">
              Volumetric weight is higher than actual weight, so 1.8 kg will be used for the rate.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (slug === "rate-calculator") {
    return (
      <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200">
        <div className="flex items-center justify-between bg-[#eaf4ff] px-4 py-3">
          <span className="text-[10px] font-black uppercase tracking-[.12em] text-[#2352bd]">Recommended service</span>
          <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-black text-emerald-700">Best value</span>
        </div>
        <div className="flex items-center gap-4 bg-white p-4">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#081225] text-white">
            <Truck className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm font-black">ShipRoute Economy</p>
            <p className="mt-1 text-xs text-slate-500">Estimated delivery in 4–5 days</p>
          </div>
          <p className="ml-auto text-2xl font-black tracking-[-.04em]">₹86</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-5 rounded-2xl bg-[#081225] p-4 text-white">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
          <span className="text-[10px] font-black uppercase tracking-[.12em] text-white/60">Live status</span>
        </div>
        <span className="rounded-full bg-emerald-400/15 px-2.5 py-1 text-[10px] font-black text-emerald-300">
          Out for delivery
        </span>
      </div>
      <div className="mt-4 flex gap-3 border-t border-white/10 pt-4">
        <Truck className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" />
        <div>
          <p className="text-sm font-black">Gurugram delivery centre</p>
          <p className="mt-1 text-xs leading-5 text-white/55">Latest scan at 9:42 AM · Delivery expected today before 6 PM</p>
        </div>
      </div>
    </div>
  );
}

export function UtilityToolPage({ slug }: { slug: UtilityToolSlug }) {
  const config = pageConfig[slug];
  const PageIcon = config.Icon;

  return (
    <div className="bg-white">
      <section className="relative overflow-hidden bg-[#194cbd] text-white">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#194cbd_0%,#3856ce_54%,#7669e3_100%)]" />
        <div className="pointer-events-none absolute -left-44 bottom-[-260px] h-[520px] w-[520px] rounded-full border-[42px] border-white/[.08]" />
        <div className="pointer-events-none absolute -right-32 top-[-190px] h-[470px] w-[470px] rounded-full border-[38px] border-cyan-300/[.12]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#194cbd]/45 to-transparent" />

        <div className="page-shell relative grid gap-10 py-14 md:py-20 lg:grid-cols-[.82fr_1.18fr] lg:items-center lg:gap-16">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-2 text-[10px] font-black uppercase tracking-[.15em] text-cyan-200">
              <PageIcon className="h-3.5 w-3.5" />
              {config.eyebrow}
            </div>
            <h1 className="mt-6 max-w-2xl text-balance font-display text-4xl font-extrabold leading-[1.02] tracking-[-.045em] sm:text-5xl md:text-6xl">
              {config.title}
            </h1>
            <p className="mt-6 max-w-xl text-base font-medium leading-7 text-white/80 md:text-lg md:leading-8">
              {config.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3">
              {config.points.map((point) => (
                <span key={point} className="inline-flex items-center gap-2 text-xs font-bold text-white/85">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-cyan-300 text-[#07375c]">
                    <Check className="h-3 w-3 stroke-[3]" />
                  </span>
                  {point}
                </span>
              ))}
            </div>

            <div className="mt-10 flex items-center gap-4 border-t border-white/15 pt-6">
              <p className="text-3xl font-black tracking-[-.045em] text-cyan-200">{config.metric}</p>
              <div className="h-9 w-px bg-white/20" />
              <p className="max-w-[180px] text-xs font-bold leading-5 text-white/60">{config.metricLabel}</p>
            </div>
          </div>

          <ToolCard slug={slug} />
        </div>
      </section>

      <section className="page-shell py-16 md:py-24">
        <div className="grid gap-8 border-b border-slate-200 pb-10 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[.16em] text-[#2352bd]">A clearer workflow</p>
            <h2 className="mt-4 max-w-xl text-balance text-3xl font-black tracking-[-.05em] text-[#081225] md:text-5xl">
              From details to a useful answer.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-slate-600 lg:justify-self-end md:text-base">
            The tool keeps the important inputs together and turns them into a result your operations team can use immediately.
          </p>
        </div>

        <div className="grid md:grid-cols-3">
          {config.features.map(([Icon, title, copy], index) => (
            <article
              key={title}
              className="border-b border-slate-200 py-8 md:min-h-[260px] md:border-b-0 md:border-r md:px-7 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
            >
              <div className="flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#eaf4ff] text-[#2352bd]">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-[11px] font-black text-slate-400">0{index + 1}</span>
              </div>
              <h3 className="mt-8 text-lg font-black tracking-[-.03em] text-[#081225]">{title}</h3>
              <p className="mt-3 max-w-sm text-sm leading-6 text-slate-600">{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="page-shell">
        <div className="grid gap-5 rounded-t-2xl bg-[linear-gradient(110deg,#194cbd_0%,#3856ce_52%,#7669e3_100%)] px-6 py-7 text-white shadow-[0_-12px_36px_rgba(56,86,206,.12)] md:grid-cols-[auto_1fr_auto] md:items-center md:px-9">
          <div className="flex items-center gap-2 text-cyan-200">
            <Sparkles className="h-4 w-4" />
            <p className="text-[11px] font-black uppercase tracking-[.16em]">Ready to move?</p>
          </div>
          <h2 className="text-xl font-extrabold tracking-[-.025em] md:text-2xl">
            Turn this result into a booked shipment.
          </h2>
          <Link
            href="/book-shipment"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#39DED4] px-5 text-sm font-black text-[#07375c] transition hover:-translate-y-0.5 hover:bg-[#59e8df]"
          >
            Book shipment <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
