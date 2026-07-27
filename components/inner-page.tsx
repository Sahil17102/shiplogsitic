"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Copy,
  Eye,
  EyeOff,
  IndianRupee,
  LockKeyhole,
  Mail,
  MapPin,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";
import { pageData, services } from "@/lib/site-data";
import { Button, Eyebrow, fieldClass, Label } from "./ui";
import { cn } from "@/lib/utils";
import { Brand } from "./brand";

const fulfilmentPages = new Set([
  "warehousing",
  "ecommerce-shipping",
  "book-shipment",
  "weight-calculator",
  "courier-calculator",
  "rate-calculator",
  "pricing",
]);

const globalFreightPages = new Set([
  "services",
  "international-shipping",
  "air-freight",
  "sea-freight",
  "industries",
]);

const technologyPages = new Set([
  "api-integration",
  "dashboard-login",
  "shipment-tracking",
  "tracking",
  "blog",
]);

function getHeroVisual(slug: string, pageName: string) {
  if (slug === "courier-calculator" || slug === "rate-calculator") {
    return {
      src: "/shipray-rate-calculator-hero.png",
      alt: `${pageName} manager comparing courier rates in a Shipray dispatch hub`,
      objectPosition: "50% center",
    };
  }

  if (slug === "weight-calculator") {
    return {
      src: "/shipray-weight-calculator-hero.png",
      alt: `${pageName} specialist measuring and weighing a customer parcel`,
      objectPosition: "50% center",
    };
  }

  if (fulfilmentPages.has(slug)) {
    return {
      src: "/ecommerce-fulfillment-team.png",
      alt: `${pageName} team preparing customer parcels with Shipray Logistics`,
      objectPosition: "50% center",
    };
  }

  if (globalFreightPages.has(slug)) {
    return {
      src: "/shipray-logistics-hub.png",
      alt: `${pageName} operations with cargo aircraft, delivery van and warehouse`,
      objectPosition: "64% center",
    };
  }

  if (technologyPages.has(slug)) {
    return {
      src: "/shipray-3d-logistics-hero.png",
      alt: `${pageName} across Shipray's connected courier logistics network`,
      objectPosition: "58% center",
    };
  }

  return {
    src: "/shipray-hero-operations.png",
    alt: `${pageName} courier professional scanning a parcel for delivery`,
    objectPosition: "64% center",
  };
}

