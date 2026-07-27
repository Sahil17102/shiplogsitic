import {
  Activity,
  Boxes,
  Building2,
  CircleDollarSign,
  Clock3,
  CloudCog,
  Code2,
  Container,
  Globe2,
  HeartPulse,
  House,
  PackageCheck,
  Plane,
  RotateCcw,
  Route,
  ShieldCheck,
  ShoppingBag,
  Store,
  Truck,
  Warehouse,
  Zap,
} from "lucide-react";

export const services = [
  { title: "Domestic shipping", copy: "Every pin code, one intelligent shipping layer.", icon: Truck, href: "/domestic-shipping", tone: "blue" },
  { title: "International", copy: "Ship to 220+ countries with customs support.", icon: Globe2, href: "/international-shipping", tone: "sky" },
  { title: "Air freight", copy: "Time-critical cargo with priority uplift.", icon: Plane, href: "/air-freight", tone: "lavender" },
  { title: "Warehousing", copy: "Flexible storage, pick, pack and dispatch.", icon: Warehouse, href: "/warehousing", tone: "mint" },
  { title: "Road transport", copy: "PTL and FTL movement with live visibility.", icon: Route, href: "/road-transport", tone: "peach" },
  { title: "Sea freight", copy: "Reliable FCL and LCL movement worldwide.", icon: Container, href: "/sea-freight", tone: "slate" },
  { title: "Ecommerce", copy: "Faster fulfilment, COD and easy returns.", icon: ShoppingBag, href: "/ecommerce-shipping", tone: "rose" },
  { title: "Reverse logistics", copy: "Turn returns into a better customer moment.", icon: RotateCcw, href: "/services", tone: "cyan" },
];

export const benefits = [
  { title: "99.9%", label: "delivery success", icon: PackageCheck },
  { title: "24×7", label: "human support", icon: Clock3 },
  { title: "32%", label: "lower shipping cost", icon: CircleDollarSign },
  { title: "< 20 sec", label: "courier selection", icon: Zap },
];

export const industries = [
  { name: "Healthcare", icon: HeartPulse },
  { name: "Fashion", icon: ShoppingBag },
  { name: "Retail", icon: Store },
  { name: "Electronics", icon: CloudCog },
  { name: "Manufacturing", icon: Building2 },
  { name: "Automobile", icon: Route },
  { name: "B2B", icon: Boxes },
  { name: "B2C", icon: House },
];

export const partners = ["BLUE DART", "DELHIVERY", "DTDC", "FedEx", "UPS", "DHL", "INDIA POST", "XPRESSBEES"];

export const testimonials = [
  {
    quote: "Shipray cut our RTO rate in the first month. The courier recommendations are accurate and the team responds before we even have to follow up.",
    name: "Aarav Mehta",
    role: "Operations lead, Auric Living",
    initials: "AM",
  },
  {
    quote: "We moved domestic and cross-border shipping into one clean workflow. Tracking is clearer for our team and our customers.",
    name: "Naina Kapoor",
    role: "Founder, Vale Studio",
    initials: "NK",
  },
  {
    quote: "Peak season used to mean spreadsheets and calls. Now every exception, pickup and invoice is visible in one place.",
    name: "Rohan Iyer",
    role: "Supply chain, Northstar Retail",
    initials: "RI",
  },
];

export type PageData = {
  eyebrow: string;
  title: string;
  description: string;
  metric: string;
  metricLabel: string;
  features: { title: string; copy: string; icon: typeof Truck }[];
  faq: { q: string; a: string }[];
};

const baseFaq = [
  { q: "How quickly can we get started?", a: "Most businesses can create an account, connect a sales channel and book their first shipment in less than a day." },
  { q: "Will we get live shipment visibility?", a: "Yes. Every shipment includes scan-based tracking, proactive exception alerts and a shareable branded tracking page." },
  { q: "Can Shipray support enterprise volumes?", a: "Yes. Dedicated account management, custom SLAs, API access and negotiated carrier pricing are available for high-volume teams." },
];

