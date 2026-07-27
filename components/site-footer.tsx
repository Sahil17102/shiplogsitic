import Link from "next/link";
import { Apple, Facebook, Instagram, Linkedin, Play, Twitter, Youtube } from "lucide-react";

const footerColumns = [
  {
    title: "Solutions",
    links: [
      ["Domestic shipping", "/domestic-shipping"],
      ["International shipping", "/international-shipping"],
      ["Air freight", "/air-freight"],
      ["Sea freight", "/sea-freight"],
      ["Road transport", "/road-transport"],
      ["Ecommerce shipping", "/ecommerce-shipping"],
    ],
  },
  {
    title: "Resources",
    links: [
      ["Track a shipment", "/shipment-tracking"],
      ["Instant rate calculator", "/courier-calculator"],
      ["Book a shipment", "/book-shipment"],
      ["Developer APIs", "/api-integration"],
      ["Blog", "/blog"],
      ["Help centre", "/faq"],
    ],
  },
  {
    title: "About",
    links: [
      ["Our approach", "/about-us"],
      ["About us", "/about-us"],
      ["Careers", "/careers"],
      ["Carrier network", "/carriers"],
      ["Contact support", "/contact"],
      ["Legal", "/terms-and-conditions"],
    ],
  },
];

const socialLinks = [
  [Linkedin, "LinkedIn"],
  [Youtube, "YouTube"],
  [Twitter, "X"],
  [Facebook, "Facebook"],
  [Instagram, "Instagram"],
] as const;

function FooterLogo() {
  return (
    <Link href="/" aria-label="Shipray home" className="inline-flex items-center gap-3 text-white">
      <svg viewBox="0 0 42 34" className="h-8 w-10" fill="none" aria-hidden="true">
        <rect x="1" y="4" width="8" height="11" rx="2" fill="#fff" />
        <rect x="1" y="19" width="8" height="11" rx="2" fill="#fff" />
        <rect x="13" y="1" width="8" height="17" rx="2" fill="#5BE9E1" />
        <rect x="13" y="22" width="8" height="8" rx="2" fill="#fff" />
        <rect x="25" y="8" width="16" height="20" rx="2.5" fill="#38DDD3" />
        <path d="M1 31.5h40" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
      <span className="font-display text-[26px] font-extrabold uppercase tracking-[-.04em]">
        Shipray
      </span>
    </Link>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-[#194cbd] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_86%_12%,rgba(57,222,212,.2),transparent_28rem),radial-gradient(circle_at_12%_92%,rgba(216,199,248,.28),transparent_34rem),linear-gradient(135deg,#194cbd_0%,#3856ce_46%,#7669e3_76%,#a786ef_100%)]" />

      <div className="relative mx-auto max-w-[1580px] px-6 py-9 sm:px-10 lg:px-14 lg:py-11">
        <div className="flex flex-col gap-5 border-b border-white/20 pb-8 text-sm font-medium text-white/80 md:flex-row md:items-center md:justify-between">
          <p>*Shipray connects businesses with verified logistics and carrier partners.</p>
          <div className="flex flex-wrap gap-x-9 gap-y-3">
            <Link href="/privacy-policy" className="font-semibold text-white transition hover:text-cyan-200">
              Do not sell or share my info
            </Link>
            <Link href="/privacy-policy" className="font-semibold text-white transition hover:text-cyan-200">
              Data policy
            </Link>
          </div>
        </div>

        <div className="grid gap-12 py-14 md:grid-cols-2 lg:grid-cols-[1.25fr_repeat(3,1fr)] lg:gap-16 lg:py-20">
          <div>
            <FooterLogo />
            <p className="mt-5 max-w-[280px] text-sm leading-6 text-white/65">
              Technology, network and people for shipments that matter.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              {socialLinks.map(([Icon, label]) => (
                <a
                  key={label}
                  href="#"
                  aria-label={`Shipray on ${label}`}
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/25 text-white transition hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-white hover:text-[#194cbd]"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#" aria-label="Get Shipray on Google Play" className="flex h-[52px] items-center gap-3 rounded-lg border border-white/35 bg-[#143f9b]/55 px-4 transition hover:bg-[#143f9b]/80">
                <Play className="h-6 w-6 fill-cyan-300 text-cyan-300" />
                <span>
                  <span className="block text-[9px] font-semibold uppercase tracking-[.06em] text-white/75">Get it on</span>
                  <span className="block text-[15px] font-bold leading-4">Google Play</span>
                </span>
              </a>
              <a href="#" aria-label="Download Shipray on the App Store" className="flex h-[52px] items-center gap-3 rounded-lg border border-white/35 bg-[#143f9b]/55 px-4 transition hover:bg-[#143f9b]/80">
                <Apple className="h-7 w-7 fill-white text-white" />
                <span>
                  <span className="block text-[9px] font-semibold tracking-[.03em] text-white/75">Download on the</span>
                  <span className="block text-[15px] font-bold leading-4">App Store</span>
                </span>
              </a>
            </div>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title}>
              <h2 className="text-[17px] font-extrabold tracking-[-.02em] text-cyan-200">{column.title}</h2>
              <ul className="mt-6 space-y-4">
                {column.links.map(([name, href], index) => (
                  <li key={`${href}-${index}`}>
                    <Link href={href} className="text-[15px] font-medium text-white/90 transition hover:text-cyan-200">
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-7 border-t border-white/20 py-9 text-sm md:flex-row md:items-center md:justify-between">
          <p className="font-medium text-white/75">© 2026 Shipray Logistics Pvt. Ltd.</p>
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            <Link href="/privacy-policy" className="font-semibold text-white/85 transition hover:text-cyan-200">Privacy policy</Link>
            <Link href="/terms-and-conditions" className="font-semibold text-white/85 transition hover:text-cyan-200">Terms of service</Link>
            <Link href="/contact" className="font-semibold text-white/85 transition hover:text-cyan-200">Trust centre</Link>
            <Link href="/faq" className="font-semibold text-white/85 transition hover:text-cyan-200">Logistics terms (A–Z)</Link>
            <button type="button" className="font-semibold text-white/85 transition hover:text-cyan-200">Cookie settings</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
