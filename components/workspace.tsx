"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Activity,
  BarChart3,
  Bell,
  Boxes,
  ChevronDown,
  CircleHelp,
  CircleUserRound,
  CreditCard,
  FileBarChart,
  FileText,
  Gauge,
  IndianRupee,
  LifeBuoy,
  LogOut,
  Menu,
  PackageCheck,
  Search,
  Settings,
  ShieldCheck,
  TicketCheck,
  Truck,
  Users,
  WalletCards,
  X,
} from "lucide-react";
import { Brand } from "./brand";
import { cn } from "@/lib/utils";

const userNav = [
  ["Overview", Gauge], ["Orders", Boxes], ["Tracking", Truck], ["Customers", Users],
  ["Invoices", FileText], ["Payments", CreditCard], ["Analytics", BarChart3],
  ["Reports", FileBarChart], ["Settings", Settings], ["Support", LifeBuoy],
];

const adminNav = [
  ["Overview", Gauge], ["Users", Users], ["Courier partners", Truck], ["Orders", Boxes],
  ["Pricing & coupons", IndianRupee], ["CMS & blogs", FileText], ["Analytics", BarChart3],
  ["Roles & permissions", ShieldCheck], ["Support tickets", TicketCheck], ["GST reports", FileBarChart],
];

export function Workspace({ admin = false }: { admin?: boolean }) {
  const router = useRouter();
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState("Overview");
  const [accessReady, setAccessReady] = useState(admin);
  const [profile, setProfile] = useState<{ fullName: string; companyName: string } | null>(null);
  const nav = admin ? adminNav : userNav;
  const bars = [38, 55, 49, 72, 66, 83, 61, 91, 76, 97, 88, 106];

  useEffect(() => {
    if (admin) return;
    const sessionActive = window.sessionStorage.getItem("shipray-user-auth") === "true";
    const remembered = window.localStorage.getItem("shipray-remember-auth") === "true";
    if (sessionActive || remembered) {
      try {
        const savedProfile = window.localStorage.getItem("shipray-current-user");
        if (savedProfile) setProfile(JSON.parse(savedProfile));
      } catch {
        setProfile(null);
      }
      setAccessReady(true);
      return;
    }
    router.replace("/dashboard-login");
  }, [admin, router]);

  const signOut = () => {
    window.sessionStorage.removeItem("shipray-user-auth");
    window.localStorage.removeItem("shipray-remember-auth");
    window.localStorage.removeItem("shipray-current-user");
    router.replace("/dashboard-login");
  };

  const displayName = profile?.fullName?.trim() || "ShipRoute user";
  const firstName = displayName.split(/\s+/)[0];
  const initials = displayName
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  if (!accessReady) {
    return (
      <section className="grid min-h-[calc(100vh-72px)] place-items-center bg-[#eef5ff]">
        <div className="text-center">
          <span className="mx-auto block h-9 w-9 animate-spin rounded-full border-4 border-blue/15 border-t-blue" />
          <p className="mt-4 text-xs font-black uppercase tracking-[.13em] text-blue">Checking secure session</p>
        </div>
      </section>
    );
  }

  return (
    <section className="page-shell py-8">
      <div className="min-h-[820px] overflow-hidden rounded-[30px] border border-line bg-[#f5f8fc] shadow-card lg:grid lg:grid-cols-[230px_1fr]">
        <aside className={cn("fixed inset-0 z-40 bg-white p-5 transition-transform lg:static lg:translate-x-0 lg:border-r lg:border-line", menu ? "translate-x-0" : "-translate-x-full")}>
          <div className="flex items-center justify-between"><Brand /><button onClick={() => setMenu(false)} className="p-2 lg:hidden" aria-label="Close menu"><X className="h-5 w-5" /></button></div>
          {admin && <span className="mt-5 inline-flex rounded-full bg-ink px-3 py-1 text-[9px] font-black uppercase tracking-wider text-white">Admin console</span>}
          <nav className="mt-8 space-y-1" aria-label="Workspace navigation">
            {nav.map(([label, Icon]) => (
              <button key={label as string} onClick={() => { setActive(label as string); setMenu(false); }} className={cn("flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-xs font-bold transition", active === label ? "bg-blue text-white shadow-lg shadow-blue/15" : "text-muted hover:bg-sky hover:text-blue")}>
                <Icon className="h-4 w-4" />{label as string}
              </button>
            ))}
          </nav>
          <div className="mt-8 rounded-2xl bg-sky p-4">
            <CircleHelp className="h-5 w-5 text-blue" />
            <p className="mt-4 text-xs font-black">Need a hand?</p>
            <p className="mt-1 text-[10px] leading-4 text-muted">Our operations team is online.</p>
            <button className="mt-3 text-[10px] font-black text-blue">Start a conversation →</button>
          </div>
          <Link href="/" className="mt-6 block text-center text-[10px] font-bold text-muted hover:text-blue">← Back to website</Link>
          {!admin && <button type="button" onClick={signOut} className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-line px-3 py-2.5 text-[10px] font-black text-muted transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"><LogOut className="h-3.5 w-3.5" /> Sign out</button>}
        </aside>

        <div>
          <header className="flex h-20 items-center justify-between border-b border-line bg-white/75 px-4 backdrop-blur-xl md:px-7">
            <div className="flex items-center gap-3">
              <button onClick={() => setMenu(true)} className="grid h-10 w-10 place-items-center rounded-xl border border-line lg:hidden" aria-label="Open menu"><Menu className="h-4 w-4" /></button>
              <div><p className="text-[10px] font-bold text-muted">{admin ? "Admin console" : "Workspace"}</p><h1 className="text-lg font-black tracking-tight">{active}</h1></div>
            </div>
            <div className="flex items-center gap-2">
              <label className="hidden h-10 items-center gap-2 rounded-xl border border-line bg-white px-3 md:flex"><Search className="h-3.5 w-3.5 text-muted" /><input className="w-36 text-xs outline-none" placeholder="Search shipments…" /></label>
              <button className="relative grid h-10 w-10 place-items-center rounded-xl border border-line bg-white" aria-label="Notifications"><Bell className="h-4 w-4" /><span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-blue" /></button>
              <button className="flex h-10 items-center gap-2 rounded-xl border border-line bg-white px-2"><span className="grid h-7 w-7 place-items-center rounded-lg bg-ink text-[9px] font-black text-white">{admin ? "AD" : initials}</span><ChevronDown className="h-3.5 w-3.5 text-muted" /></button>
            </div>
          </header>

          <div className="p-4 md:p-7">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div><p className="text-xs text-muted">{admin ? "Sunday, 26 July" : `Welcome back, ${firstName}${profile?.companyName ? ` · ${profile.companyName}` : ""}`}</p><h2 className="mt-1 text-2xl font-black tracking-[-0.04em]">{admin ? "Network command centre" : "Here’s what’s moving today."}</h2></div>
              <button className="h-11 rounded-full bg-blue px-5 text-xs font-black text-white shadow-lg shadow-blue/20">{admin ? "Export report" : "+ Create shipment"}</button>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {(admin ? [
                ["Active users", "10,284", "+18.2%", Users],
                ["Shipments today", "28,490", "+11.8%", Boxes],
                ["Net revenue", "₹86.4L", "+9.4%", WalletCards],
                ["Open tickets", "47", "-14.6%", TicketCheck],
              ] : [
                ["Orders today", "184", "+12.4%", Boxes],
                ["In transit", "1,248", "+8.1%", Truck],
                ["Delivered", "8,490", "99.2%", PackageCheck],
                ["Shipping spend", "₹4.2L", "-6.4%", WalletCards],
              ]).map(([label, value, delta, Icon]) => (
                <div key={label as string} className="rounded-[20px] border border-line bg-white p-4">
                  <div className="flex items-start justify-between"><div className="grid h-9 w-9 place-items-center rounded-xl bg-sky text-blue"><Icon className="h-4 w-4" /></div><span className={cn("rounded-full px-2 py-1 text-[9px] font-black", String(delta).startsWith("-") ? "bg-emerald-50 text-emerald-600" : "bg-blue/5 text-blue")}>{delta as string}</span></div>
                  <p className="mt-5 text-[10px] font-bold text-muted">{label as string}</p><p className="mt-1 text-2xl font-black tracking-[-0.04em]">{value as string}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 grid gap-4 xl:grid-cols-[1.35fr_.65fr]">
              <div className="rounded-[22px] border border-line bg-white p-5">
                <div className="flex items-center justify-between"><div><p className="text-sm font-black">{admin ? "Platform volume" : "Shipment volume"}</p><p className="mt-1 text-[10px] text-muted">Last 12 months</p></div><select className="rounded-lg border border-line px-2 py-1.5 text-[10px] font-bold"><option>This year</option></select></div>
                <div className="mt-8 flex h-52 items-end gap-2 border-b border-line px-1">
                  {bars.map((v, i) => <div key={i} className="group relative flex-1 rounded-t-md bg-blue/15 transition hover:bg-blue" style={{ height: `${v * 0.75}%` }}><span className="invisible absolute -top-6 left-1/2 -translate-x-1/2 rounded bg-ink px-1.5 py-1 text-[8px] text-white group-hover:visible">{v}k</span></div>)}
                </div>
                <div className="mt-3 flex justify-between text-[8px] font-bold text-muted"><span>Aug</span><span>Nov</span><span>Feb</span><span>May</span><span>Jul</span></div>
              </div>
              <div className="rounded-[22px] bg-ink p-5 text-white">
                <div className="flex items-center justify-between"><div><p className="text-sm font-black">{admin ? "Network health" : "Delivery health"}</p><p className="mt-1 text-[10px] text-white/40">Live performance</p></div><Activity className="h-5 w-5 text-blue-300" /></div>
                <div className="mx-auto mt-8 grid h-36 w-36 place-items-center rounded-full" style={{ background: "conic-gradient(#3b82f6 0 92%, rgba(255,255,255,.08) 92% 100%)" }}>
                  <div className="grid h-28 w-28 place-items-center rounded-full bg-ink text-center"><div><p className="text-3xl font-black">92%</p><p className="text-[9px] text-white/40">excellent</p></div></div>
                </div>
                <div className="mt-8 space-y-3 text-[10px]">
                  <div className="flex justify-between"><span className="text-white/45">On-time movement</span><span className="font-black">96.4%</span></div>
                  <div className="flex justify-between"><span className="text-white/45">Delivery success</span><span className="font-black">99.2%</span></div>
                  <div className="flex justify-between"><span className="text-white/45">Issue resolution</span><span className="font-black">4.2 hrs</span></div>
                </div>
              </div>
            </div>

            <div className="mt-4 overflow-hidden rounded-[22px] border border-line bg-white">
              <div className="flex items-center justify-between border-b border-line p-5"><div><p className="text-sm font-black">{admin ? "Recent platform activity" : "Recent shipments"}</p><p className="mt-1 text-[10px] text-muted">Live operations feed</p></div><button className="text-[10px] font-black text-blue">View all →</button></div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[650px] text-left">
                  <thead><tr className="border-b border-line bg-slate-50 text-[9px] uppercase tracking-wider text-muted"><th className="px-5 py-3">ID</th><th className="px-5 py-3">Customer / Route</th><th className="px-5 py-3">Courier</th><th className="px-5 py-3">Value</th><th className="px-5 py-3">Status</th></tr></thead>
                  <tbody>
                    {[["SR-28491", "Delhi → Mumbai", "Blue Dart", "₹188", "In transit"], ["SR-28490", "Pune → Jaipur", "Delhivery", "₹142", "Delivered"], ["SR-28489", "Gurugram → Bengaluru", "FedEx", "₹256", "Pickup due"], ["SR-28488", "Kolkata → Hyderabad", "DTDC", "₹174", "In transit"]].map((row) => (
                      <tr key={row[0]} className="border-b border-line/70 text-xs last:border-0 hover:bg-sky/30">
                        <td className="px-5 py-4 font-black">{row[0]}</td><td className="px-5 py-4 text-muted">{row[1]}</td><td className="px-5 py-4 font-bold">{row[2]}</td><td className="px-5 py-4 font-bold">{row[3]}</td><td className="px-5 py-4"><span className={cn("rounded-full px-2.5 py-1 text-[9px] font-black", row[4] === "Delivered" ? "bg-emerald-50 text-emerald-600" : row[4] === "Pickup due" ? "bg-sky text-blue" : "bg-violet-50 text-violet-600")}>{row[4]}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
