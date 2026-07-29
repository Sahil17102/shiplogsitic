"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Box,
  Check,
  CheckCircle2,
  Clock3,
  MapPin,
  MousePointer2,
  PackageCheck,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Truck,
  Weight,
} from "lucide-react";

const stages = ["Route", "Parcel", "Service", "Booked"];

const inputClass =
  "mt-1.5 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-800 outline-none transition focus:border-blue focus:ring-2 focus:ring-blue/10";

export function MiniBookingDemo() {
  const [stage, setStage] = useState(0);
  const [selectedService, setSelectedService] = useState("Economy");

  const next = () => setStage((current) => Math.min(current + 1, stages.length - 1));
  const back = () => setStage((current) => Math.max(current - 1, 0));

  useEffect(() => {
    const serviceTimer = stage === 2
      ? window.setTimeout(() => setSelectedService("Express"), 1050)
      : undefined;
    const advanceTimer = window.setTimeout(() => {
      setStage((current) => current === stages.length - 1 ? 0 : current + 1);
      if (stage === stages.length - 1) setSelectedService("Economy");
    }, stage === 3 ? 4300 : 3400);

    return () => {
      window.clearTimeout(advanceTimer);
      if (serviceTimer) window.clearTimeout(serviceTimer);
    };
  }, [stage]);

  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-[26px] border border-slate-200 bg-[#f5f8fc] shadow-[0_24px_70px_rgba(15,23,42,.12)]">
      <div className="flex h-12 items-center justify-between border-b border-slate-200 bg-white px-4">
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-blue text-white"><Box className="h-3.5 w-3.5" /></span>
          <span className="text-xs font-extrabold tracking-[-.03em] text-slate-950">ShipRoute booking</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-1 text-[8px] font-extrabold uppercase tracking-[.08em] text-emerald-700 sm:inline-flex">
            <motion.span animate={{ opacity: [.35, 1, .35] }} transition={{ duration: 1.4, repeat: Infinity }} className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Auto demo
          </span>
          <span className="h-2 w-2 rounded-full bg-slate-200" />
          <span className="h-2 w-2 rounded-full bg-slate-200" />
          <span className="h-2 w-2 rounded-full bg-cyan-400" />
        </div>
      </div>

      <div className="relative border-b border-slate-200 bg-white px-4 py-3">
        <div className="absolute left-7 right-7 top-[18px] h-px bg-slate-200" />
        <motion.div
          animate={{ width: `${(stage / (stages.length - 1)) * 100}%` }}
          transition={{ duration: .35 }}
          className="absolute left-7 top-[18px] h-px max-w-[calc(100%-3.5rem)] bg-cyan-500"
        />
        <div className="relative flex justify-between">
          {stages.map((label, index) => (
            <button key={label} type="button" onClick={() => index <= stage && setStage(index)} className="flex flex-col items-center gap-1.5">
              <span className={index <= stage ? "grid h-3.5 w-3.5 place-items-center rounded-full border-2 border-white bg-cyan-500 ring-1 ring-cyan-500" : "h-3.5 w-3.5 rounded-full border-2 border-white bg-slate-200 ring-1 ring-slate-200"} />
              <span className={index === stage ? "text-[8px] font-extrabold text-slate-800" : "text-[8px] font-semibold text-slate-400"}>{label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="relative h-[calc(100%-105px)] overflow-hidden p-4 sm:p-5">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={stage}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: .3, ease: [0.22, 1, 0.36, 1] }}
            className="h-full"
          >
            {stage === 0 && (
              <div className="flex h-full flex-col">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[.14em] text-blue">Step 1 of 4</p>
                  <h3 className="mt-1 text-xl font-extrabold tracking-[-.04em] text-slate-950 sm:text-2xl">Where are you shipping?</h3>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <label className="text-[9px] font-extrabold uppercase tracking-[.08em] text-slate-500">
                    Pickup
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 mt-0.5 h-3.5 w-3.5 -translate-y-1/2 text-blue" />
                      <input className={`${inputClass} pl-9`} defaultValue="New Delhi · 110001" aria-label="Pickup location" />
                    </div>
                  </label>
                  <label className="text-[9px] font-extrabold uppercase tracking-[.08em] text-slate-500">
                    Destination
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 mt-0.5 h-3.5 w-3.5 -translate-y-1/2 text-cyan-600" />
                      <input className={`${inputClass} pl-9`} defaultValue="Mumbai · 400001" aria-label="Destination" />
                    </div>
                  </label>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <button type="button" className="flex items-center gap-3 rounded-xl border-2 border-blue bg-blue-50 p-3 text-left">
                    <PackageCheck className="h-5 w-5 text-blue" />
                    <span><span className="block text-[10px] font-extrabold text-slate-900">Courier</span><span className="text-[8px] text-slate-500">Boxes & parcels</span></span>
                  </button>
                  <button type="button" className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 text-left">
                    <Truck className="h-5 w-5 text-slate-400" />
                    <span><span className="block text-[10px] font-extrabold text-slate-900">Freight</span><span className="text-[8px] text-slate-500">Bulk movement</span></span>
                  </button>
                </div>
                <button type="button" onClick={next} className="mt-auto inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-blue text-xs font-extrabold text-white transition hover:bg-[#174fc7]">
                  Add parcel details <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            )}

            {stage === 1 && (
              <div className="flex h-full flex-col">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-[.14em] text-blue">Step 2 of 4</p>
                    <h3 className="mt-1 text-xl font-extrabold tracking-[-.04em] text-slate-950 sm:text-2xl">Tell us about the parcel.</h3>
                  </div>
                  <button type="button" onClick={back} aria-label="Previous step" className="grid h-9 w-9 place-items-center rounded-xl border border-slate-200 bg-white"><ArrowLeft className="h-4 w-4" /></button>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <label className="rounded-xl border border-slate-200 bg-white p-3 text-[9px] font-extrabold uppercase tracking-[.08em] text-slate-500">
                    <Box className="mb-2 h-4 w-4 text-blue" /> Package type
                    <select className="mt-1 w-full bg-transparent text-xs font-bold normal-case text-slate-800 outline-none">
                      <option>Standard box</option>
                      <option>Document</option>
                      <option>Fragile item</option>
                    </select>
                  </label>
                  <label className="rounded-xl border border-slate-200 bg-white p-3 text-[9px] font-extrabold uppercase tracking-[.08em] text-slate-500">
                    <Weight className="mb-2 h-4 w-4 text-blue" /> Total weight
                    <input className="mt-1 w-full bg-transparent text-xs font-bold normal-case text-slate-800 outline-none" defaultValue="1.2 kg" />
                  </label>
                </div>
                <div className="mt-3 rounded-xl border border-slate-200 bg-white p-3">
                  <p className="text-[9px] font-extrabold uppercase tracking-[.08em] text-slate-500">Package dimensions</p>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {["30 cm", "20 cm", "12 cm"].map((value, index) => (
                      <div key={value} className="rounded-lg bg-slate-50 px-2 py-2 text-center">
                        <p className="text-[8px] text-slate-400">{["Length", "Width", "Height"][index]}</p>
                        <p className="mt-1 text-[10px] font-extrabold text-slate-800">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <button type="button" onClick={next} className="mt-auto inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-blue text-xs font-extrabold text-white">
                  Compare services <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            )}

            {stage === 2 && (
              <div className="flex h-full flex-col">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-[.14em] text-blue">3 recommended options</p>
                    <h3 className="mt-1 text-xl font-extrabold tracking-[-.04em] text-slate-950 sm:text-2xl">Choose your service.</h3>
                  </div>
                  <button type="button" onClick={back} aria-label="Previous step" className="grid h-9 w-9 place-items-center rounded-xl border border-slate-200 bg-white"><ArrowLeft className="h-4 w-4" /></button>
                </div>
                <div className="mt-4 space-y-2">
                  {[
                    ["Economy", "₹118", "3–4 days"],
                    ["Express", "₹164", "1–2 days"],
                    ["Priority", "₹219", "Next day"],
                  ].map(([name, price, eta]) => (
                    <button
                      key={name}
                      type="button"
                      onClick={() => setSelectedService(name)}
                      className={selectedService === name ? "flex w-full items-center rounded-xl border-2 border-blue bg-blue-50 p-3 text-left" : "flex w-full items-center rounded-xl border border-slate-200 bg-white p-3 text-left"}
                    >
                      <span className={selectedService === name ? "grid h-8 w-8 place-items-center rounded-lg bg-blue text-white" : "grid h-8 w-8 place-items-center rounded-lg bg-slate-100 text-slate-500"}><Truck className="h-4 w-4" /></span>
                      <span className="ml-3"><span className="block text-[10px] font-extrabold text-slate-900">{name}</span><span className="mt-0.5 flex items-center gap-1 text-[8px] text-slate-500"><Clock3 className="h-3 w-3" /> {eta}</span></span>
                      <span className="ml-auto text-sm font-extrabold text-slate-950">{price}</span>
                      {selectedService === name && <Check className="ml-2 h-4 w-4 text-blue" />}
                    </button>
                  ))}
                </div>
                <button type="button" onClick={next} className="mt-auto inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-blue text-xs font-extrabold text-white">
                  Book {selectedService} <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            )}

            {stage === 3 && (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <motion.div initial={{ scale: .55, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 180 }} className="relative grid h-20 w-20 place-items-center rounded-full bg-emerald-50 text-emerald-600">
                  <CheckCircle2 className="h-10 w-10" />
                  <motion.span animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} className="absolute -right-1 top-0 text-cyan-500"><Sparkles className="h-5 w-5" /></motion.span>
                </motion.div>
                <p className="mt-5 text-[9px] font-black uppercase tracking-[.14em] text-emerald-600">Booking confirmed</p>
                <h3 className="mt-2 text-2xl font-extrabold tracking-[-.04em] text-slate-950">Your pickup is scheduled.</h3>
                <p className="mt-2 text-[10px] leading-5 text-slate-500">Tracking ID SRX-2084-9182<br />Pickup today between 2:00–4:00 PM</p>
                <div className="mt-4 flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-[9px] font-bold text-slate-600 shadow-sm">
                  <ShieldCheck className="h-4 w-4 text-blue" /> Insured and carrier verified
                </div>
                <button type="button" onClick={() => setStage(0)} className="mt-5 inline-flex items-center gap-2 text-[10px] font-extrabold text-blue">
                  <RotateCcw className="h-3.5 w-3.5" /> Try demo again
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`cursor-${stage}`}
          initial={{ opacity: 0, x: 42, y: -24, scale: .9 }}
          animate={{
            opacity: [0, 1, 1, 1, 0],
            x: [42, 20, 0, 0, 0],
            y: [-24, -12, 0, 0, 0],
            scale: [.9, 1, 1, .82, 1],
          }}
          transition={{ duration: 2.4, times: [0, .3, .62, .74, 1], delay: .55, ease: "easeInOut" }}
          className="pointer-events-none absolute bottom-7 left-1/2 z-40 text-slate-950 drop-shadow-[0_4px_5px_rgba(255,255,255,.9)]"
          aria-hidden="true"
        >
          <motion.span
            animate={{ scale: [0, 0, 2.2], opacity: [0, 0, .38, 0] }}
            transition={{ duration: 2.4, times: [0, .69, .76, 1], delay: .55 }}
            className="absolute -left-2 -top-2 h-8 w-8 rounded-full border-2 border-cyan-500"
          />
          <MousePointer2 className="h-7 w-7 fill-white stroke-[1.8]" />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