const feature = (a: string, b: string, c: string) => [
  { title: a, copy: "A clear, dependable workflow built for fast-moving operations.", icon: Activity },
  { title: b, copy: "Live signals and proactive alerts keep every team aligned.", icon: ShieldCheck },
  { title: c, copy: "Flexible controls that scale from first order to enterprise.", icon: CloudCog },
];

export const pageData: Record<string, PageData> = {
  "about-us": { eyebrow: "About Shipray", title: "Logistics should feel effortless.", description: "We combine a nationwide courier network, thoughtful software and accountable people to help modern businesses move with confidence.", metric: "10,000+", metricLabel: "growing businesses", features: feature("Built for India", "Globally connected", "Human when it matters"), faq: baseFaq },
  services: { eyebrow: "All services", title: "One logistics partner. Every mode.", description: "From an envelope across town to containers across oceans, Shipray unifies planning, movement and visibility.", metric: "12+", metricLabel: "shipping solutions", features: feature("Parcel delivery", "Freight movement", "Smart fulfilment"), faq: baseFaq },
  "domestic-shipping": { eyebrow: "Domestic shipping", title: "Every Indian pin code, within reach.", description: "Fast, reliable parcel delivery with intelligent courier allocation and lower rates for every business size.", metric: "29,000+", metricLabel: "serviceable pin codes", features: feature("Same-day pickup", "Smart courier match", "Easy COD settlement"), faq: baseFaq },
  "international-shipping": { eyebrow: "International shipping", title: "Your business, without borders.", description: "Door-to-door cross-border delivery with customs guidance, transparent pricing and proactive tracking.", metric: "220+", metricLabel: "countries & territories", features: feature("Customs assistance", "Express options", "Paperless workflow"), faq: baseFaq },
  "air-freight": { eyebrow: "Air freight", title: "When every hour matters.", description: "Priority air cargo solutions engineered for urgent, valuable and temperature-sensitive shipments.", metric: "48 hrs", metricLabel: "major global lanes", features: feature("Priority uplift", "Airport-to-door", "Special cargo handling"), faq: baseFaq },
  "sea-freight": { eyebrow: "Sea freight", title: "Global freight, made predictable.", description: "Flexible FCL and LCL ocean movement with documented milestones and one accountable operations team.", metric: "600+", metricLabel: "global port pairs", features: feature("FCL & LCL", "Customs clearance", "Port-to-door"), faq: baseFaq },
  "road-transport": { eyebrow: "Road transport", title: "Move more, with fewer unknowns.", description: "Reliable full- and part-truckload transport across India with digital proof and live milestones.", metric: "98.4%", metricLabel: "on-time departures", features: feature("FTL network", "PTL consolidation", "Live vehicle signals"), faq: baseFaq },
  warehousing: { eyebrow: "Warehousing", title: "Inventory closer to your customer.", description: "Flexible, tech-enabled storage and fulfilment that helps orders travel less and arrive faster.", metric: "18", metricLabel: "fulfilment centres", features: feature("Flexible storage", "Pick & pack", "Inventory accuracy"), faq: baseFaq },
  "ecommerce-shipping": { eyebrow: "Ecommerce shipping", title: "Turn delivery into your advantage.", description: "Multi-carrier shipping, COD reconciliation and returns built around conversion and customer loyalty.", metric: "32%", metricLabel: "average cost saved", features: feature("Channel sync", "NDR automation", "Branded tracking"), faq: baseFaq },
  pricing: { eyebrow: "Simple pricing", title: "Rates that reward your growth.", description: "Start without a subscription. Unlock better rates, deeper analytics and dedicated support as you scale.", metric: "₹0", metricLabel: "platform setup fee", features: feature("Pay as you ship", "Volume pricing", "No hidden platform fee"), faq: baseFaq },
  "shipment-tracking": { eyebrow: "Live tracking", title: "Every shipment. One clear answer.", description: "Track movement, understand exceptions and share dependable delivery updates from pickup to doorstep.", metric: "24×7", metricLabel: "shipment visibility", features: feature("Real-time milestones", "Exception alerts", "Branded updates"), faq: baseFaq },
  "book-shipment": { eyebrow: "Book a shipment", title: "Ready for pickup in minutes.", description: "Enter parcel details, compare the right courier services and schedule a doorstep pickup.", metric: "< 2 min", metricLabel: "average booking time", features: feature("Instant rate match", "Doorstep pickup", "Print-ready label"), faq: baseFaq },
  "weight-calculator": { eyebrow: "Weight calculator", title: "Measure once. Price with confidence.", description: "Calculate volumetric and chargeable weight before comparing courier rates for your parcel.", metric: "< 10 sec", metricLabel: "instant weight calculation", features: feature("Volumetric weight", "Actual weight check", "Courier-ready result"), faq: baseFaq },
  "courier-calculator": { eyebrow: "Rate calculator", title: "Know the cost before you ship.", description: "Compare estimated courier pricing by route, weight and service level—with no surprise platform fees.", metric: "14+", metricLabel: "courier partners compared", features: feature("Instant estimate", "Volumetric check", "Speed comparison"), faq: baseFaq },
  industries: { eyebrow: "Industry solutions", title: "Logistics shaped around your business.", description: "Purpose-built workflows for regulated, high-value, fast-moving and customer-critical supply chains.", metric: "9", metricLabel: "specialist industry teams", features: feature("Workflow design", "Compliance support", "Custom operating SLA"), faq: baseFaq },
  "api-integration": { eyebrow: "Developer platform", title: "Powerful logistics. A few clean APIs.", description: "Embed rates, labels, tracking and NDR workflows into the tools your team already uses.", metric: "99.99%", metricLabel: "API uptime SLA", features: feature("Modern REST APIs", "Useful webhooks", "Sandbox included"), faq: baseFaq },
  blog: { eyebrow: "Shipray journal", title: "Ideas for better movement.", description: "Practical guides, logistics intelligence and stories from teams building remarkable supply chains.", metric: "Weekly", metricLabel: "new operator insight", features: feature("Shipping guides", "Industry reports", "Founder stories"), faq: baseFaq },
  careers: { eyebrow: "Careers", title: "Build the way India moves.", description: "Join a curious, high-ownership team making logistics feel simpler for millions of shipments.", metric: "11", metricLabel: "open roles", features: feature("High ownership", "Flexible work", "Meaningful scale"), faq: baseFaq },
  contact: { eyebrow: "Contact", title: "Tell us what you need to move.", description: "Our logistics specialists will help design a faster, clearer and more cost-effective shipping setup.", metric: "< 15 min", metricLabel: "priority response", features: feature("Sales consultation", "Migration support", "Operations desk"), faq: baseFaq },
  faq: { eyebrow: "Help centre", title: "Answers, without the runaround.", description: "Everything you need to book, track, manage returns and understand billing with Shipray.", metric: "24×7", metricLabel: "support availability", features: feature("Getting started", "Shipping & tracking", "Billing & claims"), faq: baseFaq },
  "privacy-policy": { eyebrow: "Legal", title: "Privacy, written clearly.", description: "How Shipray collects, uses and protects information across our products and services.", metric: "26 Jul 2026", metricLabel: "last updated", features: feature("Data transparency", "Secure by design", "Your controls"), faq: baseFaq },
  "terms-and-conditions": { eyebrow: "Legal", title: "Terms built on clarity.", description: "The rules that keep Shipray services fair, secure and dependable for every customer.", metric: "26 Jul 2026", metricLabel: "last updated", features: feature("Service terms", "Customer duties", "Fair resolution"), faq: baseFaq },
  "refund-policy": { eyebrow: "Legal", title: "Fair resolutions, clearly explained.", description: "Understand refund eligibility, timelines and how we resolve shipment billing concerns.", metric: "7–10 days", metricLabel: "eligible refund window", features: feature("Eligibility", "Simple requests", "Status updates"), faq: baseFaq },
  "dashboard-login": { eyebrow: "Shipray workspace", title: "Welcome back.", description: "Sign in to book shipments, track exceptions, manage invoices and understand every delivery.", metric: "99.99%", metricLabel: "secure platform uptime", features: feature("Secure access", "One workspace", "Responsive support"), faq: baseFaq },
};

export const routeSlugs = Object.keys(pageData);
