import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="group inline-flex items-center" aria-label="ShipRoute home">
      <span
        className={cn(
          "relative block shrink-0 transition-transform duration-300 group-hover:scale-[1.035]",
          compact ? "h-10 w-[82px]" : "h-[66px] w-[78px]",
        )}
      >
        <Image
          src={compact ? "/shiproute-mark.png" : "/shiproute-logo.png"}
          alt=""
          fill
          priority
          className={cn("object-contain", compact && "py-1")}
          sizes={compact ? "82px" : "78px"}
        />
      </span>
    </Link>
  );
}
