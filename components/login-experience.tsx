"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Eye,
  EyeOff,
  KeyRound,
  LockKeyhole,
  Package,
  Route,
  ScanLine,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { Button, fieldClass, Label } from "./ui";

const DEMO_EMAIL = "demo@shipray.in";
const DEMO_CODE = "SHIPRAY2026";

function CourierLoginVisual() {
  const cubeFaces = [
    "translateZ(48px)",
    "rotateY(180deg) translateZ(48px)",
    "rotateY(90deg) translateZ(48px)",
    "rotateY(-90deg) translateZ(48px)",
    "rotateX(90deg) translateZ(48px)",
    "rotateX(-90deg) translateZ(48px)",
  ];

  return (
    <div className="relative mt-8 h-[330px] overflow-hidden rounded-[28px] border border-white/15 bg-white/[.06]" style={{ perspective: "900px" }}>
      <div className="grid-fade absolute inset-0 opacity-20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_52%,rgba(57,222,212,.22),transparent_34%),radial-gradient(circle_at_50%_100%,rgba(167,134,239,.28),transparent_52%)]" />

      <div className="absolute left-1/2 top-[56%] h-44 w-[310px] rounded-[50%] border border-cyan-200/25" style={{ transform: "translate(-50%, -50%) rotateX(66deg)" }} />
      <div className="absolute left-1/2 top-[56%] h-28 w-[220px] rounded-[50%] border border-white/15" style={{ transform: "translate(-50%, -50%) rotateX(66deg)" }} />

      <motion.div
        animate={{ x: [-142, 118, -142], y: [44, -32, 44] }}
        transition={{ duration: 9, ease: "easeInOut", repeat: Infinity }}
        className="absolute left-1/2 top-[54%] z-20 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-[#39ded4] text-[#07375c] shadow-[0_12px_30px_rgba(57,222,212,.3)]"
      >
        <Truck className="h-5 w-5" />
      </motion.div>

      <motion.div
        animate={{ y: [0, -13, 0] }}
        transition={{ duration: 4.4, ease: "easeInOut", repeat: Infinity }}
        className="absolute left-1/2 top-[44%] z-10 h-24 w-24 -translate-x-1/2 -translate-y-1/2"
        style={{ transformStyle: "preserve-3d" }}
      >
        <motion.div
          animate={{ rotateX: [-12, 8, -12], rotateY: [0, 360] }}
          transition={{ duration: 13, ease: "linear", repeat: Infinity }}
          className="relative h-full w-full"
          style={{ transformStyle: "preserve-3d" }}
        >
          {cubeFaces.map((transform, index) => (
            <div
              key={transform}
              className="absolute inset-0 grid place-items-center border border-cyan-100/45 bg-[#2766df]/90 shadow-[inset_0_0_26px_rgba(255,255,255,.12)] backdrop-blur-sm"
              style={{ transform, backfaceVisibility: "visible" }}
            >
              <Package className={`h-8 w-8 text-white ${index > 1 ? "opacity-50" : ""}`} />
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, delay: 0.5, repeat: Infinity }}
        className="absolute left-4 top-5 rounded-2xl border border-white/15 bg-[#173f9f]/75 p-3 text-white shadow-xl backdrop-blur-xl sm:left-6"
      >
        <div className="flex items-center gap-2 text-cyan-200"><ScanLine className="h-4 w-4" /><span className="text-[9px] font-black uppercase tracking-[.12em]">Live scan</span></div>
        <p className="mt-2 text-xs font-black">Sorting hub cleared</p>
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 4.8, repeat: Infinity }}
        className="absolute bottom-5 right-4 rounded-2xl border border-white/15 bg-[#173f9f]/75 p-3 text-white shadow-xl backdrop-blur-xl sm:right-6"
      >
        <div className="flex items-center gap-2 text-cyan-200"><Clock3 className="h-4 w-4" /><span className="text-[9px] font-black uppercase tracking-[.12em]">Delivery ETA</span></div>
        <p className="mt-2 text-xs font-black">Today, before 6 PM</p>
      </motion.div>

      <div className="absolute bottom-5 left-5 flex items-center gap-2 text-[9px] font-black uppercase tracking-[.12em] text-white/45">
        <Route className="h-4 w-4 text-cyan-200" /> Secure courier network
      </div>
    </div>
  );
}

