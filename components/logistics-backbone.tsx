import Image from "next/image";
import { Globe2, MapPinned, PackageCheck, TimerReset } from "lucide-react";

const metrics = [
  {
    value: "29,000+",
    label: "serviceable pin codes",
    copy: "Reach metro cities, growing towns and remote destinations across India.",
    image: "/metric-coverage-network.png",
    position: "center",
    icon: MapPinned,
  },
  {
    value: "12M+",
    label: "shipments coordinated",
    copy: "Orders, pickups and delivery updates brought together through ShipRoute.",
    image: "/metric-shipment-volume.png",
    position: "center",
    icon: PackageCheck,
  },
  {
    value: "98.4%",
    label: "on-time dispatch",
    copy: "Proactive operations keep parcels moving across active shipping lanes.",
    image: "/metric-dispatch-speed.png",
    position: "center",
    icon: TimerReset,
  },
  {
    value: "220+",
    label: "countries and territories",
    copy: "One connected workflow for domestic deliveries and international reach.",
    image: "/metric-global-operations.png",
    position: "center",
    icon: Globe2,
  },
];

export function LogisticsBackbone() {
  return (
    <section className="relative overflow-hidden bg-[#f6f9fc] text-[#0a2540]">
      <div className="page-shell py-20 md:py-28">
        <div className="px-1 text-center">
          <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#2352bd]">
            ShipRoute network
          </p>
          <h2 className="mx-auto mt-5 max-w-4xl text-balance text-4xl font-semibold leading-[1.04] tracking-[-.055em] md:text-7xl">
            The backbone of connected commerce.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[#425466]">
            Every pickup, scan, route and delivery connected through one dependable operating
            network.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;

            return (
              <article
                key={metric.label}
                className="group relative min-h-[440px] overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_20px_55px_rgba(15,46,99,.09)]"
              >
                <div className="relative h-[215px] overflow-hidden">
                  <Image
                    src={metric.image}
                    alt=""
                    fill
                    sizes="(max-width: 639px) 100vw, (max-width: 1279px) 50vw, 25vw"
                    className="scale-[1.08] object-cover transition duration-700 group-hover:scale-[1.12]"
                    style={{ objectPosition: metric.position }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a2540]/35 via-transparent to-white/5" />
                  <span className="absolute left-5 top-5 grid h-11 w-11 place-items-center rounded-full border border-white/70 bg-white/90 text-[#2352bd] shadow-lg backdrop-blur">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="absolute bottom-4 right-5 text-[10px] font-black uppercase tracking-[.14em] text-white">
                    0{index + 1} / 04
                  </span>
                </div>

                <div className="flex min-h-[225px] flex-col px-6 pb-7 pt-6">
                  <p
                    className={
                      index === 0
                        ? "text-5xl font-semibold tracking-[-.06em] text-[#0a2540] md:text-[56px]"
                        : "text-5xl font-semibold tracking-[-.06em] text-[#7286ad] md:text-[56px]"
                    }
                  >
                    {metric.value}
                  </p>
                  <h3 className="mt-4 text-xl font-semibold tracking-[-.025em] text-[#0a2540]">
                    {metric.label}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[#66758d]">{metric.copy}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
