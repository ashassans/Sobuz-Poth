import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import {
  Check,
  X,
  Clock,
  MapPin,
  Star,
  Users,
  ShieldCheck,
  ChevronRight,
  Info,
  Compass,
  Bus,
  Hotel,
  Utensils,
  Share2,
} from "lucide-react";
import { packages, num, SITE, waLink } from "@/lib/site";
import { useLang } from "@/lib/lang";
import { BookingBox } from "@/components/package-card";
import { TripCalculator } from "@/components/trip-calculator";
import { HowBookingWorks } from "@/components/how-booking-works";

export const Route = createFileRoute("/packages/$slug")({
  loader: ({ params }) => {
    const p = packages.find((x) => x.slug === params.slug);
    if (!p) throw notFound();
    return { slug: p.slug };
  },
  head: ({ loaderData }) => {
    const p = packages.find((x) => x.slug === loaderData?.slug);
    const title = p
      ? `${p.title.bn} (${p.title.en}) ট্যুর প্যাকেজ | সবুজ পথ — Shobuj Poth`
      : "প্যাকেজ পাওয়া যায়নি | সবুজ পথ";
    const desc = p
      ? `${p.short.en} — ${p.days} days from ৳${p.price}. Book directly on WhatsApp.`
      : "Package not found.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
    };
  },
  notFoundComponent: () => (
    <main className="min-h-[60vh] flex flex-col items-center justify-center px-4 pt-32 text-center">
      <h1 className="font-display text-4xl font-bold text-forest">প্যাকেজটি পাওয়া যায়নি</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        The requested tour package could not be found.
      </p>
      <Link
        to="/packages"
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
      >
        <span>সকল প্যাকেজ দেখুন</span>
      </Link>
    </main>
  ),
  component: Detail,
});

