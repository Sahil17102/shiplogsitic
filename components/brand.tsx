import Link from "next/link";
import { cn } from "@/lib/utils";

export function Brand({ compact = false, inverse = false }: { compact?: boolean; inverse?: boolean }) {
  return (
    <Link href="/" className="group inline-flex items-center gap-2.5" aria-label="Shipray home">
      <span
        className={cn(
          "relative grid h-10 w-10 place-items-center overflow-hidden rounded-[13px] text-white transition-transform group-hover:-rotate-3",
          inverse
            ? "bg-[#35ddd3] shadow-[0_10px_26px_rgba(53,221,211,.28)]"
            : "bg-blue shadow-[0_10px_26px_rgba(37,99,235,.3)]",
        )}
      >
        <svg viewBox="0 0 32 32" className="h-7 w-7" fill="none" aria-hidden="true">
          <path d="M7 10.5 16 5l9 5.5-9 5.3-9-5.3Z" fill="white" fillOpacity=".96" />
          <path d="m7 15.4 9 5.3 9-5.3v6L16 27l-9-5.6v-6Z" fill="white" fillOpacity=".7" />
          <path d="M16 15.8v10.8" stroke={inverse ? "#1E4FBC" : "#2563EB"} strokeWidth="1.5" />
        </svg>
      </span>
      {!compact && (
        <span className="leading-none">
          <span className={cn("block text-[18px] font-black tracking-[-0.045em]", inverse ? "text-white" : "text-ink")}>shipray</span>
          <span className={cn("mt-1 block text-[8px] font-extrabold uppercase tracking-[0.22em]", inverse ? "text-white/65" : "text-muted")}>Logistics</span>
        </span>
      )}
    </Link>
  );
}
