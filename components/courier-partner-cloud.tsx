import { PackageCheck, Route, Truck } from "lucide-react";

const courierPartners = [
  { name: "DELHIVERY", type: "National parcel", style: "font-black italic tracking-[-.06em]" },
  { name: "BLUE DART", type: "Express air", style: "font-black tracking-[.08em]" },
  { name: "DTDC", type: "Courier network", style: "font-black italic tracking-[-.04em]" },
  { name: "Ecom Express", type: "Ecommerce delivery", style: "font-extrabold tracking-[-.04em]" },
  { name: "XPRESSBEES", type: "Parcel logistics", style: "font-black tracking-[-.04em]" },
  { name: "DHL", type: "International express", style: "font-black italic tracking-[-.06em]" },
  { name: "FedEx", type: "Global shipping", style: "font-black tracking-[-.06em]" },
  { name: "EKART", type: "Ecommerce logistics", style: "font-black tracking-[.04em]" },
  { name: "Shadowfax", type: "Hyperlocal delivery", style: "font-extrabold italic tracking-[-.05em]" },
  { name: "ARAMEX", type: "Cross-border courier", style: "font-black tracking-[.1em]" },
  { name: "INDIA POST", type: "Postal network", style: "font-black tracking-[.06em]" },
  { name: "UPS", type: "International parcel", style: "font-black italic tracking-[-.08em]" },
];

export function CourierPartnerCloud() {
  return (
    <section className="border-y border-slate-200 bg-[#f6f8fb]">
      <div className="page-shell py-20 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 text-[10px] font-black uppercase tracking-[.15em] text-blue shadow-sm">
            <Truck className="h-3.5 w-3.5" />
            Courier ecosystem
          </span>
          <h2 className="mt-6 text-balance text-4xl font-black tracking-[-.055em] text-ink md:text-5xl">
            One shipping desk. Every route that matters.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600">
            Compare express, surface, ecommerce and cross-border services from a single operations view.
          </p>
        </div>

        <div
          className="mt-12 grid gap-px overflow-hidden rounded-[30px] border border-slate-200 bg-slate-200 shadow-[0_24px_70px_rgba(15,46,99,.09)] sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6"
          aria-label="Courier services available for comparison and routing"
        >
          {courierPartners.map((partner) => (
            <div
              key={partner.name}
              className="group flex min-h-[126px] flex-col items-center justify-center bg-white px-4 py-7 text-center transition duration-300 hover:-translate-y-0.5 hover:bg-[#edf4ff]"
            >
              <p className={`text-xl text-slate-900 transition group-hover:text-[#2352bd] ${partner.style}`}>
                {partner.name}
              </p>
              <span className="mt-3 text-[9px] font-bold uppercase tracking-[.12em] text-slate-400 transition group-hover:text-blue/65">
                {partner.type}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-7 flex flex-col items-center justify-center gap-3 text-center text-xs font-semibold text-slate-500 sm:flex-row sm:gap-7">
          <span className="inline-flex items-center gap-2">
            <PackageCheck className="h-4 w-4 text-blue" />
            Serviceability checked before booking
          </span>
          <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:block" />
          <span className="inline-flex items-center gap-2">
            <Route className="h-4 w-4 text-blue" />
            Carrier options vary by lane and account
          </span>
        </div>
      </div>
    </section>
  );
}
