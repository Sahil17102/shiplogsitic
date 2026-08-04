"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Barcode,
  Building2,
  CheckCircle2,
  Clock3,
  Eye,
  EyeOff,
  Home,
  LockKeyhole,
  Mail,
  MapPin,
  Package,
  Phone,
  Route,
  ScanLine,
  ShieldCheck,
  Truck,
  UserPlus,
  Zap,
} from "lucide-react";
import { Button, fieldClass, Label } from "./ui";

const ACCOUNTS_KEY = "shipray-accounts-v1";
const SESSION_AUTH_KEY = "shipray-user-auth";
const REMEMBER_AUTH_KEY = "shipray-remember-auth";
const CURRENT_USER_KEY = "shipray-current-user";

type AuthView = "register" | "login";
type AuthStage = "form" | "verify";

interface StoredAccount {
  id: string;
  fullName: string;
  email: string;
  mobile: string;
  companyName: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  passwordHash: string;
  createdAt: string;
}

const emptyRegistration = {
  fullName: "",
  email: "",
  mobile: "",
  companyName: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  password: "",
  confirmPassword: "",
  termsAccepted: false,
};

function readAccounts(): StoredAccount[] {
  try {
    const stored = window.localStorage.getItem(ACCOUNTS_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function hashPassword(password: string, email: string) {
  const payload = new TextEncoder().encode(`shipray-local-v1:${email.toLowerCase()}:${password}`);
  const digest = await window.crypto.subtle.digest("SHA-256", payload);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function createVerificationCode() {
  const randomValue = new Uint32Array(1);
  window.crypto.getRandomValues(randomValue);
  return String(100000 + (randomValue[0] % 900000));
}

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
                    <span className="text-[7px] font-black tracking-[.08em]">SHIPROUTE</span>
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
  const [view, setView] = useState<AuthView>("register");
  const [stage, setStage] = useState<AuthStage>("form");
  const [registration, setRegistration] = useState(emptyRegistration);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [verificationCode, setVerificationCode] = useState("");
  const [enteredCode, setEnteredCode] = useState("");
  const [pendingAccount, setPendingAccount] = useState<StoredAccount | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [opening, setOpening] = useState(false);

  useEffect(() => {
    const accounts = readAccounts();
    if (accounts.length > 0) {
      setView("login");
      setLoginEmail(accounts[0].email);
    }
  }, []);

  const switchView = (nextView: AuthView) => {
    setView(nextView);
    setStage("form");
    setError("");
    setSuccess("");
    setEnteredCode("");
    setVerificationCode("");
    setPendingAccount(null);
    if (nextView === "login") {
      const accounts = readAccounts();
      if (!loginEmail && accounts[0]) setLoginEmail(accounts[0].email);
    }
  };

  const submitRegistration = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    const cleanEmail = registration.email.trim().toLowerCase();
    const cleanMobile = registration.mobile.replace(/\D/g, "");
    const cleanPincode = registration.pincode.replace(/\D/g, "");

    if (registration.fullName.trim().length < 3) {
      setError("Please enter your full name.");
      return;
    }
    if (cleanMobile.length !== 10) {
      setError("Enter a valid 10-digit mobile number.");
      return;
    }
    if (cleanPincode.length !== 6) {
      setError("Enter a valid 6-digit PIN code.");
      return;
    }
    if (
      registration.password.length < 8 ||
      !/[A-Z]/.test(registration.password) ||
      !/[a-z]/.test(registration.password) ||
      !/\d/.test(registration.password)
    ) {
      setError("Password must be at least 8 characters and include uppercase, lowercase and a number.");
      return;
    }
    if (registration.password !== registration.confirmPassword) {
      setError("Password and confirm password do not match.");
      return;
    }
    if (!registration.termsAccepted) {
      setError("Please accept the terms and privacy notice to continue.");
      return;
    }

    const accounts = readAccounts();
    if (accounts.some((account) => account.email === cleanEmail)) {
      setLoginEmail(cleanEmail);
      switchView("login");
      setError("An account with this email already exists. Log in with your password.");
      return;
    }

    setOpening(true);
    const passwordHash = await hashPassword(registration.password, cleanEmail);
    const account: StoredAccount = {
      id: window.crypto.randomUUID(),
      fullName: registration.fullName.trim(),
      email: cleanEmail,
      mobile: cleanMobile,
      companyName: registration.companyName.trim(),
      address: registration.address.trim(),
      city: registration.city.trim(),
      state: registration.state.trim(),
      pincode: cleanPincode,
      passwordHash,
      createdAt: new Date().toISOString(),
    };

    setPendingAccount(account);
    setVerificationCode(createVerificationCode());
    setEnteredCode("");
    setStage("verify");
    setOpening(false);
  };

  const submitLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    const cleanEmail = loginEmail.trim().toLowerCase();
    const account = readAccounts().find((item) => item.email === cleanEmail);

    if (!account) {
      setError("No ShipRoute account was found for this email. Please register first.");
      return;
    }

    setOpening(true);
    const passwordHash = await hashPassword(loginPassword, cleanEmail);
    if (passwordHash !== account.passwordHash) {
      setOpening(false);
      setError("The password you entered is incorrect.");
      return;
    }

    setPendingAccount(account);
    setVerificationCode(createVerificationCode());
    setEnteredCode("");
    setStage("verify");
    setOpening(false);
  };

  const verifyCode = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (enteredCode.trim() !== verificationCode) {
      setError("Verification code is incorrect. Use the code shown on this screen.");
      return;
    }
    if (!pendingAccount) {
      setStage("form");
      setError("Your verification session expired. Please try again.");
      return;
    }

    if (view === "register") {
      const accounts = readAccounts();
      window.localStorage.setItem(
        ACCOUNTS_KEY,
        JSON.stringify([...accounts.filter((account) => account.email !== pendingAccount.email), pendingAccount]),
      );
      setLoginEmail(pendingAccount.email);
      setLoginPassword("");
      setRegistration(emptyRegistration);
      setPendingAccount(null);
      setStage("form");
      setView("login");
      setSuccess("Account created successfully. Log in using your email and password.");
      return;
    }

    setOpening(true);
    window.sessionStorage.setItem(SESSION_AUTH_KEY, "true");
    window.localStorage.setItem(
      CURRENT_USER_KEY,
      JSON.stringify({
        id: pendingAccount.id,
        fullName: pendingAccount.fullName,
        email: pendingAccount.email,
        companyName: pendingAccount.companyName,
      }),
    );
    if (rememberMe) {
      window.localStorage.setItem(REMEMBER_AUTH_KEY, "true");
    } else {
      window.localStorage.removeItem(REMEMBER_AUTH_KEY);
    }
    router.push("/dashboard");
  };

  return (
    <section data-auth-page="true" className="relative min-h-[calc(100vh-72px)] overflow-hidden bg-[#eaf4ff]">
      <div className="grid-fade absolute inset-0 opacity-45" />
      <div className="absolute -left-36 top-12 h-96 w-96 rounded-full bg-blue/10 blur-3xl" />
      <div className="absolute -right-28 bottom-0 h-96 w-96 rounded-full bg-cyan-300/20 blur-3xl" />

      <div className="page-shell relative grid min-h-[calc(100vh-72px)] items-center gap-6 py-6 lg:grid-cols-[1.05fr_.95fr] lg:py-8">
        <div className="relative overflow-hidden rounded-[34px] bg-[linear-gradient(145deg,#153f9f_0%,#235bd0_54%,#4b63d8_100%)] p-6 text-white shadow-[0_30px_80px_rgba(25,76,189,.2)] md:p-9">
          <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full border-[38px] border-white/[.05]" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[.15em] text-cyan-100">
              <ShieldCheck className="h-4 w-4" /> Secure workspace access
            </div>
            <h1 className="mt-5 max-w-xl text-balance text-4xl font-black leading-[.98] tracking-[-.055em] md:text-5xl">
              Your courier control tower starts here.
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-6 text-white/70">
              Create your business account, verify access and manage every shipment from one secure workspace.
            </p>
            <CourierLoginVisual />
          </div>
        </div>

        <div className="rounded-[34px] border border-blue/10 bg-white p-6 shadow-[0_28px_80px_rgba(31,68,139,.14)] md:p-8">
          <div className="flex items-start justify-between gap-5">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-sky text-blue">
              {view === "register" ? <UserPlus className="h-5 w-5" /> : <LockKeyhole className="h-5 w-5" />}
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-[9px] font-black uppercase tracking-[.1em] text-emerald-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Secure access
            </span>
          </div>

          <div className="mt-5 grid grid-cols-2 rounded-2xl bg-[#edf5ff] p-1.5">
            <button
              type="button"
              onClick={() => switchView("register")}
              className={`rounded-xl px-4 py-3 text-xs font-black transition ${
                view === "register" ? "bg-white text-blue shadow-sm" : "text-muted hover:text-blue"
              }`}
            >
              Register
            </button>
            <button
              type="button"
              onClick={() => switchView("login")}
              className={`rounded-xl px-4 py-3 text-xs font-black transition ${
                view === "login" ? "bg-white text-blue shadow-sm" : "text-muted hover:text-blue"
              }`}
            >
              Log in
            </button>
          </div>

          {stage === "verify" ? (
            <form onSubmit={verifyCode}>
              <h2 className="mt-6 text-3xl font-black tracking-[-.045em] text-ink">
                {view === "register" ? "Verify your registration" : "Verify your login"}
              </h2>
              <p className="mt-2 text-sm leading-6 text-muted">
                Enter the six-digit code shown below to {view === "register" ? "create your account" : "open your dashboard"}.
              </p>

              <div className="mt-5 rounded-[22px] border border-blue/15 bg-[linear-gradient(135deg,#edf5ff,#f3f0ff)] p-5 text-center">
                <p className="text-[10px] font-black uppercase tracking-[.16em] text-blue">Your on-screen verification code</p>
                <div className="mt-4 flex justify-center gap-2">
                  {verificationCode.split("").map((digit, index) => (
                    <span key={`${digit}-${index}`} className="grid h-11 w-10 place-items-center rounded-xl bg-white text-xl font-black text-ink shadow-sm">
                      {digit}
                    </span>
                  ))}
                </div>
                <button type="button" onClick={() => setEnteredCode(verificationCode)} className="mt-4 text-[10px] font-black text-blue hover:underline">
                  Use this code
                </button>
              </div>

              <div className="mt-5">
                <Label>Verification code</Label>
                <input
                  value={enteredCode}
                  onChange={(event) => setEnteredCode(event.target.value.replace(/\D/g, "").slice(0, 6))}
                  className={`${fieldClass} text-center text-lg font-black tracking-[.35em]`}
                  placeholder="000000"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  required
                />
              </div>

              {error && <div role="alert" className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-bold leading-5 text-red-700">{error}</div>}

              <Button variant="blue" className="mt-5 w-full" disabled={opening}>
                {opening ? "Opening dashboard…" : view === "register" ? "Verify & create account" : "Verify & open dashboard"}
                {!opening && <ArrowRight className="h-4 w-4" />}
              </Button>
              <button type="button" onClick={() => { setStage("form"); setError(""); }} className="mt-4 w-full text-center text-xs font-black text-muted hover:text-blue">
                ← Back to {view}
              </button>
            </form>
          ) : view === "register" ? (
            <form onSubmit={submitRegistration}>
              <h2 className="mt-6 text-3xl font-black tracking-[-.045em] text-ink">Create your ShipRoute account</h2>
              <p className="mt-2 text-sm leading-6 text-muted">Add your business details and set a password for future logins.</p>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Label><span className="flex items-center gap-2"><UserPlus className="h-3.5 w-3.5" /> Full name</span></Label>
                  <input value={registration.fullName} onChange={(event) => setRegistration({ ...registration, fullName: event.target.value })} className={fieldClass} placeholder="Your full name" autoComplete="name" required />
                </div>
                <div>
                  <Label><span className="flex items-center gap-2"><Mail className="h-3.5 w-3.5" /> Work email</span></Label>
                  <input type="email" value={registration.email} onChange={(event) => setRegistration({ ...registration, email: event.target.value })} className={fieldClass} placeholder="you@company.com" autoComplete="email" required />
                </div>
                <div>
                  <Label><span className="flex items-center gap-2"><Phone className="h-3.5 w-3.5" /> Mobile number</span></Label>
                  <input type="tel" value={registration.mobile} onChange={(event) => setRegistration({ ...registration, mobile: event.target.value })} className={fieldClass} placeholder="10-digit number" autoComplete="tel" required />
                </div>
                <div className="sm:col-span-2">
                  <Label><span className="flex items-center gap-2"><Building2 className="h-3.5 w-3.5" /> Company name</span></Label>
                  <input value={registration.companyName} onChange={(event) => setRegistration({ ...registration, companyName: event.target.value })} className={fieldClass} placeholder="Your company or store name" autoComplete="organization" required />
                </div>
                <div className="sm:col-span-2">
                  <Label><span className="flex items-center gap-2"><Home className="h-3.5 w-3.5" /> Pickup address</span></Label>
                  <input value={registration.address} onChange={(event) => setRegistration({ ...registration, address: event.target.value })} className={fieldClass} placeholder="Building, street and area" autoComplete="street-address" required />
                </div>
                <div>
                  <Label>City</Label>
                  <input value={registration.city} onChange={(event) => setRegistration({ ...registration, city: event.target.value })} className={fieldClass} placeholder="City" autoComplete="address-level2" required />
                </div>
                <div>
                  <Label>State</Label>
                  <input value={registration.state} onChange={(event) => setRegistration({ ...registration, state: event.target.value })} className={fieldClass} placeholder="State" autoComplete="address-level1" required />
                </div>
                <div className="sm:col-span-2">
                  <Label>PIN code</Label>
                  <input value={registration.pincode} onChange={(event) => setRegistration({ ...registration, pincode: event.target.value.replace(/\D/g, "").slice(0, 6) })} className={fieldClass} placeholder="6-digit PIN code" inputMode="numeric" autoComplete="postal-code" required />
                </div>
                <div>
                  <Label>Set password</Label>
                  <div className="relative">
                    <input type={showPassword ? "text" : "password"} value={registration.password} onChange={(event) => setRegistration({ ...registration, password: event.target.value })} className={`${fieldClass} pr-12`} placeholder="Minimum 8 characters" autoComplete="new-password" required />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-muted" aria-label={showPassword ? "Hide password" : "Show password"}>
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <Label>Confirm password</Label>
                  <input type={showPassword ? "text" : "password"} value={registration.confirmPassword} onChange={(event) => setRegistration({ ...registration, confirmPassword: event.target.value })} className={fieldClass} placeholder="Repeat password" autoComplete="new-password" required />
                </div>
              </div>

              <p className="mt-3 text-[10px] leading-5 text-muted">Use 8+ characters with uppercase, lowercase and a number.</p>
              <label className="mt-4 flex items-start gap-2 text-xs font-semibold leading-5 text-muted">
                <input type="checkbox" checked={registration.termsAccepted} onChange={(event) => setRegistration({ ...registration, termsAccepted: event.target.checked })} className="mt-1" />
                I agree to the terms of service and privacy notice.
              </label>

              {error && <div role="alert" className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-bold leading-5 text-red-700">{error}</div>}

              <Button variant="blue" className="mt-5 w-full" disabled={opening}>
                {opening ? "Preparing verification…" : "Continue to verification"} {!opening && <ArrowRight className="h-4 w-4" />}
              </Button>
              <p className="mt-4 text-center text-xs text-muted">Already registered? <button type="button" onClick={() => switchView("login")} className="font-black text-blue hover:underline">Log in</button></p>
            </form>
          ) : (
            <form onSubmit={submitLogin}>
              <h2 className="mt-6 text-3xl font-black tracking-[-.045em] text-ink">Welcome back</h2>
              <p className="mt-2 text-sm leading-6 text-muted">Log in with the email and password you created during registration.</p>

              {success && <div role="status" className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs font-bold leading-5 text-emerald-700">{success}</div>}

              <div className="mt-5">
                <Label>Work email</Label>
                <input type="email" value={loginEmail} onChange={(event) => setLoginEmail(event.target.value)} className={fieldClass} placeholder="you@company.com" autoComplete="email" required />
              </div>
              <div className="mt-4">
                <Label>Password</Label>
                <div className="relative">
                  <input type={showPassword ? "text" : "password"} value={loginPassword} onChange={(event) => setLoginPassword(event.target.value)} className={`${fieldClass} pr-12`} placeholder="Enter your password" autoComplete="current-password" required />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-muted" aria-label={showPassword ? "Hide password" : "Show password"}>
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between gap-4 text-xs">
                <label className="flex items-center gap-2 font-semibold text-muted"><input type="checkbox" checked={rememberMe} onChange={(event) => setRememberMe(event.target.checked)} /> Keep me signed in</label>
                <Link href="/contact" className="font-black text-blue hover:underline">Forgot password?</Link>
              </div>

              {error && <div role="alert" className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-bold leading-5 text-red-700">{error}</div>}

              <Button variant="blue" className="mt-5 w-full" disabled={opening}>
                {opening ? "Checking password…" : "Log in with password"} {!opening && <ArrowRight className="h-4 w-4" />}
              </Button>
              <p className="mt-4 text-center text-xs text-muted">New to ShipRoute? <button type="button" onClick={() => switchView("register")} className="font-black text-blue hover:underline">Create account</button></p>
            </form>
          )}

          <p className="mt-5 flex items-center justify-center gap-2 text-center text-[10px] text-muted">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Passwords are hashed before being saved in this browser.
          </p>
        </div>
      </div>
    </section>
  );
}
