import Image from "next/image";
import { ArrowDown, ArrowRight, CheckCircle2, Link2, Store, Truck } from "lucide-react";

const salesChannels = [
  { name: "Shopify", mark: "S", markClass: "bg-[#86c440] text-white" },
  { name: "WooCommerce", mark: "woo", markClass: "bg-[#96588a] text-white" },
  { name: "Amazon", mark: "a", markClass: "bg-[#ff9900] text-slate-950" },
  { name: "Magento", mark: "M", markClass: "bg-[#f26322] text-white" },
  { name: "Custom store", mark: "</>", markClass: "bg-[#112c5c] text-white" },
];

const courierOptions = [
  { name: "Delhivery", mark: "D", markClass: "bg-[#e31e3d] text-white", rate: "From ₹62" },
  { name: "Blue Dart", mark: "BD", markClass: "bg-[#1455a3] text-white", rate: "From ₹79" },
  { name: "Xpressbees", mark: "XB", markClass: "bg-[#f8bc18] text-slate-950", rate: "From ₹67" },
  { name: "DTDC", mark: "DT", markClass: "bg-[#e11f2f] text-white", rate: "From ₹71" },
  { name: "DHL Express", mark: "DHL", markClass: "bg-[#ffcc00] text-[#c50026]", rate: "From ₹399" },
];

export function CommerceConnectionMap() {
  return (
    <section className="overflow-hidden bg-[#f7f9fd]">
      <div className="page-shell py-20 md:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 text-[10px] font-black uppercase tracking-[.15em] text-blue shadow-sm">
            <Link2 className="h-3.5 w-3.5" />
            Connected commerce
          </span>
          <h2 className="mt-6 text-balance text-4xl font-black tracking-[-.055em] text-ink md:text-5xl lg:text-[56px] lg:leading-[1.05]">
            One platform to connect your store, couriers and customers.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
            Bring orders into one dashboard, compare available courier services and ship across India
            without switching between multiple tools.
          </p>
        </div>

        <div className="relative mt-14 lg:mt-16">
          <div
            className="pointer-events-none absolute inset-x-[4%] top-10 hidden h-[420px] lg:block"
            aria-hidden="true"
          >
            <svg
              className="h-full w-full"
              viewBox="0 0 1200 500"
              fill="none"
              preserveAspectRatio="none"
            >
              <g stroke="#d9e8fa" strokeWidth="5">
                <path d="M400 48H448C472 48 472 250 510 250H555" />
                <path d="M400 149H458C482 149 482 250 510 250H555" />
                <path d="M400 250H555" />
                <path d="M400 351H458C482 351 482 250 510 250H555" />
                <path d="M400 452H448C472 452 472 250 510 250H555" />
                <path d="M645 250H690C728 250 728 48 752 48H800" />
                <path d="M645 250H690C718 250 718 149 742 149H800" />
                <path d="M645 250H800" />
                <path d="M645 250H690C718 250 718 351 742 351H800" />
                <path d="M645 250H690C728 250 728 452 752 452H800" />
              </g>
              <g fill="#1789ed">
                <circle cx="400" cy="48" r="6" />
                <circle cx="400" cy="149" r="6" />
                <circle cx="400" cy="250" r="6" />
                <circle cx="400" cy="351" r="6" />
                <circle cx="400" cy="452" r="6" />
                <circle cx="800" cy="48" r="6" />
                <circle cx="800" cy="149" r="6" />
                <circle cx="800" cy="250" r="6" />
                <circle cx="800" cy="351" r="6" />
                <circle cx="800" cy="452" r="6" />
              </g>
            </svg>
          </div>

          <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_.68fr_1fr] lg:gap-16">
            <div>
              <div className="mb-5 flex items-center justify-between px-1">
                <span className="inline-flex items-center gap-2 text-sm font-black text-[#1789ed]">
                  <Store className="h-4 w-4" />
                  Popular sales channels
                </span>
                <ArrowRight className="hidden h-4 w-4 text-[#1789ed] sm:block" />
              </div>
              <div className="space-y-3">
                {salesChannels.map((channel) => (
                  <div
                    key={channel.name}
                    className="flex min-h-[76px] items-center gap-4 rounded-2xl border border-white bg-white px-4 shadow-[0_12px_35px_rgba(15,46,99,.08)] transition duration-300 hover:-translate-y-0.5 hover:border-blue-100 hover:shadow-[0_16px_40px_rgba(15,46,99,.12)] sm:px-5"
                  >
                    <span
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-base font-black tracking-[-.04em] ${channel.markClass}`}
                      aria-hidden="true"
                    >
                      {channel.mark}
                    </span>
                    <span className="font-extrabold text-[#112c5c]">{channel.name}</span>
                    <CheckCircle2 className="ml-auto h-4 w-4 text-emerald-500" />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center py-2 lg:py-0">
              <ArrowDown className="mb-5 h-5 w-5 text-[#1789ed] lg:hidden" />
              <div className="relative flex h-44 w-44 items-center justify-center rounded-[44px] border-[14px] border-[#e8f1fb] bg-gradient-to-br from-[#1fcde3] to-[#1789ed] shadow-[0_30px_70px_rgba(23,137,237,.28)] sm:h-52 sm:w-52 sm:rounded-[52px]">
                <span className="absolute -top-4 rounded-full border border-blue-100 bg-white px-3 py-1.5 text-[9px] font-black uppercase tracking-[.14em] text-[#1789ed] shadow-sm">
                  Live order sync
                </span>
                <div className="relative h-[92px] w-[110px] sm:h-[110px] sm:w-[130px]">
                  <Image
                    src="/shiproute-logo.png"
                    alt="ShipRoute"
                    fill
                    className="object-contain"
                    sizes="130px"
                  />
                </div>
              </div>
              <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#112c5c] px-4 py-2 text-[10px] font-black uppercase tracking-[.12em] text-white">
                <Link2 className="h-3.5 w-3.5 text-cyan-300" />
                One smart shipping hub
              </span>
              <ArrowDown className="mt-5 h-5 w-5 text-[#1789ed] lg:hidden" />
            </div>

            <div>
              <div className="mb-5 flex items-center justify-between px-1">
                <span className="inline-flex items-center gap-2 text-sm font-black text-[#1789ed]">
                  <Truck className="h-4 w-4" />
                  Courier options
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[.1em] text-slate-400">
                  Indicative rates
                </span>
              </div>
              <div className="space-y-3">
                {courierOptions.map((courier) => (
                  <div
                    key={courier.name}
                    className="flex min-h-[76px] items-center gap-4 rounded-2xl border border-white bg-white px-4 shadow-[0_12px_35px_rgba(15,46,99,.08)] transition duration-300 hover:-translate-y-0.5 hover:border-blue-100 hover:shadow-[0_16px_40px_rgba(15,46,99,.12)] sm:px-5"
                  >
                    <span
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-sm font-black tracking-[-.05em] ${courier.markClass}`}
                      aria-hidden="true"
                    >
                      {courier.mark}
                    </span>
                    <span className="font-extrabold text-[#112c5c]">{courier.name}</span>
                    <span className="ml-auto whitespace-nowrap text-xs font-extrabold text-emerald-600 sm:text-sm">
                      {courier.rate}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-[11px] leading-5 text-slate-400">
          Integration and courier availability varies by account and serviceable lane. Displayed
          prices are illustrative base rates; final charges depend on weight, dimensions and
          destination.
        </p>
      </div>
    </section>
  );
}
