import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Compass,
  HeartHandshake,
  Headphones,
  BadgePercent,
  Star,
  ChevronDown,
  MessageCircle,
  Search,
} from "lucide-react";
import { heroSlides, packages, num, waLink, SITE } from "@/lib/site";
import { useLang } from "@/lib/lang";
import { PackageCard } from "@/components/package-card";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "সবুজ পথ — প্রকৃতির কাছে ভ্রমণ | Shobuj Poth" },
      {
        name: "description",
        content:
          "সাজেক, কক্সবাজার, সুন্দরবন, সিলেট — সাশ্রয়ী ট্যুর প্যাকেজ, সরাসরি WhatsApp-এ বুকিং।",
      },
      { property: "og:title", content: "সবুজ পথ — প্রকৃতির কাছে ভ্রমণ" },
      {
        property: "og:description",
        content: "Nature tour packages across Bangladesh. Book directly on WhatsApp.",
      },
    ],
  }),
  component: Index,
});

function Hero() {
  const { lang } = useLang();
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((x) => (x + 1) % heroSlides.length), 6000);
    return () => clearInterval(id);
  }, []);
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
      {heroSlides.map((src, k) => (
        <img
          key={src}
          src={src}
          alt=""
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1500ms] ${k === i ? "animate-kenburns opacity-100" : "opacity-0"}`}
        />
      ))}
      <div className="hero-overlay absolute inset-0" />
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center text-hero-foreground">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] opacity-90">
          {lang === "bn" ? "বাংলাদেশের প্রকৃতি" : "Discover Bangladesh"}
        </p>
        <h1 className="text-5xl font-bold leading-tight drop-shadow-lg md:text-7xl">
          {lang === "bn" ? "চলুন, প্রকৃতির কাছে ফিরি" : "Come back to nature"}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg opacity-95">
          {lang === "bn"
            ? "পাহাড়, সমুদ্র আর বনের মাঝে নিশ্চিন্ত ভ্রমণ — এক মেসেজেই বুকিং।"
            : "Hills, seas and forests — worry-free trips, booked in one message."}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/packages"
            className="rounded-full bg-card px-7 py-3 font-semibold text-forest shadow-soft hover:bg-secondary"
          >
            {lang === "bn" ? "প্যাকেজ দেখুন" : "View packages"}
          </Link>
          <a
            href={waLink(
              lang === "bn"
                ? "আসসালামু আলাইকুম, ট্যুর সম্পর্কে জানতে চাই।"
                : "Hello, I'd like to know about tours.",
            )}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-full bg-whatsapp px-7 py-3 font-semibold text-whatsapp-foreground shadow-soft"
          >
            <MessageCircle className="h-5 w-5" /> WhatsApp
          </a>
        </div>
        <div className="mt-10 flex justify-center gap-2">
          {heroSlides.map((_, k) => (
            <button
              key={k}
              onClick={() => setI(k)}
              aria-label={`slide ${k + 1}`}
              className={`h-1.5 rounded-full bg-hero-foreground transition-all ${k === i ? "w-8" : "w-3 opacity-50"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Index() {
  const navigate = useNavigate();
  const { lang, t } = useLang();
  const T = (bn: string, en: string) => (lang === "bn" ? bn : en);
  const why = [
    {
      icon: Compass,
      t: T("অভিজ্ঞ গাইড", "Expert guides"),
      d: T("প্রতিটি জায়গা চেনা লোকাল গাইড", "Local guides who know every trail"),
    },
    {
      icon: HeartHandshake,
      t: T("নিজের মতো ট্রিপ", "Tailored trips"),
      d: T("আপনার বাজেট ও সময়ে সাজানো", "Built around your budget & dates"),
    },
    {
      icon: Headphones,
      t: T("২৪/৭ সাপোর্ট", "24/7 support"),
      d: T("ভ্রমণের পুরো সময় পাশে আছি", "With you the whole journey"),
    },
    {
      icon: BadgePercent,
      t: T("সেরা দাম", "Best price"),
      d: T("কোনো লুকানো খরচ নেই", "No hidden costs"),
    },
  ];
  const reviews = [
    {
      n: "নুসরাত জাহান",
      e: "Nusrat Jahan",
      q: T(
        "সাজেকের ট্রিপটা স্বপ্নের মতো ছিল, সব কিছু গোছানো।",
        "Sajek was a dream, everything was so well organised.",
      ),
    },
    {
      n: "রাকিব হাসান",
      e: "Rakib Hasan",
      q: T(
        "পরিবার নিয়ে কক্সবাজার — একদম নিশ্চিন্তে ঘুরেছি।",
        "Cox's Bazar with family — totally stress-free.",
      ),
    },
    {
      n: "তানভীর আহমেদ",
      e: "Tanvir Ahmed",
      q: T(
        "সুন্দরবনের লঞ্চ ট্যুর অসাধারণ, খাবারও দারুণ।",
        "The Sundarbans launch tour was amazing, great food too.",
      ),
    },
  ];
  const faq = [
    {
      q: T("কীভাবে বুক করব?", "How do I book?"),
      a: T(
        "পছন্দের প্যাকেজে কতজন ও তারিখ দিয়ে WhatsApp বাটনে চাপ দিন — আমরা কনফার্ম করে দেব।",
        "Pick people and date on a package and tap the WhatsApp button — we'll confirm.",
      ),
    },
    {
      q: T("প্যাকেজে কী কী থাকে?", "What's included?"),
      a: T(
        "প্রতিটি প্যাকেজের বিস্তারিত পাতায় সব লেখা আছে।",
        "Each package page lists everything included.",
      ),
    },
    {
      q: T("নিজের মতো ট্রিপ বানানো যাবে?", "Can I customise a trip?"),
      a: T(
        "অবশ্যই, নিচের ফর্ম পূরণ করে WhatsApp-এ পাঠান।",
        "Yes — fill in the form below and send it on WhatsApp.",
      ),
    },
  ];
  const [custom, setCustom] = useState({ place: "", people: "", budget: "", date: "" });
  const customMsg = T(
    `কাস্টম ট্রিপ চাই:\nজায়গা: ${custom.place}\nকতজন: ${custom.people}\nবাজেট: ${custom.budget}\nতারিখ: ${custom.date}`,
    `Custom trip request:\nPlace: ${custom.place}\nPeople: ${custom.people}\nBudget: ${custom.budget}\nDate: ${custom.date}`,
  );

  return (
    <main>
      <Hero />

      <section className="mx-auto -mt-16 max-w-5xl px-4 relative z-10">
        <div className="grid grid-cols-3 rounded-2xl bg-card p-6 text-center shadow-soft">
          {[
            [5000, T("ভ্রমণকারী", "Travellers")],
            [14, T("গন্তব্য", "Destinations")],
            [7, T("বছরের অভিজ্ঞতা", "Years")],
          ].map(([n, l]) => (
            <div key={l as string}>
              <p className="font-display text-3xl font-bold text-forest md:text-4xl">
                {num(n as number, lang)}+
              </p>
              <p className="text-xs text-muted-foreground md:text-sm">{l}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-20">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-forest md:text-5xl">
            {T("জনপ্রিয় প্যাকেজ", "Popular packages")}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {T(
              "পাহাড়, সমুদ্র, নদী ও প্রত্নতাত্ত্বিক ঐতিহ্যের সেরা সব গন্তব্য",
              "Hand-picked getaways across hills, oceans, haors and heritage sites",
            )}
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const val = (e.currentTarget.elements.namedItem("q") as HTMLInputElement)?.value;
              navigate({
                to: "/packages",
                search: val ? { q: val } : undefined,
              });
            }}
            className="mx-auto mt-6 flex max-w-xl items-center rounded-full bg-card p-2 shadow-soft border border-border/60"
          >
            <Search className="ml-3 h-5 w-5 text-muted-foreground shrink-0" />
            <input
              type="text"
              name="q"
              placeholder={T(
                "স্থান বা অঞ্চল খুঁজুন (যেমন: সাজেক, সুন্দরবন, রাজশাহী, সিলেট)...",
                "Search place or region (e.g. Sajek, Sundarbans, Rajshahi, Sylhet)...",
              )}
              className="flex-1 bg-transparent px-3 py-1.5 text-sm focus:outline-none placeholder:text-muted-foreground"
            />
            <button
              type="submit"
              className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition shadow-sm"
            >
              {T("খুঁজুন", "Search")}
            </button>
          </form>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {packages.slice(0, 6).map((p) => (
            <PackageCard key={p.slug} p={p} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            to="/packages"
            className="rounded-full border border-primary px-6 py-2.5 font-semibold text-forest hover:bg-secondary"
          >
            {T("সব প্যাকেজ", "All packages")}
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-24">
        <h2 className="text-center text-4xl font-bold text-forest md:text-5xl">
          {T("কেন আমরা", "Why choose us")}
        </h2>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {why.map((w) => (
            <div key={w.t} className="rounded-2xl bg-secondary p-6 text-center">
              <w.icon className="mx-auto h-8 w-8 text-primary" />
              <h3 className="mt-3 text-xl font-bold text-forest">{w.t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{w.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-24">
        <h2 className="text-center text-4xl font-bold text-forest md:text-5xl">
          {T("ভ্রমণকারীদের কথা", "Traveller stories")}
        </h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {reviews.map((r) => (
            <figure key={r.e} className="rounded-2xl bg-card p-6 shadow-soft">
              <div className="flex gap-0.5 text-primary">
                {[...Array(5)].map((_, k) => (
                  <Star key={k} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-3 text-foreground">"{r.q}"</blockquote>
              <figcaption className="mt-4 text-sm font-semibold text-forest">
                — {lang === "bn" ? r.n : r.e}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-24">
        <h2 className="text-center text-4xl font-bold text-forest md:text-5xl">
          {T("ছবিতে প্রকৃতি", "Gallery")}
        </h2>
        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
          {packages.map((p, k) => (
            <Link
              key={p.slug}
              to="/packages/$slug"
              params={{ slug: p.slug }}
              className={`relative overflow-hidden rounded-xl ${k % 3 === 0 ? "row-span-2" : ""}`}
            >
              <img
                src={p.image}
                alt={t(p.title)}
                loading="lazy"
                className="h-full min-h-40 w-full object-cover transition duration-700 hover:scale-105"
              />
              <span className="absolute bottom-2 left-3 font-display text-lg font-bold text-hero-foreground drop-shadow">
                {t(p.title)}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 pt-24 md:grid-cols-2">
        <div>
          <h2 className="text-4xl font-bold text-forest">{T("সাধারণ প্রশ্ন", "FAQ")}</h2>
          <div className="mt-6 space-y-3">
            {faq.map((f) => (
              <details key={f.q} className="group rounded-xl bg-card p-4 shadow-soft">
                <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-forest">
                  {f.q}
                  <ChevronDown className="h-4 w-4 transition group-open:rotate-180" />
                </summary>
                <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
        <div className="rounded-2xl bg-secondary p-6">
          <h2 className="text-3xl font-bold text-forest">
            {T("নিজের মতো ট্রিপ বানান", "Plan a custom trip")}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {T(
              "পূরণ করে WhatsApp-এ পাঠান, আমরা সাজিয়ে দেব।",
              "Fill this in and send it on WhatsApp.",
            )}
          </p>
          <div className="mt-5 grid gap-3">
            {(
              [
                ["place", T("কোথায় যেতে চান?", "Where to?"), "text"],
                ["people", T("কতজন", "How many people"), "number"],
                ["budget", T("বাজেট (৳)", "Budget (৳)"), "text"],
                ["date", T("তারিখ", "Date"), "date"],
              ] as const
            ).map(([k, ph, type]) => (
              <input
                key={k}
                type={type}
                placeholder={ph}
                value={custom[k]}
                onChange={(e) => setCustom({ ...custom, [k]: e.target.value })}
                className="rounded-full border bg-background px-4 py-2.5 text-sm"
              />
            ))}
            <a
              href={waLink(customMsg)}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 rounded-full bg-whatsapp py-3 font-semibold text-whatsapp-foreground"
            >
              <MessageCircle className="h-4 w-4" /> {T("WhatsApp-এ পাঠান", "Send on WhatsApp")}
            </a>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">{SITE.phoneDisplay}</p>
        </div>
      </section>
    </main>
  );
}
