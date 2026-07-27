import Link from "next/link";

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="group inline-flex items-center gap-2.5" aria-label="Shipray home">
      <span className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-[13px] bg-blue text-white shadow-[0_10px_26px_rgba(37,99,235,.3)] transition-transform group-hover:-rotate-3">
        <svg viewBox="0 0 32 32" className="h-7 w-7" fill="none" aria-hidden="true">
          <path d="M7 10.5 16 5l9 5.5-9 5.3-9-5.3Z" fill="white" fillOpacity=".96" />
          <path d="m7 15.4 9 5.3 9-5.3v6L16 27l-9-5.6v-6Z" fill="white" fillOpacity=".7" />
          <path d="M16 15.8v10.8" stroke="#2563EB" strokeWidth="1.5" />
        </svg>
      </span>
      {!compact && (
        <span className="leading-none">
          <span className="block text-[18px] font-black tracking-[-0.045em] text-ink">shipray</span>
          <span className="mt-1 block text-[8px] font-extrabold uppercase tracking-[0.22em] text-muted">Logistics</span>
        </span>
      )}
    </Link>
  );
}