function Detail() {
  const { slug } = Route.useLoaderData();
  const p = packages.find((x) => x.slug === slug)!;
  const { t, lang } = useLang();
  const T = (bn: string, en: string) => (lang === "bn" ? bn : en);

  // Key quick facts for the package
  const quickFacts = [
    {
      icon: Clock,
      label: T("সময়কাল", "Duration"),
      val: `${num(p.days, lang)} ${T("দিন", "Days")}`,
    },
    {
      icon: Bus,
      label: T("যাতায়াত", "Transport"),
      val: T("এসি বাস / জিপ / বোট", "AC Bus / Jeep / Boat"),
    },
    {
      icon: Hotel,
      label: T("আবাসন", "Stay"),
      val: T("মানসম্মত হোটেল / রিসোর্ট", "Quality Resort / Hotel"),
    },
    {
      icon: Utensils,
      label: T("খাবার", "Meals"),
      val: T("সুস্বাদু দেশি খাবার", "Local Healthy Meals"),
    },
  ];

  const travelTips = [
    T(
      "জাতীয় পরিচয়পত্র (NID) বা স্টুডেন্ট আইডি কার্ড সাথে রাখবেন।",
      "Keep original National ID or Student ID card handy.",
    ),
    T(
      "পাহাড়ি ও নদী অঞ্চলের জন্য আরামদায়ক হাঁটার জুতো ব্যবহার করুন।",
      "Wear comfortable trekking shoes suitable for hills & river terrain.",
    ),
    T(
      "জরুরি ব্যক্তিগত ওষুধ ও পাওয়ার ব্যাংক সাথে রাখুন।",
      "Carry personal first-aid, medicines, and a portable power bank.",
    ),
    T(
      "প্রকৃতির পরিচ্ছন্নতা রক্ষায় প্লাস্টিক বর্জ্য ফেলা থেকে বিরত থাকুন।",
      "Protect nature — avoid littering plastic or non-biodegradable waste.",
    ),
  ];

  return (
    <main className="min-h-screen pb-28">
      {/* Immersive Photography Header with Ken Burns & Contrast Overlay */}
      <section className="relative min-h-[52vh] sm:min-h-[58vh] flex items-end overflow-hidden bg-forest pt-24 pb-12">
        <img
          src={p.image}
          alt={t(p.title)}
          className="animate-kenburns absolute inset-0 h-full w-full object-cover"
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="hero-scrim absolute inset-0" />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-1.5 text-xs text-white/75 mb-4">
            <Link to="/" className="hover:text-white transition-colors">
              {T("হোম", "Home")}
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/packages" className="hover:text-white transition-colors">
              {T("প্যাকেজসমূহ", "Packages")}
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-white font-medium truncate max-w-[180px] sm:max-w-none">
              {t(p.title)}
            </span>
          </nav>

          {/* Title & Metadata */}
          <div className="max-w-3xl">
            {p.badge && (
              <span className="inline-block rounded-full bg-emerald-500/80 px-3.5 py-1 text-xs font-semibold text-white backdrop-blur-sm mb-3">
                {t(p.badge)}
              </span>
            )}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white drop-shadow-md">
              {t(p.title)}
            </h1>
            <p className="mt-3 text-base sm:text-lg text-white/90 leading-relaxed max-w-2xl">
              {t(p.short)}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-white/85">
              <span className="flex items-center gap-1.5 font-medium">
                <MapPin className="h-4 w-4 text-emerald-400" />
                <span>{t(p.region)}</span>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5 font-medium">
                <Clock className="h-4 w-4 text-emerald-400" />
                <span>
                  {num(p.days, lang)} {T("দিন", "days")}
                </span>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1 text-amber-300 font-medium">
                <Star className="h-4 w-4 fill-current" />
                <span>৪.৯ (১২০+ রিভিউ)</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pt-10">
        <div className="grid gap-10 lg:grid-cols-12 items-start">
          {/* Left Column: Itinerary, Features, Inclusions */}
          <div className="space-y-12 lg:col-span-8">
            {/* Quick Highlights Strip */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 rounded-2xl border border-border/70 bg-card p-5 shadow-card">
              {quickFacts.map((q) => (
                <div key={q.label} className="text-center p-2">
                  <q.icon className="mx-auto h-5 w-5 text-primary mb-1.5" />
                  <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                    {q.label}
                  </p>
                  <p className="mt-0.5 text-xs sm:text-sm font-semibold text-forest">{q.val}</p>
                </div>
              ))}
            </div>

            {/* Structured Itinerary Timeline */}
            <div className="space-y-5">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                  {T("ভ্রমণ বিবরণী", "Detailed Schedule")}
                </span>
                <h2 className="mt-1 font-display text-3xl font-bold text-forest">
                  {T("দিনভিত্তিক ভ্রমণসূচি", "Day-by-Day Itinerary")}
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
                  {T(
                    "সুনির্দিষ্ট সময় ও অভিজ্ঞ গাইডের দিকনির্দেশনায় সাজানো সূচি।",
                    "Paced carefully to allow ample time for exploration, rest, and photography.",
                  )}
                </p>
              </div>

              <div className="relative border-l-2 border-primary/20 pl-6 sm:pl-8 space-y-7 ml-3 sm:ml-4">
                {p.itinerary.map((step, idx) => (
                  <div key={idx} className="relative group">
                    {/* Timeline Node Icon */}
                    <div className="absolute -left-[35px] sm:-left-[43px] top-0 flex h-7 w-7 items-center justify-center rounded-full border-2 border-primary bg-card font-display text-xs font-bold text-forest shadow-xs">
                      {num(idx + 1, lang)}
                    </div>
                    <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-card transition-all group-hover:border-primary/40">
                      <p className="font-display text-base font-bold text-forest">
                        {T("দিন", "Day")} {num(idx + 1, lang)}
                      </p>
                      <p className="mt-1.5 text-sm leading-relaxed text-foreground/85">{t(step)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Inclusions & Exclusions Side-by-Side */}
            <div className="grid gap-6 sm:grid-cols-2">
              {/* Included Card */}
              <div className="rounded-2xl border border-border/70 bg-secondary/50 p-6 shadow-card">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-white">
                    <Check className="h-4 w-4" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-forest">
                    {T("যা যা থাকছে", "What is Included")}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {p.includes.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/90">
                      <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>{t(inc)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Excluded Card */}
              <div className="rounded-2xl border border-border/70 bg-card p-6 shadow-card">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-destructive/15 text-destructive">
                    <X className="h-4 w-4" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-forest">
                    {T("যা থাকছে না", "Not Included")}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {p.excludes.map((exc, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <X className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                      <span>{t(exc)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Travel Guidelines / Tips */}
            <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-card">
              <div className="flex items-center gap-2 mb-3">
                <Info className="h-5 w-5 text-primary" />
                <h3 className="font-display text-xl font-bold text-forest">
                  {T("ভ্রমণের প্রয়োজনীয় পরামর্শ", "Travel Advice & Guidelines")}
                </h3>
              </div>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                {travelTips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-primary font-bold">·</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Custom Trip & Transport Calculator for this destination */}
            <div className="pt-4">
              <TripCalculator initialPkg={p} />
            </div>
          </div>

          {/* Right Column: Sticky Booking Card & Concierge */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
            <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-elevated">
              <div className="flex items-baseline justify-between pb-4 border-b border-border/60">
                <div>
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {T("জনপ্রতি খরচ", "Price Per Person")}
                  </span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="font-display text-4xl font-bold text-forest tabular-nums">
                      ৳{num(p.price, lang)}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      /{lang === "bn" ? "জন" : "person"}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-medium text-emerald-600 bg-secondary px-2.5 py-1 rounded-full">
                    {num(p.days, lang)} {T("দিনের ট্রিপ", "Days Trip")}
                  </span>
                </div>
              </div>

              {/* Embedded Booking Box */}
              <div className="mt-5">
                <BookingBox p={p} />
              </div>

              {/* Direct Concierge Line */}
              <div className="mt-6 pt-5 border-t border-border/60 text-center">
                <p className="text-xs text-muted-foreground">
                  {T("বিশেষ দল বা কাস্টমাইজেশন দরকার?", "Need custom dates or private group?")}
                </p>
                <a
                  href={waLink(
                    lang === "bn"
                      ? `আসসালামু আলাইকুম! আমি "${p.title.bn}" প্যাকেজে বিশেষ কাস্টমাইজেশন সম্পর্কে জানতে চাই।`
                      : `Hello! I would like to inquire about customizing the "${p.title.en}" package.`,
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 inline-block text-xs font-semibold text-primary hover:underline"
                >
                  {T("ট্রাভেল কনসালট্যান্টের সাথে কথা বলুন →", "Chat with a Tour Advisor →")}
                </a>
              </div>
            </div>

            {/* Verified Safety Badge */}
            <div className="flex items-center gap-3 rounded-2xl border border-border/60 bg-secondary/60 p-4">
              <ShieldCheck className="h-6 w-6 text-primary shrink-0" />
              <div className="text-xs">
                <p className="font-semibold text-forest">
                  {T("১০০% নিরাপদ ও প্রত্যয়িত ভ্রমণ", "100% Verified Safe Journey")}
                </p>
                <p className="text-muted-foreground">
                  {T(
                    "অভিজ্ঞ দলনেতা ও স্থানীয় প্রশাসনের সহযোগিতা",
                    "Accompanied by licensed guides",
                  )}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* How Booking Works & WhatsApp payment clarity */}
      <HowBookingWorks />
    </main>
  );
}