function PageForm({ slug }: { slug: string }) {
  const [done, setDone] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const submit = (e: React.FormEvent) => { e.preventDefault(); setDone(true); };

  if (slug === "shipment-tracking" || slug === "tracking") {
    return (
      <form onSubmit={submit} className="rounded-[28px] border border-line bg-white p-5 shadow-card md:p-7">
        <Label>Shipment number</Label>
        <div className="flex gap-2">
          <input className={fieldClass} placeholder="e.g. SRX 2084 9182" />
          <Button variant="blue" aria-label="Track shipment"><Search className="h-4 w-4" /></Button>
        </div>
        {done && <SuccessBox title="Out for delivery" copy="Your shipment reached Gurugram delivery centre at 9:42 AM. Estimated delivery: today, before 6 PM." />}
      </form>
    );
  }

  if (slug === "courier-calculator" || slug === "rate-calculator") {
    return (
      <form onSubmit={submit} className="grid gap-4 rounded-[28px] border border-line bg-white p-5 shadow-card sm:grid-cols-2 md:p-7">
        <div><Label>Pickup pin code</Label><input className={fieldClass} placeholder="110001" required /></div>
        <div><Label>Delivery pin code</Label><input className={fieldClass} placeholder="400001" required /></div>
        <div><Label>Dead weight</Label><input className={fieldClass} placeholder="0.5 kg" required /></div>
        <div><Label>Payment</Label><select className={fieldClass}><option>Prepaid</option><option>Cash on delivery</option></select></div>
        <Button variant="blue" className="sm:col-span-2">Compare courier rates</Button>
        {done && <div className="sm:col-span-2"><SuccessBox title="Best rate: ₹86" copy="Shipray Economy · Estimated delivery in 4–5 business days. Taxes calculated at checkout." /></div>}
      </form>
    );
  }

  if (slug === "weight-calculator") {
    return (
      <form onSubmit={submit} className="grid gap-4 rounded-[28px] border border-line bg-white p-5 shadow-card sm:grid-cols-2 md:p-7">
        <div><Label>Length</Label><input className={fieldClass} inputMode="decimal" placeholder="30 cm" required /></div>
        <div><Label>Width</Label><input className={fieldClass} inputMode="decimal" placeholder="20 cm" required /></div>
        <div><Label>Height</Label><input className={fieldClass} inputMode="decimal" placeholder="15 cm" required /></div>
        <div><Label>Actual weight</Label><input className={fieldClass} inputMode="decimal" placeholder="1.5 kg" required /></div>
        <Button variant="blue" className="sm:col-span-2">Calculate chargeable weight</Button>
        {done && <div className="sm:col-span-2"><SuccessBox title="Chargeable weight: 1.8 kg" copy="The courier will compare actual and volumetric weight, then charge whichever is higher." /></div>}
      </form>
    );
  }

  if (slug === "book-shipment") {
    return (
      <form onSubmit={submit} className="grid gap-4 rounded-[28px] border border-line bg-white p-5 shadow-card sm:grid-cols-2 md:p-7">
        <div><Label>Pickup city</Label><input className={fieldClass} placeholder="New Delhi" required /></div>
        <div><Label>Destination city</Label><input className={fieldClass} placeholder="Mumbai" required /></div>
        <div><Label>Parcel weight</Label><input className={fieldClass} placeholder="0.5 kg" required /></div>
        <div><Label>Pickup date</Label><input type="date" className={fieldClass} required /></div>
        <div className="sm:col-span-2"><Label>What are you shipping?</Label><input className={fieldClass} placeholder="Apparel, electronics, documents…" required /></div>
        <Button variant="blue" className="sm:col-span-2">Find delivery options <ArrowRight className="h-4 w-4" /></Button>
        {done && <div className="sm:col-span-2"><SuccessBox title="Three options found" copy="Your route is serviceable. The fastest pickup window is today between 4–7 PM." /></div>}
      </form>
    );
  }

  if (slug === "contact") {
    return (
      <form onSubmit={submit} className="grid gap-4 rounded-[28px] border border-line bg-white p-5 shadow-card sm:grid-cols-2 md:p-7">
        <div><Label>Your name</Label><input className={fieldClass} placeholder="Full name" required /></div>
        <div><Label>Work email</Label><input type="email" className={fieldClass} placeholder="you@company.com" required /></div>
        <div><Label>Phone</Label><input type="tel" className={fieldClass} placeholder="+91" required /></div>
        <div><Label>Monthly shipments</Label><select className={fieldClass}><option>Under 500</option><option>500–2,000</option><option>2,000–10,000</option><option>10,000+</option></select></div>
        <div className="sm:col-span-2"><Label>How can we help?</Label><textarea className={cn(fieldClass, "h-28 py-3")} placeholder="Tell us about your shipping setup…" /></div>
        <Button variant="blue" className="sm:col-span-2">Send enquiry <Send className="h-4 w-4" /></Button>
        {done && <div className="sm:col-span-2"><SuccessBox title="Message received" copy="A Shipray logistics specialist will contact you shortly." /></div>}
      </form>
    );
  }

  if (slug === "dashboard-login") {
    return (
      <form onSubmit={submit} className="rounded-[28px] border border-line bg-white p-6 shadow-card md:p-8">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-sky text-blue"><LockKeyhole className="h-5 w-5" /></div>
        <h2 className="mt-6 text-2xl font-black tracking-[-0.04em]">Sign in to Shipray</h2>
        <p className="mt-2 text-sm leading-6 text-muted">Access shipments, tracking, invoices and delivery exceptions from one secure workspace.</p>
        <div className="mt-6"><Label>Work email</Label><input type="email" className={fieldClass} placeholder="you@company.com" required /></div>
        <div className="mt-4"><Label>Password</Label><div className="relative"><input type={showPassword ? "text" : "password"} className={cn(fieldClass, "pr-12")} placeholder="••••••••" required /><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-muted" aria-label="Toggle password visibility">{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button></div></div>
        <div className="mt-4 flex items-center justify-between text-xs"><label className="flex items-center gap-2 font-semibold text-muted"><input type="checkbox" /> Remember me</label><Link href="/contact" className="font-bold text-blue hover:underline">Forgot password?</Link></div>
        <Button variant="blue" className="mt-6 w-full">Continue securely</Button>
        {done && <Link href="/dashboard" className="mt-3 flex h-12 items-center justify-center rounded-full bg-emerald-50 text-sm font-black text-emerald-700">Open demo dashboard <ArrowRight className="ml-2 h-4 w-4" /></Link>}
        <div className="my-5 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.14em] text-muted/60"><span className="h-px flex-1 bg-line" />New to Shipray?<span className="h-px flex-1 bg-line" /></div>
        <Button asChild variant="outline" className="w-full"><Link href="/contact">Create a business account</Link></Button>
        <p className="mt-4 text-center text-[10px] leading-4 text-muted">Protected with secure access controls and encrypted account data.</p>
      </form>
    );
  }

  if (slug === "api-integration") {
    return (
      <div className="overflow-hidden rounded-[28px] bg-ink p-5 font-mono text-sm text-white shadow-card md:p-7">
        <div className="flex items-center justify-between border-b border-white/10 pb-4"><span className="text-xs text-white/45">Create a shipment</span><button className="text-white/45 hover:text-white" aria-label="Copy code"><Copy className="h-4 w-4" /></button></div>
        <pre className="mt-5 overflow-auto text-xs leading-7 text-blue-100"><code>{`POST /v1/shipments\n{\n  "service": "priority",\n  "from": "110001",\n  "to": "400001",\n  "weight_g": 500\n}`}</code></pre>
        <div className="mt-5 flex items-center gap-2 rounded-xl bg-emerald-400/10 p-3 text-xs text-emerald-300"><CheckCircle2 className="h-4 w-4" /> 201 · Shipment created</div>
      </div>
    );
  }

  if (slug === "pricing") {
    return (
      <div className="grid gap-4 sm:grid-cols-3">
        {[["Start", "₹0", "For testing your first routes"], ["Scale", "Custom", "For growing shipping teams"], ["Enterprise", "Talk to us", "For complex supply chains"]].map(([name, price, copy], i) => (
          <div key={name} className={cn("rounded-[28px] border p-6", i === 1 ? "border-blue bg-blue text-white shadow-float" : "border-line bg-white")}>
            <p className={cn("text-xs font-black uppercase tracking-wider", i === 1 ? "text-blue-100" : "text-blue")}>{name}</p>
            <p className="mt-5 text-3xl font-black">{price}</p>
            <p className={cn("mt-2 text-sm", i === 1 ? "text-white/65" : "text-muted")}>{copy}</p>
            <ul className="mt-6 space-y-3 text-xs font-bold">{["Carrier comparison", "Branded tracking", "NDR workflows"].map((item) => <li key={item} className="flex items-center gap-2"><Check className="h-4 w-4" /> {item}</li>)}</ul>
            <Button asChild variant={i === 1 ? "outline" : "primary"} className={cn("mt-7 w-full", i === 1 && "border-white/20 bg-white text-ink")}><Link href="/contact">Choose {name}</Link></Button>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {[["Sales", "hello@shipray.in", Mail], ["Operations", "+91 124 490 2200", Truck], ["Head office", "Golf Course Road, Gurugram", MapPin]].map(([label, value, Icon]) => (
        <div key={label as string} className="rounded-[24px] border border-line bg-white p-5">
          <Icon className="h-5 w-5 text-blue" />
          <p className="mt-5 text-[10px] font-black uppercase tracking-wider text-muted">{label as string}</p>
          <p className="mt-1 text-sm font-black">{value as string}</p>
        </div>
      ))}
    </div>
  );
}

function SuccessBox({ title, copy }: { title: string; copy: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
      <div className="flex gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" /><div><p className="text-sm font-black text-emerald-900">{title}</p><p className="mt-1 text-xs leading-5 text-emerald-800/70">{copy}</p></div></div>
    </motion.div>
  );
}

export function InnerPage({ slug }: { slug: string }) {
  const data = pageData[slug];
  const isLegal = ["privacy-policy", "terms-and-conditions", "refund-policy"].includes(slug);
  const heroVisual = getHeroVisual(slug, data.eyebrow);
  return (
    <>
      <section className="page-shell pb-16 pt-14 md:pb-24 md:pt-20">
        <div className="relative overflow-hidden rounded-[34px] bg-[#eaf4ff] p-6 md:p-12 lg:min-h-[600px]">
          <div className="grid-fade absolute inset-0 opacity-65" />
          <div className="relative z-10 grid min-h-[500px] items-center gap-10 lg:grid-cols-[.9fr_1.1fr]">
            <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
              <Eyebrow>{data.eyebrow}</Eyebrow>
              <h1 className="hero-title text-balance text-5xl font-black sm:text-6xl lg:text-7xl">{data.title}</h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-muted md:text-lg">{data.description}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild variant="blue" size="lg"><Link href={slug === "dashboard-login" ? "#login-panel" : "/book-shipment"}>{slug === "dashboard-login" ? "Sign in securely" : "Get started"} <ArrowRight className="h-4 w-4" /></Link></Button>
                <Button asChild variant="outline" size="lg"><Link href="/contact">{slug === "dashboard-login" ? "Create account" : "Talk to an expert"}</Link></Button>
              </div>
              <div className="mt-10 flex items-center gap-4">
                <p className="text-3xl font-black tracking-[-0.05em] text-blue">{data.metric}</p>
                <div className="h-9 w-px bg-blue/15" />
                <p className="max-w-[130px] text-xs font-bold leading-5 text-muted">{data.metricLabel}</p>
              </div>
            </motion.div>
            <motion.div
              id={slug === "dashboard-login" ? "login-panel" : undefined}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className={cn(slug === "dashboard-login" ? "scroll-mt-28" : "relative overflow-hidden rounded-[28px] border-[8px] border-white bg-white shadow-float")}
            >
              {slug === "dashboard-login" ? <PageForm slug={slug} /> : <div className="relative aspect-[4/3]">
                <Image
                  src={heroVisual.src}
                  fill
                  priority
                  alt={heroVisual.alt}
                  className="object-cover"
                  style={{ objectPosition: heroVisual.objectPosition }}
                  sizes="(max-width: 1024px) 100vw, 600px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent" />
                <div className="glass absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl p-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <Brand compact />
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold text-muted">Shipray Logistics</p>
                      <p className="truncate text-sm font-black">{data.eyebrow}</p>
                    </div>
                  </div>
                  <ShieldCheck className="h-5 w-5 text-emerald-600" />
                </div>
              </div>}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="page-shell py-10 md:py-20">
        <div className="grid gap-14 lg:grid-cols-[.82fr_1.18fr]">
          <div>
            <Eyebrow>{isLegal ? "Plain-language policy" : "Built for momentum"}</Eyebrow>
            <h2 className="text-balance text-4xl font-black tracking-[-0.05em] md:text-5xl">{isLegal ? "Clear terms. No hidden corners." : "Everything your team needs to move well."}</h2>
            <p className="mt-5 text-base leading-7 text-muted">{isLegal ? "This summary is designed to be easy to understand. For specific account or legal questions, our team is ready to help." : "Thoughtful defaults reduce busywork while flexible controls keep your operation ready for what comes next."}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {data.features.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.title} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }} viewport={{ once: true }} className="rounded-[24px] border border-line bg-white p-5 transition hover:-translate-y-1 hover:shadow-card">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-sky text-blue"><Icon className="h-5 w-5" /></div>
                  <h3 className="mt-8 text-lg font-black tracking-[-0.03em]">{item.title}</h3>
                  <p className="mt-2 text-xs leading-5 text-muted">{item.copy}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {slug !== "dashboard-login" && (
        <section className="page-shell py-14 md:py-24">
          <div className="rounded-[34px] bg-sky/65 p-5 md:p-10">
            <div className="mb-8 flex items-end justify-between gap-5">
              <div><span className="text-xs font-black uppercase tracking-[0.16em] text-blue">Try it now</span><h2 className="mt-3 text-3xl font-black tracking-[-0.045em] md:text-4xl">See Shipray in motion.</h2></div>
              <Sparkles className="hidden h-7 w-7 text-blue sm:block" />
            </div>
            <PageForm slug={slug} />
          </div>
        </section>
      )}

      <section className="page-shell py-14 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <Eyebrow>Common questions</Eyebrow>
            <h2 className="text-4xl font-black tracking-[-0.05em] md:text-5xl">A straight answer is a good start.</h2>
          </div>
          <div className="divide-y divide-line border-y border-line">
            {data.faq.map((item) => (
              <details key={item.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-black">{item.q}<span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-sky text-blue transition group-open:rotate-45">+</span></summary>
                <p className="max-w-2xl pb-2 pt-3 text-sm leading-6 text-muted">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell py-14">
        <div className="flex items-center justify-between gap-5"><div><p className="text-xs font-black uppercase tracking-[0.16em] text-blue">Related services</p><h2 className="mt-3 text-3xl font-black tracking-[-0.045em]">Keep exploring</h2></div><Button asChild variant="outline"><Link href="/services">All services</Link></Button></div>
        <div className="mt-8 grid gap-3 md:grid-cols-3">
          {services.slice(0, 3).map((service) => { const Icon = service.icon; return <Link key={service.title} href={service.href} className="group flex items-center gap-4 rounded-[22px] border border-line bg-white p-4 hover:border-blue/25 hover:shadow-card"><div className="grid h-11 w-11 place-items-center rounded-2xl bg-sky text-blue"><Icon className="h-5 w-5" /></div><div><p className="text-sm font-black">{service.title}</p><p className="mt-1 text-xs text-muted">Explore solution</p></div><ArrowRight className="ml-auto h-4 w-4 text-muted transition group-hover:translate-x-1 group-hover:text-blue" /></Link>; })}
        </div>
      </section>

      <section className="page-shell py-16">
        <div className="relative overflow-hidden rounded-[34px] bg-ink p-8 text-white md:flex md:items-center md:justify-between md:p-12">
          <div className="absolute -right-16 -top-24 h-60 w-60 rounded-full bg-blue/30 blur-3xl" />
          <div className="relative max-w-2xl"><p className="text-xs font-black uppercase tracking-[0.17em] text-blue-300">Talk to Shipray</p><h2 className="mt-4 text-3xl font-black tracking-[-0.05em] md:text-5xl">Let’s design your better route.</h2><p className="mt-3 text-sm text-white/55">No hard sell. Just a useful conversation about how you ship today.</p></div>
          <Button asChild size="lg" className="relative mt-7 bg-white text-ink hover:bg-blue-50 md:mt-0"><Link href="/contact">Contact our team <ArrowRight className="h-4 w-4" /></Link></Button>
        </div>
      </section>
    </>
  );
}
