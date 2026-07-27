"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Check, MapPin, PackageCheck, ShieldCheck, Truck } from "lucide-react";
import { services } from "@/lib/site-data";
import { ShipmentScrollStory } from "./shipment-scroll-story";
import { LogisticsBackbone } from "./logistics-backbone";
import { FreightOrbitHero } from "./freight-orbit-hero";
import { MiniBookingDemo } from "./mini-booking-demo";

const inputClass =
  "mt-2 h-12 w-full rounded-lg border border-slate-300 bg-white px-3.5 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-blue focus:ring-2 focus:ring-blue/10";

export function CleanHomePage() {
  const [estimateReady, setEstimateReady] = useState(false);

  return (
    <div className="bg-white">
      <FreightOrbitHero />

      <section id="estimate" className="border-b border-slate-200 bg-white">
        <div className="page-shell py-10 md:py-12">
          <div className="grid gap-8 lg:grid-cols-[280px_1fr] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[.16em] text-blue">Quick estimate</p>
              <h2 className="mt-3 text-3xl font-black tracking-[-.045em] text-ink">Get a price before you book.</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">Enter the route and parcel details. You can complete the booking after reviewing the price.</p>
            </div>
            <form onSubmit={(event) => { event.preventDefault(); setEstimateReady(true); }} className="grid gap-4 sm:grid-cols-2 xl:grid-cols-[1fr_1fr_.8fr_auto] xl:items-end">
              <label className="text-xs font-black uppercase tracking-[.1em] text-slate-600">
                Pickup pin code
                <input required inputMode="numeric" maxLength={6} className={inputClass} placeholder="110001" />
              </label>
              <label className="text-xs font-black uppercase tracking-[.1em] text-slate-600">
                Delivery pin code
                <input required inputMode="numeric" maxLength={6} className={inputClass} placeholder="400001" />
              </label>
              <label className="text-xs font-black uppercase tracking-[.1em] text-slate-600">
                Weight
                <select className={inputClass} defaultValue="0.5 kg">
                  <option>0.5 kg</option>
                  <option>1 kg</option>
                  <option>2 kg</option>
                  <option>5 kg</option>
                </select>
              </label>
              <button type="submit" className="h-12 rounded-lg bg-ink px-6 text-sm font-black text-white transition hover:bg-blue">Check price</button>
            </form>
          </div>
          {estimateReady && (
            <div className="mt-6 flex flex-col justify-between gap-4 border-t border-slate-300 pt-6 sm:flex-row sm:items-center">
              <div className="flex items-center gap-3">
                <PackageCheck className="h-5 w-5 text-emerald-600" />
                <div><p className="text-sm font-black text-ink">Estimated price: ₹118</p><p className="mt-1 text-xs text-slate-500">Delivery in 2–3 working days</p></div>
              </div>
              <Link href="/book-shipment" className="inline-flex items-center gap-2 text-sm font-black text-blue">Continue to booking <ArrowRight className="h-4 w-4" /></Link>
            </div>
          )}
        </div>
      </section>

      <LogisticsBackbone />

      <section className="page-shell pb-20 md:pb-28">
        <div className="grid gap-8 border-b border-slate-200 pb-10 md:grid-cols-[1fr_1fr] md:items-end">
          <h2 className="max-w-xl text-balance text-4xl font-black tracking-[-.055em] text-ink md:text-6xl">What do you need to move?</h2>
          <p className="max-w-xl text-base leading-7 text-slate-600 md:justify-self-end">Parcel delivery, freight and fulfilment are handled by the same operations team, with one place to track progress.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 6).map((service, index) => {
            const Icon = service.icon;
            return (
              <Link key={service.title} href={service.href} className="group border-b border-slate-200 px-1 py-8 transition hover:bg-slate-50 md:px-6 md:nth-[odd]:border-r lg:border-r lg:nth-[3n]:border-r-0">
                <div className="flex items-center justify-between">
                  <Icon className="h-6 w-6 text-blue" />
                  <span className="text-xs font-black text-slate-400">0{index + 1}</span>
                </div>
                <h3 className="mt-8 text-xl font-black tracking-[-.03em] text-ink">{service.title}</h3>
                <p className="mt-3 max-w-sm text-sm leading-6 text-slate-600">{service.copy}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-black text-blue">View service <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
              </Link>
            );
          })}
        </div>
      </section>

      <ShipmentScrollStory />

      <section className="border-y border-slate-200 bg-[#f6f9fd]">
        <div className="page-shell grid gap-12 py-20 md:py-28 lg:grid-cols-2 lg:items-center">
          <MiniBookingDemo />
          <div>
            <p className="text-xs font-black uppercase tracking-[.16em] text-blue">How it works</p>
            <h2 className="mt-4 max-w-xl text-balance text-4xl font-black tracking-[-.055em] text-ink md:text-6xl">A process your team can learn in an afternoon.</h2>
            <div className="mt-10">
              {[
                ["01", "Add the shipment", "Enter it manually or connect your sales channel."],
                ["02", "Choose the service", "Compare price and delivery time before booking."],
                ["03", "We collect it", "A verified carrier picks it up from your location."],
                ["04", "Track the delivery", "Your team and customer see the same updates."],
              ].map(([number, title, copy]) => (
                <div key={number} className="grid grid-cols-[44px_1fr] gap-4 border-t border-slate-300 py-5">
                  <span className="text-xs font-black text-blue">{number}</span>
                  <div><h3 className="text-base font-black text-ink">{title}</h3><p className="mt-1 text-sm leading-6 text-slate-600">{copy}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell py-20 md:py-28">
        <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[.16em] text-blue">Why teams switch</p>
            <h2 className="mt-4 text-balance text-4xl font-black tracking-[-.055em] text-ink md:text-6xl">Fewer tools. Fewer follow-ups.</h2>
          </div>
          <div className="border-t border-slate-200">
            {[
              [Truck, "One place to book", "No switching between separate courier portals for every order."],
              [MapPin, "Exceptions surface early", "Delayed pickups and delivery issues are flagged while there is still time to act."],
              [ShieldCheck, "One support team", "Your team has a clear point of contact when a shipment needs attention."],
            ].map(([Icon, title, copy]) => {
              const ItemIcon = Icon as typeof Truck;
              return (
                <div key={title as string} className="grid grid-cols-[48px_1fr] gap-5 border-b border-slate-200 py-7">
                  <ItemIcon className="mt-1 h-5 w-5 text-blue" />
                  <div><h3 className="text-lg font-black text-ink">{title as string}</h3><p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">{copy as string}</p></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="page-shell">
        <div className="grid gap-5 rounded-t-2xl bg-[linear-gradient(110deg,#194cbd_0%,#3856ce_52%,#7669e3_100%)] px-6 py-7 text-white shadow-[0_-12px_36px_rgba(56,86,206,.12)] md:grid-cols-[auto_1fr_auto] md:items-center md:px-9">
          <p className="text-[11px] font-black uppercase tracking-[.16em] text-cyan-200">Operations team</p>
          <h2 className="text-xl font-extrabold tracking-[-.025em] md:text-2xl">Tell us what you ship—we&apos;ll suggest a practical setup.</h2>
          <Link href="/contact" className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#39DED4] px-5 text-sm font-black text-[#07375c] transition hover:-translate-y-0.5 hover:bg-[#59e8df]">Contact us <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>
    </div>
  );
}
