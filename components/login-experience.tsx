"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Barcode,
  CheckCircle2,
  Clock3,
  Eye,
  EyeOff,
  KeyRound,
  LockKeyhole,
  MapPin,
  Package,
  Route,
  ScanLine,
  ShieldCheck,
  Truck,
  Zap,
} from "lucide-react";
import { Button, fieldClass, Label } from "./ui";

const DEMO_EMAIL = "demo@shipray.in";
const DEMO_CODE = "SHIPRAY2026";

function CourierLoginVisual() {
  const cubeFaces = [
    { name: "front", transform: "translateZ(56px)" },
    { name: "back", transform: "rotateY(180deg) translateZ(56px)" },
    { name: "right", transform: "rotateY(90deg) translateZ(56px)" },
    { name: "left", transform: "rotateY(-90deg) translateZ(56px)" },
    { name: "top", transform: "rotateX(90deg) translateZ(56px)" },
    { name: "bottom", transform: "rotateX(-90deg) translateZ(56px)" },
  ];

  return (
    <div
      className="relative mt-8 h-[350px] overflow-hidden rounded-[28px] border border-white/15 bg-[#0c2f83]"
      style={{ perspective: "1050px" }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(145deg,#0c2f83_0%,#164fc2_48%,#5267e6_100%)]" />
      <div className="grid-fade absolute inset-0 opacity-25" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_43%,rgba(75,236,223,.3),transparent_27%),radial-gradient(circle_at_50%_110%,rgba(174,132,255,.38),transparent_48%)]" />

      <svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full opacity-70"
        viewBox="0 0 640 350"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="courier-route-gradient" x1="0" x2="1">
            <stop offset="0" stopColor="#67e8f9" stopOpacity=".08" />
            <stop offset=".5" stopColor="#a5f3fc" stopOpacity=".72" />
            <stop offset="1" stopColor="#c4b5fd" stopOpacity=".08" />
          </linearGradient>
        </defs>
        <path
          d="M58 269 C132 214 164 101 318 91 C473 81 507 213 584 264"
          fill="none"
          stroke="url(#courier-route-gradient)"
          strokeDasharray="7 8"
          strokeWidth="1.5"
        />
        <path
          d="M73 289 C176 234 219 240 319 253 C428 267 502 260 570 285"
          fill="none"
          stroke="rgba(165,243,252,.18)"
          strokeWidth="1"
        />
      </svg>

      <div
        aria-hidden="true"
        className="absolute bottom-[-70px] left-1/2 h-[230px] w-[540px] -translate-x-1/2 rounded-[50%] border border-cyan-100/20 bg-[radial-gradient(ellipse,rgba(13,40,111,.08),rgba(4,20,70,.48)_68%,transparent_69%)]"
        style={{ transform: "translateX(-50%) rotateX(68deg)" }}
      >
        <motion.div
          animate={{ backgroundPositionX: ["0px", "76px"] }}
          transition={{ duration: 1.4, ease: "linear", repeat: Infinity }}
          className="absolute inset-7 rounded-[50%] border border-white/10 bg-[repeating-linear-gradient(90deg,transparent_0px,transparent_24px,rgba(165,243,252,.13)_25px,rgba(165,243,252,.13)_27px)]"
        />
      </div>

      {[["left-[12%]", "top-[74%]"], ["left-1/2", "top-[26%]"], ["left-[88%]", "top-[74%]"]].map(
        ([left, top], index) => (
          <motion.div
            key={left}
            animate={{ scale: [1, 1.22, 1], opacity: [0.55, 1, 0.55] }}
            transition={{ duration: 2.2, delay: index * 0.5, repeat: Infinity }}
            className={`absolute ${left} ${top} z-10 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-100/70 bg-cyan-300 shadow-[0_0_18px_rgba(103,232,249,.9)]`}
          />
        ),
      )}

      <motion.div
        animate={{
          x: [-225, -135, 0, 135, 225],
          y: [92, 8, -66, 4, 90],
          rotate: [0, -8, 0, 8, 0],
        }}
        transition={{ duration: 8.5, ease: "easeInOut", repeat: Infinity }}
        className="absolute left-1/2 top-[48%] z-30 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl border border-white/35 bg-[#45e0d4] text-[#07375c] shadow-[0_10px_34px_rgba(57,222,212,.55)]"
      >
        <Truck className="h-5 w-5" />
      </motion.div>

      <motion.div
        animate={{ opacity: [0.35, 0.85, 0.35], scale: [0.94, 1.08, 0.94] }}
        transition={{ duration: 3.2, ease: "easeInOut", repeat: Infinity }}
        className="absolute left-1/2 top-[45%] h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-100/25 shadow-[0_0_52px_rgba(45,212,191,.22)]"
      />

      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4.2, ease: "easeInOut", repeat: Infinity }}
        className="absolute left-1/2 top-[45%] z-20 h-28 w-28 -translate-x-1/2 -translate-y-1/2"
        style={{ transformStyle: "preserve-3d" }}
      >
        <motion.div
          animate={{ rotateX: [-12, -6, -12], rotateY: [-32, 328] }}
          transition={{ duration: 15, ease: "linear", repeat: Infinity }}
          className="relative h-full w-full"
          style={{ transformStyle: "preserve-3d" }}
        >
          {cubeFaces.map((face, index) => (
            <div
              key={face.name}
              className="absolute inset-0 overflow-hidden border border-cyan-100/55 bg-[linear-gradient(145deg,rgba(45,126,244,.96),rgba(24,73,183,.94))] shadow-[inset_0_0_30px_rgba(255,255,255,.12)]"
              style={{ transform: face.transform, backfaceVisibility: "visible" }}
            >
              <div className="absolute inset-y-0 left-1/2 w-5 -translate-x-1/2 border-x border-amber-100/20 bg-amber-200/20" />
              {index < 2 && (
                <div className="absolute left-3 top-4 rounded-lg border border-white/20 bg-white/90 p-2 text-[#143985] shadow-lg">
                  <div className="flex items-center gap-1.5">
                    <Package className="h-4 w-4" />
                    <span className="text-[7px] font-black tracking-[.08em]">SHIPRAY</span>
                  </div>
                  <Barcode className="mt-1 h-4 w-12" />
                  <span className="block text-[6px] font-bold">SR-287-41</span>
                </div>
              )}
              {index > 1 && <Package className="absolute bottom-4 right-4 h-7 w-7 text-white/55" />}
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        animate={{ y: [-45, 52], opacity: [0, 0.85, 0.85, 0] }}
        transition={{ duration: 2.8, ease: "easeInOut", repeat: Infinity }}
        className="absolute left-1/2 top-[39%] z-30 h-px w-36 -translate-x-1/2 bg-cyan-100 shadow-[0_0_12px_3px_rgba(103,232,249,.75)]"
      />

      <motion.div
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 4, delay: 0.5, repeat: Infinity }}
        className="absolute left-4 top-5 z-40 rounded-2xl border border-white/15 bg-[#09296c]/80 p-3 text-white shadow-xl backdrop-blur-xl sm:left-6"
      >
        <div className="flex items-center gap-2 text-cyan-200">
          <ScanLine className="h-4 w-4" />
          <span className="text-[9px] font-black uppercase tracking-[.12em]">Live scan</span>
        </div>
        <p className="mt-2 text-xs font-black">Sorting hub cleared</p>
        <span className="mt-1 flex items-center gap-1 text-[8px] font-bold text-emerald-200">
          <Zap className="h-2.5 w-2.5" /> 2.4 sec processing
        </span>
      </motion.div>

      <motion.div
        animate={{ y: [0, 7, 0] }}
        transition={{ duration: 4.8, repeat: Infinity }}
        className="absolute bottom-5 right-4 z-40 rounded-2xl border border-white/15 bg-[#09296c]/80 p-3 text-white shadow-xl backdrop-blur-xl sm:right-6"
      >
        <div className="flex items-center gap-2 text-cyan-200">
          <Clock3 className="h-4 w-4" />
          <span className="text-[9px] font-black uppercase tracking-[.12em]">Delivery ETA</span>
        </div>
        <p className="mt-2 text-xs font-black">Today, before 6 PM</p>
        <span className="mt-1 flex items-center gap-1 text-[8px] font-bold text-white/55">
          <MapPin className="h-2.5 w-2.5" /> 3 stops remaining
        </span>
      </motion.div>

      <div className="absolute bottom-5 left-5 z-40 hidden items-center gap-2 text-[9px] font-black uppercase tracking-[.12em] text-white/50 sm:flex">
        <Route className="h-4 w-4 text-cyan-200" /> Live courier network
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
