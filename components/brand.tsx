import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Brand({ compact = false, inverse = false }: { compact?: boolean; inverse?: boolean }) {
  return (
    <Link href="/" className="group inline-flex items-center" aria-label="ShipRoute home">
      <span
        className={cn(
          "relative block shrink-0 overflow-hidden rounded-xl border border-white/70 bg-white shadow-[0_10px_28px_rgba(3,35,92,.22)] transition-transform group-hover:-rotate-2 group-hover:scale-[1.03]",
          compact ? "h-10 w-[78px]" : "h-[60px] w-[70px]",
          inverse
            ? "ring-1 ring-white/20"
            : "ring-1 ring-blue/10",
        )}
      >
        <Image
          src={compact ? "/shiproute-mark.png" : "/shiproute-logo.png"}
          alt=""
          fill
          priority
          className={cn("object-contain", compact ? "p-1.5" : "p-1")}
          sizes={compact ? "78px" : "70px"}
        />
      </span>
    </Link>
  );
}
