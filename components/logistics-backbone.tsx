"use client";

import { RadialNetworkCanvas } from "./visualizations/radial-network-canvas";

const metrics = [
  ["29,000+", "serviceable pin codes", "across India"],
  ["12M+", "shipments coordinated", "through Shipray"],
  ["98.4%", "on-time dispatch", "across active lanes"],
  ["220+", "countries and territories", "connected globally"],
];

export function LogisticsBackbone() {
  return (
    <section className="relative overflow-hidden bg-[#f6f9fc] text-[#0a2540]">
      <div className="page-shell">
        <div className="px-1 py-20 text-center md:py-28">
          <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#635bff]">
            Shipray network
          </p>
          <h2 className="mx-auto mt-5 max-w-4xl text-balance text-4xl font-semibold leading-[1.04] tracking-[-.055em] md:text-7xl">
            The backbone of connected commerce.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[#425466]">
            Every pickup, scan, route and delivery connected through one dependable operating
            network.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map(([value, label, copy], index) => (
            <div key={label} className="min-h-[182px] px-1 py-8 text-left sm:px-5 lg:px-1">
              <p
                className={
                  index === 0
                    ? "text-4xl font-semibold tracking-[-.05em] text-[#0a2540] md:text-5xl"
                    : "text-4xl font-semibold tracking-[-.05em] text-[#8c9bbb] md:text-5xl"
                }
              >
                {value}
              </p>
              <p
                className={
                  index === 0
                    ? "mt-4 max-w-[230px] text-lg leading-7 text-[#0a2540]"
                    : "mt-4 max-w-[230px] text-lg leading-7 text-[#7a8bab]"
                }
              >
                {label}
              </p>
              <p className="mt-1 max-w-[230px] text-sm leading-6 text-[#8c9bbb]">{copy}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="h-px w-full bg-[linear-gradient(90deg,#635bff_0%,#f229c3_17%,#ffd9b7_30%,#dbe3ed_55%,#dbe3ed_100%)]" />
      <RadialNetworkCanvas />
    </section>
  );
}