export function LoginExperience() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [showCode, setShowCode] = useState(false);
  const [error, setError] = useState("");
  const [opening, setOpening] = useState(false);

  const useDemoAccess = () => {
    setEmail(DEMO_EMAIL);
    setAccessCode(DEMO_CODE);
    setError("");
  };

  const submitLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const credentialsMatch =
      email.trim().toLowerCase() === DEMO_EMAIL &&
      accessCode.trim().toUpperCase() === DEMO_CODE;

    if (!credentialsMatch) {
      setError("Email or access code does not match the demo credentials shown above.");
      return;
    }

    setOpening(true);
    window.sessionStorage.setItem("shipray-demo-auth", "true");
    window.sessionStorage.setItem("shipray-demo-user", DEMO_EMAIL);
    router.push("/dashboard");
  };

  return (
    <section data-auth-page="true" className="relative min-h-[calc(100vh-88px)] overflow-hidden bg-[#eaf4ff]">
      <div className="grid-fade absolute inset-0 opacity-45" />
      <div className="absolute -left-36 top-12 h-96 w-96 rounded-full bg-blue/10 blur-3xl" />
      <div className="absolute -right-28 bottom-0 h-96 w-96 rounded-full bg-cyan-300/20 blur-3xl" />

      <div className="page-shell relative grid min-h-[calc(100vh-88px)] items-center gap-6 py-6 lg:grid-cols-[1.05fr_.95fr] lg:py-8">
        <div className="relative overflow-hidden rounded-[34px] bg-[linear-gradient(145deg,#153f9f_0%,#235bd0_54%,#4b63d8_100%)] p-6 text-white shadow-[0_30px_80px_rgba(25,76,189,.2)] md:p-9">
          <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full border-[38px] border-white/[.05]" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[.15em] text-cyan-100">
              <ShieldCheck className="h-4 w-4" /> Secure workspace access
            </div>
            <h1 className="mt-5 max-w-xl text-balance text-4xl font-black leading-[.98] tracking-[-.055em] md:text-5xl">Your courier control tower starts here.</h1>
            <p className="mt-4 max-w-lg text-sm leading-6 text-white/70">Sign in to move from booking and live scans to invoices, exceptions and delivery performance.</p>
            <CourierLoginVisual />
          </div>
        </div>

        <form onSubmit={submitLogin} className="rounded-[34px] border border-blue/10 bg-white p-6 shadow-[0_28px_80px_rgba(31,68,139,.14)] md:p-8">
          <div className="flex items-start justify-between gap-5">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-sky text-blue"><LockKeyhole className="h-5 w-5" /></div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-[9px] font-black uppercase tracking-[.1em] text-emerald-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Demo active
            </span>
          </div>
          <h2 className="mt-5 text-3xl font-black tracking-[-.045em] text-ink">Sign in to Shipray</h2>
          <p className="mt-2 text-sm leading-6 text-muted">Use the demo credentials to open the courier operations dashboard.</p>

          <div className="mt-5 rounded-2xl border border-blue/10 bg-[#edf5ff] p-4">
            <div className="flex items-center justify-between gap-4">
              <p className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[.13em] text-blue"><KeyRound className="h-4 w-4" /> Demo login</p>
              <button type="button" onClick={useDemoAccess} className="text-[10px] font-black text-blue hover:underline">Use credentials</button>
            </div>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              <div className="rounded-xl bg-white px-3 py-2.5"><p className="text-[9px] font-bold uppercase tracking-[.1em] text-muted">Email</p><code className="mt-1 block text-xs font-black text-ink">{DEMO_EMAIL}</code></div>
              <div className="rounded-xl bg-white px-3 py-2.5"><p className="text-[9px] font-bold uppercase tracking-[.1em] text-muted">Access code</p><code className="mt-1 block text-xs font-black text-ink">{DEMO_CODE}</code></div>
            </div>
          </div>

          <div className="mt-5">
            <Label>Work email</Label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={fieldClass}
              placeholder="demo@shipray.in"
              autoComplete="email"
              required
            />
          </div>
          <div className="mt-4">
            <Label>Access code</Label>
            <div className="relative">
              <input
                type={showCode ? "text" : "password"}
                value={accessCode}
                onChange={(event) => setAccessCode(event.target.value)}
                className={`${fieldClass} pr-12`}
                placeholder="Enter access code"
                autoComplete="current-password"
                required
              />
              <button type="button" onClick={() => setShowCode(!showCode)} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-muted" aria-label={showCode ? "Hide access code" : "Show access code"}>
                {showCode ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between gap-4 text-xs">
            <label className="flex items-center gap-2 font-semibold text-muted"><input type="checkbox" defaultChecked /> Keep me signed in</label>
            <Link href="/contact" className="font-black text-blue hover:underline">Need help?</Link>
          </div>

          {error && <div role="alert" className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-bold leading-5 text-red-700">{error}</div>}

          <Button variant="blue" className="mt-5 w-full" disabled={opening}>
            {opening ? "Opening dashboard…" : "Open logistics dashboard"} {!opening && <ArrowRight className="h-4 w-4" />}
          </Button>
          <p className="mt-4 flex items-center justify-center gap-2 text-center text-[10px] text-muted"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Demo access only—no real customer data is used.</p>
        </form>
      </div>
    </section>
  );
}
