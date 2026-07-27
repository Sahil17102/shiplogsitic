"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Check, Truck } from "lucide-react";

const routes = [
  "M -40 145 H 190 Q 215 145 215 170 V 250 Q 215 275 240 275 H 390",
  "M 240 -20 V 92 Q 240 115 265 115 H 470",
  "M 1240 155 H 1010 Q 985 155 985 180 V 285 Q 985 310 960 310 H 820",
  "M 1160 590 H 965 Q 940 590 940 565 V 455 Q 940 430 915 430 H 785",
  "M -20 565 H 180 Q 205 565 205 540 V 450 Q 205 425 230 425 H 405",
  "M 505 700 V 580 Q 505 555 530 555 H 700",
];

const routeOffsets = [0.04, 0.37, 0.18, 0.62, 0.76, 0.48];

export function ScrollRouteHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const vehicleRefs = useRef<(SVGGElement | null)[]>([]);
  const [pickupPin, setPickupPin] = useState("");
  const [deliveryPin, setDeliveryPin] = useState("");
  const router = useRouter();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let frame = 0;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const placeVehicles = () => {
      frame = 0;
      const bounds = section.getBoundingClientRect();
      const rawProgress = (window.innerHeight - bounds.top) / (window.innerHeight + bounds.height);
      const scrollProgress = reducedMotion ? 0.34 : Math.min(1, Math.max(0, rawProgress));

      pathRefs.current.forEach((path, index) => {
        const vehicle = vehicleRefs.current[index];
        if (!path || !vehicle) return;

        const pathLength = path.getTotalLength();
        const progress = (routeOffsets[index] + scrollProgress * (1.1 + index * 0.035)) % 1;
        const distance = progress * pathLength;
        const point = path.getPointAtLength(distance);
        const nextPoint = path.getPointAtLength(Math.min(pathLength, distance + 1.5));
        const rotation = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * (180 / Math.PI);

        vehicle.setAttribute("transform", `translate(${point.x} ${point.y}) rotate(${rotation})`);
      });
    };

    const requestPlacement = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(placeVehicles);
    };

    placeVehicles();
    window.addEventListener("scroll", requestPlacement, { passive: true });
    window.addEventListener("resize", requestPlacement);

    return () => {
      window.removeEventListener("scroll", requestPlacement);
      window.removeEventListener("resize", requestPlacement);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const checkCourierRates = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = new URLSearchParams();
    if (pickupPin.trim()) query.set("pickup", pickupPin.trim());
    if (deliveryPin.trim()) query.set("delivery", deliveryPin.trim());
    router.push(`/courier-calculator${query.size ? `?${query.toString()}` : ""}`);
  };

  return (
    <section ref={sectionRef} className="relative min-h-[690px] overflow-hidden border-b border-slate-200 bg-white md:min-h-[760px]">
      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "linear-gradient(rgba(15,23,42,.045) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,.045) 1px, transparent 1px)",
          backgroundSize: "46px 46px",
        }}
      />
      <div className="absolute left-1/2 top-1/2 h-[520px] w-[780px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-50/80 blur-3xl" />

      <svg className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[1200px] max-w-none -translate-x-1/2 -translate-y-1/2" viewBox="0 0 1200 700" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="route-line" x1="0" y1="0" x2="1200" y2="700" gradientUnits="userSpaceOnUse">
            <stop stopColor="#2563eb" stopOpacity=".72" />
            <stop offset=".48" stopColor="#cbd5e1" stopOpacity=".7" />
            <stop offset="1" stopColor="#4f46e5" stopOpacity=".72" />
          </linearGradient>
          <filter id="vehicle-shadow" x="-50%" y="-80%" width="200%" height="260%">
            <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#0f172a" floodOpacity=".2" />
          </filter>
        </defs>

        {routes.map((route, index) => (
          <path
            key={route}
            ref={(element) => { pathRefs.current[index] = element; }}
            d={route}
            stroke="url(#route-line)"
            strokeWidth={index % 2 === 0 ? 1.8 : 1.35}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        ))}

        {routes.map((_, index) => (
          <g key={index} ref={(element) => { vehicleRefs.current[index] = element; }} filter="url(#vehicle-shadow)">
            <rect x="-26" y="-9" width="33" height="15" rx="1.5" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.1" />
            <rect x="-23" y="-6" width="27" height="1.8" rx=".9" fill="#e2e8f0" />
            <path d="M7 -7 H14.5 L20 -1.5 V6 H7 Z" fill="#e5e7eb" stroke="#94a3b8" strokeWidth="1.1" />
            <path d="M10 -5 H14 L17.5 -1.8 H10 Z" fill="#bfdbfe" stroke="#93c5fd" strokeWidth=".6" />
            <rect x="18.5" y="2" width="3" height="2" rx=".5" fill={index % 2 === 0 ? "#2563eb" : "#64748b"} />
            <rect x="-28" y="4" width="3" height="2" rx=".5" fill="#94a3b8" />
            <circle cx="-17" cy="7" r="3.2" fill="#334155" />
            <circle cx="14" cy="7" r="3.2" fill="#334155" />
            <circle cx="-17" cy="7" r="1.25" fill="#cbd5e1" />
            <circle cx="14" cy="7" r="1.25" fill="#cbd5e1" />
          </g>
        ))}
      </svg>

      <div className="page-shell relative z-10 flex min-h-[690px] items-center justify-center py-20 md:min-h-[760px]">
        <div className="w-full max-w-[680px] border border-slate-200 bg-white/95 px-6 py-9 text-center shadow-[0_24px_80px_rgba(15,23,42,.08)] backdrop-blur-sm sm:px-9 md:px-12 md:py-11">
          <div className="mx-auto inline-flex items-center gap-2 text-xs font-black uppercase tracking-[.16em] text-blue">
            <Truck className="h-4 w-4" /> Courier shipping, simplified
          </div>
          <h1 className="mx-auto mt-5 max-w-2xl text-balance text-4xl font-black leading-[.98] tracking-[-.055em] text-ink sm:text-5xl md:text-[3.8rem]">
            Ship parcels across India without the daily follow-ups.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-slate-600 md:text-base md:leading-7">
            Compare courier prices, book a doorstep pickup and manage every delivery from one place.
          </p>

          <form onSubmit={checkCourierRates} className="mx-auto mt-7 grid max-w-xl gap-3 sm:grid-cols-[1fr_1fr_auto]">
            <input
              required
              inputMode="numeric"
              maxLength={6}
              value={pickupPin}
              onChange={(event) => setPickupPin(event.target.value)}
              placeholder="Pickup pin code"
              aria-label="Pickup pin code"
              className="h-12 min-w-0 rounded-lg border border-slate-300 bg-white px-4 text-sm text-ink outline-none transition focus:border-blue focus:ring-2 focus:ring-blue/10"
            />
            <input
              required
              inputMode="numeric"
              maxLength={6}
              value={deliveryPin}
              onChange={(event) => setDeliveryPin(event.target.value)}
              placeholder="Delivery pin code"
              aria-label="Delivery pin code"
              className="h-12 min-w-0 rounded-lg border border-slate-300 bg-white px-4 text-sm text-ink outline-none transition focus:border-blue focus:ring-2 focus:ring-blue/10"
            />
            <button type="submit" className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#65e800] px-5 text-sm font-black text-slate-950 transition hover:bg-[#56c900]">
              Rates <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <div className="mx-auto mt-7 grid max-w-xl grid-cols-3 border-t border-slate-200 pt-6">
            {[["14+", "courier partners"], ["29K+", "serviceable pin codes"], ["24 × 7", "operations support"]].map(([value, label]) => (
              <div key={label} className="px-2">
                <p className="text-xl font-black tracking-[-.04em] text-ink md:text-2xl">{value}</p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-[.08em] text-slate-500">{label}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-[11px] font-bold text-slate-500">
            <span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-blue" /> Doorstep pickup</span>
            <span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-blue" /> COD support</span>
            <span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-blue" /> Delivery updates</span>
          </div>
        </div>
      </div>
    </section>
  );
}
